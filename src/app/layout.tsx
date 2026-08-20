import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import BackgroundLayer from "@/components/three/BackgroundLayer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MotionProvider from "@/components/motion/MotionProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilal Ahmad - Senior Flutter Developer",
  description: "Senior Flutter Developer with 4+ years building production mobile apps — Clean Architecture, REST & GraphQL API integration, and custom Flutter animations. Comfortable across Riverpod, BLoC and Provider, and vibe coding with Claude Code, Codex, Antigravity and Cursor.",
  keywords: "Senior Flutter Developer, Flutter, Dart, Clean Architecture, Riverpod, BLoC, Cubit, GetX, Provider, REST API, GraphQL, PostgreSQL, Firebase, Supabase, MongoDB, vibe coding, Claude Code, Codex, Antigravity, Cursor",
  authors: [{ name: "Bilal Ahmad" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/*
          Resolves the theme before first paint, so the page never flashes the
          wrong one. It always stamps an explicit data-theme, which is why the
          stylesheet only has to describe two states rather than a third
          "unset" one that follows the OS.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('portfolio-theme');var d=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=d;}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-surface text-slate-800">
        {/* Depth stack, back to front: painted base, WebGL scene, content,
            then the two full-screen grade passes. */}
        <Background />
        <BackgroundLayer />
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />
          <main className="flex-grow">{children}</main>
        </MotionProvider>
        <div aria-hidden className="vignette" />
        <div aria-hidden className="film-grain" />
      </body>
    </html>
  );
}
