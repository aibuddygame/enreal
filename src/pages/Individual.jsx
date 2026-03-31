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
            { title: 'Build operational AI agents from scratch', desc: 'Deploy autonomous systems hooked directly into your company knowledge.', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop' },
            { title: 'Automate real, multi-step business workflows', desc: 'Replace manual execution with logic-driven routing and API triggers.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
            { title: 'Integrate multi-tool systems via API', desc: 'Connect isolated platforms (CRM, ERP, Comms) into unified pipelines.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
            { title: 'Deliver working MVP solutions to stakeholders', desc: 'Move past ideation. Present functioning systems that prove immediate value.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop' },
            { title: 'Present execution outcomes with technical authority', desc: 'Speak the language of modern engineering. Lead technical system adoption.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
        ],
        curriculum: [
            { phase: 'Module 1', title: 'AI Communication & Executive Framing', subtitle: 'Control the Narrative in the AI Era', desc: 'Modern professionals are judged by clarity — not effort.\nIn this module, you learn how to use AI to structure thinking, refine communication, and present ideas with executive precision.', learn: ['How Large Language Models work in real business contexts', 'Structured prompting frameworks for professional communication', 'Turning messy notes into executive-ready updates', 'Converting raw ideas into structured presentations'], tools: ['ChatGPT / Claude', 'AI-assisted presentation tools (PowerPoint Copilot / Gamma)'] },
            { phase: 'Module 2', title: 'AI Data & Performance Intelligence', subtitle: 'Own the Numbers. Own the Room.', desc: 'Managers today must interpret data — not just report it.\nThis module upgrades your analytical leverage using AI-assisted data workflows and reporting systems.', learn: ['Cleaning and structuring messy datasets using AI', 'Generating formulas and insights automatically', 'Turning KPIs into actionable summaries', 'Converting analysis into decision-ready narratives'], tools: ['Excel / Google Sheets with AI assistance', 'ChatGPT Advanced Data Analysis'] },
            { phase: 'Module 3', title: "Build Your Team's AI Copilot", subtitle: 'Turn Knowledge into Strategic Power', desc: 'When knowledge lives only in documents or individuals, execution slows.\nThis module teaches you how to transform internal knowledge into an interactive AI assistant for real workflows.', learn: ['How knowledge-based AI systems work (RAG simplified)', 'Converting SOPs and policies into searchable assistants', 'Improving response accuracy through instruction design', 'Designing AI support aligned with team operations'], tools: ['Custom GPT (OpenAI GPT Builder)', 'Notion AI / NotebookLM'] },
            { phase: 'Module 4', title: 'AI Tool Builder Lab', subtitle: 'From Operator to Builder', desc: 'The future belongs to professionals who build tools — not just use them.\nIn this final module, you will create your own AI-powered internal application using AI-assisted coding or no-code platforms.', learn: ['Turning business problems into tool concepts', 'Using AI to generate and refine code', 'Understanding APIs and workflow logic (business-level view)', 'Deploying a simple internal web application'], tools: ['Cursor (AI-assisted coding)', 'Replit / Vercel deployment', 'OR no-code platforms (Retool / Glide)'] }
        ],
        phrases: ['Your role must evolve.', 'Execution now requires intelligence.', 'Architecture is the new advantage.'],
        hero: { eyebrow: 'ENREAL AI — HONG KONG', title: 'Work is evolving.', subtitle: '', desc: 'The intelligence layer for professionals entering an AI-native economy.', ctaPrimary: 'Join Updates', ctaSecondary: 'Explore Program' },
        shift: { eyebrow: '// LEARNING PHILOSOPHY', title: 'We do not teach abstract theory.', subtitle: 'We teach AI capability for real professional leverage.', features: [{ title: 'Immediate workplace application', desc: 'Deploy solutions that provide instant business value. No abstract theory, just actionable systems.' }, { title: 'Progressive capability building', desc: 'Start with simple workflows and scale to complex autonomous agents as your confidence grows.' }, { title: 'Practical output over passive learning', desc: 'Build functional MVPs instead of writing academic code. Focus on real-world execution.' }, { title: 'Business-first AI literacy', desc: 'Speak the language of modern engineering and lead technical system adoption in your organization.' }] },
        outcomesSection: { eyebrow: '// OUTCOMES', title: 'Learning Outcomes' },
        curriculumSection: { eyebrow: '// CURRICULUM', title: 'From Operator to Builder.', learnTitle: "What You'll Learn", toolsTitle: 'Tools Covered' },
        toolsSection: { eyebrow: '// AI TOOLS', title: 'Manage different AI tools.', subtitle: 'Maximize your capability.' },
        forWho: { eyebrow: '// TARGET AUDIENCE', title: 'Who is this for?', tags: ['Mid-level Managers', 'Professionals facing AI disruption', 'Entrepreneurs', 'Operators', 'Consultants', 'Career Switchers'] },
        contact: { eyebrow: '// ENROLLMENT', title: 'Start building your intelligence layer.', desc: 'Course details and enrollment will be announced soon. Join the waitlist.', namePlaceholder: 'Full Name', emailPlaceholder: 'Professional Email', submitBtn: 'Join Updates', sending: 'Initializing...', success: 'Waitlist confirmed. We will contact you soon.', error: 'Failed to enroll. Please email us directly at' },
        footer: { nav: [{ label: 'Philosophy', id: 'program' }, { label: 'Outcomes', id: 'outcomes' }, { label: 'Curriculum', id: 'curriculum' }, { label: 'For Who', id: 'for-who' }, { label: 'Tools', id: 'tools' }, { label: 'Enrollment', id: 'contact' }], brandText: 'The intelligence layer for professionals entering an AI-native economy.' }
    },
    zh: {
        outcomes: [
            { title: '從零開始構建AI智能體', desc: '部署直接接入公司知識庫的自動化系統。', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop' },
            { title: '自動化真實的多步驟業務流程', desc: '用邏輯驅動的路由和API觸發器取代人工執行。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
            { title: '通過API整合多工具系統', desc: '將孤立的平台（CRM、ERP、通訊）連接成統一的流程。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
            { title: '向利益相關者交付可用的MVP解決方案', desc: '超越構思階段。展示能證明即時價值的功能系統。', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop' },
            { title: '以技術權威展示執行成果', desc: '掌握現代工程語言。引領技術系統的採用。', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
        ],
        curriculum: [
            { phase: '模組 1', title: 'AI溝通與高管表達框架', subtitle: '在AI時代掌控敘事權', desc: '現代專業人士以清晰度評判——而非努力程度。\n在本模組中，你將學習如何使用AI構思、精煉溝通，並以高管級精準度展示想法。', learn: ['大型語言模型在真實商業環境中的運作方式', '專業溝通的結構化提示框架', '將雜亂筆記轉化為高管就緒的更新', '將原始想法轉化為結構化演示'], tools: ['ChatGPT / Claude', 'AI輔助演示工具 (PowerPoint Copilot / Gamma)'] },
            { phase: '模組 2', title: 'AI數據與績效智能', subtitle: '掌握數字。掌控全場。', desc: '今天的管理者必須解讀數據——而不只是報告。\n本模組通過AI輔助數據工作流程和報告系統提升你的分析槓桿。', learn: ['使用AI清理和結構化雜亂數據集', '自動生成公式和洞察', '將KPI轉化為可執行的摘要', '將分析轉化為決策就緒的敘事'], tools: ['Excel / Google Sheets with AI assistance', 'ChatGPT Advanced Data Analysis'] },
            { phase: '模組 3', title: '為你的團隊構建AI副駕駛', subtitle: '將知識轉化為戰略力量', desc: '當知識只存在於文件或個人頭腦中，執行就會變慢。\n本模組教你如何將內部知識轉化為真實工作流程的交互式AI助手。', learn: ['基於知識的AI系統如何運作（簡化版RAG）', '將SOP和政策轉化為可搜索的助手', '通過指令設計提高回應準確性', '設計與團隊運營對齊的AI支援'], tools: ['Custom GPT (OpenAI GPT Builder)', 'Notion AI / NotebookLM'] },
            { phase: '模組 4', title: 'AI工具構建實驗室', subtitle: '從操作者到構建者', desc: '未來屬於構建工具的專業人士——而不只是使用它們。\n在最後這個模組中，你將使用AI輔助編碼或無代碼平台創建自己的AI驅動內部應用。', learn: ['將業務問題轉化為工具概念', '使用AI生成和精煉代碼', '理解API和工作流程邏輯（業務層面視角）', '部署簡單的內部網絡應用'], tools: ['Cursor (AI-assisted coding)', 'Replit / Vercel deployment', '或無代碼平台 (Retool / Glide)'] }
        ],
        phrases: ['你的角色必須進化。', '執行現在需要智能。', '架構是新的優勢。'],
        hero: { eyebrow: 'ENREAL AI — 香港', title: '工作正在演變。', subtitle: '', desc: '為進入AI原生經濟的專業人士提供智能層。', ctaPrimary: '了解更多', ctaSecondary: '探索課程' },
        shift: { eyebrow: '// 學習理念', title: '我們不教授抽象理論。', subtitle: '我們教授真實專業槓桿的AI能力。', features: [{ title: '即時職場應用', desc: '部署能提供即時商業價值的解決方案。沒有抽象理論，只有可執行的系統。' }, { title: '漸進式能力構建', desc: '從簡單工作流程開始，隨著信心增長擴展到複雜自主智能體。' }, { title: '實踐產出勝過被動學習', desc: '構建功能性的MVP而非編寫學術代碼。專注於真實世界執行。' }, { title: '業務優先的AI素養', desc: '掌握現代工程語言，引領組織中的技術系統採用。' }] },
        outcomesSection: { eyebrow: '// 學習成果', title: '學習成果' },
        curriculumSection: { eyebrow: '// 課程大綱', title: '從使用工具升級到AI開發', learnTitle: '你將學到什麼', toolsTitle: '涵蓋工具' },
        toolsSection: { eyebrow: '// AI 工具', title: '學習不同AI工具，強化你的全方位技能', subtitle: '' },
        forWho: { eyebrow: '// 目標學員', title: '這是為誰設計的？', tags: ['中層管理者', '面臨AI顛覆的專業人士', '創業者', '運營人員', '顧問', '轉職者'] },
        contact: { eyebrow: '// 報名方法', title: '立刻升級你的AI技能，踏上晉升之路', desc: '加入我們的AI同學會，立刻獲得我們的課程內容', namePlaceholder: '全名', emailPlaceholder: '工作郵箱', submitBtn: '了解更多', sending: '提交中...', success: '已確認加入候補名單。我們將盡快聯繫你。', error: '報名失敗。請直接發郵件至' },
        footer: { nav: [{ label: '學習理念', id: 'program' }, { label: '學習成果', id: 'outcomes' }, { label: '課程大綱', id: 'curriculum' }, { label: '目標學員', id: 'for-who' }, { label: 'AI 工具', id: 'tools' }, { label: '報名方法', id: 'contact' }], brandText: '為進入AI原生經濟的專業人士提供智能層。' }
    }
}

export default function IndividualPage() {
    const [lang, setLang] = useState('en')
    const mainRef = useRef(null)
    const t = CONTENT[lang]

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
                <button onClick={() => setLang('en')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'en' ? '#059669' : 'transparent', color: lang === 'en' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>EN</button>
                <button onClick={() => setLang('zh')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'zh' ? '#DC2626' : 'transparent', color: lang === 'zh' ? 'white' : '#0B0B0C', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>中文</button>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <main>
                    <Hero t={t} lang={lang} />
                    <TheShift t={t} />
                    <LearningOutcomes t={t} />
                    <CurriculumOverview t={t} />
                    <ForWho t={t} />
                    <AILogoCloudSection t={t} />
                    <Contact t={t} />
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

const validate = ({ name, email }) => {
    const errs = {}
    if (!name.trim() || name.trim().length < 2) errs.name = 'Please enter your full name (min 2 characters).'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Please enter a valid email address.'
    return errs
}

function Contact({ t }) {
    const [form, setForm] = useState({ name: '', email: '' })
    const [errs, setErrs] = useState({})
    const [touched, setTouched] = useState({})
    const [status, setStatus] = useState('idle')

    const set = k => e => { const val = e.target.value; setForm(p => ({ ...p, [k]: val })); if (touched[k]) setErrs(validate({ ...form, [k]: val })) }
    const touch = k => () => { setTouched(p => ({ ...p, [k]: true })); setErrs(validate(form)) }

    const handleSubmit = async e => {
        e.preventDefault()
        setTouched({ name: true, email: true })
        const errors = validate(form)
        setErrs(errors)
        if (Object.keys(errors).length > 0) return
        setStatus('sending')
        try {
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { name: form.name, email: form.email }, 'YOUR_PUBLIC_KEY')
            setStatus('sent')
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
        }
    }

    const inputStyle = k => ({ width: '100%', background: T.surface, border: `1px solid ${errs[k] && touched[k] ? '#EF4444' : T.border}`, padding: '1.25rem', borderRadius: '1rem', color: T.text, fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s', fontFamily: 'Inter, sans-serif' })
    const onFocus = k => e => { if (!errs[k]) e.target.style.borderColor = 'rgba(0,0,0,0.3)' }
    const onBlurFn = k => e => { touch(k)(); if (!errs[k]) e.target.style.borderColor = T.border }

    return (
        <section id="contact" className="sec-rev" style={{ padding: '8rem 5vw', background: T.bg }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1rem', textTransform: 'uppercase' }}>{t.contact.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem', whiteSpace: 'nowrap' }}>{t.contact.title}</h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, marginBottom: '3rem', fontSize: '1rem' }}>{t.contact.desc}</p>
                {status === 'sent' ? (
                    <div style={{ padding: '2rem', border: `1px solid ${T.border}`, borderRadius: '1.5rem', color: T.text, background: T.surface }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}><span style={{ color: '#059669', fontSize: '1.25rem' }}>✓</span></div>
                        {t.contact.success}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                            <input type="text" placeholder={t.contact.namePlaceholder} required value={form.name} onChange={set('name')} onBlur={onBlurFn('name')} onFocus={onFocus('name')} style={inputStyle('name')} />
                            {touched.name && errs.name && <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={12} color="#EF4444" /><span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#EF4444' }}>{errs.name}</span></div>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                            <input type="email" placeholder={t.contact.emailPlaceholder} required value={form.email} onChange={set('email')} onBlur={onBlurFn('email')} onFocus={onFocus('email')} style={inputStyle('email')} />
                            {touched.email && errs.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={12} color="#EF4444" /><span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#EF4444' }}>{errs.email}</span></div>}
                        </div>
                        {status === 'error' && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}><AlertCircle size={14} color="#EF4444" /><span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: '#EF4444' }}>{t.contact.error} hello@enreallab.com.hk</span></div>}
                        <button type="submit" disabled={status === 'sending'} style={{ background: T.text, color: T.bg, padding: '1.25rem', border: 'none', borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: status === 'sending' ? 'not-allowed' : 'pointer', marginTop: '1rem', transition: 'opacity 0.2s', opacity: status === 'sending' ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            {status === 'sending' ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> {t.contact.sending}</> : t.contact.submitBtn}
                        </button>
                    </form>
                )}
            </div>
            <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
        </section>
    )
}
