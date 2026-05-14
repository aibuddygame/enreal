import { useEffect, useRef, useState } from 'react'
import { Bot, UserCheck, Shield } from 'lucide-react'

export default function SolutionSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    const aiCaps = [
        '24/7 execution without fatigue',
        'Handles repetitive tasks at scale',
        'Integrates with your existing tools',
        'Learns and improves over time',
    ]
    const humanCaps = [
        'Strategic direction and oversight',
        'Quality assurance and validation',
        'Complex problem-solving',
        'Relationship and client management',
    ]

    return (
        <section id="solution" ref={ref} style={{ padding: '6rem 5vw', background: '#FFFFFF' }}>
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
                        Our Approach
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        Reliable = AI + Human
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        We combine agentic AI capabilities with dedicated human implementation support to deliver outcomes you can trust.
                    </p>
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
                }} className="solution-grid">
                    {/* AI Column */}
                    <div style={{
                        background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)',
                        borderRadius: '1.5rem',
                        padding: '2.5rem',
                        border: '1px solid rgba(37,99,235,0.1)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                        transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: 'rgba(37,99,235,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Bot size={20} color="#2563EB" />
                            </div>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                fontSize: '1.15rem', color: '#1C1C1E',
                            }}>Agentic AI Capabilities</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {aiCaps.map(c => (
                                <li key={c} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                    padding: '0.65rem 0',
                                    borderBottom: '1px solid rgba(28,28,30,0.05)',
                                    fontFamily: 'Manrope, sans-serif',
                                    fontSize: '0.92rem', color: 'rgba(28,28,30,0.7)',
                                }}>
                                    <span style={{
                                        width: 5, height: 5, borderRadius: '50%',
                                        background: '#2563EB', marginTop: '0.5rem', flexShrink: 0,
                                    }} />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Human Column */}
                    <div style={{
                        background: 'linear-gradient(180deg, #fff8f5 0%, #ffffff 100%)',
                        borderRadius: '1.5rem',
                        padding: '2.5rem',
                        border: '1px solid rgba(234,88,12,0.1)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateX(0)' : 'translateX(20px)',
                        transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: 'rgba(234,88,12,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <UserCheck size={20} color="#EA580C" />
                            </div>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                fontSize: '1.15rem', color: '#1C1C1E',
                            }}>Dedicated Human Support</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {humanCaps.map(c => (
                                <li key={c} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                    padding: '0.65rem 0',
                                    borderBottom: '1px solid rgba(28,28,30,0.05)',
                                    fontFamily: 'Manrope, sans-serif',
                                    fontSize: '0.92rem', color: 'rgba(28,28,30,0.7)',
                                }}>
                                    <span style={{
                                        width: 5, height: 5, borderRadius: '50%',
                                        background: '#EA580C', marginTop: '0.5rem', flexShrink: 0,
                                    }} />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Key message box */}
                <div style={{
                    marginTop: '2.5rem',
                    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
                    borderRadius: '1.25rem',
                    padding: '2rem 2.5rem',
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s',
                }} className="solution-banner">
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <Shield size={20} color="#fff" />
                    </div>
                    <div>
                        <p style={{
                            fontFamily: 'Inter, sans-serif', fontWeight: 700,
                            fontSize: '1.05rem', color: '#fff', marginBottom: '0.25rem',
                        }}>
                            Every AI employee is backed by a dedicated human staff member
                        </p>
                        <p style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6,
                        }}>
                            You are never left alone with automation. Our team monitors, validates, and steps in whenever human judgment is required.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .solution-grid { grid-template-columns: 1fr !important; }
                    .solution-banner { flex-direction: column; text-align: center; padding: 1.75rem !important; }
                }
            `}</style>
        </section>
    )
}
