import { useState } from 'react'
import { T } from '../data.js'

export function MonoLabel({ children }) {
    return (
        <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            color: T.gold, letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: '1.25rem',
        }}>
      // {children}
        </p>
    )
}

export function SectionHeading({ children }) {
    return (
        <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.035em', lineHeight: 1.1,
            color: T.ivory, margin: 0,
        }}>
            {children}
        </h2>
    )
}

export function Gold({ children }) {
    return (
        <em style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic', color: T.gold, fontWeight: 700,
        }}>
            {children}
        </em>
    )
}

export function GoldBtn({ children, onClick, style = {} }) {
    const [hov, setHov] = useState(false)
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.6rem', borderRadius: '99px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                background: hov ? '#FAF8F5' : T.gold, color: '#0D0D12',
                border: 'none', cursor: 'pointer',
                transform: hov ? 'scale(1.03)' : 'scale(1)',
                boxShadow: hov ? '0 8px 28px rgba(201,168,76,0.3)' : '0 4px 14px rgba(201,168,76,0.15)',
                transition: 'all 0.28s cubic-bezier(0.25,0.46,0.45,0.94)',
                ...style,
            }}
        >
            {children}
        </button>
    )
}

export function GhostBtn({ children, onClick }) {
    const [hov, setHov] = useState(false)
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.6rem', borderRadius: '99px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                background: hov ? 'rgba(201,168,76,0.07)' : 'transparent',
                color: hov ? T.gold : T.muted,
                border: `1px solid ${hov ? T.borderH : 'rgba(250,248,245,0.18)'}`,
                cursor: 'pointer',
                transform: hov ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.28s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
        >
            {children}
        </button>
    )
}

export function Card({ children, className = '', hoverLift = true, style = {} }) {
    const [hov, setHov] = useState(false)
    return (
        <div
            className={className}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? 'rgba(201,168,76,0.04)' : T.surface,
                border: `1px solid ${hov ? T.borderH : T.border}`,
                borderRadius: '1.75rem',
                transition: 'all 0.3s ease',
                transform: hoverLift && hov ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hov ? '0 20px 50px rgba(201,168,76,0.07)' : 'none',
                ...style,
            }}
        >
            {children}
        </div>
    )
}
