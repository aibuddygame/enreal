import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROTOCOL_CARDS, T } from './data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Protocol() {
    const containerRef = useRef(null)
    const cardRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current
            if (!cards.length) return

            cards.forEach((card, i) => {
                if (i === 0) return
                // Each subsequent card pins and stacks
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    pin: true,
                    pinSpacing: false,
                    onEnter: () => {
                        // Scale down the card above
                        if (cards[i - 1]) {
                            gsap.to(cards[i - 1], {
                                scale: 0.9, filter: 'blur(4px)', opacity: 0.45,
                                duration: 0.5, ease: 'power2.inOut',
                            })
                        }
                    },
                    onLeaveBack: () => {
                        if (cards[i - 1]) {
                            gsap.to(cards[i - 1], {
                                scale: 1, filter: 'blur(0px)', opacity: 1,
                                duration: 0.5, ease: 'power2.inOut',
                            })
                        }
                    },
                })
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} id="protocol" style={{ position: 'relative', zIndex: 1 }}>
            {/* Section header */}
            <div style={{ padding: '8rem 5vw 4rem', maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, marginBottom: '1.25rem' }}>
          // PROTOCOL
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                    letterSpacing: '-0.035em', color: T.ivory
                }}>
                    How We{' '}
                    <em className="f-serif" style={{ color: T.gold, fontStyle: 'italic' }}>Deliver</em>
                </h2>
            </div>

            {PROTOCOL_CARDS.map((card, i) => (
                <div
                    key={card.num}
                    ref={el => (cardRefs.current[i] = el)}
                    className="proto-card"
                    style={{
                        minHeight: '100vh', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', padding: '5vw',
                        background: i === 0 ? '#0F0F18' : i === 1 ? '#0D0D14' : '#0A0A10',
                    }}
                >
                    <div style={{
                        maxWidth: 1100, width: '100%',
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center', gap: '5rem',
                    }}
                        className="proto-inner">
                        {/* Text */}
                        <div>
                            <span className="f-mono" style={{
                                fontSize: '0.7rem', letterSpacing: '0.18em', color: T.gold,
                                display: 'block', marginBottom: '1.5rem',
                            }}>STEP {card.num}</span>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 800,
                                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                                letterSpacing: '-0.04em', color: T.ivory,
                                marginBottom: '1.25rem', lineHeight: 1.05,
                            }}>{card.title}</h3>
                            <p style={{
                                fontFamily: 'Inter, sans-serif', fontSize: '1rem',
                                color: T.muted, lineHeight: 1.8, maxWidth: 440,
                            }}>{card.desc}</p>
                        </div>

                        {/* SVG animation */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {i === 0 && <SpinnerAnim />}
                            {i === 1 && <ScannerAnim />}
                            {i === 2 && <EKGAnim />}
                        </div>
                    </div>
                </div>
            ))}

            <style>{`
        @media (max-width: 768px) {
          .proto-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
        </section>
    )
}

/* ── SVG 1: Concentric rotating circles ─────────────────── */
function SpinnerAnim() {
    return (
        <svg width="260" height="260" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="100" fill="none" stroke={T.border} strokeWidth="1" />
            <circle cx="130" cy="130" r="70" fill="none" stroke={T.border} strokeWidth="1" />
            <circle cx="130" cy="130" r="40" fill="none" stroke={T.border} strokeWidth="1" />

            <g className="spin-cw" style={{ transformOrigin: '130px 130px' }}>
                <circle cx="130" cy="30" r="5" fill={T.gold} opacity="0.9" />
                <circle cx="230" cy="130" r="3" fill={T.gold} opacity="0.5" />
                <path d="M 130 30 A 100 100 0 0 1 230 130" fill="none" stroke={T.gold} strokeWidth="1" strokeDasharray="4 8" />
            </g>

            <g className="spin-ccw" style={{ transformOrigin: '130px 130px' }}>
                <circle cx="130" cy="60" r="4" fill={T.gold} opacity="0.7" />
                <circle cx="200" cy="130" r="2" fill={T.gold} opacity="0.4" />
                <path d="M 130 60 A 70 70 0 0 0 200 130" fill="none" stroke={T.gold} strokeWidth="1" strokeDasharray="3 6" />
            </g>

            <circle cx="130" cy="130" r="6" fill={T.gold} />
        </svg>
    )
}

/* ── SVG 2: Scanning laser across dot grid ──────────────── */
function ScannerAnim() {
    const dots = []
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 9; c++) {
            dots.push({ x: 20 + c * 28, y: 20 + r * 28 })
        }
    }
    return (
        <svg width="280" height="190" viewBox="0 0 280 190">
            {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="2.5" fill="rgba(201,168,76,0.25)" />
            ))}
            {/* Laser line */}
            <line
                x1="0" y1="0" x2="280" y2="0"
                stroke={T.gold} strokeWidth="1.5"
                className="laser"
                style={{ boxShadow: `0 0 8px ${T.gold}` }}
            />
            {/* Glow */}
            <line
                x1="0" y1="0" x2="280" y2="0"
                stroke={T.gold} strokeWidth="4"
                opacity="0.15"
                className="laser"
            />
        </svg>
    )
}

/* ── SVG 3: EKG waveform ─────────────────────────────────── */
function EKGAnim() {
    const path = 'M0,80 L60,80 L75,80 L85,30 L95,125 L105,20 L115,90 L125,80 L200,80 L215,80 L225,50 L235,110 L245,65 L255,80 L300,80'
    return (
        <svg width="300" height="140" viewBox="0 0 300 140">
            {/* Grid lines */}
            {[0, 35, 70, 105, 140].map(y => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
            ))}
            {[0, 60, 120, 180, 240, 300].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="140" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
            ))}

            {/* EKG trace */}
            <path
                d={path}
                fill="none"
                stroke={T.gold}
                strokeWidth="2"
                className="ekg-path"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Glow duplicate */}
            <path
                d={path}
                fill="none"
                stroke={T.gold}
                strokeWidth="6"
                opacity="0.12"
                className="ekg-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: '0.05s' }}
            />
        </svg>
    )
}
