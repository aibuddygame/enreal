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

const T = {
    bg: '#FFFFFF',
    surface: '#F5F5F7',
    text: '#0B0B0C',
    muted: '#52525B',
    border: 'rgba(0,0,0,0.08)',
}

const CONTENT = {
    en: {
        outcomes: [
            { title: 'Tools → Strategy', desc: 'Understand how AI helps companies make money, save costs, and improve efficiency. Transform from an operator to a strategy designer.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
            { title: 'Execution → Design', desc: 'Build Marketing AI workflows, automate documents and reports, and establish data analysis and decision-making frameworks.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
            { title: 'Employee → Indispensable', desc: 'Complete a real AI MVP project, negotiate with results, and become someone the company cannot afford to lose.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
        ],
        curriculum: [
            { phase: 'Phase 1', title: 'AI Mindset + Tool Mastery', subtitle: 'Sessions 1-4', desc: 'Focus: Using AI to help companies make money/save time\n\nContent: Common tools, enterprise implementation (Marketing/Operations), problem-solving frameworks\n\nOutcome: Develop your personal AI proposal', learn: ['How AI helps companies make money/save costs/improve efficiency', 'Marketing AI workflow design', 'Document and report automation', 'Data analysis and decision framework building'] },
            { phase: 'Phase 2', title: 'MVP Practice', subtitle: 'Sessions 5-6', desc: 'Focus: From "thinking" to "doing"\n\nContent: Transform proposals into MVPs, simulate scenarios, mentor-guided optimization\n\nOutcome: Complete a demonstrable real project', learn: ['Transform AI proposals into feasible MVPs', 'Simulate real enterprise scenarios', 'One-on-one mentor guidance', 'Project presentation skills'] },
            { phase: 'Phase 3', title: 'Executive Presentation 🔥', subtitle: 'Session 7', desc: 'Focus: Real "face-to-face with the boss" experience\n\nContent: Presentation methods that impress bosses, student MVP showcase, CEO/MD feedback session\n\nOutcome: Exposure opportunities, job change/partnership opportunities', learn: ['Presentation skills for C-Level reporting', 'Showcasing results in front of real CEO/MD', 'On-the-spot feedback and optimization', 'Building executive network'] }
        ],
        phrases: ['Your role must evolve.', 'Execution now requires intelligence.', 'Architecture is the new advantage.'],
        hero: { eyebrow: 'ENREAL AI — HONG KONG', title: 'Work is evolving.', subtitle: '', desc: 'The intelligence layer for professionals entering an AI-native economy.', ctaPrimary: 'Join Updates', ctaSecondary: 'Explore Program' },
        shift: { eyebrow: '// LEARNING PHILOSOPHY', title: 'We do not teach abstract theory.', subtitle: 'We teach AI capability for real professional leverage.', features: [{ title: 'Immediate workplace application', desc: 'Deploy solutions that provide instant business value. No abstract theory, just actionable systems.' }, { title: 'Progressive capability building', desc: 'Start with simple workflows and scale to complex autonomous agents as your confidence grows.' }, { title: 'Practical output over passive learning', desc: 'Build functional MVPs instead of writing academic code. Focus on real-world execution.' }, { title: 'Business-first AI literacy', desc: 'Speak the language of modern engineering and lead technical system adoption in your organization.' }] },
        outcomesSection: { eyebrow: '// OUTCOMES', title: '7 Sessions, Three Transformations' },
        curriculumSection: { eyebrow: '// CURRICULUM', title: 'From Operator to Builder', subtitle: 'From "thinking" to "doing" to "presenting"', learnTitle: 'What You Will Learn' },
        toolsSection: { eyebrow: '// AI TOOLS', title: 'Manage different AI tools.', subtitle: 'Maximize your capability.' },
        forWho: { eyebrow: '// TARGET AUDIENCE', title: 'Who is this for?', tags: ['Mid-level Managers', 'Professionals facing AI disruption', 'Entrepreneurs', 'Operators', 'Consultants', 'Career Switchers'] },
        pricing: { eyebrow: '// LIMITED OFFER 🔥', title: 'Secure Your Spot Now', originalPrice: 'Original: $15,000', price: '$2,000', spots: 'Only 10 students · Limited spots', features: ['7 practical sessions', 'Real CEO/MD presentation opportunity', 'Personal AI MVP project guidance', 'Post-course community support'], cta: 'Enroll Now' },
        footer: { nav: [{ label: 'Philosophy', id: 'program' }, { label: 'Outcomes', id: 'outcomes' }, { label: 'Curriculum', id: 'curriculum' }, { label: 'For Who', id: 'for-who' }, { label: 'Tools', id: 'tools' }, { label: 'Enrollment', id: 'pricing' }], brandText: 'The intelligence layer for professionals entering an AI-native economy.' }
    },
    zh: {
        outcomes: [
            { title: '工具 → 策略', desc: '理解AI如何幫公司賺錢、慳成本、提升效率。從操作者變成策略設計者。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
            { title: '執行 → 設計', desc: '建立Marketing AI流程、文件與報告自動化、數據分析與決策框架。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
            { title: '員工 → 被看見', desc: '完成一個真實AI MVP項目，用成果講價，成為公司離唔開嘅人。', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
        ],
        curriculum: [
            { phase: 'Phase 1', title: 'AI思維 + 工具掌握', subtitle: 'Sessions 1-4', desc: '聚焦：用AI幫公司賺錢／慳時間\n\n內容：常用工具、企業落地實踐（Marketing/Operations）、解難框架\n\n成果：發展出個人AI提案', learn: ['AI點樣幫公司賺錢／慳成本／提升效率', 'Marketing AI流程設計', '文件與報告自動化', '數據分析與決策框架建立'] },
            { phase: 'Phase 2', title: 'MVP實踐', subtitle: 'Sessions 5-6', desc: '聚焦：從「諗」到「做」\n\n內容：將提案轉化為MVP、模擬場景、導師指導優化\n\n成果：完成一個可展示嘅真實項目', learn: ['將AI提案轉化為可行MVP', '模擬真實企業場景', '導師一對一指導優化', '項目展示技巧'] },
            { phase: 'Phase 3', title: '高管展示 🔥', subtitle: 'Session 7', desc: '聚焦：真實「面對面老闆」體驗\n\n內容：打動老闆嘅展示方法、學員MVP showcase、CEO/MD點評環節\n\n成果：曝光機會、轉工／合作機會', learn: ['向C-Level匯報嘅展示技巧', '真實CEO/MD面前展示成果', '即場反饋與優化建議', '建立高層人脈網絡'] }
        ],
        phrases: ['你的角色必須進化。', '執行現在需要智能。', '架構是新的優勢。'],
        hero: { eyebrow: 'ENREAL AI — 香港', title: '工作正在演變。', subtitle: '', desc: '為進入AI原生經濟的專業人士提供智能層。', ctaPrimary: '了解更多', ctaSecondary: '探索課程' },
        shift: { eyebrow: '// 學習理念', title: '我們不教授抽象理論。', subtitle: '我們教授真實專業槓桿的AI能力。', features: [{ title: '即時職場應用', desc: '部署能提供即時商業價值的解決方案。沒有抽象理論，只有可執行的系統。' }, { title: '漸進式能力構建', desc: '從簡單工作流程開始，隨著信心增長擴展到複雜自主智能體。' }, { title: '實踐產出勝過被動學習', desc: '構建功能性的MVP而非編寫學術代碼。專注於真實世界執行。' }, { title: '業務優先的AI素養', desc: '掌握現代工程語言，引領組織中的技術系統採用。' }] },
        outcomesSection: { eyebrow: '// 學習成果', title: '7堂課，三個轉變' },
        curriculumSection: { eyebrow: '// 課程大綱', title: '從使用工具升級到AI開發', subtitle: '從「諗」到「做」，再到「展示」', learnTitle: '學習內容' },
        toolsSection: { eyebrow: '// AI 工具', title: '學習不同AI工具，強化你的全方位技能', subtitle: '' },
        forWho: { eyebrow: '// 目標學員', title: '這是為誰設計的？', tags: ['中層管理者', '面臨AI顛覆的專業人士', '創業者', '運營人員', '顧問', '轉職者'] },
        pricing: { eyebrow: '// 限時Offer 🔥', title: '立即鎖定你的晉升之路', originalPrice: '原價：$15,000', price: '$2,000', spots: '只收 10 位學員 · 滿額即止', features: ['7堂實戰課程', '真實CEO/MD展示機會', '個人AI MVP項目指導', '課後社群支援'], cta: '立即報名' },
        footer: { nav: [{ label: '學習理念', id: 'program' }, { label: '學習成果', id: 'outcomes' }, { label: '課程大綱', id: 'curriculum' }, { label: '目標學員', id: 'for-who' }, { label: 'AI 工具', id: 'tools' }, { label: '報名方法', id: 'pricing' }], brandText: '為進入AI原生經濟的專業人士提供智能層。' }
    }
}

import { useNavigate, useLocation } from 'react-router-dom'

export default function IndividualPage({ lang: initialLang }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [lang, setLang] = useState(initialLang || 'en')
    const mainRef = useRef(null)
    const t = CONTENT[lang]

    // Sync URL with language selection
    const handleLangChange = (newLang) => {
        setLang(newLang)
        if (newLang === 'zh') {
            navigate('/individual/zh', { replace: true })
        } else {
            navigate('/individual', { replace: true })
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.config({ nullTargetWarn: false })
            gsap.from('.h-rev', { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 })
            gsap.utils.toArray('.sec-rev').forEach(sec => {
                gsap.fromTo(sec, { y: 30, opacity: 0 }, { scrollTrigger: { trigger: sec, start: 'top 85%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
            })
            gsap.utils.toArray('.stag-grid').forEach(grid => {
                gsap.fromTo(grid.children, { y: 20, opacity: 0 }, { scrollTrigger: { trigger: grid, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
            })
        }, mainRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={mainRef} style={{ background: T.bg, color: T.text, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <IndividualNavbar />
            <div style={{ position: 'fixed', top: '100px', right: '20px', zIndex: 100, display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.95)', padding: '8px', borderRadius: '999px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <button onClick={() => handleLangChange('en')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'en' ? '#059669' : 'transparent', color: lang === 'en' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>EN</button>
                <button onClick={() => handleLangChange('zh')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'zh' ? '#DC2626' : 'transparent', color: lang === 'zh' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>中文</button>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <main>
                    <Hero t={t} lang={lang} />
                    <TheShift t={t} />
                    <LearningOutcomes t={t} />
                    <CurriculumOverview t={t} />
                    <ForWho t={t} />
                    <AILogoCloudSection t={t} />
                    <Pricing t={t} />
                </main>
                <Footer navLinks={t.footer.nav} brandText={t.footer.brandText} accentColor="#059669" />
            </div>
        </div>
    )
}

const TYPING_MS = 60
const DELETING_MS = 30
const PAUSE_MS = 1500

function Hero({ t, lang }) {
    const [display, setDisplay] = useState('')
    const [phase, setPhase] = useState('typing')
    const [phraseIdx, setPhraseIdx] = useState(0)
    const tRef = useRef(null)
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const phrases = t.phrases

    useEffect(() => {
        const target = phrases[phraseIdx]
        let cancelled = false
        const schedule = (fn, delay) => { tRef.current = setTimeout(() => { if (!cancelled) fn() }, delay) }
        if (phase === 'typing') { if (display.length < target.length) schedule(() => setDisplay(target.slice(0, display.length + 1)), TYPING_MS); else setPhase('paused') }
        if (phase === 'paused') schedule(() => setPhase('deleting'), PAUSE_MS)
        if (phase === 'deleting') { if (display.length > 0) schedule(() => setDisplay(d => d.slice(0, -1)), DELETING_MS); else schedule(() => { setPhraseIdx(i => (i + 1) % phrases.length); setPhase('typing') }, 220) }
        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx, phrases])

    useEffect(() => { setDisplay(''); setPhase('typing'); setPhraseIdx(0) }, [lang])
    const LONGEST = phrases.reduce((a, b) => a.length > b.length ? a : b)

    return (
        <section id="hero" style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', position: 'relative' }}>
            <div style={{ maxWidth: 900, marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <p className="h-rev" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.22em', color: '#059669', marginBottom: '2.5rem', opacity: 0.85, textTransform: 'uppercase' }}>{t.hero.eyebrow}</p>
                <h1 className="h-rev" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '0.08em' }}>
                    {t.hero.title}<br />
                    <div style={{ position: 'relative' }}>
                        <h1 aria-hidden style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)', letterSpacing: '-0.04em', lineHeight: 1.05, visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>{LONGEST}</h1>
                        <h1 style={{ position: 'absolute', top: 0, left: 0, right: 0, fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: '#059669' }}>
                            {display}<span style={{ display: 'inline-block', width: '0.08em', height: '0.9em', background: '#059669', marginLeft: '0.05em', verticalAlign: 'middle', borderRadius: 1 }} />
                        </h1>
                    </div>
                </h1>
                <p className="h-rev" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', color: T.muted, lineHeight: 1.75, maxWidth: 500, margin: '2.75rem auto 3rem' }}>{t.hero.desc}</p>
                <div className="h-rev" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => go('contact')} style={{ background: T.text, color: T.bg, padding: '1rem 2rem', border: 'none', borderRadius: 999, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{t.hero.ctaPrimary} <ArrowRight size={16} /></button>
                    <button onClick={() => go('program')} style={{ background: 'transparent', color: T.text, padding: '1rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{t.hero.ctaSecondary}</button>
                </div>
            </div>
        </section>
    )
}

function TheShift({ t }) {
    const features = [{ icon: <Box className="h-4 w-4" />, ...t.shift.features[0] }, { icon: <Settings className="h-4 w-4" />, ...t.shift.features[1] }, { icon: <Lock className="h-4 w-4" />, ...t.shift.features[2] }, { icon: <Sparkles className="h-4 w-4" />, ...t.shift.features[3] }]
    return (
        <section id="program" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.shift.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t.shift.title}<br /><span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: T.muted }}>{t.shift.subtitle}</span></h2>
                </div>
                <div style={{ marginTop: '4rem' }}>
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        {features.map((item, i) => (
                            <li key={i} className={cn("min-h-[14rem] list-none", ['md:[grid-area:1/1/2/7]', 'md:[grid-area:1/7/2/13]', 'md:[grid-area:2/1/3/7]', 'md:[grid-area:2/7/3/13]'][i])}>
                                <div className="group relative h-full rounded-[1.25rem] border-[1px] border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:rounded-[1.5rem] md:p-8">
                                    <div className="relative flex flex-1 flex-col justify-between gap-6">
                                        <div className="w-fit rounded-lg border-[1px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] p-2.5 text-[#0B0B0C] transition-colors duration-400 group-hover:bg-[#E8E8EB]">{item.icon}</div>
                                        <div className="space-y-3">
                                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#0B0B0C]">{item.title}</h3>
                                            <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-[#52525B]">{item.desc}</h2>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

function LearningOutcomes({ t }) {
    const scrollRef = useRef(null)
    const scroll = (offset) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' }) }
    return (
        <section id="outcomes" className="sec-rev" style={{ padding: '10rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.outcomesSection.eyebrow}</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', margin: 0 }}>{t.outcomesSection.title}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => scroll(-400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowLeft size={18} /></button>
                        <button onClick={() => scroll(400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowRight size={18} /></button>
                    </div>
                </div>
                <div className="stag-grid" ref={scrollRef} style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {t.outcomes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface, transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', flex: '0 0 auto', width: 'min(85vw, 340px)' }}>
                            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}><img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.muted, fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>0{i + 1}</span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '0.75rem', color: T.text }}>{item.title}</h3>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CurriculumOverview({ t }) {
    return (
        <section id="curriculum" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.curriculumSection.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t.curriculumSection.title}</h2>
                </div>
                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
                    {t.curriculum.map((c, i) => (
                        <div key={i} className="h-full">
                            <div className="group h-full relative flex flex-col rounded-[1.5rem] bg-white border border-[rgba(0,0,0,0.08)] p-8 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.muted, marginBottom: '1rem', textTransform: 'uppercase' }}>{c.phase}</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.2, letterSpacing: '-0.03em', color: T.text, paddingRight: '1rem' }}>{c.title}</h3>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#059669', marginBottom: '1.5rem' }}>{c.subtitle}</h4>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem', whiteSpace: 'pre-line' }}>{c.desc}</p>
                                <div style={{ flexGrow: 1 }}>
                                    <h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.05em', color: T.text, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.curriculumSection.learnTitle}</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {c.learn.map((item, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.92rem', lineHeight: 1.45 }}>
                                                <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', background: T.muted, marginTop: '0.55rem' }} /><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ForWho({ t }) {
    return (
        <section id="for-who" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.forWho.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '3rem' }}>{t.forWho.title}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 800 }}>
                    {t.forWho.tags.map((p, i) => (
                        <span key={i} style={{ padding: '0.75rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem' }}>{p}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Pricing({ t }) {
    return (
        <section id="pricing" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#DC2626', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.pricing.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem' }}>{t.pricing.title}</h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, marginBottom: '2rem', fontSize: '1rem' }}>{t.pricing.spots}</p>
                
                <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: '2rem', padding: '3rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', color: T.muted, textDecoration: 'line-through', marginBottom: '0.5rem' }}>{t.pricing.originalPrice}</p>
                    <p style={{ fontSize: '4rem', fontWeight: 700, color: T.text, marginBottom: '2rem', letterSpacing: '-0.02em' }}>{t.pricing.price}</p>
                    
                    <div style={{ margin: '0 0 2rem 0', textAlign: 'left', display: 'inline-block' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {t.pricing.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif', color: T.text, fontSize: '1rem' }}>
                                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div style={{ width: '100%' }}>
                        <button style={{ background: T.text, color: T.bg, padding: '1.25rem 3rem', border: 'none', borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s', width: '100%', maxWidth: 400 }} onClick={() => window.location.href = '#contact'}>
                            {t.pricing.cta}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
