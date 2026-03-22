'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { extractFromText } from '@/lib/verify/extractor'

interface VerifyResponse {
  found: boolean
  recipientName?: string
  recipientEmail?: string
  watermarkText?: string
  originalFilename?: string
  createdAt?: string
}

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerifyResponse | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initialize worker dynamically
    const initPdf = async () => {
      const pdfjs = await import('pdfjs-dist')
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    }
    initPdf()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setResult(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setError('')
      setResult(null)
    }
  }

  const handleVerify = async () => {
    if (!file) return

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfjsLib = await import('pdfjs-dist')
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const content = await page.getTextContent()
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
        fullText += pageText + '\n'
      }

      // Add metadata extraction directly here just in case pdfjsLib has it
      const metadata = await pdf.getMetadata()
      const metaString = JSON.stringify(metadata)

      const combinedSource = fullText + ' ' + metaString
      
      const extraction = extractFromText(combinedSource)

      if (!extraction.watermarkId) {
        setIsLoading(false)
        setResult({ found: false })
        return
      }

      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watermarkId: extraction.watermarkId }),
      })

      if (!res.ok) {
        throw new Error('Verification failed')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setError('An error occurred while verifying the file.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 -mt-16">
        <div className="w-full max-w-xl text-center mb-10">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-medium)] flex items-center justify-center text-[var(--color-accent)] mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 font-serif">
            Verify a document.
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Upload a suspicious PDF to trace its origin and find the recipient who leaked it.
          </p>

          {!file ? (
            <div
              className={`w-full border-2 border-dashed border-[var(--color-border-medium)] bg-[var(--color-bg-secondary)] rounded-xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-primary)]`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mb-4 text-[var(--color-text-muted)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                Drop suspicious PDF here
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                or click to browse local files
              </p>
              
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)] rounded-xl shadow-lg p-6 text-left">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--color-border-light)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[var(--color-bg-surface)] flex items-center justify-center text-[var(--color-text-secondary)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)] truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setFile(null)
                    setResult(null)
                    setError('')
                  }}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {!result ? (
                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-text-primary)] hover:bg-black text-[var(--color-bg-primary)] font-medium py-3 rounded-lg transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Extracting forensic layers...
                    </>
                  ) : (
                    'Run Verification Scan'
                  )}
                </button>
              ) : (
                <div className="mt-2 text-center animate-in zoom-in duration-300">
                  {result.found ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                        Match Found
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 text-left border border-[var(--color-border-light)] rounded-lg p-5">
                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Recipient Name</p>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{result.recipientName}</p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Recipient Email</p>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{result.recipientEmail}</p>
                        </div>
                        <div className="col-span-2 mt-2">
                          <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Original Watermark Text</p>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{result.watermarkText}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                        Clean Document
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        No GhostMark layers were detected in this file. It may be an original copy or have had layers successfully stripped.
                      </p>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      setFile(null)
                      setResult(null)
                      setError('')
                    }}
                    className="mt-6 w-full text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border-medium)] rounded-lg py-2 hover:bg-[var(--color-bg-primary)] transition-colors"
                  >
                    Verify Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}