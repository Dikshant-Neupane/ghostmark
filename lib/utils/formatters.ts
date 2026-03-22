export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
    hour:  '2-digit',
    minute:'2-digit',
  })
}
