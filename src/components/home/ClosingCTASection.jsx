import { ArrowRight, Mail } from 'lucide-react'

export default function ClosingCTASection() {
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="closing" className="relative overflow-hidden py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-gradient-to-br from-[#1e3a5f] to-[#0f172a]">
            {/* Decorative glow */}
            <div aria-hidden className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, rgba(234,88,12,0) 70%)' }} />
            <div aria-hidden className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[400px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.2) 0%, rgba(30,58,95,0) 70%)' }} />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-white mb-4">
                    Build Your Reliable AI Workforce with Enreal Lab
                </h2>
                <p className="f-supp text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-8 md:mb-9">
                    From first consultation to full operations, we are your partner in making AI work reliably for your business.
                </p>

                <div className="flex flex-wrap gap-3.5 justify-center">
                    <button onClick={() => go('consultation')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-sans text-sm font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 hover:bg-[#C2410C] active:scale-[0.98] transition-all duration-300 ease-out">
                        Book a Free Consultation <ArrowRight size={15} />
                    </button>

                    <a href="mailto:hello@enreallab.com.hk" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.08] text-white font-sans text-sm font-medium border border-white/15 transition-all duration-300 ease-out hover:bg-white/15 active:scale-[0.98]">
                        <Mail size={15} /> hello@enreallab.com.hk
                    </a>
                </div>
            </div>
        </section>
    )
}
