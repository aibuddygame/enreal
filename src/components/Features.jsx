import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SHUFFLER_ITEMS, TYPEWRITER_LINES, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feat-card', {
                y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="features" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Label */}
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, marginBottom: '1.25rem' }}>
          // CAPABILITIES
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                    letterSpacing: '-0.035em', color: T.ivory, marginBottom: '4rem'
                }}>
                    Interactive{' '}
                    <em className="f-serif" style={{ color: T.gold, fontStyle: 'italic' }}>Artifacts</em>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>
                    <ShufflerCard />
                    <TypewriterCard />
                    <SchedulerCard />
                </div>
            </div>
        </section>
    )
}

/* ── Card shell ─────────────────────────────────────────── */
function CardShell({ title, desc, children, accent }) {
    return (
        <div className="feat-card" style={{
            background: T.card, border: `1px solid ${T.border}`, borderRadius: '2rem',
            padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
        }}>
            <div style={{ flex: 1 }}>{children}</div>
            <div>
                <h3 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.05rem',
                    letterSpacing: '-0.02em', marginBottom: '0.4rem'
                }}>{title}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.84rem', color: T.muted, lineHeight: 1.65 }}>{desc}</p>
            </div>
        </div>
    )
}

/* ── Card 1: Diagnostic Shuffler ──────────────────────────── */
function ShufflerCard() {
    const [items, setItems] = useState([...SHUFFLER_ITEMS])
    useEffect(() => {
        const id = setInterval(() => {
            setItems(prev => {
                const next = [...prev]
                next.unshift(next.pop())
                return next
            })
        }, 3000)
        return () => clearInterval(id)
    }, [])

    return (
        <CardShell
            title="Tailor-Made AI Systems"
            desc="Custom intelligence — from agentic pipelines to fine-tuned LLMs — engineered for your workflow."
        >
            <div style={{ position: 'relative', height: 160 }}>
                {items.map((item, i) => (
                    <div
                        key={item.label}
                        className="shuffler-card"
                        style={{
                            position: 'absolute', left: 0, right: 0,
                            top: i === 0 ? 0 : i === 1 ? 14 : 28,
                            opacity: i === 0 ? 1 : i === 1 ? 0.55 : 0.25,
                            zIndex: 3 - i,
                            background: i === 0 ? T.gold : T.surface,
                            border: `1px solid ${i === 0 ? T.gold : T.border}`,
                            borderRadius: '1.25rem', padding: '1rem 1.25rem',
                        }}
                    >
                        <p className="f-mono" style={{
                            fontSize: '0.7rem', letterSpacing: '0.12em',
                            color: i === 0 ? '#0D0D12' : T.gold, marginBottom: '0.35rem'
                        }}>
                            SYSTEM.AI
                        </p>
                        <p style={{
                            fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '0.95rem',
                            color: i === 0 ? '#0D0D12' : T.ivory
                        }}>{item.label}</p>
                        <p style={{
                            fontFamily: 'Inter,sans-serif', fontSize: '0.78rem',
                            color: i === 0 ? 'rgba(13,13,18,0.65)' : T.muted
                        }}>{item.sub}</p>
                    </div>
                ))}
            </div>
        </CardShell>
    )
}

/* ── Card 2: Telemetry Typewriter ─────────────────────────── */
function TypewriterCard() {
    const [lineIdx, setLineIdx] = useState(0)
    const [chars, setChars] = useState(0)

    useEffect(() => {
        let charTimer
        const line = TYPEWRITER_LINES[lineIdx]
        if (chars < line.length) {
            charTimer = setTimeout(() => setChars(c => c + 1), 38)
        } else {
            charTimer = setTimeout(() => {
                setLineIdx(i => (i + 1) % TYPEWRITER_LINES.length)
                setChars(0)
            }, 1600)
        }
        return () => clearTimeout(charTimer)
    }, [chars, lineIdx])

    const displayed = TYPEWRITER_LINES.slice(Math.max(0, lineIdx - 3), lineIdx)

    return (
        <CardShell
            title="Real-Time 3D & Digital Experiences"
            desc="Cinematic WebGL, Unreal Engine builds, and high-performance digital products — streamed live."
        >
            <div style={{
                background: '#080810', borderRadius: '1rem', padding: '1.25rem',
                height: 160, overflow: 'hidden', position: 'relative',
            }}>
                {/* Live indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    <span className="pulse-dot" style={{
                        display: 'inline-block', width: 6, height: 6,
                        borderRadius: '50%', background: '#22C55E'
                    }} />
                    <span className="f-mono" style={{ fontSize: '0.65rem', color: '#22C55E', letterSpacing: '0.1em' }}>
                        LIVE FEED
                    </span>
                </div>

                {/* Previous lines */}
                {displayed.map((l, i) => (
                    <p key={i} className="f-mono" style={{
                        fontSize: '0.7rem', color: 'rgba(250,248,245,0.22)', lineHeight: 1.8,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{l}</p>
                ))}

                {/* Current typing line */}
                <p className="f-mono" style={{ fontSize: '0.75rem', color: T.ivory, lineHeight: 1.8 }}>
                    {TYPEWRITER_LINES[lineIdx].slice(0, chars)}
                    <span className="tw-cursor" style={{ color: T.gold }}>█</span>
                </p>
            </div>
        </CardShell>
    )
}

/* ── Card 3: Cursor Protocol Scheduler ─────────────────────── */
function SchedulerCard() {
    const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const [activeDay, setActiveDay] = useState(null)
    const [phase, setPhase] = useState(0)
    // phase: 0=entering, 1=clicking day, 2=moving to save, 3=fading

    useEffect(() => {
        const seq = [
            [800, () => { setPhase(1); setActiveDay(2) }],    // click Wed
            [1200, () => { setPhase(2) }],                      // move to save
            [900, () => { setPhase(3) }],                      // fade
            [600, () => { setActiveDay(null); setPhase(0) }],  // reset
        ]
        let timeouts = []
        let total = 0
        const loop = () => {
            seq.forEach(([delay, fn]) => {
                total += delay
                timeouts.push(setTimeout(fn, total))
            })
            timeouts.push(setTimeout(() => { total = 0; timeouts = []; loop() }, total + 400))
        }
        loop()
        return () => timeouts.forEach(clearTimeout)
    }, [])

    return (
        <CardShell
            title="Web3 & Future Infrastructure"
            desc="Smart contracts, wallet auth, and tokenised platforms — built for the decentralised economy."
        >
            <div style={{
                background: '#080810', borderRadius: '1rem', padding: '1.25rem', height: 160,
            }}>
                <p className="f-mono" style={{ fontSize: '0.65rem', color: T.gold, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    WEB3.DEPLOY // SCHEDULE
                </p>

                {/* Day grid */}
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
                    {DAYS.map((d, i) => (
                        <div key={i} style={{
                            flex: 1, aspectRatio: '1/1', borderRadius: '0.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'JetBrains Mono,monospace', fontSize: '0.65rem', fontWeight: 600,
                            background: activeDay === i ? T.gold : 'rgba(250,248,245,0.06)',
                            color: activeDay === i ? '#0D0D12' : T.muted,
                            transform: activeDay === i && phase === 1 ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                            border: `1px solid ${activeDay === i ? T.gold : 'transparent'}`,
                        }}>{d}</div>
                    ))}
                </div>

                {/* Animated cursor + save button row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <svg width="14" height="20" viewBox="0 0 14 20" style={{
                            opacity: phase === 3 ? 0 : 1,
                            transform: phase === 2 ? 'translateX(80px)' : 'translateX(0)',
                            transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                        }}>
                            <path d="M0 0 L0 16 L4 12 L7 19 L9 18 L6 11 L12 11 Z"
                                fill={T.gold} />
                        </svg>
                    </div>
                    <button style={{
                        padding: '0.3rem 0.85rem', borderRadius: 999,
                        background: phase === 2 ? T.gold : 'rgba(201,168,76,0.1)',
                        border: `1px solid ${phase === 2 ? T.gold : T.border}`,
                        fontFamily: 'JetBrains Mono,monospace', fontSize: '0.68rem',
                        color: phase === 2 ? '#0D0D12' : T.gold,
                        transition: 'all 0.35s ease', cursor: 'default',
                        transform: phase === 2 ? 'scale(0.95)' : 'scale(1)',
                    }}>
                        Deploy ✓
                    </button>
                </div>
            </div>
        </CardShell>
    )
}
