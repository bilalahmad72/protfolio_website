export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  androidUrl?: string;
  iosUrl?: string;
  webUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'budggy-buyer',
    title: 'Budggy Buyer',
    description:
      'A cross-platform marketplace app built from the ground up — pixel-perfect Figma-driven UI, responsive across mobile and tablet, complex custom animations using SVG assets and CustomPainter, REST API integration, Riverpod for state, and go_router for navigation with deep linking. Shares a versioned budggy-ui package with the Seller app.',
    image:
      'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&h=400&fit=crop',
    androidUrl:
      'https://play.google.com/store/apps/details?id=com.budggy.budggyApp',
    iosUrl: 'https://apps.apple.com/jo/app/budggy/id6499448001',
    tags: [
      'Flutter',
      'Riverpod',
      'REST API',
      'go_router',
      'CustomPainter',
      'Clean Architecture'
    ]
  },
  {
    id: 'core-by-exp',
    title: 'CORE by EXP.',
    description:
      'A live production product shipped from a single Flutter codebase across Android, iOS, and Web. Built with strict Clean Architecture (data, domain, presentation), BLoC and Cubit for state management, GraphQL for API integration, and go_router for cross-platform navigation including deep linking. Delivered through a CI/CD pipeline with GitHub PR reviews.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    androidUrl: 'https://play.google.com/store/apps/details?id=is.exp.os',
    iosUrl: 'https://apps.apple.com/us/app/core-by-exp-os/id6468764484',
    webUrl: 'https://core.exp.is/',
    tags: [
      'Flutter',
      'BLoC',
      'Cubit',
      'GraphQL',
      'go_router',
      'Clean Architecture',
      'CI/CD'
    ]
  }
];