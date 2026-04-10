import { Box, Settings, Lock, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils.js';
import { AnimatedSection } from '../../../components/ui/AnimatedSection.jsx';

const PHILOSOPHY_STYLES = {
  section: {
    padding: '8rem 5vw',
    background: 'var(--color-surface)',
  },
  container: {
    maxWidth: 1000,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  eyebrow: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    color: '#059669',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    fontWeight: 700,
    color: 'var(--color-primary)',
    lineHeight: 1.4,
  },
  grid: {
    marginTop: '4rem',
  },
};

const FEATURE_GRID_AREAS = [
  'md:[grid-area:1/1/2/7]',
  'md:[grid-area:1/7/2/13]',
  'md:[grid-area:2/1/3/7]',
  'md:[grid-area:2/7/3/13]',
];

const ICONS = [Box, Settings, Lock, Sparkles];

export function Philosophy({ t, theme }) {
  const features = t.shift.features.map((feature, i) => ({
    ...feature,
    icon: ICONS[i],
  }));

  return (
    <section id="program" style={PHILOSOPHY_STYLES.section}>
      <div style={PHILOSOPHY_STYLES.container}>
        <AnimatedSection animation={{ y: 30, duration: 0.8 }}>
          <div style={PHILOSOPHY_STYLES.header}>
            <p style={PHILOSOPHY_STYLES.eyebrow}>{t.shift.eyebrow}</p>
            <h2 
              style={PHILOSOPHY_STYLES.title} 
              dangerouslySetInnerHTML={{ __html: t.shift.title }}
            />
            <p style={PHILOSOPHY_STYLES.subtitle}>{t.shift.subtitle}</p>
          </div>
        </AnimatedSection>

        <div style={PHILOSOPHY_STYLES.grid}>
          <AnimatedSection stagger animation={{ y: 20, duration: 0.8, stagger: 0.1 }}>
            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
              {features.map((item, i) => (
                <li 
                  key={i} 
                  className={cn('min-h-[14rem] list-none', FEATURE_GRID_AREAS[i])}
                >
                  <div className="group relative h-full rounded-[1.25rem] border-[1px] border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:rounded-[1.5rem] md:p-8">
                    <div className="relative flex flex-1 flex-col justify-between gap-6">
                      <div className="w-fit rounded-lg border-[1px] border-[rgba(0,0,0,0.05)] bg-[#F5F5F7] p-2.5 text-[#0B0B0C] transition-colors duration-400 group-hover:bg-[#E8E8EB]">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#0B0B0C]">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-[#52525B]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
