import { useEffect, useRef, useState } from 'react'
import { Wrench, Settings, ShieldCheck, TrendingUp } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function WhyAIHuman() {
    const { t } = useI18n()
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
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">{t('whyAIHuman.eyebrow')}</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">{t('whyAIHuman.title')}</h2>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed">
                        {t('whyAIHuman.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { icon: Wrench, titleKey: 'setupSupport', descKey: 'setupSupportDesc' },
                        { icon: Settings, titleKey: 'workflowCustomization', descKey: 'workflowCustomizationDesc' },
                        { icon: ShieldCheck, titleKey: 'qualityControl', descKey: 'qualityControlDesc' },
                        { icon: TrendingUp, titleKey: 'continuousOptimization', descKey: 'continuousOptimizationDesc' },
                    ].map((card, i) => {
                        const Icon = card.icon
                        return (
                            <div key={card.titleKey}
                                className={`bg-white rounded-2xl border border-black/[0.06] p-6 md:p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#1e3a5f]/15
                                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${0.08 * i}s` }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#1e3a5f]/[0.06] mb-5">
                                    <Icon size={20} color="#1e3a5f" />
                                </div>
                                <h3 className="f-sans font-bold text-[1.05rem] text-[#1C1C1E] mb-2">{t(`whyAIHuman.${card.titleKey}`)}</h3>
                                <p className="f-supp text-[0.85rem] text-black/50 leading-relaxed">{t(`whyAIHuman.${card.descKey}`)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
