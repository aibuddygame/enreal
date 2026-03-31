import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import IndividualNavbar from '../components/IndividualNavbar.jsx'
import Footer from '../components/Footer.jsx'
import { AILogoCloudSection } from '../components/ui/ai-logo-cloud.jsx'
import { Target, Settings, TrendingUp, Users } from 'lucide-react'
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
        phrases: ['下一個被取代嘅可能係你', '你要成為提出方案嗰個', '而唔係被取代嗰個'],
        hero: { eyebrow: '【開場3秒 Hook】', title: '你公司開始講AI轉型——', subtitle: '但你，講唔出一個可行方案', desc: '大部分人學AI，只停留喺「問問題、寫內容、做分析」但企業真正需要係：可以令AI穩定產出結果嘅人', ctaPrimary: '立即報名', ctaSecondary: '了解更多' },
        problem: { eyebrow: '// 主故事', title: '你應該好熟呢個畫面——', subtitle: '老闆喺會議室講：「我哋要做AI轉型」', subtitle2: '然後望住你', cards: [{ title: '你卡住咗', desc: '當你要寫proposal向C-Level解釋點樣真正落地，你卡住。問題唔係你唔夠努力，係你缺咗一套將AI變成「公司可用方案」嘅方法。' }, { title: '老闆失去信心', desc: '佢會話：「搵外面顧問做啦」。Big Four入場，McKinsey入場，幾百萬項目開始。佢哋唔識你公司、唔識你流程、唔識你團隊。' }, { title: '你仍然喺原位', desc: '幾個月後——做咗一堆系統、寫咗一堆流程，但用唔落。AI轉型失敗，而你開始被懷疑。其實最有資格做AI轉型嘅人，一直都係你。' }] },
        solution: { eyebrow: '// 解決方案', title: 'AI中層晉升課程', desc: '唔係教你用AI工具，係教你：👉 設計一套AI工作流👉 建立企業級應用方案👉 用AI直接影響決策', features: [{ title: '工具 → 策略', desc: '你會理解：AI點樣幫公司賺錢、慳成本、提升效率。從操作者變成策略設計者。' }, { title: '執行 → 設計', desc: '你會建立：Marketing AI流程、文件與報告自動化、數據分析與決策框架。' }, { title: '員工 → 被看見', desc: '你會完成一個真實AI MVP項目，用成果講價，成為公司離唔開嘅人。' }, { title: '真實CEO展示', desc: 'Session 7：你會站上台，面對真正CEO/MD，做一場畢業展示。唔係模擬，係真實。' }] },
        outcomesSection: { eyebrow: '// 學習成果', title: '7堂課，三個轉變' },
        curriculumSection: { eyebrow: '// 課程大綱', title: '從使用工具升級到AI開發', subtitle: '從「諗」到「做」，再到「展示」', learnTitle: '學習內容' },
        toolsSection: { eyebrow: '// AI 工具', title: '學習不同AI工具，強化你的全方位技能', subtitle: '' },
        pricing: { eyebrow: '// 限時Offer 🔥', title: '立即鎖定你嘅位置', originalPrice: '原價：$15,000', price: '$2,000', spots: '只收 10 位學員 · 滿額即止', features: ['7堂實戰課程', '真實CEO/MD展示機會', '個人AI MVP項目指導', '課後社群支援'], cta: '立即報名' },
        forWho: { eyebrow: '// 目標學員', title: 'Who is this for?', tags: ['30–45歲中層／中高層', '需要向C-Level或Board匯報', '公司開始做AI，但無方向', '想升職／轉工，但缺成果'] },
        footer: { nav: [{ label: '學習理念', id: 'problem' }, { label: '學習成果', id: 'outcomes' }, { label: '課程大綱', id: 'curriculum' }, { label: '目標學員', id: 'for-who' }, { label: '報名方法', id: 'pricing' }], brandText: '成為公司離唔開嘅人' }
    },
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
        phrases: ['You might be the next to be replaced', 'Be the one who proposes solutions', 'Not the one being replaced'],
        hero: { eyebrow: '// 3-SECOND HOOK', title: 'Your company talks about AI transformation—', subtitle: 'But you cannot propose a feasible solution', desc: 'Most people learning AI only stay at "asking questions, writing content, doing analysis." But what enterprises really need: people who can make AI produce stable results.', ctaPrimary: 'Enroll Now', ctaSecondary: 'Learn More' },
        problem: { eyebrow: '// THE STORY', title: 'You should know this scene well—', subtitle: 'The boss says in the meeting room: "We need AI transformation"', subtitle2: 'Then looks at you', cards: [{ title: 'You are stuck', desc: 'When you need to write a proposal explaining how to truly implement AI for C-Level, you get stuck. The problem is not that you are not working hard enough—it is that you lack a method to turn AI into a "company-usable solution."' }, { title: 'Boss loses confidence', desc: 'They will say: "Let us hire external consultants." Big Four comes in, McKinsey comes in, multi-million dollar projects begin. They do not know your company, your processes, your team.' }, { title: 'You remain in place', desc: 'Months later—systems built, processes written, but not adopted. AI transformation fails, and you start being questioned. In fact, the most qualified person to lead AI transformation has always been you.' }] },
        solution: { eyebrow: '// THE SOLUTION', title: 'AI Mid-Level Promotion Course', desc: 'Not teaching you to use AI tools, but teaching you: 👉 Design an AI workflow 👉 Build enterprise-grade solutions 👉 Directly influence decisions with AI', features: [{ title: 'Tools → Strategy', desc: 'You will understand: How AI helps companies make money, save costs, and improve efficiency. Transform from operator to strategy designer.' }, { title: 'Execution → Design', desc: 'You will build: Marketing AI workflows, document and report automation, data analysis and decision frameworks.' }, { title: 'Employee → Indispensable', desc: 'You will complete a real AI MVP project, negotiate with results, and become someone the company cannot afford to lose.' }, { title: 'Real CEO Presentation', desc: 'Session 7: You will stand on stage, face real CEO/MD, and deliver a graduation presentation. Not simulated—real.' }] },
        outcomesSection: { eyebrow: '// OUTCOMES', title: '7 Sessions, Three Transformations' },
        curriculumSection: { eyebrow: '// CURRICULUM', title: 'From Operator to Builder', subtitle: 'From "thinking" to "doing" to "presenting"', learnTitle: 'What You Will Learn' },
        toolsSection: { eyebrow: '// AI TOOLS', title: 'Manage different AI tools.', subtitle: 'Maximize your capability.' },
        pricing: { eyebrow: '// LIMITED OFFER 🔥', title: 'Secure Your Spot Now', originalPrice: 'Original: $15,000', price: '$2,000', spots: 'Only 10 students · Limited spots', features: ['7 practical sessions', 'Real CEO/MD presentation opportunity', 'Personal AI MVP project guidance', 'Post-course community support'], cta: 'Enroll Now' },
        forWho: { eyebrow: '// TARGET AUDIENCE', title: 'Who is this for?', tags: ['Mid-level managers (30-45)', 'Reporting to C-Level or Board', 'Company starting AI but no direction', 'Want promotion/career change but lack results'] },
        footer: { nav: [{ label: 'Philosophy', id: 'problem' }, { label: 'Outcomes', id: 'outcomes' }, { label: 'Curriculum', id: 'curriculum' }, { label: 'For Who', id: 'for-who' }, { label: 'Enrollment', id: 'pricing' }], brandText: 'Become indispensable to your company' }
    }
}

export default function CoursePage() {
    const [lang, setLang] = useState('zh')
    const mainRef = useRef(null)
    const t = CONTENT[lang]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.config({ nullTargetWarn: false })
            gsap.from('.h-rev', { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 })
            gsap.utils.toArray('.sec-rev').forEach(sec => {
                gsap.fromTo(sec, { y: 30, opacity: 0 }, { scrollTrigger: { trigger: sec, start: 'top 85%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
            })
        }, mainRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={mainRef} style={{ background: T.bg, color: T.text, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <IndividualNavbar />
            <div style={{ position: 'fixed', top: '100px', right: '20px', zIndex: 100, display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.95)', padding: '8px', borderRadius: '999px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <button onClick={() => setLang('en')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'en' ? '#059669' : 'transparent', color: lang === 'en' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>EN</button>
                <button onClick={() => setLang('zh')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'zh' ? '#DC2626' : 'transparent', color: lang === 'zh' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>中文</button>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <main>
                    <Hero t={t} lang={lang} />
                    <TheProblem t={t} />
                    <TheSolution t={t} />
                    <LearningOutcomes t={t} />
                    <CurriculumOverview t={t} />
                    <Pricing t={t} />
                    <ForWho t={t} />
                    <AILogoCloudSection t={t} />
                </main>
                <Footer navLinks={t.footer.nav} brandText={t.footer.brandText} accentColor="#059669" />
            </div>
        </div>
    )
}

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
        if (phase === 'typing') { if (display.length < target.length) schedule(() => setDisplay(target.slice(0, display.length + 1)), 60); else setPhase('paused') }
        if (phase === 'paused') schedule(() => setPhase('deleting'), 1500)
        if (phase === 'deleting') { if (display.length > 0) schedule(() => setDisplay(d => d.slice(0, -1)), 30); else schedule(() => { setPhraseIdx(i => (i + 1) % phrases.length); setPhase('typing') }, 220) }
        return () => { cancelled = true; clearTimeout(tRef.current) }
    }, [display, phase, phraseIdx, phrases])

    useEffect(() => { setDisplay(''); setPhase('typing'); setPhraseIdx(0) }, [lang])
    const LONGEST = phrases.reduce((a, b) => a.length > b.length ? a : b)

    return (
        <section id="hero" style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', position: 'relative' }}>
            <div style={{ maxWidth: 900, marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <p className="h-rev" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.22em', color: '#EF4444', marginBottom: '2.5rem', opacity: 0.85, textTransform: 'uppercase' }}>{t.hero.eyebrow}</p>
                <h1 className="h-rev" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '0.5em' }}>
                    {t.hero.title}<br />{t.hero.subtitle}<br />
                    <div style={{ position: 'relative', marginTop: '0.5em' }}>
                        <h1 aria-hidden style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.15, visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>{LONGEST}</h1>
                        <h1 style={{ position: 'absolute', top: 0, left: 0, right: 0, fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.15, color: '#EF4444' }}>
                            {display}<span style={{ display: 'inline-block', width: '0.08em', height: '0.9em', background: '#EF4444', marginLeft: '0.05em', verticalAlign: 'middle', borderRadius: 1 }} />
                        </h1>
                    </div>
                </h1>
                <p className="h-rev" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', color: T.muted, lineHeight: 1.75, maxWidth: 600, margin: '2rem auto 2.5rem' }}>{t.hero.desc}</p>
                <div className="h-rev" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => go('pricing')} style={{ background: '#EF4444', color: '#FFF', padding: '1rem 2rem', border: 'none', borderRadius: 999, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{t.hero.ctaPrimary} <ArrowRight size={16} /></button>
                    <button onClick={() => go('problem')} style={{ background: 'transparent', color: T.text, padding: '1rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{t.hero.ctaSecondary}</button>
                </div>
            </div>
        </section>
    )
}

function TheProblem({ t }) {
    return (
        <section id="problem" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#EF4444', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.problem.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                        {t.problem.title}<br /><span style={{ color: T.muted }}>{t.problem.subtitle}</span><br />{t.problem.subtitle2}
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    {t.problem.cards.map((card, i) => (
                        <div key={i} style={{ padding: '2rem', background: T.bg, borderRadius: '1rem', border: `1px solid ${T.border}` }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><span style={{ color: '#EF4444', fontSize: '1.2rem' }}>❌</span></div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{card.title}</h3>
                            <p style={{ color: T.muted, fontSize: '0.95rem', lineHeight: 1.6 }}>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TheSolution({ t }) {
    const features = [{ icon: <Target className="h-4 w-4" />, ...t.solution.features[0], area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]' }, { icon: <Settings className="h-4 w-4" />, ...t.solution.features[1], area: 'md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]' }, { icon: <TrendingUp className="h-4 w-4" />, ...t.solution.features[2], area: 'md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]' }, { icon: <Users className="h-4 w-4" />, ...t.solution.features[3], area: 'md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]' }]
    return (
        <section id="solution" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.solution.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t.solution.title}</h2>
                    <p style={{ fontSize: '1.25rem', color: T.muted, marginTop: '1rem', maxWidth: 700, margin: '1rem auto 0', whiteSpace: 'pre-line' }}>{t.solution.desc}</p>
                </div>
                <div style={{ marginTop: '4rem' }}>
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        {features.map((item, i) => (
                            <li key={i} className={cn("min-h-[14rem] list-none", item.area)}>
                                <div className="group relative h-full rounded-[1.25rem] border-[1px] border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:rounded-[1.5rem] md:p-8">
                                    <div className="relative flex flex-1 flex-col justify-between gap-6">
                                        <div className="w-fit rounded-lg border-[1px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] p-2.5 text-[#0B0B0C] transition-colors duration-400 group-hover:bg-[#E8E8EB]">{item.icon}</div>
                                        <div className="space-y-3">
                                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#0B0B0C]">{item.title}</h3>
                                            <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-[#52525B]">{item.desc}</h2>
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
        <section id="outcomes" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.outcomesSection.eyebrow}</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', margin: 0 }}>{t.outcomesSection.title}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => scroll(-400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowLeft size={18} /></button>
                        <button onClick={() => scroll(400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowRight size={18} /></button>
                    </div>
                </div>
                <div className="stag-grid" ref={scrollRef} style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {t.outcomes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${T.border}`, background: T.bg, transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', flex: '0 0 auto', width: 'min(85vw, 380px)' }}>
                            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}><img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.muted, fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>0{i + 1}</span>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.75rem', color: T.text }}>{item.title}</h3>
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
        <section id="curriculum" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.curriculumSection.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{t.curriculumSection.title}</h2>
                    <p style={{ fontSize: '1.1rem', color: T.muted, marginTop: '1rem' }}>{t.curriculumSection.subtitle}</p>
                </div>
                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {t.curriculum.map((c, i) => (
                        <div key={i} className="h-full">
                            <div className="group h-full relative flex flex-col rounded-[1.5rem] bg-white border border-[rgba(0,0,0,0.08)] p-8 md:p-10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.muted, marginBottom: '0.75rem', textTransform: 'uppercase' }}>{c.phase}</p>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.2, letterSpacing: '-0.03em', color: T.text }}>{c.title}</h3>
                                <h4 style={{ fontSize: '1rem', fontWeight: 500, color: '#059669', marginBottom: '1.25rem' }}>{c.subtitle}</h4>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', whiteSpace: 'pre-line' }}>{c.desc}</p>
                                <div style={{ flexGrow: 1 }}>
                                    <h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.05em', color: T.text, marginBottom: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.curriculumSection.learnTitle}</h5>
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

function Pricing({ t }) {
    return (
        <section id="pricing" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#EF4444', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.pricing.eyebrow}</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '2rem' }}>{t.pricing.title}</h2>
                <div style={{ padding: '3rem', background: T.bg, borderRadius: '1.5rem', border: `2px solid #EF4444`, boxShadow: '0 10px 40px rgba(239,68,68,0.1)' }}>
                    <div style={{ textDecoration: 'line-through', color: T.muted, fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.originalPrice}</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#EF4444', marginBottom: '0.5rem' }}>{t.pricing.price}</div>
                    <div style={{ color: T.muted, marginBottom: '2rem' }}>{t.pricing.spots}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', marginBottom: '2rem' }}>
                        {t.pricing.features.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#059669', fontSize: '0.8rem' }}>✓</span></div>
                                <span style={{ fontFamily: 'Manrope, sans-serif', color: T.text }}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <button style={{ width: '100%', background: '#EF4444', color: '#FFF', padding: '1.25rem', border: 'none', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>{t.pricing.cta}</button>
                </div>
            </div>
        </section>
    )
}

function ForWho({ t }) {
    return (
        <section id="for-who" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.forWho.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '3rem' }}>{t.forWho.title}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 800 }}>
                    {t.forWho.tags.map((p, i) => (
                        <span key={i} style={{ padding: '0.75rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem' }}>{p}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}
