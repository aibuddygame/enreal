import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS, T } from '../data.js'
import { MonoLabel, SectionHeading, Gold } from '../components/ui.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.proc-row', {
                x: -30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 78%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="process" style={{ padding: '7rem 1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <MonoLabel>Process</MonoLabel>
                <SectionHeading>How We <Gold>Work</Gold></SectionHeading>
                <div style={{ marginTop: '3rem' }}>
                    {PROCESS.map((p, i) => (
                        <div key={p.step} className="proc-row" style={{
                            display: 'flex', alignItems: 'flex-start', gap: '2rem',
                            padding: '1.75rem 0',
                            borderTop: '1px solid rgba(250,248,245,0.06)',
                        }}>
                            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '0.7rem', color: T.gold, flexShrink: 0, paddingTop: 3, minWidth: 26 }}>{p.step}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                                <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', minWidth: 130 }}>{p.label}</span>
                                <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted, lineHeight: 1.6 }}>{p.desc}</span>
                            </div>
                        </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(250,248,245,0.06)' }} />
                </div>
            </div>
        </section>
    )
}
