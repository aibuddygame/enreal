import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { T } from '../data.js'

// ── Typewriter phrases ──────────────────────────────────────
const PHRASES = [
    'scales business operations.',
    'augments your workforce.',
    'turns workflows into intelligence.',
]

const TYPING_MS = 72   // ms per char — calm, executive
const DELETING_MS = 36   // ms per char — slightly faster
const PAUSE_MS = 1500 // ms pause after full phrase

export default function Hero() {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing') // typing | paused | deleting
    const [phraseIdx, setPhraseIdx] = useState(0)
    const goRef = useRef()
    const tRef = useRef(null)

    goRef.current = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    useEffect(() => {
        const target = PHRASES[phraseIdx]
        let cancelled = false

        const schedule = (fn, delay) => {
            tRef.current = setTimeout(() => { if (!cancelled) fn() }, delay)
        }

        if (phase === 'typing') {
            if (display.length < target.length) {
                schedule(() => setDisplay(target.slice(0, display.length + 1)), TYPING_MS)
            } else {
                setPhase('paused')
            }
        }

        if (phase === 'paused') {
            schedule(() => setPhase('deleting'), PAUSE_MS)
        }

        if (phase === 'deleting') {
            if (display.length > 0) {
                schedule(() => setDisplay(d => d.slice(0, -1)), DELETING_MS)
            } else {
                schedule(() => {
                    setPhraseIdx(i => (i + 1) % PHRASES.length)
                    setPhase('typing')
                }, 220)
            }
        }

        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx])

    // Widest phrase used to reserve height/width so layout never shifts
    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b)

    return (
        <section id="hero" style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '8rem 5vw 5rem',
            position: 'relative',
            background: T.bg,
            overflow: 'hidden',
        }}>
            {/* Subtle radial glow */}
            <div aria-hidden style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -55%)',
                width: '80vw', height: '80vw', maxWidth: 900,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0) 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, width: '100%' }}>

                {/* Eyebrow */}
                <p className="f-mono" style={{
                    fontSize: '0.7rem', letterSpacing: '0.22em',
                    color: T.accent, marginBottom: '2.5rem', opacity: 0.85,
                }}>
                    ENREAL AI — HONG KONG
                </p>

                {/* Static headline line */}
                <h1 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                    letterSpacing: '-0.04em', lineHeight: 1.05,
                    color: T.text, marginBottom: '0.08em',
                }}>
                    The intelligence layer that
                </h1>

                {/* Dynamic typewriter line — stable height via invisible longest-phrase ghost */}
                <div style={{ position: 'relative' }}>
                    {/* Ghost element reserves width of longest phrase — invisible */}
                    <h1 aria-hidden style={{
                        fontFamily: 'Manrope, sans-serif', fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                        letterSpacing: '-0.04em', lineHeight: 1.08,
                        visibility: 'hidden', pointerEvents: 'none', userSelect: 'none',
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    }}>
                        {LONGEST}
                    </h1>
                    {/* Actual animated text — absolute on top of ghost */}
                    <h1 style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        fontFamily: 'Manrope, sans-serif', fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                        letterSpacing: '-0.04em', lineHeight: 1.08,
                        color: T.accent,
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    }}>
                        {display}
                        {/* Blinking cursor — always present */}
                        <span className="tw-cursor" style={{
                            display: 'inline-block',
                            width: '0.08em', height: '0.9em',
                            background: T.accent,
                            marginLeft: '0.05em',
                            verticalAlign: 'middle',
                            borderRadius: 1,
                        }} />
                    </h1>
                </div>

                {/* Subtext */}
                <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    color: T.muted, lineHeight: 1.75,
                    maxWidth: 480, margin: '2.75rem auto 3rem',
                }}>
                    AI-powered communication, ERP intelligence, and executive decision support — without increasing headcount.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
                    <button onClick={() => goRef.current('contact')} className="btn-mag" style={{
                        padding: '0.9rem 2rem', borderRadius: 999,
                        background: T.accent, border: 'none',
                        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff',
                        boxShadow: '0 4px 20px rgba(37,99,235,0.28)',
                    }}>
                        <span className="slide" style={{ background: T.accentD }} />
                        <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Book an AI Consultation <ArrowRight size={16} />
                        </span>
                    </button>

                    <button onClick={() => goRef.current('solutions')} className="btn-mag" style={{
                        padding: '0.9rem 2rem', borderRadius: 999,
                        background: 'transparent', border: `1px solid ${T.border}`,
                        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: T.muted,
                    }}>
                        <span className="slide" style={{ background: T.accentL }} />
                        <span className="label">See Capabilities</span>
                    </button>
                </div>
            </div>

            {/* Scroll cue */}
            <div style={{
                position: 'absolute', bottom: '2.5rem', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                opacity: 0.28, zIndex: 1,
            }}>
                <p className="f-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: T.text }}>SCROLL</p>
                <ChevronDown size={14} color={T.text} />
            </div>
        </section>
    )
}
