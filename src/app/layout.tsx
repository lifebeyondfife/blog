import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/constants";
import Script from "next/script";

const raleway = Raleway({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: [...SEO_CONFIG.defaultKeywords],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: SEO_CONFIG.openGraph.type,
    locale: SEO_CONFIG.openGraph.locale,
    url: SEO_CONFIG.openGraph.url,
    siteName: SEO_CONFIG.openGraph.siteName,
    images: SEO_CONFIG.openGraph.images.map(img => ({ ...img })),
  },
  metadataBase: new URL(SITE_CONFIG.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script
          src="//gc.zgo.at/count.js"
          data-goatcounter="https://lifebeyondfife.goatcounter.com/count"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
