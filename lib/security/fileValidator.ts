export interface ValidationResult {
  valid: boolean
  error?: string
}

export async function validatePDFFile(file: File): Promise<ValidationResult> {
  // Check 1 — size under 25 MB
  const MAX_SIZE = 25 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File too large. Maximum size is 25 MB.' }
  }

  // Check 2 — extension
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'Only PDF files are accepted.' }
  }

  // Check 3 — magic bytes (%PDF = 0x25 0x50 0x44 0x46)
  const firstBytes = await file.slice(0, 4).arrayBuffer()
  const bytes = new Uint8Array(firstBytes)
  const isPDF =
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46

  if (!isPDF) {
    return { valid: false, error: 'This file does not appear to be a valid PDF.' }
  }

  return { valid: true }
}
