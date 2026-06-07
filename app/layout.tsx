import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crevia.netlify.app"),

  title: {
    default: "Crevia — AI-Powered Creator Operating System",
    template: "%s | Crevia",
  },

  description:
    "Manage ideas, track content workflows and generate AI-powered content from a single workspace. Built for creators, YouTubers and content professionals.",

  keywords: [
    "creator operating system",
    "content management",
    "content workflow",
    "AI content creation",
    "AI captions",
    "content planning",
    "creator tools",
    "YouTube creator tools",
    "Instagram creator tools",
    "content productivity",
    "creator dashboard",
    "Crevia",
  ],

  authors: [{ name: "Prashant Nath" }],
  creator: "Prashant Nath",
  publisher: "Crevia",

  openGraph: {
    title: "Crevia — AI-Powered Creator Operating System",
    description:
      "Manage ideas, track content workflows and generate AI-powered content from a single workspace.",
    url: "https://crevia.netlify.app",
    siteName: "Crevia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crevia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Crevia — AI-Powered Creator Operating System",
    description:
      "Manage ideas, track content workflows and generate AI-powered content from a single workspace.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
