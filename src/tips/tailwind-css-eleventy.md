---
title: Use TailwindCSS with Eleventy Static Site Generator
description: A guide to using Tailwindcss and Eleventy with auto reloading feature. You will also learn to add DaisyUI in conjunction with TailwindCSS.
date: 2023-07-11
related:
  - table-of-content-eleventy
  - fetch-google-fonts-api
  - convert-svg-png-browser
---
If you are building a blog with Eleventy and want to add TailwindCSS for styling, then this is the guide for you. Please read till the end don't skip any steps.

[TailwindCSS](https://tailwindcss.com) is a CSS library that uses utility classes to style HTML markup. Therefore, now you don't have to go back and forth from your HTML to CSS files to apply any style. Just declare the utility classes and TailwindCSS will handle the rest.

[Eleventy](https://www.11ty.dev/) is a very simple static site builder. Eleventy converts markdown and template languages such as Nunjucks and Liquid to plain HTML. Eleventy is a non-opinionated library and gives you complete freedom as a developer.

## Prerequisite to follow this guide

I hope you have experience with javascript and CSS. If you have previously used TailwindCSS then it helps but is not necessary. You can pick TailwindCSS along the way. Eleventy is simple, no prior experience is required.

If you don't have an Eleventy project ready, please create one by following this [official documentation](https://www.11ty.dev/docs/getting-started/).

## Installation

First, install `tailwindcss` package as a developer dependency in your project.

```bash
npm install -D tailwindcss
```
Now initialize `tailwindcss` by the following command.

```bash
npx tailwindcss init
```
This command creates a `tailwind.config.js` file in your project root. Inside this file, add the path to your HTML and template files.

```js:tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
As my HTML and template files are present inside the `src` directory and I use Nunjucks as my templating language, I have added `"./src/**/*.{html,njk}"` in the `content` key.

Now, create a `style.css` file and add these 3 lines.

```css:style.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```
Lastly, the `package.json` file and add a script `dev:tailwind`.

```json:package.json

{
    "dev:tailwind": "tailwindcss -i ./src/style/base.css -o ./_site/output.css --watch",
}
```
When you run `npm run dev:tailwind`, this script generates an `output.css` file in the `_site` directory.

`_site` is the default out directory of eleventy. If you have configured a different out directory in your `eleventy.js` file, then change the script accordingly.

## Link TailwindCSS from HTML and template files

Open your HTML or any template file and link the `output.css` using the HTML `<link>` tag.

```html:index.njk

<link rel="stylesheet" href="/output.css"/>
```
Now the setup is complete. Start Eleventy server is one terminal using `eleventy --serve` and run `npm run dev:tailwind` in another terminal.

When you add any TailwindCSS class in your template, TailwindCSS generates the related CSS on the fly and you can see the style reflected in the browser window instantly.

## Add DaisyUI with TailwindCSS

If you don't want to write long Tailwind classes and want a pre-made UI component, then [DaisyUI](https://daisyui.com/) may be the perfect companion for you. DaisyUI is a Tailwind extension and doesn't require any serious setup.

First, install the DaisyUI library.

```bash
npm install -D daisyui
```
Now edit your `tailwind.config.js` file to add DaisyUI.

```js:tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}", "./.eleventy.js"],
  theme: {
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("daisyui")],
};
```
That's it. Daisy UI gives you light and dark themes out of the box. You can also customize those themes to your liking.

Go through the [DaisyUI documentation](https://daisyui.com/components/) to see what components are available to you for use in your project.

## Production build of Eleventy and TailwindCSS

After you finish developing your Eleventy project with TailwindCSS, it is important to make an optimized build. Add the following script to your `package.json` file.

```json:package.json

{
    "build": "eleventy && tailwindcss -i ./src/style/base.css -o ./_site/output.css --minify",
}
```
When you run the `npm run build` command, eleventy export your content into static HTML, and Tailwind creates a minified CSS file for optimized performance.

## Conclusion

In this guide, you have learned how to add TailwindCSS to your Eleventy project. In addition to these, you have learned about daisyUI to make beautiful components using TailwindCSS.

If you learned something new, please share it with your followers and connections. In the meantime, you can read the following articles.