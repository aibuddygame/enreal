import { ArrowRight, LayoutGrid } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function HeroSection() {
    const { t } = useI18n()
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="hero" className="relative min-h-[90dvh] flex items-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-[5vw]">
            {/* Background glow */}
            <div aria-hidden className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, rgba(30,58,95,0) 70%)' }} />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left: Text */}
                    <div className="order-2 lg:order-1">
                        <p className="f-mono text-[0.7rem] tracking-[0.2em] text-[#EA580C] mb-6 uppercase">
                            {t('hero.eyebrow')}
                        </p>

                        <h1 className="f-sans font-black text-4xl sm:text-5xl lg:text-[3.6rem] tracking-tight leading-[1.08] text-[#1e3a5f] mb-5 whitespace-pre-line">
                            {t('hero.title')}
                        </h1>

                        <p className="f-sans font-semibold text-xl sm:text-2xl text-[#1C1C1E] mb-4">
                            {t('hero.subtitle')}
                        </p>

                        <p className="f-supp text-base sm:text-lg text-black/55 leading-relaxed max-w-lg mb-9">
                            {t('hero.description')}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3.5">
                            <button onClick={() => go('consultation')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-sans text-sm font-bold shadow-lg shadow-orange-500/30 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:bg-[#C2410C] active:scale-[0.98]">
                                {t('hero.ctaPrimary')} <ArrowRight size={15} />
                            </button>
                            <button onClick={() => go('ai-workforce')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-black/60 font-sans text-sm font-medium border border-black/10 transition-all duration-300 ease-out hover:bg-orange-500/[0.05] hover:text-black/80 hover:border-black/15 active:scale-[0.98]">
                                <LayoutGrid size={15} /> {t('hero.ctaSecondary')}
                            </button>
                        </div>
                    </div>

                    {/* Right: Cover Image */}
                    <div className="order-1 lg:order-2 flex items-center justify-center">
                        <img
                            src="/ai-employee-hero.png"
                            alt="AI Workforce - Professional AI employees working alongside human teams"
                            className="w-full aspect-[4/3] rounded-3xl object-cover border border-[#1e3a5f]/10 shadow-lg shadow-[#1e3a5f]/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
