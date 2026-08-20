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
  description: "Senior Flutter Developer specializing in Clean Architecture, Riverpod/BLoC state management, REST & GraphQL API integration, and PostgreSQL database design.",
  keywords: "Senior Flutter Developer, Flutter, Dart, Clean Architecture, Riverpod, BLoC, Cubit, GetX, Provider, REST API, GraphQL, PostgreSQL, Firebase",
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
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0B0F19] text-slate-200">
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
