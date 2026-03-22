// Main watermark function — runs all 3 layers in order

import { PDFDocument } from 'pdf-lib';
import { addWhiteTextLayer } from './whiteText';
import { addUnicodeFingerprint } from './unicodeFingerprint';
import { addMetadataLayer } from './metadata';
import { generateWatermarkId } from '../utils/uuid';

export interface WatermarkConfig {
  text: string;           // e.g. "CONFIDENTIAL"
  recipientName: string;
  recipientEmail: string;
}

export interface WatermarkResult {
  pdfBytes: Uint8Array;   // the protected PDF — ready to download
  watermarkId: string;    // unique ID — save this to database
}

export async function applyWatermark(
  fileBuffer: ArrayBuffer,  // the original PDF from the user's file
  config: WatermarkConfig
): Promise<WatermarkResult> {

  const watermarkId = generateWatermarkId();

  // Load the PDF — runs in browser, file never goes to server
  const pdfDoc = await PDFDocument.load(fileBuffer);

  // Run all 3 layers
  await addWhiteTextLayer(pdfDoc, config.text, watermarkId);
  await addUnicodeFingerprint(pdfDoc, watermarkId);
  await addMetadataLayer(pdfDoc, config, watermarkId);

  const pdfBytes = await pdfDoc.save();
  return { pdfBytes, watermarkId };
}
