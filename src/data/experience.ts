export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  /** Employment type as it appears on the CV — Contract, Freelance, Part-time. */
  type?: string;
  /** Where the client or team is based; all of these were remote. */
  location?: string;
  duration: string;
  /** Start year, used to order the timeline without parsing `duration`. */
  startYear: number;
  details: string[];
  tags: string[];
  /** Shipped products that came out of the engagement. */
  shipped?: string[];
}

/**
 * The ongoing engagement leads, then the rest run newest first. The home page
 * shows only the first few of these, so the current role has to be at the top
 * rather than buried under contracts that have already ended.
 *
 * `startYear` is kept as a sort key rather than parsing `duration`, which is a
 * display string and deliberately human-readable.
 */
export const experiences: WorkExperience[] = [
  {
    id: 'exp',
    role: 'Flutter Developer',
    company: 'EXP.',
    type: 'Part-time',
    location: 'Hong Kong · Remote',
    duration: 'March 2024 - Present',
    startYear: 2024,
    details: [
      'Maintain and extend a cross-platform Flutter application shipping to web, iOS and Android from one codebase, built on Cubit-based Clean Architecture.',
      'Diagnose and resolve production bugs, improving stability and reducing crash-related support tickets.',
      'Integrate GraphQL APIs with typed response models and robust error handling.',
      'Implement responsive design across the full range of device sizes and form factors.',
      'Refactor toward clean, testable structures, which keeps team velocity up on new feature delivery.',
      'Manage Git and GitHub workflows — branch strategy, pull requests and code review — to hold release quality steady across contributors.',
      'Collaborate daily with a 10+ member cross-functional team, tracking work in Notion and communicating over Slack.'
    ],
    tags: ['Flutter', 'BLoC', 'Cubit', 'Clean Architecture', 'GraphQL', 'go_router', 'CI/CD', 'Code Review'],
    shipped: ['CORE by EXP.OS (Android, iOS & Web)']
  },
  {
    id: 'qognitiv',
    role: 'Flutter Developer',
    company: 'QOGNITIV',
    type: 'Contract',
    location: 'Paris, France · Remote',
    duration: 'December 2025 - June 2026',
    startYear: 2025,
    details: [
      'Worked directly with the founding team on a portfolio of 3–4 cross-platform Flutter applications, two of which are live fintech products on both the Play Store and the App Store.',
      'Converted complete Figma designs into pixel-perfect Flutter UI, delivering fully responsive layouts with MediaQuery and adaptive sizing across phones and tablets on Android and iOS.',
      'Structured the codebases with Clean Architecture — data, domain and presentation kept separate — so features stayed testable and easy to extend.',
      'Implemented state management with Riverpod, using providers and code generation for predictable, boilerplate-free state.',
      'Integrated REST APIs on two banking applications as part of a distributed team: authentication flows, secure session management, error and loading states, and reusable network service layers.',
      'Built reusable widget libraries, design-system components and shared theming to keep the UI consistent across several apps.',
      'Collaborated across time zones with the CTO, backend and design teams through the full delivery cycle up to store release.'
    ],
    tags: ['Flutter', 'Riverpod', 'Clean Architecture', 'REST API', 'Figma to Flutter', 'Responsive UI', 'Fintech'],
    shipped: ['ORIZON — Digital Bank Account (Android & iOS)', 'WiCash — Digital Banking (Android)']
  },
  {
    id: 'budggy',
    role: 'Senior Frontend Developer',
    company: 'Budggy',
    type: 'Part-time',
    location: 'Amman, Jordan · Remote',
    duration: 'October 2025 - April 2026',
    startYear: 2025,
    details: [
      "Owned end-to-end Flutter frontend development for Budggy's budgeting and shopping platform, from architecture setup through App Store and Play Store release.",
      'Architected the app with Riverpod inside a Clean Architecture structure, which cut regression bugs and reduced friction on new feature delivery.',
      'Designed and built custom UI components with CustomPainter and custom clippers, giving the product a distinctive, brand-aligned interface.',
      'Implemented complex animations and transitions that improved perceived performance and engagement.',
      'Managed the full API integration between frontend and backend services, establishing error-resilient data flows.',
      'Built a reusable component library that shortened new-feature development time and standardised UI consistency.',
      'Maintained the shared budggy-ui package with semantic versioning so the Buyer and Seller apps stayed in sync.'
    ],
    tags: ['Flutter', 'Riverpod', 'Clean Architecture', 'CustomPainter', 'go_router', 'REST API', 'Design System'],
    shipped: ['Budggy Buyer (Android & iOS)']
  },
  {
    id: 'iib-solutions',
    role: 'Flutter Frontend Developer',
    company: 'IIB Solutions',
    type: 'Freelance',
    location: 'St. Helier, Jersey · Remote',
    duration: 'September 2024 - March 2025',
    startYear: 2024,
    details: [
      'Built and shipped a cross-platform mobile application end to end for Android and iOS, owning the complete frontend from architecture setup to store-ready builds.',
      'Architected the codebase on an MVC folder structure, keeping models, views and controllers cleanly separated for maintainability and faster onboarding.',
      'Implemented state management with GetX — reactive state, dependency injection and named routing — which reduced boilerplate and centralised navigation logic.',
      'Developed a fully responsive UI with MediaQuery and adaptive layouts for a consistent experience across phones and tablets on both platforms.',
      'Integrated Firebase Authentication with email/password and social sign-in, including session handling, validation and error states.',
      'Consumed REST APIs with structured error handling, loading states and reusable service layers.',
      'Delivered pixel-perfect screens from design handoffs, working with backend and design through the full cycle.'
    ],
    tags: ['Flutter', 'GetX', 'MVC', 'Firebase Auth', 'REST API', 'Responsive UI', 'MediaQuery']
  },
  {
    id: 'fity',
    role: 'Flutter Frontend Developer',
    company: 'Fity GmbH',
    type: 'Freelance',
    location: 'Vienna, Austria · Remote',
    duration: 'March 2023 - May 2023',
    startYear: 2023,
    details: [
      'Built the complete responsive Flutter UI, translating Figma designs into a pixel-perfect, animated, production-ready interface.',
      'Worked inside an existing full-stack team, using Provider for state management.',
      'Received a 5.0/5 client review for adaptability and smooth collaboration.'
    ],
    tags: ['Flutter', 'Provider', 'Figma to Flutter', 'Responsive UI', 'Animations'],
    shipped: ['Fity — Healthy Food (Android)']
  },
  {
    id: 'xs4arabia',
    role: 'Flutter Developer — Cross-Platform',
    company: 'Xs4Arabia Linux Services',
    type: 'Contract',
    location: 'Bahrain · Remote',
    duration: 'August 2022 - June 2023',
    startYear: 2022,
    details: [
      'Built the Flutter UI for three mobile applications and one POS application, translating Figma designs into a pixel-perfect, animated, production-ready interface.',
      'Worked within an existing full-stack team, using Provider and GetX for state management.',
      'Designed and implemented smooth page-level animations across all screens.',
      'Held to consistent coding standards and a scalable folder architecture across all four projects.'
    ],
    tags: ['Flutter', 'Provider', 'GetX', 'Figma to Flutter', 'Animations', 'POS']
  },
  {
    id: 'whooo',
    role: 'Flutter UI Developer',
    company: 'Whooo',
    type: 'Freelance',
    location: 'Remote',
    duration: 'July 2021 - July 2022',
    startYear: 2021,
    details: [
      'Built the Flutter UI for three cross-platform apps, translating Figma designs into fully responsive, pixel-perfect screens across phones and tablets.',
      'Implemented Firebase Authentication with proper session handling and validation.',
      'Wired up Cloud Firestore for real-time data, and Firebase Cloud Messaging for push notifications.',
      'Managed state with GetX and Provider depending on what each project needed.',
      'Handled end-to-end deployment to both the Google Play Store and the Apple App Store.'
    ],
    tags: ['Flutter', 'Figma to Flutter', 'Responsive UI', 'Firebase Auth', 'Cloud Firestore', 'Push Notifications', 'GetX', 'Provider']
  },
  {
    id: 'simple-alliance',
    role: 'Flutter UI Developer',
    company: 'Simple Alliance',
    type: 'Contract',
    location: 'Remote',
    duration: 'May 2021 - September 2021',
    startYear: 2021,
    details: [
      'Converted the complete Adobe XD design file for Avunja into pixel-perfect Flutter UI, shipping the same codebase to both Android and iOS.',
      'Structured the project on an MVC folder architecture — models, views and controllers kept separate — so screens stayed easy to locate and extend as the design grew.',
      'Implemented state management with GetX, using reactive controllers, dependency injection and named routing to keep the UI layer free of boilerplate.',
      'Built responsive layouts with MediaQuery and adaptive sizing so every screen held up across phone sizes on both platforms.',
      'Worked from the XD handoff directly with the design team, matching spacing, typography and component states screen by screen.'
    ],
    tags: ['Flutter', 'GetX', 'MVC', 'Adobe XD to Flutter', 'Responsive UI', 'MediaQuery'],
    shipped: ['Avunja (Android & iOS)']
  },
  {
    id: 'freelance',
    role: 'Flutter App Developer — Top Rated Plus & Level 2 Seller',
    company: 'Upwork & Fiverr',
    type: 'Freelance',
    location: 'Remote',
    duration: '2020 - Present',
    startYear: 2020,
    details: [
      'Delivered 10+ cross-platform Flutter applications for clients worldwide, architecting each with Clean Architecture and choosing state management — Riverpod, BLoC/Cubit, Provider or GetX — to match the complexity of the project.',
      'Completed 400+ orders on Fiverr and 50+ contracts on Upwork, holding Top Rated Plus status with a 65% repeat-client rate.',
      'Integrated REST and GraphQL APIs with robust error handling, and designed PostgreSQL-backed data models where projects needed custom backend logic.',
      'Built and maintained Firebase-powered features — authentication, Cloud Firestore, real-time sync — across multiple production apps.',
      'Established CI/CD pipelines with GitHub Actions and Fastlane, automating builds and streamlining App Store and Play Store submissions.',
      'Debugged, refactored and upgraded legacy Flutter codebases to modern standards.'
    ],
    tags: ['Flutter', 'Clean Architecture', 'Riverpod', 'BLoC', 'Provider', 'GetX', 'REST API', 'GraphQL', 'Firebase', 'PostgreSQL', 'CI/CD', 'Fastlane']
  }
];
