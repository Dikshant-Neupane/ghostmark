'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const faqs = [
  {
    q: 'Is the watermark visible in the PDF?',
    a: 'The watermark is very faint — a light gray diagonal grid. It looks like a professional document watermark and is nearly invisible at normal viewing. After conversion to Word or Google Docs it appears clearly.',
  },
  {
    q: 'Does it work with Google Docs?',
    a: 'Yes. The metadata fingerprint and Unicode annotation layers both survive Google Docs conversion. The visual grid also appears in most conversions.',
  },
  {
    q: 'Is my document stored on your servers?',
    a: 'No. All PDF processing happens entirely in your browser. Your file never leaves your device. Only the watermark ID and recipient info are saved to trace leaks.',
  },
  {
    q: 'How do I find out who leaked my document?',
    a: 'Go to the Verify tab, upload the leaked document, and GhostMark extracts the hidden watermark ID and shows you the name, email, and date of the original recipient.',
  },
  {
    q: 'Is GhostMark free?',
    a: 'Completely free. No account required. No ads. No limits.',
  },
  {
    q: 'Is GhostMark open source?',
    a: 'Yes. MIT license. Full source code at github.com/Dikshant-Neupane/ghostmark.',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>

        {/* ─── Hero ─── */}
        <section style={{ textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
          <div className="ghost-grid" style={{ opacity: 0.6 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="ghost-stamp">CONFIDENTIAL</span>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 'normal',
              color: 'var(--color-text-primary)', marginBottom: 16, lineHeight: 1.2,
            }}>
              Add an invisible watermark<br />to your PDF
            </h1>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 520, margin: '0 auto 32px' }}>
              Hidden in PDF. Reveals in Word &amp; Google Docs.<br />
              Track exactly who leaked your document. Free forever.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
              {['No upload to server', 'Files never leave browser', '3 protection layers', 'Free forever'].map(badge => (
                <span key={badge} style={{
                  fontSize: 12, color: 'var(--color-text-secondary)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ color: 'var(--color-success)', fontSize: 14 }}>✓</span>
                  {badge}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/protect" style={{
                padding: '12px 28px', background: 'var(--gradient-accent)',
                color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14,
                textDecoration: 'none',
              }}>
                Protect a document →
              </Link>
              <Link href="/verify" style={{
                padding: '12px 28px', border: '1px solid var(--color-border-medium)',
                color: 'var(--color-text-primary)', borderRadius: 8, fontSize: 14,
                textDecoration: 'none', background: 'var(--color-bg-secondary)',
              }}>
                Verify a document
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Stats bar ─── */}
        <section style={{
          borderTop: '1px solid var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)',
          padding: '20px 24px',
          background: 'var(--color-bg-secondary)',
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            {[
              { number: '0', label: 'Files stored on servers' },
              { number: '3', label: 'Protection layers' },
              { number: '100%', label: 'Client-side processing' },
              { number: '∞', label: 'Documents protected' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-accent)', fontFamily: 'var(--font-serif)' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section style={{ padding: '64px 24px', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 'normal', textAlign: 'center', marginBottom: 48 }}>
            How it works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { step: '1', title: 'Upload your PDF', desc: 'Drag and drop any PDF up to 25MB. Processed entirely in your browser.' },
              { step: '2', title: 'We hide the watermark', desc: 'Three invisible layers embedded: a faint tile grid, a Unicode fingerprint, and metadata marks.' },
              { step: '3', title: 'Catch the leak', desc: 'If someone converts it to Word or Docs, the watermark grid appears. Upload it to Verify to trace who sent it.' },
            ].map(item => (
              <div key={item.step} style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 12, padding: 24,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--gradient-accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, marginBottom: 14,
                }}>{item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 'normal', textAlign: 'center', marginBottom: 48 }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{
                border: '1px solid var(--color-border-light)',
                borderRadius: i === 0 ? '10px 10px 0 0' : i === faqs.length - 1 ? '0 0 10px 10px' : 0,
                background: 'var(--color-bg-secondary)',
                padding: '16px 20px',
              }}>
                <summary style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer', color: 'var(--color-text-primary)', listStyle: 'none' }}>
                  {faq.q}
                </summary>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginTop: 10, marginBottom: 0 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
