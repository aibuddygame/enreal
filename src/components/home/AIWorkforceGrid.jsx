import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function AIWorkforceGrid({ employees, onSelect }) {
    const { t, getAIEmployees } = useI18n()
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="ai-workforce" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">{t('aiWorkforceGrid.eyebrow')}</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">{t('aiWorkforceGrid.title')}</h2>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed">
                        {t('aiWorkforceGrid.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {getAIEmployees(employees).map((emp, i) => (
                        <button
                            key={emp.id}
                            onClick={() => onSelect(emp.id)}
                            className={`group text-left cursor-pointer bg-white rounded-2xl border border-black/[0.06] p-5 md:p-6 flex flex-col gap-4
                                transition-all duration-500 ease-out
                                hover:-translate-y-1 hover:shadow-xl hover:border-[#1e3a5f]/20
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

                            <span className="mt-auto inline-flex items-center gap-1 font-sans text-[0.78rem] font-semibold text-[#EA580C] group-hover:gap-2 transition-all duration-300">
                                {t('aiWorkforceGrid.learnMore')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
