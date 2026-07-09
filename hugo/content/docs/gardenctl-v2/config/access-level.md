---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/config
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/config/access-level.md
  to: access-level.md
title: Access Level
prev: false
next: false
managed: true
---

# Kubeconfig Access Level

For shoots and seeds, `gardenctl` requests a kubeconfig from [`gardenlogin`](https://github.com/gardener/gardenlogin) with a configurable access level:

- `admin` - full cluster-admin credentials.
- `viewer` - read-only credentials with no access to encrypted resources (e.g. Secrets).
- `auto` - try admin first; fall back to viewer if admin is denied. Convenient when you don't know your RBAC up front; for users who *do* have admin, this is effectively the same as `admin`.

> [!NOTE]
> `auto` returns admin whenever your RBAC allows it. If you want guaranteed read-only access, configure `viewer` explicitly.

## Per-garden defaults

Set per-scope defaults per garden under `kubeconfigAccessLevelDefaults`. The `shoots` and `seeds` fields are independent - for example, an admin who wants least-privilege access to customer shoots while still keeping admin access for seed-level debugging would set:

```yaml
gardens:
  - identity: prd-garden
    kubeconfig: /path/to/kubeconfig.yaml
    kubeconfigAccessLevelDefaults:
      shoots: viewer
      seeds: admin
```

The same defaults can be set via the CLI rather than hand-editing the YAML:

```bash
gardenctl config set-garden prd-garden \
  --default-shoot-access-level viewer \
  --default-seed-access-level admin
```

When neither a flag nor a per-garden config is set, `gardenctl` omits `--access-level` and lets `gardenlogin`'s own default apply (currently `auto`).

## One-off overrides

Override per invocation with `--access-level` (or the `--admin` / `--viewer` shorthands), available on commands that produce a kubeconfig (`target`, `kubeconfig`, `kubectl-env`):

```bash
gardenctl kubeconfig --admin                       # one-off escalation
gardenctl target --shoot my-shoot --viewer         # one-off de-escalation
gardenctl kubeconfig --access-level=auto           # explicit auto (no shorthand)
```

The shorthands and the full form are mutually exclusive - pass at most one.

> [!NOTE]
> Flag overrides apply only to the invocation they're passed to. They are not persisted on disk, so a subsequent `gardenctl kubeconfig` (without a flag) re-resolves from the per-garden config defaults, not from the flag you passed to an earlier `gardenctl target`. For persistent changes set them via `gardenctl config set-garden`. You may also repeat the flags on `gardenctl kubeconfig`.

## Scope resolution

| You target... | Scope applied |
| --- | --- |
| `target shoot foo` (regular shoot) | `shoots` |
| `target seed bar` (managed seed) | `seeds` |
| `target shoot foo` where `foo` also backs a managed seed | `seeds` |
| `--control-plane` of a shoot | `seeds` (the underlying cluster *is* the seed) |

The "shoot that backs a managed seed" case is the non-obvious one: such a shoot **is** the seed cluster physically, so `target shoot foo` and `target seed foo` resolve to the same scope. Without this, setting `shoots: viewer` would silently leave managed-seed-backing shoots at whatever the `seeds:` policy is, which would be surprising.

## What the access level does *not* apply to

- The **garden cluster itself** - gardenctl uses your own kubeconfig as configured. There is no API to "downgrade" those credentials; if you want viewer-only access to the garden, point gardenctl at a kubeconfig whose underlying RBAC is read-only.
- **Non-managed seeds** - credentials come from a static `<name>.login` Secret in the garden cluster, of unknown privilege from gardenctl's perspective. Requesting `viewer` for a non-managed seed (via flag or the `seeds` default) returns an error rather than silently producing a kubeconfig that might not actually be read-only. `admin` and `auto` fall through to the static kubeconfig as-is.

## Verifying which access level is in use

When `gardenctl` explicitly chose an access level (via flag or per-garden config), it surfaces it inline after `target` and on stderr after `kubeconfig`:

```console
$ gardenctl target shoot prod-cluster --access-level=viewer
Successfully targeted shoot "prod-cluster" (access level: viewer)
```

For an explicit check, the access level is also embedded as a `--access-level=…` argument in the produced kubeconfig's exec plugin section (omitted when `gardenctl` deferred to `gardenlogin`'s default):

```bash
gardenctl kubeconfig | grep -- '--access-level='
```

## `kubectl-env` and symlink mode

`kubectl-env` honors `--access-level` only when `linkKubeconfig: false` is configured. In symlink mode (the default), `kubectl-env` just points `KUBECONFIG` at the existing session kubeconfig - re-run `gardenctl target ... --access-level=…` to change the level instead.
