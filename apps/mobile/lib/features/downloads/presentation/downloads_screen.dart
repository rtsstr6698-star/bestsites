import 'package:flutter/material.dart';

class DownloadsScreen extends StatelessWidget {
  const DownloadsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Downloads')),
      body: ListView(children: const [
        ListTile(title: Text('Sky Force Reloaded'), subtitle: Text('45% · 2.1 MB/s · 3m left'), trailing: Icon(Icons.pause_circle)),
        ListTile(title: Text('Retry queue empty'), subtitle: Text('No failed downloads'))
      ]),
    );
  }
}
