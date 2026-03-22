import { PDFDocument } from 'pdf-lib'

export interface MetadataConfig {
  text: string
  recipientName: string
  recipientEmail: string
}

export async function addMetadataLayer(
  pdfDoc: PDFDocument,
  config: MetadataConfig,
  watermarkId: string
): Promise<void> {
  pdfDoc.setAuthor(`GhostMark | Recipient: ${config.recipientName}`)
  pdfDoc.setSubject(`Watermarked — ID: ${watermarkId}`)
  pdfDoc.setKeywords([
    'ghostmark',
    `id:${watermarkId}`,
    `recipient:${config.recipientEmail}`,
    config.text,
  ])
  pdfDoc.setCreator('GhostMark — watermarkpdf.vercel.app')
  pdfDoc.setProducer('GhostMark v1.0.0')
}
