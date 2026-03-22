// Layer 2 — hides watermark ID as invisible zero-width characters

// U+200B = Zero Width Space      = binary 0
// U+200C = Zero Width Non-Joiner = binary 1
const ZERO = '\u200B';
const ONE  = '\u200C';

// Convert watermark UUID to a string of invisible characters
function encodeId(id: string): string {
  return id
    .split('')
    .map(char => {
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
      return binary.split('').map(bit => bit === '0' ? ZERO : ONE).join('');
    })
    .join('');
}

import { PDFDocument } from 'pdf-lib';

export async function addUnicodeFingerprint(
  pdfDoc: PDFDocument,
  watermarkId: string
): Promise<void> {
  const encoded = encodeId(watermarkId);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Add encoded string as size-0.1 invisible text at corner of first page
  firstPage.drawText(encoded, {
    x: 0,
    y: 0,
    size: 0.1,
    color: { type: 'RGB', red: 1, green: 1, blue: 1 } as any,
    opacity: 0,
  });
}

// DECODE — used by the Verify feature to extract the watermark ID
export function decodeFingerprint(text: string): string | null {
  const hidden = text.split('').filter(c => c === ZERO || c === ONE).join('');
  if (hidden.length === 0) return null;

  const binary = hidden.split('').map(c => c === ZERO ? '0' : '1').join('');

  const chars = [];
  for (let i = 0; i + 8 <= binary.length; i += 8) {
    chars.push(String.fromCharCode(parseInt(binary.slice(i, i + 8), 2)));
  }

  const decoded = chars.join('');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(decoded) ? decoded : null;
}
