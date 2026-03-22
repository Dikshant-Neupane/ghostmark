import { formatDate } from '@/lib/utils/formatters'

interface VerifyResultProps {
  found: boolean
  recipientName?: string
  recipientEmail?: string
  watermarkText?: string
  originalFilename?: string
  createdAt?: string
}

export function VerifyResult({
  found,
  recipientName,
  recipientEmail,
  watermarkText,
  originalFilename,
  createdAt,
}: VerifyResultProps) {
  if (!found) {
    return (
      <div style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 12, padding: 24, textAlign: 'center',
      }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>
          No GhostMark watermark detected
        </p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          This document does not contain a GhostMark fingerprint, or the record has expired.
        </p>
      </div>
    )
  }

  const rows = [
    { label: 'Recipient name',  value: recipientName },
    { label: 'Recipient email', value: recipientEmail },
    { label: 'Watermark text',  value: watermarkText },
    { label: 'Original file',   value: originalFilename },
    { label: 'Protected on',    value: createdAt ? formatDate(createdAt) : undefined },
  ]

  return (
    <div style={{
      background: 'var(--color-bg-secondary)',
      border: '2px solid var(--color-accent)',
      borderRadius: 12, padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{
          background: 'var(--color-danger-bg)',
          color: 'var(--color-danger)',
          fontSize: 11, fontWeight: 700,
          padding: '3px 10px', borderRadius: 20,
        }}>
          Document traced
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map(row => row.value && (
            <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
              <td style={{ padding: '10px 0', fontSize: 12, color: 'var(--color-text-secondary)', width: 140 }}>
                {row.label}
              </td>
              <td style={{ padding: '10px 0', fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: row.label === 'Recipient email' ? 'var(--font-mono)' : 'inherit' }}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
