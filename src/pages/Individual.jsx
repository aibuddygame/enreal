import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowLeft, Mail, AlertCircle, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'
import IndividualNavbar from '../components/IndividualNavbar.jsx'
import Footer from '../components/Footer.jsx'
import { AILogoCloudSection } from '../components/ui/ai-logo-cloud.jsx'
import { Box, Settings, Lock, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils.js'

gsap.registerPlugin(ScrollTrigger)

// Minimal Light/Grey Preset
const T = {
    bg: '#FFFFFF',
    surface: '#F5F5F7',
    text: '#0B0B0C',
    muted: '#52525B',
    border: 'rgba(0,0,0,0.08)',
}

// ── DATA ─────────────────────────────────────────────────────────


const OUTCOMES = [
    {
        title: 'Build operational AI agents from scratch',
        desc: 'Deploy autonomous systems hooked directly into your company knowledge.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop' // Minimal wireframe/circuit
    },
    {
        title: 'Automate real, multi-step business workflows',
        desc: 'Replace manual execution with logic-driven routing and API triggers.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' // Data screen
    },
    {
        title: 'Integrate multi-tool systems via API',
        desc: 'Connect isolated platforms (CRM, ERP, Comms) into unified pipelines.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' // Server/Infrastructure
    },
    {
        title: 'Deliver working MVP solutions to stakeholders',
        desc: 'Move past ideation. Present functioning systems that prove immediate value.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop' // Presentation/meeting
    },
    {
        title: 'Present execution outcomes with technical authority',
        desc: 'Speak the language of modern engineering. Lead technical system adoption.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' // Professional group planning
    }
]

const CURRICULUM = [
    {
        phase: 'Module 1',
        title: 'AI Communication & Executive Framing',
        subtitle: 'Control the Narrative in the AI Era',
        desc: 'Modern professionals are judged by clarity — not effort.\nIn this module, you learn how to use AI to structure thinking, refine communication, and present ideas with executive precision.',
        learn: [
            'How Large Language Models work in real business contexts',
            'Structured prompting frameworks for professional communication',
            'Turning messy notes into executive-ready updates',
            'Converting raw ideas into structured presentations'
        ],
        tools: ['ChatGPT / Claude', 'AI-assisted presentation tools (PowerPoint Copilot / Gamma)']
    },
    {
        phase: 'Module 2',
        title: 'AI Data & Performance Intelligence',
        subtitle: 'Own the Numbers. Own the Room.',
        desc: 'Managers today must interpret data — not just report it.\nThis module upgrades your analytical leverage using AI-assisted data workflows and reporting systems.',
        learn: [
            'Cleaning and structuring messy datasets using AI',
            'Generating formulas and insights automatically',
            'Turning KPIs into actionable summaries',
            'Converting analysis into decision-ready narratives'
        ],
        tools: ['Excel / Google Sheets with AI assistance', 'ChatGPT Advanced Data Analysis']
    },
    {
        phase: 'Module 3',
        title: 'Build Your Team’s AI Copilot',
        subtitle: 'Turn Knowledge into Strategic Power',
        desc: 'When knowledge lives only in documents or individuals, execution slows.\nThis module teaches you how to transform internal knowledge into an interactive AI assistant for real workflows.',
        learn: [
            'How knowledge-based AI systems work (RAG simplified)',
            'Converting SOPs and policies into searchable assistants',
            'Improving response accuracy through instruction design',
            'Designing AI support aligned with team operations'
        ],
        tools: ['Custom GPT (OpenAI GPT Builder)', 'Notion AI / NotebookLM']
    },
    {
        phase: 'Module 4',
        title: 'AI Tool Builder Lab',
        subtitle: 'From Operator to Builder',
        desc: 'The future belongs to professionals who build tools — not just use them.\nIn this final module, you will create your own AI-powered internal application using AI-assisted coding or no-code platforms.',
        learn: [
            'Turning business problems into tool concepts',
            'Using AI to generate and refine code',
            'Understanding APIs and workflow logic (business-level view)',
            'Deploying a simple internal web application'
        ],
        tools: ['Cursor (AI-assisted coding)', 'Replit / Vercel deployment', 'OR no-code platforms (Retool / Glide)']
    }
]

// ── PAGE COMPONENT ───────────────────────────────────────────────

export default function IndividualPage() {
    const mainRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.config({ nullTargetWarn: false })

            // Hero Entrance
            gsap.from('.h-rev', {
                y: 30, opacity: 0,
                duration: 1.2, stagger: 0.08,
                ease: 'power3.out', delay: 0.2
            })

            // Sections Fade
            gsap.utils.toArray('.sec-rev').forEach(sec => {
                gsap.fromTo(sec,
                    { y: 30, opacity: 0 },
                    {
                        scrollTrigger: { trigger: sec, start: 'top 85%' },
                        y: 0, opacity: 1,
                        duration: 1, ease: 'power3.out'
                    }
                )
            })

            // Staggers
            gsap.utils.toArray('.stag-grid').forEach(grid => {
                gsap.fromTo(grid.children,
                    { y: 20, opacity: 0 },
                    {
                        scrollTrigger: { trigger: grid, start: 'top 85%' },
                        y: 0, opacity: 1,
                        duration: 0.8, stagger: 0.1,
                        ease: 'power2.out'
                    }
                )
            })

        }, mainRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={mainRef} style={{ background: T.bg, color: T.text, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <IndividualNavbar />

            {/* Subtle Gradient Atmosphere */}
            <div style={{
                position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
                width: '80vw', height: '60vh', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.03) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <main>
                    <Hero />
                    <TheShift />
                    <LearningOutcomes />
                    <CurriculumOverview />
                    <ForWho />
                    <AILogoCloudSection />
                    <Contact />
                </main>
                <Footer
                    navLinks={[
                        { label: 'Philosophy', id: 'program' },
                        { label: 'Outcomes', id: 'outcomes' },
                        { label: 'Curriculum', id: 'curriculum' },
                        { label: 'For Who', id: 'for-who' },
                        { label: 'Tools', id: 'tools' },
                        { label: 'Enrollment', id: 'contact' }
                    ]}
                    brandText="The intelligence layer for professionals entering an AI-native economy."
                    accentColor="#059669"
                />
            </div>
        </div>
    )
}

// ── SECTIONS ─────────────────────────────────────────────────────

const TYPING_MS = 60
const DELETING_MS = 30
const PAUSE_MS = 1500

const PHRASES = [
    'Your role must evolve.',
    'Execution now requires intelligence.',
    'Architecture is the new advantage.'
]

function Hero() {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing') // typing | paused | deleting
    const [phraseIdx, setPhraseIdx] = useState(0)
    const tRef = useRef(null)

    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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
                }, 220)
            }
        }
        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx])

    const LONGEST = PHRASES.reduce((a, b) => a.length > b.length ? a : b)

    return (
        <section id="hero" style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', position: 'relative' }}>
            <div style={{ maxWidth: 900, marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>

                {/* Eyebrow */}
                <p className="h-rev" style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.22em',
                    color: '#059669', marginBottom: '2.5rem', opacity: 0.85, textTransform: 'uppercase'
                }}>
                    ENREAL AI — HONG KONG
                </p>

                <h1 className="h-rev" style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                    letterSpacing: '-0.04em', lineHeight: 1.05,
                    marginBottom: '0.08em',
                }}>
                    Work is evolving.<br />

                    {/* Dynamic typewriter line */}
                    <div style={{ position: 'relative' }}>
                        <h1 aria-hidden style={{
                            fontFamily: 'Inter, sans-serif', fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                            letterSpacing: '-0.04em', lineHeight: 1.05,
                            visibility: 'hidden', pointerEvents: 'none', userSelect: 'none',
                        }}>
                            {LONGEST}
                        </h1>
                        <h1 style={{
                            position: 'absolute', top: 0, left: 0, right: 0,
                            fontFamily: 'Inter, sans-serif', fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                            letterSpacing: '-0.04em', lineHeight: 1.05,
                            color: '#059669',
                        }}>
                            {display}
                            <span style={{
                                display: 'inline-block',
                                width: '0.08em', height: '0.9em',
                                background: '#059669',
                                marginLeft: '0.05em',
                                verticalAlign: 'middle',
                                borderRadius: 1
                            }} />
                        </h1>
                    </div>
                </h1>
                <p className="h-rev" style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    color: T.muted, lineHeight: 1.75, maxWidth: 500, margin: '2.75rem auto 3rem'
                }}>
                    The intelligence layer for professionals entering an AI-native economy.
                </p>

                <div className="h-rev" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => go('contact')} style={{
                        background: T.text, color: T.bg, padding: '1rem 2rem', border: 'none',
                        borderRadius: 999, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Join Updates <ArrowRight size={16} />
                    </button>
                    <button onClick={() => go('program')} style={{
                        background: 'transparent', color: T.text, padding: '1rem 1.5rem', border: `1px solid ${T.border}`,
                        borderRadius: 999, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        Explore Program
                    </button>
                </div>
            </div>
        </section>
    )
}

function TheShift() {
    return (
        <section id="program" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// LEARNING PHILOSOPHY</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        We do not teach abstract theory.<br />
                        <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: T.muted }}>We teach AI capability for real professional leverage.</span>
                    </h2>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        <GridItem
                            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
                            icon={<Box className="h-4 w-4" />}
                            title="Immediate workplace application"
                            description="Deploy solutions that provide instant business value. No abstract theory, just actionable systems."
                        />
                        <GridItem
                            area="md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]"
                            icon={<Settings className="h-4 w-4" />}
                            title="Progressive capability building"
                            description="Start with simple workflows and scale to complex autonomous agents as your confidence grows."
                        />
                        <GridItem
                            area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]"
                            icon={<Lock className="h-4 w-4" />}
                            title="Practical output over passive learning"
                            description="Build functional MVPs instead of writing academic code. Focus on real-world execution."
                        />
                        <GridItem
                            area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
                            icon={<Sparkles className="h-4 w-4" />}
                            title="Business-first AI literacy"
                            description="Speak the language of modern engineering and lead technical system adoption in your organization."
                        />
                    </ul>
                </div>
            </div>
        </section>
    )
}


const GridItem = ({ area, icon, title, description }) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className="group relative h-full rounded-[1.25rem] border-[1px] border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:rounded-[1.5rem] md:p-8">
                <div className="relative flex flex-1 flex-col justify-between gap-6">
                    <div className="w-fit rounded-lg border-[1px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] p-2.5 text-[#0B0B0C] transition-colors duration-400 group-hover:bg-[#E8E8EB]">
                        {icon}
                    </div>
                    <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#0B0B0C]">
                            {title}
                        </h3>
                        <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-[#52525B]">
                            {description}
                        </h2>
                    </div>
                </div>
            </div>
        </li>
    );
};


function LearningOutcomes() {
    const scrollRef = useRef(null)

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
        }
    }

    return (
        <section id="outcomes" className="sec-rev" style={{ padding: '10rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// OUTCOMES</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', margin: 0 }}>
                            Learning Outcomes
                        </h2>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => scroll(-400)} aria-label="Scroll left" style={{
                            width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`,
                            background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: T.text, transition: 'all 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.background = T.surface}>
                            <ArrowLeft size={18} />
                        </button>
                        <button onClick={() => scroll(400)} aria-label="Scroll right" style={{
                            width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`,
                            background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: T.text, transition: 'all 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.background = T.surface}>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="stag-grid" ref={scrollRef} style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '2rem',
                    overflowX: 'auto',
                    paddingBottom: '2rem', // space for hover lift
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                    maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
                }}>
                    <style>{`
                        .stag-grid::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {OUTCOMES.map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', flexDirection: 'column',
                            borderRadius: '1rem', overflow: 'hidden',
                            border: `1px solid ${T.border}`,
                            background: T.surface,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                            flex: '0 0 auto',
                            width: 'min(85vw, 340px)'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            {/* Image Header */}
                            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    className="outcome-img"
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>

                            {/* Content Body */}
                            <div style={{ padding: '2rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.muted, fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>
                                    0{i + 1}
                                </span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '0.75rem', color: T.text }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CurriculumOverview() {
    return (
        <section id="curriculum" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// CURRICULUM</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        From Operator to Builder.
                    </h2>
                </div>

                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
                    {CURRICULUM.map((c, i) => (
                        <div key={i} className="h-full">
                            <div
                                className="group h-full relative flex flex-col rounded-[1.5rem] bg-white border border-[rgba(0,0,0,0.08)] p-8 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] cursor-default"
                            >
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.muted, marginBottom: '1rem', textTransform: 'uppercase' }}>
                                    {c.phase}
                                </p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.2, letterSpacing: '-0.03em', color: T.text, paddingRight: '1rem' }}>
                                    {c.title}
                                </h3>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#059669', marginBottom: '1.5rem' }}>
                                    {c.subtitle}
                                </h4>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem', whiteSpace: 'pre-line' }}>
                                    {c.desc}
                                </p>

                                <div style={{ flexGrow: 1 }}>
                                    <h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.05em', color: T.text, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>What You'll Learn</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {c.learn.map((t, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.92rem', lineHeight: 1.45 }}>
                                                <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', background: T.muted, marginTop: '0.55rem' }} />
                                                <span>{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

function ForWho() {
    return (
        <section id="for-who" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    // TARGET PROFILE
                </p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
                    Who is this for?
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 800 }}>
                    {['Mid-level Managers', 'Professionals facing AI disruption', 'Entrepreneurs', 'Operators', 'Consultants', 'Career Switchers'].map((p, i) => (
                        <span key={i} style={{
                            padding: '0.75rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999,
                            fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem'
                        }}>
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}


// ── EmailJS credentials ─────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_09wtwnb'
const EMAILJS_TEMPLATE_ID = 'template_qd3ulov'
const EMAILJS_PUBLIC_KEY = 'z4upBtbceRl50m24S'

const DISPLAY_EMAIL = 'hello@enreallab.com.hk'

// ── Validation ──────────────────────────────────────────────
const validate = ({ name, email }) => {
    const errs = {}
    if (!name.trim() || name.trim().length < 2)
        errs.name = 'Please enter your full name (min 2 characters).'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        errs.email = 'Please enter a valid email address.'
    return errs
}

function Contact() {
    const [form, setForm] = useState({ name: '', email: '' })
    const [errs, setErrs] = useState({})
    const [touched, setTouched] = useState({})
    const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

    const set = k => e => {
        const val = e.target.value
        setForm(p => ({ ...p, [k]: val }))
        if (touched[k]) setErrs(validate({ ...form, [k]: val }))
    }

    const touch = k => () => {
        setTouched(p => ({ ...p, [k]: true }))
        setErrs(validate(form))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setTouched({ name: true, email: true })
        const errors = validate(form)
        setErrs(errors)
        if (Object.keys(errors).length > 0) return

        setStatus('sending')
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                },
                EMAILJS_PUBLIC_KEY,
            )
            setStatus('sent')
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
        }
    }

    const inputStyle = k => ({
        width: '100%', background: T.surface, border: `1px solid ${errs[k] && touched[k] ? '#EF4444' : T.border}`,
        padding: '1.25rem', borderRadius: '1rem', color: T.text, fontSize: '0.95rem',
        outline: 'none', transition: 'border 0.2s', fontFamily: 'Inter, sans-serif'
    })
    const onFocus = k => e => {
        if (!errs[k]) e.target.style.borderColor = 'rgba(0,0,0,0.3)'
    }
    const onBlurFn = k => e => {
        touch(k)()
        if (!errs[k]) e.target.style.borderColor = T.border
    }

    return (
        <section id="contact" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>// ENROLLMENT</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                    Start building your intelligence layer.
                </h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, marginBottom: '3rem', fontSize: '1rem' }}>
                    Course details and enrollment will be announced soon. Join the waitlist.
                </p>

                {status === 'sent' ? (
                    <div style={{ padding: '2rem', border: `1px solid ${T.border}`, borderRadius: '1.5rem', color: T.text, background: T.surface }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%', background: 'rgba(5, 150, 105, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                        }}>
                            <span style={{ color: '#059669', fontSize: '1.25rem' }}>✓</span>
                        </div>
                        Waitlist confirmed. We will contact you soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                            <input type="text" placeholder="Full Name" required
                                value={form.name} onChange={set('name')}
                                onBlur={onBlurFn('name')} onFocus={onFocus('name')}
                                style={inputStyle('name')} />
                            {touched.name && errs.name && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <AlertCircle size={12} color="#EF4444" />
                                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#EF4444' }}>{errs.name}</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                            <input type="email" placeholder="Professional Email" required
                                value={form.email} onChange={set('email')}
                                onBlur={onBlurFn('email')} onFocus={onFocus('email')}
                                style={inputStyle('email')} />
                            {touched.email && errs.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <AlertCircle size={12} color="#EF4444" />
                                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#EF4444' }}>{errs.email}</span>
                                </div>
                            )}
                        </div>

                        {status === 'error' && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)',
                                borderRadius: '0.75rem', padding: '0.75rem 1rem'
                            }}>
                                <AlertCircle size={14} color="#EF4444" />
                                <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: '#EF4444' }}>
                                    Failed to enroll. Please email us directly at {DISPLAY_EMAIL}
                                </span>
                            </div>
                        )}

                        <button type="submit" disabled={status === 'sending'} style={{
                            background: T.text, color: T.bg, padding: '1.25rem', border: 'none',
                            borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                            marginTop: '1rem', transition: 'opacity 0.2s', opacity: status === 'sending' ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}>
                            {status === 'sending' ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Initializing...</> : 'Join Updates'}
                        </button>
                    </form>
                )}
            </div>

            <style>{`
                @keyframes spin { to { transform:rotate(360deg); } }
            `}</style>
        </section>
    )
}
