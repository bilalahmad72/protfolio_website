/**
 * The tech stack, grouped the way it actually gets used on a project rather
 * than alphabetically.
 *
 * `brand` names a mark in `TechIcons.tsx`. Tools without a published brand mark
 * (Flutter state libraries, Cursor, Antigravity) fall back to `lucide`, so
 * every chip still carries an icon and the row never looks half-finished.
 */
export interface TechItem {
  name: string;
  brand?: string;
  lucide?:
    | 'layers'
    | 'waves'
    | 'blocks'
    | 'share'
    | 'zap'
    | 'webhook'
    | 'pointer'
    | 'rocket'
    | 'terminal';
}

export interface TechCategory {
  id: string;
  title: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    id: 'mobile-frontend',
    title: 'Mobile & Frontend',
    items: [
      { name: 'Flutter', brand: 'flutter' },
      { name: 'Dart', brand: 'dart' },
      { name: 'React', brand: 'react' },
      { name: 'Next.js', brand: 'nextdotjs' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
    ],
  },
  {
    id: 'architecture-state',
    title: 'Architecture & State Management',
    items: [
      { name: 'Clean Architecture', lucide: 'layers' },
      { name: 'Riverpod', lucide: 'waves' },
      { name: 'BLoC', lucide: 'blocks' },
      { name: 'Provider', lucide: 'share' },
      { name: 'GetX', lucide: 'zap' },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend, APIs & Databases',
    items: [
      { name: 'REST API', lucide: 'webhook' },
      { name: 'GraphQL', brand: 'graphql' },
      { name: 'Firebase', brand: 'firebase' },
      { name: 'Supabase', brand: 'supabase' },
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'MongoDB', brand: 'mongodb' },
    ],
  },
  {
    id: 'vibe-coding',
    title: 'AI & Vibe Coding',
    items: [
      { name: 'Claude Code', brand: 'claude' },
      { name: 'Codex', brand: 'openai' },
      { name: 'Antigravity', lucide: 'rocket' },
      { name: 'Cursor', lucide: 'pointer' },
    ],
  },
  {
    id: 'tools-workflow',
    title: 'Tools & Workflow',
    items: [
      { name: 'Git', brand: 'git' },
      { name: 'GitHub Actions', brand: 'githubactions' },
      { name: 'Fastlane', brand: 'fastlane' },
      { name: 'Figma', brand: 'figma' },
      { name: 'Postman', brand: 'postman' },
      { name: 'Notion', brand: 'notion' },
    ],
  },
];
