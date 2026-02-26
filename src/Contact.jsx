import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Mail, AlertCircle, Loader } from 'lucide-react'
import { T } from './data.js'

gsap.registerPlugin(ScrollTrigger)

// ── EmailJS credentials ─────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add Email Service → get SERVICE_ID
// 3. Create Email Template → get TEMPLATE_ID (use variables: {{from_name}}, {{from_email}}, {{company}}, {{message}})
// 4. Account → API Keys → get PUBLIC_KEY
const EMAILJS_SERVICE_ID = 'service_09wtwnb'
const EMAILJS_TEMPLATE_ID = 'template_umxh338'
const EMAILJS_PUBLIC_KEY = 'z4upBtbceRl50m24S'

const DISPLAY_EMAIL = 'hello@enreallab.com.hk'

// ── Validation ──────────────────────────────────────────────
const validate = ({ name, email, message }) => {
    const errs = {}
    if (!name.trim() || name.trim().length < 2)
        errs.name = 'Please enter your full name (min 2 characters).'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        errs.email = 'Please enter a valid email address.'
    if (!message.trim() || message.trim().length < 10)
        errs.message = 'Message must be at least 10 characters.'
    return errs
}

export default function Contact() {
    const ref = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
    const [errs, setErrs] = useState({})
    const [touched, setTouched] = useState({})
    const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cnt-item', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const set = k => e => {
        const val = e.target.value
        setForm(p => ({ ...p, [k]: val }))
        if (touched[k]) setErrs(validate({ ...form, [k]: val }))
    }

    const touch = k => () => {
        setTouched(p => ({ ...p, [k]: true }))
        setErrs(validate(form))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setTouched({ name: true, email: true, message: true })
        const errors = validate(form)
        setErrs(errors)
        if (Object.keys(errors).length > 0) return

        setStatus('sending')
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    company: form.company || '—',
                    message: form.message,
                },
                EMAILJS_PUBLIC_KEY,
            )
            setStatus('sent')
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
        }
    }

    const inputStyle = k => ({
        width: '100%', padding: '0.82rem 1rem', borderRadius: '0.875rem',
        background: T.card, border: `1px solid ${errs[k] && touched[k] ? '#EF4444' : T.border}`,
        color: T.text, fontFamily: 'Inter,sans-serif', fontSize: '0.875rem',
        outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: errs[k] && touched[k] ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
    })
    const onFocus = k => e => {
        if (!errs[k]) Object.assign(e.target.style, { borderColor: 'rgba(37,99,235,0.45)', boxShadow: '0 0 0 3px rgba(37,99,235,0.08)' })
    }
    const onBlurFn = k => e => {
        touch(k)()
        if (!errs[k]) Object.assign(e.target.style, { borderColor: T.border, boxShadow: 'none' })
    }

    return (
        <section ref={ref} id="contact" style={{ padding: '8rem 5vw', background: T.bg, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div className="cnt-item" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.accent, marginBottom: '1.25rem' }}>
            // CONTACT
                    </p>
                    <h2 style={{
                        fontFamily: 'Inter,sans-serif', fontWeight: 900,
                        fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.04em', color: T.text,
                        marginBottom: '1rem', lineHeight: 1.05,
                    }}>
                        Execute Faster.{' '}
                        <span style={{ color: T.accent }}>Starting Today.</span>
                    </h2>
                    <p style={{
                        fontFamily: 'Manrope,sans-serif', fontSize: '1rem', color: T.muted,
                        maxWidth: 440, margin: '0 auto', lineHeight: 1.7,
                    }}>
                        Tell us what you're building. We respond within 24 hours.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start', maxWidth: 880, margin: '0 auto' }}
                    className="contact-grid">

                    {/* Left — info */}
                    <div className="cnt-item" style={{ paddingTop: '0.5rem' }}>
                        <a href={`mailto:${DISPLAY_EMAIL}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                                fontFamily: 'JetBrains Mono,monospace', fontSize: '0.875rem', color: T.accent,
                                textDecoration: 'none', marginBottom: '2rem',
                            }}>
                            <Mail size={15} /> {DISPLAY_EMAIL}
                        </a>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            {['Hong Kong', 'SEA Region', 'Global delivery'].map(l => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="cnt-item" style={{
                        background: T.surface, border: `1px solid ${T.border}`,
                        borderRadius: '2rem', padding: '2rem', boxShadow: T.shadow,
                    }}>
                        {status === 'sent' ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: '50%', background: T.accentL,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                                }}>
                                    <span style={{ color: T.accent, fontSize: '1.25rem' }}>✓</span>
                                </div>
                                <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, color: T.text, marginBottom: '0.35rem' }}>
                                    Message sent.
                                </p>
                                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: T.muted }}>
                                    We'll respond within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate
                                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                <Field label="NAME *" error={touched.name && errs.name}>
                                    <input type="text" placeholder="Your full name" required
                                        value={form.name} onChange={set('name')}
                                        onBlur={onBlurFn('name')} onFocus={onFocus('name')}
                                        style={inputStyle('name')} />
                                </Field>

                                <Field label="EMAIL *" error={touched.email && errs.email}>
                                    <input type="email" placeholder="you@company.com" required
                                        value={form.email} onChange={set('email')}
                                        onBlur={onBlurFn('email')} onFocus={onFocus('email')}
                                        style={inputStyle('email')} />
                                </Field>

                                <Field label="COMPANY (OPTIONAL)">
                                    <input type="text" placeholder="Company name"
                                        value={form.company} onChange={set('company')}
                                        style={inputStyle('company')} onFocus={onFocus('company')} />
                                </Field>

                                <Field label="MESSAGE *" error={touched.message && errs.message}>
                                    <textarea rows={4} required placeholder="Describe your project or challenge…"
                                        value={form.message} onChange={set('message')}
                                        onBlur={onBlurFn('message')} onFocus={onFocus('message')}
                                        style={{ ...inputStyle('message'), resize: 'none' }} />
                                </Field>

                                {status === 'error' && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)',
                                        borderRadius: '0.75rem', padding: '0.75rem 1rem'
                                    }}>
                                        <AlertCircle size={14} color="#EF4444" />
                                        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: '#EF4444' }}>
                                            Failed to send. Please email us directly at {DISPLAY_EMAIL}
                                        </span>
                                    </div>
                                )}

                                <button type="submit" disabled={status === 'sending'} className="btn-mag" style={{
                                    width: '100%', padding: '0.9rem', borderRadius: '0.875rem',
                                    background: status === 'sending' ? 'rgba(37,99,235,0.6)' : T.accent,
                                    border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', fontWeight: 700, color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
                                    transition: 'background 0.2s',
                                }}>
                                    <span className="slide" style={{ background: T.accentD }} />
                                    <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {status === 'sending'
                                            ? <><Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                                            : <>Book an AI Consultation <ArrowRight size={15} /></>
                                        }
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width:768px) { .contact-grid { grid-template-columns:1fr !important; gap:3rem !important; } }
        input::placeholder, textarea::placeholder { color:rgba(28,28,30,0.32); }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
        </section>
    )
}

function Field({ label, error, children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
            <label className="f-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: T.muted }}>
                {label}
            </label>
            {children}
            {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertCircle size={12} color="#EF4444" />
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#EF4444' }}>{error}</span>
                </div>
            )}
        </div>
    )
}
