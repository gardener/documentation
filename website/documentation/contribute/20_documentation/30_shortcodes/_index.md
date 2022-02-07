---
title: Shortcodes
---

Shortcodes are the Hugo way to extend the limitations of Markdown before resorting to HTML. There are a number of built-in shortcodes available from Hugo. This list is extended with Gardener website shrotcodes designed specifically for its content.
Find a complete reference to the Hugo built-in shortcodes on its [website](https://gohugo.io/content-management/shortcodes/).

Below is a reference to the shortcodes developed for the Gardener website.

## alert
```
{{%/* alert color="info" */%}}
text
{{%/* /alert */%}}
```
produces
{{% alert color="info" %}}
A notice disclaimer
{{% /alert %}}
Except `info` other options are `info`|`warning`|`primary`.

{{% alert title="Warning" color="warning" %}}
The text that the "alerts" shortcode wraps will not be processed during site building. Do not use shortcodes in it.
{{% /alert %}}

## mermaid
Reference documentation [here](https://learn.netlify.com/en/shortcodes/mermaid/)
{{% alert title="Warning" color="warning" %}}
Mermaid diagrams do not scale and will trigger rendering of horizontal scrollbar on small devices if they overflow. Prefer vertical diagram layouts and use only if necessary.
{{% /alert %}}
```
{{%/* mermaid align="left" */%}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{%/* /mermaid */%}}
```
produces

{{<mermaid align="left">}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{</mermaid>}}