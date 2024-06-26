---
title: The best way to run shell commands in flutter
description: Shell commands are crucial to make a cli or even a gui for flutter. This is a short article on how easily you can do that in flutter.
hero: /images/run-shell-command-flutter-dart.webp
date: 2022-04-24
author: Hrishikesh Pathak
tags:
  - flutter
  - bash
related:
  - file-picker-flutter
  - flutter-state-restoration
  - flutter-web-hosting-cloudflare
  - read-display-export-csv-flutter
---

Hi enthusiast, you are landed in this article because of only two reason.

1. You want to make a CLI (command line interface) with dart. Or,
2. You want to make a GUI of an existing CLI program (for example, FFmpeg).

So whatever the reason is, In this article, we are exactly going to discuss on running shell commands in flutter. Hope this article will answer some of your question. Smile buddy 😀.

## Packages for running shell command

Running a shell command in flutter is not that hard. We can use standard `run` method of [dartio library](https://api.dart.dev/stable/2.16.2/dart-io/Process/run.html). It become tedious to use this package sometimes. If you limit your external dependency, then surely you can use dart:Io for this purpose.

But to make our life easy, we will use [process_run](https://pub.dev/packages/process_run) package. With this package, running a shell command is very easy. Just copy and paste your shell command, and it will work out of the box.

## Running simple shell command in flutter/dart

In your flutter project, when you want to run a shell command, just type

```dart
import 'package:process_run/which.dart';

var shell = Shell();

await shell.run('''

// your command here

''');
```

For example, if you want to print something in the terminal, we use echo command. To run this command inside flutter/dart app, follow the code snippets given below.

```dart
import 'package:process_run/which.dart';

var shell = Shell();

await shell.run('''

echo "hello world"

''');
```

The above command print `hello world` in your output.

## Your turn

Now this is your turn. If you know how to interact with terminal, then possibility is endless. You can make some easy GUI apps with flutter and interact with the shell to do some operating system level interaction.

This is a short tutorial. If you want a complete end-to-end tutorial on making a GUI of traditional CLI apps with flutter, let me know. I am thinking about making a FFmpeg GUI with flutter. What do you think ?
