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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is the watermark visible in the PDF?",
                "acceptedAnswer": { "@type": "Answer", "text": "The watermark is very faint — a light gray diagonal grid. It looks like a professional document watermark and is nearly invisible at normal viewing. After conversion to Word or Google Docs it appears clearly." }
              },
              {
                "@type": "Question",
                "name": "Does it work with Google Docs?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. The metadata fingerprint and Unicode annotation layers both survive Google Docs conversion. The visual grid also appears in most conversions." }
              },
              {
                "@type": "Question",
                "name": "Is my document stored on your servers?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. All PDF processing happens entirely in your browser. Your file never leaves your device. Only the watermark ID and recipient info are saved to trace leaks." }
              },
              {
                "@type": "Question",
                "name": "How do I find out who leaked my document?",
                "acceptedAnswer": { "@type": "Answer", "text": "Go to the Verify tab, upload the leaked document, and GhostMark extracts the hidden watermark ID and shows you the name, email, and date of the original recipient." }
              },
              {
                "@type": "Question",
                "name": "Is GhostMark free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Completely free. No account required. No ads. No limits." }
              },
              {
                "@type": "Question",
                "name": "Is GhostMark open source?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. MIT license. Full source code at github.com/Dikshant-Neupane/ghostmark." }
              }
            ]
          })}}
        />
      </body>
    </html>
  )
}
