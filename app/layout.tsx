import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Hero from "@/components/custom/hero";
import ScrollToTopOnRouteChange from "@/components/custom/ScrollToTopOnRouteChange";
import { Analytics } from "@vercel/analytics/next"
import { ViewTransitions } from "next-view-transitions";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NordiskDev",
  description: "Vi på NordiskDev bygger moderna digitala lösningar.",
  openGraph: {
    title: "NordiskDev",
    description: "Vi på NordDev bygger moderna digitala lösningar.",
    url: "https://www.nordiskdev.se", 
    siteName: "NordDev",
    images: [
      {
        url: "https://www.norddev.se/nordiskdev.png", 
        width: 1200,
        height: 630,
        alt: "NordDev logotyp eller hero-bild",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NordiskDev",
    description: "Vi på NordiskDev bygger moderna digitala lösningar.",
    images: ["https://www.nordiskdev.se/nordiskdev.png"],
  },
};






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased select-none min-h-screen flex flex-col h-full`}
        >
          <Analytics/>
        <SpeedInsights/>
        <ScrollToTopOnRouteChange />
        <Navbar />
        <main className="grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </ViewTransitions>
  );
}
