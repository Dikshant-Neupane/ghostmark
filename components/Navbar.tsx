'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoWordmark } from './Logo'

const NAV_ITEMS = [
  { label: 'Protect', href: '/protect' },
  { label: 'Verify',  href: '/verify'  },
  { label: 'Blog',    href: '/blog'    },
]

interface NavbarProps {
  githubStars?: number
}

export function Navbar({ githubStars = 0 }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: '1px solid var(--color-border-light)',
        background: 'rgba(251,247,240,0.94)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <LogoWordmark />
      </Link>

      {/* Nav tabs */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          background: 'var(--color-bg-surface)',
          borderRadius: 8,
          padding: 3,
        }}
      >
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: pathname === item.href ? 500 : 400,
              color: pathname === item.href
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
              background: pathname === item.href
                ? 'var(--color-bg-secondary)'
                : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
              boxShadow: pathname === item.href
                ? '0 1px 3px rgba(28,19,9,0.08)'
                : 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right — stars + GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {githubStars > 0 && (
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/Dikshant-Neupane/ghostmark'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid var(--color-border-medium)',
              background: 'var(--color-bg-secondary)',
            }}
          >
            <span>★</span>
            <span>{githubStars}</span>
          </a>
        )}
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/Dikshant-Neupane/ghostmark'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
