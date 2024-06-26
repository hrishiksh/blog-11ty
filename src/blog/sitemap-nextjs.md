---
title: Create a basic sitemap for Nextjs website
description: A beginner-friendly guide to make a sitemap for your Nextjs website. Now boost your search rankings with this simple sitemap making technique. This is a time efficient way, and you can later experiment with it to improve results.
hero: /images/sitemap-nextjs.webp
date: 2021-12-22
author: Hrishikesh Pathak
tags:
  - web
  - reactjs
  - nextjs
related:
  - nextjs-prism-react-renderer
  - deploy-nextjs-cloudflare-pages
---

Hi _developers_, this is a short article on creating a basic sitemap for Nextjs website. The sitemap we are building in this article will be very basic and if you are just starting up, I think this will help you to save time and reduce complexity.

## Basic xml sitemap structure

Generally we use xml sitemap and there is a basic structure of these kinds of sitemaps. You can know more about this in the [official website](https://www.sitemaps.org/protocol.html).

So the basic structure of a sitemap is like this.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   <url>

      <loc>http://www.example.com/</loc>

      <lastmod>2005-01-01</lastmod>

      <changefreq>monthly</changefreq>

      <priority>0.8</priority>

   </url>

</urlset>
```

Here the `<lastmod>`, `<changefreq>` and `<priority>` is optional. If you submit this sitemap in [Google Search Console](https://developers.google.com/search), then these tags are not important and ignored by the Googlebot.

**Keep in mind** that all the links in a sitemap should have the same host. If your site is www.example.com, then all the links under `<loc>` should start with `www.example.com`

## Create our own sitemap

For this example, we take this site [devquark.com](https://www.devquark.com/) as an example. The complete URL of this website is https://www.devquark.com.

Let's assume we have 2 articles published in this website. The link of these articles are

1. [https://www.devquark.com/blog/file-picker-flutter](https://www.devquark.com/blog/file-picker-flutter)
2. [https://www.devquark.com/blog/syntex-heighlighting-nextjs-prism-react-renderer](https://www.devquark.com/blog/syntex-heighlighting-nextjs-prism-react-renderer)

So our sitemap will look like

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.devquark.com/</loc>
    </url>
    <url>
        <loc>https://www.devquark.com/blog/syntex-heighlighting-nextjs-prism-react-renderer</loc>
    </url>
    <url>
        <loc>https://www.devquark.com/blog/file-picker-flutter</loc>
    </url>
</urlset>
```

Here you can see I have added the two article links along with the homepage link in this sitemap. Then name your sitemap file as `sitemap.txt`.

If you are using [Nextjs](https://nextjs.org/) then put this `sitemap.xml` file in your `/public` directory of your project. You can also add a `robots.txt` file in the same directory for better SEO. `robots.txt` of [this site](https://www.devquark.com/blog) looks like

```text
User-agent: *
Sitemap: https://www.devquark.com/sitemap.xml
```

If you are a beginner, I prefer to use this configuration. You want to learn more about sitemap, then follow official google SEO [blog](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap).

If you like this article, please share, and you can follow me on [Twitter](https://twitter.com/hrishikshpathak). Have a good day.
