import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final featured = List.generate(6, (i) => 'Game $i');
    return Scaffold(
      appBar: AppBar(title: const Text('GameHub'), actions: [IconButton(onPressed: () => context.go('/settings'), icon: const Icon(Icons.settings))]),
      body: RefreshIndicator(
        onRefresh: () async {},
        child: ListView(padding: const EdgeInsets.all(16), children: [
          SearchBar(hintText: 'Search games', trailing: [IconButton(onPressed: () {}, icon: const Icon(Icons.filter_alt_outlined))]),
          const SizedBox(height: 12),
          const Text('Featured', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ...featured.map((title) => Card(child: ListTile(title: Text(title), subtitle: const Text('Premium action game'), onTap: () => context.go('/game/sky-force-reloaded')))),
        ]),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        destinations: const [NavigationDestination(icon: Icon(Icons.home), label: 'Home'), NavigationDestination(icon: Icon(Icons.collections_bookmark), label: 'Library'), NavigationDestination(icon: Icon(Icons.download), label: 'Downloads'), NavigationDestination(icon: Icon(Icons.receipt_long), label: 'Orders'), NavigationDestination(icon: Icon(Icons.person), label: 'Profile')],
        onDestinationSelected: (i) => ['\/home', '\/library', '\/downloads', '\/orders', '\/profile'][i] == '/home' ? null : context.go(['\/home', '\/library', '\/downloads', '\/orders', '\/profile'][i]),
      ),
    );
  }
}
