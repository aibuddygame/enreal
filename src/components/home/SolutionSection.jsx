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
        <section id="solution" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="section-container">
                <div className={`section-header mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="section-eyebrow">Our Approach</p>
                    <h2 className="section-title">Reliable = AI + Human</h2>
                    <p className="section-desc">
                        We combine agentic AI capabilities with dedicated human implementation support to deliver outcomes you can trust.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* AI Column */}
                    <div className={`rounded-3xl p-6 md:p-10 border border-blue-500/10 bg-gradient-to-b from-[#f8faff] to-white transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                        style={{ transitionDelay: '0.1s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="card-icon bg-blue-500/10">
                                <Bot size={20} color="#2563EB" />
                            </div>
                            <h3 className="f-sans font-bold text-[1.15rem] text-[#1C1C1E]">Agentic AI Capabilities</h3>
                        </div>
                        <ul className="space-y-0">
                            {aiCaps.map(c => (
                                <li key={c} className="flex items-start gap-2.5 py-2.5 border-b border-black/[0.05] last:border-0 f-supp text-[0.92rem] text-black/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Human Column */}
                    <div className={`rounded-3xl p-6 md:p-10 border border-orange-500/10 bg-gradient-to-b from-[#fff8f5] to-white transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                        style={{ transitionDelay: '0.2s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="card-icon bg-orange-500/10">
                                <UserCheck size={20} color="#EA580C" />
                            </div>
                            <h3 className="f-sans font-bold text-[1.15rem] text-[#1C1C1E]">Dedicated Human Support</h3>
                        </div>
                        <ul className="space-y-0">
                            {humanCaps.map(c => (
                                <li key={c} className="flex items-start gap-2.5 py-2.5 border-b border-black/[0.05] last:border-0 f-supp text-[0.92rem] text-black/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Key message box */}
                <div className={`mt-8 lg:mt-10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '0.3s' }}>
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Shield size={20} color="#fff" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="f-sans font-bold text-base md:text-[1.05rem] text-white mb-1">
                            Every AI employee is backed by a dedicated human staff member
                        </p>
                        <p className="f-supp text-[0.88rem] text-white/65 leading-relaxed">
                            You are never left alone with automation. Our team monitors, validates, and steps in whenever human judgment is required.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
