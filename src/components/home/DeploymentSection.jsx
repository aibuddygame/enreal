import { useEffect, useRef, useState } from 'react'
import { Building2, Cloud, Layers, Star } from 'lucide-react'

const models = [
    {
        icon: Building2,
        title: 'Internal AI Operation',
        desc: 'Deploy AI employees within your own infrastructure. Full control, full ownership, managed by your team with our setup support.',
        bestFor: 'Enterprises with dedicated IT teams and strict data governance requirements.',
        highlight: false,
    },
    {
        icon: Cloud,
        title: 'Managed AI Operations',
        desc: 'We host, manage, and operate your AI workforce end-to-end. You get the results; we handle the infrastructure.',
        bestFor: 'SMBs and teams who want immediate results without technical overhead.',
        highlight: false,
    },
    {
        icon: Layers,
        title: 'Hybrid AI Workforce',
        desc: 'The best of both worlds. Critical functions run internally; overflow and specialized tasks are managed by us.',
        bestFor: 'Growing businesses that need flexibility, scalability, and redundancy.',
        highlight: true,
    },
]

export default function DeploymentSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="deployment" ref={ref} style={{ padding: '6rem 5vw', background: '#FFFFFF' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem',
                    opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}>
                    <p className="f-mono" style={{
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        color: '#2563EB', marginBottom: '1rem', textTransform: 'uppercase',
                    }}>
                        Deployment
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        Flexible AI Workforce Deployment
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        Choose the deployment model that fits your organization\'s size, maturity, and compliance needs.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {models.map((m, i) => {
                        const Icon = m.icon
                        return (
                            <div key={m.title} style={{
                                background: m.highlight
                                    ? 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)'
                                    : '#fff',
                                borderRadius: '1.5rem',
                                padding: '2.25rem',
                                border: m.highlight
                                    ? '2px solid rgba(37,99,235,0.2)'
                                    : '1px solid rgba(28,28,30,0.06)',
                                position: 'relative',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                transition: `all 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${0.1 * i}s`,
                            }}>
                                {m.highlight && (
                                    <div style={{
                                        position: 'absolute', top: '-1px', left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: '#2563EB',
                                        color: '#fff',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.7rem', fontWeight: 700,
                                        padding: '0.35rem 1rem',
                                        borderRadius: '0 0 0.5rem 0.5rem',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    }}>
                                        <Star size={12} /> Recommended
                                    </div>
                                )}

                                <div style={{
                                    width: 48, height: 48, borderRadius: 12,
                                    background: m.highlight ? 'rgba(37,99,235,0.1)' : 'rgba(28,28,30,0.04)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.25rem',
                                }}>
                                    <Icon size={22} color={m.highlight ? '#2563EB' : '#1C1C1E'} />
                                </div>

                                <h3 style={{
                                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                    fontSize: '1.15rem', color: '#1C1C1E',
                                    marginBottom: '0.75rem',
                                }}>{m.title}</h3>

                                <p style={{
                                    fontFamily: 'Manrope, sans-serif',
                                    fontSize: '0.9rem', color: 'rgba(28,28,30,0.55)',
                                    lineHeight: 1.7, marginBottom: '1.25rem',
                                }}>{m.desc}</p>

                                <div style={{
                                    background: m.highlight ? 'rgba(37,99,235,0.04)' : 'rgba(28,28,30,0.03)',
                                    borderRadius: '0.75rem',
                                    padding: '1rem 1.25rem',
                                }}>
                                    <p style={{
                                        fontFamily: 'Inter, sans-serif', fontWeight: 600,
                                        fontSize: '0.75rem', color: 'rgba(28,28,30,0.4)',
                                        marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>Best For</p>
                                    <p style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontSize: '0.85rem', color: 'rgba(28,28,30,0.6)',
                                        lineHeight: 1.6,
                                    }}>{m.bestFor}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
