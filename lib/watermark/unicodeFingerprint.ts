import { PDFDocument, rgb } from 'pdf-lib'

const ZERO = '\u0020'
const ONE  = '\u00A0'

function encodeId(id: string): string {
  return id
    .split('')
    .map(char => {
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0')
      return binary.split('').map(bit => bit === '0' ? ZERO : ONE).join('')
    })
    .join('')
}

export async function addUnicodeFingerprint(
  pdfDoc: PDFDocument,
  watermarkId: string
): Promise<void> {
  const encoded = encodeId(watermarkId)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const font = await pdfDoc.embedFont('Helvetica' as Parameters<typeof pdfDoc.embedFont>[0])

  firstPage.drawText(encoded, {
    x: 0,
    y: 0,
    size: 0.1,
    font,
    color: rgb(1, 1, 1),
    opacity: 0,
  })
}

export function decodeFingerprint(text: string): string | null {
  const hidden = text
    .split('')
    .filter(c => c === ZERO || c === ONE)
    .join('')

  if (hidden.length === 0) return null

  const binary = hidden.split('').map(c => c === ZERO ? '0' : '1').join('')
  const chars: string[] = []

  for (let i = 0; i + 8 <= binary.length; i += 8) {
    chars.push(String.fromCharCode(parseInt(binary.slice(i, i + 8), 2)))
  }

  const decoded = chars.join('')
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(decoded) ? decoded : null
}
