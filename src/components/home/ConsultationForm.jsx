import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function ConsultationForm() {
    const { t } = useI18n()
    const [form, setForm] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        website: '',
        interestedEmployees: [],
        message: '',
        honeypot: '',
    })
    const [status, setStatus] = useState('idle') // idle | submitting | success | error
    const [errorMsg, setErrorMsg] = useState('')

    const employeeKeys = [
        'aiCodingEngineer',
        'aiDataAnalyst',
        'aiReportSpecialist',
        'aiCreativeDirector',
        'aiSocialMediaInfluencer',
        'aiCustomerService',
        'aiSecretary',
        'aiHRManager',
        'aiAccountant',
    ]

    const toggleEmployee = (emp) => {
        setForm(prev => ({
            ...prev,
            interestedEmployees: prev.interestedEmployees.includes(emp)
                ? prev.interestedEmployees.filter(e => e !== emp)
                : [...prev.interestedEmployees, emp],
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.honeypot) return
        if (!form.fullName || !form.email || !form.message) {
            setErrorMsg(t('consultationForm.errorRequired'))
            setStatus('error')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            setErrorMsg(t('consultationForm.errorEmail'))
            setStatus('error')
            return
        }

        setStatus('submitting')
        setErrorMsg('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (res.ok && data.success) {
                setStatus('success')
                setForm({
                    fullName: '', companyName: '', email: '', phone: '',
                    website: '', interestedEmployees: [], message: '', honeypot: '',
                })
            } else {
                setErrorMsg(data.error || t('consultationForm.errorGeneral'))
                setStatus('error')
            }
        } catch (err) {
            setErrorMsg(t('consultationForm.errorNetwork'))
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <section id="consultation" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
                <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-12 text-center border border-black/[0.06]">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={28} color="#22C55E" />
                    </div>
                    <h3 className="f-sans font-extrabold text-2xl text-[#1C1C1E] mb-3">{t('consultationForm.successTitle')}</h3>
                    <p className="f-supp text-base text-black/55 leading-relaxed">
                        {t('consultationForm.successMessage')}
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section id="consultation" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <p className="f-mono text-[0.65rem] tracking-[0.2em] text-[#EA580C] mb-4 uppercase">{t('consultationForm.eyebrow')}</p>
                    <h2 className="f-sans font-extrabold text-3xl md:text-4xl lg:text-[2.4rem] tracking-tight leading-[1.15] text-[#1e3a5f] mb-4">{t('consultationForm.title')}</h2>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed">
                        {t('consultationForm.subtitle')}
                    </p>
                    <p className="f-supp text-base text-black/[0.55] leading-relaxed mt-4">
                        {t('consultationForm.pricingNote')} <span className="text-[#EA580C] font-bold">{t('consultationForm.pricingAmount')}</span> {t('consultationForm.perEmployee')}
                    </p>
                    <p className="f-supp text-[0.75rem] text-black/[0.4] leading-relaxed mt-2 max-w-2xl mx-auto">
                        {t('consultationForm.pricingDisclaimer')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 border border-black/[0.06] shadow-sm shadow-black/[0.03]">
                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                        <input
                            type="text"
                            name="honeypot"
                            value={form.honeypot}
                            onChange={e => setForm({ ...form, honeypot: e.target.value })}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="fullName" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                                {t('consultationForm.fullName')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                required
                                value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                                {t('consultationForm.companyName')}
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={form.companyName}
                                onChange={e => setForm({ ...form, companyName: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                                {t('consultationForm.email')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                                {t('consultationForm.phone')}
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="website" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                            {t('consultationForm.website')}
                        </label>
                        <input
                            id="website"
                            type="url"
                            value={form.website}
                            onChange={e => setForm({ ...form, website: e.target.value })}
                            className="form-input"
                        />
                    </div>

                    <div className="mt-5">
                        <p className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">{t('consultationForm.interestedEmployees')}</p>
                        <div className="flex flex-wrap gap-2">
                            {employeeKeys.map(empKey => (
                                <button
                                    key={empKey}
                                    type="button"
                                    onClick={() => toggleEmployee(empKey)}
                                    className={`px-4 py-2 rounded-full text-[0.82rem] font-medium transition-all duration-200 cursor-pointer
                                        ${form.interestedEmployees.includes(empKey)
                                            ? 'bg-[#EA580C]/[0.08] text-[#EA580C] border border-[#EA580C]'
                                            : 'bg-[#FAFAFA] text-black/60 border border-black/10 hover:border-black/20'}`}>
                                    {t(`aiEmployees.${empKey}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="message" className="block font-sans text-[0.82rem] font-semibold text-[#1C1C1E] mb-1.5">
                            {t('consultationForm.message')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            placeholder={t('consultationForm.messagePlaceholder')}
                            className="form-input resize-y"
                        />
                    </div>

                    {status === 'error' && (
                        <p className="mt-4 font-sans text-sm text-red-500">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-sans text-sm font-bold shadow-lg shadow-orange-500/30 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:bg-[#C2410C] active:scale-[0.98] w-full mt-7 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                {t('consultationForm.submitting')}
                            </>
                        ) : (
                            <>
                                <Send size={16} /> {t('consultationForm.submit')}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}
