import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "learn.tncy.dev | Modern Yazılım, Web & Donanım Platformu",
  description:
    "Web geliştirme, Python, Gömülü C, FPGA ve SystemVerilog için modern, interaktif ve uygulamalı öğrenme merkezi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-base-100 text-base-content selection:bg-primary/20 selection:text-primary">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
