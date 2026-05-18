import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, UserCircle } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function AIEmployeeDetails({ employees }) {
    const { t, getAIEmployees } = useI18n()
    const [visibleIds, setVisibleIds] = useState(new Set())
    const sectionRef = useRef()

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
        <section ref={sectionRef} id="ai-employee-details" className="pt-8 pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">{t('aiEmployeeDetails.eyebrow')}</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">{t('aiEmployeeDetails.title')}</h2>
                </div>

                <div className="flex flex-col gap-16 md:gap-20">
                    {getAIEmployees(employees).map((emp, idx) => {
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
                                    <h3 className="f-sans font-extrabold text-2xl md:text-3xl text-[#1e3a5f] mb-3">{emp.name}</h3>
                                    <p className="f-supp text-[0.95rem] text-black/55 leading-relaxed mb-7">
                                        {emp.summary}
                                    </p>

                                    <div className="mb-6">
                                        <p className="f-sans font-bold text-[0.8rem] text-[#1e3a5f] mb-3 uppercase tracking-wider">{t('aiEmployeeDetails.helpsYou')}</p>
                                        <ul className="space-y-2.5">
                                            {emp.helpsYou.map((f, fi) => (
                                                <li key={fi} className="flex items-start gap-2 f-supp text-[0.85rem] text-black/65 leading-snug">
                                                    <CheckCircle2 size={14} color="#1e3a5f" className="mt-0.5 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="rounded-xl p-4 bg-[#F8FAFC] border border-black/[0.06]">
                                        <p className="f-sans font-bold text-[0.8rem] text-[#EA580C] mb-1 uppercase tracking-wider">{t('aiEmployeeDetails.dedicatedSupport')}</p>
                                        <p className="f-supp text-[0.85rem] text-black/60 leading-relaxed">
                                            {t('aiEmployeeDetails.dedicatedSupportText')}
                                        </p>
                                    </div>

                                    <button onClick={goConsult} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-sans text-sm font-bold shadow-lg shadow-orange-500/30 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:bg-[#C2410C] active:scale-[0.98] mt-7">
                                        {t('aiEmployeeDetails.cta')} <ArrowRight size={13} />
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
