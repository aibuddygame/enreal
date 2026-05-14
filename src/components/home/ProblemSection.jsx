import { useEffect, useRef, useState } from 'react'
import { Repeat, Users, Database, Headphones, Brain } from 'lucide-react'

const problems = [
    {
        icon: Repeat,
        title: 'Repetitive Workflows',
        desc: 'Teams spend hours on manual data entry, reporting, and routine tasks that drain productivity.',
    },
    {
        icon: Users,
        title: 'Overloaded Teams',
        desc: 'Skilled staff are buried in operational work instead of focusing on high-value strategy.',
    },
    {
        icon: Database,
        title: 'Fragmented Data',
        desc: 'Information is scattered across systems, making it impossible to get a unified view.',
    },
    {
        icon: Headphones,
        title: 'Inconsistent Support',
        desc: 'Customer service quality varies by shift, leading to frustrated clients and lost revenue.',
    },
    {
        icon: Brain,
        title: 'Lack AI Expertise',
        desc: 'You know AI can help, but you do not have the in-house talent to implement it reliably.',
    },
]

export default function ProblemSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="problem" ref={ref} style={{
            padding: '6rem 5vw',
            background: '#F8FAFC',
        }}>
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
                        The Challenge
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        Businesses Want AI, But Reliable Implementation Is Still Difficult
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        Most companies struggle to move from AI curiosity to operational reality. You need more than tools — you need a reliable partner.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {problems.map((p, i) => {
                        const Icon = p.icon
                        return (
                            <div key={p.title} style={{
                                background: '#fff',
                                borderRadius: '1.25rem',
                                padding: '1.75rem',
                                border: '1px solid rgba(28,28,30,0.06)',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                transition: `all 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${0.1 * i}s`,
                            }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: 'rgba(37,99,235,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.1rem',
                                }}>
                                    <Icon size={20} color="#2563EB" strokeWidth={1.8} />
                                </div>
                                <h3 style={{
                                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                    fontSize: '1.05rem', color: '#1C1C1E',
                                    marginBottom: '0.5rem',
                                }}>{p.title}</h3>
                                <p style={{
                                    fontFamily: 'Manrope, sans-serif',
                                    fontSize: '0.88rem', color: 'rgba(28,28,30,0.5)',
                                    lineHeight: 1.65,
                                }}>{p.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
