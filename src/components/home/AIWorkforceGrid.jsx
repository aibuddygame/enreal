import { useEffect, useRef, useState } from 'react'

export default function AIWorkforceGrid({ employees, onSelect }) {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="ai-workforce" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="section-container">
                <div className={`section-header mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="section-eyebrow">Our AI Workforce</p>
                    <h2 className="section-title">Build Your AI Workforce</h2>
                    <p className="section-desc">
                        Choose from nine specialized AI employees, each designed to handle specific business functions with human oversight.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {employees.map((emp, i) => (
                        <button
                            key={emp.id}
                            onClick={() => onSelect(emp.id)}
                            className={`group text-left cursor-pointer bg-white rounded-2xl border border-black/[0.06] p-5 md:p-7 flex flex-col gap-4
                                transition-all duration-500 ease-out
                                hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/25
                                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            style={{ transitionDelay: `${0.06 * i}s` }}
                        >
                            {/* Employee image */}
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative bg-gradient-to-br from-[#f0f4ff] to-[#e8eeff]">
                                <img
                                    src={emp.image}
                                    alt={emp.name}
                                    className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            <div>
                                <h3 className="f-sans font-bold text-[1.05rem] text-[#1C1C1E] mb-1.5">{emp.name}</h3>
                                <p className="f-supp text-[0.85rem] text-black/50 leading-relaxed">{emp.summary}</p>
                            </div>

                            <span className="mt-auto inline-flex items-center gap-1 font-sans text-[0.78rem] font-semibold text-[#2563EB] group-hover:gap-2 transition-all duration-300">
                                Learn more →
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
