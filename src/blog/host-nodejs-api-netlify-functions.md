---
title: How to host Nodejs API on Netlify for free
description: Hosting Nodejs API in Netlify functions is very easy and cost-effective. You can use serverless computing with file-based routing, and proxy, and supports a plethora of npm modules.
hero: /images/host-nodejs-api-netlify-functions.webp
date: 2023-13-04
author: Hrishikesh Pathak
tags:
  - nodejs
  - web
  - javascript
related:
  - deploy-nextjs-cloudflare-pages
  - how-to-add-filename-to-a-code-block-in-astro-blog
  - selfhost-google-font-local
  - sort-array-date-javascript
---

Hosting a Nodejs API is not very critical these days. In this era of cloud computing and serverless environment, you don't have to create your server and configure everything from scratch. 

These days, most hosting providers give a free tier to new users. If you are a hobbyist and only want to host some small projects, then these free resources are enough. [Render](https://render.com/), and [Railway](https://railway.app/) are such types of solutions you can check out.

If you don't want a stateful server to manage steady connection eg, WebSockets with the client, then you can also opt for serverless offerings. All major cloud providers have their serverless offerings.

The main benefit of serverless computing is its cost-effectiveness. If you are building a startup and don't want to manage servers of your own, then you can opt for serverless. this saves you a lot of time and also money.

## What is Netlify functions

[Netlify function](https://www.netlify.com/products/functions/) is a serverless offering from Netlify. Netlify function is a wrapper on AWS lambda functions and comes with a very generous free tier.

Netlify function is built as an extension to their JAMstack offering. Using Netlify functions, now a static JAMStack website can run server code and give a personalized response to a user.

The most important part is, you can include the server code in the same project. During the build, Netlify can extract the code and process it accordingly and provide an API endpoint for the developer.

You can use Javascript, Typescript, and Golang to code your Netlify functions.

## Setting up a Netlify functions project

To set up your Netlify functions project create `netlify/functions/` directory in your project root. 

```bash
mkdir -p netlify/functions
```

If you don't have any front-end and only want to host a Nodejs API, then initiate a Nodejs project first using `npm init` and then create `netlify/functions` directory in your project root.

```bash
npm init -y
mkdir -p netlify/functions
```

## Define API routes in Netlify functions

The base URL of an API hosted on the Netlify function is `https://yourdomain.com/.netlify/functions/`. Yes, I know it is very long and there is a way to change this using proxies. I am discussing this in the later part of this blog.

Netlify function uses file-based routing. You can use 3 different ways to define an API route in Netlify functions.  For example, you want to host your API in `https://yourdomain.com/.netlify/functions/hello` endpoint. For this, your directory structure should be one of these 3 ways.

1. `netlify/functions/hello.js`
2. `netlify/functions/hello/index.js`
3. `netlify/functions/hello/hello.js`

## Basic Nodejs API for Netlify functions

Continuing from the previous example, we want to host an API in `https://yourdomain.com/.netlify/functions/hello` endpoint and therefore created a `hello.js` file inside the `netlify/functions` directory.

Inside the `hello.js` file, we will write a simple function that returns a JSON hello world response when invoked.

```js:hello.js

exports.handler = async function (event, context) {
	return {
		statusCode: 200,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ msg: "Hello world" }),
	}
};
```

In the above code example, I have exported an `async` function which returns an object with a JSON body. In addition to this, I have sent the appropriate header and a `200` status code.

The event argument in the exported function can provide you with some basic yet useful set of information.

```json:event body

{
  "path": "Path parameter (original URL encoding)",
  "httpMethod": "Incoming request’s method name",
  "headers": {Incoming request headers},
  "queryStringParameters": {Query string parameters},
  "body": "A JSON string of the request payload",
  "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encoded"
}
```

## Local Netlify functions development

After you finish developing your Netlify function, install `netlify-cli` npm package in your project. 

```bash
npm i -D netlify-cli
```

Then add an npm script in the `package.json` file to run the local development server.

```json:package.json

{
	"name": "netlify-function-hello",
	"version": "1.0.0",
	"description": "",
	"scripts": {
		"serve": "netlify functions:serve"
	},
	"devDependencies": {
		"netlify-cli": "^13.2.2"
	}
}
```

Now execute `npm run serve` to run your local dev server. Visit `http://localhost:9999/.netlify/functions/hello` to invoke your first Netlify function.

### Change the function directory and port

You can customize the Netlify function directory and port using a `netlify.toml` file in your project root.

If you want to change your functions directory from `netlify/` to `netlify-functions/` and change the port from `9999` to `5000`, then the `netlify.toml` file should look like this.

```toml:netlify.toml

[dev]
functions = "netlify-functions"
functionsPort = 5000
```

## Deploying Netlify functions from Github

To deploy your Netlify function, first, initiate a git repository and commit all the changes. Don't forget to create a `.gitignore` file and ignore the `node-modules` directory.

```bash
git init
touch .gitignore
git add .
git commit -m"first commit"
```

The content inside `.gitignore` file should look like this.

```gitignore:.gitignore

node_modules
.netlify
```

Now create a new GitHub repository and push all the changes to that repository.

```bash
git branch -M main
git remote add origin "github repository link"
git push -u origin main
```

Now import this repository in a new Netlify project and the rest will be done by Netlify automatically for you.

Once you finish deploying your function, Netlify gives you an URL with which you can access your Nodejs API by visiting `https://<baseurl.com>/.netlify/functions/hello` endpoint.

## Proxy URL in Netlify functions

The deployed endpoint is too long and boring. But the good news is you can change it using a proxy. Let's see how to do that.

Inside your `netlify.toml` file, add a redirect block. There you can define redirect from and redirect to parameters for incoming requests.

```toml:netlify.toml

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/:splat"
status = 200
```

Now, every request comes to the `/api/` endpoint, and Netlify redirects it to `/.netlify/functions/` endpoint. It means, now you can access your deployed API in `https://<baseurl.com>/api/hello` endpoint.

## Conclusion

Netlify function is a great way to deploy a Nodejs API in a serverless environment. Unlike AWS lambda functions, Netlify function is very developer friendly and easy to use. In addition to this, a free uses quota also attracts developers to host their hobby Nodejs APIs in the Netlify functions.

In this blog, we have discussed an end-to-end strategy to code and deploy a Nodejs API in the Netlify function. We have also seen how to test the function locally. In the end, You have learned how to use a proxy to redirect incoming requests in Netlify functions.

If you want to explore the serverless computing options, you much look into [Cloudflare Worker](https://hrishikeshpathak.com/blog/cloudflare-worker-local-setup-miniflare-wrangler/) and [Deno deploy](https://deno.com/deploy). These two are not based on Nodejs but you can run javascript and typescript functions in them. They provide minimum latency and maximum performance.

If you have any questions, drop a mail to my inbox and consider to subscribe my newsletter for new updates.