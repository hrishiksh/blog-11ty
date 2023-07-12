---
title: Add table of content in Eleventy markdown blog
description: First, install the markdown-it-anchor plugin to add ids to heading elements. Then use the eleventy-plugin-toc plugin to generate the table of content.
date: 2023-07-12
related:
  - tailwind-css-eleventy
  - fetch-google-fonts-api
  - convert-svg-png-browser
---

If you are writing a long article, then a table of content helps the reader to skim through your content effectively. In this blog, I will show you how to add a table of content to your Eleventy markdown blog.

[Eleventy](https://www.11ty.dev/) is a static site generator, like [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/). Eleventy gives you free to structure your website in whatever way you like. This is why I like Eleventy more than any other static site generator.

## Prerequisites to follow this guide

Before following this guide, create an Eleventy site by following [official documentation](https://www.11ty.dev/docs/getting-started/) and add some markdown files in it with multiple headers.

## Add unique id to headings

Before generating a table of content for your articles, there must be associating ids to the heading elements. If there are no heading ids in your article, you can generate them using the [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) package.

As the name suggests, the `markdown-it-anchor` package depends on the [`markdown-it`](https://github.com/markdown-it/markdown-it) package, you have to install both in your Eleventy project.

```bash
npm install -D markdown-it markdown-it-anchor
```
Then add this plugin to your `.eleventy.js` file.

```js:.eleventy.js

const markdownit = require("markdown-it");
const anchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
    eleventyConfig.setLibrary("md", markdownit().use(anchor));
}
```
Now run the `eleventy --serve` command and inspect your headings. You will find unique ids in the headings elements.

## Generate Table of Content

Half of our work is done till this point. Now to generate a table of content in your Eleventy site, install the [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc) plugin.

```bash
npm install -D eleventy-plugin-toc
```
Then configure this plugin in the `.eleventy.js` file.

```js:.eleventy.js

const markdownit = require("markdown-it");
const anchor = require("markdown-it-anchor");
const tocPlugin = require("eleventy-plugin-toc");

module.exports = function (eleventyConfig) {
    eleventyConfig.setLibrary("md", markdownit().use(anchor));
    eleventyConfig.addPlugin(tocPlugin, { tags: ["h2", "h3"] });
}
```
Now go to your layout file and add the following code to generate a nice table of content.

{% raw %}
```html:base.njk

<aside>
  {{ content | toc | safe }}
</aside>
```
{% endraw %}

I am using the [nunjucks templating library](https://mozilla.github.io/nunjucks/), so I use an additional `safe` filter.

Now you can style the generated `<nav>` element as per your wish.

## Conclusion

In this quick guide, you have learned how to add a table of content to the Eleventy Markdown blog. First, you have added unique ids to heading elements. Then generate a table content and link to the respective heading elements using those unique ids.

If you like this guide, please share it with your coding buddies.