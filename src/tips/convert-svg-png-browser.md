---
title: Convert SVG into PNG in the browser using Resvg
description: resvg-wasm is an web assembly module that can be used in the browser to convert an SVG image into a PNG image. This is a step-by-step guide for the same implementation.
date: 2023-06-21
related:
    - generate-image-from-html-satori
    - convert-svg-to-png-cloudflare-worker
---

To convert SVG into PNG in the browser, you can use the [Resvg-js](https://github.com/yisibl/resvg-js) wasm module.

## Setting up the project

1. Create an `index.html` file and fetch `resvg-wasm` module.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <img id="output">
    <script src="https://unpkg.com/@resvg/resvg-wasm"></script>
</body>
</html>
```

2. create an `index.js` file and link it to the `index.html` file.

```html
<script type="module" src="./index.js"></script>
```

## Working with Resvg-wasm

Inside the `index.js` file, I am using an [IFEE function](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) expression. You can also add some event handlers to invoke javascript functions. But for simplicity, the code inside `index.js` will run immediately when the page loads.

1. First, initialize the `resvg-wasm` module using the `initWasm` method.

```js
await resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm")
  );
```

2. Now defining some options. You can check out for more options in the documentation.

```js
const opts = {
    fitTo: {
      mode: "width", // If you need to change the size
      value: 800,
    },
  };
```

3. This is the final part. Convert an SVG image into a PNG image using `resvg-wasm`

```js
const svg ='<svg>...</svg>'; // Input SVG, String or Uint8Array
  const resvgJS = new resvg.Resvg(svg, opts);
  const pngData = resvgJS.render(svg, opts); // Output PNG data, Uint8Array
  const pngBuffer = pngData.asPng();
  const pngURL = URL.createObjectURL(
    new Blob([pngBuffer], { type: "image/png" })
  );
  document.getElementById("output").src = pngURL;
```

4. Wrap the code inside an IFEE to invoke immediately on page load.

```js
(async function () {
	await resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm")
  );

	const opts = {
    fitTo: {
      mode: "width", // If you need to change the size
      value: 800,
    },
  };

	const svg ='<svg>...</svg>'; // Input SVG, String or Uint8Array
  const resvgJS = new resvg.Resvg(svg, opts);
  const pngData = resvgJS.render(svg, opts); // Output PNG data, Uint8Array
  const pngBuffer = pngData.asPng();
  const pngURL = URL.createObjectURL(
    new Blob([pngBuffer], { type: "image/png" })
  );
  document.getElementById("output").src = pngURL;
})();
```