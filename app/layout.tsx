import type { Metadata } from "next";
import { Nunito_Sans, Inter } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home | Nation One Debt Relief",
  description: "Get debt relief and regain control of your finances. Free consultation, zero upfront fees. Pay up to 30% less than you owe.",
  keywords: "debt relief, debt settlement, credit card debt, medical bills, personal loans, debt consolidation",
  authors: [{ name: "Nation One Debt Relief" }],
  creator: "Nation One Debt Relief",
  publisher: "Nation One Debt Relief",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nationonedebtrelief.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nation One Debt Relief - Get Debt Free Today",
    description: "Professional debt relief services. Free consultation, zero upfront fees. Start your journey to financial freedom.",
    url: 'https://nationonedebtrelief.com',
    siteName: 'Nation One Debt Relief',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Nation One Debt Relief Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nation One Debt Relief - Get Debt Free Today",
    description: "Professional debt relief services. Free consultation, zero upfront fees.",
    images: ['/logo.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
