import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Hero from "@/components/custom/hero";
import ScrollToTopOnRouteChange from "@/components/custom/ScrollToTopOnRouteChange";
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
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}

      >
        <SpeedInsights/>
        <ScrollToTopOnRouteChange />
        <Navbar />
        
        {children}
        {/* Footer */}
      <Footer/>
      </body>
     
    </html>
  );
}
