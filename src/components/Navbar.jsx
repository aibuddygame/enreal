import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { NAV, T } from '../data.js'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isLanding = location.pathname === '/business'
    const isIndividual = location.pathname === '/individual'

    useEffect(() => {
        if (isLanding) {
            const hero = document.getElementById('hero')
            if (!hero) return
            const obs = new IntersectionObserver(
                ([e]) => setScrolled(!e.isIntersecting), { threshold: 0.1 }
            )
            obs.observe(hero)
            return () => obs.disconnect()
        } else {
            setScrolled(true)
        }
    }, [isLanding, location.pathname])

    useEffect(() => {
        if (!isLanding) return
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
            { threshold: 0.3 }
        )
        NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
        return () => obs.disconnect()
    }, [isLanding])

    const go = (id) => {
        setOpen(false)
        if (isLanding) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/business', { state: { scrollTo: id } })
        }
    }

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            display: 'flex', justifyContent: 'center',
            padding: '1rem 1rem', pointerEvents: 'none',
        }}>
            <nav aria-label="Main navigation" style={{
                pointerEvents: 'all',
                display: 'flex', alignItems: 'center',
                padding: '0.45rem 0.45rem 0.45rem 1.35rem',
                borderRadius: 999,
                background: scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0)',
                backdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'none',
                border: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
                boxShadow: scrolled ? T.shadow : 'none',
                transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}>
                {/* Logo — Enreal AI */}
                <button onClick={() => navigate('/')} aria-label="Go to home"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '1.05rem',
                        letterSpacing: '-0.04em', color: T.text, paddingRight: '1.25rem', whiteSpace: 'nowrap'
                    }}>
                    Enreal<span style={{ color: T.accent }}> AI</span>
                </button>

                {/* Desktop links */}
                <div className="nav-d" style={{ display: 'flex', gap: '0.15rem' }}>
                    {NAV.map(({ label, id }) => (
                        <button key={id} onClick={() => go(id)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '0.4rem 0.8rem', borderRadius: 999,
                                fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', fontWeight: 500,
                                color: (isLanding && active === id) ? T.accent : T.muted,
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = T.text}
                            onMouseLeave={e => e.currentTarget.style.color = (isLanding && active === id) ? T.accent : T.muted}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Page Switcher */}
                {(isLanding || isIndividual) && (
                    <button onClick={() => navigate(isLanding ? '/individual' : '/business')} className="nav-d" style={{
                        marginLeft: '1.25rem', padding: '0.5rem 1rem', borderRadius: 999,
                        background: 'rgba(0,0,0,0.03)', border: `1px solid ${T.border}`, cursor: 'pointer',
                        fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', fontWeight: 600,
                        color: isLanding ? '#059669' : '#2563EB',
                        whiteSpace: 'nowrap', transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.07)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}>
                        Switch to {isLanding ? 'Individual' : 'Business'}
                    </button>
                )}

                {/* CTA */}
                <button onClick={() => go('contact')} className="nav-d btn-mag" style={{
                    marginLeft: '0.5rem', padding: '0.55rem 1.15rem', borderRadius: 999,
                    background: T.accent, border: 'none',
                    fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#fff',
                    whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(37,99,235,0.28)',
                }}>
                    <span className="slide" style={{ background: T.accentD }} />
                    <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Book a Consultation <ArrowRight size={12} />
                    </span>
                </button>

                {/* Mobile toggle */}
                <button onClick={() => setOpen(v => !v)} className="nav-m" aria-label="Toggle navigation"
                    style={{
                        display: 'none', marginLeft: '0.5rem', background: 'none',
                        border: `1px solid ${T.border}`, borderRadius: 999,
                        padding: '0.38rem 0.75rem', cursor: 'pointer',
                        color: T.text, fontFamily: 'JetBrains Mono,monospace', fontSize: '0.8rem'
                    }}>
                    {open ? '✕' : '☰'}
                </button>
            </nav>

            {open && (
                <div role="dialog" aria-label="Navigation menu" style={{
                    position: 'absolute', top: 'calc(100% - 0.5rem)', left: '1rem', right: '1rem',
                    background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)',
                    border: `1px solid ${T.border}`, borderRadius: '1.5rem',
                    padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.15rem',
                    pointerEvents: 'all', boxShadow: T.shadowH,
                }}>
                    {NAV.map(({ label, id }) => (
                        <button key={id} onClick={() => go(id)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '0.65rem 0.75rem', borderRadius: '0.875rem',
                                fontFamily: 'Inter,sans-serif', fontSize: '0.95rem',
                                color: (isLanding && active === id) ? T.accent : T.text, textAlign: 'left'
                            }}>
                            {label}
                        </button>
                    ))}

                    {/* Page Switcher (Mobile) */}
                    {(isLanding || isIndividual) && (
                        <button onClick={() => navigate(isLanding ? '/individual' : '/business')}
                            style={{
                                background: 'rgba(0,0,0,0.03)', border: `1px solid ${T.border}`, cursor: 'pointer',
                                padding: '0.65rem 0.75rem', borderRadius: '0.875rem', marginTop: '0.25rem',
                                fontFamily: 'Inter,sans-serif', fontSize: '0.95rem', fontWeight: 600,
                                color: isLanding ? '#059669' : '#2563EB', textAlign: 'left'
                            }}>
                            Switch to {isLanding ? 'Individual' : 'Business'}
                        </button>
                    )}

                    <button onClick={() => go('contact')}
                        style={{
                            marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.875rem',
                            background: T.accent, border: 'none', cursor: 'pointer',
                            fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff'
                        }}>
                        Book a Consultation
                    </button>
                </div>
            )}

            <style>{`
        @media (max-width:768px) {
          .nav-d { display:none !important; }
          .nav-m { display:block !important; }
        }
      `}</style>
        </header>
    )
}
