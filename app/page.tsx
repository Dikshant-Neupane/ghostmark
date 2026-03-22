'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        padding: '20px 40px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Ghost<span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Mark</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/protect">Protect</Link>
          <Link href="/verify">Verify</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px 40px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 700,
          marginBottom: 20,
          color: 'var(--color-text-primary)',
        }}>
          Invisible Watermark for PDF
        </h1>
        <p style={{
          fontSize: 18,
          color: 'var(--color-text-secondary)',
          marginBottom: 40,
          lineHeight: 1.8,
        }}>
          Add a watermark that stays <strong>hidden in PDFs</strong> but appears when converted to Word or Google Docs. Track who leaked your documents. Free forever.
        </p>
        <Link href="/protect">
          <button style={{
            background: 'var(--gradient-accent)',
            color: 'white',
            padding: '12px 32px',
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 'var(--radius-lg)',
          }}>
            Get Started →
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border-light)',
        color: 'var(--color-text-muted)',
        fontSize: 14,
      }}>
        <p>GhostMark • Invisible Watermark PDF • Files never leave your browser</p>
      </footer>
    </main>
  );
}
