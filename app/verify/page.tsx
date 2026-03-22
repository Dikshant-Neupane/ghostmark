'use client';

import { useState, useRef } from 'react';

interface VerifyResult {
  found: boolean;
  recipientName?: string;
  recipientEmail?: string;
  watermarkText?: string;
  originalFilename?: string;
  createdAt?: string;
}

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const handleVerify = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // For now, just show a message
      setError('Verify feature requires proper document parsing implementation');
      setIsLoading(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 30,
          color: 'var(--color-text-primary)',
        }}>
          Verify Document Origin
        </h1>

        <p style={{
          color: 'var(--color-text-secondary)',
          marginBottom: 30,
          lineHeight: 1.8,
        }}>
          Upload a document to check if it was watermarked and find out who it was sent to.
        </p>

        {/* File upload */}
        <div
          style={{
            border: '2px dashed var(--color-border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 20px',
            textAlign: 'center',
            marginBottom: 30,
            cursor: 'pointer',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
          
          {file ? (
            <div>
              <p style={{ color: 'var(--color-accent)', fontWeight: 600 }}>✓ {file.name}</p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 12, marginTop: 8 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                Drop your file here or click to select
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 12, marginTop: 8 }}>
                PDF, DOCX, or TXT
              </p>
            </div>
          )}
        </div>

        {error && (
          <div style={{
            padding: 16,
            backgroundColor: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 20,
            fontSize: 14,
          }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{
            padding: 16,
            backgroundColor: result.found ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            color: result.found ? 'var(--color-success)' : 'var(--color-warning)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 20,
          }}>
            {result.found ? (
              <div>
                <p style={{ fontWeight: 600, marginBottom: 12 }}>Document Found</p>
                <p><strong>Recipient:</strong> {result.recipientName}</p>
                <p><strong>Email:</strong> {result.recipientEmail}</p>
                <p><strong>Watermark:</strong> {result.watermarkText}</p>
                <p><strong>Date:</strong> {new Date(result.createdAt || '').toLocaleDateString()}</p>
              </div>
            ) : (
              <p>This document does not appear to be watermarked with GhostMark.</p>
            )}
          </div>
        )}

        {!isLoading && (
          <button
            onClick={handleVerify}
            disabled={!file}
            style={{
              width: '100%',
              background: file ? 'var(--gradient-accent)' : 'var(--color-border-light)',
              color: file ? 'white' : 'var(--color-text-muted)',
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: file ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            Check Document
          </button>
        )}

        {isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: 'var(--color-text-secondary)',
          }}>
            <p>Analyzing document...</p>
          </div>
        )}
      </div>
    </main>
  );
}
