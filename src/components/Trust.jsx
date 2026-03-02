import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TRUST, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function TrustLayer() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.trust-item', {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 76%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, marginBottom: '1.25rem' }}>
          // ENTERPRISE CREDIBILITY
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800,
                    fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.035em',
                    color: T.ivory, marginBottom: '4rem'
                }}>
                    Operational{' '}
                    <em className="f-serif" style={{ color: T.gold, fontStyle: 'italic' }}>Indicators</em>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
                    {TRUST.map((item, i) => (
                        <div key={i} className="trust-item" style={{
                            background: T.card, border: `1px solid ${T.border}`,
                            borderRadius: '2rem', padding: '2rem',
                        }}>
                            <p style={{
                                fontFamily: 'Inter,sans-serif', fontWeight: 900,
                                fontSize: 'clamp(2.5rem,4vw,3.5rem)', letterSpacing: '-0.05em',
                                color: T.gold, lineHeight: 1, marginBottom: '0.5rem'
                            }}>
                                {item.value}
                            </p>
                            <p style={{
                                fontFamily: 'Inter,sans-serif', fontWeight: 700,
                                fontSize: '0.95rem', color: T.ivory, marginBottom: '0.3rem'
                            }}>
                                {item.label}
                            </p>
                            <p className="f-mono" style={{ fontSize: '0.68rem', color: T.muted, letterSpacing: '0.05em' }}>
                                {item.sub}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
