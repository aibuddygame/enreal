import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const T = {
    text: '#FFFFFF',
    muted: '#A1A1AA',
    accent: '#FFFFFF', // Clean white accent for borders/interactions
    border: 'rgba(255,255,255,0.08)',
    shadow: '0 4px 24px rgba(0,0,0,0.6)',
    shadowH: '0 8px 32px rgba(0,0,0,0.8)',
}

const NAV = [
    { label: 'Program', id: 'program' },
    { label: 'Outcomes', id: 'outcomes' },
    { label: 'Curriculum', id: 'curriculum' },
    { label: 'For Who', id: 'for-who' },
    { label: 'FAQ', id: 'faq' },
]

export default function IndividualNavbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isLanding = location.pathname === '/individual'

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
            { threshold: 0.2 }
        )
        NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
        return () => obs.disconnect()
    }, [isLanding])

    const go = (id) => {
        setOpen(false)
        if (isLanding) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/individual', { state: { scrollTo: id } })
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
                background: scrolled ? 'rgba(11,11,12,0.85)' : 'rgba(11,11,12,0)',
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
                    Enreal<span style={{ color: T.text }}> AI</span>
                </button>

                {/* Desktop links */}
                <div className="nav-d" style={{ display: 'flex', gap: '0.15rem' }}>
                    {NAV.map(({ label, id }) => (
                        <button key={id} onClick={() => go(id)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '0.4rem 0.8rem', borderRadius: 999,
                                fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', fontWeight: 500,
                                color: (isLanding && active === id) ? T.text : T.muted,
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = T.text}
                            onMouseLeave={e => e.currentTarget.style.color = (isLanding && active === id) ? T.text : T.muted}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Page Switcher */}
                <button onClick={() => navigate('/business')} className="nav-d" style={{
                    marginLeft: '1.25rem', padding: '0.5rem 1rem', borderRadius: 999,
                    background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, cursor: 'pointer',
                    fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', fontWeight: 600, color: T.text,
                    whiteSpace: 'nowrap', transition: 'background 0.2s',
                }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                    Switch to Business <ArrowRight size={10} style={{ marginLeft: '4px', display: 'inline' }} />
                </button>

                {/* CTA */}
                <button onClick={() => go('contact')} className="nav-d" style={{
                    marginLeft: '0.5rem', padding: '0.55rem 1.15rem', borderRadius: 999,
                    background: '#F5F5F7', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#0B0B0C',
                    whiteSpace: 'nowrap', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem'
                }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Join Updates <ArrowRight size={12} />
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
                    background: 'rgba(11,11,12,0.97)', backdropFilter: 'blur(24px)',
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
                                color: (isLanding && active === id) ? T.text : T.muted, textAlign: 'left'
                            }}>
                            {label}
                        </button>
                    ))}

                    {/* Page Switcher (Mobile) */}
                    <button onClick={() => navigate('/business')}
                        style={{
                            background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, cursor: 'pointer',
                            padding: '0.65rem 0.75rem', borderRadius: '0.875rem', marginTop: '0.25rem',
                            fontFamily: 'Inter,sans-serif', fontSize: '0.95rem', fontWeight: 600,
                            color: T.text, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                        Switch to Business <ArrowRight size={14} />
                    </button>

                    <button onClick={() => go('contact')}
                        style={{
                            marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.875rem',
                            background: '#F5F5F7', border: 'none', cursor: 'pointer',
                            fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0B0B0C'
                        }}>
                        Join Updates
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
