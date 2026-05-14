import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileSpreadsheet, Settings, Rocket, TrendingUp } from 'lucide-react'

const steps = [
    {
        num: '01',
        icon: MessageSquare,
        title: 'Consultation',
        desc: 'We discuss your business workflows, pain points, and goals to identify the right AI employees for your team.',
    },
    {
        num: '02',
        icon: FileSpreadsheet,
        title: 'Planning',
        desc: 'We design a tailored implementation roadmap, defining integrations, workflows, and success metrics.',
    },
    {
        num: '03',
        icon: Settings,
        title: 'Setup',
        desc: 'We configure and deploy your AI employees, connect them to your existing tools, and train your team.',
    },
    {
        num: '04',
        icon: Rocket,
        title: 'Operations',
        desc: 'Your AI workforce goes live, handling daily tasks while our human team monitors and supports.',
    },
    {
        num: '05',
        icon: TrendingUp,
        title: 'Improvement',
        desc: 'We continuously optimize performance, add capabilities, and scale your AI workforce as you grow.',
    },
]

export default function WorkflowSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="workflow" ref={ref} style={{ padding: '6rem 5vw', background: '#F8FAFC' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    textAlign: 'center', maxWidth: 640, margin: '0 auto 4rem',
                    opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}>
                    <p className="f-mono" style={{
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        color: '#2563EB', marginBottom: '1rem', textTransform: 'uppercase',
                    }}>
                        Process
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        How We Build Your AI Workforce
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        From first conversation to full operation — a clear, proven process that delivers results.
                    </p>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', gap: 0,
                    position: 'relative',
                }}>
                    {/* Timeline line */}
                    <div style={{
                        position: 'absolute', left: 28, top: 0, bottom: 0,
                        width: 2, background: 'rgba(37,99,235,0.1)',
                    }} className="timeline-line" />

                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={step.num} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
                                padding: '1.5rem 0',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                                transition: `all 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${0.1 * i}s`,
                                position: 'relative',
                            }}>
                                {/* Icon bubble */}
                                <div style={{
                                    width: 56, height: 56, borderRadius: '50%',
                                    background: '#fff',
                                    border: '2px solid rgba(37,99,235,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0, zIndex: 1,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                }}>
                                    <Icon size={22} color="#2563EB" />
                                </div>

                                {/* Content */}
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '1rem',
                                    padding: '1.5rem 2rem',
                                    border: '1px solid rgba(28,28,30,0.06)',
                                    flex: 1,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <span className="f-mono" style={{
                                            fontSize: '0.7rem', letterSpacing: '0.1em',
                                            color: '#2563EB', fontWeight: 700,
                                        }}>{step.num}</span>
                                        <h3 style={{
                                            fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                            fontSize: '1.1rem', color: '#1C1C1E',
                                        }}>{step.title}</h3>
                                    </div>
                                    <p style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontSize: '0.9rem', color: 'rgba(28,28,30,0.55)',
                                        lineHeight: 1.7,
                                    }}>{step.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .timeline-line { left: 22px !important; }
                }
            `}</style>
        </section>
    )
}
