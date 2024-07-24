import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={`${inter.className} ${pressStart2P.variable}`}>
        {children}
      </body>
    </html>
  );
}
