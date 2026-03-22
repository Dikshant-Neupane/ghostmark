'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 24px', maxWidth: 840, margin: '0 auto' }}>
        
        <div style={{ 
          marginBottom: 24, padding: '6px 16px', borderRadius: 20, 
          background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-medium)',
          fontSize: 12, color: 'var(--color-text-secondary)'
        }}>
          Now with <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>V3 Architecture</span>
        </div>

        <h1 style={{ 
          fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1.1, marginBottom: 24,
          color: 'var(--color-text-primary)'
        }}>
          Invisible Watermarks for <br/>
          <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Confidential PDFs</span>
        </h1>

        <p style={{ fontSize: 18, color: 'var(--color-text-secondary)', maxWidth: 540, lineHeight: 1.6, marginBottom: 48 }}>
          Add a hidden tracking layer to your documents. Invisible in the PDF file, but instantly reveals the recipient&apos;s name when converted to Word or Google Docs.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link href="/protect" style={{
            padding: '14px 32px', borderRadius: 8,
            background: 'var(--gradient-accent)',
            color: '#fff', fontSize: 15, fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(196, 87, 42, 0.25)'
          }}>
            Protect a Document
          </Link>
          <Link href="/verify" style={{
            padding: '14px 32px', borderRadius: 8,
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-medium)',
            color: 'var(--color-text-primary)', fontSize: 15, fontWeight: 500,
            textDecoration: 'none'
          }}>
            Verify a Leak
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
