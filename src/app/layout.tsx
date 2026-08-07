import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
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
  metadataBase: new URL("https://www.cinopse.in"),
  title: {
    default: "CiNOPSE India 2026",
    template: "%s | CiNOPSE India 2026",
  },
  description:
    "CiNOPSE India 2026 is a multidisciplinary medical conference for cardio, renal, obesity, pulmonary and sleep medicine, taking place on Sunday, 27 September 2026 at Jawaharlal Nehru Planetarium, Bengaluru.",
  keywords: [
    "CiNOPSE India 2026",
    "medical conference Bengaluru",
    "cardio renal obesity pulmonary sleep medicine",
    "CME summit India",
    "Jawaharlal Nehru Planetarium Bengaluru",
  ],
  authors: [{ name: "CiNOPSE India" }],
  creator: "CiNOPSE India",
  publisher: "CiNOPSE India",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "CiNOPSE India 2026",
    description:
      "A multidisciplinary CME summit for cardio, renal, obesity, pulmonary and sleep medicine on Sunday, 27 September 2026 in Bengaluru.",
    url: "https://www.cinopse.in",
    siteName: "CiNOPSE India 2026",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "CiNOPSE India 2026 logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CiNOPSE India 2026",
    description:
      "A multidisciplinary CME summit on Sunday, 27 September 2026 at Jawaharlal Nehru Planetarium, Bengaluru.",
    images: ["/logo.jpg"],
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
      className={`h-full antialiased ${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
