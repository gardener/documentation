---
title: Organisation
type: padding
---

## Content Organisation


This site uses Hugo. In Hugo, [content organization](https://gohugo.io/content-management/organization/) is a core concept.

{{% notice note %}}
**Hugo Tip:** Start Hugo with `hugo server --navigateToChanged` for content edit-sessions.
{{% /notice %}}


## Page Lists

### Page Order

The documentation side menu, the documentation page browser etc. are listed using Hugo's default sort order, which sorts by weight (from 1), date (newest first) and finally by the link title.

Given that, if you want to move a page or a section up, set a weight in the page's front matter:

```yaml
title: My Page
weight: 10
```


{{% notice note %}}
For page weights, it can be smart not to use 1, 2, 3 ..., but some other interval, say 10, 20, 30... This allows you to insert pages where you want later.
{{% /notice %}}

