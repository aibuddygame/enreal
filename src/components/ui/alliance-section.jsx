import { Users, FlaskConical, Briefcase, Landmark } from 'lucide-react'

const T = {
    bg: '#FFFFFF',
    surface: '#F7F9FB',
    text: '#181818',
    muted: '#5A5A5A',
    border: 'rgba(0,0,0,0.08)',
    primary: '#0176D3',
}

const ICONS = [
    <Users className="h-6 w-6" />,
    <FlaskConical className="h-6 w-6" />,
    <Briefcase className="h-6 w-6" />,
    <Landmark className="h-6 w-6" />,
]

export function AllianceSection({ t }) {
    const a = t.allianceSection
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="alliance" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{a.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem', color: T.text }}>{a.title}</h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: T.primary, lineHeight: 1.4, marginBottom: '1.5rem' }}>{a.subtitle}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', color: T.muted, lineHeight: 1.8, maxWidth: 700, margin: '0 auto 2rem' }} dangerouslySetInnerHTML={{ __html: a.description }} />
                </div>

                {/* Four Pillars */}
                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                    {a.pillars.map((pillar, i) => (
                        <div key={i} style={{ background: T.bg, borderRadius: '1.5rem', padding: '2rem', border: `1px solid ${T.border}`, transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ width: 48, height: 48, borderRadius: '1rem', background: '#E8F4FD', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: T.primary }}>
                                {ICONS[i]}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', color: T.text }}>{pillar.title}</h3>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: T.primary, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{pillar.subtitle}</p>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', color: T.muted, lineHeight: 1.7 }}>{pillar.desc}</p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}
