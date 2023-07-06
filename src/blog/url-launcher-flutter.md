---
title: How to Launch URL in Flutter Using url_launcher
description: import the url_launcher package and use luanch method to launch the url from your flutter app. Use canLaunch method to check if url scheme is supported.
hero: /images/url-launcher-flutter.webp
date: 2022-12-15
author: Hrishikesh Pathak
tags:
  - flutter
related:
  - run-shell-command-flutter-dart
  - file-picker-flutter
---

Do you want to launch an URL scheme from your Flutter app? In most applications when you click an URL, it launches the respective application which can handle that URL scheme. For example, if you click on a mail address, Gmail will open, if you click on a web link, a web view or your default browser with that link will open.

You may think that it is very hard to add these features to your Flutter application. But trust me, it is not. There are many Flutter packages present in [pub.dev](https://pub.dev/) site that enables us to launch different URL schemes in your Flutter application. But, out of these, [url_launcher](https://pub.dev/packages/url_launcher) is my favorite and covers many different URL schemes.

This URL launcher plugin supports web, email, phone, and SMS schemes. It also supports file URL schemes on desktop platforms. In this article, we will discuss how to launch URLs in Flutter using the URL launcher plugin.

## Setup and Overview

First, Install the `url_launcher` package in your Flutter project. Open the `pubspec.yaml` file in your project and add the following dependency in the dependencies section:

```yaml
dependencies:
  url_launcher: ^5.4.5
```

Run the command `flutter pub get` in the terminal to install the package in your project.

Then import the package in your dart file:

```dart
import 'package:url_launcher/url_launcher.dart';
```

One important thing to note is that we should add/register specific URL schemes in android and IOS before using them in our Flutter application. Otherwise, the `canLaunchUrl` function of `url_launcher` package always returned false. The `canLaunchUrl` function is used to check if the platform is capable of launching the URL or not.

For iOS, pass the URL schemes as `LSApplicationQueriesSchemes` in the `info.plist` file.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>sms</string>
  <string>tel</string>
</array>
```

For Android, add the URL schemes as `<queries>` in your `AndroidManifest.xml` file. The `<queries>` element must be added to your manifest as a child of the root element.

```xml
 <queries>
     <intent>
       <action android:name="android.intent.action.VIEW" />
       <data android:scheme="sms" />
     </intent>
     <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="tel" />
     </intent>
     <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="https" />
     </intent>
     <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="file" />
     </intent>
     <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="mailto" />
     </intent>
   </queries>
```

Now save these files and restart your Flutter application to apply these settings.

## Launch Web URL in Flutter

First, create a function that takes a web URL with an `HTTP` or `HTTPS` scheme as an argument. Then it uses the `url_launcher` package to launch the URL.

```dart
import 'package:url_launcher/url_launcher.dart';

void launchURL(String url) async {
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}
```

Now inside your Flutter UI, create an elevated button and execute the `launchURL` function, when the user tapped on it.

```dart
RaisedButton(
    onPressed: () {
      launchURL('https://www.google.com');
    },
    child: Text('Launch URL')
)
```

## Launch Telephone Numbers in Flutter

When you launch a telephone number using `url_launcher` package in a Flutter app, it launches the dialer app with the telephone number. Let's see how to implement this feature using the url_launcher package.

First, define a function that takes a phone number as an argument and launches the number using the `url_launcher` package. To construct the phone number URL, prefix the number with `tel:` scheme. Then use the `launch()` function to launch the telephone URL from your Flutter application.

```dart
 Future<void> launchPhoneNumber(String phoneNumber) async {
    String url = 'tel:' + phoneNumber;

    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $phoneNumber';
    }
}
```

Now add an elevated button in your UI and call the `launchPhoneNumber` function when a user clicks on the button.

```dart
ElevatedButton(
  onPressed: () => launchPhoneNumber(),
  child: Text("Call Now"),
)
```

## Launch Email Address in Flutter

Launching an email address with the `url_launcher` package is very similar to the above methods. When you launch an email address, it will open your default email client with the given email address. The code for this looks like this:

```dart
import 'package:url_launcher/url_launcher.dart';

void launchEmail(String email) async {
  String emailAddress = 'mailto:$email?subject=$subject&body=$body';
  if (await canLaunch(emailAddress)) {
    await launch(emailAddress);
  } else {
    throw 'Could not launch $emailAddress';
  }
}
```

In addition to the email address, you can also add the subject and body of the email as an URL parameter.

let's add an Elevated button to the UI of the Flutter app. When a user taps on the button, the `launchEmail` function is called with the desired email address as an argument.

```dart
ElevatedButton(
  onPressed: () {
    launchEmail('example@gmail.com');
  },
  child: Text('Launch your email')
)
```

The `launchEmail` function will check if the platform can launch the email address, and if it can, the `launch()` method is called. If launching the URL fails, an error message will be thrown.

## Launch SMS in Flutter

To launch an SMS message, you can use the `url_launcher` package to construct a custom URL that will open up the device's default SMS messaging application. The URL should prefix with the 'sms:' scheme and should include the phone number of the recipient.

For example, to launch an SMS message addressed to +911234567890, you can use the following code:

```dart
 Future _launchSms() async {
    Uri smsUri = Uri.parse("sms:+911234567890?body=hello%20there");
    if (await canLaunchUrl(smsUri)) {
      launchUrl(smsUri);
    }
  }
```

Once the URL is launched, it will open the device's default SMS messaging application and prepopulate the address and message fields with the details provided in the URL.

## Launch Filesystem in Flutter

The `url_launcher` package support `file:` URL scheme to launch the file system on user request. This feature is only available on desktop platforms.

For example, you want to launch the home directory of your system. Then you simply have to add `file:/home` to launch the home directory. Let's define a function `_launchFile` to give you an idea.

```dart
Future _launchfile() async {
    Uri fileUri = Uri.parse("file:/home");
    if (await canLaunchUrl(fileUri)) {
      launchUrl(fileUri);
    }
  }
```

When a user executes this function, the filesystem will launch. Let's add an elevated button for this task.

```dart
ElevatedButton(
  onPressed: _launchfile,
  child: const Text("Open file system"),
),
```

In addition to launching the file system, you have a requirement to pick a file from your file system. This can be easily done with the help of a file picker in Flutter. [File_picker](https://pub.dev/packages/file_picker) is a Flutter package, that supports all mobile and desktop platforms including all file types you can imagine. This is a [step-by-step guide on how to add a file picker](https://hrishikeshpathak.com/blog/file-picker-flutter/) to your Flutter application.

## Conclusion

The `url_launcher` package in Flutter provides an easy way to launch URLs from your app. It can be used to open web pages, send emails, make phone calls, send text messages, and more. With just a few lines of code, you can easily launch URLs in Flutter.

## Frequently Asked Questions

### How do I open an app from the URL in Flutter

To open an app from a URL in Flutter, you can use the `url_launcher` package. This package allows you to easily launch URLs in the default browser or in any installed app that supports the same protocol. To use it, simply add the package to your `pubspec.yaml` file and import it into your code. Once imported, you can launch any URL with the `launch()` method. For example, to launch the Google Play Store app with the `url_launcher` package, you can use the following code:

```dart
import 'package:url_launcher/url_launcher.dart';

String googlePlayStoreURL = "https://play.google.com/store/apps/details?id=com.example.myapp";

launch(googlePlayStoreURL);
```

### How do you link a URL in Flutter

You can easily link a URL in Flutter using the `url_launcher` package. With the help of this package, you can launch a URL in the mobile app or web browser. Additionally, you can use the Text widget with the recognizer parameter to recognize a URL and open it.
