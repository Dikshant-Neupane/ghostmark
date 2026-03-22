import { PDFDocument, PDFName, PDFString, PDFNumber, PDFArray, PDFDict } from 'pdf-lib'

const ZERO = '\u200B'
const ONE  = '\u200C'

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
  const firstPage = pdfDoc.getPages()[0]

  // Store as a hidden annotation — no font encoding, no crash
  const annotation = pdfDoc.context.obj({
    Type:     PDFName.of('Annot'),
    Subtype:  PDFName.of('Text'),
    Rect:     [0, 0, 0, 0],
    Contents: PDFString.of(encoded),
    F:        PDFNumber.of(2),
    NM:       PDFString.of(`ghostmark-${watermarkId}`),
  })

  const annotRef = pdfDoc.context.register(annotation)
  const pageDict = firstPage.node
  const annotsKey = PDFName.of('Annots')
  const existing = pageDict.lookupMaybe(annotsKey, PDFArray)

  if (existing) {
    existing.push(annotRef)
  } else {
    pageDict.set(annotsKey, pdfDoc.context.obj([annotRef]))
  }

  // Also write plain UUID to custom metadata field as fallback for Verify
  const infoRef = pdfDoc.context.trailerInfo.Info
  if (infoRef) {
    const infoDict = pdfDoc.context.lookup(infoRef, PDFDict)
    if (infoDict) {
      infoDict.set(PDFName.of('GhostMarkID'), PDFString.of(watermarkId))
    }
  }
}

export function decodeFingerprint(text: string): string | null {
  const hidden = text
    .split('')
    .filter(c => c === ZERO || c === ONE)
    .join('')

  if (hidden.length < 8) return null

  const binary = hidden.split('').map(c => c === ZERO ? '0' : '1').join('')
  const chars: string[] = []

  for (let i = 0; i + 8 <= binary.length; i += 8) {
    chars.push(String.fromCharCode(parseInt(binary.slice(i, i + 8), 2)))
  }

  const decoded = chars.join('')
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(decoded) ? decoded : null
}