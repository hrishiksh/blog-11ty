---
title: How to Self Host Google fonts locally using CSS
description: Self-host Googole fonts in youre react, angular, vue svelte website easily using CSS and Google webfont helper tool.
hero: /images/selfhost-google-font-local.webp
date: 2022-11-09
author: Hrishikesh Pathak
tags:
  - web
  - javascript
  - nextjs
  - reactjs
  - svelte
related:
  - deploy-nextjs-cloudflare-pages
  - sort-array-date-javascript
  - svelte-gh-pages
---

Fonts are an integral part of your website. The way how your website looks has a major dependency on typography. Therefore choosing the right font for your design is very crucial. A clear and legible font makes your website content stand out and it looks very natural to the viewer's eye.

In this tutorial, we are discussing how to self-host Google Fonts on your website. I try to cover as many web development frameworks as possible including Reactjs, Hugo, Nextjs, Flutter, etc. If your tech stack is different, then please drop a mail to my inbox and I will readily update this article by adding a step-by-step guide to add Google font to your tech stack.

## How to add Google fonts CDN to your website

Adding Google fonts to a website using Google font CDN is the easiest task for web developers. Just go to [Google fonts website](https://fonts.google.com/) and select any font you want. You can also select multiple fonts with different font weights. Now copy the link tags of Google fonts CDN and paste them into the head section of your webpage. To apply the font style, just specify the font family in your CSS file.

![Google font CDN code copy](/incontent-images/selfhost-google-font-cdn.webp)

## Problems associated with Google font

Despite the ease of use, Google fonts have a lot of problems associated with them. Let's discuss these problems briefly one by one.

### Google fonts track users

If you are serving fonts files from Google CDN, Google track each of the request from their servers. It means Google has all your user analytics by simply serving the fonts of your website.

### Google fonts slow down your website

Google fonts are served from Google servers and Google servers are not always fast. If you are making a static website or serving only static assets from a CDN, Google fonts are always the slowest to load in comparison to other static assets. This slow loading affects your lighthouse score and results in bad SEO practices.

## Google fonts vs self-hosted fonts

In the above section, we have discussed some not-so-good sides of Google fonts. Now the question is what is the solution to these problems?

Do you know that you can download and self-host Google fonts from your servers or CDNs? As Google fonts are free and open source, you don't have to pay anything for self-hosting Google fonts. To make this process easy, we use a tool called Google Webfont helper.

Self-hosting Google fonts solve most of the issues that comes with Google fonts. If you self-host Google fonts from your server, you have control over your user analytics. Now, Google can't sneak into your user base by just serving the fonts of your website.

Self-hosting Google fonts in your own CDN can speed up your site performance. As fonts are now bundled with your website with the same origin, it takes much less time for the browser to fetch all the required fonts. It results in a high lighthouse score and good SEO practice.

## How to self host Google fonts

Before explaining how to self-host Google fonts, I want to clear a question in your mind. Should you self-host your Google fonts?

If you are making just a side project to show your potential employees or making just a toy project, you should not self-host Google fonts. It adds more difficulty to your project. Self-hosting fonts require additional work and cost you some time.

On the other hand, if you are making a serious website, a startup, or a business, where you are expecting thousands of users to use your website, you should self-host your fonts to improve the performence and privacy of your website.

## Download Google fonts locally and add proper prefixes

In this tutorial, we are using [Google webfonts helper tool](https://google-webfonts-helper.herokuapp.com/fonts) to download and configure Google font on our website. Visit the Google webfonts helper tool and search for the fonts you want to include in your website. In this tutorial, I am using Inter font as an example.

![Using Google webfont helper](/incontent-images/selfhost-google-font-local-webfont-helper.webp)

Select the character set of the font. If you primarily use English, you should choose Latin. Then select font weights. I am selecting regular, 500, and 700 font weights. Now, customize the font folder prefix to locate your font from your code.

![Character set selection in Google webfont helper](/incontent-images/selfhost-google-font-local-webfont-helper-2.webp)

The different framework has different prefixes and directory structure. In this tutorial, I am listing out some very popular frameworks and how to add self-hosted local fonts to them.

### Host Google fonts locally in Nextjs

If you are using [Nextjs](https://nextjs.org/), you place your fonts in the `public/fonts` folder. Therefore, your folder prefix will be `/fonts/`.

### Host Google fonts locally in Hugo

If you are using [Hugo static site generator](https://gohugo.io/), you should place your font files inside the `static/fonts` folder. As Hugo doesn't process files inside the `static` folder, your fonts will be available at the `/fonts` URL. Add your font prefix as `/fonts/` to generate an appropriate CSS file using the Google Webfonts helper tool.

### Host Google fonts locally in Reactjs

If you are using create-react-app, then you can just download the font files to the source directory and can directly import the font file in your JSX file. At the build time webpack process all the imports and place all the fonts in the right location to optimize your site speed.

If you don't want to process your font file in the build time, you can place your font in the public folder. Content in the public folder isn't touched by webpack and serves as it is during deployment.

To know more about adding fonts in the Reactjs application, visit their [official documentation](https://create-react-app.dev/docs/adding-images-fonts-and-files).

### Host Google fonts locally in Vite

[Vite](https://vitejs.dev/) is the latest build tool for javascript frameworks and is very popular. You can estimate its popularity by its usage in many popular frameworks like Reactjs, Vuejs, Sveltejs, etc.

If you are using any javascript frameworks which use vite as a build tool, then the process of adding Google font to the website is the same.

Create a font directory in the public folder of your project. In the Google Webfont helper tool, add the font prefix as `/fonts/`. Now download and extract the font files inside the `public/fonts` directory. Then copy the CSS code from the Webfont helper tool to your global CSS styling file.

Congratulations, you are done with adding Google font locally in Vite projects.

### Host Google fonts locally in Astro

[Astro](https://astro.build/) is a very new static site generator javascript framework in the town. It can use React, Vue, Svelte, or any other javascript component and can generate plain HTML in the build time. To improve performance, Astro ships 0% javascript to the user.

To host Google fonts locally on your Astro site, create a new fonts directory in the public folder. Edit the font prefix as `/fonts/` in the Google Webfont helper tool. Download the font files and extract the fonts inside the `public/fonts` directory.

Now copy the respective CSS from the Webfont helper tool and paste into the `src/styles/global.css` file. Now to add the font family, just mention its name in your CSS styling.

## Load Google fonts using CSS

After moving the downloaded font into the correct location, open your root CSS file, mostly it is named `index.css`. Paste the generated CSS style from the previous section into that file.

Inside every `@font-face` directive, add the `font-display: swap;` property. This argument swaps the font once it is downloaded from the CDN. These tricks can increase your page speed by up to some milliseconds.

Now, our `index.css` file for inter-font look like this.

```css
/* inter-regular - latin */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/inter-v12-latin-regular.eot"); /* IE9 Compat Modes */
  src: local(""),
    url("/fonts/inter-v12-latin-regular.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("/fonts/inter-v12-latin-regular.woff2") format("woff2"),
    /* Super Modern Browsers */ url("/fonts/inter-v12-latin-regular.woff")
      format("woff"), /* Modern Browsers */
      url("/fonts/inter-v12-latin-regular.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("/fonts/inter-v12-latin-regular.svg#Inter")
      format("svg"); /* Legacy iOS */
}

/* inter-500 - latin */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/inter-v12-latin-500.eot"); /* IE9 Compat Modes */
  src: local(""),
    url("/fonts/inter-v12-latin-500.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("/fonts/inter-v12-latin-500.woff2") format("woff2"),
    /* Super Modern Browsers */ url("/fonts/inter-v12-latin-500.woff") format("woff"),
    /* Modern Browsers */ url("/fonts/inter-v12-latin-500.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("/fonts/inter-v12-latin-500.svg#Inter")
      format("svg"); /* Legacy iOS */
}

/* inter-700 - latin */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/inter-v12-latin-700.eot"); /* IE9 Compat Modes */
  src: local(""),
    url("/fonts/inter-v12-latin-700.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("/fonts/inter-v12-latin-700.woff2") format("woff2"),
    /* Super Modern Browsers */ url("/fonts/inter-v12-latin-700.woff") format("woff"),
    /* Modern Browsers */ url("/fonts/inter-v12-latin-700.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("/fonts/inter-v12-latin-700.svg#Inter")
      format("svg"); /* Legacy iOS */
}
```

Now inside your other CSS files, just add `font-family:'Inter'` to apply the self-hosted Inter font in your style.

Using this technique, you can host multiple fonts and every time you will get the same blazing-fast speed and improved SEO score for your website.

## Host Google fonts locally in Flutter

Flutter has a [Google_fonts](https://pub.dev/packages/google_fonts) package to add Google fonts to the application. But instead of using this package, you can bundle the fonts with the application. Inside your flutter project, create a new `/fonts` directory. Place all your fonts in that directory. In this example, I am using [Inter font family](https://fonts.google.com/specimen/Inter).

The directory structure inside the `fonts` directory looks like this.

```bash
fonts/
├── Inter-Bold.ttf
├── Inter-Medium.ttf
├── Inter-Regular.ttf
└── Inter-SemiBold.ttf
```

Now, inside your `pubspec.yaml` file, add these fonts entries to use these fonts in your flutter app.

```yaml
fonts:
  - family: Inter
    fonts:
      - asset: fonts/Inter-Regular.ttf
      - asset: fonts/Inter-Bold.ttf
        weight: 700
      - asset: fonts/Inter-SemiBold.ttf
        weight: 600
      - asset: fonts/Inter-Medium.ttf
        weight: 500
```

## Google fonts woff format

WOFF (Web open font format) is a font format developed by Mozilla. This is a compressed version of true type, open type, and open font format. In addition to this, woff adds metadata and license files in the font itself.

There are 2 versions of WOFF. WOFF and WOFF2. They differ in the compression algorithm. Otherwise, both are the same. Modern browsers completely support WOFF fonts. As it is more compressed than traditional fonts, it consumes less bandwidth and makes your site faster.

Google fonts are available in various font formats. WOFF is one of them. If you only target modern browsers, then using only WOFF is completely fine. Otherwise, you can define a fallback font. When the browser doesn't support the WOFF font, it fallback to traditional font formats like true type fonts.

Google web fonts helper does all these things automatically for you. It generates several fallback font formats. So that some ancient browsers like internet explorer support your font definition.

## Frequently Asked Questions

### How do I add Google fonts to my computer?

First, download Google fonts to your website. The downloaded file may be in a zip format. Unzip the file to see the contents inside. If you are using windows, click the `.ttf` fonts files one by one and you can see a windows popup. Click on the install button to install the font in your system.

If you are a Linux user, first create a new `fonts` directory inside `.local/share/` folder. Now copy all the font files to the `.local/share/fonts` directory. Refresh the font cache and you are good to go.

### How to use Google fonts in Microsoft word?

You have to install Google fonts in your system to use in Microsoft word. After font installation relaunch the Microsoft word application and you can find the new fonts inside the fonts dropdown menu.

### How do I link CDN?

There are many ways to link to a CDN from an HTML markup. If you want to display an image or video from a CDN, simply add the CDN file link in the `src` attribute. On the other hand, if you want to link an external CSS or javascript file, you can put them in the `<link>` tag under the `<head>` of the document and add the link inside `href` attribute. You can also add a javascript file inside `<script>` tag and add the CDN file link in the src attribute.
