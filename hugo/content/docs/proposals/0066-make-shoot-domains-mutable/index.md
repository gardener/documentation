---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0066-make-shoot-domains-mutable
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/proposals/0066-make-shoot-domains-mutable/README.md
  to: README.md
title: 0066 Make Shoot Domains Mutable
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
   https://github.com/gardener/enhancements/blob/main/geps/0066-make-shoot-domains-mutable/README.md
-->


# GEP-0066: Make Shoot Domains Mutable

## Summary
This GEP proposes to provide a mechanism to make both the internal and external domains of a Shoot mutable. In certain environments, the internal domain can even be removed completely. The migration process after changing, adding, or removing a domain is carried out as part of a CA rotation.

## Motivation
Every Gardener environment requires at least one DNS zone for managing "internal domains" of shoots. The internal domain can be configured only down to the seed level, hence it is under the control of the operator. This is especially useful when shoot owners can configure their own "external domain"/provider/zone for their shoot API servers (i.e., via `Shoot.spec.dns.domain`). The internal domain is used for all cluster-critical communication (e.g., kubelet/gardener-node-agent to API server) to ensure robustness and prevent disruptions caused by user misconfigurations.

Currently, an existing shoot's internal domain cannot be changed. However, in real life, there are several cases where domain names need to be changed also for existing shoots, for example because of a wrong configuration in the first place, or due to compliance reasons.

Some Gardener setups don't grant users access to the Shoot API, but offer a different ("proxy") API (e.g., STACKIT Kubernetes Engine). In those setups, the environment has full control over the external domain. As it is not configurable by the shoot owners, the environment can make sure that the external domain is valid and available. Having an internal domain in such an environment is not strictly necessary, at least not for the sake of robustness and availability.

As the internal domain can currently only be configured down to the seed level, all shoots on a seed share the same internal domain zone. Consequently, if that zone is public, a shoot's internal domain will be publicly exposed, even if the shoot resides in a private network zone.

Providing a way to manage these domains for existing shoots would improve the user experience for all of the described cases. Internal and external domains should be mutable; the internal domain should even be optional in cases where the external domain is sufficient.

### Goals
- Make a Shoot's external domain mutable.
- Make a Seed's internal domain configuration mutable.
- Make the internal domain optional on the Seed level, for example for Gardener setups where the customer doesn't have access to the Shoot API and therefore can't change the external domain.
- Support a seamless migration of a Shoot's internal and external domain via the CA rotation mechanism.
- Enforce that each Shoot has at least one valid domain.
- Protect the ability to modify a Shoot's domains to prevent undesired/accidental changes.

### Non-Goals
- Allowing Shoots without any valid domain.
- Replacing the DNS extension architecture.
- Modification of the DNS provider.
- Configuration through the `internal-domain` secret.

## Proposal

### Modify a Shoot's External Domain
To apply modifications of a Shoot's internal and external domain, the existing CA rotation mechanism is reused. While the internal domain is defined on the Seed level, the Shoot owner can modify the Shoot's external domain.

**Flow of Operation: Change the External Domain for a Single Shoot**
- The Shoot owner modifies the field `Shoot.spec.dns.domain` according to their needs **AND** adds the annotation `gardener.cloud/operation=rotate-ca-start` to trigger the migration.
- The two-phase CA rotation is started.
- In the `PREPARING` phase, the DNS records for new domain names are created and appended to the server certificates, while the old domain names are still kept in place to allow a seamless transition. The new and the old external domains are written to `Shoot.status.advertisedAddresses` as `external` and `prior-external`, so both domains are recorded as in use.
- When the `PREPARED` phase is reached, the cluster is available through its new domain names. Users need to ensure that they use the new domain and the new credentials to access the cluster from now on.
- In the `COMPLETING` phase, the obsolete DNS records are deleted and the corresponding domains are removed from the server certificates. The obsolete external domain is removed from `Shoot.status.advertisedAddresses`, leaving only the new one. Note that bound/projected tokens refresh automatically, but tokens acquired through the token request API will be invalid after the migration. Users must take care of renewing those tokens.

Adding the triggering annotation in the same step as the actual domain modifications is mandatory.

If the internal domain is disabled, the external domain is also used as service account issuer. Therefore, the old domain is added to the kube-apiserver's `serviceAccountConfig.acceptedIssuers` during the `PREPARING` phase, and later removed during the `COMPLETING` phase.

As described, the new external domain is written to `Shoot.status.advertisedAddresses` with the name `external`. After this, the external domain cannot be changed anymore for the ongoing migration. The precise point in the migration process (i.e., the phase and circumstances) at which this occurs will be determined during the implementation of this GEP. This gives rise to complex implications that are more easily examined using concrete code.

The domain provider cannot be modified. This can be implemented as a future improvement and is out of scope for this GEP.

### Modify the Internal Domain for an Entire Seed
The internal domain configuration is part of a Seed's spec in `Seed.spec.dns.internal` and affects all Shoots on this Seed. A modification of this structure's `domain` field requires a CA rotation of all Shoots. Since the CA rotation is a process that must be executed in a planned manner, adding the changed information to the Seed spec must not automatically trigger the CA rotation for the affected Shoots.

Besides the currently desired internal domain, it is also handy to have former internal domains still available in the Seed spec. Therefore, a new field `Seed.spec.dns.internalDomains` is introduced, which contains a list of internal domains. By definition, the first element in this list is the desired one. All other elements are former internal domains that may still be in use by Shoots that haven't been migrated yet.

To make the Shoot owners aware of the need for a CA rotation, a new constraint will be introduced on the Shoot level to provide the corresponding information.

To allow disabling the internal domain, a new field named `Seed.spec.dns.internalDomainEnabled` is introduced. The default value is `true` to keep the Seed spec backward compatible. A modification of this field also requires a CA rotation of all Shoots.

The internal domain may only be disabled if every Shoot on the Seed has a valid external domain, so each Shoot keeps at least one valid domain. Disabling the internal domain means, that the Shoot's external domain is used as default issuer for service accounts. This change requires a domain migration for all Shoots on the seed. This also means, that every Shoot on that Seed is migrated from an operator-controlled domain to an owner-controlled domain.

**Flow of Operation: Change the Internal Domain for All Shoots of a Seed:**
- The operator modifies `Seed.spec.dns.internal.domain` and `Seed.spec.dns.internalDomains` according to their needs. If the internal domain should be disabled, the `Seed.spec.dns.internalDomainEnabled` field is modified accordingly.
- If the gardenlet detects the mismatch in a Shoot, it adds the new constraint to Shoot's status to make the Shoot owners aware of the need for a CA rotation.
- Whenever a CA rotation is triggered for a specific Shoot on this Seed, the internal domain of this Shoot is migrated to the new internal domain.

**Flow of Operation: Apply Changes of the Internal Domain on a Shoot:**
- The Shoot owner adds the annotation `confirmation.gardener.cloud/migrate-internal-domain=true` to the Shoot to indicate that a migration of the internal domain can be conducted with the next CA rotation.
- Adds the annotation `gardener.cloud/operation=rotate-ca-start` to trigger the migration.
- The two-phase CA rotation is started.
- In the `PREPARING` phase, the DNS records for new domain names are created and appended to the server certificates, while the old domain names are still kept in place to allow a seamless transition. The new internal domain is written to `Shoot.status.advertisedAddresses` with the name `internal`; the old internal domain is added to `Shoot.status.advertisedAddresses` with the name `prior-internal`. So both the new and the old internal domain are recorded as in use. If the Shoot uses the default ServiceAccount token issuer — which is derived from the internal domain — the new issuer becomes the primary one (used to mint new tokens), and the old issuer is added to the kube-apiserver's `serviceAccountConfig.acceptedIssuers`, so tokens already issued with the old `iss` claim remain valid during the transition. If the internal domain is disabled, the external domain will be used as primary issuer for service accounts. In this case, the old domain must be added to the kube-apiserver's `serviceAccountConfig.acceptedIssuers`. The `confirmation.gardener.cloud/migrate-internal-domain=true` annotation is removed, similar to how `gardener.cloud/operation` is handled.
- When the `PREPARED` phase is reached, the cluster is available through its new domain names. Users need to ensure that they use the new domain and the credentials to access the cluster from now on.
- In the `COMPLETING` phase, the obsolete DNS records are deleted and the corresponding domains are removed from the server certificates. The obsolete internal domain is removed from `Shoot.status.advertisedAddresses`, leaving only the new one. Likewise, the old issuer is removed from the kube-apiserver's `serviceAccountConfig.acceptedIssuers` (see `PREPARING`). Note that bound/projected tokens refresh automatically, but tokens acquired through the token request API will be invalid after the migration. Users must take care of renewing those tokens.

Changing the default service account issuer will break external parties, that pin the old issuer URL and its endpoints. Those break at `COMPLETING`, when the prior domain is invalidated, which leads to a downtime. This effect must explicitly be mentioned in the user-facing action list for the `PREPARING` phase.

Adding the confirmation annotation in a separate step, before adding the triggering annotation, allows automated CA rotations to also conduct domain migrations.

### Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Worker nodes are unavailable due to broken domain name resolution. | Low | High | The old DNS records and certificate SANs are kept during the first phase of the CA rotation ("prepare"). Only when all worker nodes are rolled and available under the new domain configuration, the obsolete DNS records and certificate SANs are removed. |
| The domain configuration is inconsistent or invalid. | Low | High | The validation enforces that each Shoot has at least one valid domain. The CA rotation is only triggered if the domain configuration is consistent and valid. |
| Any user that has access to the Shoot resource can modify a cluster's external domain. | Mid | High | A misconfigured external domain can be detected and mitigated during the `PREPARED` phase of the migration process. |
| An automated CA rotation can accidentally modify or remove a Shoot's internal domain. | Mid | High | A new constraint provides the information that there is a change in the Shoot's internal domain. The user must allow the domain migration by explicitly setting the `confirmation.gardener.cloud/migrate-internal-domain=true` annotation on the Shoot. |
| Changing the default service account issuer will break external parties that pin the old issuer URL and its endpoints. Those break at `COMPLETING` and cannot be fixed without downtime. | Mid | High | This effect must be explicitly mentioned in the user-facing action list for the `PREPARED` phase of the domain migration. |

## Design Details

### API Changes

**Shoot Spec**:
- Allow the modification of `spec.dns.domain`.
- Add and handle the new `confirmation.gardener.cloud/migrate-internal-domain=true` annotation.

**Shoot Status**:
- Allow a new entry with name `prior-internal` in the `status.advertisedAddresses` while a CA rotation with domain migration is ongoing.
- Allow a new entry with name `prior-external` in the `status.advertisedAddresses` while a CA rotation with domain migration is ongoing.
- Add a new constraint that detects a mismatch between the Seed's and the Shoot's internal domain.

**Seed Spec**:
- Add the new field `spec.dns.internalDomains`.
- Add the new field `spec.dns.internalDomainEnabled` to indicate the need for an internal domain for the Shoots on this Seed.

The `spec.dns.internal` field will be deprecated and removed in the long term (see </contribute/developer-starter-kit/changing-the-api/#removing-a-field>). While both fields are in place, the gardener-apiserver will make sure they are in sync (defaulting `internalDomains[0]` from `internal` when only the latter is set, and mirroring it back).

An alternative configuration of the internal domain through the `internal-domain` secret is out of scope for this GEP.

### Extension of the CA Rotation Mechanism

**Phase 1 (Prepare)**:
- Deploy both old and new `DNSRecord` resources. Use new `role` labels `prior-internal` and `prior-external` for the old records.
- Update APIServer SANs to include both. Issue new kubeconfigs with the new domain.
- Maintain the old and new domain entries in the `status.advertisedAddresses`.

**Phase 2 (Complete)**:
- Clean up the old `DNSRecord` resources and remove the old domain from the SANs.
- Remove the prior domain entries from `status.advertisedAddresses`.

### Self-Hosted Shoot Exposure

Besides the Shoot reconciler, also the corresponding implementation in the `SelfHostedShootExposure` controller needs to be adapted accordingly (see <https://github.com/gardener/gardener/blob/master/pkg/gardenlet/controller/shoot/selfhostedshootexposure/reconciler.go>). This will be done in a phased manner, updating the `SelfHostedShootExposure` controller will be the last step in the implementation of this GEP. In the meantime, changing domains of self-hosted shoots must be denied.

The following changes must be applied to the `SelfHostedShootExposure` controller:
- Patch both external API DNS records. Use labels instead of the naming convention (`<shoot>-external`) to find them.
- Point both DNS records at the current control-plane node addresses.
- Treat the `prior-external` DNS record as optional, i.e. ignore `NotFound` errors.

### Validation
- Ensure a Shoot has at least one valid domain (either internal or external).
- Enforce that a Shoot has an external domain, if the Seed has the internal domain disabled (`Seed.spec.dns.internalDomainEnabled = false`). This especially affects create, update, and seed scheduling.
- Enforce that domain changes only occur in the same API request that prepares a CA rotation.
- Ensure that the external domain in a Shoot matches the default domains defined in the Seed, if there is no custom domain provider defined.
- Ensure that no entries are removed from `Seed.spec.dns.internalDomains` if there exists any Shoot on the Seed that is still using this internal domain. The field `Shoot.status.advertisedAddresses` is used to verify the use of internal domains (looking at the `internal` and `prior-internal` entries).
- Ensure that `Shoot.spec.dns.providers` are not modified while a domain migration is requested.
- Temporarily deny domain changes in self-hosted shoots (until the `SelfHostedShootExposure` controller is adapted accordingly).

### Feature Gate
A new feature gate `MutableShootDomains` is added to `gardener-apiserver` and `gardenlet`. The mutability of `Shoot.spec.dns.domain` and the new Seed fields `spec.dns.internalDomains`, `spec.dns.internalDomainEnabled` only take effect if the feature gate is enabled. No `prior-*` entries are added to `Shoot.status.advertisedAddresses`, no constraint about the need to execute a domain migration is added to `Shoot.status.constraints`.

The feature gate serves the purpose of disabling the feature in productive Gardener installations while it is still under development. It is enabled only in the local environment initially, and later used to safe-guard maturing and enablement. `gardener-apiserver` uses it to gate the validation (domain change requires a simultaneous `rotate-ca-start`), and `gardenlet` uses it to gate the domain migration during the CA rotation.

## Drawbacks
- increases the complexity of the reconciliation logic in Botanist

## Alternatives

### Options for Authorizing Shoot Domain Changes

This GEP does not propose to introduce a dedicated restriction to protect the Shoot's domain configuration from modifications by the owners.

### Modify the Internal Domain per Shoot

A broader variant of this GEP's idea would be to allow enabling/disabling the internal domain at the Shoot level. In contrast to the Seed spec, where only the operator has access, the Shoot spec can be modified by the Shoot owners. This implies a higher risk of misconfiguration.

It was **decided** that there should be no way to modify or enable/disable the internal domain at the Shoot level.

### Securing Control Over the Domain Configuration

It was examined to use a custom RBAC verb to protect the `Shoot.spec.dns.domain` field. If the Shoot owner sets a wrong external domain, the cluster cannot operate. The custom RBAC verb would prevent that.

It was **decided** to not introduce a special handling for this one field, as there are also other parts in the Shoot spec that can lead to an unusable state, which are not protected in this way. A misconfigured external domain can be detected and mitigated by the user during the `PREPARED` phase of the migration process.

### Other Alternatives

The following alternatives were considered as not applicable:

- **Manual Migration**: High risk of downtime and configuration errors.
- **Separate Rotation Resource**: Over-complicates the user experience compared to extending the already existing CA rotation mechanism.
- **Automatic CA Rotation on Domain Change**: A CA rotation has impact well beyond DNS. Requiring the annotation keeps users explicitly in control of a disruptive operation and guards against accidental/unintended domain changes silently triggering a full rotation.
