import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { PostHogProvider } from "./providers/PostHogProvider";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R2 - Habit Tracker",
  description: "Track your habits, one dot at a time. A minimalist approach to building better routines.",
  icons: {
    icon: "/caipora.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <PostHogProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <SignedIn>
                      <Navigation />
                    </SignedIn>
                    <div className="flex items-center gap-4">
                      <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </PostHogProvider>
        </body>
      </html>
    </Providers>
  );
}
