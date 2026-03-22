'use client';

import { useState, useRef } from 'react';
import { validatePDFFile } from '@/lib/security/fileValidator';
import { applyWatermark } from '@/lib/watermark/engine';
import { sanitizeText, sanitizeEmail } from '@/lib/security/sanitizer';

interface Step {
  id: number;
  label: string;
  duration: number;
}

const steps: Step[] = [
  { id: 1, label: 'Scanning file', duration: 1200 },
  { id: 2, label: 'Embedding layers', duration: 1800 },
  { id: 3, label: 'Fingerprinting', duration: 1400 },
  { id: 4, label: 'Done', duration: 900 },
];

const getProgressAfterStep = (step: number): number => {
  const progressMap: { [key: number]: number } = {
    1: 20,
    2: 55,
    3: 80,
    4: 100,
  };
  return progressMap[step] ?? 0;
};

export default function ProtectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    
    const result = await validatePDFFile(selectedFile);
    if (!result.valid) {
      setError(result.error || 'Invalid file');
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleProtect = async () => {
    if (!file || !watermarkText || !recipientName || !recipientEmail) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setCurrentStep(1);
    setProgress(0);

    try {
      const fileBuffer = await file.arrayBuffer();

      // Simulate steps
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        setCurrentStep(step.id);
        
        await new Promise(resolve => {
          setTimeout(() => {
            setProgress(getProgressAfterStep(step.id));
            resolve(null);
          }, step.duration);
        });
      }

      // Apply watermark
      const sanitizedText = sanitizeText(watermarkText, 60);
      const sanitizedName = sanitizeText(recipientName, 80);
      const sanitizedEmail = sanitizeEmail(recipientEmail);

      const { pdfBytes, watermarkId } = await applyWatermark(fileBuffer, {
        text: sanitizedText,
        recipientName: sanitizedName,
        recipientEmail: sanitizedEmail,
      });

      // Save to database
      const dbResponse = await fetch('/api/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          watermarkId,
          recipientName: sanitizedName,
          recipientEmail: sanitizedEmail,
          watermarkText: sanitizedText,
          filename: file.name,
        }),
      });

      if (!dbResponse.ok) {
        throw new Error('Failed to save watermark information');
      }

      // Download PDF
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      // Reset form
      setFile(null);
      setWatermarkText('');
      setRecipientName('');
      setRecipientEmail('');
      setIsLoading(false);
      setCurrentStep(0);
      setProgress(0);

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
          Protect Your PDF
        </h1>

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
            transition: 'all 0.2s ease',
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
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
                Drop your PDF here or click to select
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 12, marginTop: 8 }}>
                Maximum 25 MB
              </p>
            </div>
          )}
        </div>

        {/* Form fields */}
        {!isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                Watermark text (e.g., CONFIDENTIAL)
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="CONFIDENTIAL"
                maxLength={60}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-medium)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                Recipient name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="John Doe"
                maxLength={80}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-medium)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                Recipient email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="john@company.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-medium)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: 12,
                backgroundColor: 'var(--color-danger-bg)',
                color: 'var(--color-danger)',
                borderRadius: 'var(--radius-md)',
                fontSize: 14,
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleProtect}
              disabled={!file || !watermarkText || !recipientName || !recipientEmail}
              style={{
                background: file && watermarkText && recipientName && recipientEmail 
                  ? 'var(--gradient-accent)' 
                  : 'var(--color-border-light)',
                color: file && watermarkText && recipientName && recipientEmail 
                  ? 'white' 
                  : 'var(--color-text-muted)',
                padding: '12px 24px',
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                cursor: file && watermarkText && recipientName && recipientEmail 
                  ? 'pointer' 
                  : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              Generate Protected Document
            </button>
          </div>
        )}

        {/* Loading screen */}
        {isLoading && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ marginBottom: 30 }}>
              <p style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 8,
              }}>
                {steps.find(s => s.id === currentStep)?.label}
              </p>
              <div style={{
                width: '100%',
                height: 8,
                backgroundColor: 'var(--color-border-light)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: 'var(--gradient-accent)',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>

            {/* Step indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
            }}>
              {steps.map(step => (
                <div
                  key={step.id}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: currentStep > step.id
                      ? 'var(--color-accent)'
                      : currentStep === step.id
                      ? 'var(--color-accent)'
                      : 'var(--color-border-light)',
                    border: currentStep === step.id
                      ? '2px solid var(--color-accent)'
                      : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
