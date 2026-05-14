import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

const EMPLOYEE_OPTIONS = [
    'AI Coding Engineer',
    'AI Data Analyst',
    'AI Report Specialist',
    'AI Creative Director',
    'AI Social Media Influencer',
    'AI Customer Service',
    'AI Secretary',
    'AI HR Manager',
    'AI Accountant',
]

export default function ConsultationForm() {
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
            setErrorMsg('Please fill in all required fields.')
            setStatus('error')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            setErrorMsg('Please enter a valid email address.')
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
                setErrorMsg(data.error || 'Something went wrong. Please try again.')
                setStatus('error')
            }
        } catch (err) {
            setErrorMsg('Network error. Please try again later.')
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
                    <h3 className="f-sans font-extrabold text-2xl text-[#1C1C1E] mb-3">Thank You!</h3>
                    <p className="f-supp text-base text-black/55 leading-relaxed">
                        We have received your consultation request. Our team will reach out within 24 hours.
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section id="consultation" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[5vw] bg-[#F8FAFC]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <p className="section-eyebrow">Get Started</p>
                    <h2 className="section-title">Book a Free AI Workflow Consultation</h2>
                    <p className="section-desc">
                        Tell us about your business and we will recommend the right AI employees for your needs.
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
                            <label htmlFor="fullName" className="form-label">
                                Full Name <span className="text-red-500">*</span>
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
                            <label htmlFor="companyName" className="form-label">
                                Company Name
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
                            <label htmlFor="email" className="form-label">
                                Email <span className="text-red-500">*</span>
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
                            <label htmlFor="phone" className="form-label">
                                Phone / WhatsApp
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
                        <label htmlFor="website" className="form-label">
                            Company Website
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
                        <p className="form-label">Interested AI Employees</p>
                        <div className="flex flex-wrap gap-2">
                            {EMPLOYEE_OPTIONS.map(emp => (
                                <button
                                    key={emp}
                                    type="button"
                                    onClick={() => toggleEmployee(emp)}
                                    className={`px-4 py-2 rounded-full text-[0.82rem] font-medium transition-all duration-200 cursor-pointer
                                        ${form.interestedEmployees.includes(emp)
                                            ? 'bg-blue-500/[0.08] text-[#2563EB] border border-[#2563EB]'
                                            : 'bg-[#FAFAFA] text-black/60 border border-black/10 hover:border-black/20'}`}>
                                    {emp}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="message" className="form-label">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell us about your business and what you would like to automate..."
                            className="form-input resize-y"
                        />
                    </div>

                    {status === 'error' && (
                        <p className="mt-4 font-sans text-sm text-red-500">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary w-full justify-center mt-7 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={16} /> Submit Consultation Request
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}
