import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function AIEmployeeDetails({ employees }) {
    const [visibleIds, setVisibleIds] = useState(new Set())

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        setVisibleIds(prev => new Set([...prev, e.target.id]))
                    }
                })
            },
            { threshold: 0.12 }
        )
        employees.forEach(emp => {
            const el = document.getElementById(emp.id)
            if (el) obs.observe(el)
        })
        return () => obs.disconnect()
    }, [employees])

    const goConsult = () => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="ai-employee-details" style={{ padding: '2rem 5vw 6rem', background: '#FFFFFF' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
                    <p className="f-mono" style={{
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        color: '#2563EB', marginBottom: '1rem', textTransform: 'uppercase',
                    }}>
                        Meet Your AI Employees
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E',
                    }}>
                        Detailed Capabilities
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                    {employees.map((emp, idx) => {
                        const isVisible = visibleIds.has(emp.id)
                        const isEven = idx % 2 === 0
                        return (
                            <div
                                key={emp.id}
                                id={emp.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '3rem',
                                    alignItems: 'center',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                                }}
                                className="employee-detail"
                            >
                                {/* Image */}
                                <div style={{
                                    order: isEven ? 0 : 1,
                                }} className="employee-img-col">
                                    <div style={{
                                        width: '100%', aspectRatio: '4/3',
                                        borderRadius: '1.5rem',
                                        overflow: 'hidden',
                                        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
                                    }}>
                                        <img
                                            src={emp.image}
                                            alt={emp.name}
                                            style={{
                                                width: '100%', height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ order: isEven ? 1 : 0 }} className="employee-content-col">
                                    <h3 style={{
                                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                                        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                                        color: '#1C1C1E', marginBottom: '0.75rem',
                                    }}>{emp.name}</h3>
                                    <p style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontSize: '0.95rem', color: 'rgba(28,28,30,0.55)',
                                        lineHeight: 1.7, marginBottom: '1.75rem',
                                    }}>{emp.summary}</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="employee-lists">
                                        {/* AI Functions */}
                                        <div>
                                            <p style={{
                                                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                                fontSize: '0.8rem', color: '#2563EB',
                                                marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                                            }}>AI Functions</p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {emp.functions.map(f => (
                                                    <li key={f} style={{
                                                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                                                        fontFamily: 'Manrope, sans-serif',
                                                        fontSize: '0.85rem', color: 'rgba(28,28,30,0.65)',
                                                        lineHeight: 1.5,
                                                    }}>
                                                        <CheckCircle2 size={14} color="#2563EB" style={{ marginTop: 2, flexShrink: 0 }} />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Human Support */}
                                        <div>
                                            <p style={{
                                                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                                fontSize: '0.8rem', color: '#EA580C',
                                                marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                                            }}>Human Support</p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {emp.humanSupport.map(h => (
                                                    <li key={h} style={{
                                                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                                                        fontFamily: 'Manrope, sans-serif',
                                                        fontSize: '0.85rem', color: 'rgba(28,28,30,0.65)',
                                                        lineHeight: 1.5,
                                                    }}>
                                                        <UserCircle size={14} color="#EA580C" style={{ marginTop: 2, flexShrink: 0 }} />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <button onClick={goConsult} className="btn-mag" style={{
                                        marginTop: '1.75rem',
                                        padding: '0.75rem 1.5rem', borderRadius: 999,
                                        background: '#2563EB', border: 'none',
                                        fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                                        fontWeight: 700, color: '#fff',
                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                        cursor: 'pointer',
                                    }}>
                                        <span className="slide" style={{ background: '#1D4ED8' }} />
                                        <span className="label">Hire This AI Employee <ArrowRight size={13} /></span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .employee-detail { grid-template-columns: 1fr !important; gap: 1.75rem !important; }
                    .employee-img-col { order: -1 !important; }
                    .employee-content-col { order: 0 !important; }
                    .employee-lists { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    )
}
