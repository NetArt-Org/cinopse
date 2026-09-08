import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { UtmCapture } from "@/components/layout/utm-capture";
import "react-phone-number-input/style.css";
import "./globals.css";

const META_PIXEL_ID = "2631145093984242";
const GA_MEASUREMENT_ID = "G-ZJ3GZPFTJQ";

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
      <head>
        {/* Warm up Razorpay connections so checkout opens fast at the last step. */}
        <link rel="preconnect" href="https://checkout.razorpay.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.razorpay.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />

        {/* Capture UTM / fbclid as early as possible (before hydration) and
            persist to BOTH localStorage and a first-party cookie, so paid-ad
            traffic in in-app browsers / across redirects doesn't lose it. */}
        <Script id="utm-capture-early" strategy="beforeInteractive">
          {`(function(){try{var p=new URLSearchParams(window.location.search);var m={utm_source:"custom_utm_source",utm_medium:"custom_utm_medium",utm_campaign:"custom_utm_campaign",utm_term:"custom_utm_term",utm_content:"custom_utm_content",fbclid:"custom_fbc_lid"};var o={},has=false;for(var k in m){var v=p.get(k);if(v){o[m[k]]=v.trim();has=true;}}if(has){var j=JSON.stringify(o);try{localStorage.setItem("cinopse:utm",j);}catch(e){}try{document.cookie="cinopse_utm="+encodeURIComponent(j)+";path=/;max-age=7776000;samesite=lax"+(location.protocol==="https:"?";secure":"");}catch(e){}}}catch(e){}})();`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        {/* End Google tag */}

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <UtmCapture />
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
