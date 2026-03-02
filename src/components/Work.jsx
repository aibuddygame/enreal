import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { PROJECTS, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
    const ref = useRef(null)
    const navigate = useNavigate()
    // null = default spotlight on first card; otherwise the hovered index
    const [hoveredIdx, setHoveredIdx] = useState(null)

    // Active index: when no hover → leftmost (0); when hovering → that card
    const activeIdx = hoveredIdx !== null ? hoveredIdx : 0

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate ONLY transform (y), never opacity — prevents invisible-card bug
            gsap.from('.work-card', {
                y: 36,
                duration: 0.8,
                stagger: 0.13,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 88%',  // fires as soon as top of section is 88% down viewport
                    once: true,
                },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="work" style={{ padding: '8rem 5vw', background: T.bg, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '1.25rem' }}>
          // SELECTED WORK
                </p>
                <div style={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem'
                }}>
                    <h2 style={{
                        fontFamily: 'Inter,sans-serif', fontWeight: 800,
                        fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.035em', color: T.text
                    }}>
                        Proof Through{' '}
                        <span style={{ color: T.accent }}>Execution</span>
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope,sans-serif', fontSize: '0.875rem',
                        color: T.muted, maxWidth: 300, lineHeight: 1.65
                    }}>
                        Selected case studies. Real intelligence. Measurable outcomes.

                    </p>
                </div>

                {/* 3-column responsive grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}
                    className="work-grid">
                    {PROJECTS.map((p, i) => (
                        <WorkCard
                            key={p.slug}
                            project={p}
                            isActive={i === activeIdx}
                            onHoverEnter={() => setHoveredIdx(i)}
                            onHoverLeave={() => setHoveredIdx(null)}
                            onClick={() => navigate(`/work/${p.slug}`)}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width:640px)  { .work-grid { grid-template-columns:1fr !important; } }
        @media (min-width:641px) and (max-width:1023px) { .work-grid { grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>
        </section>
    )
}

function WorkCard({ project, isActive, onHoverEnter, onHoverLeave, onClick }) {
    return (
        <article
            className="work-card"
            role="button"
            tabIndex={0}
            aria-label={`View ${project.name} case study`}
            onClick={onClick}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            style={{
                background: T.card,
                border: `1px solid ${isActive ? T.borderH : T.border}`,
                borderRadius: '2rem',
                overflow: 'hidden',
                cursor: 'pointer',
                // Spotlight: active card = full, faded = 0.52 opacity + slight scale down
                opacity: isActive ? 1 : 0.52,
                transform: isActive
                    ? 'translateY(-4px) scale(1.01)'
                    : 'translateY(0) scale(0.98)',
                boxShadow: isActive ? `${T.shadowH}, 0 0 0 1px rgba(37,99,235,0.1)` : T.shadow,
                filter: isActive ? 'none' : 'grayscale(0.25)',
                transition: 'all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)',
                outline: 'none',
            }}
            onFocus={() => onHoverEnter()}
            onBlur={() => onHoverLeave()}
        >
            {/* Thumbnail — 16:10 */}
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={project.thumb}
                    alt={`${project.name} thumbnail`}
                    loading="lazy"
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        transform: isActive ? 'scale(1.04)' : 'scale(1)',
                        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                />
                {/* Category pill */}
                <span style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'rgba(37,99,235,0.92)',
                    fontFamily: 'JetBrains Mono,monospace', fontSize: '0.65rem',
                    letterSpacing: '0.08em', color: '#fff',
                    padding: '0.22rem 0.75rem', borderRadius: 999,
                    backdropFilter: 'blur(8px)',
                }}>
                    {project.category}
                </span>
            </div>

            {/* Card body */}
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.1rem',
                    letterSpacing: '-0.025em', color: T.text, marginBottom: '0.4rem',
                }}>
                    {project.name}
                </h3>
                <p style={{
                    fontFamily: 'Inter,sans-serif', fontSize: '0.84rem',
                    color: T.muted, lineHeight: 1.6, marginBottom: '1.25rem',
                }}>
                    {project.summary}
                </p>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600,
                    color: isActive ? T.accent : T.muted,
                    transition: 'color 0.2s',
                }}>
                    View Case Study <ArrowRight size={13} />
                </div>
            </div>
        </article>
    )
}
