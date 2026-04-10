import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../../../components/ui/AnimatedSection.jsx';
import { TypewriterText } from '../../../components/ui/TypewriterText.jsx';

const HERO_STYLES = {
  section: {
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5vw',
    position: 'relative',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%)',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at 20% 50%, rgba(5, 150, 105, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 60% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)',
    pointerEvents: 'none',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: 900,
    marginTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  eyebrow: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.7rem',
    letterSpacing: '0.22em',
    color: '#34d399',
    marginBottom: '1.5rem',
    opacity: 0.95,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    marginBottom: '0.75rem',
    whiteSpace: 'normal',
    maxWidth: '95vw',
    color: '#ffffff',
  },
  typewriterContainer: {
    minHeight: '3rem',
    marginBottom: '1.5rem',
    width: '100%',
    maxWidth: '900px',
    padding: '0 1rem',
  },
  typewriter: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: 'clamp(1rem, 4vw, 2rem)',
    color: '#60a5fa',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  description: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.8,
    maxWidth: 550,
    margin: '0 auto 2.5rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: '#059669',
    color: '#ffffff',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: 999,
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
  },
  secondaryButton: {
    background: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    padding: '1rem 1.5rem',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 999,
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    backdropFilter: 'blur(10px)',
  },
};

export function Hero({ t }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handlePrimaryHover = (e, isEnter) => {
    e.currentTarget.style.transform = isEnter ? 'scale(1.03)' : 'scale(1)';
    e.currentTarget.style.boxShadow = isEnter 
      ? '0 6px 20px rgba(5, 150, 105, 0.5)' 
      : '0 4px 14px rgba(5, 150, 105, 0.4)';
  };

  const handleSecondaryHover = (e, isEnter) => {
    e.currentTarget.style.background = isEnter ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';
    e.currentTarget.style.borderColor = isEnter ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)';
  };

  return (
    <section id="hero" style={HERO_STYLES.section}>
      <div style={HERO_STYLES.gradientOverlay} />
      <div style={HERO_STYLES.gridOverlay} />
      
      <div style={HERO_STYLES.container}>
        <AnimatedSection animation={{ y: 30, duration: 1.2, delay: 0.2 }}>
          <p style={HERO_STYLES.eyebrow}>{t.hero.eyebrow}</p>
        </AnimatedSection>
        
        <AnimatedSection animation={{ y: 30, duration: 1.2, delay: 0.28 }}>
          <h1 style={HERO_STYLES.title}>{t.hero.title}</h1>
        </AnimatedSection>
        
        <AnimatedSection animation={{ y: 30, duration: 1.2, delay: 0.36 }}>
          <div style={HERO_STYLES.typewriterContainer}>
            <TypewriterText
              phrases={t.phrases}
              typingSpeed={60}
              deletingSpeed={30}
              pauseDuration={1500}
              style={HERO_STYLES.typewriter}
            />
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation={{ y: 30, duration: 1.2, delay: 0.44 }}>
          <p 
            style={HERO_STYLES.description} 
            dangerouslySetInnerHTML={{ __html: t.hero.desc }}
          />
        </AnimatedSection>
        
        <AnimatedSection animation={{ y: 30, duration: 1.2, delay: 0.52 }}>
          <div style={HERO_STYLES.buttonContainer}>
            <button 
              onClick={() => go('pricing')} 
              style={HERO_STYLES.primaryButton}
              onMouseEnter={(e) => handlePrimaryHover(e, true)}
              onMouseLeave={(e) => handlePrimaryHover(e, false)}
            >
              {t.hero.ctaPrimary} <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => go('program')} 
              style={HERO_STYLES.secondaryButton}
              onMouseEnter={(e) => handleSecondaryHover(e, true)}
              onMouseLeave={(e) => handleSecondaryHover(e, false)}
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
