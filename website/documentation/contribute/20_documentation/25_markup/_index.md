---
title: Markdown
---

Hugo uses Markdown for its simple content format. However, there are a lot of things that Markdown 
doesn’t support well. You could use pure HTML to expand possibilities. A typical example is reducing
the original dimensions of an image.

However, use HTML judicially and to the minimum extent possible. Using HTML in markdowns makes it
harder to maintain and publish coherent documentation bundles. This is a job typically performed by
a publishing platform mechanisms, such as Hugo's layouts. Considering that the source documentation
might be published by multiple platforms you should be considerate in using markup that may bind it 
to a particular one.

For that reason we no longer support Hugo shortcodes. Instead we plan to gradually introduce mechanisms 
to compensate for Markdowns's limitations with regard to creating documentation without departing from
'normal' Markdown towards a publishing platform.
