import { useLocation, useNavigate } from 'react-router-dom'

export default function LanguageToggle() {
    const location = useLocation()
    const navigate = useNavigate()
    const isZhPath = location.pathname.startsWith('/zh-HK')

    const goToEn = () => {
        // Remove /zh-HK prefix if present
        const newPath = location.pathname.replace(/^\/zh-HK/, '') || '/'
        navigate(newPath)
    }

    const goToZh = () => {
        // Add /zh-HK prefix
        const newPath = location.pathname === '/' ? '/zh-HK' : '/zh-HK' + location.pathname
        navigate(newPath)
    }

    return (
        <div
            className="flex items-center gap-0.5 bg-none border border-black/[0.09] rounded-full py-1.5 px-2.5 font-sans text-[0.75rem] font-semibold"
            style={{ color: '#334155' }}
        >
            <button
                onClick={goToEn}
                aria-label="Switch to English"
                className={`px-1.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer bg-none border-none ${
                    !isZhPath
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-[#334155] hover:bg-black/[0.04]'
                }`}
            >
                EN
            </button>
            <span className="text-black/20">|</span>
            <button
                onClick={goToZh}
                aria-label="Switch to Chinese"
                className={`px-1.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer bg-none border-none ${
                    isZhPath
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-[#334155] hover:bg-black/[0.04]'
                }`}
            >
                中
            </button>
        </div>
    )
}
