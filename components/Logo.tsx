interface LogoIconProps {
  size?: number
}

export function LogoIcon({ size = 30 }: LogoIconProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: 'linear-gradient(135deg, #C4572A 0%, #E8872A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 1.5C5.1 1.5 2.8 3.8 2.8 6.7v6.3l1.8-1.2 1.8 1.2 1.8-1.2 1.8 1.2 1.8-1.2 1.8 1.2V6.7C13.2 3.8 10.9 1.5 8 1.5z"
          fill="white"
          opacity="0.95"
        />
        <circle cx="5.8" cy="7" r="1.1" fill="#C4572A" />
        <circle cx="10.2" cy="7" r="1.1" fill="#C4572A" />
      </svg>
    </div>
  )
}

export function LogoWordmark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <LogoIcon />
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 17,
          fontWeight: 'normal',
          color: 'var(--color-text-primary)',
        }}
      >
        Ghost
        <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
          Mark
        </em>
      </span>
    </div>
  )
}
