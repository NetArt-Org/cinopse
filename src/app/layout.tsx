import type { Metadata } from "next";
import "react-phone-number-input/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CINOPSE INDIA 2026",
  description: "CINOPSE INDIA 2026 event registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
