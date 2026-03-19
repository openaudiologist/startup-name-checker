import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Startup Name Checker — Free AI Tool",
  description:
    "AI-powered startup name checker. Get brand scores, domain suggestions, social handle availability, and alternative name ideas — all for free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", GeistSans.variable, GeistMono.variable)}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
