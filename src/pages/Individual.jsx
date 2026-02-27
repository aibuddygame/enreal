import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Code2, Network, Cpu } from 'lucide-react'
import IndividualNavbar from '../components/IndividualNavbar.jsx'
import Footer from '../components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

// Minimal Light/Grey Preset
const T = {
    bg: '#FFFFFF',
    surface: '#F5F5F7',
    text: '#0B0B0C',
    muted: '#52525B',
    border: 'rgba(0,0,0,0.08)',
}

// ── DATA ─────────────────────────────────────────────────────────

const CAPABILITIES = [
    {
        icon: Network,
        title: 'Enterprise Brain Construction',
        desc: 'Build Knowledge AI and Agent systems. Connect unstructured data to reasoning engines.'
    },
    {
        icon: Code2,
        title: 'Automation Infrastructure',
        desc: 'Engineer workflow orchestration. Extract, route, and execute tasks across disconnected tools.'
    },
    {
        icon: Cpu,
        title: 'Data Decision Layer',
        desc: 'Deploy analytics pipelines that turn raw inputs into executive-level insight autonomously.'
    }
]

const OUTCOMES = [
    'Build operational AI agents from scratch',
    'Automate real, multi-step business workflows',
    'Integrate multi-tool systems via API',
    'Deliver working MVP solutions to stakeholders',
    'Present execution outcomes with technical authority'
]

const CURRICULUM = [
    {
        phase: 'PHASE 1',
        title: 'AI System Construction & Tool Execution',
        topics: ['Knowledge AI Architecture', 'Visual Pipeline Engineering', 'Automation Workflows', 'Data Integration & Sync']
    },
    {
        phase: 'PHASE 2',
        title: 'Business Logic & Executive Thinking',
        topics: ['Monetization & ROI Logic', 'Project Roadmap Design', 'Execution Governance', 'Final MVP Presentation']
    }
]

// ── PAGE COMPONENT ───────────────────────────────────────────────

export default function IndividualPage() {
    const mainRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.config({ nullTargetWarn: false })

            // Hero Entrance
            gsap.from('.h-rev', {
                y: 30, opacity: 0,
                duration: 1.2, stagger: 0.08,
                ease: 'power3.out', delay: 0.2
            })

            // Sections Fade
            gsap.utils.toArray('.sec-rev').forEach(sec => {
                gsap.from(sec, {
                    scrollTrigger: { trigger: sec, start: 'top 85%' },
                    y: 30, opacity: 0,
                    duration: 1, ease: 'power3.out'
                })
            })

            // Staggers
            gsap.utils.toArray('.stag-grid').forEach(grid => {
                gsap.from(grid.children, {
                    scrollTrigger: { trigger: grid, start: 'top 85%' },
                    y: 20, opacity: 0,
                    duration: 0.8, stagger: 0.1,
                    ease: 'power2.out'
                })
            })

        }, mainRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={mainRef} style={{ background: T.bg, color: T.text, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <IndividualNavbar />

            {/* Subtle Gradient Atmosphere */}
            <div style={{
                position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
                width: '80vw', height: '60vh', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.03) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <main>
                    <Hero />
                    <TheShift />
                    <Architecture />
                    <LearningOutcomes />
                    <CurriculumOverview />
                    <ForWho />
                    <Philosophy />
                    <Contact />
                </main>
                <Footer
                    navLinks={[
                        { label: 'Program', id: 'program' },
                        { label: 'Outcomes', id: 'outcomes' },
                        { label: 'Curriculum', id: 'curriculum' },
                        { label: 'For Who', id: 'for-who' },
                        { label: 'FAQ', id: 'faq' }
                    ]}
                    brandText="The intelligence layer for professionals entering an AI-native economy."
                    accentColor="#059669"
                />
            </div>
        </div>
    )
}

// ── SECTIONS ─────────────────────────────────────────────────────

const TYPING_MS = 60
const DELETING_MS = 30
const PAUSE_MS = 1500

const PHRASES = [
    'Your role must evolve.',
    'Execution now requires intelligence.',
    'Architecture is the new advantage.'
]

function Hero() {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing') // typing | paused | deleting
    const [phraseIdx, setPhraseIdx] = useState(0)
    const tRef = useRef(null)

    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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

    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b)

    return (
        <section id="hero" style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', position: 'relative' }}>
            <div style={{ maxWidth: 900, marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>

                {/* Eyebrow */}
                <p className="h-rev" style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.22em',
                    color: '#059669', marginBottom: '2.5rem', opacity: 0.85, textTransform: 'uppercase'
                }}>
                    ENREAL AI — HONG KONG
                </p>

                <h1 className="h-rev" style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                    letterSpacing: '-0.04em', lineHeight: 1.05,
                    marginBottom: '0.08em',
                }}>
                    Work is evolving.<br />

                    {/* Dynamic typewriter line */}
                    <div style={{ position: 'relative' }}>
                        <h1 aria-hidden style={{
                            fontFamily: 'Inter, sans-serif', fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                            letterSpacing: '-0.04em', lineHeight: 1.05,
                            visibility: 'hidden', pointerEvents: 'none', userSelect: 'none',
                        }}>
                            {LONGEST}
                        </h1>
                        <h1 style={{
                            position: 'absolute', top: 0, left: 0, right: 0,
                            fontFamily: 'Inter, sans-serif', fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                            letterSpacing: '-0.04em', lineHeight: 1.05,
                            color: '#059669',
                        }}>
                            {display}
                            <span style={{
                                display: 'inline-block',
                                width: '0.08em', height: '0.9em',
                                background: '#059669',
                                marginLeft: '0.05em',
                                verticalAlign: 'middle',
                                borderRadius: 1
                            }} />
                        </h1>
                    </div>
                </h1>
                <p className="h-rev" style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    color: T.muted, lineHeight: 1.75, maxWidth: 500, margin: '2.75rem auto 3rem'
                }}>
                    The intelligence layer for professionals entering an AI-native economy.
                </p>

                <div className="h-rev" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => go('contact')} style={{
                        background: T.text, color: T.bg, padding: '1rem 2rem', border: 'none',
                        borderRadius: 999, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Join Updates <ArrowRight size={16} />
                    </button>
                    <button onClick={() => go('program')} style={{
                        background: 'transparent', color: T.text, padding: '1rem 1.5rem', border: `1px solid ${T.border}`,
                        borderRadius: 999, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        Explore Program
                    </button>
                </div>
            </div>
        </section>
    )
}

function TheShift() {
    return (
        <section className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// THE SHIFT</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                    AI evolution anxiety. Career displacement fear. Skill irrelevance. <br />
                    The market is shifting rapidly.
                </p>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    Most people learn tools.<br />
                    <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: T.muted }}>Few learn systems.</span>
                </h2>
            </div>
        </section>
    )
}

function Architecture() {
    return (
        <section id="program" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// CAPABILITIES</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Program Architecture</h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '1.1rem' }}>Architecture Thinking + Tool Integration = MVP Delivery</p>
                </div>

                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {CAPABILITIES.map((c, i) => (
                        <div key={i} style={{
                            background: T.bg, border: `1px solid ${T.border}`,
                            borderRadius: '1.5rem', padding: '2.5rem', display: 'flex', flexDirection: 'column'
                        }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                <c.icon size={20} color={T.text} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>{c.title}</h3>
                            <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, lineHeight: 1.6, fontSize: '0.95rem' }}>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function LearningOutcomes() {
    return (
        <section id="outcomes" className="sec-rev" style={{ padding: '10rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// OUTCOMES</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '4rem' }}>
                    Learning Outcomes
                </h2>
                <div className="stag-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {OUTCOMES.map((o, i) => (
                        <div key={i} style={{
                            padding: '2rem', borderBottom: `1px solid ${T.border}`,
                            display: 'flex', alignItems: 'center', gap: '1.5rem'
                        }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.muted, fontSize: '0.85rem' }}>0{i + 1}</span>
                            <p style={{ fontSize: '1.15rem', fontWeight: 400 }}>{o}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CurriculumOverview() {
    return (
        <section id="curriculum" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// TIMELINE</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '4rem' }}>
                    Curriculum Timeline
                </h2>
                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {CURRICULUM.map((c, i) => (
                        <div key={i} style={{
                            background: T.bg, border: `1px solid ${T.border}`,
                            padding: '3rem', borderRadius: '1.5rem'
                        }}>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.muted, marginBottom: '1rem' }}>
                                {c.phase}
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem', lineHeight: 1.3 }}>
                                {c.title}
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {c.topics.map((t, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem' }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.muted }} />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ForWho() {
    return (
        <section id="for-who" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    // TARGET PROFILE
                </p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
                    Who is this for?
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 800 }}>
                    {['Mid-level Managers', 'Professionals facing AI disruption', 'Entrepreneurs', 'Operators', 'Consultants', 'Career Switchers'].map((p, i) => (
                        <span key={i} style={{
                            padding: '0.75rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999,
                            fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem'
                        }}>
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Philosophy() {
    return (
        <section className="sec-rev" style={{ padding: '10rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                    lineHeight: 1.2, marginBottom: '2rem'
                }}>
                    Most courses teach features.<br />
                    We teach delivery.
                </h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '1.2rem', lineHeight: 1.6 }}>
                    Most people experiment with AI. You will deploy intelligence.
                </p>
            </div>
        </section>
    )
}

function Contact() {
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setSubmitted(true)
        }, 1200)
    }

    return (
        <section id="contact" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// ENROLLMENT</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                    Start building your intelligence layer.
                </h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, marginBottom: '3rem', fontSize: '1rem' }}>
                    Course details and enrollment will be announced soon. Join the waitlist.
                </p>

                {submitted ? (
                    <div style={{ padding: '2rem', border: `1px solid ${T.border}`, borderRadius: '1.5rem', color: T.text, background: T.surface }}>
                        Waitlist confirmed. We will contact you soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div>
                            <input required type="text" placeholder="Full Name" style={{
                                width: '100%', background: T.surface, border: `1px solid ${T.border}`,
                                padding: '1.25rem', borderRadius: '1rem', color: T.text, fontSize: '0.95rem',
                                outline: 'none', transition: 'border 0.2s', fontFamily: 'Inter, sans-serif'
                            }} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.3)'} onBlur={e => e.target.style.borderColor = T.border} />
                        </div>
                        <div>
                            <input required type="email" placeholder="Professional Email" style={{
                                width: '100%', background: T.surface, border: `1px solid ${T.border}`,
                                padding: '1.25rem', borderRadius: '1rem', color: T.text, fontSize: '0.95rem',
                                outline: 'none', transition: 'border 0.2s', fontFamily: 'Inter, sans-serif'
                            }} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.3)'} onBlur={e => e.target.style.borderColor = T.border} />
                        </div>
                        <button type="submit" disabled={submitting} style={{
                            background: T.text, color: T.bg, padding: '1.25rem', border: 'none',
                            borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
                            marginTop: '1rem', transition: 'opacity 0.2s', opacity: submitting ? 0.7 : 1
                        }}>
                            {submitting ? 'Initializing...' : 'Join Updates'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}
