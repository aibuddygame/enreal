import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SHUFFLER, TW_LINES, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Capabilities() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cap-card', {
                y: 50, opacity: 0, duration: 0.85, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 76%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="solutions" style={{ padding: '8rem 5vw', background: T.surface, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '1.25rem' }}>
          // CAPABILITIES
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800,
                    fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.035em',
                    color: T.text, marginBottom: '0.75rem'
                }}>
                    Core{' '}
                    <span style={{ color: T.accent }}>Solutions</span>
                </h2>
                <p style={{
                    fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: T.muted,
                    maxWidth: 480, lineHeight: 1.7, marginBottom: '4rem'
                }}>
                    Three intelligence layers — each a functional system, not a feature list.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.25rem' }}>
                    <ShufflerCard />
                    <TypewriterCard />
                    <SchedulerCard />
                </div>
            </div>
        </section>
    )
}

function CardShell({ children, label, title, desc }) {
    return (
        <div className="cap-card" style={{
            background: T.card, border: `1px solid ${T.border}`, borderRadius: '2rem',
            padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            boxShadow: T.shadow,
        }}>
            <div style={{ flex: 1 }}>{children}</div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '1.25rem' }}>
                <p className="f-mono" style={{
                    fontSize: '0.62rem', letterSpacing: '0.12em',
                    color: T.accent, marginBottom: '0.4rem'
                }}>{label}</p>
                <h3 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1rem',
                    letterSpacing: '-0.02em', marginBottom: '0.35rem', color: T.text
                }}>{title}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.84rem', color: T.muted, lineHeight: 1.65 }}>{desc}</p>
            </div>
        </div>
    )
}

function ShufflerCard() {
    const [items, setItems] = useState([...SHUFFLER])
    useEffect(() => {
        const id = setInterval(() => {
            setItems(p => { const n = [...p]; n.unshift(n.pop()); return n })
        }, 3000)
        return () => clearInterval(id)
    }, [])
    return (
        <CardShell label="01 / AI COMMUNICATION" title="AI Communication Automation"
            desc="Automate outreach, replies, and WhatsApp flows — at any volume, without hiring.">
            <div style={{ position: 'relative', height: 160 }}>
                {items.map((item, i) => (
                    <div key={item.label} className="shuffler-card" style={{
                        position: 'absolute', left: 0, right: 0,
                        top: i === 0 ? 0 : i === 1 ? 14 : 28, zIndex: 3 - i,
                        opacity: i === 0 ? 1 : i === 1 ? 0.5 : 0.2,
                        background: i === 0 ? T.accent : T.surface,
                        border: `1px solid ${i === 0 ? T.accent : T.border}`,
                        borderRadius: '1.25rem', padding: '1rem 1.25rem',
                    }}>
                        <p className="f-mono" style={{
                            fontSize: '0.62rem', letterSpacing: '0.1em',
                            color: i === 0 ? 'rgba(255,255,255,0.7)' : T.accent, marginBottom: '0.3rem'
                        }}>AI.COMM</p>
                        <p style={{
                            fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '0.95rem',
                            color: i === 0 ? '#fff' : T.text
                        }}>{item.label}</p>
                        <p style={{
                            fontFamily: 'Inter,sans-serif', fontSize: '0.78rem',
                            color: i === 0 ? 'rgba(255,255,255,0.65)' : T.muted
                        }}>{item.sub}</p>
                    </div>
                ))}
            </div>
        </CardShell>
    )
}

function TypewriterCard() {
    const [lineIdx, setLineIdx] = useState(0)
    const [chars, setChars] = useState(0)
    useEffect(() => {
        const line = TW_LINES[lineIdx]
        const id = setTimeout(() => {
            if (chars < line.length) setChars(c => c + 1)
            else setTimeout(() => { setLineIdx(i => (i + 1) % TW_LINES.length); setChars(0) }, 1500)
        }, 36)
        return () => clearTimeout(id)
    }, [chars, lineIdx])
    const prev = TW_LINES.slice(Math.max(0, lineIdx - 3), lineIdx)
    return (
        <CardShell label="02 / WORKFLOW INTELLIGENCE" title="ERP & Workflow Intelligence Layer"
            desc="AI embedded directly into your ERP and workflow stack — automating decisions, not just data.">
            <div style={{ background: '#1C1C1E', borderRadius: '1rem', padding: '1.25rem', height: 160, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    <span className="pulse-dot" style={{
                        display: 'inline-block', width: 6, height: 6,
                        borderRadius: '50%', background: '#22C55E'
                    }} />
                    <span className="f-mono" style={{ fontSize: '0.62rem', color: '#22C55E', letterSpacing: '0.1em' }}>LIVE FEED</span>
                </div>
                {prev.map((l, i) => (
                    <p key={i} className="f-mono" style={{
                        fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', lineHeight: 1.8,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{l}</p>
                ))}
                <p className="f-mono" style={{ fontSize: '0.72rem', color: 'white', lineHeight: 1.8 }}>
                    {TW_LINES[lineIdx].slice(0, chars)}<span className="tw-cursor" style={{ color: T.accent }}>█</span>
                </p>
            </div>
        </CardShell>
    )
}

function SchedulerCard() {
    const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const [activeDay, setActiveDay] = useState(null)
    const [phase, setPhase] = useState(0)
    useEffect(() => {
        let ts = []
        const loop = () => {
            let total = 0
            const add = (d, fn) => { total += d; ts.push(setTimeout(fn, total)) }
            add(600, () => { setPhase(1); setActiveDay(2) })
            add(1100, () => setPhase(2))
            add(800, () => setPhase(3))
            add(500, () => { setActiveDay(null); setPhase(0) })
            ts.push(setTimeout(() => { ts = []; loop() }, total + 600))
        }
        loop()
        return () => ts.forEach(clearTimeout)
    }, [])
    return (
        <CardShell label="03 / DECISION INTELLIGENCE" title="Executive AI Decision Copilot"
            desc="Real-time insight for leadership — compressing hours of analysis into actionable intelligence.">
            <div style={{ background: T.surface, borderRadius: '1rem', padding: '1.25rem', height: 160 }}>
                <p className="f-mono" style={{ fontSize: '0.62rem', color: T.accent, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    AI.COPILOT // DECISION REVIEW
                </p>
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
                    {DAYS.map((d, i) => (
                        <div key={i} style={{
                            flex: 1, aspectRatio: '1/1', borderRadius: '0.45rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'JetBrains Mono,monospace', fontSize: '0.6rem', fontWeight: 600,
                            background: activeDay === i ? T.accent : T.card,
                            color: activeDay === i ? '#fff' : T.muted,
                            transform: activeDay === i && phase === 1 ? 'scale(0.92)' : 'scale(1)',
                            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                            border: `1px solid ${activeDay === i ? T.accent : T.border}`,
                        }}>{d}</div>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <svg width="14" height="20" viewBox="0 0 14 20" style={{
                        opacity: phase === 3 ? 0 : 1,
                        transform: phase === 2 ? 'translateX(88px)' : 'translateX(0)',
                        transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}>
                        <path d="M0 0 L0 16 L4 12 L7 19 L9 18 L6 11 L12 11Z" fill={T.accent} />
                    </svg>
                    <button style={{
                        padding: '0.28rem 0.85rem', borderRadius: 999,
                        background: phase === 2 ? T.accent : T.accentL,
                        border: 'none', fontFamily: 'JetBrains Mono,monospace', fontSize: '0.62rem',
                        color: phase === 2 ? '#fff' : T.accent,
                        transition: 'all 0.35s ease', cursor: 'default',
                        transform: phase === 2 ? 'scale(0.94)' : 'scale(1)',
                    }}>Review ✓</button>
                </div>
            </div>
        </CardShell>
    )
}
