---
title: How to deploy Next.js app on Cloudflare pages
description: Cloudflare page is the latest buzzword in the JAMstack developer landscape. This is a step-by-step guide to host your Next.js site in Cloudflare pages. Know its limitations. Is it suitable for you? Let's find out.
hero: /images/deploy-nextjs-cloudflare-pages.webp
date: 2021-12-25
author: Hrishikesh Pathak
tags:
  - javascript
  - web
  - nextjs
  - cloudflare
related:
  - sort-array-date-javascript
  - nextjs-prism-react-renderer
---

[Cloudflare pages](https://pages.cloudflare.com) is a new hosting provider for [JAMstack](https://jamstack.org) apps. It is gaining a lot of traction among developers. There are many reasons behind it. But the real reason is surely because of their pricing model.

They are offering 3 crucial services free for their users. Now you can use _unlimited sites_, _unlimited bandwidths_ and _unlimited request_ for free. You don't have to pay a dime, even if you are receiving a huge number of page views in your site daily.

The offer is very lucrative. Isn't it ? So to test this out, In this tutorial we are going to deploy a [Next.js](https://nextjs.org/) website in Cloudflare pages.

Now the question is why Next.js, not a simple [create-react-app](https://create-react-app.dev) website ? This is because, Next.js is the most popular framework among JAMstack developers.

## Setting up the project

Before start deploying our site to Cloudflare pages, we have to do some basic drill. Make sure to follow along.

### Create a new Next.js app

For this tutorial, we are going to make a new Next.js site. So run these commands to make a new Next.js website.

```bash
npx create-next-app <your project name>
```

### Make a GitHub repository

We need a [GitHub](https://github.com) repository. I assume that you have a GitHub account. Cloudflare pages fetch your source code from this repository to build your website.

After creating your repository, you can see a GitHub address given inside your repository. The address should be like `https://github.com/<your username>/<your repository name>.git`. Copy this address for future use.

Now come to your Next.js project root and run these commands one by one.

```bash
git init

git add .

git commit -m"Initial commit"

git branch -M main

git remote add origin https://github.com/<your username>/<your repository name>.git

git push -u origin main
```

Now refresh your git repository, and you can see your Next.js source code inside your repository.

### Create a Cloudflare account

Signup for [Cloudflare pages](https://dash.cloudflare.com/sign-up/pages). Then click on the **Create a project** button.

Then select your GitHub account and your GitHub repository that we have created earlier. If your repository is not appearing, go to your GitHub account a give proper permission to Cloudflare extension.

Then Cloudflare will guide you with their pretty simple UI.

### Build and deploy your Next.js site

Now inside the build command, if you select `Next.js static export` then the build commands are appearing as

```bash
next build && next export
```

Now Just hit deploy and Cloudflare will build and deploy your site across their global network of CDNs. Congratulation, now you can serve unlimited visitors absolutely for free!!

## What is working and what is not

At the time of writing of this article, Cloudflare pages doesn't support any of the Next.js flagship features like `getStaticProps`,`getStaticPaths` and `getServerSideprops`.

Cloudflare pages also don't support [API routes](https://nextjs.org/docs/api-routes/introduction). The `Image` component of Next.js is also not working.

Basically, Cloudflare pages do a `static export` of your Next.js site and serve only static files.

As the platform is in its early stage, we can expect support of these features in the future. If you are not using `getServerSiteProps` in your website, then Cloudflare offer build hooks. This build hooks trigger redeployment using webhook from your CMS.

## Alternative to Next.js API routes

If you are heavily dependent on Next.js API routes, then you can use [Cloudflare workers](https://workers.cloudflare.com). This is an amazing platform for build API and, like Next.js API routes, it is also serverless.

Currently, I am using Cloudflare workers in production and found a very good result. It is cheap and very fast.

## Some Errors to be noted

If you are using the latest version of Next.js, Sometime it can give you error on building the project. Actually, the version of [node.js](https://nodejs.org/en) used in the build process is quite old. So you can set a newer version of NodeJS in your pages environment variable.

```bash
NODE_VERSION : 16.13.1
```

## Conclusion

So, You have now learned how to deploy your Next.js site in Cloudflare workers. Look, the thing is that no platform is perfect. If you're a developer like me and want to host your portfolio site with some blog posts here and there, I think Cloudflare pages is a better choice than [vercel](https://vercel.com).

If you are trying to build a site with a lot of moving parts, then I think, vercel is the best option you can get. Decision is yours. No one is perfect. We as a developer have to compromise. Now it is your turn.

Don't forget to show me what you are building. I am on Twitter as [@hrishikshpathak.](https://twitter.com/hrishikshpathak)
