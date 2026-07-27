import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "react-phone-number-input/style.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "CiNOPSE India 2026",
  description: "CiNOPSE India 2026 multidisciplinary medical conference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
