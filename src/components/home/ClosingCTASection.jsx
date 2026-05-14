import { ArrowRight, Mail } from 'lucide-react'

export default function ClosingCTASection() {
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="closing" style={{
            padding: '6rem 5vw',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative glow */}
            <div aria-hidden style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: '50vw', height: '50vw', maxWidth: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0) 70%)',
                pointerEvents: 'none',
            }} />
            <div aria-hidden style={{
                position: 'absolute', bottom: '-20%', left: '-10%',
                width: '40vw', height: '40vw', maxWidth: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, rgba(234,88,12,0) 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    letterSpacing: '-0.02em', lineHeight: 1.15,
                    color: '#fff', marginBottom: '1rem',
                }}>
                    Build Your Reliable AI Workforce with Enreal Lab
                </h2>
                <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.25rem',
                }}>
                    From first consultation to full operations, we are your partner in making AI work reliably for your business.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
                    <button onClick={() => go('consultation')} className="btn-mag" style={{
                        padding: '0.95rem 2rem', borderRadius: 999,
                        background: '#2563EB', border: 'none',
                        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                        fontWeight: 700, color: '#fff',
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        boxShadow: '0 4px 24px rgba(37,99,235,0.35)',
                    }}>
                        <span className="slide" style={{ background: '#1D4ED8' }} />
                        <span className="label">Book a Free Consultation <ArrowRight size={15} /></span>
                    </button>

                    <a href="mailto:hello@enreallab.com.hk" className="btn-mag" style={{
                        padding: '0.95rem 2rem', borderRadius: 999,
                        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                        fontWeight: 500, color: '#fff',
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        textDecoration: 'none',
                    }}>
                        <Mail size={15} /> hello@enreallab.com.hk
                    </a>
                </div>
            </div>
        </section>
    )
}
