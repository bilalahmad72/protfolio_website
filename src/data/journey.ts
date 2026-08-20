/**
 * The narrative version of the CV.
 *
 * `experience.ts` answers "what did you do at each company"; this answers "how
 * did you get from there to here". The home page shows the summary of each
 * chapter, the /journey page shows the full body alongside the timeline.
 */
export interface JourneyChapter {
  id: string;
  period: string;
  title: string;
  /** One or two sentences — this is what the home page section renders. */
  summary: string;
  /** The long version, one paragraph per entry. */
  body: string[];
}

export const journeyIntro =
  "I did not set out to become a Flutter specialist. I started taking freelance work while studying at COMSATS, took whatever mobile projects came in, and slowly discovered that the parts I enjoyed most — structuring a codebase so it survives its second year, getting a screen to match the design exactly, making an interaction feel considered — were the parts most people skipped.";

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'first-builds',
    period: '2020 — 2022',
    title: 'Learning to ship, not just to code',
    summary:
      'Freelancing on Upwork and Fiverr while studying, then three production apps at Whooo — Figma to Flutter, Firebase, and my first releases on both stores.',
    body: [
      'The first two years were freelance work on Upwork and Fiverr alongside university. Small jobs mostly: a screen that would not lay out correctly, a bug someone could not reproduce, a redesign of an app that already existed. That kind of work teaches you a specific thing very quickly — how to read a codebase you did not write and find your way around it without breaking anything.',
      'Whooo was the first engagement where I owned real product surface. Three cross-platform apps, each built from Figma designs into fully responsive Flutter UI. That is also where the backend side stopped being abstract: Firebase Authentication with proper session handling, Cloud Firestore for real-time data, and Firebase Cloud Messaging for push notifications.',
      'It is also where I first took an app all the way through Google Play and App Store review, which is its own skill and nothing like writing the app. Signing, provisioning, review rejections, store metadata — none of it is hard, but all of it has to be learned once.'
    ]
  },
  {
    id: 'teams',
    period: '2022 — 2024',
    title: 'Working inside someone else’s team',
    summary:
      'Xs4Arabia in Bahrain and Fity in Vienna — building complete responsive UIs from Figma inside existing full-stack teams, where the constraint is other people’s code.',
    body: [
      'At Xs4Arabia I built the Flutter UI for three mobile apps plus a POS application, working with Provider and GetX. Four projects in parallel forces a decision you can avoid on a single app: pick conventions and hold to them, because you will be moving between codebases every day and cannot afford four different sets of habits.',
      'Fity was shorter — a few months — and the whole brief was the responsive UI, translated from Figma into a production-ready animated interface, inside a full-stack team that was already running. The review at the end was 5.0/5, and the thing it was for was adaptability, which I think is the honest summary of what that kind of work actually requires.',
      'Both were remote, across time zones, into teams I had not built. That turned out to be most of the job.'
    ]
  },
  {
    id: 'architecture',
    period: '2024 — 2025',
    title: 'Owning the architecture',
    summary:
      'IIB Solutions end to end on my own, and EXP. in Hong Kong — a live production app across web, iOS and Android on Cubit-based Clean Architecture, with real code review.',
    body: [
      'At IIB Solutions I owned an entire cross-platform app on my own, from the architecture decision through to store-ready builds — an MVC structure, GetX for reactive state and routing, Firebase Auth with social sign-in, and REST integration with proper error and loading states throughout.',
      'EXP. was different in a way that mattered more. A live production app serving real users on web, iOS and Android from a single codebase, built on strict Clean Architecture with Cubit, GraphQL with typed response models, and a 10+ person cross-functional team. Every change went through a pull request and a real review.',
      'That is where I stopped thinking of architecture as something you set up at the start and started treating it as something you defend continuously. Clean Architecture is not a folder structure — it is a set of decisions about what is allowed to depend on what, and it only holds if somebody keeps checking.'
    ]
  },
  {
    id: 'fintech',
    period: '2025 — 2026',
    title: 'Fintech, and shipping my own',
    summary:
      'Frontend ownership at Budggy, then four apps with QOGNITIV in Paris including two live banking products — and a scanner app I built and shipped entirely on my own.',
    body: [
      'Budggy was full frontend ownership of a budgeting and shopping platform: Riverpod inside Clean Architecture, custom UI built with CustomPainter and custom clippers, and a reusable component library that cut the time on every feature after it. Architecture setup through to both store releases.',
      'With QOGNITIV in Paris I worked directly with the founding team across three to four Flutter apps, two of which are live fintech products — ORIZON Digital Bank Account on Android and iOS, and WiCash on Android. My scope was the full Figma-to-Flutter UI, the Clean Architecture foundation, the Riverpod state layer, and a share of the REST integrations on the two banking apps. Banking work has a lower tolerance for "mostly right" than anything else I have built.',
      'Alongside that I built and shipped Just QR Code entirely on my own — design, code, SQLite history, Google Safe Browsing link checks, CI/CD through GitHub Actions and Fastlane, and the Play Store release. Doing every part yourself is the fastest way to find out which parts you had been quietly relying on other people for.'
    ]
  },
  {
    id: 'now',
    period: 'Now',
    title: 'Where I am',
    summary:
      'Top Rated Plus on Upwork, Level 2 on Fiverr, 400+ Fiverr orders and 50+ Upwork contracts — and increasingly building with agentic tools rather than around them.',
    body: [
      'Across Upwork and Fiverr that is 400+ orders and 50+ contracts, Top Rated Plus, and a 65% repeat-client rate — which I care about more than the totals, because repeat clients are the only review that costs someone something.',
      'The newer shift is agentic coding. I built this portfolio with Google Antigravity, and I use Claude Code, Codex and Cursor day to day. The interesting part is not the speed. It is that the value moved: knowing what to build, how it should be structured, and what "good" actually looks like matters more now than typing throughput. The architecture habits from the last few years are exactly what makes the difference when directing an agent.',
      'What I want next is more of the same shape of problem — production apps where the architecture has to hold up, the UI has to match the design exactly, and someone is going to be maintaining it long after I have moved on.'
    ]
  }
];
