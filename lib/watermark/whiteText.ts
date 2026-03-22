import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'

export async function addWhiteTextLayer(
  pdfDoc: PDFDocument,
  text: string
): Promise<void> {
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pages = pdfDoc.getPages()

  for (const page of pages) {
    const { width, height } = page.getSize()

    const cols = 4
    const rows = 5
    const cellWidth  = width  / cols
    const cellHeight = height / rows

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        page.drawText(text, {
          x: cellWidth  * col + cellWidth  / 2 - 40,
          y: cellHeight * row + cellHeight / 2,
          size: 11,
          font,
          color: rgb(0, 0, 0),
          rotate: degrees(-18),
          opacity: 0,
          // opacity: 0 = completely invisible in PDF on ANY background
          // Word/Google Docs ignore opacity during conversion → text appears as black
        })
      }
    }
  }
}