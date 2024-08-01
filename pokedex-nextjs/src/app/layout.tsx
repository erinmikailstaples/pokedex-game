import type { Metadata } from "next";
import { Press_Start_2P } from 'next/font/google';
import "./globals.scss";
import { ConvexClientProvider } from "./Convex.Client.Provider";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Pokedex App",
  description: "A Next.js Pokedex application",
  icons: {
    icon: '/pokeball.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClientProvider>
        <body className={pressStart2P.className}>{children}</body>
      </ConvexClientProvider>
    </html>
  );
}
