'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { LoadingScreen } from '@/components/LoadingScreen'
import { applyWatermark } from '@/lib/watermark/engine'
import { LayerCard } from '@/components/LayerCard'

export default function ProtectPage() {
  const [file, setFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const [layer1, setLayer1] = useState(true)
  const [layer2, setLayer2] = useState(true)
  const [layer3, setLayer3] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setDownloadUrl(null)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setDownloadUrl(null)
    }
  }

  const handleGenerate = async () => {
    if (!file) return
    setIsProcessing(true)
  }

  const processFile = async () => {
    if (!file) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await applyWatermark(arrayBuffer, {
        text: watermarkText,
        recipientName: recipientName || 'Unknown',
        recipientEmail: recipientEmail || 'unknown@domain.com',
      })

      const blob = new Blob([result.pdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    } catch (err) {
      console.error('Watermarking failed:', err)
      alert('Failed to watermark PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  let currentStepIndex = 0
  if (file) currentStepIndex = 1
  if (downloadUrl) currentStepIndex = 2

  return (
    <>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 24px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 900, width: '100%', background: 'var(--color-bg-secondary)', borderRadius: 12, border: '1px solid var(--color-border-medium)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          {downloadUrl ? (
            <div style={{ padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-serif)', marginBottom: 8, color: 'var(--color-text-primary)' }}>Protected & Ready!</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>Your invisible watermark has been embedded successfully.</p>
              
              <a
                href={downloadUrl}
                download={`protected_${file?.name || 'document.pdf'}`}
                style={{ display: 'inline-block', background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}
              >
                Download PDF
              </a>
              <br />
              <button
                onClick={() => { setFile(null); setDownloadUrl(null) }}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', textDecoration: 'underline', cursor: 'pointer', fontSize: 13 }}
              >
                Protect another document
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 268px', minHeight: 540 }}>
              {/* Left panel */}
              <div style={{ padding: '28px 28px 24px', borderRight: '1px solid var(--color-border-light)' }}>
                
                {/* Three-step progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
                  {['Upload', 'Configure', 'Download'].map((label, i) => (
                    <React.Fragment key={label}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%',
                          fontSize: 11, fontWeight: 600,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: i < currentStepIndex
                            ? 'var(--color-accent)'
                            : i === currentStepIndex
                              ? 'var(--color-text-primary)'
                              : 'var(--color-bg-surface)',
                          color: i <= currentStepIndex ? '#fff' : 'var(--color-text-muted)',
                          border: i < currentStepIndex ? 'none' : `1.5px solid ${i === currentStepIndex ? 'var(--color-text-primary)' : 'var(--color-border-medium)'}`,
                        }}>
                          {i < currentStepIndex ? '✓' : i + 1}
                        </div>
                        <span style={{
                          fontSize: 12,
                          fontWeight: i === currentStepIndex ? 500 : 400,
                          color: i === currentStepIndex
                            ? 'var(--color-text-primary)'
                            : i < currentStepIndex
                              ? 'var(--color-accent)'
                              : 'var(--color-text-muted)',
                        }}>
                          {label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div style={{
                          width: 32, height: 1,
                          background: i < currentStepIndex ? 'var(--color-accent)' : 'var(--color-border-light)',
                          margin: '0 8px', opacity: i < currentStepIndex ? 0.4 : 1,
                        }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `1.5px dashed ${isDragging ? 'var(--color-accent)' : 'var(--color-border-medium)'}`,
                    borderRadius: 12,
                    padding: '28px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isDragging ? '#FFF8F4' : 'var(--color-bg-secondary)',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: 22,
                  }}
                >
                  {/* Ghost stamp grid — faint tiled CONFIDENTIAL background */}
                  <div className="ghost-grid">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i} className="ghost-stamp">CONFIDENTIAL</span>
                    ))}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {file ? (
                      <>
                        <div style={{ width: 40, height: 48, margin: '0 auto 12px', position: 'relative' }}>
                          <div style={{ width: 36, height: 44, border: '1.5px solid var(--color-border-medium)', borderRadius: '4px 10px 4px 4px', background: 'var(--color-bg-secondary)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, background: 'var(--color-bg-primary)', borderLeft: '1.5px solid var(--color-border-medium)', borderBottom: '1.5px solid var(--color-border-medium)' }} />
                          </div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 6 }}>
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-success)', fontWeight: 500 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
                          Scanned · No threats found
                        </div>
                        <span style={{ display: 'block', fontSize: 11, color: 'var(--color-accent)', marginTop: 6, cursor: 'pointer' }}>
                          Change file
                        </span>
                      </>
                    ) : (
                      <>
                        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
                          <rect x="1" y="1" width="34" height="42" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-border-medium)" strokeWidth="1.5"/>
                          <path d="M26 1v10h10" stroke="var(--color-border-medium)" strokeWidth="1.5"/>
                          <path d="M20 16v16M14 26l6-6 6 6" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                          Drop PDF here
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                          or click to browse local files
                        </div>
                      </>
                    )}
                  </div>
                  <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Watermark text</label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border-medium)', borderRadius: 6, background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                      placeholder="CONFIDENTIAL"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Recipient name</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border-medium)', borderRadius: 6, background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                        placeholder="Optional"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Recipient email</label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border-medium)', borderRadius: 6, background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!file || isProcessing}
                  style={{
                    marginTop: 22, width: '100%', padding: 12,
                    border: 'none', borderRadius: 10,
                    background: file && !isProcessing
                      ? 'var(--gradient-accent)'
                      : 'var(--color-border-medium)',
                    color: '#fff', fontSize: 14, fontWeight: 600,
                    fontFamily: 'inherit', cursor: file ? 'pointer' : 'not-allowed',
                    transition: 'opacity 0.15s, transform 0.1s',
                    opacity: file && !isProcessing ? 1 : 0.6,
                  }}
                >
                  {isProcessing ? 'Processing…' : 'Generate protected document →'}
                </button>
              </div>

              {/* Right sidebar */}
              <div style={{ padding: '20px 16px', background: 'var(--color-bg-secondary)' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                  Protection layers
                </p>

                <LayerCard
                  name="White tile stamp"
                  description="Invisible tiled grid on every page. Reveals when converted to Word or Google Docs."
                  badge="Word · Docs"
                  badgeStyle={{ background: '#FDF0EA', color: '#A8431C' }}
                  coverage="MS Word ✓  LibreOffice ✓"
                  enabled={layer1}
                  onToggle={() => setLayer1(!layer1)}
                />

                <LayerCard
                  name="Unicode fingerprint"
                  description="Zero-width characters in text stream. Survives every format conversion."
                  badge="All platforms"
                  badgeStyle={{ background: '#EBF4EE', color: '#2D5A3D' }}
                  coverage="Google Docs ✓  Email ✓"
                  enabled={layer2}
                  onToggle={() => setLayer2(!layer2)}
                />

                <LayerCard
                  name="Metadata mark"
                  description="Watermark ID written to PDF Author & Keywords. Visible in File → Properties."
                  badge="Universal"
                  badgeStyle={{ background: '#FDF5E6', color: '#8A6000' }}
                  coverage="Any PDF viewer ✓"
                  enabled={layer3}
                  onToggle={() => setLayer3(!layer3)}
                />

                <div style={{ marginTop: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      Protection strength
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent)' }}>
                      {[layer1, layer2, layer3].filter(Boolean).length === 3
                        ? 'Maximum'
                        : [layer1, layer2, layer3].filter(Boolean).length === 2
                          ? 'Strong'
                          : [layer1, layer2, layer3].filter(Boolean).length === 1
                            ? 'Basic'
                            : 'None'
                      }
                    </span>
                  </div>
                  <div style={{ height: 5, background: 'var(--color-border-light)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      background: 'var(--gradient-accent)',
                      width: `${([layer1, layer2, layer3].filter(Boolean).length / 3) * 100}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>

                <div style={{ height: 1, background: 'var(--color-border-light)', margin: '18px 0' }} />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      After conversion preview
                    </span>
                  </div>
                  <div style={{
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 7,
                    background: 'var(--color-bg-secondary)',
                    height: 104,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, padding: '10px 14px' }}>
                      {[82, 67, 75, 58, 80, 62].map((w, i) => (
                        <div key={i} style={{ height: 4, background: 'var(--color-border-light)', borderRadius: 2, marginBottom: 5, width: `${w}%` }} />
                      ))}
                    </div>
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'repeat(4, 1fr)',
                      padding: 4,
                    }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 6.5, fontWeight: 800, letterSpacing: '0.05em',
                          color: 'var(--color-accent)', opacity: 0.22,
                          transform: 'rotate(-18deg)', whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-serif)',
                        }}>
                          CONFIDENTIAL
                        </div>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 6 }}>
                    Hidden in PDF · Revealed in Word / Docs
                  </p>
                </div>

                <div style={{ height: 1, background: 'var(--color-border-light)', margin: '18px 0' }} />

                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  background: 'var(--color-warning-bg)', border: '1px solid #EDD89C',
                  borderRadius: 8, padding: '10px 12px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="8" cy="8" r="6.5" stroke="#8A6000" strokeWidth="1"/>
                    <path d="M8 7v4M8 5.5v.5" stroke="#8A6000" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <p style={{ fontSize: 11, color: '#6E4E00', lineHeight: 1.45, margin: 0 }}>
                    Suspect a leak?{' '}
                    <Link href="/verify" style={{ color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>
                      Use Verify
                    </Link>
                    {' '}to trace who received the original copy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isProcessing && (
        <LoadingScreen
          watermarkText={watermarkText}
          onComplete={processFile}
        />
      )}
    </>
  )
}