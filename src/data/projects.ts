export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  androidUrl?: string;
  iosUrl?: string;
  webUrl?: string;
  githubUrl?: string;
  /**
   * The engagement in `experience.ts` this shipped from, linking the card to
   * `/journey#role-<id>`. Omitted for work that was not done for a client.
   */
  roleId?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'budggy-buyer',
    roleId: 'budggy',
    title: 'Budggy Buyer',
    description:
      'A cross-platform marketplace app built from the ground up — pixel-perfect Figma-driven UI, responsive across mobile and tablet, complex custom animations using SVG assets and CustomPainter, REST API integration, Riverpod for state, and go_router for navigation with deep linking. Shares a versioned budggy-ui package with the Seller app.',
    image: '/images/budggy-app.webp',
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
    roleId: 'exp',
    title: 'CORE by EXP.OS',
    description:
      'A live production product shipped from a single Flutter codebase across Android, iOS, and Web. Built with strict Clean Architecture (data, domain, presentation), BLoC and Cubit for state management, GraphQL for API integration, and go_router for cross-platform navigation including deep linking. Delivered through a CI/CD pipeline with GitHub PR reviews.',
    image: '/images/core-app.webp',
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
  },
  {
    id: 'just-qr-code',
    title: 'QR Code Scanner & Reader',
    description:
      'A published Android app built and shipped solo. Live camera scanning with torch, zoom, gallery scanning and vibration/sound feedback; generates URL, text, contact (vCard), WiFi and crypto-wallet codes with per-chain address validation; and checks every scanned link against the Google Safe Browsing API before opening it. Scan and create history is stored in SQLite with multi-select delete and CSV/PDF export, across four themes.',
    image: '/images/qrcode-app.webp',
    androidUrl:
      'https://play.google.com/store/apps/details?id=com.apposoft.just_qrcode',
    tags: [
      'Flutter',
      'Provider',
      'go_router',
      'Clean Architecture',
      'mobile_scanner',
      'SQLite'
    ]
  },
  {
    id: 'fity-healthy-food',
    roleId: 'fity',
    title: 'Fity — Healthy Food',
    description:
      'A calorie-tracking app built Figma-first: every screen matches the design file exactly, across phone and tablet. Laid out with MediaQuery-driven responsive sizing rather than fixed values, so nothing breaks between form factors. Structured as MVVM with Riverpod for state, and shipped through GitHub-based version control and review.',
    image: '/images/fity-app.webp',
    androidUrl: 'https://play.google.com/store/apps/details?id=at.info.fity',
    tags: [
      'Flutter',
      'Riverpod',
      'MVVM',
      'Figma to Flutter',
      'Responsive UI',
      'MediaQuery'
    ]
  },
  {
    id: 'orizon-digital-bank',
    roleId: 'qognitiv',
    title: 'ORIZON — Digital Bank Account',
    description:
      'A digital banking app on Android and iOS, shipped as part of the development team on a freelance engagement. I built the entire Figma-to-Flutter UI — every screen matching the design file and responsive across phone and tablet — set up the Clean Architecture foundation with data, domain and presentation kept separate, established the Riverpod state management layer, and integrated a number of the REST API endpoints.',
    image: '/images/orizon-app.webp',
    androidUrl:
      'https://play.google.com/store/apps/details?id=com.orizon.walletcustomer',
    iosUrl: 'https://apps.apple.com/in/app/orizon-digital-bank-account/id6752021467',
    tags: [
      'Flutter',
      'Riverpod',
      'Clean Architecture',
      'REST API',
      'Figma to Flutter',
      'Responsive UI'
    ]
  },
  {
    id: 'wicash-banking',
    roleId: 'qognitiv',
    title: 'WiCash — Digital Banking',
    description:
      'A digital banking app covering transfers, mobile money, virtual cards and payments, delivered as part of the development team on a freelance engagement. My scope mirrored ORIZON: the full Figma-to-Flutter UI build, responsive across phone and tablet, the Clean Architecture foundation separating data, domain and presentation, the Riverpod state management layer, and a share of the REST API integrations.',
    image: '/images/wicash-app.webp',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.wicash.banking',
    tags: [
      'Flutter',
      'Riverpod',
      'Clean Architecture',
      'REST API',
      'Figma to Flutter',
      'Responsive UI'
    ]
  },
  {
    id: 'avunja',
    roleId: 'simple-alliance',
    title: 'Avunja',
    description:
      'A cross-platform app shipped to Android and iOS from one Flutter codebase. My scope was the complete UI: the Adobe XD design file converted screen by screen into pixel-perfect Flutter, laid out responsively with MediaQuery and adaptive sizing, structured on an MVC folder architecture, and wired with GetX for reactive state, dependency injection and named routing.',
    image: '/images/avunja-app.webp',
    androidUrl:
      'https://play.google.com/store/apps/details?id=com.avunja.avunjaAgent',
    iosUrl: 'https://apps.apple.com/us/app/avunja/id6471581772',
    webUrl: 'https://www.avunja.com/',
    tags: [
      'Flutter',
      'GetX',
      'MVC',
      'Adobe XD to Flutter',
      'Responsive UI',
      'MediaQuery'
    ]
  }
];