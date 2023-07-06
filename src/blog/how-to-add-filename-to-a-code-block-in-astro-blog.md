---
title: How to add filename to a code block in Astro blog
description: Install remark-code-titles plugin. Modify the Astro config file and
  add this remark plugin. Use :filename syntax to add a filename in your code
  block.
hero: /images/add-filename-to-code-block-in-astro.webp
date: 2023-02-11T06:27:48.812Z
author: Hrishikesh Pathak
tags:
  - web
  - javascript
related:
  - selfhost-google-font-local
  - sort-array-date-javascript
  - nextjs-prism-react-renderer
---

Most of the time adding a filename in a code block gives context to a reader. It helps the reader decide which file is created or modified. A file name in the code block improves the reader experience multi-fold.

Now the question is how to add a filename inside a markdown code fence. Is it even possible with markdown? 

So the answer is no. The default markdown spec doesn't support passing anything other than the code language. Forget about passing the filename from the code fence.

But you can extend the markdown features using plugins. Astro uses [Remark to process the markdown files](https://github.com/remarkjs/remark). Therefore you can use the Remark and Rehype plugin with Astro with minimal configuration.

## Using remark-code-titles extension

In this blog, I am using [remark-code-titles](https://github.com/mottox2/remark-code-titles) plugin. This plugin parses the filename from the markdown code fence and displays it in the HTML document. 

You can pass a file name using `:filename` notation to a code fence in the markdown file. This extension parses the markdown and extracts the filename from it. Then it displays the filename as a `<div>` element above the code block. In addition to this, it also applies `remark-code-title` class in every generated `<div>`. It makes the styling handier.

### Installation

Let's Install the `remark-code-titles` plugin [using npm](https://www.npmjs.com/package/remark-code-titles).

```bash
npm i remark-code-titles
```

### Configuration

Now open the `astro.config.mjs` file in your project and modify the markdown configuration. This modification will also work for mdx files.

```js:astro.config.mjs
import remarkCodeTitles from "remark-code-titles";

export default defineConfig({
  markdown: { remarkPlugins: [remarkCodeTitles] },
  integrations: [
    mdx(),
  ],
});
```

Here I add the `remarkCodeTitles` plugin as a `remarkPlugins` in the Astro configuration files.

## Usage in markdown and MDX document

To use this plugin, open a new markdown or MDX document. Then add a code fence using 3 backticks. Then append the filename of the code block using `:filename` syntax. That's it.

Now you can see an extra `<div>` element above your rendered code block which contain the filename. You can style the element using CSS by targeting the unique class `remark-code-title`.

## Conclusion

In this blog, you have learned how to add a filename or title to a code block. This can be simply done using a remark plugin called `remark-code-titles`. Astro offers a very easy way to integrate Remark and Rehype plugins. Check the official Astro documentation to know more about markdown extensions.