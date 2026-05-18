import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileSpreadsheet, Settings, Rocket } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const STEP_ICONS = [MessageSquare, FileSpreadsheet, Settings, Rocket]

export default function WorkflowSection() {
    const { t } = useI18n()
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="workflow" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">{t('workflow.eyebrow')}</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">{t('workflow.title')}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((num, i) => {
                        const Icon = STEP_ICONS[i]
                        return (
                            <div key={num}
                                className={`relative bg-white rounded-2xl border border-black/[0.06] p-6 md:p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#1e3a5f]/15
                                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${0.1 * i}s` }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1e3a5f]/[0.06] mb-5">
                                    <Icon size={22} color="#1e3a5f" />
                                </div>
                                <p className="f-mono text-[0.7rem] tracking-[0.1em] text-[#EA580C] font-bold mb-2">0{num}</p>
                                <h3 className="f-sans font-bold text-[1.1rem] text-[#1C1C1E] mb-2">{t(`workflow.step${num}Title`)}</h3>
                                <p className="f-supp text-[0.9rem] text-black/55 leading-relaxed">{t(`workflow.step${num}Desc`)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
