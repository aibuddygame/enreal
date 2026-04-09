import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowLeft, Mail, AlertCircle, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'
import IndividualNavbar from '../components/IndividualNavbar.jsx'
import Footer from '../components/Footer.jsx'
import { AllianceSection } from '../components/ui/alliance-section.jsx'
import { Box, Settings, Lock, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils.js'

gsap.registerPlugin(ScrollTrigger)

const T = {
    bg: '#FFFFFF',
    surface: '#F7F9FB',
    surfaceAlt: '#EEF1F6',
    text: '#181818',
    muted: '#5A5A5A',
    border: 'rgba(0,0,0,0.08)',
    primary: '#0176D3',
    primaryLight: '#E8F4FD',
    primaryDark: '#014486',
    secondary: '#1B96FF',
    success: '#2E844A',
    warning: '#F59E0B',
    danger: '#C23934',
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
        phrases: ['7 Sessions to Become Your Company\'s AI Lead', 'Don\'t Just Learn AI—Lead the Transformation', 'MVP Portfolio + CEO Network'],
        hero: { eyebrow: 'AI CAREER ACCELERATOR FOR MID-LEVEL PROFESSIONALS', title: '7 Sessions to Become Your Company\'s AI Lead', subtitle: '', desc: 'Don\'t just learn AI tools—learn to lead your company\'s AI transformation, build an MVP portfolio, and present to real CEOs.', ctaPrimary: 'Enroll Now', ctaSecondary: 'Explore Program' },
        shift: { eyebrow: '// LEARNING PHILOSOPHY', title: 'Don\'t Just Learn AI—Lead the Transformation', subtitle: 'An AI Career Accelerator for Mid-Level Professionals', features: [{ title: 'MVP Portfolio Building', desc: 'Complete real AI projects and build a demonstrable portfolio. Not academic exercises—workplace-ready solutions.' }, { title: 'CEO Network Access', desc: 'Session 7: Present your work to real CEOs/MDs. Build executive connections and unlock promotion opportunities.' }, { title: 'From Execution to Leadership', desc: 'Move from operating AI tools to designing AI strategy and leading team transformation. Become your company\'s indispensable AI lead.' }, { title: 'Career Accelerator', desc: 'Designed for professionals aged 30-45. 7 sessions to get the credentials for promotion, not generic AI knowledge.' }] },
        outcomesSection: { eyebrow: '// OUTCOMES', title: '7 Sessions: From Employee to AI Leader' },
        curriculumSection: { eyebrow: '// CURRICULUM', title: 'From Learning AI to Leading AI Transformation', subtitle: 'Build MVP Portfolio · Gain CEO Network · Become Your Company\'s AI Lead', learnTitle: 'What You Will Learn' },
        allianceSection: { eyebrow: '// ALLIANCE NETWORK', title: 'The Enreal AI Alliance', subtitle: 'Where Builders Meet Leaders', description: 'Completing the course is just the beginning. Join the Alliance for lifetime access to an AI business ecosystem.<br>We don\'t just teach you tools—we give you the network to help build the AI economy.', cta: 'Explore Alliance Benefits', pillars: [{ title: 'Vetted Executive Network', subtitle: 'CEO & VC Access', desc: 'Unlike generic courses, our Alliance is built on actual connections. Regular curated gatherings connecting AI micro-tool VCs, CEOs seeking implementable AI strategies, and successful entrepreneurs with proven track records.' }, { title: 'The "De-Risked" Innovation Lab', subtitle: 'Continuous R&D Sandbox', desc: 'The Alliance serves as a continuous R&D sandbox. Members can pitch new AI concepts for "Pressure Testing" by industry veterans before investing capital. Access alliance-shared SOPs, latest market intelligence, and cutting-edge tool sharing.' }, { title: 'Career Matching & Accelerator', subtitle: 'Talent & Project Matching', desc: 'We bridge the gap between AI talent and industry demand. Actively match Alliance members with firms seeking AI consulting or custom tool development. You are not just an AI tool user—you are the most sought-after talent in the market.' }, { title: 'Leading the "AI for All" Era', subtitle: 'Become an AI Transformation Leader', desc: 'As the Hong Kong government pushes the "AI for All" policy (HK$1 billion allocated in the 2026 Budget), Alliance members will become pioneers of societal AI transformation. We don\'t just learn AI—we lead businesses and communities into the new AI era. Stay ahead of policy trends and become both a driver and beneficiary of AI transformation.' }] },
        forWho: { eyebrow: '// TARGET AUDIENCE', title: 'Designed for Mid-Level Professionals', subtitle: 'Ages 30-45 · Report to C-Level · Want promotion but lack results', tags: ['Mid-Level Managers (Ages 30-45)', 'Report to C-Level or Board', 'Company starting AI but no direction', 'Want promotion/career change but lack results', 'Tired of theory courses, want practical execution', 'Want to build CEO network connections'] },
        pricing: { eyebrow: '// LIMITED OFFER 🔥', title: '7 Sessions to Change Your Career Trajectory', subtitle: 'Invest in yourself. Become your company\'s AI lead.', originalPrice: 'Comparable courses: $6,000-$13,000', price: '$2,000', spots: 'Only 10 students · Limited spots · Small cohort ensures quality', features: ['7 practical sessions (MVP portfolio)', 'Real CEO/MD presentation (network building)', 'Personal AI project one-on-one guidance', 'Post-course CEO network community support', 'Credentials for promotion & raise'], cta: 'Enroll Now to Become an AI Leader' },
        footer: { nav: [{ label: 'Philosophy', id: 'program' }, { label: 'Outcomes', id: 'outcomes' }, { label: 'Curriculum', id: 'curriculum' }, { label: 'For Who', id: 'for-who' }, { label: 'Alliance', id: 'alliance' }, { label: 'Enrollment', id: 'pricing' }], brandText: 'The intelligence layer for professionals entering an AI-native economy.' }
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
        phrases: ['7堂課成為公司AI負責人', '不只是學AI——而是領導AI轉型', 'MVP作品集 + CEO人脈網絡'],
        hero: { eyebrow: '中層專業人士的AI職業加速器', title: 'AI正在改變世界和你的工作？', subtitle: '7堂課成為公司AI負責人 · 不只是運用工具，而是技能轉型 · MVP作品集 + C-Level人脈', desc: '不只是學習AI工具——更是學會領導你公司的AI轉型<br>建立MVP作品集，並在真實CEO面前展示成果', ctaPrimary: '立即報名', ctaSecondary: '了解課程' },
        shift: { eyebrow: '// 學習理念', title: '不要只是學AI——領導AI轉型', subtitle: '專為中層專業人士設計的AI職業加速器', subtitleStyle: { fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700 }, features: [{ title: 'MVP作品集建立', desc: '完成真實AI項目，建立可展示的作品集。不是學術練習，而是職場可用的解決方案。' }, { title: 'CEO人脈網絡', desc: '第七堂課在真實CEO/MD面前展示成果。建立高層人脈，獲得升職轉工機會。' }, { title: '從執行到領導', desc: '從操作AI工具，升級到設計AI策略、帶領團隊轉型。成為公司不可或缺的AI負責人。' }, { title: '職涯加速器', desc: '專為30-45歲中層設計。7堂課獲得升職加薪的籌碼，而非泛泛的AI知識。' }] },
        outcomesSection: { eyebrow: '// 學習成果', title: '7堂課，從員工升級為AI領導' },
        curriculumSection: { eyebrow: '// 課程大綱', title: '從學AI到領導AI轉型', subtitle: '建立MVP作品集 · 獲得CEO人脈 · 成為公司AI負責人', learnTitle: '學習內容' },
        allianceSection: { eyebrow: '// 實戰聯盟', title: 'Enreal AI 實戰聯盟', subtitle: 'Where Builders Meet Leaders', description: '完成課程只是開始——加入實戰聯盟，獲得終身進入AI商業生態的資格。<br>我們不只教你工具，更給你網絡，讓你參與建構AI新經濟。', cta: '了解聯盟優勢', pillars: [{ title: '實戰驗證的高層人脈', subtitle: 'CEO與創投連結', desc: '與一般商業課程不同，我們的聯盟建立在實際的人脈網絡之上。定期舉辦精選聚會，連結AI微工具的創投、尋找可落地AI化策略的CEO與行業資深人士、以及同樣擁有的成功創業經驗的成功例子。' }, { title: '「去風險」創新實驗室', subtitle: '持續R&D沙盒', desc: '聯盟作為持續的研究與開發沙盒。成員可向聯盟提案新AI概念，由行業資深人士進行「壓力測試」後再投入資本。獲取聯盟共享的SOP、巿場最近資訊與各種最新工具分享。' }, { title: '職位配對與職涯加速器', subtitle: '人才和項目的認識與配對', desc: '我們搭起AI人才與產業需求之間的橋樑。主動將聯盟成員與尋求AI諮詢或定製工具開發的企業配對。你不是是一個 AI 工具運用者，而是整個巿場最搶手的人才。' }, { title: '引領「全民AI」新時代', subtitle: '成為AI變革的領導者', desc: '隨著香港政府推動「全民AI」政策，聯盟成員將成為社會AI化的領航者。我們不只是學習AI，更是帶領企業、社區邁向AI新紀元的先鋒。掌握最新政策動向，成為AI變革的推動者與受益者。' }] },
        forWho: { eyebrow: '// 目標學員', title: '專為中層專業人士設計', subtitle: '30-45歲 · 需要向C-Level匯報 · 想升職但缺成果', tags: ['中層管理者（30-45歲）', '需要向C-Level或董事會匯報', '公司開始做AI但無方向', '想升職／轉工但缺成果', '厭倦了理論課程，想要實戰', '希望建立CEO人脈網絡'] },
        pricing: { eyebrow: '// 限時優惠 🔥', title: '7堂課改變你的職業軌跡', subtitle: '投資自己，成為公司AI負責人', originalPrice: '同類課程：$6,000-$13,000', price: '$2,000', spots: '只收 10 位學員 · 滿額即止 · 小班制確保質量', features: ['7堂實戰課程（MVP作品集）', '真實CEO/MD展示機會（人脈建立）', '個人AI項目一對一指導', '課後CEO人脈社群支援', '升職加薪的籌碼'], cta: '立即報名成為AI領導' },
        footer: { nav: [{ label: '學習理念', id: 'program' }, { label: '學習成果', id: 'outcomes' }, { label: '課程大綱', id: 'curriculum' }, { label: '目標學員', id: 'for-who' }, { label: '實戰聯盟', id: 'alliance' }, { label: '報名方法', id: 'pricing' }], brandText: '為進入AI原生經濟的專業人士提供智能層。' }
    }
}

import { useNavigate, useLocation } from 'react-router-dom'

export default function CoursePage({ lang: initialLang }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [lang, setLang] = useState(initialLang || 'zh')
    const mainRef = useRef(null)
    const t = CONTENT[lang]

    // Sync URL with language selection
    const handleLangChange = (newLang) => {
        setLang(newLang)
        if (newLang === 'zh') {
            navigate('/course', { replace: true })
        } else {
            navigate('/course/en', { replace: true })
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
                    <AllianceSection t={t} />
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
                <p className="h-rev" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.22em', color: '#059669', marginBottom: '1.5rem', opacity: 0.85, textTransform: 'uppercase' }}>{t.hero.eyebrow}</p>
                <h1 className="h-rev" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.75rem', whiteSpace: 'nowrap' }}>
                    {t.hero.title}
                </h1>
                <div className="h-rev" style={{ position: 'relative', height: '4rem', marginBottom: '1.5rem', width: '100%', maxWidth: '900px' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: T.primary, fontWeight: 700, lineHeight: 1.4, visibility: 'hidden', whiteSpace: 'nowrap' }}>{LONGEST}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: T.primary, fontWeight: 700, lineHeight: 1.4, position: 'absolute', top: 0, left: 0, right: 0, whiteSpace: 'nowrap' }}>
                        {display}<span style={{ display: 'inline-block', width: '0.08em', height: '0.9em', background: T.primary, marginLeft: '0.05em', verticalAlign: 'middle', borderRadius: 1 }} />
                    </p>
                </div>
                <p className="h-rev" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', color: T.muted, lineHeight: 1.8, maxWidth: 550, margin: '0 auto 2.5rem' }} dangerouslySetInnerHTML={{ __html: t.hero.desc }} />
                <div className="h-rev" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => go('pricing')} style={{ background: T.text, color: T.bg, padding: '1rem 2rem', border: 'none', borderRadius: 999, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{t.hero.ctaPrimary} <ArrowRight size={16} /></button>
                    <button onClick={() => go('program')} style={{ background: 'transparent', color: T.text, padding: '1rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{t.hero.ctaSecondary}</button>
                </div>
            </div>
        </section>
    )
}

function TheShift({ t }) {
    const features = [{ icon: <Box className="h-4 w-4" />, ...t.shift.features[0] }, { icon: <Settings className="h-4 w-4" />, ...t.shift.features[1] }, { icon: <Lock className="h-4 w-4" />, ...t.shift.features[2] }, { icon: <Sparkles className="h-4 w-4" />, ...t.shift.features[3] }]
    return (
        <section id="program" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#059669', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.shift.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem' }}>{t.shift.title}</h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: T.primary, lineHeight: 1.4 }}>{t.shift.subtitle}</p>
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
        <section id="outcomes" className="sec-rev" style={{ padding: '10rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.primary, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.outcomesSection.eyebrow}</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', margin: 0, color: T.text }}>{t.outcomesSection.title}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => scroll(-400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowLeft size={18} /></button>
                        <button onClick={() => scroll(400)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.border}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.text }}><ArrowRight size={18} /></button>
                    </div>
                </div>
                <div className="stag-grid" ref={scrollRef} style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {t.outcomes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${T.border}`, background: T.bg, transition: 'all 0.3s ease', cursor: 'pointer', flex: '0 0 auto', width: 'min(85vw, 340px)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.primary, fontSize: '0.8rem', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>0{i + 1}</span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.75rem', color: T.text }}>{item.title}</h3>
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
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.primary, marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.curriculumSection.eyebrow}</p>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem', color: T.text }}>{t.curriculumSection.title}</h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '1.1rem' }}>{t.curriculumSection.subtitle}</p>
                </div>
                <div className="stag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
                    {t.curriculum.map((c, i) => {
                        const phaseBg = ['#F0F9FF', '#F5F3FF', '#FFFBEB'][i]
                        const phaseBorder = ['#BAE6FD', '#DDD6FE', '#FDE68A'][i]
                        return (
                        <div key={i} className="h-full">
                            <div className="group h-full relative flex flex-col rounded-[1.5rem] border p-8 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]" style={{ background: phaseBg, borderColor: phaseBorder }}>
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.primary, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{c.phase}</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.2, letterSpacing: '-0.03em', color: T.text, paddingRight: '1rem' }}>{c.title}</h3>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 500, color: T.secondary, marginBottom: '1.5rem' }}>{c.subtitle}</h4>
                                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem', whiteSpace: 'pre-line' }}>{c.desc}</p>
                                <div style={{ flexGrow: 1 }}>
                                    <h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.05em', color: T.text, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.curriculumSection.learnTitle}</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {c.learn.map((item, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Manrope, sans-serif', color: T.muted, fontSize: '0.92rem', lineHeight: 1.45 }}>
                                                <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', background: T.primary, marginTop: '0.55rem' }} /><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    )}
                </div>
            </div>
        </section>
    )
}

function ForWho({ t }) {
    return (
        <section id="for-who" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surface }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.primary, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.forWho.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '3rem', color: T.text }}>{t.forWho.title}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 800 }}>
                    {t.forWho.tags.map((p, i) => (
                        <span key={i} style={{ padding: '0.75rem 1.5rem', border: `1px solid ${T.border}`, borderRadius: 999, fontFamily: 'Manrope, sans-serif', color: T.text, fontSize: '0.95rem', background: T.bg, transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.borderColor = T.primary; e.target.style.color = T.primary; }} onMouseLeave={(e) => { e.target.style.borderColor = T.border; e.target.style.color = T.text; }}>{p}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Pricing({ t }) {
    return (
        <section id="pricing" className="sec-rev" style={{ padding: '8rem 5vw', background: T.surfaceAlt }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: T.danger, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>{t.pricing.eyebrow}</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '1rem', color: T.text }}>{t.pricing.title}</h2>
                <p style={{ fontFamily: 'Manrope, sans-serif', color: T.muted, marginBottom: '2rem', fontSize: '1rem' }}>{t.pricing.spots}</p>
                
                <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: '2rem', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', color: T.muted, textDecoration: 'line-through', marginBottom: '0.5rem' }}>{t.pricing.originalPrice}</p>
                    <p style={{ fontSize: '4rem', fontWeight: 700, color: T.text, marginBottom: '2rem', letterSpacing: '-0.02em' }}>{t.pricing.price}</p>
                    
                    <div style={{ margin: '0 0 2rem 0', textAlign: 'left', display: 'inline-block' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {t.pricing.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif', color: T.text, fontSize: '1rem' }}>
                                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: T.success, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div style={{ width: '100%' }}>
                        <button style={{ background: T.primary, color: 'white', padding: '1.25rem 3rem', border: 'none', borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', width: '100%', maxWidth: 400 }} onMouseEnter={(e) => { e.target.style.background = T.primaryDark; }} onMouseLeave={(e) => { e.target.style.background = T.primary; }} onClick={() => window.location.href = '/enroll'}>
                            {t.pricing.cta}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
