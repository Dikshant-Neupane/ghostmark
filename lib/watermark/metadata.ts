// Layer 3 — writes watermark info into PDF metadata fields

import { PDFDocument } from 'pdf-lib';
import { WatermarkConfig } from './engine';

export async function addMetadataLayer(
  pdfDoc: PDFDocument,
  config: WatermarkConfig,
  watermarkId: string
): Promise<void> {
  pdfDoc.setAuthor(`GhostMark | Recipient: ${config.recipientName}`);
  pdfDoc.setSubject(`Watermarked — ID: ${watermarkId}`);
  pdfDoc.setKeywords([
    'ghostmark',
    `id:${watermarkId}`,
    `recipient:${config.recipientEmail}`,
    config.text,
  ]);
  pdfDoc.setCreator('GhostMark — watermarkpdf.vercel.app');
  pdfDoc.setProducer('GhostMark v1.0.0');
}
