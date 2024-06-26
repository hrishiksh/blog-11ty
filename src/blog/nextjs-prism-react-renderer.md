---
title: Easiest way to Highlight code syntax in your Nextjs site with PrismJs
description: Follow this step-by-step guide to highlight your code snippets in Nextjs, react, and markdown (or MDX) blog with the prism-react renderer.
hero: /images/nextjs-prism-react-renderer.webp
date: 2021-12-22
author: Hrishikesh Pathak
tags:
  - web
  - nextjs
  - reactjs
related:
  - deploy-nextjs-cloudflare-pages
  - sort-array-date-javascript
---

Hi _Developers_, today we are going to see how to implement syntax highlighting in your [ReactJS](https://reactjs.org/) or [nextjs](https://nextjs.org/) site with the help of a [prismJs](https://prismjs.com/) based NPM package, called [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer).

This tutorial will be helpful if you want to highlight a code block in your website. It has quite a few options of colour themes from which you can choose your favourite one.

## What is the use of syntax highlighting

So before starting, let's discuss a little about what is syntax highlighting and why we need this.

In every modern code editor, we can see syntax highlighting in action. This increases the readability of the code and a developer can easily interpret what the code is all about.

Syntax highlight can save a lot of time if a developer needs to review code or skim through the code very quickly. We can compare it with a well-structured blog post with an appropriate header and subhead so that the reader can easily find their required information.

Implementing code blocks in a blog or a website is really important if the niche of the website is programming or coding. If you add syntax highlighting over it, the site feels really cool and plays an important role in the user experience.

## How to implement syntax highlighting

Let's break down this meat part of the article into atomic blocks and try to follow them step by step.

### 1. Install required packages

Go to your project root directory where you have `package.json` file and run this command

```bash
# npm
npm install --save prism-react-renderer
# yarn
yarn add prism-react-renderer
```

### 2. Import the package into your .jsx file

first import `Highlight` component and `defaultProps` in your file.

```jsx
import Highlight, { defaultProps } from "prism-react-renderer";
```

### 3. Write your code snippets

Define your code snippets and assign this to a variable. Make sure to define the code with the required indentation. The code will be put inside a `pre` tag by the `Highlight` component so that indentation should be maintained.

```jsx
import Highlight, { defaultProps } from "prism-react-renderer";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;
```

### 4. Configure Highlight component from Prism-react-renderer

You can define the language of the code inside the `language` parameter. e.g., `language=python` or `language=js` etc.

Then put your code snippets in the `code` parameter. In this case, we are referring to the `exampleCode` variable we have defined above.

You can do custom styling by appending your custom class inside the `className` attribute of `<pre>` tag.

```jsx
import Highlight, { defaultProps } from "prism-react-renderer";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const CodeBlock=()=>{
  return (<Highlight {...defaultProps} code={exampleCode} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
// add your custom style by appending your className
      <pre className={className ${your_custom_class}} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>);
```

### 5. Use this as a component

If you are using ReactJS or NextJs then it makes no sense to repeat yourself over and over again to simply implement a code snippet. So instead of doing this, you can create a component that can accept two props. One is the formatted code itself and another one is the code language.

Then later we have to just pass those props and our job will become very easy. Let's implement this concept in code.

```jsx
import Highlight, { defaultProps } from "prism-react-renderer";

const CodeBlock=({code,codelang})=>{
  return (<Highlight {...defaultProps} code={code} language={codelang}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
// add your custom style by appending your className
      <pre className={className ${your_custom_class}} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>);

export default CodeBlock;
```

Now, let's use this `CodeBlock` component in other components.

```jsx
// Put your relative path and import CodeBlock from it
import CodeBlock from "./CodeBlock"

const OtherComponent=()=>{
// Pass the code and codelang props
  return <CodeBlock code=`console.log("Hello world")` codelang="js" />
}
```

So this is it. I have done quite a little research to implement syntax highlighting in this blog. After a lot of trial and error, This method is working for me. You can see the live example in front of you.

If you like this post, share it or at least make a tweet about it. Don't forget to tag me. You can find me as [@hrishikshpathak](https://twitter.com/hrishikshpathak) on Twitter.

Thanks for reading.
