import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PflegeFinder - Pflegeheime in Deutschland finden",
  description:
    "Finden und vergleichen Sie Pflegeheime in ganz Deutschland. Filtern Sie nach Pflegeart, Stadt und Verfuegbarkeit.",
};

export const viewport: Viewport = {
  themeColor: "#3d7a5f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
