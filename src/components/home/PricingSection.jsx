import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function PricingSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="pricing" ref={ref} className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-white">
            <div className="max-w-3xl mx-auto text-center">
                <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">Pricing</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">Flexible Deployment Based On Your Workflow</h2>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed mb-8">
                        Every business has different workflows. We provide customized pricing based on the AI employees selected, workflow complexity, integrations, and support level.
                    </p>

                    <button onClick={() => go('consultation')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-sans text-sm font-bold shadow-lg shadow-orange-500/30 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:bg-[#C2410C] active:scale-[0.98]">
                        Book a Free Consultation <ArrowRight size={15} />
                    </button>

                    <p className="f-supp text-[0.8rem] text-black/35 mt-5">
                        We will recommend a suitable deployment plan after understanding your business needs.
                    </p>
                </div>
            </div>
        </section>
    )
}
