import { PDFDocument } from 'pdf-lib'
import { addWhiteTextLayer } from './whiteText'
import { addUnicodeFingerprint } from './unicodeFingerprint'
import { addMetadataLayer } from './metadata'
import { generateWatermarkId } from '../utils/uuid'

export interface WatermarkConfig {
  text: string
  recipientName: string
  recipientEmail: string
}

export interface WatermarkResult {
  pdfBytes: Uint8Array
  watermarkId: string
}

export async function applyWatermark(
  fileBuffer: ArrayBuffer,
  config: WatermarkConfig
): Promise<WatermarkResult> {
  const watermarkId = generateWatermarkId()
  const pdfDoc = await PDFDocument.load(fileBuffer)

  // Layer 1 — white tiled text (note: watermarkId not passed — not needed here)
  await addWhiteTextLayer(pdfDoc, config.text)

  // Layer 2 — zero-width unicode fingerprint
  await addUnicodeFingerprint(pdfDoc, watermarkId)

  // Layer 3 — PDF metadata
  await addMetadataLayer(pdfDoc, config, watermarkId)

  const pdfBytes = await pdfDoc.save()
  return { pdfBytes, watermarkId }
}
