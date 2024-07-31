'use client';
import type { Metadata } from "next";
import { Press_Start_2P } from 'next/font/google';
import "./globals.scss";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace', 'sans-serif'],
});

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const metadata: Metadata = {
  title: "Pokedex App",
  description: "A Next.js Pokedex application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexProvider client={convex}>
        <body className={pressStart2P.className}>
          {children}
        </body>
      </ConvexProvider>
    </html>
  );
}
