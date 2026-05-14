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
        <section id="deployment" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="section-container">
                <div className={`section-header mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="section-eyebrow">Deployment</p>
                    <h2 className="section-title">Flexible AI Workforce Deployment</h2>
                    <p className="section-desc">
                        Choose the deployment model that fits your organization's size, maturity, and compliance needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {models.map((m, i) => {
                        const Icon = m.icon
                        return (
                            <div key={m.title}
                                className={`relative rounded-3xl p-7 md:p-9 transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                                    ${m.highlight
                                        ? 'bg-gradient-to-b from-[#f0f4ff] to-white border-2 border-blue-500/20 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10'
                                        : 'bg-white border border-black/[0.06] hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/20'}`}
                                style={{ transitionDelay: `${0.1 * i}s` }}>
                                {m.highlight && (
                                    <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#2563EB] text-white font-sans text-[0.7rem] font-bold px-4 py-1.5 rounded-b-lg flex items-center gap-1">
                                        <Star size={12} /> Recommended
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${m.highlight ? 'bg-blue-500/10' : 'bg-black/[0.04]'}`}>
                                    <Icon size={22} color={m.highlight ? '#2563EB' : '#1C1C1E'} />
                                </div>

                                <h3 className="f-sans font-bold text-[1.15rem] text-[#1C1C1E] mb-3">{m.title}</h3>
                                <p className="f-supp text-[0.9rem] text-black/55 leading-relaxed mb-5">{m.desc}</p>

                                <div className={`rounded-xl p-4 ${m.highlight ? 'bg-blue-500/[0.04]' : 'bg-black/[0.03]'}`}>
                                    <p className="f-sans font-semibold text-[0.75rem] text-black/40 mb-1 uppercase tracking-wider">Best For</p>
                                    <p className="f-supp text-[0.85rem] text-black/60 leading-relaxed">{m.bestFor}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
