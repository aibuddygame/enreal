import { useEffect, useRef, useState } from 'react'
import { Code, BarChart3, FileText, Palette, Share2, Headphones, Calendar, Users, Calculator } from 'lucide-react'

const iconMap = {
    'ai-coding-engineer': Code,
    'ai-data-analyst': BarChart3,
    'ai-report-specialist': FileText,
    'ai-creative-director': Palette,
    'ai-social-media-influencer': Share2,
    'ai-customer-service': Headphones,
    'ai-secretary': Calendar,
    'ai-hr-manager': Users,
    'ai-accountant': Calculator,
}

export default function AIWorkforceGrid({ employees, onSelect }) {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="ai-workforce" ref={ref} style={{ padding: '6rem 5vw', background: '#F8FAFC' }}>
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
                        Our AI Workforce
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        Build Your AI Workforce
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        Choose from nine specialized AI employees, each designed to handle specific business functions with human oversight.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {employees.map((emp, i) => {
                        const Icon = iconMap[emp.id] || Code
                        return (
                            <button
                                key={emp.id}
                                onClick={() => onSelect(emp.id)}
                                style={{
                                    background: '#fff',
                                    borderRadius: '1.25rem',
                                    padding: '1.75rem',
                                    border: '1px solid rgba(28,28,30,0.06)',
                                    textAlign: 'left', cursor: 'pointer',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `all 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${0.06 * i}s`,
                                    display: 'flex', flexDirection: 'column', gap: '1rem',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)'
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(28,28,30,0.06)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                {/* Image placeholder */}
                                <div style={{
                                    width: '100%', aspectRatio: '16/10',
                                    borderRadius: '0.875rem',
                                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden', position: 'relative',
                                }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: 'rgba(37,99,235,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Icon size={22} color="#2563EB" />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                        fontSize: '1.05rem', color: '#1C1C1E',
                                        marginBottom: '0.35rem',
                                    }}>{emp.name}</h3>
                                    <p style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontSize: '0.85rem', color: 'rgba(28,28,30,0.5)',
                                        lineHeight: 1.6,
                                    }}>{emp.summary}</p>
                                </div>

                                <span style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                                    fontWeight: 600, color: '#2563EB',
                                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                    marginTop: 'auto',
                                }}>
                                    Learn more →
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
