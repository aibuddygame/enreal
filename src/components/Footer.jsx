import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { T } from '../data.js'

const EMAIL = 'hello@enreallab.com.hk'

export default function Footer({ navLinks, brandText, accentColor }) {
    const navigate = useNavigate()
    const location = useLocation()

    const go = (id) => {
        const isLanding = location.pathname === '/' || location.pathname === '/business' || location.pathname === '/individual'
        if (isLanding) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate(location.pathname, { state: { scrollTo: id } })
        }
    }

    return (
        <footer style={{
            background: T.text,
            borderRadius: '4rem 4rem 0 0',
            padding: '5rem 5vw 2.5rem',
            position: 'relative', zIndex: 1,
        }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Top grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}
                    className="footer-grid">

                    {/* Brand */}
                    <div>
                        <h2 style={{
                            fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '1.5rem',
                            letterSpacing: '-0.04em', color: '#fff', marginBottom: '0.75rem'
                        }}>
                            Enreal<span style={{ color: accentColor || T.accent }}> AI</span>
                        </h2>
                        <p style={{
                            fontFamily: 'Manrope,sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)',
                            lineHeight: 1.7, maxWidth: 280, marginBottom: '1.75rem'
                        }}>
                            {brandText || 'The intelligence layer that scales business operations without increasing headcount.'}
                        </p>

                    </div>

                    {/* Nav */}
                    <div>
                        <p className="f-mono" style={{
                            fontSize: '0.6rem', letterSpacing: '0.15em',
                            color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem'
                        }}>NAVIGATION</p>
                        {(navLinks || []).map(({ label, id }) => (
                            <button key={id} onClick={() => go(id)} style={{
                                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)',
                                padding: '0.4rem 0', textAlign: 'left', transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="f-mono" style={{
                            fontSize: '0.6rem', letterSpacing: '0.15em',
                            color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem'
                        }}>CONTACT</p>

                        <a href={`mailto:${EMAIL}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)',
                                textDecoration: 'none', marginBottom: '1.25rem',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                            {EMAIL} <ArrowUpRight size={13} />
                        </a>


                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="pulse-dot" style={{
                            display: 'inline-block', width: 7, height: 7,
                            borderRadius: '50%', background: '#22C55E'
                        }} />
                        <span className="f-mono" style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                            SYSTEM STATUS: OPERATIONAL
                        </span>
                    </div>
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.22)' }}>
                        © Enreal AI 2025 — Hong Kong
                    </span>
                </div>
            </div>

            <style>{`
        @media (max-width:768px) {
          .footer-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
        }
      `}</style>
        </footer>
    )
}

function SocialIcon({ Icon, href, label }) {
    const [hov, setHov] = useState(false)
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                width: 36, height: 36, borderRadius: '50%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: hov ? T.accent : 'rgba(255,255,255,0.08)',
                border: `1px solid ${hov ? T.accent : 'rgba(255,255,255,0.1)'}`,
                color: hov ? '#fff' : 'rgba(255,255,255,0.45)', textDecoration: 'none',
                transform: hov ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
            }}>
            <Icon size={15} />
        </a>
    )
}
