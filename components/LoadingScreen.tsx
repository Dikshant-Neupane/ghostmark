'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { label: 'Scanning file',    status: 'Scanning for threats and validating PDF…', pct: 20  },
  { label: 'Embedding layers', status: 'Weaving all 3 protection layers in…',      pct: 55  },
  { label: 'Fingerprinting',   status: 'Locking your recipient fingerprint…',       pct: 80  },
  { label: 'Done',             status: 'Your protected document is ready.',          pct: 100 },
]

const DURATIONS = [1200, 1800, 1400, 900]

interface LoadingScreenProps {
  watermarkText?: string
  onComplete: () => void
}

export function LoadingScreen({ watermarkText = 'CONFIDENTIAL', onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [barWidth, setBarWidth]       = useState(0)
  const [splashVisible, setSplashVisible] = useState(false)
  const [ringVisible, setRingVisible]     = useState(false)

  useEffect(() => {
    let idx = 0

    function runStep(): void {
      if (idx >= STEPS.length) {
        setTimeout(onComplete, 400)
        return
      }
      setCurrentStep(idx)
      setBarWidth(STEPS[idx].pct)

      if (idx === 1) {
        setTimeout(() => {
          setSplashVisible(true)
          setRingVisible(true)
        }, 850)
      }

      const duration = DURATIONS[idx]
      idx++
      setTimeout(runStep, duration)
    }

    setTimeout(runStep, 300)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--color-bg-primary)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '40px 24px',
    }}>
      <div className="noise" />

      {/* Ghost stamp background */}
      <div className="ghost-grid" style={{ position: 'fixed', zIndex: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="ghost-stamp">{watermarkText}</span>
        ))}
      </div>

      {/* Logo */}
      <div style={{
        position: 'relative', zIndex: 1, marginBottom: 48,
        fontFamily: 'var(--font-serif)', fontSize: 18,
        color: 'var(--color-text-primary)',
      }}>
        Ghost<em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Mark</em>
      </div>

      {/* Stamp arena */}
      <div style={{ position: 'relative', width: 220, height: 220, marginBottom: 48, zIndex: 1 }}>

        {/* Paper */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 160, height: 200,
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: '6px 14px 6px 6px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: 14, height: 14,
            background: 'var(--color-bg-primary)',
            borderLeft: '1px solid var(--color-border-medium)',
            borderBottom: '1px solid var(--color-border-medium)',
          }} />
          <div style={{ padding: '22px 14px 10px' }}>
            {[82, 65, 78, 55, 70, 60, 75, 50].map((w, i) => (
              <div key={i} style={{
                height: 4, background: 'var(--color-border-light)',
                borderRadius: 2, marginBottom: 6, width: `${w}%`,
                animation: `lineLoad 0.3s ease ${i * 0.05}s both`,
              }} />
            ))}
          </div>

          {splashVisible && (
            <div className="splash-in" style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 13, fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                textAlign: 'center', lineHeight: 1.6,
                transform: 'rotate(-15deg)',
                border: '2.5px solid var(--color-accent)',
                padding: '6px 10px', borderRadius: 4,
                opacity: 0.82,
              }}>
                {watermarkText}<br />DO NOT DISTRIBUTE
              </div>
            </div>
          )}
        </div>

        {/* Rubber stamp */}
        <div className="stamp-drop" style={{
          position: 'absolute', top: 0, left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: 90, zIndex: 10,
        }}>
          <div style={{
            width: 28, height: 44,
            background: 'linear-gradient(180deg, #8B4513 0%, #6B3410 100%)',
            borderRadius: '5px 5px 2px 2px', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', bottom: -6, left: -8,
              width: 44, height: 10, background: '#5A2D0C', borderRadius: 3,
            }} />
          </div>
          <div style={{
            width: 88, height: 22,
            background: 'linear-gradient(180deg, #5A2D0C 0%, #3D1F08 100%)',
            borderRadius: 4, marginTop: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontSize: 7, fontWeight: 800,
            letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)',
          }}>
            GHOSTMARK
          </div>
          <div style={{
            width: 88, height: 10,
            background: 'var(--gradient-accent)',
            borderRadius: '0 0 4px 4px',
          }} />
        </div>

        {ringVisible && (
          <div className="ring-pop" style={{
            position: 'absolute', bottom: 72, left: '50%',
            width: 100, height: 16, borderRadius: '50%',
            border: '2px solid rgba(196, 87, 42, 0.35)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Progress */}
      <div style={{ width: '100%', maxWidth: 360, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 5, flex: 1,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                border: `1.5px solid ${i <= currentStep ? 'var(--color-accent)' : 'var(--color-border-medium)'}`,
                background: i < currentStep ? 'var(--color-accent)' : 'var(--color-bg-primary)',
                boxShadow: i === currentStep ? '0 0 0 3px rgba(196,87,42,0.15)' : 'none',
                transition: 'all 0.3s',
              }} />
              <span style={{
                fontSize: 10, textAlign: 'center', whiteSpace: 'nowrap',
                color: i === currentStep
                  ? 'var(--color-text-primary)'
                  : i < currentStep ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontWeight: i === currentStep ? 600 : 400,
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          height: 5, background: 'var(--color-border-light)',
          borderRadius: 3, overflow: 'hidden', marginBottom: 14,
        }}>
          <div style={{
            height: '100%', borderRadius: 3,
            background: 'var(--gradient-accent)',
            width: `${barWidth}%`,
            transition: 'width 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>

        <p style={{
          textAlign: 'center', fontSize: 12,
          color: 'var(--color-text-secondary)', minHeight: 18, margin: 0,
        }}>
          {currentStep === STEPS.length - 1
            ? <strong style={{ color: 'var(--color-text-primary)' }}>{STEPS[currentStep].status}</strong>
            : STEPS[currentStep]?.status
          }
        </p>
      </div>
    </div>
  )
}