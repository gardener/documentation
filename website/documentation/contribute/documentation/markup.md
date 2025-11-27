---
title: Markdown
prev: false
next: false
---

# Markdown

Hugo uses [Markdown](https://www.markdownguide.org/) for its simple content format. However, there are a lot of things that Markdown doesn't support well. You could use pure HTML to expand possibilities. A typical example is reducing the original dimensions of an image.

However, use HTML judicially and to the minimum extent possible. Using HTML in markdowns makes it harder to maintain and publish coherent documentation bundles. This is a job typically performed by a publishing platform mechanisms, such as Hugo's layouts. Considering that the source documentation might be published by multiple platforms you should be considerate in using markup that may bind it to a particular one.

For the same reason, avoid inline scripts and styles in your content. If you absolutely need to use them and they are not working as expected, please create a documentation issue and describe your case.

> [!NOTE]
> Markdown is great for its simplicity but may be also constraining for the same reason. Before looking at HTML to make up for that, first check the [shortcodes](https://github.com/gardener/documentation/blob/master/website/documentation/contribute/documentation/shortcodes.md) for alternatives.
