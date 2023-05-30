import { Metadata } from 'next';
import '../styles/globals.css';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: 'YouTube Thumbnail Getter',
  applicationName: 'YouTube Thumbnail Getter',
  description: 'We can download Youtube video thumbnail image !',
  formatDetection: {
    telephone: false,
  },
  themeColor: '#e53e3e',
  manifest: `/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sekiya9311',
  },
  openGraph: {
    type: 'website',
    title: 'YouTube Thumbnail Getter',
    siteName: 'YouTube Thumbnail Getter',
    description: 'We can download Youtube video thumbnail image !',
    url: 'https://youtube-thumbnail-getter.sekiya9311.dev/',
  },
  alternates: {
    canonical: 'https://youtube-thumbnail-getter.sekiya9311.dev/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
