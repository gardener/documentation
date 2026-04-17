---
title: Working with Images
aliases: ["/docs/guides/contributors/content/images"]
weight: 15
---

Using images on the website has to contribute to the aesthetics and comprehensibility of the materials, with uncompromised experience when loading and browsing pages. That concerns crisp clear images, their consistent layout and color scheme, dimensions and aspect ratios, flicker-free and fast loading or the feeling of it, even on unreliable mobile networks and devices.

## Image Production Guidelines

A good, detailed reference for optimal use of images for the web can be found at web.dev's [Fast Load Times](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization?hl=en) topic. The following summarizes some key points plus suggestions for tools support.

You are strongly encouraged to use **vector images** (SVG) as much as possible. They scale seamlessly without compromising the quality and are easier to maintain.

If you are just now starting with SVG authoring, here are some tools suggestions: [Figma](https://www.figma.com/) (online/Win/Mac), [Sketch](https://www.sketch.com/) (Mac only).

For **raster images** (JPG, PNG, GIF), consider the following requirements and choose a tool that enables you to conform to them:

- Be mindful about image size, the total page size and loading times.
- Larger images (>10K) need to support _progressive rendering_. Consult with your favorite authoring tool's documentation to find out if and how it supports that.
- The site delivers the optimal media content format and size depending on the device screen size. You need to provide several variants (large screen, laptop, tablet, phone). Your authoring tool should be able to resize and resample images. Always save the largest size first and then downscale from it to avoid image quality loss.

If you are looking for a tool that conforms to those guidelines, [IrfanView](https://www.irfanview.com/) is a very good option.

**Screenshots** can be taken with whatever tool you have available. A simple Alt+PrtSc (Win) and paste into an image processing tool to save it does the job. If you need to add emphasized steps (1,2,3) when you describe a process on a screeshot, you can use [Snaggit](https://www.techsmith.com/screen-capture.html). Use red color and numbers. Mind the requirements for raster images laid out above.

**Diagrams** can be exported as PNG/JPG from a diagraming tool such as Visio or even PowerPoint. Pick whichever you are comfortable with to design the diagram and make sure you comply with the requirements for the raster images production above. Diagrams produced as SVG are welcome too if your authoring tool supports exporting in that format. In any case, ensure that your diagrams "blend" with the content on the site - use the same color scheme and geometry style. Do not complicate diagrams too much. The site also supports [Mermaid](https://mermaid-js.github.io/mermaid/#/) diagrams produced with markdown and rendered as SVG. You don't need special tools for them, but for more complex ones you might want to prototype your diagram wth Mermaid's [online live editor](https://mermaid.live/), before encoding it in your markdown. More tips on using Mermaid can be found in the [Shortcodes](./shortcodes.md#mermaid) documentation.

## Using Images in Markdown

The standard for adding images to a topic is to use markdown's `![caption](image-path)`. If the image is not showing properly, or if you wish to serve images close to their natural size and avoid scaling, then you can use HTML5's `<picture>` tag.

Example:

```html
<picture>
    <!-- default, laptop-width-L max 1200px -->
    <source srcset="image-link"
            media="(min-width: 1000px)">
    <!-- default, laptop-width max 1000px -->
    <source srcset="image-link"
            media="(min-width: 1400px)">
    <!-- default, tablets-width max 750px -->
    <source srcset="image-link"
            media="(min-width: 750px)">
    <!-- default, phones-width max 450px -->
    <img src="image-link" />
</picture>
```

When deciding on image sizes, consider the breakpoints in the example above as maximum widths for each image variant you provide. Note that the site is designed for maximum width 1200px. There is no point to create images larger than that, since they will be scaled down.

For a nice overview on making the best use of responsive images with HTML5, please refer to the [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) guide.
