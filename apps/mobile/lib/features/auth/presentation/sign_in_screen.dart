import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SignInScreen extends StatelessWidget {
  const SignInScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          width: 340,
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                const Text('GameHub', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                const TextField(decoration: InputDecoration(labelText: 'Email')),
                const TextField(obscureText: true, decoration: InputDecoration(labelText: 'Password')),
                Align(alignment: Alignment.centerRight, child: TextButton(onPressed: () {}, child: const Text('Forgot password?'))),
                const SizedBox(height: 8),
                FilledButton(onPressed: () => context.go('/home'), child: const Text('Sign in')),
                TextButton(onPressed: () {}, child: const Text('Create account'))
              ]),
            ),
          ),
        ),
      ),
    );
  }
}
