---
title: Generate images from HTML markup using Satori
description: Sartori is a library that convert a html, css markup intro an svg image. It supports only JSX syntax but using a helper library satori-html, HTML can also be used in satori.
date: 2023-07-03
related: 
    - convert-svg-to-png-cloudflare-worker
    - convert-svg-png-browser
    - fetch-google-fonts-api
---

Satori is a library that converts [JSX syntax into SVG](https://github.com/vercel/satori)(Scalable vector graphics) images. JSX is a fancy way to write HTML markup inside Reactjs. 

But there is a way to use native HTML in satori without JSX elements. Follow this article to know more.

## Installing dependencies

Install `satori` and `satori-html` as a dependency to your project.

```bash
npm i satori satori-html
```

## Using Satori with HTML markup

1. Inside your project import the installed dependency.

```js
import { html } from "satori-html";
import satori from "satori";
```

1. Now write the HTML and CSS markup inside the `HTML`-tagged template string.

```js
 const template = html`<div
    style="
          display: flex;
          flex-direction: column;
          position: absolute;
          bottom: 100px;
          left: 100px;
          margin-right: 100px;
        "
  >
    <h1
      style="
            font-family: nunito;
            font-size: 60px;
            color: white;
            font-weight: bold;
          "
    >
      How to get the frame rate of a video using ffmpeg
    </h1>
    <div
      style="
            display: flex;
            color: #c5c5c5;
            font-family: nunito;
            font-size: 30px;
            align-items: center;
            gap: 10px;
            font-weight: 500;
          "
    >
      <p>hrishikeshpathak.com</p>
      <p>|</p>
      <p>7 July</p>
      <p>|</p>
      <p>#ffmpeg</p>
      <p>#linux</p>
    </div>
  </div>`;
```

1. Now use Satori to convert the generated [Satori-friendly Virtual DOM](https://github.com/natemoo-re/satori-html) into an SVG image.

```js
const svg = await satori(template, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "nunito",
      data: await readFile("./resources/Nunito-Regular.ttf"),
      weight: 400,
      style: "normal",
    },
    {
      name: "nunito",
      data: await readFile("./resources/Nunito-Medium.ttf"),
      weight: 500,
      style: "normal",
    },
    {
      name: "nunito",
      data: await readFile("./resources/Nunito-Bold.ttf"),
      weight: 700,
      style: "normal",
    },
  ],
});
```

## Inner working of this process

As Satori supports JSX syntax to process intro SVG images, the `satori-html` package converts the `html` string intro satori-friendly Virtual DOM. Therefore, satori can easily parse the VDOM and generate SVG Images from it.