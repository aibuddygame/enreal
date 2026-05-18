import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import en from './en.json'
import zhHK from './zh-HK.json'

const translations = { en, 'zh-HK': zhHK }

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
    const navigate = useNavigate()
    const location = useLocation()

    // Detect initial language from URL or localStorage
    const getInitialLang = () => {
        const pathLang = location.pathname.startsWith('/zh-HK')
        if (pathLang) return 'zh-HK'
        const saved = localStorage.getItem('enreal-lang')
        if (saved && translations[saved]) return saved
        return 'en'
    }

    const [lang, setLangState] = useState(getInitialLang)

    // Sync URL when language changes
    const setLang = useCallback((newLang) => {
        if (newLang === lang) return
        setLangState(newLang)
        localStorage.setItem('enreal-lang', newLang)

        const currentPath = location.pathname
        const isZh = currentPath.startsWith('/zh-HK')

        if (newLang === 'zh-HK') {
            if (!isZh) {
                navigate('/zh-HK' + currentPath, { replace: true })
            }
        } else {
            if (isZh) {
                navigate(currentPath.replace('/zh-HK', '') || '/', { replace: true })
            }
        }
    }, [lang, location.pathname, navigate])

    // On mount / URL change: sync lang state with URL
    useEffect(() => {
        const isZhPath = location.pathname.startsWith('/zh-HK')
        const expectedLang = isZhPath ? 'zh-HK' : 'en'
        if (expectedLang !== lang) {
            setLangState(expectedLang)
            localStorage.setItem('enreal-lang', expectedLang)
        }
    }, [location.pathname])

    const t = useCallback((key) => {
        const keys = key.split('.')
        let value = translations[lang]
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                // Fallback to English
                let fallback = translations.en
                for (const fk of keys) {
                    if (fallback && typeof fallback === 'object' && fk in fallback) {
                        fallback = fallback[fk]
                    } else {
                        return key
                    }
                }
                return fallback
            }
        }
        return value
    }, [lang])

    // Helper to get translated AI employee data
    const getAIEmployee = useCallback((employee) => {
        const id = employee.id
        const name = t(`aiEmployees.${id}`) || employee.name
        const summary = t(`aiEmployeeSummaries.${id}`) || employee.summary
        const helpsYou = t(`aiEmployeeHelpsYou.${id}`) || employee.helpsYou
        return { ...employee, name, summary, helpsYou }
    }, [t])

    // Helper to get translated employees array
    const getAIEmployees = useCallback((employees) => {
        return employees.map(getAIEmployee)
    }, [getAIEmployee])

    return (
        <I18nContext.Provider value={{ lang, setLang, t, getAIEmployee, getAIEmployees }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const ctx = useContext(I18nContext)
    if (!ctx) throw new Error('useI18n must be used within I18nProvider')
    return ctx
}

export default I18nContext
