export interface Skill {
  id: string;
  title: string;
  description: string;
  iconName: 'phone' | 'git-branch' | 'cloud' | 'flame' | 'layout' | 'database';
}

export const skills: Skill[] = [
  {
    id: 'flutter-dart',
    title: 'Flutter & Dart',
    description: 'Building scalable cross-platform apps for Android, iOS, and Web with Flutter and Dart, following Clean Architecture with clear separation of data, domain, and presentation layers.',
    iconName: 'phone'
  },
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Hands-on experience with Riverpod, BLoC, Cubit, Provider, and GetX. I pick the right tool for the project — not just the trend.',
    iconName: 'git-branch'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Integrating REST and GraphQL APIs with typed response models, json_serialization via build_runner, robust error handling, and proper token refresh in the data layer.',
    iconName: 'cloud'
  },
  {
    id: 'firebase-backend',
    title: 'Firebase & Backend',
    description: 'Firebase Auth, Firestore, Storage, FCM, and Crashlytics — from MVP backends to production-ready setups deployed on both Play Store and App Store.',
    iconName: 'flame'
  },
  {
    id: 'responsive-frontend',
    title: 'Responsive Frontend',
    description: 'Pixel-perfect responsive Flutter UIs across mobile, tablet, and web, plus complex custom animations using SVG assets and CustomPainter for branded, fluid interactions.',
    iconName: 'layout'
  },
  {
    id: 'database-design',
    title: 'PostgreSQL & DB Design',
    description: 'Designing normalized PostgreSQL schemas, modeling relations, and writing efficient queries for the backend that powers the Flutter app.',
    iconName: 'database'
  }
];

export const marqueeSkills = [
  'Flutter',
  'Dart',
  'Clean Architecture',
  'Riverpod',
  'BLoC',
  'Cubit',
  'Provider',
  'GetX',
  'REST API',
  'GraphQL',
  'json_serialization',
  'build_runner',
  'go_router',
  'Firebase',
  'PostgreSQL',
  'Responsive UI',
  'CustomPainter',
  'SVG Animations',
  'Git & GitHub',
  'CI/CD',
  'Notion',
  'Slack'
];