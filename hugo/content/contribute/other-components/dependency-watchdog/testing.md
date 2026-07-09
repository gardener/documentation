---
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: docs/development
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/other-components/dependency-watchdog/testing.md
  to: testing.md
persona: Developers
title: Testing
prev: false
next: false
managed: true
---

# Testing Strategy and Developer Guideline

Intent of this document is to introduce you (the developer) to the following:
* Category of tests that exists.
* Libraries that are used to write tests.
* Best practices to write tests that are correct, stable, fast and maintainable.
* How to run each category of tests.

For any new contributions **tests are a strict requirement**. `Boy Scouts Rule` is followed: If you touch a code for which either no tests exist or coverage is insufficient then it is expected that you will add relevant tests.

## Tools Used for Writing Tests

These are the following tools that were used to write all the tests (unit + envtest + vanilla kind cluster tests), it is preferred not to introduce any additional tools / test frameworks for writing tests:

### Gomega

We use gomega as our matcher or assertion library. Refer to Gomega's [official documentation](https://onsi.github.io/gomega/) for details regarding its installation and application in tests.

### `Testing` Package from Standard Library

We use the `Testing` package provided by the standard library in golang for writing all our tests. Refer to its [official documentation](https://pkg.go.dev/testing) to learn how to write tests using `Testing` package. You can also refer to [this](https://go.dev/doc/tutorial/add-a-test) example.

## Writing Tests

### Common for All Kinds
- For naming the individual tests (`TestXxx` and `testXxx` methods) and helper methods, make sure that the name describes the implementation of the method. For eg: `testScalingWhenMandatoryResourceNotFound` tests the behaviour of the `scaler` when a mandatory resource (KCM deployment) is not present.
- Maintain proper logging in tests. Use `t.log()` method to add appropriate messages wherever necessary to describe the flow of the test. See [this](https://github.com/gardener/dependency-watchdog/blob/master/controllers/endpoint/endpoints_controller_test.go) for examples.
- Make use of the `testdata` directory for storing arbitrary sample data needed by tests (YAML manifests, etc.). See [this](https://github.com/gardener/dependency-watchdog/tree/master/controllers) package for examples.
  - From https://pkg.go.dev/cmd/go/internal/test:
    > The go tool will ignore a directory named "testdata", making it available to hold ancillary data needed by the tests.

### Table-driven tests
We need a tabular structure in two cases:

- **When we have multiple tests which require the same kind of setup**:- In this case we have a `TestXxxSuite` method which will do the setup and run all the tests. We have a slice of `test` struct which holds all the tests (typically a `title` and `run` method). We use a `for` loop to run all the tests one by one. See [this](https://github.com/gardener/dependency-watchdog/blob/master/controllers/cluster/cluster_controller_test.go) for examples.
- **When we have the same code path and multiple possible values to check**:- In this case we have the arguments and expectations in a struct. We iterate through the slice of all such structs, passing the arguments to appropriate methods and checking if the expectation is met. See [this](https://github.com/gardener/dependency-watchdog/blob/master/internal/prober/scaler/scaler_test.go) for examples.

### Env Tests
Env tests in Dependency Watchdog use the `sigs.k8s.io/controller-runtime/pkg/envtest` package. It sets up a temporary control plane (etcd + kube-apiserver) and runs the test against it. The code to set up and teardown the environment can be checked out [here](https://github.com/gardener/dependency-watchdog/blob/master/internal/test/testenv.go).

These are the points to be followed while writing tests that use `envtest` setup:
- All tests should be divided into two top level partitions:
  1. tests with common environment (`testXxxCommonEnvTests`)
  1. tests which need a dedicated environment for each one. (`testXxxDedicatedEnvTests`)
  
  They should be contained within the `TestXxxSuite` method. See [this](https://github.com/gardener/dependency-watchdog/blob/master/controllers/cluster/cluster_controller_test.go) for examples. If all tests are of one kind then this is not needed.
- Create a method named `setUpXxxTest` for performing setup tasks before all/each test. It should either return a method or have a separate method to perform teardown tasks. See [this](https://github.com/gardener/dependency-watchdog/blob/master/controllers/cluster/cluster_controller_test.go) for examples.
- The tests run by the suite can be table-driven as well.
- Use the `envtest` setup when there is a need of an environment close to an actual setup. Eg: start controllers against a real Kubernetes control plane to catch bugs that can only happen when talking to a real API server.

> NOTE: It is currently not possible to bring up more than one envtest environments. See [issue#1363](https://github.com/kubernetes-sigs/controller-runtime/issues/1363). We enforce running serial execution of test suites each of which uses a different envtest environments. See [hack/test.sh](https://github.com/gardener/dependency-watchdog/blob/master/hack/test.sh).

### Vanilla Kind Cluster Tests
There are some tests where we need a vanilla kind cluster setup, for eg:- The `scaler.go` code in the `prober` package uses the `scale` subresource to scale the deployments mentioned in the prober config. But the `envtest` setup does not support the `scale` subresource as of now. So we need this setup to test if the deployments are scaled as per the config or not.
You can check out the code for this setup [here](https://github.com/gardener/dependency-watchdog/blob/master/internal/test/kind.go). You can add utility methods for different kubernetes and custom resources in there.

These are the points to be followed while writing tests that use `Vanilla Kind Cluster` setup:

- Use this setup only if there is a need of an actual Kubernetes cluster(api server + control plane + etcd) to write the tests. (Because this is slower than your normal `envTest` setup)
- Create `setUpXxxTest` similar to the one in `envTest`. Follow the same structural pattern used in `envTest` for writing these tests. See [this](https://github.com/gardener/dependency-watchdog/blob/master/internal/prober/scaler/scaler_test.go) for examples.

## Run Tests

To run unit tests, use the following Makefile target
```shell
make test
```
To run KIND cluster based tests, use the following Makefile target
```shell
make kind-tests # these tests will be slower as it brings up a vanilla KIND cluster
```
To view coverage after running the tests, run :
```shell
go tool cover -html=cover.out
```
## Flaky tests

If you see that a test is flaky then you can use `make stress` target which internally uses [stress tool](https://pkg.go.dev/golang.org/x/tools/cmd/stress)
```bash
make stress test-package=<test-package> test-func=<test-func> tool-params="<tool-params>"
```
An example invocation:
```bash
make stress test-package=./internal/util test-func=TestRetryUntilPredicateWithBackgroundContext tool-params="-p 10"
```
The make target will do the following:
1. It will create a test binary for the package specified via `test-package` at `/tmp/pkg-stress.test` directory.
1. It will run `stress` tool passing the `tool-params` and targets the function `test-func`.
