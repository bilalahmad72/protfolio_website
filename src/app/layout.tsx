import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE, absoluteUrl } from "@/lib/site";
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
  // Without metadataBase, relative OG image paths cannot be resolved to the
  // absolute URLs that crawlers and share scrapers require.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.jobTitle}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} — ${SITE.jobTitle}`,
    title: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
    url: absoluteUrl('/'),
    locale: SITE.locale,
    images: [
      { url: SITE.ogImage, width: 1200, height: 630, alt: SITE.ogImageAlt },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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
