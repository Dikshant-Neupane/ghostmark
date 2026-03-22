import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const POSTS = [
  {
    slug: 'how-to-invisible-watermark-pdf',
    title: 'How to Add an Invisible Watermark to a PDF (That Shows in Word & Google Docs)',
    description: 'A step-by-step guide to protecting your documents with invisible watermarks.',
    date: '2025-03-22',
  },
  {
    slug: 'my-document-was-leaked',
    title: 'My Confidential Document Was Leaked — How to Find Out Who Did It',
    description: 'How to use document fingerprinting to trace the source of a leak.',
    date: '2025-03-22',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 'normal', marginBottom: 8 }}>
          Blog
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 40 }}>
          Guides on document security, invisible watermarking, and leak detection.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {POSTS.map(post => (
            <div
              key={post.slug}
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 12, padding: 24,
              }}
            >
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 8 }}>{post.date}</p>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                {/* FIX: Use Link not <a> for internal navigation */}
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  {post.title}
                </Link>
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{ fontSize: 12, color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
