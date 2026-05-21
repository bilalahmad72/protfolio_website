export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export const experiences: WorkExperience[] = [
  {
    id: 'budggy',
    role: 'Senior Flutter Frontend Developer',
    company: 'Budggy',
    duration: 'October 2025 - Present',
    details: [
      'Developing the Budggy Buyer and Seller cross-platform apps from the ground up, following pixel-perfect Figma designs.',
      'Building responsive UIs that adapt seamlessly across mobile, tablet, and web screen sizes.',
      'Crafting complex custom animations using SVG assets and CustomPainter for fluid, branded interactions.',
      'Managing state with Riverpod and handling navigation with go_router, including deep linking.',
      'Integrating REST APIs with typed models using json_serialization and build_runner for code generation.',
      'Maintaining the shared budggy-ui GitHub repository with proper semantic versioning, alongside budggy-utilities, to keep the Buyer and Seller apps in sync.',
      'Collaborating closely with the backend developer and Figma designer to ship cohesive features.'
    ]
  },
  {
    id: 'exp',
    role: 'Flutter Frontend Developer',
    company: 'EXP.',
    duration: 'March 2024 - Present',
    details: [
      'Building and shipping a live production app across Android, iOS, and Web from a single Flutter codebase.',
      'Implementing strict Clean Architecture layering (data, domain, presentation) with BLoC and Cubit for state management.',
      'Integrating GraphQL APIs with typed response models and robust error handling.',
      'Handling navigation with go_router, including deep linking for cross-platform flows.',
      'Working within a CI/CD workflow, raising GitHub PRs, and going through structured code reviews.',
      'Collaborating daily with a 10+ member cross-functional team using Notion for task tracking and Slack for communication.',
      'Writing widget and unit tests and addressing bug fixes to keep the production app stable.'
    ]
  },
  {
    id: 'freelance',
    role: 'Flutter Mobile App Developer',
    company: 'Upwork & Fiverr (Freelance)',
    duration: '2020 - Present',
    details: [
      'Completed 400+ orders on Fiverr and 50+ contracts on Upwork, maintaining Top Rated Plus status with a 65% repeat-client rate.',
      'Delivered end-to-end Flutter apps, complete app redesigns, and Flutter web apps using clean folder architecture and Flutter best practices.',
      'Integrated REST and GraphQL APIs with typed models, plus Firebase services (Auth, Firestore, Storage, FCM, Crashlytics).',
      'Debugged, refactored, and upgraded legacy Flutter codebases to modern standards.',
      'Handled app deployment lifecycles end-to-end on both the Google Play Store and the Apple App Store.',
      'Provided ongoing bug-fixing, UI implementation, and feature-addition services across a wide range of client projects.'
    ]
  },
  {
    id: 'xs4arabia',
    role: 'Junior Flutter Developer',
    company: 'Xs4arabia',
    duration: 'August 2022 - June 2023',
    details: [
      'Built the Flutter UI for 3 mobile applications and 1 POS application using clean folder structure and code best practices.',
      'Designed and implemented smooth page-level animations across all screens for a polished user experience.',
      'Followed consistent coding standards and a scalable folder architecture across all four projects.',
      'Collaborated with the team to ship features on schedule and iterate on UI feedback.'
    ]
  },
  {
    id: 'whooo',
    role: 'Flutter App Developer',
    company: 'Whooo',
    duration: 'July 2021 - July 2022',
    details: [
      'Built the Flutter UI for 3 cross-platform apps using best practices in widget composition and folder structure.',
      'Managed state using GetX and Provider depending on each project\'s requirements.',
      'Integrated Firebase services for authentication, real-time data, and core backend functionality.',
      'Handled end-to-end deployment of 2 apps to both the Google Play Store and the Apple App Store.'
    ]
  }
];