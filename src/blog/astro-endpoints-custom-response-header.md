---
title: Astro API Endpoints and Adding Custom Response Headers
description: Astro has two types of API endpoints, Static and Server. Astro uses a standard Javascript Response object to add custom headers in the response.
hero: /images/astro-endpoints-custom-response-header.webp
date: 2023-07-05
author: Hrishikesh Pathak
tags:
  - web
  - javascript
related:
  - interface-vs-abstract-class-typescript
  - how-to-add-filename-to-a-code-block-in-astro-blog
  - host-nodejs-api-netlify-functions
  - svelte-gh-pages
---

[Astro](https://astro.build/) is a multi-page application framework. By default, it sends zero javascript to the browser. This is the biggest selling point of Astro. Astro does this magic by rendering all the javascript into plain HTML and CSS in the server.

In addition to static sites, you can also make [API endpoints with Astro](https://docs.astro.build/en/core-concepts/endpoints/). You can use these endpoints to return some structured data related to your website. API endpoints can also be used to serve 3rd party content from your website. This way, 3rd party API key is not exposed to the client.

## Static vs Server endpoints

There are 2 types of endpoints in Astro. The first one is the static endpoint and another is the server or dynamic endpoint.

In the static endpoint, it renders in your build time and can only send static data. A static endpoint only responds to `GET` requests and nothing else.

As you see, static endpoints are very limited in their capabilities. If you want to serve some static images or some static JSON data, you can use this feature.

The server endpoint responds to all the HTTP verbs. You can use this endpoint to write your backend code and deploy using adapters. Currently, Astro adapters support [Cloudflare](https://workers.cloudflare.com/), [Deno](https://deno.com/deploy), [Netlify](https://www.netlify.com/), [Nodejs](https://nodejs.org/en), and [Vercel](https://vercel.com/).

## Make an endpoint

To make an endpoint, create a file called `greet.js` (or `greet.ts` if you are using typescript) inside the `pages/` directory.

Now export a `get` function from that file. Please don't make it a default export.

```js:greet.js

export async function get({ params, request }) {
  return {
    body: JSON.stringify({
      name: "Hrishikesh",
      url: "https://hrishikeshpathak.com",
    }),
  };
}
```

Now start your astro server by using the `npm run dev` command. Run `pnpm dev` if you are using pnpm.

If you visit `localhost:3000/greet` then you will get the JSON string as a response.

```json:json

// Response in your browser
{ "name": "Hrishikesh", "url": "https://hrishikeshpathak.com" }
```

### Respond to different HTTP methods

Now hear me out very carefully. As I am using a `get` function in the `greet.js` file, it only responds to the `GET` HTTP requests.

What does it mean? it means you have to define the `post`, `del`, and `put` functions to respond to their respective HTTP methods.

Let's see an example

```js
export const get = ({ params, request }) => {
  return {
    body: JSON.stringify({
      method: "I am GET!",
    }),
  };
};

export const post = ({ request }) => {
  return {
    body: JSON.stringify({
      method: "I am POST!",
    }),
  };
};

export const del = ({ request }) => {
  return {
    body: JSON.stringify({
      method: "I am DELETE",
    }),
  };
};
```

If you need to respond to [all HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), then you can use the `all` function.

```js
export const all = ({ request }) => {
  return {
    body: JSON.stringify({
      method: `I am ${request.method}!`,
    }),
  };
};
```

## Add a custom header to an endpoint

If you can see the browser console, all those responses have a `Content-Type` of `text/html`. If you want to send a different `Content-Type` header, or any other header in a response, then you should take a different approach.

Astro supports standard [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) web API in the return statement. We can use this API to send custom headers to the client.

Let's change our `get` function to use a `Response` object and a custom `Content-Type` header.

```js
export const get = ({ params, request }) => {
  return new Response(
    JSON.stringify({ name: "Hrishikesh", url: "http://hrishikeshpathak.com" }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );
};
```

Now if you check your browser console, you will get the correct `Content-Type` header. In addition to `Content-Type` headers, you can add [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to access it from some other domain.

## Dynamic routing

Like normal pages, Astro also supports dynamic routing for the API endpoints. To make dynamic routing work, you have to export the `getStaticPaths` function from the `greet.js` or whatever your API endpoint file name is.

```js
export function getStaticPaths() {
  return [
    { params: { id: "0" } },
    { params: { id: "1" } },
    { params: { id: "2" } },
  ];
}
```

You can access these `params` using the `params` argument in the `get` function.

## Conclusion

In this blog, you have seen how to make API endpoints with Astro. If you want to serve some static data that changes rarely, then it is much more economical to use static endpoints. On the other hand, if your endpoint is customized to every incoming request then server endpoints may be the best option for you.

You will also learn how to send custom headers in astro endpoints. Using custom headers can help you to authorize and manage access to your API endpoints.

If you have any comments, you can say it on Twitter.
