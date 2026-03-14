import 'package:flutter/material.dart';

class GameDetailsScreen extends StatelessWidget {
  const GameDetailsScreen({super.key, required this.slug});
  final String slug;

  @override
  Widget build(BuildContext context) {
    final directMode = true;
    return Scaffold(
      appBar: AppBar(title: Text(slug.replaceAll('-', ' '))),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ClipRRect(borderRadius: BorderRadius.circular(20), child: Image.network('https://picsum.photos/800/400')),
          const SizedBox(height: 12),
          const Text('Sky Force Reloaded', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24)),
          const Text('Developer: GameHub Studios'),
          const Text('Version: 1.0.0 · 244 MB · Min Android 8.0'),
          const SizedBox(height: 12),
          const Text('High-speed action gameplay with premium visuals and progression loops.'),
          const SizedBox(height: 20),
          FilledButton.icon(onPressed: () {}, icon: Icon(directMode ? Icons.shopping_cart : Icons.open_in_new), label: Text(directMode ? 'Buy / Download' : 'Open in Play Store'))
        ],
      ),
    );
  }
}
