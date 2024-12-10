import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { logoSVG } from "./assets/logo";
import { Toaster } from "@/components/ui/toaster";
import GlobalHead from "@/components/globalHeader";

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
      <GlobalHead />
      <body>
        <div className="min-h-screen bg-[#F5F4FE]">
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
