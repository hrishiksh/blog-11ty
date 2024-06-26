---
title: How to deploy flutter web app to Cloudflare pages
description: Flutter web apps are static files that can be served using CDNs for faster speeds. Cloudflare pages are better choice than firebase for it's pricing and speed.
hero: /images/flutter-web-hosting-cloudflare.webp
date: 2022-01-04
author: Hrishikesh Pathak
tags:
  - flutter
  - cloudflare
related:
  - qr-flutter
  - deploy-nextjs-cloudflare-pages
---

## What is flutter web

[Flutter web](https://flutter.dev/multi-platform/web) is the web implementation of _flutter_ framework. Now you can compile your dart code to run on the web with the help of flutter web.

When you're finished writing your app in dart, flutter will compile your dart code into JavaScript using [dart2js](https://dart.dev/tools/dart2js) and inject it inside an HTML page.

Flutter uses canvas to display its content in the web. It is suitable for web apps, but if you want to optimize your app for SEO, then flutter is not an ideal option to choose from.

Now you can also watch this video instead of reading this whole article to get a live demonstration of the deployment.

<iframe
  width="100%"
  height="400px"
  src="https://www.youtube.com/embed/-FRDk9D_H8I"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

## How to build flutter web projects

The building of a flutter web project is fairly simple. Inside your project root folder, type

```bash
flutter build web
```

This command build your flutter project and populate the released version of your app inside the `build/web` directory inside your project directory.

## Peanut installation

To serve the release build of our flutter app, and to make our life easier, we use a package called [Peanut](https://pub.dev/packages/peanut).

This package build our web project and push the output in a separate branch. Thus, we can set the release branch as a production branch at the server.

Initially, it is created to work with GitHub pages. But we can use this functionality to host our site to any of the static hosting service provider.

To install peanut package :

```bash
flutter pub global activate peanut
```

Build your project and save the output in `production` branch :

```bash
flutter pub global run peanut -b production
```

Now, if we check the `production` branch, then we can see the static sites resulting from the flutter build commands.

You can now push these changes to the remote branch e.g.: GitHub and now we are ready to start our deployment.

## Configure Cloudflare pages

- Login to [Cloudflare Pages](https://pages.cloudflare.com) and go to the `pages` section. Click on `create a project` button.
- Select your GitHub or GitLab account and choose your repository of your flutter project.

![Choose flutter project repository](https://i.imgur.com/kRCHwLs.png)

- Then click on `Begin Setup` button.
- In the production branch, change it to `production` or `gh-pages` as per your `peanut -b` command above.

![Change the production branch](https://i.imgur.com/iiy38SN.png)

- In the build setting, set framework preset to `None`, build command should be empty as our site is prebuilt with peanut and in the build output directory, leave it empty.

![Flutter build settings for Cloudflare](https://i.imgur.com/hASbvRl.png)

- Now click on deploy. Cloudflare is automatically initialized the environment and deploy your project in their global network of CDNs.

Check out this article to know more about [configure Cloudflare pages for static sites](https://hrishikeshpathak.com/blog/deploy-nextjs-cloudflare-pages).

## Alternatives

If you want to host your flutter web application, then there are many services you can find. [Vercel](https://vercel.com) and [Netlify](https://www.netlify.com) are one of those great option you can go with. But I personally like Cloudflare pages more. I am a long time vercel user for my Next.js projects. But their pricing model is not very good in my opinion, once you have reached on a certain usage limit.

You can also host your app on [GitHub pages](https://pages.github.com). This is also a free service. But GitHub pages is geared more towards showcase proof of concept and small project. For a large project, GitHub pages is not sufficient, I think.

If you are enjoying any other hosting provider, let me know, I will be happy to edit this blog and add your favorite one.

## Conclusion

Flutter web is in its very early stage. But many production grade app like [Rive](https://rive.app) is created using flutter web. So it gives hope to flutter developer to try out different web projects with flutter.

If you want a multiplatform application, then flutter will be the best choice for you.

Flutter ecosystem is growing daily and community is very bullish about it. I am a believer and want to see this project grow.
