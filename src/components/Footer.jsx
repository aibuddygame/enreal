import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const EMAIL = 'hello@enreallab.com.hk'

export default function Footer({ navLinks, brandText, accentColor }) {
    const { t } = useI18n()
    const navigate = useNavigate()
    const location = useLocation()

    const go = (id) => {
        const isLanding = location.pathname === '/' || location.pathname === '/business' || location.pathname === '/individual'
        if (isLanding) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate(location.pathname, { state: { scrollTo: id } })
        }
    }

    return (
        <footer className="bg-[#1C1C1E] pt-16 md:pt-20 pb-10 px-4 sm:px-6 lg:px-[5vw] relative z-[1]">
            <div className="max-w-7xl mx-auto">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-16 mb-16">
                    {/* Brand */}
                    <div>
                        <h2 className="f-sans font-extrabold text-2xl tracking-tight text-white mb-3">
                            Enreal<span style={{ color: accentColor || '#2563EB' }}> AI</span>
                        </h2>
                        <p className="f-supp text-sm text-white/45 leading-relaxed max-w-xs mb-7">
                            {brandText || t('footer.brandText')}
                        </p>
                    </div>

                    {/* Nav */}
                    <div>
                        <p className="f-mono text-[0.6rem] tracking-[0.15em] text-white/30 mb-5 uppercase">{t('footer.navigation')}</p>
                        {(navLinks || []).map(({ label, id }) => (
                            <button key={id} onClick={() => go(id)}
                                className="block bg-none border-none cursor-pointer font-sans text-sm text-white/45 py-1 text-left transition-colors duration-200 hover:text-white">
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="f-mono text-[0.6rem] tracking-[0.15em] text-white/30 mb-5 uppercase">{t('footer.contact')}</p>
                        <a href={`mailto:${EMAIL}`}
                            className="inline-flex items-center gap-1.5 font-sans text-sm text-white/45 no-underline mb-6 transition-colors duration-200 hover:text-white">
                            {EMAIL} <ArrowUpRight size={13} />
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="f-mono text-[0.67rem] text-white/30 tracking-wider">
                            {t('footer.systemStatus')}
                        </span>
                    </div>
                    <span className="font-sans text-[0.78rem] text-white/20">
                        {t('footer.copyright')}
                    </span>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ Icon, href, label }) {
    const [hov, setHov] = useState(false)
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="w-9 h-9 rounded-full inline-flex items-center justify-center no-underline transition-all duration-250 ease-out"
            style={{
                background: hov ? '#2563EB' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${hov ? '#2563EB' : 'rgba(255,255,255,0.1)'}`,
                color: hov ? '#fff' : 'rgba(255,255,255,0.45)',
                transform: hov ? 'translateY(-2px)' : 'translateY(0)',
            }}>
            <Icon size={15} />
        </a>
    )
}
