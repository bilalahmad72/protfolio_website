export interface BlogSection {
  type: 'paragraph' | 'heading' | 'code' | 'quote' | 'list' | 'table';
  level?: 2 | 3;
  text?: string;
  code?: string;
  language?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageClass: 'flutter' | 'state' | 'frontend';
  iconType: 'flutter' | 'sitemap' | 'laptop-code';
  content: BlogSection[];
}

export const blogs: BlogPost[] = [
  {
    id: 'flutter-best-practices',
    title: 'Best Practices in Flutter Development',
    category: 'Flutter',
    date: 'January 5, 2025',
    excerpt: 'Learn about the latest best practices and patterns in Flutter development to build efficient and maintainable mobile applications that scale.',
    imageClass: 'flutter',
    iconType: 'flutter',
    content: [
      {
        type: 'paragraph',
        text: 'As Flutter continues to gain popularity in the mobile development world, establishing solid best practices becomes increasingly important. Having worked on numerous Flutter projects over the years, I\'ve compiled some key practices that can help you build maintainable, efficient, and high-performing applications.'
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Project Structure: Organization is Key'
      },
      {
        type: 'paragraph',
        text: 'One of the first challenges in any Flutter project is deciding how to organize your code. A well-structured project makes development faster and collaboration smoother.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Feature-first Organization'
      },
      {
        type: 'paragraph',
        text: 'Instead of organizing by type (models, views, controllers), consider organizing by feature. This approach groups related files together, making it easier to locate and work on specific functionality.'
      },
      {
        type: 'code',
        language: 'plaintext',
        code: `lib/
  ├── core/                  # Core functionality used across features
  │   ├── constants/         # App-wide constants
  │   ├── theme/             # App theme data
  │   ├── utils/             # Utility functions
  │   └── widgets/           # Shared widgets
  │
  ├── features/              # App features
  │   ├── authentication/    # Everything related to authentication
  │   │   ├── data/          # Data sources, repositories
  │   │   ├── domain/        # Business logic
  │   │   └── presentation/  # UI components
  │   │
  │   ├── home/              # Home feature
  │   └── settings/          # Settings feature
  │
  ├── app.dart               # App widget
  └── main.dart              # Entry point`
      },
      {
        type: 'heading',
        level: 2,
        text: '2. State Management: Choose Wisely'
      },
      {
        type: 'paragraph',
        text: 'Flutter offers numerous state management solutions. The key is to choose one that fits your project\'s complexity and team\'s familiarity.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Recommendations'
      },
      {
        type: 'list',
        items: [
          'Provider: Great for simpler applications or when getting started.',
          'Bloc/Cubit: Excellent for complex applications with predictable state flows.',
          'Riverpod: A more flexible evolution of Provider.',
          'GetX: All-in-one solution, but be cautious of overuse.'
        ]
      },
      {
        type: 'quote',
        text: 'The best state management solution is the one that your team understands and can implement consistently.'
      },
      {
        type: 'heading',
        level: 2,
        text: '3. UI Components: Compose, Don\'t Bloat'
      },
      {
        type: 'paragraph',
        text: 'Flutter\'s widget system encourages composition. Break your UI into small, reusable components to improve readability and maintainability.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Widget Extraction'
      },
      {
        type: 'paragraph',
        text: 'When a widget exceeds 100-150 lines, it\'s usually a sign to extract smaller widgets. This improves readability and makes debugging easier.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `// Instead of one large widget
class ProductDetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Product Details')),
      body: Column(
        children: [
          ProductImageCarousel(images: product.images),
          ProductInformation(product: product),
          PriceSection(price: product.price, discount: product.discount),
          AddToCartButton(productId: product.id),
        ],
      ),
    );
  }
}`
      },
      {
        type: 'heading',
        level: 2,
        text: '4. Performance Optimization'
      },
      {
        type: 'paragraph',
        text: 'Flutter is designed to be fast, but poor implementation can still lead to performance issues.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Key Performance Tips'
      },
      {
        type: 'list',
        items: [
          'Use const constructors where possible to prevent redundant rebuilds.',
          'Implement StatelessWidget instead of StatefulWidget when state isn\'t needed.',
          'Use ListView.builder() for long lists instead of Column with many children.',
          'Cache network images with cached_network_image package.',
          'Use the DevTools Performance view to identify bottlenecks.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Profile your app frequently, especially after adding new features. Performance issues are easier to fix when caught early.'
      },
      {
        type: 'heading',
        level: 2,
        text: '5. Testing: A Non-Negotiable Practice'
      },
      {
        type: 'paragraph',
        text: 'Testing is often overlooked but is crucial for maintaining app quality as it grows.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Types of Tests in Flutter'
      },
      {
        type: 'list',
        items: [
          'Unit Tests: For testing individual functions and classes.',
          'Widget Tests: For testing UI components in isolation.',
          'Integration Tests: For testing complete features or flows.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Aim for a good test coverage, especially for critical business logic. Even a modest coverage is better than none.'
      },
      {
        type: 'heading',
        level: 2,
        text: '6. Code Consistency with Analysis Options'
      },
      {
        type: 'paragraph',
        text: 'Maintaining consistent code style across a project improves readability and reduces errors. Flutter provides analysis tools to help enforce coding standards.'
      },
      {
        type: 'paragraph',
        text: 'Create an analysis_options.yaml file in the root of your project:'
      },
      {
        type: 'code',
        language: 'yaml',
        code: `include: package:flutter_lints/flutter.yaml

linter:
  rules:
    - always_declare_return_types
    - avoid_empty_else
    - avoid_print
    - prefer_single_quotes
    - sort_child_properties_last`
      },
      {
        type: 'heading',
        level: 2,
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'Following these best practices will help you create Flutter applications that are maintainable, performant, and easier to collaborate on. Remember that best practices evolve over time, so stay connected with the Flutter community to keep learning and improving your skills.'
      },
      {
        type: 'paragraph',
        text: 'In future articles, I\'ll dive deeper into specific areas like state management patterns and advanced performance optimization. Stay tuned!'
      }
    ]
  },
  {
    id: 'flutter-state-management',
    title: 'Flutter State Management: A Comprehensive Guide',
    category: 'Flutter',
    date: 'December 18, 2024',
    excerpt: 'Exploring different state management solutions in Flutter and when to use each approach for optimal performance.',
    imageClass: 'state',
    iconType: 'sitemap',
    content: [
      {
        type: 'paragraph',
        text: 'State management is often described as the hardest part of Flutter development. With so many options available, choosing the right approach can be overwhelming. In this comprehensive guide, I\'ll walk through the most popular state management solutions in Flutter, their strengths, weaknesses, and when to use each one.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Understanding State in Flutter'
      },
      {
        type: 'paragraph',
        text: 'Before diving into specific solutions, let\'s clarify what "state" means in Flutter. State is simply data that can change during the lifetime of your app. There are generally two types of state:'
      },
      {
        type: 'list',
        items: [
          'Ephemeral (Local) State: State that belongs to a single widget and doesn\'t need to be shared. For example, the current page in a PageView.',
          'App (Shared) State: State that\'s shared across multiple widgets or the entire app. For example, user authentication status or shopping cart items.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Now, let\'s explore different approaches to managing these states.'
      },
      {
        type: 'heading',
        level: 2,
        text: '1. setState - Flutter\'s Built-in Solution'
      },
      {
        type: 'paragraph',
        text: 'The simplest approach is using setState() within a StatefulWidget. This works well for ephemeral state but quickly becomes unwieldy for app state.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int counter = 0;
  
  void incrementCounter() {
    setState(() {
      counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $counter'),
        ElevatedButton(
          onPressed: incrementCounter,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use setState'
      },
      {
        type: 'list',
        items: [
          'For simple, local state that doesn\'t need to be shared.',
          'For small apps or prototypes.',
          'When you\'re just getting started with Flutter.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Provider - Simple but Powerful'
      },
      {
        type: 'paragraph',
        text: 'Provider is a dependency injection system that makes it easy to pass data down the widget tree. It\'s relatively simple to understand while still being powerful enough for most applications.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `// Model class
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// In your main.dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: MyApp(),
    ),
  );
}

// In your widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \${context.watch<CounterModel>().count}'),
        ElevatedButton(
          onPressed: () => context.read<CounterModel>().increment(),
          child: Text('Increment'),
        ),
      ],
    );
  }
}`
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use Provider'
      },
      {
        type: 'list',
        items: [
          'For medium-sized applications.',
          'When you want a balance between simplicity and power.',
          'For teams new to advanced state management.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Bloc/Cubit - Structured and Testable'
      },
      {
        type: 'paragraph',
        text: 'Bloc (Business Logic Component) and its simpler cousin Cubit provide a structured approach to state management based on reactive programming. This makes your code highly testable and scalable.'
      },
      {
        type: 'quote',
        text: 'Bloc forces you to think about your application as a series of events that transform state over time, making logic more predictable.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `// Cubit
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// In your widget
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterCubit(),
      child: CounterView(),
    );
  }
}

class CounterView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        BlocBuilder<CounterCubit, int>(
          builder: (context, count) {
            return Text('Count: $count');
          },
        ),
        ElevatedButton(
          onPressed: () => context.read<CounterCubit>().increment(),
          child: Text('Increment'),
        ),
      ],
    );
  }
}`
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use Bloc/Cubit'
      },
      {
        type: 'list',
        items: [
          'For larger, more complex applications.',
          'When testing is a priority.',
          'When you need clear separation of concerns.',
          'For enterprise applications with multiple developers.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '4. Riverpod - The Evolution of Provider'
      },
      {
        type: 'paragraph',
        text: 'Riverpod is the spiritual successor to Provider, addressing many of its limitations while maintaining its simplicity. It offers better compile-time safety and more flexibility.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `// Provider definitions
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state = state + 1;
}

// In your widget
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).increment(),
          child: Text('Increment'),
        ),
      ],
    );
  }
}`
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use Riverpod'
      },
      {
        type: 'list',
        items: [
          'When you like Provider but need more flexibility.',
          'For applications of any size, from small to large.',
          'When you want compile-time safety.',
          'For easy testing and dependency overrides.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '5. GetX - All-in-One Solution'
      },
      {
        type: 'paragraph',
        text: 'GetX is more than just a state management solution—it\'s a mini-framework that also provides navigation, dependency injection, and many utilities. It aims to make Flutter development more productive with minimal boilerplate.'
      },
      {
        type: 'code',
        language: 'dart',
        code: `// Controller
class CounterController extends GetxController {
  var count = 0.obs;
  
  void increment() => count++;
}

// In your widget
class CounterWidget extends StatelessWidget {
  final CounterController controller = Get.put(CounterController());
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() => Text('Count: \${controller.count}')),
        ElevatedButton(
          onPressed: controller.increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use GetX'
      },
      {
        type: 'list',
        items: [
          'When you want minimal boilerplate code.',
          'For rapid development.',
          'When you need other features like navigation and dependency injection.',
          'For solo developers or small teams.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '6. Redux - Predictable State Container'
      },
      {
        type: 'paragraph',
        text: 'Redux enforces a unidirectional data flow with a single source of truth. While it\'s more verbose than other solutions, it ensures predictable state changes and is well-suited for complex applications.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'When to use Redux'
      },
      {
        type: 'list',
        items: [
          'For very large applications with complex state interactions.',
          'When you need time-travel debugging.',
          'If your team is already familiar with Redux from other platforms.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Making the Right Choice'
      },
      {
        type: 'paragraph',
        text: 'Each state management solution has its strengths and weaknesses. Here\'s a quick comparison to help you decide:'
      },
      {
        type: 'table',
        headers: ['Solution', 'Learning Curve', 'Boilerplate', 'Scalability', 'Testing', 'Community Support'],
        rows: [
          ['setState', 'Low', 'Low', 'Poor', 'Poor', 'Built-in'],
          ['Provider', 'Low-Med', 'Low', 'Good', 'Good', 'Excellent'],
          ['Bloc/Cubit', 'High', 'High', 'Excellent', 'Excellent', 'Very Good'],
          ['Riverpod', 'Medium', 'Medium', 'Excellent', 'Excellent', 'Growing'],
          ['GetX', 'Low', 'Very Low', 'Good', 'Good', 'Good'],
          ['Redux', 'High', 'Very High', 'Excellent', 'Excellent', 'Good']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'My Recommendation'
      },
      {
        type: 'list',
        items: [
          'Start with setState for simple components and migrate as needed.',
          'Use Provider for small to medium projects or when just starting with state management.',
          'Consider Riverpod for new projects of any size.',
          'Choose Bloc for larger projects with complex business logic, especially in enterprise settings.',
          'Try GetX for rapid prototyping or solo development.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'State management is a crucial aspect of Flutter development that affects your app\'s architecture, maintainability, and performance. By understanding the options available and their use cases, you can make informed decisions that will benefit your project in the long run.'
      }
    ]
  }
];
