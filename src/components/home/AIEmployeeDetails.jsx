import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, UserCircle } from 'lucide-react'

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
        <section id="ai-employee-details" className="pt-8 pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="section-container">
                <div className="section-header mb-10 md:mb-14">
                    <p className="section-eyebrow">Meet Your AI Employees</p>
                    <h2 className="section-title">Detailed Capabilities</h2>
                </div>

                <div className="flex flex-col gap-16 md:gap-20">
                    {employees.map((emp, idx) => {
                        const isVisible = visibleIds.has(emp.id)
                        const isEven = idx % 2 === 0
                        return (
                            <div
                                key={emp.id}
                                id={emp.id}
                                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            >
                                {/* Image */}
                                <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                                    <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e8eeff]">
                                        <img
                                            src={emp.image}
                                            alt={emp.name}
                                            className="w-full h-full object-cover block"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                                    <h3 className="f-sans font-extrabold text-2xl md:text-3xl text-[#1C1C1E] mb-3">{emp.name}</h3>
                                    <p className="f-supp text-[0.95rem] text-black/55 leading-relaxed mb-7">
                                        {emp.summary}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* AI Functions */}
                                        <div>
                                            <p className="f-sans font-bold text-[0.8rem] text-[#2563EB] mb-3 uppercase tracking-wider">AI Functions</p>
                                            <ul className="space-y-2.5">
                                                {emp.functions.map(f => (
                                                    <li key={f} className="flex items-start gap-2 f-supp text-[0.85rem] text-black/65 leading-snug">
                                                        <CheckCircle2 size={14} color="#2563EB" className="mt-0.5 flex-shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Human Support */}
                                        <div>
                                            <p className="f-sans font-bold text-[0.8rem] text-[#EA580C] mb-3 uppercase tracking-wider">Human Support</p>
                                            <ul className="space-y-2.5">
                                                {emp.humanSupport.map(h => (
                                                    <li key={h} className="flex items-start gap-2 f-supp text-[0.85rem] text-black/65 leading-snug">
                                                        <UserCircle size={14} color="#EA580C" className="mt-0.5 flex-shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <button onClick={goConsult} className="btn-primary mt-7">
                                        <span className="slide bg-[#1D4ED8]" />
                                        <span className="label flex items-center gap-1.5">
                                            Hire This AI Employee <ArrowRight size={13} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
