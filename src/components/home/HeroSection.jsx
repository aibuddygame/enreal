import { useEffect, useRef, useState } from 'react'
import { ArrowRight, LayoutGrid } from 'lucide-react'

const PHRASES = [
    'operations.',
    'reporting.',
    'marketing.',
    'customer service.',
    'software workflows.',
]

const TYPING_MS = 65
const DELETING_MS = 32
const PAUSE_MS = 1400

export default function HeroSection() {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing')
    const [phraseIdx, setPhraseIdx] = useState(0)
    const tRef = useRef(null)

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
                }, 200)
            }
        }
        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx])

    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b)

    const badges = ['Reliable', 'AI + Human', 'Agentic', 'Practical', 'Operational']

    return (
        <section id="hero" style={{
            minHeight: '100dvh',
            display: 'flex', alignItems: 'center',
            padding: '8rem 5vw 5rem',
            background: '#FFFFFF',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div aria-hidden style={{
                position: 'absolute', top: '40%', right: '-10%',
                width: '60vw', height: '60vw', maxWidth: 700,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0) 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                }} className="hero-grid">
                    {/* Left: Text */}
                    <div>
                        <p className="f-mono" style={{
                            fontSize: '0.7rem', letterSpacing: '0.2em',
                            color: '#2563EB', marginBottom: '1.5rem', textTransform: 'uppercase',
                        }}>
                            Enreal Lab — Hong Kong
                        </p>

                        <h1 style={{
                            fontFamily: 'Inter, sans-serif', fontWeight: 900,
                            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                            letterSpacing: '-0.03em', lineHeight: 1.08,
                            color: '#1C1C1E', marginBottom: '0.2em',
                        }}>
                            Your Reliable AI Workforce Partner
                        </h1>

                        {/* Typewriter */}
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <h2 aria-hidden style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 800,
                                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                                letterSpacing: '-0.02em', lineHeight: 1.15,
                                visibility: 'hidden', pointerEvents: 'none', userSelect: 'none',
                                whiteSpace: 'pre-wrap',
                            }}>
                                {LONGEST}
                            </h2>
                            <h2 style={{
                                position: 'absolute', top: 0, left: 0, right: 0,
                                fontFamily: 'Inter, sans-serif', fontWeight: 800,
                                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                                letterSpacing: '-0.02em', lineHeight: 1.15,
                                color: '#2563EB',
                                whiteSpace: 'pre-wrap',
                            }}>
                                {display}
                                <span className="tw-cursor" style={{
                                    display: 'inline-block', width: '0.06em', height: '0.85em',
                                    background: '#2563EB', marginLeft: '0.05em',
                                    verticalAlign: 'middle', borderRadius: 1,
                                }} />
                            </h2>
                        </div>

                        <p style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                            color: 'rgba(28,28,30,0.6)', lineHeight: 1.7,
                            maxWidth: 480, marginBottom: '2rem',
                        }}>
                            We help businesses deploy reliable AI employees across operations, reporting, marketing, customer service, administration, and software workflows.
                        </p>

                        {/* Badges */}
                        <div style={{
                            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                            marginBottom: '2.25rem',
                        }}>
                            {badges.map(b => (
                                <span key={b} style={{
                                    padding: '0.35rem 0.85rem', borderRadius: 999,
                                    background: 'rgba(37,99,235,0.06)',
                                    border: '1px solid rgba(37,99,235,0.12)',
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                                    fontWeight: 600, color: '#2563EB',
                                }}>{b}</span>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                            <button onClick={() => go('consultation')} className="btn-mag" style={{
                                padding: '0.9rem 1.8rem', borderRadius: 999,
                                background: '#2563EB', border: 'none',
                                fontFamily: 'Inter, sans-serif', fontSize: '0.88rem',
                                fontWeight: 700, color: '#fff',
                                boxShadow: '0 4px 20px rgba(37,99,235,0.28)',
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            }}>
                                <span className="slide" style={{ background: '#1D4ED8' }} />
                                <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    Book a Free Consultation <ArrowRight size={15} />
                                </span>
                            </button>
                            <button onClick={() => go('ai-workforce')} className="btn-mag" style={{
                                padding: '0.9rem 1.8rem', borderRadius: 999,
                                background: 'transparent', border: '1px solid rgba(28,28,30,0.12)',
                                fontFamily: 'Inter, sans-serif', fontSize: '0.88rem',
                                fontWeight: 500, color: 'rgba(28,28,30,0.6)',
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            }}>
                                <span className="slide" style={{ background: 'rgba(37,99,235,0.08)' }} />
                                <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <LayoutGrid size={15} /> Explore AI Employees
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Cover Image Placeholder */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }} className="hero-visual">
                        <div style={{
                            width: '100%', aspectRatio: '4/3',
                            borderRadius: '1.5rem',
                            background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #dbeafe 100%)',
                            border: '1px solid rgba(37,99,235,0.1)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Decorative elements */}
                            <div style={{
                                position: 'absolute', top: '10%', left: '10%',
                                width: 60, height: 60, borderRadius: '50%',
                                background: 'rgba(37,99,235,0.08)',
                            }} />
                            <div style={{
                                position: 'absolute', bottom: '15%', right: '12%',
                                width: 100, height: 100, borderRadius: '50%',
                                background: 'rgba(37,99,235,0.05)',
                            }} />
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                                    margin: '0 auto 1rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 32px rgba(37,99,235,0.25)',
                                }}>
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                                        <path d="M12 2a10 10 0 0 1 10 10" />
                                        <path d="M12 12l6 6" />
                                    </svg>
                                </div>
                                <p style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                                    fontWeight: 600, color: '#2563EB',
                                }}>
                                    AI Workforce Cover
                                </p>
                                <p style={{
                                    fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem',
                                    color: 'rgba(28,28,30,0.4)', marginTop: '0.25rem',
                                }}>
                                    Replace with your cover image
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr !important; }
                    .hero-visual { order: -1; max-width: 400px; margin: 0 auto; }
                }
            `}</style>
        </section>
    )
}
