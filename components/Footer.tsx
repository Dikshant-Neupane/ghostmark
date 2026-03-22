import Link from 'next/link'
import { LogoWordmark } from './Logo'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-light)',
        padding: '32px 24px',
        background: 'var(--color-bg-secondary)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <LogoWordmark />

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* Internal links — use Link */}
          <Link href="/blog" style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            Blog
          </Link>
          <Link href="/verify" style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            Verify
          </Link>

          {/* External links — use <a> */}
          <a
            href="https://github.com/Dikshant-Neupane/ghostmark/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            Contributing
          </a>
          <a
            href="https://github.com/Dikshant-Neupane/ghostmark/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            MIT License
          </a>
          <a
            href="https://github.com/Dikshant-Neupane/ghostmark"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none' }}
          >
            Open Source ↗
          </a>
        </div>

        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0 }}>
          Made with ♥ · Free forever
        </p>
      </div>
    </footer>
  )
}
