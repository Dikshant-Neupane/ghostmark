// Layer 1 — adds invisible white text in a 4x5 grid on every page

import { PDFDocument, rgb, degrees } from 'pdf-lib';

export async function addWhiteTextLayer(
  pdfDoc: PDFDocument,
  text: string,
  watermarkId: string
): Promise<void> {
  const font = await pdfDoc.embedFont('Helvetica-Bold' as any);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();

    const cols = 4;
    const rows = 5;
    const cellWidth  = width  / cols;
    const cellHeight = height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = cellWidth  * col + cellWidth  / 2 - 40;
        const y = cellHeight * row + cellHeight / 2;

        page.drawText(text, {
          x,
          y,
          size: 11,
          font,
          color: rgb(1, 1, 1), // WHITE — invisible on white background
          rotate: degrees(-18),
          opacity: 1,
        });
      }
    }
  }
}
