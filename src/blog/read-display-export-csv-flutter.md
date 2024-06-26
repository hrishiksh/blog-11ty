---
title: How to read and display csv data in Flutter
description: Reading a processing csv file in flutter is very easy. This is a step-by-step guide to read, process and display csv file in flutter.
hero: /images/read-display-export-csv-flutter.webp
date: 2022-05-09
author: Hrishikesh Pathak
tags:
  - flutter
related:
  - qr-flutter
  - run-shell-command-flutter-dart
---

## Introduction

If you export your financial statement from your bank website, you probably get a CSV file containing all of your financial records. You can load this CSV file into MS Excel and analyze your spending habits.

Now imagine, if you can do all those analyses and plot beautiful graphs in your flutter app. It will be amazing, right? This also gives your user the flexibility to import their data to your app and give them some extra convenience.

But reading CSV files in flutter is not very straightforward. You have to know some CSV jargon to properly handle a CSV file. In this article, I am going to explain all the bits and pieces of handling CSV files in Flutter.

In the later part of this article, we are also going to display CSV data as a table inside our flutter app. As a bonus work, we are going to write CSV files to disk.

The final app will look like this.

![Final app demo](/videos/read-display-export-csv-flutter.webp)

## CSV Data structure

CSV stands for Comma Separated Value. In a CSV file, every line represents a unique row inside a table. The first row represents the column name. The values are separated by commas.

A standard CSV file looks something like this.

```csv
Date,Income/Expenses,Category,Memo,Amount
2022-05-07,Expenses,Snacks,biscuits,-20
2022-05-07,Expenses,Food,masala,-15
2022-05-07,Expenses,veggies and fruits,lemon,-10
2022-05-07,Expenses,Food,chicken,-140
2022-05-07,Expenses,Snacks,nearby,-75
2022-05-06,Expenses,Telephone,recharge,-25
```

Sometimes, a few CSV files contain some other type of delimiters. So we have to provide all the delimiter, end-of-line syntax, and other parameters to the decoder so that we get a proper list of values to work with.

We will see how to provide all custom delimiters in this article. For now, let's set up a basic flutter project for this article.

## Basic project setup

Navigate to your desired folder and in the terminal run the following command. If you haven't installed flutter in your system, you can follow [this guide](https://docs.flutter.dev/get-started/install).

```shell
flutter create csv_flutter
```

The flutter CLI will generate your project inside the folder called `csv_flutter`. Open this folder in your favorite text editor. I am using Visual Studio Code. You can download and install Visual Studio Code editor from [here](https://code.visualstudio.com/download).

Navigate to your `lib/main.dart` file and remove all the code inside the folder. We will write from scratch.

Import Material library and define `main()` function. The `main()` is the starting point of the app. The code inside `main` will look something like this.

```dart
void main() {
  runApp(
    const MaterialApp(
      home: Homepage(),
    ),
  );
}
```

## Install Dependency

We need to install the [CSV package](https://pub.dev/packages/csv) to work with CSV in Flutter. To install this package, inside your project folder, open a terminal and run.

```bash
flutter pub add csv
```

Then the CSV package will install in your project. You can confirm this by looking at `pubspec.yaml` file. Under dependencies, you will find `csv` with a version number.

After that, create a folder called `assets` inside your project root. Then create a file called `test.csv` and copy and paste all the CSV data from here.

```csv
2022-05-04,Expenses,veggies and fruits,vut jolokia,-7
2022-05-04,Expenses,Snacks,bread,-18
2022-05-04,Expenses,Food,egg,-48
2022-05-04,Expenses,Food,milk,-30
2022-05-04,Expenses,veggies and fruits,pumpkin and lemon,-20
2022-05-04,Expenses,Snacks,maina da r chah,-10
2022-05-04,Expenses,Food,coffe house,-70
2022-05-03,Expenses,Snacks,icecream,-100
2022-05-03,Expenses,Food,jodu,-250
2022-05-03,Expenses,Transportation,,-65
2022-05-02,Expenses,Shopping,tshirt,-2000
2022-05-02,Expenses,Food,,-504
2022-05-02,Expenses,Transportation,,-830
2022-05-01,Expenses,Food,,-400
2022-05-01,Expenses,Food,kfc,-1500
2022-05-01,Expenses,Transportation,,-330
2022-05-01,Expenses,Telephone,Airtel 1.5/day 84 days,-666
2022-04-30,Expenses,Transportation,to airbnb,-40
2022-04-30,Expenses,Food,thagbaiban food,-500
2022-04-30,Expenses,Snacks,sprite,-50
2022-04-30,Expenses,Snacks,tea at loktak lake,-20
2022-04-30,Expenses,Snacks,cafe and amul cool,-75
2022-04-30,Expenses,Transportation,boat at loktak lake,-500
2022-04-30,Expenses,Transportation,to loktak lake,-100
2022-04-30,Expenses,Shopping,roses,-200
2022-04-30,Expenses,Transportation,to get roses,-200
2022-04-30,Expenses,Transportation,to ima market,-20
2022-04-29,Expenses,Food,dinner,-200
2022-04-29,Expenses,Transportation,airport to hotel,-300
2022-04-29,Expenses,Food,airport food,-230
2022-04-29,Expenses,Transportation,,-250
```

Your CSV file path should look like this `csv_flutter/assets/test.csv`.

Now inside your `pubspec.yaml` file, add the following lines under the flutter arguments.

```yaml
flutter:
  # Add the following lines
  assets:
    - assets/
```

Now we are all set. Let's read CSV data from the `test.csv` file.

## Read data from a file in Flutter

As we are adding the `test.csv` file inside the flutter project, we can access the file from `rootBundle` or `AssetBundle` objects. If you have access to `BuildContext`, means if you are working inside a widget, then you should always use `AssetBundle` class as per the flutter documentation.

If you want to read an external CSV file, not included in your app bundle, you can use a file picker in your flutter app. Read this article to know more about [how to use file pickers in Flutter](https://hrishikeshpathak.com/blog/file-picker-flutter).

Now, to read our `test.csv` file from the `AssetBundle`, we use`loadString` method of `DefaultAssetBundle` class. At first, create a function called `processCsv`. This function read the `test.csv` file and converts the CSV string into a List.

As the method is asynchronous, The return type of the function `processCsv` is `Future<List<List<dynamic>>>`. The code inside the function to read the CSV file looks like this.

```dart
Future<List<List<dynamic>>> processCsv() async {
    var result = await DefaultAssetBundle.of(context).loadString(
        "assets/data/test.csv",
    );
}
```

## Convert CSV data into List

Now the moment finally arrives. We use the [CSV package](https://pub.dev/packages/csv) to convert the CSV string, we previously got from the `loadString` method.

We convert the CSV string into a `List<List<dynamic>>` type in dart. It means The complete CSV file will convert into a single giant list, this list contains the individual rows as a list. Every data point inside a row becomes an element inside the list. It sounds confusing, right. I am saying that, if we convert the following CSV into a list inside our flutter app, it will look like this.

```
// CSV
Date,Income/Expenses,Category,Memo,Amount
2022-05-07,Expenses,Snacks,biscuits,-20
2022-05-07,Expenses,Food,masala,-15
2022-05-07,Expenses,veggies and fruits,lemon,-10
2022-05-07,Expenses,Food,chicken,-140

// List after converting inside flutter
[[Date, Income/Expenses, Category, Memo, Amount],
[2022-05-07, Expenses, Snacks, biscuits, -20],
[2022-05-07, Expenses, Food, masala, -15],
[2022-05-07, Expenses, veggies and fruits, lemon, -10],
[2022-05-07, Expenses, Food, chicken, -140]]
```

I think things are getting clear in your minds. Let's do all of these in code.

To parse CSV into a List, we use `CsvToListConverter` class from CSV package. We pass on a previously read string from the CSV file, as an argument and get a `List<List<dynamic>>` in return. At least, in theory, this should be the expected result.

The code will look something like this.

```dart
import 'package:csv/csv.dart';

Future<List<List<dynamic>>> processCsv() async {
    var result = await DefaultAssetBundle.of(context).loadString(
      "assets/data/test.csv",
    );
    return const CsvToListConverter().convert(result, eol: "\n");
}
```

Now, in the `convert()` method, we can specify many CSV arguments. For example, field delimiter, text delimiter, eol, etc. Each of these parameters has its unique usage.

The field delimiter is the separator between the fields. As CSV itself means Comma Separated value, so the default field delimiter is a comma `","`.

Similarly, eol represent the end of line character. If each of your rows ends and the new row starts with a new line, and there is no symbol in between, then you should specify eol as `\n`. Which means a new line. In our code, we are using `\n` as an eol.

A text delimiter is a symbol that surrounds a field. You can optionally provide a text delimiter.

`shouldParseNumbers` is a property that enables us to parse numeric values which are not inside a quote. The decoder parses the value as an `int` or `double`.

## Display CSV data in the UI

As we have read and decoded the CSV Data till now, this is the time to display the CSV data inside our flutter app.

The best-suited widget to display our app is [DataTable](https://api.flutter.dev/flutter/material/DataTable-class.html). This widget helps us to create a table programmatically. As our table can have many columns, make sure to wrap it around a `SingleChildScrollView` and set the `scrollDirection` to horizontal.

Then we have to define columns and rows of `DataTable` widget. As we are getting a data type of `List<List<dynamic>>` from the `processCsv` function, it will be very easy to programmatically map the data into the rows and columns of the `DataTable`.

The UI code will look like this.

```dart
SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: csvData == null
            ? const CircularProgressIndicator()
            : DataTable(
                columns: csvData![0]
                    .map(
                      (item) => DataColumn(
                        label: Text(
                          item.toString(),
                        ),
                      ),
                    )
                    .toList(),
                rows: csvData!
                    .map(
                      (csvrow) => DataRow(
                        cells: csvrow
                            .map(
                              (csvItem) => DataCell(
                                Text(
                                  csvItem.toString(),
                                ),
                              ),
                            )
                            .toList(),
                      ),
                    )
                    .toList(),
              ),
      ),
```

Now to read and display the CSV data as a response to user input, we lift the state of our app into a stateful widget. We define a nullable variable named `csvData`. This variable will be `null` or contain the list obtained from parsing the CSV file discussed earlier.

We define a `FloatingActionButton` for user input and run a `setState()` function to render the `DataTable` after the user pressed the `FloatingActionButton`.

Now the workflow will look something like this.

```
FloatingActionButton -> processCsv() -> SetSate() -> DataTable
```

The complete code for the app will look like the following.

```dart
import 'package:flutter/material.dart';
import 'package:csv/csv.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  List<List<dynamic>>? csvData;

  Future<List<List<dynamic>>> processCsv() async {
    var result = await DefaultAssetBundle.of(context).loadString(
      "assets/data/test.csv",
    );
    return const CsvToListConverter().convert(result, eol: "\n");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Csv reader"),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: csvData == null
            ? const CircularProgressIndicator()
            : DataTable(
                columns: csvData![0]
                    .map(
                      (item) => DataColumn(
                        label: Text(
                          item.toString(),
                        ),
                      ),
                    )
                    .toList(),
                rows: csvData!
                    .map(
                      (csvrow) => DataRow(
                        cells: csvrow
                            .map(
                              (csvItem) => DataCell(
                                Text(
                                  csvItem.toString(),
                                ),
                              ),
                            )
                            .toList(),
                      ),
                    )
                    .toList(),
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          csvData = await processCsv();
          setState(() {});
        },
      ),
    );
  }
}

```

This is the final app that displays the CSV file inside a `DataTable` in flutter android.

![Final app demo](/videos/read-display-export-csv-flutter.webp)

## Conclusion

As we have discussed how to read a CSV file in flutter and how to display the data inside your flutter app. In this article, I am trying to display the CSV data inside a `DataTable`. You can also display the CSV data inside a `ListView`. As the data is just a List of List `List<List<dynamic>>`, you can display whatever you want.

If you are trying to follow this example, show me what you have built. I am present on Twitter as [@hrishikshpathak](https://twitter.com/hrishikshpathak).

## Bonus

As a programmer, the sky is the limit. Now, as you have learned so much about CSV parsing in a flutter, you can create a plot from CSV data.

Or you can make an Excel-like app that helps the user to read and manipulate CSV data.

As a part of this, you can also try to write modified CSV data into a disk and export it to the user file system.

Give it a go and show me the results. Have a nice day.
