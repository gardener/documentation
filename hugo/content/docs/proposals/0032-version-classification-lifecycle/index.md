---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0032-version-classification-lifecycle
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/proposals/0032-version-classification-lifecycle/README.md
  to: README.md
title: 0032 Version Classification Lifecycle
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/enhancements/blob/main/geps/0032-version-classification-lifecycle/README.md
-->


# GEP-0032: Cloud Profile Version Classification Lifecycles

## Motivation

At the current stage of implementation, Gardener administrators may classify Kubernetes versions and machine image versions using the `CloudProfile` spec.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      - version: 1.26.0
        classification: supported
        expirationDate: "2024-06-01T00:00:00Z"
      - version: 1.27.0
        classification: deprecated
      - version: 1.28.0
        classification: supported
```

Typically, administrators move a version through the classification stages manually over time. However, there is a dedicated field called `expirationDate`, that allows setting a deadline after which a version is interpreted as expired without manual intervention.

However, manually moving versions through the stages is cumbersome, so there should be a way for administrators to define an entire version lifecycle.

While using the expiration date is certainly convenient for administrators, it is confusing that the classification pretends to be for example `supported` or `deprecated` while the expiration date marks it as `expired` at a certain point in time.

In addition to that, there is no way to schedule an introduction of a new version at a specific point in the future.

### Goals

- Allow administrators to define a classification lifecycle for expirable versions in the `CloudProfile`.
- Directly reflect the actual state of a classification, which is not the case with the fields `classification` and `expirationDate`.
- Maintain basic backwards compatibility.
- Keep the possibility to only specify the `version` field without any classification lifecycle.
- Do not break deployments of the `CloudProfile` through CD pipelines by accidental field overwrites.

### Non-Goals

- Allowing third-parties to introduce own classification stages.
- Let users arbitrarily move versions through stages like going from `expired` to `supported`.

## Proposal

The idea is to deprecate both existing fields `classification` and `expirationDate` in the `CloudProfile` and replace them with a more powerful field called `lifecycle`. This field contains a slice of classification stages that start at a given date.

With this change we also introduce a resource status for the `CloudProfile` to improve the issue that the actual classification stage is not immediately obvious. The status makes it more readable for API consumers and they do not need to calculate the actual classification stage on their own.

```yaml
# assume that the current date is 2024-12-03
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      - version: 1.30.6
        lifecycle:
          - classification: preview # starts in preview because no start time is defined
          - classification: supported
            startTime: "2024-12-01T00:00:00Z"
          - classification: deprecated
            startTime: "2025-03-01T00:00:00Z"
          - classification: expired
            startTime: "2025-04-01T00:00:00Z"
status:
  kubernetes:
    versions:
      - version: 1.30.6
        classification: supported
```

In addition to the existing classification stages, we add one more stage with the name `unavailable` to the API. An `unavailable` version is planned to become available in the future. It is not possible to reference this version in this stage and can be used by administrators to schedule a new version release.

The `expired` classification, which existed only implicitly in the API, now becomes a dedicated value.

So, the resulting list of classification stages will be:

- `unavailable`
- `preview`
- `supported`
- `deprecated`
- `expired`

There are rules for the new lifecycle, some of them need to be ensured through validations:

- Classification stages in a lifecycle must only appear ordered from `unavailable` to `expired` as described in the list above.
- It is not required that every classification stage is present in the lifecycle.
- Start times are always monotonically increasing.
- In case two stages have the same `startTime`, the last stage is favored.
- The leading start dates are optional and interpreted as zero time, meaning it has already started.
- If no lifecycle is given, it defaults to a lifecycle definition with one `supported` stage.
- If all start times are in the future, the resulting classification is `unavailable`.

There is already a controller in place for reconciling the `CloudProfile` (by now it's primarily handling finalizers only), which is going to be extended by reconciling the version classification statuses. If there are remaining stages inside `lifecycle` the next reconcile needs to be scheduled at its `startTime`.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      # if an administrator deploys just the version without any lifecycle,
      # the reconciler will evaluate the classification status to supported
      - version: 1.27.0

      # when introducing a new version it doesn't have to contain a deprecation or expiration date
      - version: 1.28.0
        lifecycle:
          - classification: preview
          - classification: supported
            startTime: "2024-12-01T00:00:00Z"

      # it is not strictly required that every lifecycle stage must occur,
      # they can also be dropped as long as their general order is maintained
      - version: 1.18.0
        lifecycle:
          - classification: supported
          - classification: deprecated
            startTime: "2022-01-01T00:00:00Z"
          - classification: expired
            startTime: "2022-06-01T00:00:00Z"

      # to schedule a new version release, the administrator can define the start times
      # of all lifecycle events in the future, such that the classification status will
      # be evaluated to unavailable
      - version: 2.0.0
        lifecycle:
          - classification: preview
            startTime: "2036-02-07T06:28:16Z"
status:
  kubernetes:
    versions:
      - version: 1.27.0
        classification: supported
      - version: 1.28.0
        classification: supported
      - version: 1.18.0
        classification: expired
      - version: 2.0.0
        classification: unavailable
```

### Backwards Compatibility

The existing fields continue to function as before but are deprecated. `lifecycle` cannot be combined with the usage of the existing `classification` and `expirationDate` fields though.

The `status` always reflects the current state of a classification no matter if the new or deprecated API is used. Specifically when using the old API this means that if the `expirationDate` has passed, the resulting status is evaluated as `expired`, overwriting the actual `classification` value.

### Compatibility with Namespaced Cloud Profiles

Of course the new version classification lifecycles must be compatible with `NamespacedCloudProfile`s. This leads to some special cases to ensure the overridden `CloudProfile` inside `NamespacedCloudProfile.Status` itself always produces a valid `CloudProfile`.

With the legacy API, `NamespacedCloudProfile`s can only specify an `expirationDate` for versions inherited from the parent `CloudProfile` and cannot change the `classification`. When specified, the `expirationDate` is merged into the parent version's definition.

With the new API, if a `NamespacedCloudProfile` specifies a `lifecycle` for a Kubernetes or machine image version that already exists in the parent `CloudProfile`, it replaces the parent lifecycle for that version entirely. If no override is specified for a version, the parent version is inherited unchanged. The lifecycle specified in a `NamespacedCloudProfile` must satisfy the same validation rules as a lifecycle in the parent `CloudProfile`. Restricting who may set a `lifecycle` in a `NamespacedCloudProfile` is already covered by the existing custom RBAC verbs for the `kubernetes` and `machineImages` fields (see [GEP-0025](/docs/proposals/0025-namespaced-cloudprofiles/#custom-rbac-verb)).

To support smooth upgrades and backward compatibility, the following combination matrix defines how parent definitions and `NamespacedCloudProfile` overrides interact:

| Parent `CloudProfile` | `NamespacedCloudProfile` Override | Resulting Behavior in Status |
| --- | --- | --- |
| `classification` / `expirationDate` | `expirationDate` | **Merged as before**: The `expirationDate` from the `NamespacedCloudProfile` overrides the parent `expirationDate` (or sets one if none was defined). `classification` is inherited from the parent. |
| `lifecycle` | `expirationDate` | **Expiration stage overwritten**: The `expired` stage in the parent `lifecycle` is added or overwritten with `startTime` set to `expirationDate`. All other parent lifecycle stages are retained unchanged (existing behavior for backward compatibility). |
| `classification` / `expirationDate` | `lifecycle` | **Entire lifecycle override**: The `lifecycle` from the `NamespacedCloudProfile` replaces the parent version's legacy classification and expiration date entirely. |
| `lifecycle` | `lifecycle` | **Entire lifecycle override**: The `lifecycle` from the `NamespacedCloudProfile` replaces the parent version's lifecycle entirely. |

Given the `CloudProfile` from above, the following `NamespacedCloudProfile` is valid:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: NamespacedCloudProfile
metadata:
  name: local
  namespace: shoot
spec:
  kubernetes:
    versions:
      # omitted versions will not be changed

      - version: 1.18.0
        lifecycle: # replaces the parent lifecycle entirely, postponing expiration
          - classification: supported
          - classification: deprecated
            startTime: "2022-01-01T00:00:00Z"
          - classification: expired
            startTime: "2024-06-01T00:00:00Z"

      - version: 2.0.0
        lifecycle: # replaces the parent lifecycle entirely (the parent only defines a preview stage)
          - classification: supported
            startTime: "2040-01-07T06:28:16Z"
status:
  cloudProfileSpec:
    kubernetes:
      versions:
        - version: 1.27.0 # from base, no override

        - version: 1.28.0
          lifecycle:
            - classification: preview # from base, no override
            - classification: supported
              startTime: "2024-12-01T00:00:00Z"

        - version: 1.18.0
          lifecycle:
            - classification: supported # replaces the parent lifecycle
            - classification: deprecated
              startTime: "2022-01-01T00:00:00Z"
            - classification: expired
              startTime: "2024-06-01T00:00:00Z"

        - version: 2.0.0
          lifecycle:
            - classification: supported # replaces the parent lifecycle
              startTime: "2040-01-07T06:28:16Z"
```

Declaring and updating a `NamespacedCloudProfile` is straightforward and creating an invalid `NamespacedCloudProfile.Status` is prevented by our existing validations.

#### Validation Against Versions in Use

Regardless of the override semantics, the API must reject any `NamespacedCloudProfile` change, or a `Shoot`'s `cloudProfile` reference change, that would render a Kubernetes or machine image version currently in use by that `Shoot` `unavailable`.

#### Known Limitations

- **Drift from parent updates**: once a `NamespacedCloudProfile` overrides a version's lifecycle, it no longer receives future changes to that version's lifecycle in the parent `CloudProfile` (e.g. an expedited `expired` date); the override is a point-in-time snapshot, not a living link to the parent.
- **Copy-paste burden for partial overrides**: because replacement is atomic, overriding a single stage (e.g. postponing `expired`) requires repeating the entire lifecycle, including stages that aren't actually meant to change, which must then be kept in sync with the parent manually.
- **Backsliding is possible**: full replacement allows a `NamespacedCloudProfile` to declare a lifecycle that is "earlier" than the version's current effective stage in the parent (e.g. re-introducing `supported` for an already `expired` version).

## Considered Alternatives

In addition to the proposed approach, we considered several alternatives or variations of approaches. The main candidates are described below.

### Merging Individual Lifecycle Stages in NamespacedCloudProfiles (dropped)

Instead of replacing the lifecycle entirely, individual stages of a `NamespacedCloudProfile`'s lifecycle could be merged into the parent `CloudProfile`'s lifecycle. This was rejected because merging can lead to unintended results:

1. The start time of the `deprecated` stage might be between the ones of `preview` or `supported`, which would be invalid. Automatically adapting the start time of the `supported` stage in the controller would contradict the parent `CloudProfile`.
1. Postponing the start time of the `preview` stage to be later than the start time of the `supported` stage in the parent would be invalid. Automatically adapting the start time of the `supported` stage in the controller to be at the same start time as the overwritten `preview` stage would skip the preview stage entirely, again contradicting the user's intent.

These two scenarios are illustrated in the following example:
```yaml
# Parent CloudProfile
versions:
- version: 1.0.0
  lifecycle:
  - classification: preview
    startTime: "2026-06-01T00:00:00Z"
  - classification: supported
    startTime: "2026-08-01T00:00:00Z"
  - classification: deprecated
    startTime: "2026-10-01T00:00:00Z"
  - classification: expired
    startTime: "2026-12-01T00:00:00Z"

- version: 2.0.0
  lifecycle:
  - classification: preview
    startTime: "2026-06-01T00:00:00Z"
  - classification: supported
    startTime: "2026-08-01T00:00:00Z"

# NamespacedCloudProfile
versions:
- version: 1.0.0
  lifecycle:
  - classification: deprecated
    startTime: "2026-07-01T00:00:00Z" # earlier than the parent supported

- version: 2.0.0
  lifecycle:
  - classification: preview
    startTime: "2026-09-01T00:00:00Z" # later than the parent supported

# result
versions:
- version: 1.0.0 # case 1
  lifecycle:
  - classification: preview
    startTime: "2026-06-01T00:00:00Z"
  - classification: supported
    startTime: "2026-08-01T00:00:00Z" # would need to be advanced to 2026-07-01, which would make deprecated supersede supported
  - classification: deprecated
    startTime: "2026-07-01T00:00:00Z" # invalid: earlier than parent supported
  - classification: expired
    startTime: "2026-12-01T00:00:00Z"

- version: 2.0.0 # case 2
  lifecycle:
  - classification: preview
    startTime: "2026-09-01T00:00:00Z" # invalid: later than parent supported
  - classification: supported
    startTime: "2026-08-01T00:00:00Z" # would need to be postponed to 2026-09-01, which would make supported supersede preview
```

### Phased Introduction of Full Lifecycle Overrides

An intermediate step to retain the legacy classification behavior was also considered: allowing only `expired` overrides for now and adding full lifecycle override as a feature later.
This was rejected because introducing full override afterwards would itself be a backward-compatibility break — it would change the lifecycle of an already created `NamespacedCloudProfile` without the user's intent, if an operator enables full overrides later.

### Consequent Continuation of Current Approach

The first idea was to just extend the current API by adding further fields for the classification stages:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      - version: 1.30.6
        classification: unavailable
        previewDate: "2025-01-01T00:00:00Z"
        supportedDate: "2025-01-14T00:00:00Z"
        deprecationDate: "2025-03-01T00:00:00Z"
        expirationDate: "2025-06-01T00:00:00Z"
```

While this approach has the advantage that it just integrates with the current implementation (existing behavior is maintained), it was rejected because:

- Classification stages are defined as keys in the API, which feels wrong because these are enums and when adding a new stage the API definition is required to change. So this is considered an anti-pattern.
- All consumers of the `CloudProfile` are required to calculate the effective classification state that depends on time.
- The `*Date` suffix for the new fields still imply that a date would be sufficient without a time, which is not the case.

### Introduction of a Lifecycle Map

The next approach keeps the `classification` field itself, but moves the date fields into a new object to not pollute the `ExpirableVersion` struct.
This also offers the opportunity to better express the fact that date times are required to schedule the lifecycle of a version classification instead of just plain dates.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      - version: 1.30.6
        classification: supported
        lifecycle:
          preview:
            startTime: "2025-01-01T00:00:00Z"
          supported:
            startTime: "2025-01-14T00:00:00Z"
          deprecation:
            startTime: "2025-03-01T00:00:00Z"
          expiration:
            startTime: "2025-06-01T00:00:00Z"
```

In this case only the `expirationDate` needs to be deprecated. We discarded this approach mostly for the same reasons as the previous one:

- Classification stages are defined as keys in the API, which feels wrong because these are enums and when adding a new stage the API definition is required to change. So this is considered an anti-pattern.
- All consumers of the `CloudProfile` are required to calculate the effective classification state that depends on time.

### Status vs. Classification Field Patching

This consideration tries to avoid the introduction of a `status` field in the `CloudProfile` and instead updates the `spec` itself.

Here the `CloudProfile` reconciler patches the currently computed classification stage of a version back into `classification` or an eventually newly introduced sibling field like `currentClassification`.

```yaml
# assume that the current date is 2024-12-03
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: local
spec:
  kubernetes:
    versions:
      - version: 1.30.6
        classification: supported # the classification is patched by the reconciler and not set by the administrator
        lifecycle:
          - classification: preview
          - classification: supported
            startTime: "2024-12-01T00:00:00Z"
          - classification: deprecated
            startTime: "2025-03-01T00:00:00Z"
          - classification: expired
            startTime: "2025-04-01T00:00:00Z"
```

While this variant offers a user to directly see the computed classification stage in a field of the specification, we opted against it due to the following reasons:

- As it patches the spec, the administrator can no longer be seen as the sole owner of this resource. This breaks the goal to stay compatible with typical deployment strategies (deployment and reconciler may toggle the field value consistently).
- The gardener-apiserver validation needs to prevent setting the `classification` to a value that contradicts the stages inside `lifecycle`. When the gardener-controller-manager patches the field, potential time drifts of servers must be considered for the implementation, which is complex.

### Implementation Without the Status Field

This variant is more or less a placeholder for dropping the goal of reflecting the currently computed classification stage. Clients that consume the classification stage need to compute the current classification stage on their own.

We do not want to give up on this goal for the following reasons:

- If there is still a `classification` field, this is confusing for the human reader because four additional date time fields need to be considered.
- Every consumer of the `CloudProfile` needs to duplicate the computation of the actual classification stage. With one additional field this was fine enough, but with a complex lifecycle it certainly isn't.
