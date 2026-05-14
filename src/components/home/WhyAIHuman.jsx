import { useEffect, useRef, useState } from 'react'
import { Wrench, Settings, ShieldCheck, TrendingUp } from 'lucide-react'

const cards = [
    {
        icon: Wrench,
        title: 'Setup Support',
        desc: 'We configure and integrate your AI employees into your existing tools and workflows.',
    },
    {
        icon: Settings,
        title: 'Workflow Customization',
        desc: 'Every business is different. We tailor AI operations to match your specific processes.',
    },
    {
        icon: ShieldCheck,
        title: 'Quality Control',
        desc: 'Human oversight ensures accuracy, brand consistency, and reliable output every time.',
    },
    {
        icon: TrendingUp,
        title: 'Continuous Optimization',
        desc: 'We monitor performance and refine your AI workforce as your business evolves.',
    },
]

export default function WhyAIHuman() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">Why Enreal Lab</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">Reliable AI Needs Human Support</h2>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed">
                        AI tools alone are not enough for real business operations. Enreal Lab provides dedicated specialists who help businesses implement, operate, troubleshoot, and optimize their AI workforce.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cards.map((card, i) => {
                        const Icon = card.icon
                        return (
                            <div key={card.title}
                                className={`bg-white rounded-2xl border border-black/[0.06] p-6 md:p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#1e3a5f]/15
                                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${0.08 * i}s` }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#1e3a5f]/[0.06] mb-5">
                                    <Icon size={20} color="#1e3a5f" />
                                </div>
                                <h3 className="f-sans font-bold text-[1.05rem] text-[#1C1C1E] mb-2">{card.title}</h3>
                                <p className="f-supp text-[0.85rem] text-black/50 leading-relaxed">{card.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
