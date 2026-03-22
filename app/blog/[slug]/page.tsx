import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface Post {
  title: string
  date: string
  content: string
}

const POSTS: Record<string, Post> = {
  'how-to-invisible-watermark-pdf': {
    title: 'How to Add an Invisible Watermark to a PDF (That Shows in Word & Google Docs)',
    date: '2025-03-22',
    content: `
Protecting confidential documents is harder than it sounds. A visible watermark can be cropped or removed.
But an invisible watermark — one that only appears after conversion — is a completely different level of protection.

## What is an invisible watermark?

An invisible watermark is text hidden inside a PDF in white color. Because the background is also white,
the text is completely invisible. But when a PDF-to-Word converter processes the file, it strips all text colors
and defaults everything to black. The hidden text suddenly appears across every page.

## How GhostMark works

GhostMark uses three layers simultaneously:

1. White tiled text — stamped across every page in a 4×5 grid, rotated -18 degrees
2. Zero-width Unicode characters — woven into the text stream, survive any format conversion
3. PDF metadata — watermark ID embedded in Author and Keywords fields

## Step by step

1. Go to watermarkpdf.vercel.app/protect
2. Upload your PDF (up to 25 MB)
3. Type your watermark message
4. Enter the recipient's name and email
5. Click "Generate protected document"
6. Download the protected PDF — it looks completely normal

## What happens when someone converts it?

Word and Google Docs strip text colors during PDF conversion.
The white watermark text becomes black and appears tiled across every page.

## Catching a leak

If the document appears online or is forwarded, upload it to the Verify tab.
GhostMark extracts the hidden watermark ID and tells you exactly who received the original copy.
    `,
  },
  'my-document-was-leaked': {
    title: 'My Confidential Document Was Leaked — How to Find Out Who Did It',
    date: '2025-03-22',
    content: `
Discovering that a confidential document has been leaked is alarming.
But if you used GhostMark before sending it, you already have everything you need to trace it.

## How document fingerprinting works

When you protect a document with GhostMark, a unique ID is embedded invisibly in three ways:
- As zero-width characters in the text stream
- As white tiled text that appears after conversion
- In the PDF metadata fields

Each recipient gets a different copy with a unique ID linked to their name and email.

## Tracing the leak

1. Go to watermarkpdf.vercel.app/verify
2. Upload the leaked document
3. GhostMark extracts the hidden ID
4. The registry returns: recipient name, email, date the document was sent

## What if the watermark was removed?

The Unicode fingerprint layer is extremely resilient. It survives:
- PDF to Word conversion
- Copy and paste of text
- Most editing tools

Only the white text layer is removed if someone converts and re-exports cleanly.
But the Unicode and metadata layers remain.

## Best practice

Always use per-recipient fingerprinting — a unique watermark ID for every person you send to.
This turns every copy into a unique evidence trail.
    `,
  },
}

interface PageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = POSTS[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', flex: 1 }}>
        {/* FIX: Use Link not <a> for internal navigation */}
        <Link
          href="/blog"
          style={{ fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none', display: 'inline-block', marginBottom: 32 }}
        >
          ← Back to blog
        </Link>

        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 8 }}>{post.date}</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 'normal', marginBottom: 32, lineHeight: 1.3 }}>
          {post.title}
        </h1>

        <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>

        <div style={{ marginTop: 48, padding: 24, background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-light)', borderRadius: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Try GhostMark free</p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
            Protect your next document with an invisible watermark in under 60 seconds.
          </p>
          <Link
            href="/protect"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--gradient-accent)',
              color: '#fff',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Protect a document →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
