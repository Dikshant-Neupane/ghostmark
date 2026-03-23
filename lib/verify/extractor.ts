import { decodeFingerprint } from '../watermark/unicodeFingerprint'

export interface ExtractionResult {
  watermarkId: string | null
  method: 'unicode' | 'metadata' | 'none'
}

function extractFromMetadata(text: string): string | null {
  // Pattern 1: "id:{uuid}" — written by metadata.ts into Keywords
  const match1 = text.match(
    /id:([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i
  )
  if (match1) return match1[1]

  // Pattern 2: "GhostMarkID:{uuid}" — written by unicodeFingerprint.ts
  const match2 = text.match(
    /GhostMarkID[:\s]+([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i
  )
  if (match2) return match2[1]

  return null
}

export function extractFromText(rawText: string): ExtractionResult {
  // Try unicode fingerprint first — most reliable
  const fromUnicode = decodeFingerprint(rawText)
  if (fromUnicode) {
    return { watermarkId: fromUnicode, method: 'unicode' }
  }

  // Fallback: look for metadata pattern written by metadata.ts
  const fromMeta = extractFromMetadata(rawText)
  if (fromMeta) {
    return { watermarkId: fromMeta, method: 'metadata' }
  }

  return { watermarkId: null, method: 'none' }
}