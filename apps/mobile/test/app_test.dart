import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gamehub/app/app.dart';

void main() {
  testWidgets('renders sign in screen', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: GameHubApp()));
    expect(find.text('Sign in'), findsOneWidget);
  });
}
