---
Title: Style Guide
prev: false
next: false
---
This page gives writing style guidelines for the Gardener documentation. For formatting guidelines, see the [Formatting Guide](../formatting-guide.md).

These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a Pull Request.

- [Structure](#structure)
  - [Documentation Types Overview](#documentation-types-overview)
  - [Structure and File Names](#structure-and-file-names)
  - [Topic Structure](#topic-structure)
  - [Front Matter](#front-matter)
  - [Alerts](#alerts)
  - [Images](#images)
  - [General Tips](#general-tips)
- [Language and Grammar](#language-and-grammar)
  - [Language](#language)
  - [Writing Style](#writing-style)
  - [Creating Titles and Headers](#creating-titles-and-headers)
- [Related Links](#related-links)

## Structure

### Documentation Types Overview

The following table summarizes the types of documentation and their mapping to the UA taxonomy. Every topic you create will fall into one of these categories.

| Gardener Content Type | Definition | Example | Content | Comparable UA Content Type |
|:----|:-----|:-----|:----|:----|
| Concept |  Introduce a functionality or concept; covers background information. | [Services](https://kubernetes.io/docs/concepts/services-networking/service/) | [Overview, Relevant headings](concept_template.md) | Concept |
| Reference | Provide a reference, for example, list all command line options of `gardenctl` and what they are used for. | [Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) | [Relevant headings](reference_template.md) | Reference |
| Task | A step-by-step description that allows users to complete a specific task. | [Upgrading kubeadm clusters](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/) |  [Overview, Prerequisites, Steps, Result](task_template.md) | Complex Task |
| Trail | Collection of all other content types to cover a big topic. | [Custom Networking](https://docs.oracle.com/javase/tutorial/networking/TOC.html) | None | Maps |
| Tutorial | A combination of many tasks that allows users to complete an example task with the goal to learn the details of a given feature.| [Deploying Cassandra with a StatefulSet](https://kubernetes.io/docs/tutorials/stateful-application/cassandra/) | Overview, Prerequisites, Tasks, Result | Tutorial |

See the [Contributors Guide](../../_index.md) for more details on how to produce and contribute documentation.

### Structure and File Names

When creating a new documentation topic or folder, it is important to adhere to a consistent and clear naming convention. This ensures that topics are easily identifiable and helps maintain a well-structured documentation repository. The title of your newly created content should be in dash-case (also known as kebab-case). This means each word in the file or folder name should be separated by a hyphen (-), and all letters should be in lowercase.

By default, this will also be the title of your topic in the website.

For example, a `new-topic-title.md` filename will generate the topic's title as "New Topic Title". You can customize the title by adding [front matter](#front-matter) to the top of your Markdown file.

If you would like to have a newly added folder appear in the website navigation, you need to add an `_index.md` file to it. As folders are hidden by default, this file will hold its title, description, weight, and other possible properties. For more information, see the [Front Matter](#front-matter) section.

### Topic Structure

When creating a topic, you will need to follow a certain structure. A topic generally comprises of, in order:

- [Metadata](#front-matter) (Specific for `.md` files in Gardener) - Additional information about the topic
- Title - A short, descriptive name for the topic
- Content - The main part of the topic. It contains all the information relevant to the user
  - Concept content: [Overview, Relevant headings](concept_template.md)
  - Task content: [Overview, Prerequisites, Steps, Result](task_template.md)
  - Reference content: [Relevant headings](reference_template.md)
- Related Links (Optional) - A part after the main content that contains links that are not a part of the topic, but are still connected to it

You can use the provided content description files as a template for your own topics.

### Front Matter

[Front matter](https://gohugo.io/content-management/front-matter) is metadata applied at the head of each content Markdown file. It is used to instruct the static site generator build process. The format is YAML and it must be enclosed in leading and trailing comment dashes (`---`).

Sample codeblock:

```yaml
---
title: Getting Started
description: Guides to get you accustomed with Gardener
weight: 10
aliases: ["/docs/old-getting-started-url"]
---

<topic-content>
```

There are a number of [predefined](https://gohugo.io/content-management/front-matter#predefined) front matter properties, but not all of them are considered by the layouts developed for the website. The most essential ones to consider are:

- `title` the content title that will be used as page title and in navigation structures. If not set, the title of the topic will be file name in uppercase (e.g., `new-topic-title.md` will be rendered as "New Topic Title").
- `description` describes the content. For some content types such as documentation guides, it may be rendered in the UI.
- `weight` a positive integer number that controls the ordering of the content in navigation structures. The lower it is, the higher the topic will be on the page. Topics with no set weight are sorted in alphabetical order, with any weighted topics appearing above them.
- `url` if specified, it will override the default url constructed from the file path to the content. Make sure the url you specify is consistent and meaningful. Prefer short paths. Do not provide redundant URLs!
- `persona` specifies the type of user the topic is aimed towards. Use only a single persona per topic.

  ```yaml
  persona: Users / Operators / Developers
  ```

- `aliases` is an array of strings that contain the old paths to the topic. Useful in case you need to rename or change the location of a topic, but want to keep any existing bookmarks.

While this section will be automatically generated if your topic has a title header, adding more detailed information helps other users, developers, and technical writers better sort, classify and understand the topic.

By using a metadata section you can also skip adding a title header or overwrite it in the navigation section.

### Alerts

If you want to add a note, tip or a warning to your topic, use the templates provides in the [Shortcodes](../shortcodes.md#alert) documentation.

### Images

If you want to add an image to your topic, it is recommended to follow the guidelines outlined in the [Images](../images.md) documentation.

### General Tips

- Try to create a succinct title and an informative description for your topics
- If a topic feels too long, it might be better to split it into a few different ones
- Avoid having have more than ten steps in one a task topic
- When writing a tutorial, link the tasks used in it instead of copying their content

## Language and Grammar

### Language

- Gardener documentation uses US English
- Keep it simple and use words that non-native English speakers are also familiar with
- Use the [Merriam-Webster Dictionary](https://www.merriam-webster.com/) when checking the spelling of words

### Writing Style

- Write in a conversational manner and use simple present tense
- Be friendly and refer to the person reading your content as "you", instead of standard terms such as "user"
- Use an active voice - make it clear who is performing the action

### Creating Titles and Headers

- Use [title case](https://titlecaseconverter.com/words-to-capitalize/) when creating titles or headers
- Avoid adding additional formatting to the title or header
- Concept and reference topic titles should be simple and succinct
- Task and tutorial topic titles begin with a verb

## Related Links

- [Formatting Guide](../formatting-guide.md)
- [Contributors Guide](../../_index.md)
- [Shortcodes](../shortcodes.md)
- [Images](../images.md)
