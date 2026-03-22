'use client';

export default function BlogIndex() {
  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 30,
          color: 'var(--color-text-primary)',
        }}>
          Blog
        </h1>

        <div style={{
          display: 'grid',
          gap: 20,
        }}>
          <article style={{
            padding: 20,
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-light)',
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
              color: 'var(--color-text-primary)',
            }}>
              How to Watermark PDF with Invisible Text
            </h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 12,
              lineHeight: 1.6,
            }}>
              Learn how invisible watermarks work and why they appear when documents are converted to Word or Google Docs.
            </p>
            <a href="/blog/how-to-invisible-watermark-pdf" style={{
              color: 'var(--color-accent)',
              fontWeight: 500,
              textDecoration: 'underline',
            }}>
              Read more →
            </a>
          </article>

          <article style={{
            padding: 20,
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-light)',
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
              color: 'var(--color-text-primary)',
            }}>
              My Document Was Leaked - What Now?
            </h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 12,
              lineHeight: 1.6,
            }}>
              A step-by-step guide on how to use GhostMark to identify if your document was leaked and who leaked it.
            </p>
            <a href="/blog/my-document-was-leaked" style={{
              color: 'var(--color-accent)',
              fontWeight: 500,
              textDecoration: 'underline',
            }}>
              Read more →
            </a>
          </article>
        </div>
      </div>
    </main>
  );
}
