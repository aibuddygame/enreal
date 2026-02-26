import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { T } from './data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
    const ref = useRef(null)
    const lineA = useRef(null)
    const lineB = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple block reveal — no individual word refs, no fragile stagger
            gsap.fromTo(lineA.current,
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
                }
            )
            gsap.fromTo(lineB.current,
                { y: 32, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, delay: 0.18, ease: 'power3.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} style={{
            position: 'relative', overflow: 'hidden',
            padding: '10rem 5vw',
            background: T.text,  // deep graphite — intentional inversion
        }}>
            {/* Parallax texture — very subtle */}
            <div aria-hidden style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: `url(${T.philImg})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.04,
            }} />

            <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <p className="f-mono" style={{
                    fontSize: '0.7rem', letterSpacing: '0.2em',
                    color: T.accent, marginBottom: '3.5rem',
                }}>
          // PHILOSOPHY
                </p>

                {/* Statement 1 */}
                <p ref={lineA} style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 400,
                    fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.7, marginBottom: '2rem',
                }}>
                    Most companies scale by hiring.
                </p>

                {/* Statement 2 — large Manrope */}
                <p ref={lineB} style={{
                    fontFamily: 'Manrope, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    letterSpacing: '-0.03em', lineHeight: 1.05,
                    color: '#fff',
                }}>
                    We scale by{' '}
                    <span style={{ color: T.accent }}>intelligence.</span>
                </p>
            </div>
        </section>
    )
}
