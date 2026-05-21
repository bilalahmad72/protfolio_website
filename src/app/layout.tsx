import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        <Background />
        <CustomCursor />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
