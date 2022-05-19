---
Title: Style Guide
---
This page gives writing style guidelines for the Gardener documentation. For formatting guidelines, see the [Formatting Guide](../20_format_guide/_index.md).

These are guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

* [Structure](#structure)
* [Language and Grammar](#language-and-grammar)

## Structure

### Documentation Types Overview
The following table summarizes the types of documentation and their mapping to the SAP UA taxonomy. Every topic you create will fall into one of these categories. 

| Gardener Content Type | Definition | Example | Content | Comparable UA Content Type |
|:----|:-----|:-----|:----|:----|
| Concept |  Introduce a functionality or concept; covers background information. | [Services](https://kubernetes.io/docs/concepts/services-networking/service/) | [Overview, Relevant headings](concept_template.md) | Concept |
| Reference | Provide a reference, for example, list all command line options of `gardenctl` and what they are used for. | [Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) | [Relevant headings](reference_template.md) | Reference |
| Task | A step-by-step description that allows users to complete a specific task. | [Upgrading kubeadm clusters](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/) |  [Overview, Prerequisites, Steps, Result](task_template.md) | Complex Task |
| Trail | Collection of all other content types to cover a big topic. | [Custom Networking](https://docs.oracle.com/javase/tutorial/networking/TOC.html) | None | Maps |
| Tutorial | A combination of many tasks that allows users to complete an example task with the goal to learn the details of a given feature.| [Deploying Cassandra with a StatefulSet](https://kubernetes.io/docs/tutorials/stateful-application/cassandra/) | Overview, Prerequisites, Tasks, Result | Tutorial |

See the [Contributors Guide](https://github.com/gardener/documentation/blob/master/website/documentation/contribute/_index.md) for more details on how to produce and contribute documentation.

### Topic Structure

When creating a topic, you will need to follow a certain structure. A topic generally comprises of, in order:

* [Metadata](#metadata) (Specific for `.md` files in Gardener) - Additional information about the topic.

* Title - A short, descriptive name for the topic.

* Content - The main part of the topic. It contains all the information relevant to the user.
    * Concept content: [Overview, Relevant headings](concept_template.md)
    * Task content: [Overview, Prerequisites, Steps, Result](task_template.md)
    * Reference content: [Relevant headings](reference_template.md)

* Related Links (Optional) - A part after the main content that contains links that are not a part of the topic, but are still connected to it. 

You can use the provided content description files as a template for your own topics.

### Metadata

Metadata is information housed in a specific section of the `.md` files used for the Gardener documentation. It can contain:
* Title - A short, descriptive name for the topic.
* Description - A succint summary of the topic's content. Must not include the title or repeat content from the topic.
* Other elements such as weight, creation date, author and tags.

Sample codeblock:
```
---
Title: 
Description:
Weight: 
---
```

While this section will be automatically generated if your topic has a title header, adding more detailed information helps other users, developers and technical writers better sort, classify and understand the topic. 

By using a metadata section you can also skip adding a title header or overwrite it in the navigation section. 

### General Tips

* Try to create a succint title and an informative description for your topics.
* If a topic feels too long, it might be better to split it into a few different ones.
* Avoid having have more than ten steps in one a task topic.
* When writing a tutorial, link the tasks used in it instead of copying their content.

## Language and Grammar

### Language
* Gardener documentation uses US English. 
* Keep it simple and use words that non-native English speakers are also familiar with.
* Use the [Merriam-Webster Dictionary](https://www.merriam-webster.com/) when checking the spelling of words.

### Writing Style

* Write in a conversational manner and use simple present tense. 
* Be friendly and refer to the person reading your content as "you", instead of standard terms such as "user". 
* Use an active voice - make it clear who is performing the action.

### Creating Titles and Headers

* Use [title case](https://titlecaseconverter.com/words-to-capitalize/) when creating titles or headers.
* Avoid adding additional formatting to the title or header.
* Concept and reference topic titles should be simple and succint.
* Task and tutorial topic titles begin with a verb.

## Related links
* [Formatting Guide](../20_format_guide/_index.md)
* [Contributors Guide](https://github.com/gardener/documentation/blob/master/website/documentation/contribute/_index.md)
* [SAPterm](https://www.sapterm.com/)