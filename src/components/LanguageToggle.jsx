import { useI18n } from '../i18n/I18nContext.jsx'

export default function LanguageToggle() {
    const { lang, setLang } = useI18n()

    const toggleLang = () => {
        setLang(lang === 'en' ? 'zh-HK' : 'en')
    }

    return (
        <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-0.5 bg-none border border-black/[0.09] rounded-full py-1.5 px-2.5 cursor-pointer font-sans text-[0.75rem] font-semibold transition-all duration-200 hover:bg-black/[0.04]"
            style={{ color: '#334155' }}
        >
            <span
                className={`px-1.5 py-0.5 rounded-full transition-all duration-200 ${
                    lang === 'en'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-[#334155]'
                }`}
            >
                EN
            </span>
            <span className="text-black/20">|</span>
            <span
                className={`px-1.5 py-0.5 rounded-full transition-all duration-200 ${
                    lang === 'zh-HK'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-[#334155]'
                }`}
            >
                中
            </span>
        </button>
    )
}
