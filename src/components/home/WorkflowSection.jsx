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
        <section id="workflow" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="section-container">
                <div className={`section-header mb-12 md:mb-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="section-eyebrow">Process</p>
                    <h2 className="section-title">How We Build Your AI Workforce</h2>
                    <p className="section-desc">
                        From first conversation to full operation — a clear, proven process that delivers results.
                    </p>
                </div>

                <div className="relative flex flex-col">
                    {/* Timeline line */}
                    <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-blue-500/10 hidden sm:block" />

                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={step.num}
                                className={`flex items-start gap-4 md:gap-6 py-4 md:py-6 relative transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                style={{ transitionDelay: `${0.1 * i}s` }}>
                                {/* Icon bubble */}
                                <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-500/15 flex items-center justify-center flex-shrink-0 z-10 shadow-sm shadow-black/5">
                                    <Icon size={22} color="#2563EB" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-white rounded-2xl p-5 md:px-8 md:py-6 border border-black/[0.06] hover:border-blue-500/15 hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="f-mono text-[0.7rem] tracking-[0.1em] text-[#2563EB] font-bold">{step.num}</span>
                                        <h3 className="f-sans font-bold text-[1.1rem] text-[#1C1C1E]">{step.title}</h3>
                                    </div>
                                    <p className="f-supp text-[0.9rem] text-black/55 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
