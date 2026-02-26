import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { TIERS, T } from './data.js'

export default function Pricing() {
    return (
        <section id="pricing" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <p className="f-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, marginBottom: '1.25rem' }}>
          // PRICING
                </p>
                <h2 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                    letterSpacing: '-0.035em', color: T.ivory, marginBottom: '1rem'
                }}>
                    Choose Your{' '}
                    <em className="f-serif" style={{ color: T.gold, fontStyle: 'italic' }}>Engagement</em>
                </h2>
                <p style={{
                    fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: T.muted,
                    maxWidth: 520, lineHeight: 1.7, marginBottom: '4rem'
                }}>
                    From rapid prototypes to enterprise-scale systems — every engagement is tailor-made.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.25rem', alignItems: 'start' }}>
                    {TIERS.map(tier => <TierCard key={tier.name} {...tier} />)}
                </div>
            </div>
        </section>
    )
}

function TierCard({ name, price, period, desc, features, cta, featured }) {
    const [hov, setHov] = useState(false)

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                borderRadius: '2rem', padding: '2rem',
                background: featured ? T.slate : T.card,
                border: featured
                    ? `2px solid ${T.gold}`
                    : `1px solid ${hov ? T.borderH : T.border}`,
                transform: featured
                    ? 'scale(1.04)'
                    : hov ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: featured
                    ? `0 0 60px rgba(201,168,76,0.18), 0 20px 60px rgba(0,0,0,0.4)`
                    : hov ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
                position: 'relative', overflow: 'hidden',
            }}
        >
            {featured && (
                <div style={{
                    position: 'absolute', top: '1.1rem', right: '1.25rem',
                    background: T.gold, color: '#0D0D12', borderRadius: 999,
                    padding: '0.2rem 0.7rem', fontFamily: 'JetBrains Mono,monospace',
                    fontSize: '0.62rem', letterSpacing: '0.1em', fontWeight: 700,
                }}>RECOMMENDED</div>
            )}

            <div>
                <h3 style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.1rem',
                    letterSpacing: '-0.02em', marginBottom: '0.25rem'
                }}>{name}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: T.muted }}>{desc}</p>
            </div>

            <div>
                <p style={{
                    fontFamily: 'Inter,sans-serif', fontWeight: 900, fontSize: '2rem',
                    letterSpacing: '-0.04em', color: featured ? T.gold : T.ivory
                }}>{price}</p>
                <p className="f-mono" style={{ fontSize: '0.68rem', color: T.muted, letterSpacing: '0.08em' }}>
                    {period.toUpperCase()}
                </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {features.map(f => (
                    <li key={f} style={{
                        display: 'flex', alignItems: 'center', gap: '0.65rem',
                        fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: 'rgba(250,248,245,0.8)'
                    }}>
                        <Check size={14} style={{ color: T.gold, flexShrink: 0 }} />
                        {f}
                    </li>
                ))}
            </ul>

            <button
                style={{
                    width: '100%', padding: '0.85rem', borderRadius: '1rem',
                    background: featured ? T.gold : 'rgba(201,168,76,0.1)',
                    border: featured ? 'none' : `1px solid ${T.borderH}`,
                    fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', fontWeight: 700,
                    color: featured ? '#0D0D12' : T.gold,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = featured ? '#FAF8F5' : T.gold
                    e.currentTarget.style.color = '#0D0D12'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = featured ? T.gold : 'rgba(201,168,76,0.1)'
                    e.currentTarget.style.color = featured ? '#0D0D12' : T.gold
                }}
            >
                {cta} <ArrowRight size={15} />
            </button>
        </div>
    )
}
