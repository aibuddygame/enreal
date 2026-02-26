import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, T } from './data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.proj-card', {
                y: 50, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 76%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="projects" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, marginBottom: '1.25rem' }}>
          // SELECTED WORK
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800,
                    fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.035em',
                    color: T.ivory, marginBottom: '0.75rem'
                }}>
                    Proof Through{' '}
                    <em className="f-serif" style={{ color: T.gold, fontStyle: 'italic' }}>Execution</em>
                </h2>
                <p className="f-mono" style={{ fontSize: '0.73rem', color: 'rgba(250,248,245,0.28)', marginBottom: '4rem' }}>
          // Details withheld under NDA
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ name, industry, challenge, system, tech, impact, index }) {
    const [hov, setHov] = useState(false)
    return (
        <div className="proj-card"
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? 'rgba(201,168,76,0.035)' : T.card,
                border: `1px solid ${hov ? T.borderH : T.border}`,
                borderRadius: '2rem', padding: '2.5rem',
                transition: 'all 0.35s ease',
                transform: hov ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hov ? '0 24px 60px rgba(0,0,0,0.3)' : 'none',
            }}>
            {/* Top row */}
            <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem'
            }}>
                <div>
                    <span className="f-mono" style={{
                        fontSize: '0.65rem', letterSpacing: '0.1em',
                        color: 'rgba(250,248,245,0.3)'
                    }}>0{index + 1}</span>
                    <h3 style={{
                        fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '1.35rem',
                        letterSpacing: '-0.03em', color: T.ivory, marginTop: '0.25rem'
                    }}>{name}</h3>
                </div>
                <span style={{
                    background: 'rgba(201,168,76,0.12)', color: T.gold,
                    fontFamily: 'JetBrains Mono,monospace', fontSize: '0.68rem', letterSpacing: '0.07em',
                    padding: '0.25rem 0.85rem', borderRadius: 999
                }}>{industry}</span>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}
                className="proj-grid">
                <Field label="Challenge" text={challenge} />
                <Field label="System Built" text={system} />
                <div>
                    <p className="f-mono" style={{
                        fontSize: '0.62rem', letterSpacing: '0.12em',
                        color: T.muted, marginBottom: '0.6rem'
                    }}>KEY TECHNOLOGIES</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {tech.map(t => (
                            <span key={t} style={{
                                background: 'rgba(250,248,245,0.06)',
                                border: '1px solid rgba(250,248,245,0.1)',
                                borderRadius: '0.5rem', padding: '0.2rem 0.65rem',
                                fontFamily: 'JetBrains Mono,monospace', fontSize: '0.72rem', color: 'rgba(250,248,245,0.65)'
                            }}>{t}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="f-mono" style={{
                        fontSize: '0.62rem', letterSpacing: '0.12em',
                        color: T.muted, marginBottom: '0.6rem'
                    }}>BUSINESS IMPACT</p>
                    <p style={{
                        fontFamily: 'Inter,sans-serif', fontSize: '0.95rem', fontWeight: 600,
                        color: T.gold, lineHeight: 1.5
                    }}>{impact}</p>
                </div>
            </div>
        </div>
    )
}

function Field({ label, text }) {
    return (
        <div>
            <p className="f-mono" style={{
                fontSize: '0.62rem', letterSpacing: '0.12em',
                color: T.muted, marginBottom: '0.6rem'
            }}>{label.toUpperCase()}</p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', color: 'rgba(250,248,245,0.8)', lineHeight: 1.65 }}>{text}</p>
        </div>
    )
}
