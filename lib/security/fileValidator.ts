// Checks if the uploaded file is a real valid PDF
// Does THREE checks — not just the file extension

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export async function validatePDFFile(file: File): Promise<ValidationResult> {
  // Check 1 — File size must be under 25 MB
  const MAX_SIZE = 25 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File is too large. Maximum size is 25 MB.' };
  }

  // Check 2 — File must end in .pdf
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'Only PDF files are accepted.' };
  }

  // Check 3 — Magic bytes: first 4 bytes of a real PDF are always "%PDF"
  // Hex: 25 50 44 46
  const firstBytes = await file.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(firstBytes);
  const isPDF =
    bytes[0] === 0x25 && // %
    bytes[1] === 0x50 && // P
    bytes[2] === 0x44 && // D
    bytes[3] === 0x46;   // F

  if (!isPDF) {
    return { valid: false, error: 'This file does not appear to be a valid PDF.' };
  }

  return { valid: true };
}
