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
            <section id="consultation" style={{ padding: '6rem 5vw', background: '#F8FAFC' }}>
                <div style={{
                    maxWidth: 640, margin: '0 auto',
                    background: '#fff', borderRadius: '1.5rem',
                    padding: '3rem', textAlign: 'center',
                    border: '1px solid rgba(28,28,30,0.06)',
                }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(34,197,94,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <CheckCircle size={28} color="#22C55E" />
                    </div>
                    <h3 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: '1.5rem', color: '#1C1C1E', marginBottom: '0.75rem',
                    }}>Thank You!</h3>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        We have received your consultation request. Our team will reach out within 24 hours.
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section id="consultation" style={{ padding: '6rem 5vw', background: '#F8FAFC' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <p className="f-mono" style={{
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        color: '#2563EB', marginBottom: '1rem', textTransform: 'uppercase',
                    }}>
                        Get Started
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                        letterSpacing: '-0.02em', lineHeight: 1.15,
                        color: '#1C1C1E', marginBottom: '1rem',
                    }}>
                        Book a Free AI Workflow Consultation
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1rem', color: 'rgba(28,28,30,0.55)', lineHeight: 1.7,
                    }}>
                        Tell us about your business and we will recommend the right AI employees for your needs.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: '#fff', borderRadius: '1.5rem',
                    padding: '2.5rem',
                    border: '1px solid rgba(28,28,30,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                }}>
                    {/* Honeypot */}
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <input
                            type="text"
                            name="honeypot"
                            value={form.honeypot}
                            onChange={e => setForm({ ...form, honeypot: e.target.value })}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem',
                    }} className="form-grid">
                        <div>
                            <label htmlFor="fullName" style={{
                                display: 'block', fontFamily: 'Inter, sans-serif',
                                fontSize: '0.82rem', fontWeight: 600,
                                color: '#1C1C1E', marginBottom: '0.4rem',
                            }}>
                                Full Name <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                required
                                value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(28,28,30,0.1)',
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                    color: '#1C1C1E', background: '#FAFAFA',
                                    outline: 'none',
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                            />
                        </div>
                        <div>
                            <label htmlFor="companyName" style={{
                                display: 'block', fontFamily: 'Inter, sans-serif',
                                fontSize: '0.82rem', fontWeight: 600,
                                color: '#1C1C1E', marginBottom: '0.4rem',
                            }}>
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={form.companyName}
                                onChange={e => setForm({ ...form, companyName: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(28,28,30,0.1)',
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                    color: '#1C1C1E', background: '#FAFAFA',
                                    outline: 'none',
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" style={{
                                display: 'block', fontFamily: 'Inter, sans-serif',
                                fontSize: '0.82rem', fontWeight: 600,
                                color: '#1C1C1E', marginBottom: '0.4rem',
                            }}>
                                Email <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(28,28,30,0.1)',
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                    color: '#1C1C1E', background: '#FAFAFA',
                                    outline: 'none',
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" style={{
                                display: 'block', fontFamily: 'Inter, sans-serif',
                                fontSize: '0.82rem', fontWeight: 600,
                                color: '#1C1C1E', marginBottom: '0.4rem',
                            }}>
                                Phone / WhatsApp
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(28,28,30,0.1)',
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                    color: '#1C1C1E', background: '#FAFAFA',
                                    outline: 'none',
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                        <label htmlFor="website" style={{
                            display: 'block', fontFamily: 'Inter, sans-serif',
                            fontSize: '0.82rem', fontWeight: 600,
                            color: '#1C1C1E', marginBottom: '0.4rem',
                        }}>
                            Company Website
                        </label>
                        <input
                            id="website"
                            type="url"
                            value={form.website}
                            onChange={e => setForm({ ...form, website: e.target.value })}
                            style={{
                                width: '100%', padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(28,28,30,0.1)',
                                fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                color: '#1C1C1E', background: '#FAFAFA',
                                outline: 'none',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                        />
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                        <p style={{
                            display: 'block', fontFamily: 'Inter, sans-serif',
                            fontSize: '0.82rem', fontWeight: 600,
                            color: '#1C1C1E', marginBottom: '0.6rem',
                        }}>
                            Interested AI Employees
                        </p>
                        <div style={{
                            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                        }}>
                            {EMPLOYEE_OPTIONS.map(emp => (
                                <button
                                    key={emp}
                                    type="button"
                                    onClick={() => toggleEmployee(emp)}
                                    style={{
                                        padding: '0.45rem 1rem', borderRadius: 999,
                                        border: form.interestedEmployees.includes(emp)
                                            ? '1px solid #2563EB'
                                            : '1px solid rgba(28,28,30,0.1)',
                                        background: form.interestedEmployees.includes(emp)
                                            ? 'rgba(37,99,235,0.08)'
                                            : '#FAFAFA',
                                        fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                                        fontWeight: 500,
                                        color: form.interestedEmployees.includes(emp) ? '#2563EB' : 'rgba(28,28,30,0.6)',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                >
                                    {emp}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                        <label htmlFor="message" style={{
                            display: 'block', fontFamily: 'Inter, sans-serif',
                            fontSize: '0.82rem', fontWeight: 600,
                            color: '#1C1C1E', marginBottom: '0.4rem',
                        }}>
                            Message <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell us about your business and what you would like to automate..."
                            style={{
                                width: '100%', padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(28,28,30,0.1)',
                                fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                                color: '#1C1C1E', background: '#FAFAFA',
                                outline: 'none', resize: 'vertical',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(28,28,30,0.1)'}
                        />
                    </div>

                    {status === 'error' && (
                        <p style={{
                            marginTop: '1rem',
                            fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                            color: '#EF4444',
                        }}>{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-mag"
                        style={{
                            marginTop: '1.75rem',
                            width: '100%', padding: '0.9rem',
                            borderRadius: '0.875rem',
                            background: '#2563EB', border: 'none',
                            fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                            fontWeight: 700, color: '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.5rem', cursor: status === 'submitting' ? 'wait' : 'pointer',
                            opacity: status === 'submitting' ? 0.7 : 1,
                        }}
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 size={16} className="spin-slow" style={{ animation: 'slow-spin 1s linear infinite' }} />
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

            <style>{`
                @media (max-width: 640px) {
                    .form-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    )
}
