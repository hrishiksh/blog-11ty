---
title: How to generate QR code in flutter
description: Generating a QR code in flutter is very easy. This is a step by step guide to generate and scan QR code using flutter.
hero: /images/qr-flutter.webp
date: 2022-02-02
author: Hrishikesh Pathak
tags:
  - flutter
related:
  - read-display-export-csv-flutter
  - flutter-state-restoration
---

Sharing data is very crucial in our day-to-day life. In this digital era, QR is the most convenient way of sharing data between peers.

It bridges the gap between the online and offline forms of data transfer and provides an encrypted way of data transfer.

## Use Cases

People use QR for various purposes. Someone pastes it on a poster to share some link, someone uses it as an encrypted message between unknown devices.

The recent use of QR is in the fintech industry. Nowadays we all see QR codes present in every merchant store. They used it as a link to their payment account. Customers can easily scan and pay to the merchant without exposing any of their private information.

Now I think you have an idea about where can you use QR in your daily life. Please share all your thought use cases around QR code and tag me on twitter.

## How to use it in Flutter

You are a flutter developer and want to integrate QR inside your app.

Actually this is very easy as we have plentey of packages in the flutter package repository.

My choice is [qr_flutter](https://pub.dev/packages/qr_flutter) . You can try out other packges to. I choose this package because it works on every platform flutter supports.

Let’s see how render a QR inside our flutter app.

### Create a custom widget

We create a custom widget. It allow us to use this piece of code to reuse where we want. Our custom widget take a `data` parameter and render this `data` as a QR code.

```dart
class QrWidget extends StatelessWidget {
  final String data;
  const QrWidget({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {

  }
}
```

### Render a QR code

Now inside the build function, we use `QrImage` widget to render the QR code.

```dart
class QrWidget extends StatelessWidget {
  final String data;
  const QrWidget({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: QrImage(
        data: data,
        version: QrVersions.auto,
        size: 200,
      ),
    );
  }
}
```

Here you can see, we pass the `data` parameter from our custom widget to `QRImage` .

### Customisation of the QR code

Sometime we want to customise our QR code. Changing the size, colour or adding a logo in the middle of the QR code is such type of customisation.

```dart
class QrWidget extends StatelessWidget {
  final String data;
  const QrWidget({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: QrImage(
        data: data,
        version: QrVersions.auto,
        size: 200,
        foregroundColor: Colors.red,
        embeddedImage: const AssetImage("asset/demo.png"),
      ),
    );
  }
}
```

In this example I provide a foreground color to make the widget red. Then I use an image from the asset folder.

This image display on the center of the QR code.

### Handling errors

As a developer, when we develop a piece of software, error can be happened anywhere. So we should be ready to handle all those errors before they occured.

In the QR code generation, if some user provide something unusual, the QR widget may fail. To handle such type of disaster, we can use `errorStateBuilder` in the `QrImage` .

```dart
class QrWidget extends StatelessWidget {
  final String data;
  const QrWidget({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: QrImage(
        data: data,
        version: QrVersions.auto,
        size: 200,
        foregroundColor: Colors.red,
        embeddedImage: const AssetImage("asset/demo.png"),
        errorStateBuilder: (_, e) {
          return const Text("Uh oh! Try to make a valid input");
        },
      ),
    );
  }
}
```

You can customise the `errorStateBuilder` as your liking.

## How to scan QR code in flutter

Till now we have generated QR code inside our app. Now the question is how to scan this QR code ?

can we make a QR code scanner ?

YES ! why not. If you are interested, then you can check [qr_code_scanner](https://pub.dev/packages/qr_code_scanner) package in [pub.dev](https://pub.dev).

If you need a tutorial, then please tell me. I will gladly make a tutorial for you.

## Conclusion

With the advancement of technology, our physical and digital worlds are merging. In the world of metaverse and virtual reality, QR code is a low tech solution or we can say a mode of connection between physical and digital world.

If you like this article please checkout my [other articles](https://hrishikeshpathak.com/blog) as well.

Don’t forget to follow me on twitter @hrishikshpathak.
