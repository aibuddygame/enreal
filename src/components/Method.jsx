import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { METHODOLOGY, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Method() {
    const containerRef = useRef(null)
    const cardRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // CSS sticky handles the pinning.
            // GSAP only animates the PREVIOUS card (scale/blur) when a new card covers it.
            cardRefs.current.forEach((card, i) => {
                if (i === 0 || !card) return
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    onEnter: () => {
                        gsap.to(cardRefs.current[i - 1], {
                            scale: 0.93, filter: 'blur(3px)', opacity: 0.4,
                            duration: 0.5, ease: 'power2.inOut',
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(cardRefs.current[i - 1], {
                            scale: 1, filter: 'blur(0px)', opacity: 1,
                            duration: 0.5, ease: 'power2.inOut',
                        })
                    },
                })
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    const BGs = [T.surface, '#EEF2FF', T.bg]

    return (
        <section ref={containerRef} id="method" style={{ position: 'relative', zIndex: 1 }}>
            {/* Section header — sits above sticky cards */}
            <div style={{ padding: '8rem 5vw 3rem', maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{
                    fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '1.25rem',
                }}>
          // METHODOLOGY
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800,
                    fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.035em', color: T.text,
                }}>
                    Execution{' '}
                    <span style={{ color: T.accent }}>Framework</span>
                </h2>
            </div>

            {/* Sticky stack container — sets total scroll height for 3 cards */}
            <div style={{ position: 'relative' }}>
                {METHODOLOGY.map((card, i) => (
                    <div
                        key={card.num}
                        ref={el => (cardRefs.current[i] = el)}
                        style={{
                            /* CSS sticky — browser pins natively, no GSAP needed */
                            position: 'sticky',
                            top: 0,
                            zIndex: i + 1,        // z1 → z2 → z3: each card on top of previous
                            minHeight: '65vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '5vw',
                            background: BGs[i],
                            /* will-change for GPU compositing — smooth perf */
                            willChange: 'transform, filter, opacity',
                        }}
                    >
                        <div style={{
                            maxWidth: 1100, width: '100%',
                            display: 'grid', gridTemplateColumns: '1fr 1fr',
                            alignItems: 'center', gap: '5rem',
                        }} className="method-inner">
                            <div>
                                <span className="f-mono" style={{
                                    fontSize: '0.7rem', letterSpacing: '0.18em',
                                    color: T.accent, display: 'block', marginBottom: '1.5rem',
                                }}>
                                    STEP {card.num}
                                </span>
                                <h3 style={{
                                    fontFamily: 'Inter,sans-serif', fontWeight: 900,
                                    fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.04em',
                                    color: T.text, marginBottom: '1.25rem', lineHeight: 1.0,
                                }}>
                                    {card.title}
                                </h3>
                                <p style={{
                                    fontFamily: 'Manrope,sans-serif', fontSize: '1.05rem',
                                    color: T.muted, lineHeight: 1.8, maxWidth: 420,
                                }}>
                                    {card.desc}
                                </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {i === 0 && <SpinnerAnim />}
                                {i === 1 && <ScannerAnim />}
                                {i === 2 && <EKGAnim />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Spacer so the last card un-sticks cleanly before next section */}
            <div style={{ height: '1px' }} />

            <style>{`
        @media (max-width:768px) {
          .method-inner { grid-template-columns:1fr !important; gap:2.5rem !important; }
        }
      `}</style>
        </section>
    )
}

function SpinnerAnim() {
    const accent = T.accent
    const border = 'rgba(37,99,235,0.12)'
    return (
        <svg width="240" height="240" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="95" fill="none" stroke={border} strokeWidth="1" />
            <circle cx="120" cy="120" r="65" fill="none" stroke={border} strokeWidth="1" />
            <circle cx="120" cy="120" r="35" fill="none" stroke={border} strokeWidth="1" />
            <g className="spin-cw" style={{ transformOrigin: '120px 120px' }}>
                <circle cx="120" cy="25" r="5" fill={accent} opacity="0.9" />
                <circle cx="215" cy="120" r="3" fill={accent} opacity="0.5" />
                <path d="M120 25 A95 95 0 0 1 215 120" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4 8" />
            </g>
            <g className="spin-ccw" style={{ transformOrigin: '120px 120px' }}>
                <circle cx="120" cy="55" r="4" fill={accent} opacity="0.7" />
                <path d="M120 55 A65 65 0 1 0 185 120" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3 6" />
            </g>
            <circle cx="120" cy="120" r="6" fill={accent} />
        </svg>
    )
}

function ScannerAnim() {
    const dots = []
    for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) dots.push({ x: 16 + c * 30, y: 20 + r * 32 })
    return (
        <svg width="260" height="180" viewBox="0 0 260 180">
            {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2.5" fill="rgba(37,99,235,0.18)" />)}
            <line x1="0" y1="0" x2="260" y2="0" stroke={T.accent} strokeWidth="1.5" className="laser" />
            <line x1="0" y1="0" x2="260" y2="0" stroke={T.accent} strokeWidth="6" opacity="0.1" className="laser" />
        </svg>
    )
}

function EKGAnim() {
    const d = 'M0,70 L55,70 L70,70 L80,22 L90,115 L100,15 L110,80 L120,70 L190,70 L205,70 L215,42 L225,98 L235,58 L245,70 L280,70'
    return (
        <svg width="280" height="130" viewBox="0 0 280 130">
            {[0, 32, 64, 96, 130].map(y => <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(37,99,235,0.07)" strokeWidth="1" />)}
            {[0, 70, 140, 210, 280].map(x => <line key={x} x1={x} y1="0" x2={x} y2="130" stroke="rgba(37,99,235,0.07)" strokeWidth="1" />)}
            <path d={d} fill="none" stroke={T.accent} strokeWidth="2" className="ekg-path" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke={T.accent} strokeWidth="8" opacity="0.08" className="ekg-path" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: '0.06s' }} />
        </svg>
    )
}
