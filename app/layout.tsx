import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GhostMark — Invisible Watermark PDF | Hidden Watermark That Shows in Word & Google Docs',
  description: 'Add an invisible watermark to your PDF — hidden in PDF, visible in Word and Google Docs. Free. Secure. Files never leave your browser. Track who leaked your document.',
  keywords: 'watermark PDF, invisible watermark, hidden watermark, PDF protection, document tracking, leak detection',
  authors: [{ name: 'GhostMark' }],
  creator: 'GhostMark',
  openGraph: {
    title: 'GhostMark — Invisible Watermark PDF',
    description: 'Hidden in PDF. Revealed in Word & Google Docs. Free forever.',
    images: [
      {
        url: 'https://watermarkpdf.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GhostMark - Invisible Watermark PDF',
      },
    ],
    url: 'https://watermarkpdf.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostMark — Invisible Watermark PDF',
    description: 'Hidden in PDF. Revealed in Word & Google Docs.',
    images: ['https://watermarkpdf.vercel.app/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'GhostMark',
                url: 'https://watermarkpdf.vercel.app',
                description:
                  'Add an invisible watermark to your PDF that reveals when converted to Word or Google Docs.',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
            ]),
          }}
        />
      </head>
      <body>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
