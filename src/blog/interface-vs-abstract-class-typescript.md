---
title: Interface vs Abstract Class in Typescipt
description: Interface and abstract class are almost the same in typescript. But there are some small differences that I am describing in the blog. This blog also helps you to decide whether you have to choose an interface or an abstract class in your typescript project.
hero: /images/interface-vs-abstract-class-typescript.webp
date: 2023-06-16
author: Hrishikesh Pathak
tags:
  - typescript
  - web
related:
  - host-nodejs-api-netlify-functions
  - sort-array-date-javascript
  - selfhost-google-font-local
  - golang-code-playground
---

In Typescript, interface, and abstract classes are used to define the structure or shape of an object(class). But there is some difference between the two. 

In this article, we are going to look at what are the differences between interface and abstract class in typescript and what you should use in your typescript project.

## Interface in Typescript

According to the official typescript documentation, [interfaces are a powerful way of defining contracts within code](https://www.typescriptlang.org/docs/handbook/interfaces.html).

For example, you have an interface called `Child`, where you have defined all the features of a child.

```ts
interface Child {
  name: string;
  age: number;
  height: number;
  weight: number;
  getBMI(): number;
}
```

Here I have added the `name`, `age`, `height`, and `weight` properties of a child and a method definition `getBMI`. **Look closely**, here I described only properties and methods in this `Child` interface. I haven't added any values or inner workings of the method.

Once a `class` implements this `interface`, all those properties and methods of the `Child` interface should be there in that `class`. 

It means that interfaces make a **blueprint** about what an object or a class or a variable should look like if they implement an interface.

Interface forces an object to be in a particular shape.

Let's see how to implement an interface in typescript.

```ts
class Human implements Child {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number
  ) {}

  getBMI(): number {
    return this.weight / Math.pow(this.height, 2);
  }
}
```
Here you can see, the `Human` class implements the `Child` interface completely. In addition to this, the `Human` class can add additional methods or properties on their own.

```ts
class Human implements Child {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number,
    public surname:string
  ) {}

  getBMI(): number {
    return this.weight / Math.pow(this.height, 2);
  }

  get legalName():string{
    return `${this.name} ${this.surname}`
  }
}
```

In the above example, you can see the `surname` and `legalName` getter set by the `Human` class, and the typescript compiler don't complain about that.

## Abstract Class in Typescript

An abstract class is not very different from `Interface` in typescript. They also impose a structure on a child class who `extends` it.

Let's convert our `Child` interface into an `abstract` class.

```ts
abstract class Child {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number
  ) {}

  abstract getBMI(): number;
}
```
When a class `extends` this `abstract` class, it must implement all the properties and methods declared in the `Child` abstract class.

```ts
class Human extends Child {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number,
    public surname: string
  ) {
    super(name, age, height,weight)
  }

  getBMI(): number {
    return this.weight / Math.pow(this.height, 2);
  }

  get legalName(): string {
    return `${this.name} ${this.surname}`;
  }
}
```

In addition to this, we can directly define the `getBMI` function in the abstract class itself.

```ts
abstract class Child {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number
  ) {}

  getBMI(): number{
    return this.weight / Math.pow(this.height, 2); 
  };
}
```
Now remove the `getBMI` method from the `Human` object. But you can still access the method as the `Human` class extends the `Child` abstract class.

```ts
const man= new Human("Hrish",20,100,50,"pathak")
man.getBMI()
```

## Abstract class present at runtime

The interface is a typescript addition to type-check your code efficiently. But on the contrary, an abstract class is a javascript feature and it is present at runtime.

Therefore you can access the abstract class in the runtime. Interfaces are removed from the code once your code is transpiled into javascript.

## Conclusion

If you have read this blog to the end, you can say that there is not much difference between interfaces and abstract classes.

I only use the abstract class when I need to define a method inside the parent abstract class itself. Otherwise, I use Interfaces. Interfaces have less boilerplate and are more readable as compared to abstract classes.