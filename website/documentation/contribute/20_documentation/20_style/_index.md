---
title: Style Guide
---

This page gives writing style guidelines for the Gardener documentation.
These are guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

* [Language](#language)
* [Formatting of Inline Elements](#formatting-of-inline-elements)
* [Code Snippet Formatting](#code-snippet-formatting)

## Language

* Gardener documentation uses US English. 
* Keep it simple and use words that non-native English speakers are also familiar with.

## Formatting of Inline Elements

| Type of Text | Formatting | Markdown Syntax |
|:---|:---|:---|
| [User Interface Elements](#user-interface-elements) | *italics* | `Choose *CLUSTERS*`. |
| [New Terms and Emphasis](#new-terms-and-emphasis) | **bold** | `Do **not** stop it.` |
| [Technical Names](#technical-names) | `code` | <code>Open file \`root.yaml\`.</code> |
| [API Objects and Technical Components](#api-objects-and-technical-components) | `code` | <code>Deploy a \`Pod\`.</code> |
| [Inline Code and Inline Commands](#inline-code-and-inline-commands)| `code` | <code>For declarative management, use \`kubectl apply\`.</code> |
| [Object Field Names and Field Values](#object-field-names-and-field-values)|`code` | <code>Set the value of \`image\` to \`nginx:1.8\`.</code> |


### User Interface Elements

When referring to UI elements, refrain from using verbs like "Click" or "Select with right mouse button". This level of detail is hardly ever needed and also invalidates a procedure if other devices are used. For example, for a tablet you'd say "Tap on".

Use *italics* when you refer to UI elements.

| UI Element | Standard Formulation | Markdown Syntax |
|:---|:---|:---|
| Button, Menu path | Choose *UI Element*. | `Choose *UI Element*.` |
| Menu path, context menu, navigation path  |  Choose *System* \> *User Profile* \> *Own Data*. | `Choose *System* \> *User Profile* \> *Own Data*.` |
| Entry fields | Enter your password. | `Enter your password.` |
| Checkbox, radio button | Select *Filter*. | `Select *Filter*.` |
| Expandable screen elements | Expand *User Settings*.<br>Collapse *User Settings*. | `Expand *User Settings*`.<br>`Collapse *User Settings*.` |


### New Terms and Emphasis

Use **bold** to emphasize something or to introduce a new term.

|  Do  | Don't |
|:---|:---|
|  A **cluster** is a set of nodes ...  | A "cluster" is a set of nodes ...    |
|  The system does **not** delete your objects.   | The system does not(!) delete your objects.    |


### Technical Names

Use code style (using backticks) for filenames, technical componentes, directories, and paths.

|  Do  | Don't |
|:---|:---|
| Open file `envars.yaml`.   |  Open the envars.yaml file.   |
| Go to directory `/docs/tutorials`.   |  Go to the /docs/tutorials directory.   |
| Open file `/_data/concepts.yaml`.  | Open the /_data/concepts.yaml file. |


### API Objects and Technical Components

When you refer to an API object, use the same uppercase and lowercase letters
that are used in the actual object name, and use backticks to format them. Typically, the names of API
objects use
[camel case](https://en.wikipedia.org/wiki/Camel_case).

Don't split the API object name into separate words. For example, use
`PodTemplateList`, not Pod Template List.

Refer to API objects without saying "object," unless omitting "object"
leads to an awkward construction.

|  Do  | Don't |
|:---|:---|
| The `Pod` has two containers.   | The pod has two containers.    |
| The `Deployment` is responsible for ...   |  The Deployment object is responsible for ...    |
| A `PodList` is a list of Pods. | A Pod List is a list of pods.  |
| The `gardener-control-manager` has control loops... | The gardener-control-manager has control loops...|
| The `gardenlet` starts up with a bootstrap `kubeconfig` having a bootstrap token that allows to create `CertificateSigningRequest` (CSR) resources. | The gardenlet starts up with a bootstrap kubeconfig having a bootstrap token that allows to create CertificateSigningRequest (CSR) resources. |

### Inline Code and Inline Commands

Use backticks (\`) for inline code.

|  Do  | Don't |
|:---|:---|
|  The `kubectl run` command creates a `Deployment`.  | The "kubectl run" command creates a Deployment.    |
|  For declarative management, use `kubectl apply`.  | For declarative management, use "kubectl apply".  |

### Object Field Names and Field Values

Use backticks (\`) for field names, and field values.

|  Do  | Don't |
|:---|:---|
| Set the value of the `replicas` field in the configuration file.   | Set the value of the "replicas" field in the configuration file.    |
| The value of the `exec` field is an `ExecAction` object.   | The value of the "exec" field is an ExecAction object.    |
| Set the value of `imagePullPolicy` to `Always`. | Set the value of `imagePullPolicy` to "Always". |
| Set the value of `image` to `nginx:1.8`. | the value of `image` to nginx:1.8. |


## Code Snippet Formatting

### Don't include the command prompt

|  Do  | Don't |
|:---|:---|
| `kubectl get pods`  | `$ kubectl get pods` |


### Separate commands from output

<code>
Verify that the pod is running on your chosen node:

    kubectl get pods --output=wide

The output is similar to:

    NAME     READY     STATUS    RESTARTS   AGE    IP           NODE
    nginx    1/1       Running   0          13s    10.200.0.4   worker0
</code>

### Placeholders

Use angle brackets for placeholders. Tell the reader what a placeholder
represents, for example:

<code>

Display information about a pod:
```
kubectl describe pod <pod-name>
```

`<pod-name>` is the name of one of your pods.

</code>


### Versioning Kubernetes examples

Make code examples and configuration examples that include version information consistent with the accompanying text. Identify the Kubernetes version in the **Prerequisites** section.
