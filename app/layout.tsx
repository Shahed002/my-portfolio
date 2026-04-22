import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shahedul.com"),
  title: "Shahedul | 3D Artist & Animator",
  description: "Portfolio of Shahedul, a skilled 3D artist specializing in 3D modeling, character design, environment creation, and animation.",
  openGraph: {
    title: "Shahedul | 3D Artist & Animator",
    description: "Portfolio of Shahedul, a skilled 3D artist specializing in 3D modeling, character design, environment creation, and animation.",
    url: "https://shahedul.com",
    siteName: "Shahedul Portfolio",
    images: [
      {
        url: "/project/card/assets.jpeg",
        width: 1200,
        height: 630,
        alt: "Shahedul 3D Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahedul | 3D Artist & Animator",
    description: "Portfolio of Shahedul, a skilled 3D artist specializing in 3D modeling, character design, environment creation, and animation.",
    images: ["/project/card/assets.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}