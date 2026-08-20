# bilalahmad72.com

Personal portfolio for Bilal Ahmad — Senior Flutter Developer. A statically
exported Next.js site with a three.js background layer and a token-driven design
system that ships in both a light and a dark theme.

**Live:** [bilalahmad72.com](https://bilalahmad72.com)

## Stack

| | |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5, React 19.2 |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion 12 |
| 3D | three.js 0.185 (raw WebGL renderer, hand-written GLSL) |
| Icons | lucide-react, plus brand marks inlined from Simple Icons |
| Output | `output: 'export'` — static HTML, no server runtime |

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

Other scripts: `npm run build` (static export into `out/`), `npm run start`,
`npm run lint`.

## Layout

```
src/
├── app/                  # Routes, root layout, global stylesheet, favicon
│   └── blog/[slug]/      # Statically generated article pages
├── components/
│   ├── sections/         # Page sections — Hero, Projects, Skills, Contact, …
│   ├── motion/           # Reveal, TiltCard, CountUp, ScrollProgress, …
│   ├── three/            # WebGL background and hero scene
│   └── icons/            # Social and brand SVGs
├── data/                 # Projects, skills, tech stack, testimonials, blog copy
├── hooks/                # useThreeCanvas, media queries, reduced-motion
└── lib/                  # Shared motion tokens and GLSL helpers
```

Content lives in `src/data/` — adding a project or a testimonial means editing a
typed array, not a component.

## Design system

Colour flows through CSS variables. `@theme` only ever points Tailwind's keys at
those variables, which is what makes the dark theme a re-declaration of about
twenty values rather than a second set of utilities: `text-slate-900` stays "the
strongest text colour" in both themes, and the grey ramp runs the other way in
the dark.

Two details worth knowing before changing colours:

- **Interactive fills use their own `--accent-fill` tokens.** The plain accent
  brightens in the dark so it stays readable *as text*, which is exactly what
  makes it a poor background for white text. The two roles are separate on
  purpose — don't collapse them back together.
- **Some surfaces are pinned dark in both themes.** Code blocks, media scrims and
  blog tiles carry white text, so they must not follow the theme.

The theme is resolved by an inline script in the root layout before first paint,
so there is no flash. It follows the OS preference until a visitor picks a side,
after which the choice is remembered in `localStorage`.

## 3D layer

`WebGLBackground` and `HeroScene` drive `three.js` directly through
`useThreeCanvas` — no react-three-fiber. Both canvases are transparent and sit
behind the content, and both respect `prefers-reduced-motion`.

The one non-obvious constraint: the canvas is created with `alpha: true`, so the
browser treats its output as **premultiplied**. Every shader premultiplies its
own RGB *after* the colourspace transfer (mirroring three's own chunk order) and
composites source-over. Blending additively here saturates the alpha channel
until the compositor clamps a washed-out frame — and on a light background,
adding light is invisible anyway.

## Deployment

Pushing to `main` triggers [the Pages workflow](.github/workflows/deploy.yml), which builds
the static export and publishes `out/` to GitHub Pages. The custom domain comes
from `public/CNAME`. The workflow can also be run manually via
`workflow_dispatch`.

## Notes for contributors

`AGENTS.md` applies to this repo: **this is not the Next.js you may know.** Check
the guides in `node_modules/next/dist/docs/` before writing code against an API
you remember from an earlier major version.
