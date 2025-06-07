import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Hero from "@/components/custom/hero";
import ScrollToTopOnRouteChange from "@/components/custom/ScrollToTopOnRouteChange";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NordDev",
  description: "Vi på NordDev",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none min-h-screen flex flex-col h-full`}
      >
        <Analytics/>
        <SpeedInsights/>
        <ScrollToTopOnRouteChange />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
