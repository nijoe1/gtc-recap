import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { logoSVG } from "./assets/logo";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gitcoin | Recap 2024",
  description: "Discover Your Gitcoin Impact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* Include other meta tags here */}</head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
          <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                {logoSVG}
                <span className="text-lg mt-2">
                  | <span className="font-bold">Recap 2024</span>
                </span>
              </Link>
            </div>
          </header>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
