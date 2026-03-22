import { decodeFingerprint } from '../watermark/unicodeFingerprint'

export function extractWatermarkId(text: string): string | null {
  return decodeFingerprint(text)
}
