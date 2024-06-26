---
title: How to use File picker in Flutter ? Pick Image, audio and other types of file
description: Complete guide to use File-picker in flutter. Pick any image, pdf or other type of files is just one click away.
hero: /images/file-picker-flutter.webp
date: 2021-12-22
author: Hrishikesh Pathak
tags:
  - flutter
related:
  - run-shell-command-flutter-dart
  - flutter-state-restoration
---

Hi _developers_, in this article, we are discussing how to use a file picker in Flutter. I am trying to cover all aspects and use cases you may encounter during implementation of a file picker in flutter. This article, or you can say guide, is applicable for android, iOS, and web platforms.

We are going to use [file_picker](https://pub.dev/packages/file_picker) package from [pub.dev](https://pub.dev/).

Before starting, let's discuss some handy features of this file picker.

## Features of file picker

1. **It uses operating system default native picker** : This file picker invoke native file picker and get information of user selected file. Thus, we can see OS specific UI in this file picker package.
2. **Filter different types of files** : If you want only a specific type of file (e.g. PDF, JPG, SVG etc), you can set this file extensions as an argument and file picker will show user the requested file types, nothing else.
3. **Pick files from cloud files** : This extension allow you to pick files not only from your device, but also from cloud storage like Google Drive, Dropbox, iCloud etc.
4. **Single or multiple** : You can allow user to select single or multiple file at once. This is up to you, as a developer you have the freedom to decide what you want in your application.
5. **Read file** : This file picker extension can read the selected file and load it in the memory as a `Uint8List`. This will be very handy if you want to upload this file somewhere, or you want to manipulate it as your own way.

So the possibility is endless. It is up to you as a developer that what you choose and what you leave. Before make that decision, let's see how to implement all these feature in code. Let's open our code editor and make a new flutter project.

## A new flutter project

Probably all of you know how to create a new project in flutter, right? Those of you who don't know, just open your terminal and run.

```bash
flutter create <your project name>
```

After you create the project, go to the project folder and open in your code editor. In my case, I am using [VS Code](https://code.visualstudio.com/download).

So after everything has set up, let's make a file picker using flutter.

## Implementing a file picker in Flutter

So before writing any code, we have to install [file_picker](https://pub.dev/packages/file_picker) package from [pub.dev](https://pub.dev).

Head on to your `pubspec.yaml` file and add the following line in your file.

```yaml
// pubspec.yaml

name: flutter_file_picker
description: A new Flutter project.
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  // Add this line in your file
  file_picker: ^3.0.3

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

Now finally we are ready to write our file picker. Are you excited ? If you are enjoying this article, then you can press the heart button to give me heart 😊. Easy eight ? OK, let's focus on code.

So go to your `lib/main.dart` file and delete all the code right there, as we start from scratch.

As we will use material widgets and file picker package in this tutorial, at first import these two packages at the top of our `main.dart` file.

```dart
// main.dart

import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
```

Then let's write our main function. This is the starting point of our application. I assume you know all these already, so I will fast-forward to file picker implementation. I have written a bare-bones UI, so that we can focus on the implementation.

```dart
// main.dart

import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

void main() {
  runApp(
    MaterialApp(
      home: FilePickerApp(),
    ),
  );
}

class FilePickerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("This is for only tut perpose"),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Add file picker functionality here
          },
          child: Text("File Picker"),
        ),
      ),
    );
  }
}
```

Here I made a scaffold and at the centre, I have made a `ElevatedButton`.

When user press the button, We lunch the file picker.

For that, inside the `onPressed` method, we `await` for the user to pick a file. For that, we run `FilePicker.platform.pickFiles()` function.

This function can get us two possible outcomes. If user successfully pick the file, this give us a `FilePickerResult` or if user don't choose any file, it returns a `null`.

So to handle that two condition, we apply a null check that if the result is not null, then give us the name of the file
user have picked.

In code, the file picker will look like this :

```dart
// main.dart

onPressed: () async {
  FilePickerResult? result = await FilePicker.platform.pickFiles();
  if (result == null) {
    print("No file selected");
  } else {
    print(result.files.single.name);
  }
}
```

You can extend this file picker and customize this as your need. As I have previously mentioned, you can filter your file type, choose between single or multiple file and even pick a file from a cloud drive.

The possibility is endless. So try to make your own customize file picker and share with me. You can find me on Twitter as [@hrishikshpathak](https://twitter.com/hrishikshpathak).

See you next time.
