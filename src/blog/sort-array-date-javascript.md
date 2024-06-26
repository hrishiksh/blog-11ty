---
title: How to sort array of dates in javascript
description: Sorting array of Date object using Array.sort() method in javascript. This help you to sort your data as per their occurrence in time.
hero: /images/sort-array-date-javascript.webp
date: 2022-07-15
author: Hrishikesh Pathak
tags:
  - javascript
  - web
related:
  - svelte-gh-pages
  - deploy-nextjs-cloudflare-pages
---

Working with date in javascript is not very hard. The `Date` object in javascript determines a single moment in time. It is platform-independent and returns a number as a result. This number represents milliseconds since 1 January 1970 UTC.

You can learn more about the javascript `Date` object from [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

If you want to do any heavy lifting with date in javascript, then there is a library called [momentJs](https://momentjs.com). But for this particular task, we don't need any outside library or package. We can do it all by ourselves.

You can create a new `Date` from scratch or parse `Date` from `string` with `Date.parse()` method. But this parsing method is highly discouraged due to browser differences.

## How to sort an array in js

Before sorting dates, let's learn the basics first.

Let the alphabet is an array containing some initial English letters.

```js
let alphabat = ["c", "r", "w", "j", "g"];
```

To sort this alphabet, run the [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method in the array.

```js
alphabat.sort();
console.log(alphabat);

// Return: [ "c", "g", "j", "r", "w" ]
```

Here you can see, that the array is now sorted as per their alphabetical order.

Now let's try to sort an array containing numbers.

```js
let numberList = [3, 5, 1, 0, 4, 7, 23, 15, 75, 10];
numberList.sort();
console.log(numberList);

// Return: [ 0, 1, 10, 15, 23, 3, 4, 5, 7, 75 ]
```

Here the numbers are not correctly sorted in this example. This is not an error but javascript behaves that way. It checks the first digit of the number and sorts the numbers in this order.

Therefore we see 10, 15, and 23 come before 3 in the resultant array.

Now the question is if there is a solution? Yes. we have to define a comparing function inside the `sort()` method. The comparing function looks like this.

```js
function(a,b){
	// Here you can define any algorithm of your choice.
	return a-b;
}
```

If return from this function is > 0 then sort `a` after `b`. Similarly, if return value is < 0 the sort `a` before `b`. Finally, if the return value is == 0, then keep original order of `a` and `b`.

Therefore, our final number sorting code will look like this.

```js
let numberList = [3, 5, 1, 0, 4, 7, 23, 15, 75, 10];
numberList.sort(function (a, b) {
  return a - b;
});
console.log(numberList);

// Return: [ 0, 1, 3, 4, 5, 7, 10, 15, 23, 75 ]
```

## Sort array of dates in js

Now, let us define an array of strings that are formatted as a date.

```js
let dates = ["2020-12-06", "2021-04-14", "2020-10-30"];
```

As I have mentioned previously that dates are expressed as a number. Therefore we can use the previous comparison function to sort the dates as per our liking.

```js
let dates = ["2020-12-06", "2021-04-14", "2020-10-30"];

dates.sort(function (a, b) {
  // Converting string into Date object
  let date1 = new Date(a);
  let date2 = new Date(b);
  return date1 - date2;
});

console.log(dates);
// Return: [ "2020-10-30", "2020-12-06", "2021-04-14" ]
```

Here you can see that our dates are perfectly sorted.

If you want to reverse the date array, then just use the `reverse()` method on the `dates` array.

```js
dates.reverse();
```

## Conclusion

You have learned how to sort an array of dates in javascript. If you like this article, share it with your friends or colleagues.

If you like svelte and want to learn how to deploy a svelte app in github pages, then [this article](https://hrishikeshpathak.com/blog/svelte-gh-pages) can give you a step by step guide to do so.

If you have any questions, I am on Twitter as [@hrishikeshpathak](https://twitter.com/hrishikshpathak). See you in another article.