---
title: How to build an interective Golang Playground for your blog website
description: To run the Go code, Make a proxy request to the Golang playground server. On the client side, use the Codemirror editor. Then display the output in the DOM using javascript.
hero: /images/golang-code-playground.webp
date: 2023-07-08
author: Hrishikesh Pathak
tags:
  - go
  - cloudflare
  - javascript
  - web
related:
  - cloudflare-worker-local-setup-miniflare-wrangler
  - deploy-nextjs-cloudflare-pages
  - selfhost-google-font-local
  - sort-array-date-javascript
---

Golang is an open-source programming language created by Google. It's a statically-typed language with a syntax that is easy to learn and read, making it a great choice for both beginners and experienced developers.

[Golang Playground](https://go.dev/play/) is a web-based platform that allows developers to write, run, and test Golang code snippets in real-time, without having to install Go on their local machine. Go playground also lets developers share their code snippets with other developers with a playground URL.

## Benefits of having a Golang Playground on a blog website

As a blogger, I want to provide my readers with the best experience possible, and that's where a Golang Playground comes in. A go playground embedded in the blog provides an interactive and engaging way for your readers to learn and try out Golang code snippets.

An interactive go playground in your blog can help improve the technical credibility of your blog. It also engages the user and improves the bounce rate of your blog. This key reason can also improve the SEO of your blog website.

## Steps involved in building an interactive Golang Playground

Building a Golang Playground is a fun and rewarding project that involves several steps. First, I need to find a way to run the Golang code. This is not possible in the browser as Golang is a server-side language. So The idea is I have to set up a remote server to run my Go code.

Next, I have to embed a code editor in my blog. There are plenty of options out there to choose from. I should also ensure the code highlighting feature is present in the code editor. How do code snippets look pretty without code highlighting right?

Then I aggregate the code inside the editor and make a request to the remote server or any existing API and display the output in my blog.

Let's see how to implement all these steps in detail with code examples.

## Using The Go playground runtime to run our Golang code

Look, running a server that can execute our go code is time-consuming and costly. Therefore I thought can I use some online services or API to run my go code and get the output in return?

After searching on the web I find this article titled [inside the go playground](https://go.dev/blog/playground) from Golang's official blog. You can read the entire blog if you want or just skip to the end which says that anyone can use the official go playground service with a unique user agent in the request.

Then I find the Golang playground API URL `https://go.dev/_/compile?backend=` and made a post request with my go code example. Guess what happened next? It failed!

Golang playground can't be accessible from the browser directly due to the CORS issue. If you are not familiar with CORS, please read this piece of [information from MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

The obvious answer to get around CORS error is using a proxy server. This week I play a lot with Cloudflare workers and I think this is the time to use this knowledge for practical use.

Another reason for choosing Cloudflare workers is its price point. It is free for small to moderate usage. If you haven't read my blog on [how to setup your Cloudflare worker locally with miniflare](https://hrishikeshpathak.com/blog/cloudflare-worker-local-setup-miniflare-wrangler/), give it a try.

The idea is, I make a `POST` request along with the go code to the Cloudflare worker function. Then the worker forwards the request to the go playground server. When the Go playground server responds, the worker returns the output it receives with the necessary CORS header and my browser happily displays the result.

```js:index.js

addEventListener("fetch", (event) => {
  const request = event.request;
  event.respondWith(handleRequest(request));
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "86400",
};

export async function handleRequest(request) {
  const responseHeaders = {
    ...corsHeaders,
    "content-type": "application/json;charset=UTF-8",
  };

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ msg: "Please make a post request with your go code" }),
      { headers: responseHeaders }
    );
  }
  const goCode = await getRequestBody(request);
  const resp = await callGoPlayground(goCode);
  return new Response(resp, { headers: responseHeaders });
}
```

Here you can see that the worker will process only the `POST` requests. If the request is not a `POST` type request, it responds with a default JSON response.

To parse the request body I made a function called `getRequestBody`. Let's see the code inside it.

```js:index.js

async function getRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get("content-type");
  if (contentType.includes("form")) {
    const formData = await request.formData();
    return formData.get("code");
  } else if (contentType.includes("application/json")) {
    const jsonPayload = await request.json();
    return jsonPayload["code"];
  }
}
```

The `getRequestBody` function first analyzes the request content type. Then it evaluates the request body and returns the code snippet encoded inside the `code` block.

Then I take the value inside the `code` block and run the `callGoPlayground` function. This function makes a POST request to the go playground with the code snippet. It also uses my unique user agent as requested by the Golang team.

```js:index.js

async function callGoPlayground(goCode) {
  const form = new FormData();
  form.append("version", "2");
  form.append("body", goCode);

  const options = {
    method: "POST",
    body: form,
    headers: new Headers({ "User-Agent": "your unique user agent" }),
  };

  try {
    const crudResponse = await fetch(
      "https://go.dev/_/compile?backend=",
      options
    );
    const response = await crudResponse.json();
    return await JSON.stringify(response);
  } catch (error) {
    return JSON.stringify({
      Errors:
        "Error in the proxy server. Request to go playground is not successful",
    });
  }
}
```

Here I am making a `multipart/form-data` request to the Go playground server. I have analyzed the network requests made by the go playground to their server and they are using the same. Therefore I choose to stick with the default request pattern.

## Building the User interface

I write my blogs in markdown. More precisely in MDX. [MDX documents](https://mdxjs.com/) can import framework components like React, Vue, and Svelte and render them into HTML at the build time.

As my blog is completely static, I use [Astro](https://astro.build/) to build my website. The main selling point of Astro is that it can accept any framework component of your choice and render static HTML and CSS with zero javascript.

This boosts your website speed and thus helps in SEO. I use svelte to build my component in Astro. If you know React or Vue, you can use that as well.

For the code editor part, I use the [Codemirror editor](https://codemirror.net/). They have a package for svelte called `svelte-codemirror-editor`. At that time I just thought that install this package and I am ready to go. But when reality hits, it hits very hard.

It comes out that Golang syntax highlighting is not supported in Codemirror by default. Therefore I have to install two additional packages only to enable Golang syntax highlighting. Even after that, I don't like the theme of Codemirror editor. Guess what, I have to install one more package which provides me the GitHub dark theme. Now the aggregated `npm install` command looks like this.

```bash
npm i svelte-codemirror-editor @codemirror/language @codemirror/legacy-modes thememirror
```

Fortunately, Codemirror exports the value inside the `<textarea>`. When a user hit the run button, I can access the value and make a `fetch` request to our proxy server.

{% raw %}

```html:CodeRunner.svelte

<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { StreamLanguage } from "@codemirror/language";
  import { go } from "@codemirror/legacy-modes/mode/go";
  import { boysAndGirls } from "thememirror";

  export let value;
  export let language;
  let result = "";

  const runCode = async () => {
    result = "⏳ Evaluating output...";
    if (language === "go") {
      const reqStruct = { code: value };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqStruct),
      };
      try {
        const crudResponse = await fetch(
          "https://your-worker-url.workers.dev",
          options
        );
        const response = await crudResponse.json();
        if (response["Events"] === null) {
          result = response["Errors"];
        } else {
          console.log(response);
          result = response["Events"][0]["Message"];
        }
      } catch (error) {
        throw `Request error: ${error} `;
      }
    }
  };
</script>

<section class=" bg-[#24292e] px-4 pt-6 rounded text-base font-mono">
  <CodeMirror 
  bind:value 
  theme={boysAndGirls}
  extensions={[StreamLanguage.define(go)]} 
  tabSize="2" 
  styles={{ 
    "&": {
      maxWidth: "100%", 
      }, 
    }
  } />

  <button
    on:click="{runCode}"
    class="bg-purple-500 text-white font-outfit flex text-base font-medium items-center rounded px-3 py-1 my-4 hover:bg-purple-600"
  >
    Run
  </button>
  <p
    class="w-full font-mono text-white border-slate-500 border-t border-dashed whitespace-pre-wrap"
  >
    {result}
  </p>
</section>
```
{% endraw %}

Here I have made some styling using tailwind CSS to theCodemirror editor. This is not necessary for a working Codemirror component, but I like pretty things!

When you click on the `Run` button, it executes the `runCode` function. The `runCode` function gets the code from the `value` variable which is in that state of two-way binding with the Codemirror editor. Then it requests the proxy server, gets the response and displays it in the empty `<p>` tag at the end of the code.

I like svelte over reactjs because of its reactivity. To update the `value` or `result` variable, unlike react, I don't have to use `useState` hooks. Similarly, As the `value` is two-way binding with the Codemirror component, I don't have to use `useRef` or another type of react hook to access the value inside it.

I also export `value` and `language` props in this component. When I import and use this component inside my MDX files, I can pass a code snippet and the code language. This way I can extend this component to some other languages in the future.

## Deploying the Golang Playground Proxy

Deploying the Cloudflare worker script is very easy. You just have to install a package called wrangler and it does all the arrangements for you.

```bash
npm i -D wrangler
```

Then initiate the wrangler CLI using the npx command.

```bash
npx wrangler init
```

Now you can see a new file `wrangler.toml` file is generated at the root of your project. You can customize this file however you want to fit your needs. You can also follow my guide on [deploying Cloudflare worker](https://hrishikeshpathak.com/blog/cloudflare-worker-local-setup-miniflare-wrangler/#deploy-cloudflare-worker-using-wrangler-cli) for a detailed step-by-step guide.

### Integrating the Golang Playground with the blog website

When I hit the `wrangler publish` command, it deploys my site in the Cloudflare global infrastructure and gives an URL of my worker. Now I can use this URL address in the Codemirror component to make our playground work.

To improve security and save your Cloudflare worker usage limit, you can also add CROS headers to your origin URL. I don't think this blog can reach a wider audience, so I will do that in the future.

Other than that, I don't think there is something that I can do to improve the security of my worker script. All the code execution is handled by the go playground servers. If you want to run some suspicious code, they have already this mechanism in place to tackle this kind of scenario.

## Conclusion

In this blog, I have shared how I integrate a Golang playground into my blog website. First I made a proxy to the official Golang playground API using Cloudflare worker. Then I use Codemirror to make an editor for my website. Then I join the two and my interactive Golang playground is ready.

Now the question generally comes to your mind is why? why do I even bother to make a Golang playground for my blog?

Look, I am learning Golang and I want to share my learning in this blog. If you are excited, you can subscribe to my newsletter. Other than that, there is no obvious reason. I just like tinkering with things and writing this type of blog for you. That's it.

### Should you build this playground for your website?

Building an interactive Golang playground for your blog website is a great way to engage your audience and make your blog posts more interactive. By following the steps outlined in this guide, you should be able to build a functional Golang playground in no time. Remember to keep the user interface simple and intuitive, and to consider the security implications of allowing users to run code on your server. Good luck, and happy coding!
