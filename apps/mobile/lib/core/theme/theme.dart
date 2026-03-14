import 'package:flutter/material.dart';

ThemeData buildDarkTheme() => ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorSchemeSeed: Colors.deepPurple,
      cardTheme: const CardTheme(margin: EdgeInsets.symmetric(vertical: 8), shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20))))
    );

ThemeData buildLightTheme() => ThemeData(useMaterial3: true, colorSchemeSeed: Colors.deepPurple);
