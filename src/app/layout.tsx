import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import Navigation from "@/components/global/Navigation";
import { Footer } from "@/components/global/Footer";
import PageTransition from "@/components/global/PageTransition";
import { CustomCursor } from "@/components/global/CustomCursor";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "Clyx Media — We Turn Organic Clips Into Scaled Ad Accounts",
  description:
    "CLYX Media runs the creator whitelisting + performance engine behind brands that sell — Meta & Google ads, content, branding, and websites built for one job: conversion.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://clyxmedia.com"),
  openGraph: {
    title: "Clyx Media",
    description:
      "Performance marketing · Creator ads · Web. We turn organic clips into scaled ad accounts.",
    type: "website",
    siteName: "Clyx Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clyx Media",
    description: "We turn organic clips into scaled ad accounts.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-[#000c22] text-[#FFFDF0] selection:bg-[#F5C400] selection:text-[#000c22]"
        style={{
          fontFamily: "var(--font-satoshi), system-ui, sans-serif",
        }}
      >
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          <div className="flex-1 flex flex-col pt-16 md:pt-20">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
