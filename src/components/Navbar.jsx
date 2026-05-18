import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { NAV, HOME_NAV, T } from '../data.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import zhHK from '../i18n/zh-HK.json'
import en from '../i18n/en.json'

const ORANGE = '#EA580C'
const ORANGE_D = '#C2410C'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { t, lang } = useI18n()
    const isLanding = location.pathname === '/business' || location.pathname === '/zh-HK/business'
    const isHome = location.pathname === '/' || location.pathname === '/zh-HK'
    const isIndividual = location.pathname === '/individual' || location.pathname === '/zh-HK/individual'

    // Direct translation lookup as fallback
    const translations = { en, 'zh-HK': zhHK }
    const translateNav = (key) => {
        const translated = t(key)
        if (translated !== key) return translated
        // Fallback: lookup directly
        const keys = key.split('.')
        let value = translations[lang] || translations.en
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return key
            }
        }
        return value
    }
    
    // Hardcoded Chinese nav for zh-HK
    const ZH_NAV = {
        'nav.home': '首頁',
        'nav.aiWorkforce': 'AI 工作團隊',
        'nav.howItWorks': '運作流程',
        'nav.contact': '聯絡我們',
        'nav.solutions': '解決方案',
        'nav.work': '作品',
        'nav.method': '方法',
        'nav.about': '關於我們',
    }
    
    console.log('Navbar render - lang:', lang, 'pathname:', location.pathname)
    
    const activeNav = isHome
        ? HOME_NAV.map(n => {
            const label = lang === 'zh-HK' ? (ZH_NAV[n.label] || translateNav(n.label)) : translateNav(n.label)
            console.log('Nav item:', n.id, 'label:', label, 'lang:', lang)
            return { ...n, label }
          })
        : NAV.map(n => {
            const label = lang === 'zh-HK' ? (ZH_NAV[n.label] || translateNav(n.label)) : translateNav(n.label)
            console.log('Nav item:', n.id, 'label:', label, 'lang:', lang)
            return { ...n, label }
          })
    const accent = isHome ? ORANGE : T.accent
    const accentD = isHome ? ORANGE_D : T.accentD

    useEffect(() => {
        if (isLanding || isHome) {
            const hero = document.getElementById('hero')
            if (!hero) {
                setScrolled(true)
                return
            }
            const obs = new IntersectionObserver(
                ([e]) => setScrolled(!e.isIntersecting), { threshold: 0.1 }
            )
            obs.observe(hero)
            return () => obs.disconnect()
        } else {
            setScrolled(true)
        }
    }, [isLanding, isHome, location.pathname])

    useEffect(() => {
        if (!isLanding && !isHome) return
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
            { threshold: 0.2 }
        )
        activeNav.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
        return () => obs.disconnect()
    }, [isLanding, isHome, activeNav])

    const go = (id) => {
        setOpen(false)
        if (isLanding || isHome) {
            const targetId = isHome && id === 'contact' ? 'consultation' : id
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
        } else if (isIndividual) {
            navigate('/individual', { state: { scrollTo: id } })
        } else {
            navigate('/business', { state: { scrollTo: id } })
        }
    }

    const ctaTarget = isHome ? 'consultation' : 'contact'

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 py-4 pointer-events-none">
            <nav aria-label="Main navigation"
                className={`pointer-events-auto flex items-center py-1.5 pr-1.5 pl-5 rounded-full transition-all duration-500 ease-out
                    bg-[#F8FAFC]/95 backdrop-blur-2xl border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.05)]`}>
                {/* Logo */}
                <button onClick={() => navigate('/')} aria-label="Go to home"
                    className="bg-none border-none cursor-pointer f-sans font-extrabold text-[1.05rem] tracking-tight pr-5 whitespace-nowrap transition-colors duration-300"
                    style={{ color: scrolled ? '#0f172a' : T.text }}>
                    Enreal<span style={{ color: accent }}> AI</span>
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex gap-0.5">
                    {activeNav.map(({ label, id }) => (
                        <button key={id} onClick={() => go(id)}
                            className="bg-none border-none cursor-pointer py-1.5 px-3 rounded-full font-sans text-[0.83rem] font-medium transition-colors duration-200"
                            style={{
                                color: ((isLanding || isHome) && active === id) ? accent : (scrolled ? '#334155' : T.muted)
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = scrolled ? '#0f172a' : T.text}
                            onMouseLeave={e => e.currentTarget.style.color = ((isLanding || isHome) && active === id) ? accent : (scrolled ? '#334155' : T.muted)}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Language Toggle */}
                <div className="hidden md:flex ml-3">
                    <LanguageToggle />
                </div>

                {/* Page Switcher */}
                {(isLanding || isIndividual) && (
                    <button onClick={() => navigate(isLanding ? '/individual' : '/business')}
                        className="hidden md:flex ml-5 py-2 px-4 rounded-full bg-black/[0.03] border border-black/[0.09] cursor-pointer font-sans text-[0.82rem] font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-black/[0.07]"
                        style={{ color: isLanding ? '#059669' : '#2563EB' }}>
                        {isLanding ? t('nav.switchToEliteCourse') : t('nav.switchToBusiness')}
                    </button>
                )}

                {/* CTA */}
                <button onClick={() => go(ctaTarget)}
                    className="hidden md:flex btn-mag ml-2 py-2.5 px-4 rounded-full border-none font-sans text-[0.82rem] font-bold text-white whitespace-nowrap"
                    style={{ background: accent, boxShadow: `0 2px 12px ${isHome ? 'rgba(234,88,12,0.28)' : 'rgba(37,99,235,0.28)'}` }}>
                    <span className="slide" style={{ background: accentD }} />
                    <span className="label flex items-center gap-1">
                        {t('nav.bookConsultation')} <ArrowRight size={12} />
                    </span>
                </button>

                {/* Mobile toggle + Language */}
                <div className="flex items-center gap-2 md:hidden ml-2">
                    <LanguageToggle />
                    <button onClick={() => setOpen(v => !v)} aria-label="Toggle navigation"
                        className="bg-none border border-black/[0.09] rounded-full py-1.5 px-3 cursor-pointer f-mono text-[0.8rem] transition-colors duration-300"
                        style={{ color: scrolled ? '#0f172a' : T.text }}>
                        {open ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div role="dialog" aria-label="Navigation menu"
                    className="absolute top-[calc(100%-0.5rem)] left-4 right-4 bg-white/97 backdrop-blur-2xl border border-black/[0.09] rounded-3xl p-4 flex flex-col gap-0.5 pointer-events-auto shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
                    {activeNav.map(({ label, id }) => (
                        <button key={id} onClick={() => go(id)}
                            className="bg-none border-none cursor-pointer py-2.5 px-3 rounded-xl font-sans text-[0.95rem] text-left transition-colors duration-200"
                            style={{ color: ((isLanding || isHome) && active === id) ? accent : '#0f172a' }}>
                            {label}
                        </button>
                    ))}

                    {(isLanding || isIndividual) && (
                        <button onClick={() => navigate(isLanding ? '/individual' : '/business')}
                            className="bg-black/[0.03] border border-black/[0.09] cursor-pointer py-2.5 px-3 rounded-xl mt-1 font-sans text-[0.95rem] font-semibold text-left transition-colors duration-200"
                            style={{ color: isLanding ? '#059669' : '#2563EB' }}>
                            {isLanding ? t('nav.switchToEliteCourse') : t('nav.switchToBusiness')}
                        </button>
                    )}

                    <button onClick={() => go(ctaTarget)}
                        className="mt-2 py-3 rounded-xl border-none cursor-pointer font-sans text-[0.9rem] font-bold text-white transition-colors duration-200"
                        style={{ background: accent }}>
                        {t('nav.bookConsultation')}
                    </button>
                </div>
            )}
        </header>
    )
}
