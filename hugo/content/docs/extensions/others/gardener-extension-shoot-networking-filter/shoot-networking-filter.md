---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-networking-filter'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-filter/shoot-networking-filter.md
  to: shoot-networking-filter.md
persona: Users
title: Shoot Networking Filter
prev: false
next: false
managed: true
---

# Register Shoot Networking Filter Extension in Shoot Clusters

## Introduction
Within a shoot cluster, it is possible to enable the networking filter. It is necessary that the Gardener installation your shoot cluster runs in is equipped with a `shoot-networking-filter` extension. Please ask your Gardener operator if the extension is available in your environment.

## Shoot Feature Gate

In most of the Gardener setups the `shoot-networking-filter` extension is not enabled globally and thus must be configured per shoot cluster. Please adapt the shoot specification by the configuration shown below to activate the extension individually.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
...
```

## Opt-out

If the shoot networking filter is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      disabled: true
...
```

## Ingress Filtering

By default, the networking filter only filters egress traffic. However, if you enable blackholing, incoming traffic will also be blocked.
You can enable blackholing on a per-shoot basis.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      providerConfig:
        egressFilter:
          blackholingEnabled: true
...
```
Ingress traffic can only be blocked by blackhole routing, if the source IP address is preserved. On Azure, GCP and AliCloud this works by default.
The default on AWS is a classic load balancer that replaces the source IP by it's own IP address. Here, a network load balancer has to be
configured adding the annotation `service.beta.kubernetes.io/aws-load-balancer-type: "nlb"` to the service.
On OpenStack, load balancers don't preserve the source address.

When you disable `blackholing` in an existing shoot, the associated blackhole routes will be removed automatically.
Conversely, when you re-enable `blackholing` again, the iptables-based filter rules will be removed and replaced by blackhole routes.

## Ingress Filtering per Worker Group

You can optionally enable or disable ingress filtering for specified worker groups.
For example, you may want to disable blackholing in general but enable it for a worker group hosting an external API.
You can do so by using an optional `workers` field:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      providerConfig:
        egressFilter:
          blackholingEnabled: false
          workers:
            blackholingEnabled: true
            names:
              - external-api
...
```

Please note that only blackholing can be changed per worker group. You may not define different IPs to block or
disable blocking altogether.

## Custom IP

It is possible to add custom IP addresses to the network filter. This can be useful for testing purposes.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      providerConfig:
        egressFilter:
          staticFilterList:
          - network: 1.2.3.4/31
            policy: BLOCK_ACCESS
          - network: 5.6.7.8/32
            policy: BLOCK_ACCESS
          - network: ::2/128
            policy: BLOCK_ACCESS
...
```

## Event Logging

Block events are logged automatically into the linux kernel log of the node where the event occurred.

For example, consider a shoot cluster configured using the following configuration:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      providerConfig:
        egressFilter:
          staticFilterList:
          - network: 1.2.3.4/31
            policy: BLOCK_ACCESS
...
```

If a pod tries to access the IP address `1.2.3.4`, e.g. by running the command `curl https://1.2.3.4`, the following log message will be generated in the kernel log of the node where the pod is running:

```
Policy-Filter-Dropped:IN=califb3eb82ef50 OUT=ens5 MAC=ee:ee:ee:ee:ee:ee:8a:7f:1f:f9:a0:ca:08:00 SRC=100.64.0.7 DST=1.2.3.4 LEN=60 TOS=0x00 PREC=0x00 TTL=63 ID=33784 DF PROTO=TCP SPT=55012 DPT=443 WINDOW=65535 RES=0x00 SYN URGP=0 MARK=0x10000
```

Please note that the log message includes the source (`SRC`) and destination (`DST`) IP addresses and the port numbers (`SPT` & `DPT`).

The block events can be viewed using the `dmesg` command or various other tools displaying linux kernel logs. They are also available via the Gardener observability tools.

## Tag-Based Filtering

The extension supports two filter list formats:

**Basic Format (v1)** - Simple list without tags:
```json
[
  {"network": "10.0.0.0/8", "policy": "BLOCK_ACCESS"},
  {"network": "192.168.1.0/24", "policy": "ALLOW_ACCESS"}
]
```

**Tag-Based Format (v2)** - Entries with metadata tags for selective filtering:
```json
[
  {
    "entries": [
      {
        "target": "10.0.0.0/8",
        "policy": "BLOCK",
        "tags": [{"name": "Fruit", "values": ["Apple"]}]
      },
      {
        "target": "172.16.0.0/12",
        "policy": "BLOCK",
        "tags": [{"name": "Fruit", "values": ["Banana"]}]
      }
    ]
  }
]
```

When using the tag-based format, you can configure tag filters to override policies for entries matching specific tag criteria. This is useful when a centrally-managed filter list contains entries for multiple environments or severity levels, and you want to change the policy for specific subsets.

**Important:** Tag filters use **OR logic** for matching - an entry matches a tag filter if it has **ANY** of the specified tag values. **All entries are always included** in the result; tag filters only override the policies of matching entries.

Tag filters can be configured at both the **service level** (in the ControllerDeployment) and the **shoot level** (in the shoot specification). Shoot-level tag filters are **merged** with service-level filters, allowing shoot owners to add additional filtering criteria on top of the baseline filters defined by administrators.

### Tag Filtering with Policy Override

You can specify a `policy` field in tag filters to override the policy of matching entries. **If no policy is specified**, matching entries keep their original policies. This enables sophisticated filtering logic where you can apply different policies based on tag combinations:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      providerConfig:
        egressFilter:
          tagFilters:
          - name: Fruit
            values:
            - "Apple"
            - "Banana"
            policy: BLOCK_ACCESS
          - name: Color
            values:
            - "Green"
            policy: ALLOW_ACCESS
```

**How it works:**
1. **All entries are always included** in the result
1. Entries are evaluated against all tag filters
1. Matching entries have their policy overridden **only if** the tag filter specifies a `policy`
1. If multiple filters match with different policies, **priority order** determines the policy (filters listed later take precedence)
1. In the example above, entries tagged with `Fruit=Apple` or `Fruit=Banana` are blocked, **except** if they also have `Color=Green`, they are allowed (Color filter takes precedence)

**Example scenario:**

Given a filter list with these entries:
```json
[
  {
    "entries": [
      {"target": "10.0.0.1/32", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Apple"]}]},
      {"target": "10.0.0.2/32", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Banana"]}]},
      {"target": "10.0.0.3/32", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Apple"]}, {"name": "Color", "values": ["Green"]}]}
    ]
  }
]
```

With the tag filters shown above:
- `10.0.0.1` (Apple): **BLOCKED** - matches first filter (policy overridden to BLOCK_ACCESS)
- `10.0.0.2` (Banana): **BLOCKED** - matches first filter (policy overridden to BLOCK_ACCESS)
- `10.0.0.3` (Apple + Green): **ALLOWED** - matches both filters, but Color filter (listed later) takes precedence with ALLOW_ACCESS

## Filter List from Secrets

The extension supports reading filter lists from secrets in two ways:

1. **Project Secrets (Garden Cluster)** - Secrets synced by Gardener from the garden cluster
1. **Shoot Secrets (Shoot Cluster)** - Secrets stored directly in the shoot cluster

Both approaches support the same filter list formats (v1 and v2) and gzip compression.

### Option 1: Project Secrets (Synced from Garden Cluster)

The extension can read filter entries from a Secret that Gardener automatically syncs from the garden cluster to the seed cluster. This is useful when you have a large project-specific list of policies.

**Important:** The project Secret filters **replace** (not append to) the centrally downloaded filter list. This allows you to completely override the default filters while still being able to add shoot-specific static filters. See [Merge Behavior](#merge-behavior) below for details.

### 1. Create Secret in Garden Cluster

Create a Secret in your project namespace (garden cluster). You can use either the basic format (v1) or tag-based format (v2):

**Example using basic format (v1):**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: blocked-ips
  namespace: garden-myproject  # Your project namespace
type: Opaque
stringData:
  filterList: |
    [
      {"network": "10.250.0.0/16", "policy": "BLOCK_ACCESS"},
      {"network": "172.31.0.0/16", "policy": "BLOCK_ACCESS"}
    ]
```

**Example using tag-based format (v2):**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: blocked-ips
  namespace: garden-myproject  # Your project namespace
type: Opaque
stringData:
  filterList: |
    [
      {
        "entries": [
          {"target": "10.250.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Apple"]}]},
          {"target": "172.31.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Banana"]}]}
        ]
      }
    ]
```

### 1b. Create Gzipped Secret for Large Filter Lists (Optional)

For very large filter lists (thousands of entries), you can use gzip compression to stay within Kubernetes Secret size limits (1MB). The extension automatically detects and decompresses gzipped data.

**Example using basic format (v1):**

**Step 1: Create your filter list file**
```bash
cat > filterlist.json <<EOF
[
  {"network": "10.250.0.0/16", "policy": "BLOCK_ACCESS"},
  {"network": "172.31.0.0/16", "policy": "BLOCK_ACCESS"}
]
EOF
```

**Example using tag-based format (v2):**

**Step 1: Create your filter list file**
```bash
cat > filterlist.json <<EOF
[
  {
    "entries": [
      {"target": "10.250.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Apple"]}]},
      {"target": "172.31.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Banana"]}]}
    ]
  }
]
EOF
```

**Step 2: Compress with gzip**
```bash
gzip -c filterlist.json > filterlist.json.gz
```

**Step 3: Create Secret with compressed data**
```bash
kubectl create secret generic additional-blocked-ips \
  --from-file=filterList=filterlist.json.gz \
  --namespace=garden-myproject
```

Or using YAML:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: additional-blocked-ips
  namespace: garden-myproject
type: Opaque
data:
  filterList: <base64-encoded-gzipped-data>
```

To get the base64-encoded gzipped data:
```bash
base64 -i filterlist.json.gz
```

### 2. Add Resource Reference to Shoot Spec

**IMPORTANT**: You must list the Secret in `Shoot.spec.resources` for Gardener to sync it:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-myproject
spec:
  # This tells Gardener to sync the Secret to the seed cluster
  resources:
  - name: additional-blocked-ips
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: additional-blocked-ips
  
  extensions:
  - type: shoot-networking-filter
    providerConfig:
      apiVersion: shoot-networking-filter.extensions.config.gardener.cloud/v1alpha1
      kind: Configuration
      egressFilter:
        blackholingEnabled: true
        projectFilterListSource:
          name: additional-blocked-ips
          key: filterList  # Optional, defaults to "filterList"
```

### Format Support

The ConfigMap/Secret data can contain:

**V1 Format:**
```json
[
  {"network": "10.0.0.0/8", "policy": "BLOCK_ACCESS"},
  {"network": "192.168.1.0/24", "policy": "ALLOW_ACCESS"}
]
```

**V2 Format:**
```json
[
  {
    "entries": [
      {
        "target": "10.0.0.0/8",
        "policy": "BLOCK",
        "tags": [{"name": "Fruit", "values": ["Apple"]}]
      }
    ]
  }
]
```

### Option 2: Shoot Secrets (Directly from Shoot Cluster)

The extension can also read filter lists directly from secrets stored in the shoot cluster itself.

**Important:** `shootFilterListSource` and `projectFilterListSource` are **mutually exclusive** - you can only use one at a time.

#### 1. Create Secret in Shoot Cluster

Create a Secret in the shoot cluster. You can use either the basic format (v1) or tag-based format (v2):

**Example using basic format (v1):**
```bash
kubectl create secret generic my-filter-list \
  --namespace=my-namespace \
  --from-literal=filterList='[
    {"network": "10.250.0.0/16", "policy": "BLOCK_ACCESS"},
    {"network": "172.31.0.0/16", "policy": "BLOCK_ACCESS"}
  ]'
```

Or using YAML:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-filter-list
  namespace: my-namespace  # Can be any namespace
type: Opaque
stringData:
  filterList: |
    [
      {"network": "10.250.0.0/16", "policy": "BLOCK_ACCESS"},
      {"network": "172.31.0.0/16", "policy": "BLOCK_ACCESS"}
    ]
```

**Example using tag-based format (v2):**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-filter-list
  namespace: my-namespace
type: Opaque
stringData:
  filterList: |
    [
      {
        "entries": [
          {"target": "10.250.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Apple"]}]},
          {"target": "172.31.0.0/16", "policy": "BLOCK", "tags": [{"name": "Fruit", "values": ["Banana"]}]}
        ]
      }
    ]
```

**For large filter lists**, you can use gzip compression (same as project secrets):

```bash
# Create and compress filter list
cat > filterlist.json <<EOF
[
  {"network": "10.250.0.0/16", "policy": "BLOCK_ACCESS"},
  {"network": "172.31.0.0/16", "policy": "BLOCK_ACCESS"}
]
EOF
gzip -c filterlist.json > filterlist.json.gz

# Create secret with compressed data
kubectl create secret generic my-filter-list \
  --from-file=filterList=filterlist.json.gz \
  --namespace=my-namespace
```

#### 2. Configure Shoot Extension

Reference the shoot secret in your shoot configuration:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-myproject
spec:
  extensions:
  - type: shoot-networking-filter
    providerConfig:
      apiVersion: shoot-networking-filter.extensions.config.gardener.cloud/v1alpha1
      kind: Configuration
      egressFilter:
        blackholingEnabled: true
        # Reference the secret in the shoot cluster
        shootFilterListSource:
          name: my-filter-list
          namespace: my-namespace
          key: filterList         # optional, defaults to "filterList"
        # You can also add static filters
        staticFilterList:
        - network: "198.51.100.0/24"
          policy: "BLOCK_ACCESS"
        # And tag filters for v2 format lists
        tagFilters:
        - name: Fruit
          values:
          - "Apple"
          policy: BLOCK_ACCESS
```

### Merge Behavior

The extension supports three filter sources that are selected exclusively:

**Filter Source Selection:**
1. **Shoot Secret filters** (if `shootFilterListSource` is configured) — falls back to next source only if the secret does not exist yet; any other error (corrupt data, permission denied, etc.) fails the reconciliation
1. **Project Secret filters** (if `projectFilterListSource` is configured) — same fallback semantics: missing secret → fall through to downloaded data; other errors fail
1. **Downloaded filter list** (from service config) — used when no secret source is configured, or when the configured secret is not found yet
1. **Static filters** (from shoot providerConfig) — always merged with the selected source

**Key Points:**
- `shootFilterListSource` and `projectFilterListSource` are **mutually exclusive** (validation enforces this)
- Shoot Secret and Project Secret filters **replace** (not append to) the downloaded filter list
- Static filters are always merged regardless of the source
- Tag filtering is applied to whichever source is active (shoot, project, or downloaded)
- A missing secret is treated as "not yet created" and falls through gracefully; errors such as corrupt data or permission failures are hard errors

**When Shoot Secret is configured:**
1. Read **Shoot Secret filters** from shoot cluster — if the secret does not exist, fall through to project/downloaded source; any other error fails
1. Tag filtering (if configured) — applied to shoot filters
1. Static filter list (from shoot providerConfig) — merged with shoot filters

**When only Project Secret is configured:**
1. Read **Project Secret filters** — if the secret does not exist, fall back to downloaded data; any other error fails
1. Tag filtering (if configured) — applied to project filters
1. Static filter list (from shoot providerConfig) — merged with project filters

**When neither Shoot nor Project Secret is configured:**
1. Downloaded filter list (from service config)
1. Tag filtering (if configured) - applied to downloaded filters
1. Static filter list (from shoot providerConfig) - merged with downloaded filters

**Examples:**

*Example 1: Project Secret blocks, static filter allows*
- Project Secret: `{"network": "10.0.0.0/8", "policy": "BLOCK_ACCESS"}`
- Static filter: `{"network": "10.1.0.0/16", "policy": "ALLOW_ACCESS"}`
- **Result**: `10.0.0.0/8` is blocked, **except** `10.1.0.0/16` is carved out and allowed

*Example 2: Project Secret allows, static filter blocks*
- Project Secret: `{"network": "10.0.0.0/8", "policy": "ALLOW_ACCESS"}` (carves out from another block)
- Static filter: `{"network": "10.1.0.0/16", "policy": "BLOCK_ACCESS"}`
- **Result**: Both filters are applied - the ALLOW carves out from broader blocks, and the BLOCK adds `10.1.0.0/16` to the block list

*Example 3: Downloaded data vs static filters (when no Project Secret is configured)*
- Downloaded data: `{"network": "192.168.0.0/16", "policy": "BLOCK_ACCESS"}`
- Static filter: `{"network": "192.168.1.0/24", "policy": "ALLOW_ACCESS"}`
- **Result**: `192.168.0.0/16` is blocked, **except** `192.168.1.0/24` is carved out and allowed

The key principle: **ALLOW_ACCESS policies carve out exceptions from BLOCK_ACCESS policies**. All filters from the active source (project Secret OR downloaded) are merged with static filters, then ALLOW entries remove subnets from BLOCK entries.

This allows to completely override the default filter list while still being able to add shoot-specific static filters.
