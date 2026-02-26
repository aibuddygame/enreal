import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import { SOLUTIONS, T } from './data.js'
import { MonoLabel, SectionHeading, Gold, Card } from './ui.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Solutions() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.sol-card', {
                y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 78%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="solutions" style={{ padding: '7rem 1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <MonoLabel>Solutions</MonoLabel>
                <SectionHeading>What We <Gold>Build</Gold></SectionHeading>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem', marginTop: '3rem',
                }}>
                    {SOLUTIONS.map(s => <SolCard key={s.id} {...s} />)}
                </div>
            </div>
        </section>
    )
}

function SolCard({ id, title, desc, outcomes }) {
    const [hov, setHov] = useState(false)
    return (
        <div className="sol-card"
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? 'rgba(201,168,76,0.04)' : T.surface,
                border: `1px solid ${hov ? T.borderH : T.border}`,
                borderRadius: '1.75rem', padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                transition: 'all 0.3s ease',
                transform: hov ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hov ? '0 20px 50px rgba(201,168,76,0.07)' : 'none',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '0.7rem', color: T.gold, letterSpacing: '0.1em' }}>{id}</span>
                <ChevronRight size={15} style={{ color: hov ? T.gold : 'rgba(250,248,245,0.2)', transition: 'color 0.3s' }} />
            </div>
            <div>
                <h3 style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '0.5rem', margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {outcomes.map(o => (
                    <li key={o} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(250,248,245,0.7)' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.gold, flexShrink: 0 }} />
                        {o}
                    </li>
                ))}
            </ul>
        </div>
    )
}
