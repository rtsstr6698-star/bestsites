import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Settings')),
        body: ListView(children: [
          SwitchListTile(value: true, onChanged: (_) {}, title: const Text('Dark theme')),
          SwitchListTile(value: true, onChanged: (_) {}, title: const Text('Notifications')),
          ListTile(title: const Text('Language'), subtitle: const Text('English (localization-ready)')),
          ListTile(title: const Text('Logout'), onTap: () {})
        ]),
      );
}
