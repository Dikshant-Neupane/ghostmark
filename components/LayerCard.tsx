interface LayerCardProps {
  name: string
  description: string
  badge: string
  badgeStyle: { background: string; color: string }
  coverage: string
  enabled: boolean
  onToggle: () => void
}

export function LayerCard({ name, description, badge, badgeStyle, coverage, enabled, onToggle }: LayerCardProps) {
  return (
    <div style={{
      background: 'var(--color-bg-primary)',
      border: '1px solid var(--color-border-light)',
      borderRadius: 10, padding: '13px 14px', marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {name}
        </span>
        <span style={{
          fontSize: 9.5, fontWeight: 600,
          padding: '2px 7px', borderRadius: 20,
          whiteSpace: 'nowrap', flexShrink: 0,
          ...badgeStyle,
        }}>
          {badge}
        </span>
      </div>

      <p style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 10px' }}>
        {description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{coverage}</span>
        <button
          onClick={onToggle}
          aria-label={`Toggle ${name}`}
          style={{
            width: 32, height: 18, borderRadius: 9,
            background: enabled
              ? 'var(--gradient-accent)'
              : 'var(--color-border-medium)',
            border: 'none', cursor: 'pointer',
            position: 'relative', transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute',
            top: 2,
            left: enabled ? 'auto' : 2,
            right: enabled ? 2 : 'auto',
            width: 14, height: 14,
            borderRadius: '50%', background: '#fff',
            transition: 'all 0.2s',
            display: 'block',
          }} />
        </button>
      </div>
    </div>
  )
}