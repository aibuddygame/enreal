import { useEffect, useRef, useState } from 'react'
import { Building2, Megaphone, Landmark, Users } from 'lucide-react'

const audiences = [
    {
        icon: Building2,
        title: 'SMEs',
        desc: 'Small and medium businesses ready to automate operations without hiring a full tech team.',
    },
    {
        icon: Megaphone,
        title: 'Agencies',
        desc: 'Service agencies looking to scale delivery capacity with reliable AI support.',
    },
    {
        icon: Landmark,
        title: 'Enterprises',
        desc: 'Larger organizations needing dedicated implementation support for AI workforce deployment.',
    },
    {
        icon: Users,
        title: 'Teams without AI engineers',
        desc: 'Businesses that want practical AI results without building an in-house engineering department.',
    },
]

export default function WhoThisIsFor() {
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
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">Audience</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">Built For Businesses That Need Practical AI Support</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {audiences.map((a, i) => {
                        const Icon = a.icon
                        return (
                            <div key={a.title}
                                className={`bg-white rounded-2xl border border-black/[0.06] p-6 md:p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#1e3a5f]/15
                                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${0.08 * i}s` }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#1e3a5f]/[0.06] mb-5">
                                    <Icon size={20} color="#1e3a5f" />
                                </div>
                                <h3 className="f-sans font-bold text-[1.05rem] text-[#1C1C1E] mb-2">{a.title}</h3>
                                <p className="f-supp text-[0.85rem] text-black/50 leading-relaxed">{a.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
