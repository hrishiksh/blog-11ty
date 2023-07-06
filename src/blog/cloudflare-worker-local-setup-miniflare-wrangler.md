---
title: A better way to set up a Cloudflare worker project locally with Miniflare
description: Set up a local Cloudflare worker project with Miniflare, esbuild, and wrangler. It improves the dev experience and facilitates one-click deployment.
hero: /images/cloudflare-worker-local-setup-miniflare-wrangler.webp
date: 2023-01-21
author: Hrishikesh Pathak
tags:
  - web
  - cloudflare
  - javascript
related:
  - deploy-nextjs-cloudflare-pages
  - selfhost-google-font-local
  - flutter-web-hosting-cloudflare
  - svelte-gh-pages
---

[Cloudflare worker](https://workers.cloudflare.com/) is a serverless computing platform offered by Cloudflare. Unlike other serverless platforms like AWS Lambda or google cloud function, Cloudflare worker has a 0ms cold start. Which makes your code runs almost instantly when a request comes.

Cloudflare worker leverages the global Cloudflare infrastructure and deploy your script in every region of the world. Once you publish your worker script Cloudflare ensures you have the same superfast speed irrespective of your user location and traffic.

In addition to all these features, Cloudflare worker is also paired with serverless edge storage called [workers KV](https://developers.cloudflare.com/workers/learning/how-kv-works/) which is equally responsive to Cloudflare worker. If you have a read-heavy application and don't want to waste time on maintaining servers, then Cloudflare worker may be the perfect choice for you.

## Install Miniflare to start developing worker scripts locally

As far as we have discussed many positive features of Cloudflare workers that it seems almost irresistible to try out this service. But the primary roadblock for Cloudflare workers is its developer experience.

Cloudflare provides you with a very nice [CLI tool called wrangler](https://developers.cloudflare.com/workers/wrangler/) to develop your worker script and publish it on the Cloudflare platform. But wrangler should constantly be connected with Cloudflare servers and requires a steady internet connection to work.

It is a major setback for developers who want a nice and responsive developer experience to build new things with workers. The responsiveness of the wrangler project is compromised due to network latency. Now the obvious question should be, **"is there any solution to this problem? Can I improve my Cloudflare worker development experience?"**

Recently Cloudflare introduces [Miniflare](https://miniflare.dev/). As its name suggests, Miniflare is a feature-rich but miniature version of Cloudflare worker. Miniflare is a simulator that provides an environment for developing and testing Cloudflare worker scripts locally. Miniflare is written in typescript and supports most of the Cloudflare worker features like the KV database, durable objects, WebSockets, etc.

In addition to all these features, miniflare is fully local and works without an internet connection. It can instantly reload the server on code changes and provide an all-rounded developer experience.

To install miniflare in your project, first scaffold a Nodejs project inside a directory by running:

```bash
npm init -y
```

Now install the miniflare package by simply installing the miniflare package from npm as a development dependency.

```bash
npm i -D miniflare
```

Open your `package.json` file and add `"main":"./src/index.js"` field. This helps miniflare to decide which JavaScript file to run when you start your miniflare server.

```json
{
  "name": "miniflare project",
  "version": "1.0.0",
  "main": "./src/index.js"
}
```

Let's add a script to our `package.json` file to run the miniflare server in watching mode. This script restarts our server when some code changes and make our development faster.

```json
{
  ...
  "scripts": {
    "dev": "miniflare -w",
  },
  ...
}
```

After all the initial setup is complete, let's write your first hello world worker and run using miniflare.

## Write your first hello world Cloudflare Worker script

First, create a `src` directory in your project root and then create a `index.js` file. Cloudflare Worker supports javascript by default. They choose javascript because javascript runs on a secure sandboxing environment by default.

But if you are not very familiar with javascript, you can also write worker scripts using C, C++, and Rust programming language and compile them into a web assembly binary. Cloudflare workers can run web assembly code, but this method posed a toll on the performance. Please keep that in mind.

Inside our `index.js` file, we create a `fetch` event listener. When a user requests the server, the fetch event is triggered and the callback function within it is executed. It is very similar to the front-end javascript code.

Inside the callback function, we create a `Response` object and send it back to the user using the `event.respondWith` method.

```js
addEventListener("fetch", (event) => {
  event.respondWith(new Response("Hello world"));
});
```

To run this code, in your terminal run the `npm run dev` command. It calls the miniflare server to start and watch for any file change. Miniflare server starts in port `8787` and you can access it from your browser by visiting the `http://localhost:8787` address.

Congratulations🎉! You have made your first Cloudflare worker script.

## Return JSON response from Cloudflare Worker

If you are making a REST API server using Cloudflare worker, then it is more sensible to send a JSON response to the client rather than some plain text.

In Cloudflare worker, to send JSON response, you have to set the `content-type` header to `application/json;charset=UTF-8`. Thus the client understands that a JSON response is coming from the server.

In addition to setting the header, you should also send a valid JSON object as a response so that the client can parse and extract the data easily. In JavaScript, we can use the `JSON.stringify` method to convert an object into a valid JSON string.

```js
addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(JSON.stringify({ msg: "Hello world" }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 200,
    })
  );
});
```

In the above example, I respond to the incoming request with a JSON object. The first parameter in the `Response` object is always the body and after that, you can define your headers.

In addition to the headers, I have also sent a status code. This is completely optional and you can omit this entirely.

## How to make network requests using Cloudflare worker

If you intend to communicate other services from Cloudflare worker, you can easily achieve this functionality using the `fetch` API. You can use the `fetch` API to make an HTTP request from Cloudflare Worker.

For demonstration, I am sending a GET request to a [placeholder REST API endpoint](https://jsonplaceholder.typicode.com/users). But you can make any type of request using the `fetch` API. If you are not very familiar with `fetch`, then this is a very [intuitive guide from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) that covers how to use fetch to make an HTTP request from your browser.

We all know that network requests are `async` in nature. We have to wait a bit before expecting a response from the remote server. But the callback function inside the `fetch` event listener don't support the `async` and `await` keyword.

Therefore, we need to make a separate `async` function that returns a `Promise<Response>`. Then we call the function from the `event.respondWith()` method.

Before making any external HTTP request, let's break down our previous code into 2 separate functions. We also use the `async` keyword in the new function and call from the `event.respondWith()` method.

```js
addEventListener("fetch", (event) => {
  const request = event.request;
  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  return new Response(JSON.stringify({ msg: "Hello world" }), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: 200,
  });
}
```

Here `handleRequest` function is asynchronous. It takes a request argument and returns a `Response` with a proper header and status code. Inside the callback function, I call this `handleRequest` function and pass the request from the `event.request` method.

I think the concept of using asynchronous JavaScript in Cloudflare Worker is now clear to you. Let's make another function called `sendHttpRequest` which handles all the `fetch` API logic and return a formatted JSON response.

```js
const sendHttpRequest = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonResponse = await response.json();
    return jsonResponse[0];
  } catch (error) {
    console.error(error);
  }
};
```

The demo URL `https://jsonplaceholder.typicode.com/users` returns a list of dummy users. In this code, I only return the first user by using `jsonResponse[0]`. If you want, you can dump the entire incoming response or do some modifications from your side.

Inside the `handleRequest` function, create a new `Response` with proper headers and status code. Then encode the object returned from `sendHttpRequest` function and send it back to the user.

```js
async function handleRequest(request) {
  return new Response(JSON.stringify(await sendHttpRequest()), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: 200,
  });
}
```

Now run the miniflare server using the `npm run dev` command and visit `http://localhost:8787` from your browser. You can see dummy user details in your browser screen.

## Add CORS headers in Cloudflare Worker response

CORS or [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is not allowed in your browser. Browsers put this restriction for a very good reason. It enhances your online security and only allows connections from the same origin. Simply, if you are visiting `foo.com`, your front-end website can't connect to any random servers, which URL is different from the `foo.com/*` scheme.

But assume you have a hosted API with a different domain name and you want to connect with it from your front-end application. In this scenario, you can explicitly allow the front-end website to access your server by configuring your CORS headers.

To set CORS headers on your Cloudflare Worker response, you have to modify `Access-Control` headers and customize them as per your own needs. If you want to allow some specific domains, you can define them in the `Access-Control-Allow-Origin` header. If you want to make your API public and want to let any website connect to your server, just set `*` in the `Access-Control-Allow-Origin` header. Let's see how to use this concept in code.

```js
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "86400",
};

async function handleRequest(request) {
  return new Response(JSON.stringify(await sendHttpRequest()), {
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      ),
      "content-type": "application/json;charset=UTF-8",
    },
    status: 200,
  });
}
```

Here you can see, I have set wildcard `*` to `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers. This implies that any domain and any type of HTTP request can connect to my server.

## Build your Cloudflare Worker project using esbuild

When your worker script becomes very long and complex, developers like you and me find it very hard to manage the code itself. Using [esbuild](https://esbuild.github.io/) with Cloudflare Worker, you can separate your code into different files.

Esbuild enables you to use standard Javascript `import` and `export` syntax to pass utility functions across the files. At the build time, esbuild takes all those files and creates a single minimal file optimized to run on Cloudflare Worker.

To install esbuild in your Worker project, run the following command.

```bash
npm i -D esbuild
```

Open your `package.json` file and modify the `main` and `scripts` fields to add esbuild in your build process.

```json
{
  "name": "miniflare project",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "scripts": {
    "dev": "miniflare -w",
    "build": "esbuild --bundle --sourcemap --outdir=dist ./src/index.js"
  }
}
```

From now on, when you run the `npm run build` command, esbuild will take all the files inside the `src` directory and export the build into the `dist` directory.

## Deploy Cloudflare Worker using wrangler CLI

After you finish building your Cloudflare Worker script, now it is high time to deploy the worker script. Cloudflare provides a nice tool for this task called wrangler. Using wrangler, you can easily configure your deployment from your terminal.

First, install the wrangler package using npm as a dev-dependency.

```bash
npm i -D wrangler
```

To create a new wrangler project, use the `wrangler init` command. If you want to generate a default wrangler project, use this command with a `--yes` flag.

```bash
npx wrangler init --yes
```

The above command creates a new Worker typescript project with testing files using Vitest. If you want to keep your project simple and don't want to add any typescript and testing, just avoid the `--yes` flag.

Now open your `wrangler.toml` file and customize the name and main field as per your need. Here I change the main field to `dist/index.js`, as esbuild saves the build output in the `dist` directory.

```toml
name = "first-script"
main = "dist/index.js"
compatibility_date = "2023-01-21"
```

Now add a build command inside the `wrangler.toml` file. The build command will run when we run the `wrangler publish` command from our terminal.

```toml
name = "first-script"
main = "dist/index.js"
compatibility_date = "2023-01-21"

[build]
command = "npm run build"
[build.upload]
format = "service-worker"
```

At last, add the `wrangler publish` command as a script in your `package.json` file.

```json
"scripts": {
  "dev": "miniflare -w",
  "build": "esbuild --bundle --sourcemap --outdir=dist ./src/index.js",
  "deploy": "wrangler publish"
},
```

Now when you run the `npm run deploy` command, wrangler will run esbuild to build your local miniflare project and saves it into the dist directory. Then wrangler will authenticate your local project and publish the build to their servers.

## Conclusion

In this blog, we have discussed the use of miniflare, esbuild, and wrangler to streamline our Cloudflare Worker development workflow. By following this tutorial, you can develop and deploy your worker within minutes.

From now on, you are not dependent on a stable internet connection to develop and test your worker script. It increases your productivity as a developer and gives you a very nice development experience.

If you want to know how to deploy a static site using Cloudflare pages, then please read [How to deploy Next.js app on Cloudflare pages](https://hrishikeshpathak.com/blog/deploy-nextjs-cloudflare-pages/). You can follow me on [Twitter](https://twitter.com/hrishikshpathak) for the latest blog updates or subscribe to my newsletter for more.
