import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { T } from './data.js'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-item', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 76%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const MARKETS = ['Financial Services', 'Enterprise Operations', 'Consumer Platforms', 'Web3 Infrastructure']
    const DELIVERY = ['No rip-and-replace', 'AI embedded in existing stack', 'Managed iteration post-launch', 'Outcome-driven engagement']

    return (
        <section ref={ref} id="about" style={{ padding: '8rem 5vw', background: T.surface, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono about-item" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '1.25rem' }}>
          // COMPANY CONTEXT
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
                    className="about-grid">
                    {/* Left — positioning */}
                    <div>
                        <h2 className="about-item" style={{
                            fontFamily: 'Inter,sans-serif', fontWeight: 800,
                            fontSize: 'clamp(2rem,4vw,3.25rem)', letterSpacing: '-0.035em',
                            color: T.text, lineHeight: 1.05, marginBottom: '1.5rem'
                        }}>
                            Intelligence as{' '}
                            <span style={{ color: T.accent }}>Infrastructure.</span>
                        </h2>
                        <p className="about-item" style={{
                            fontFamily: 'Manrope,sans-serif', fontSize: '1.05rem',
                            color: T.muted, lineHeight: 1.8, marginBottom: '2rem'
                        }}>
                            Enreal AI is a Hong Kong-based intelligence studio. We embed AI directly into the operational layer of your business — automating communication, transforming workflow intelligence, and giving leadership real-time decision support.
                        </p>
                        <p className="about-item" style={{
                            fontFamily: 'Inter,sans-serif', fontSize: '0.9rem',
                            color: T.muted, lineHeight: 1.75
                        }}>
                            We don't add headcount. We add intelligence that works at scale.
                        </p>
                    </div>

                    {/* Right — markets + delivery */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div className="about-item">
                            <p className="f-mono" style={{
                                fontSize: '0.62rem', letterSpacing: '0.12em',
                                color: T.muted, marginBottom: '1rem'
                            }}>MARKETS SERVED</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {MARKETS.map(m => (
                                    <span key={m} style={{
                                        background: T.card, border: `1px solid ${T.border}`,
                                        borderRadius: '0.625rem', padding: '0.3rem 0.8rem',
                                        fontFamily: 'Inter,sans-serif', fontSize: '0.84rem', color: T.text,
                                        boxShadow: T.shadow,
                                    }}>{m}</span>
                                ))}
                            </div>
                        </div>

                        <div className="about-item">
                            <p className="f-mono" style={{
                                fontSize: '0.62rem', letterSpacing: '0.12em',
                                color: T.muted, marginBottom: '1rem'
                            }}>DELIVERY PHILOSOPHY</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {DELIVERY.map(d => (
                                    <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
                                        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted }}>{d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width:768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
        </section>
    )
}
