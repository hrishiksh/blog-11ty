---
title: How to add a Newsletter to your website for free
description: You can send free newsletters using Hashnode. We reverse engineer Hashnode API to add new subscribers and send newsletters programmatically. Cloudflare Worker proxy server is used to bypass CORS restriction.
date: 2023-07-01
related:
    - schedule-cloudflare-worker-cron-trigger
    - fetch-google-fonts-api
    - convert-svg-to-png-cloudflare-worker
    - read-notion-database-api
---

An email newsletter is very crucial for a blog to make a connection with the readers. You can send recent post updates, offers, new course information, etc using email newsletters. 

Most newsletter services are paid or have a very restrictive free tier. If you are just starting up then the costs are not justifiable. If you need a free alternative, then you can use Hashnode.

**Important:** In this blog, you will learn how to add a newsletter to your website using Hashnode services. You store your subscriber email on Hashnode. When you want to send a newsletter, just publish a blog over there and send it to your subscriber. Before following this guide, create a Hashnode account. You need your publisher ID and the blog URL to access the newsletter API.

## Benefits of using Hashnode

Hashnode is a blog publishing site like medium or dev.to aimed at developers. Recently Hashnode introduced a newsletter feature in their blog. When you publish a new blog in Hashnode, it is sent to your subscriber as a newsletter.

Hashnode doesn’t have any limit on subscriber count. Therefore you can add as many subscribers as you want and can use their service for free always.

However, in this blog, you will learn how to add an email newsletter to your website by using Hashnode API. You can style your UI as you wish and just hook the API to make it functional. You can also add success and failure responses in your UI. You can add your email to subscribe to my newsletter to see a demo.

Hashnode doesn’t have any API for their newsletter but you can reverse-engineer the process. First, we need a proxy server to bypass the CORS error. Then we just have to pass the email from our front end as a POST request.

## Getting started with Hashnode API

First, we need a proxy server to forward our request from the front end and to remove the CORS error. I am using Cloudflare Worker for this purpose in this blog. Cloudflare Worker has a very generous free tier and is easy to work with. You can use another provider like [Netlify functions](https://hrishikeshpathak.com/blog/host-nodejs-api-netlify-functions/) or manage a server of your own.

### Creating Cloudflare Worker project

To create a new Cloudflare worker project, first, create a node project inside a directory and install miniflare. Miniflare is a typescript library used for developing Cloudflare Worker locally.

```bash
npm init -y
npm i -D miniflare
```

Create a new javascript file `index.js`. You will write your worker script there.

Inside your `package.json` file, add `index.js` in the `main` field.

```json
{
  "name": "miniflare project",
  "version": "1.0.0",
  "main": "./src/index.js"
}
```

In addition to this, if you want to organize your code by placing logic in multiple javascript files, you can use esbuild to build your project. To know more on this topic, please read my [Cloudflare worker setup blog](https://hrishikeshpathak.com/blog/cloudflare-worker-local-setup-miniflare-wrangler/).

### Handle POST requests from the client

When a user put their email and hits the subscribe button, your front-end should fire a POST request with the email as a payload. The payload should be in the JSON format and the email should be contained in the `email` field.

Inside the `index.js` file, I create a `getRequestBody` function to parse the JSON response.

```js
async function getRequestBody(request) {
	const { headers } = request;
  const contentType = headers.get("content-type");
  if (contentType.includes("application/json")) {
	  const jsonPayload = await request.json();
    return jsonPayload;
  }
}
```

### Make API request to Hashnode API

After retrieving the client email address, now make a POST request to the Hashnode API. Add the client email as JSON payload.

```js
var subscribe = async (email) => {
	const crudresponse = await fetch(
	  "https://<your hashnode url>/api/newsletter/subscribe",
    {
	    method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
	      email,
        publicationId: "dkkh38927369e82b0e931"
      })
     }
   );
	return await crudresponse.json();
};
```

In the above code block, add your Hashnode blog URL and add your publication ID in the payload. To find your publication ID, take a look at your dashboard URL. It should look something like this: `https://hashnode.com/dkkh38927369e82b0e931/dashboard`. You can see a random string after the `https://hashnode.com/` and `/dashboard` part of the URL. That random string is your publication ID.

### Response from Hasnode to the Client

Once you send the request to the Hashnode server, it will either be a success or a failure. To handle all these functionality, create a new function `handleSubscribeResponse`. This function wraps the `getRequestBody` and `subscribe` functions and responds to the client with appropriate CORS headers.

```js
var corsHeaders = {
	"Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Headers": "content-type",
  "content-type": "application/json;charset=UTF-8"
};

var handleSubscribeResponse = async (request) => {
	const reqBody = await getRequestBody(request);
  try {
	  const sub response = await subscribe(reqBody["email"]);
    if (subResponse["result"] == "success") {
	    return new Response(JSON.stringify({ result: "success" }), {
	      headers: corsHeaders
	      });
    }
    return new Response(JSON.stringify({ result: "failure" }), {
	    headers: corsHeaders
    });
  } catch (error) {
	  return new Response(JSON.stringify({ result: "error", error }), {
	    headers: corsHeaders
    });
  }
}; 
```

Now you can add UI logic to handle `success`, `failure` responses from your proxy server.

### Wrapping up Cloudflare Worker

To complete the proxy server, add a `fetch` handler to your Cloudflare Worker script. This handler accepts an incoming request and executes the `handleSubscribeResponse`.

```js
addEventListener("fetch", (event) => {
	const request = event.request;
  event.respondWith(handleSubscribeResponse(request));
});
```

## Hook the backend with the UI

In the front end, when a user types their email and presses the subscribe button, an `onSubscribe` function is executed. This function reads the input email and makes a POST request with the email to your proxy server.

```js
const onSubscribe = async () => {
  try {
    const resp = await fetch("https://username.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputvalue }),
      mode: "cors",
    });
    const jsonResponse = await resp.json();
  } catch (error) {
    console.log(error);
  }
};
```

Now you can use this `jsonResponse` object to manipulate your UI as per the response.

## Conclusion

Hashnode is a great platform for developer blogging and comes with a lot of features. In this blog, you use their newsletter feature to add a newsletter to your website for free. You have set up a worker as a proxy to bypass CORS restriction and change the UI as per the response coming from the Hashnode server.

Now you can see your new subscribers in the newsletter tab. To send a newsletter, create a new post and send it to your subscriber. That’s it. 

If you have any queries, please drop a mail, and don’t forget to subscribe to my newsletter for the latest updates.