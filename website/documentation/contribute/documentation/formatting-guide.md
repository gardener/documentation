---
title: Formatting Guide
---

This page gives writing formatting guidelines for the Gardener documentation. For style guidelines, see the [Style Guide](./style-guide/_index.md).

These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

* [Formatting of Inline Elements](#formatting-of-inline-elements)
* [Code Snippet Formatting](#code-snippet-formatting)
* [Related Links](#related-links)

## Formatting of Inline Elements

| Type of Text | Formatting | Markdown Syntax |
|:---|:---|:---|
| [API Objects and Technical Components](#api-objects-and-technical-components) | `code` | <code>Deploy a \`Pod\`.</code> |
| [New Terms and Emphasis](#new-terms-and-emphasis) | **bold** | `Do **not** stop it.` |
| [Technical Names](#technical-names) | `code` | <code>Open file \`root.yaml\`.</code> |
| [User Interface Elements](#user-interface-elements) | *italics* | `Choose *CLUSTERS*`. |
| [Inline Code and Inline Commands](#inline-code-and-inline-commands)| `code` | <code>For declarative management, use \`kubectl apply\`.</code> |
| [Object Field Names and Field Values](#object-field-names-and-field-values)|`code` | <code>Set the value of \`image\` to \`nginx:1.8\`.</code> |
| [Links and References](#links-and-references) | [link]() | `Visit the [Gardener website](https://gardener.cloud/)` |
| [Headers](#headers) | various | `# API Server` |


### API Objects and Technical Components

When you refer to an API object, use the same uppercase and lowercase letters
that are used in the actual object name, and use backticks (\`) to format them. Typically, the names of API
objects use [camel case](https://en.wikipedia.org/wiki/Camel_case).

Don't split the API object name into separate words. For example, use
`PodTemplateList`, not Pod Template List.

Refer to API objects without saying "object," unless omitting "object"
leads to an awkward construction.

|  Do  | Don't |
|:---|:---|
| The `Pod` has two containers.   | The pod has two containers.    |
| The `Deployment` is responsible for...   |  The Deployment object is responsible for...    |
| A `PodList` is a list of Pods. | A Pod List is a list of pods.  |
| The `gardener-control-manager` has control loops... | The gardener-control-manager has control loops...|
| The `gardenlet` starts up with a bootstrap `kubeconfig` having a bootstrap token that allows to create `CertificateSigningRequest` (CSR) resources. | The gardenlet starts up with a bootstrap kubeconfig having a bootstrap token that allows to create CertificateSigningRequest (CSR) resources. |

{{% alert color="info"  title="Note" %}}
Due to the way the website is built from content taken from different repositories, when editing or updating already existing documentation, you should follow the style used in the topic. When contributing new documentation, follow the guidelines outlined in this guide.
{{% /alert %}}

### New Terms and Emphasis

Use **bold** to emphasize something or to introduce a new term.

|  Do  | Don't |
|:---|:---|
|  A **cluster** is a set of nodes ...  | A "cluster" is a set of nodes ...    |
|  The system does **not** delete your objects.   | The system does not(!) delete your objects.    |

### Technical Names

Use backticks (\`) for filenames, technical componentes, directories, and paths.

|  Do  | Don't |
|:---|:---|
| Open file `envars.yaml`.   |  Open the envars.yaml file.   |
| Go to directory `/docs/tutorials`.   |  Go to the /docs/tutorials directory.   |
| Open file `/_data/concepts.yaml`.  | Open the /_data/concepts.yaml file. |

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
| Set the value of the `replicas` field in the configuration file.  | Set the value of the "replicas" field in the configuration file.    |
| The value of the `exec` field is an `ExecAction` object.  | The value of the "exec" field is an ExecAction object.    |
| Set the value of `imagePullPolicy` to `Always`. | Set the value of `imagePullPolicy` to "Always". |
| Set the value of `image` to `nginx:1.8`. | Set the value of `image` to nginx:1.8. |

### Links and References

|  Do  | Don't |
|:---|:---|
| Use a descriptor of the link's destination: "For more information, visit [Gardener's website](#links-and-references)." | Use a generic placeholder: "For more information, go [here](#links-and-references)." |
| Use relative links when linking to content in the same repository: `[Style Guide](../style-guide/_index.md)`| Use absolute links when linking to content in the same repository: `[Style Guide](https://github.com/gardener/documentation/blob/master/website/documentation/contribute/documentation/style-guide/_index.md)` |

Another thing to keep in mind is that markdown links do not work in certain [shortcodes](./shortcodes.md) (e.g., mermaid). To circumvent this problem, you can use HTML links.

### Headers

* Use H1 for the title of the topic. (`# H1 Title`)
* Use H2 for each main section. (`## H2 Title`)
* Use H3 for any sub-section in the main sections. (`### H3 Title`)
* Avoid using H4-H6. Try moving the additional information to a new topic instead.

## Code Snippet Formatting

### Don't Include the Command Prompt

|  Do  | Don't |
|:---|:---|
| `kubectl get pods`  | `$ kubectl get pods` |


### Separate Commands from Output

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

### Versioning Kubernetes Examples

Make code examples and configuration examples that include version information consistent with the accompanying text. Identify the Kubernetes version in the **Prerequisites** section.

## Related Links
* [Style Guide](./style-guide/_index.md)
* [Contributors Guide](../_index.md)