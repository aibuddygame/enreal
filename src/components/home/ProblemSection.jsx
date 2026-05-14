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
        <section id="problem" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="section-container">
                <div className={`section-header mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="section-eyebrow">The Challenge</p>
                    <h2 className="section-title">
                        Businesses Want AI, But Reliable Implementation Is Still Difficult
                    </h2>
                    <p className="section-desc">
                        Most companies struggle to move from AI curiosity to operational reality. You need more than tools — you need a reliable partner.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {problems.map((p, i) => {
                        const Icon = p.icon
                        return (
                            <div key={p.title}
                                className={`card-base p-6 md:p-7 transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${0.1 * i}s` }}>
                                <div className="card-icon bg-blue-500/[0.08] mb-4">
                                    <Icon size={20} color="#2563EB" strokeWidth={1.8} />
                                </div>
                                <h3 className="f-sans font-bold text-[1.05rem] text-[#1C1C1E] mb-2">{p.title}</h3>
                                <p className="f-supp text-[0.88rem] text-black/50 leading-relaxed">{p.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
