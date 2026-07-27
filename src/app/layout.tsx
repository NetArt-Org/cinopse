import type { Metadata } from "next";
import "react-phone-number-input/style.css";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
