import { useEffect, useRef, useState } from 'react'
import { ArrowRight, LayoutGrid } from 'lucide-react'

const PHRASES = [
    'operations.',
    'reporting.',
    'marketing.',
    'customer service.',
    'software workflows.',
]

const TYPING_MS = 65
const DELETING_MS = 32
const PAUSE_MS = 1400

export default function HeroSection() {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing')
    const [phraseIdx, setPhraseIdx] = useState(0)
    const tRef = useRef(null)

    useEffect(() => {
        const target = PHRASES[phraseIdx]
        let cancelled = false
        const schedule = (fn, delay) => {
            tRef.current = setTimeout(() => { if (!cancelled) fn() }, delay)
        }
        if (phase === 'typing') {
            if (display.length < target.length) {
                schedule(() => setDisplay(target.slice(0, display.length + 1)), TYPING_MS)
            } else {
                setPhase('paused')
            }
        }
        if (phase === 'paused') {
            schedule(() => setPhase('deleting'), PAUSE_MS)
        }
        if (phase === 'deleting') {
            if (display.length > 0) {
                schedule(() => setDisplay(d => d.slice(0, -1)), DELETING_MS)
            } else {
                schedule(() => {
                    setPhraseIdx(i => (i + 1) % PHRASES.length)
                    setPhase('typing')
                }, 200)
            }
        }
        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx])

    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b)

    const badges = ['Reliable', 'AI + Human', 'Agentic', 'Practical', 'Operational']

    return (
        <section id="hero" className="relative min-h-dvh flex items-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-[5vw]">
            {/* Background glow */}
            <div aria-hidden className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0) 70%)' }} />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Text */}
                    <div className="order-2 lg:order-1">
                        <p className="f-mono text-[0.7rem] tracking-[0.2em] text-[#2563EB] mb-6 uppercase">
                            Enreal Lab — Hong Kong
                        </p>

                        <h1 className="f-sans font-black text-4xl sm:text-5xl lg:text-[3.8rem] tracking-tight leading-[1.08] text-[#1C1C1E] mb-1">
                            Your Reliable AI Workforce Partner
                        </h1>

                        {/* Typewriter */}
                        <div className="relative mb-6 mt-2">
                            <h2 aria-hidden className="f-sans font-extrabold text-2xl sm:text-3xl lg:text-[2.6rem] tracking-tight leading-[1.15] invisible pointer-events-none select-none whitespace-pre-wrap">
                                {LONGEST}
                            </h2>
                            <h2 className="absolute top-0 left-0 right-0 f-sans font-extrabold text-2xl sm:text-3xl lg:text-[2.6rem] tracking-tight leading-[1.15] text-[#2563EB] whitespace-pre-wrap">
                                {display}
                                <span className="tw-cursor inline-block w-[0.06em] h-[0.85em] bg-[#2563EB] ml-[0.05em] align-middle rounded-sm" />
                            </h2>
                        </div>

                        <p className="f-supp text-base sm:text-lg text-black/60 leading-relaxed max-w-md mb-8">
                            We help businesses deploy reliable AI employees across operations, reporting, marketing, customer service, administration, and software workflows.
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-9">
                            {badges.map(b => (
                                <span key={b} className="px-3.5 py-1.5 rounded-full bg-blue-500/[0.06] border border-blue-500/[0.12] font-sans text-[0.78rem] font-semibold text-[#2563EB]">
                                    {b}
                                </span>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3.5">
                            <button onClick={() => go('consultation')} className="btn-primary">
                                <span className="slide bg-[#1D4ED8]" />
                                <span className="label flex items-center gap-1.5">
                                    Book a Free Consultation <ArrowRight size={15} />
                                </span>
                            </button>
                            <button onClick={() => go('ai-workforce')} className="btn-secondary">
                                <span className="slide bg-blue-500/[0.08]" />
                                <span className="label flex items-center gap-1.5">
                                    <LayoutGrid size={15} /> Explore AI Employees
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Cover Image */}
                    <div className="order-1 lg:order-2 flex items-center justify-center">
                        <img
                            src="/ai-employee-hero.png"
                            alt="AI Workforce - Professional AI employees working alongside human teams"
                            className="w-full aspect-[4/3] rounded-3xl object-cover border border-blue-500/10 shadow-lg shadow-blue-500/15"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
