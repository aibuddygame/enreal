import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx'
import { PROJECTS, T } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const idx = PROJECTS.findIndex(p => p.slug === slug)
    const project = PROJECTS[idx]
    const prevP = PROJECTS[idx - 1]
    const nextP = PROJECTS[idx + 1]
    const heroRef = useRef(null)
    const bodyRef = useRef(null)

    // Scroll to top on mount
    useEffect(() => { window.scrollTo(0, 0) }, [slug])

    useEffect(() => {
        if (!project) return
        const ctx = gsap.context(() => {
            // Hero fade-up stagger
            gsap.from('.ph-item', {
                y: 32, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
            })
            // Section reveals
            gsap.utils.toArray('.reveal').forEach(el => {
                gsap.from(el, {
                    y: 24, opacity: 0, duration: 0.75, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
                })
            })
            // Gallery stagger
            gsap.from('.gal-item', {
                y: 20, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: '.gal-section', start: 'top 78%', once: true },
            })
        })
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [slug, project])

    if (!project) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.bg }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: T.muted, marginBottom: '1rem' }}>Project not found.</p>
                    <Link to="/" style={{ color: T.accent, fontFamily: 'Inter,sans-serif', fontSize: '0.875rem' }}>← Back to Home</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="page-enter" style={{ background: T.bg, color: T.text, minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────── */}
            <section ref={heroRef} style={{
                position: 'relative', overflow: 'hidden',
                minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '0 5vw 5.5rem',
            }}>
                {/* Cover image */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${project.heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                {/* Gradient */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 40%, rgba(255,255,255,0.4) 80%, transparent 100%)',
                }} />
                <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
                    <span className="ph-item f-mono" style={{
                        display: 'inline-block', fontSize: '0.68rem', letterSpacing: '0.15em',
                        color: '#fff', background: T.accent, padding: '0.25rem 0.85rem',
                        borderRadius: 999, marginBottom: '1.25rem',
                    }}>{project.category}</span>
                    <h1 className="ph-item" style={{
                        fontFamily: 'Inter,sans-serif', fontWeight: 900,
                        fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.04em',
                        color: T.text, lineHeight: 1.0, marginBottom: '1rem',
                    }}>{project.name}</h1>
                    <p className="ph-item" style={{
                        fontFamily: 'Manrope,sans-serif', fontSize: 'clamp(1rem,2vw,1.2rem)',
                        color: T.muted, lineHeight: 1.65, maxWidth: 560,
                    }}>{project.summary}</p>
                </div>
            </section>

            {/* ── OVERVIEW ─────────────────────────────────────── */}
            <section ref={bodyRef} style={{ padding: '6rem 5vw', background: T.surface }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '3rem' }}
                        className="overview-grid reveal">
                        <OverviewCard label="Challenge" text={project.challenge} />
                        <OverviewCard label="Solution Built" text={project.solution} />
                        <div className="reveal">
                            <p className="f-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, marginBottom: '0.75rem' }}>
                                KEY TECHNOLOGIES
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                {project.tech.map(t => (
                                    <span key={t} style={{
                                        background: T.card, border: `1px solid ${T.border}`,
                                        borderRadius: '0.5rem', padding: '0.25rem 0.7rem',
                                        fontFamily: 'JetBrains Mono,monospace', fontSize: '0.72rem', color: T.text,
                                        boxShadow: T.shadow
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="reveal">
                            <p className="f-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, marginBottom: '0.75rem' }}>
                                BUSINESS IMPACT
                            </p>
                            <p style={{
                                fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '1rem',
                                color: T.accent, lineHeight: 1.55
                            }}>{project.impact}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GALLERY ──────────────────────────────────────── */}
            <section className="gal-section" style={{ padding: '6rem 5vw', background: T.bg }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <p className="f-mono reveal" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '2rem' }}>
            // SHOWCASE
                    </p>
                    {/* Large image */}
                    <div className="gal-item" style={{
                        borderRadius: '2rem', overflow: 'hidden', marginBottom: '1.25rem',
                        aspectRatio: '16/9', boxShadow: T.shadowH,
                    }}>
                        <img src={project.galleryL} alt={`${project.name} showcase`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    {/* Tile grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.25rem' }}>
                        {project.gallery.map((url, i) => (
                            <div key={i} className="gal-item" style={{
                                borderRadius: '1.5rem', overflow: 'hidden',
                                aspectRatio: '3/2', boxShadow: T.shadow,
                            }}>
                                <img src={url} alt={`${project.name} gallery ${i + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ARCHITECTURE PANEL ───────────────────────────── */}
            {project.arch && (
                <section style={{ padding: '4rem 5vw', background: T.surface }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <div className="reveal" style={{
                            background: T.text, borderRadius: '2rem', padding: '2.5rem',
                            boxShadow: T.shadowH,
                        }}>
                            <p className="f-mono" style={{
                                fontSize: '0.68rem', letterSpacing: '0.18em',
                                color: T.accent, marginBottom: '1.5rem'
                            }}>
                // {project.arch.title.toUpperCase()}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {project.arch.steps.map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span className="f-mono" style={{
                                            fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
                                            minWidth: 28
                                        }}>0{i + 1}</span>
                                        <p className="f-mono" style={{
                                            fontSize: '0.82rem', color: 'rgba(255,255,255,0.78)',
                                            lineHeight: 1.5
                                        }}>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── BOTTOM NAV ───────────────────────────────────── */}
            <nav aria-label="Project navigation" style={{ padding: '5rem 5vw', background: T.bg }}>
                <div style={{
                    maxWidth: 1200, margin: '0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <button onClick={() => navigate('/', { state: { scrollTo: 'work' } })}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.55rem',
                            background: 'none', border: `1px solid ${T.border}`, borderRadius: 999,
                            padding: '0.75rem 1.5rem', cursor: 'pointer',
                            fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted,
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => Object.assign(e.currentTarget.style, { borderColor: T.accent, color: T.accent })}
                        onMouseLeave={e => Object.assign(e.currentTarget.style, { borderColor: T.border, color: T.muted })}>
                        <ArrowLeft size={15} /> Back to Work
                    </button>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {prevP && (
                            <Link to={`/work/${prevP.slug}`}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    background: T.surface, border: `1px solid ${T.border}`, borderRadius: 999,
                                    padding: '0.75rem 1.5rem', textDecoration: 'none',
                                    fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, { borderColor: T.accent, color: T.accent })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { borderColor: T.border, color: T.muted })}>
                                <ArrowLeft size={14} /> {prevP.name}
                            </Link>
                        )}
                        {nextP && (
                            <Link to={`/work/${nextP.slug}`}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    background: T.accent, border: 'none', borderRadius: 999,
                                    padding: '0.75rem 1.5rem', textDecoration: 'none',
                                    fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#fff',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = T.accentD}
                                onMouseLeave={e => e.currentTarget.style.background = T.accent}>
                                {nextP.name} <ArrowRight size={14} />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <Footer />
        </div>
    )
}

function OverviewCard({ label, text }) {
    return (
        <div className="reveal">
            <p className="f-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, marginBottom: '0.75rem' }}>
                {label.toUpperCase()}
            </p>
            <p style={{
                fontFamily: 'Inter,sans-serif', fontSize: '0.95rem',
                color: 'rgba(28,28,30,0.75)', lineHeight: 1.7
            }}>{text}</p>
        </div>
    )
}
