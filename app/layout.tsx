import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GhostMark — Invisible Watermark PDF | Hidden Watermark That Shows in Word & Google Docs',
  description: 'Add an invisible watermark to your PDF — hidden in PDF, visible in Word and Google Docs. Free. Secure. Files never leave your browser. Track who leaked your document.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://watermarkpdf.vercel.app'),
  openGraph: {
    title: 'GhostMark — Invisible Watermark PDF',
    description: 'Hidden in PDF. Revealed in Word & Google Docs. Free forever.',
    url: 'https://watermarkpdf.vercel.app',
    siteName: 'GhostMark',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostMark — Invisible Watermark PDF',
    description: 'Hidden in PDF. Revealed in Word & Google Docs. Free forever.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
