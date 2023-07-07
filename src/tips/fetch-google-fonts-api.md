---
title: Dynamically fetch Google Fonts API
description: Use Google Fonts API to fetch the css text of respective font family and weight. Then use regular expression to parse the URL attached with each font. Then dynamically fetch the font URL to use in your project.
date: 2023-07-01
related: 
    - read-notion-database-api
    - add-newsletter-website-hashnode
    - schedule-cloudflare-worker-cron-trigger
---

Google Fonts has a vast collection of open-source fonts. You can dynamically use Google Fonts API to fetch font files in your project.


> Generally, google font delivers woff and woff2 type fonts in modern browsers. To get ttf type font, customize the User-Agent header. We will talk about it in the later part of this article.

## Anatomy of Google Fonts API

if you click on this URL https://fonts.googleapis.com/css2?family=Roboto:wght@500, Google Fonts API responds to you with a CSS file. This CSS file contains the font family you are requesting (i.e. Roboto) and the font weight. 

You can also add a subset parameter to declare which font subset you want (eg. `latin`, `cyrillic`, `greek`, etc. The resultant Google Font URL should look like this [https://fonts.googleapis.com/css2?family=Roboto:wght@500&subset=latin](https://fonts.googleapis.com/css2?family=Nunito:wght@700&subset=latin).

## Building Request URL

To build the request URL for Google Font API, I am using `URL` object. You can also use a string, but `URL` provide a better developer experience and are less error-prone.

```js
let url = new URL('https://fonts.googleapis.com/css2');
url.searchParams.append('family', 'Roboto:wght@400');
url.searchParams.append('subset', 'latin');
```

## Making a GET Request with an appropriate header

Here I use `fetch` to make a `GET` request to the Google Fonts API. By default, Google fonts respond with `woff2` type font for new browsers. If you want `ttf` font, then change the `User-Agent` to a string that matches an old browser.

```js
let response = await fetch(url, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
		},
	});
const respbody = await response.text();
```

## Extract the font URL from Google Font response

The previous request returned a CSS string that contain the font URL.

```css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf) format('truetype');
}
```

To extract the font URL from this text/string, we use regular expressions.

```js
const regex = /src:\s*url\((["']?)(.*?)\1\)/;
	
const matches = regex.exec(respbody);

if (matches && matches.length > 2) {
	const url = matches[2];
	console.log(url)
} else {
	throw 'URL not found.';
}

//output: https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf
```

Now you can use this URL to fetch the Google font and use it in your project.