---
title: Convert SVG into PNG in Cloudflare worker
description: Conversion of svg into a png file with Cloudflare worker is very easy due to the resvg library. You only have to pass the svg string to the resvg and it will generate the png buffer for you.
date: 2023-07-04
related:
    - generate-image-from-html-satori
    - convert-svg-png-browser
    - fetch-google-fonts-api
    - add-newsletter-website-hashnode
---

Converting an SVG image into PNG format can easily be done with the help of resvg-js library. As Cloudflare workers don’t support Nodejs native APIs, we will use a Web-assembly backend of resvg-js. 

## Install resvg-wasm package

You can install the `resvg-wasm` package from npm.

```bash
npm i @resvg/resvg-wasm
```

Then copy the `index_bg.wasm` file from the `resvg-wasm` package to your `src` directory.

```bash
cp node_modules/@resvg/resvg-wasm/index_bg.wasm ./src/
```

## Initialize resvg-wasm module

In your worker file, import `@resvg/resvg-wasm` package and the `index_bg.wasm` module.

```js
import { Resvg, ResvgRenderOptions, initWasm } from '@resvg/resvg-wasm';
import resvgwasm from './index_bg.wasm';
```

Now initialize the web assembly module using the `initWasm` function.

```js
try {
	await initWasm(resvgwasm as WebAssembly.Module);
} catch (error) {
	console.error('Resvg wasm not initialized');
}
```

## Convert SVG into PNG using resvg

Now we instantiate the `Resvg` object with the `svg` image file.

```js
const opts = {
	font: {
		loadSystemFonts: false,
	},
};

const resvg = new Resvg(svg,opts);
```

Then we use `render()` and `asPng()` methods to generate the PNG `Buffer`.

```js
const pngData = resvg.render();
const pngBuffer = pngData.asPng();
```

You can serve this PNG buffer directly from your Cloudflare worker with the appropriate header.

```js
return new Response(pngBuffer, {
	headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, immutable, no-transform, max-age=31536000' },
	status: 200,
});
```