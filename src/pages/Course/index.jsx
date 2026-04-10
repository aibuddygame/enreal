import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IndividualNavbar from '../../components/IndividualNavbar.jsx';
import Footer from '../../components/Footer.jsx';
import { AllianceSection } from '../../components/ui/alliance-section.jsx';
import Seo from '../../components/Seo.jsx';
import { Hero } from './sections/Hero.jsx';
import { Philosophy } from './sections/Philosophy.jsx';
import { getCourseContent, getCourseSEO } from '../../hooks/useCourseContent.js';
import '../../styles/variables.css';

gsap.registerPlugin(ScrollTrigger);

// Schema.org structured data generators
const getCourseSchema = (lang, content) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: lang === 'en' 
    ? 'AI Career Accelerator: 7 Lessons to Become Your Company\'s AI Leader'
    : 'AI職業加速器：7堂課成為公司AI負責人',
  description: content.hero.desc.replace(/<br>/g, ' '),
  provider: {
    '@type': 'Organization',
    name: 'Enreal AI',
    url: 'https://enreal-ai.vercel.app',
  },
  courseMode: 'onsite',
  educationalLevel: 'Professional',
  inLanguage: lang === 'en' ? 'en-US' : 'zh-HK',
  url: lang === 'en' 
    ? 'https://enreal-ai.vercel.app/course/en' 
    : 'https://enreal-ai.vercel.app/course',
  numberOfLessons: 7,
  timeRequired: 'P7D',
  teaches: lang === 'en' 
    ? ['AI Strategy', 'AI Tool Mastery', 'MVP Development', 'Executive Presentation', 'AI Leadership']
    : ['AI策略', 'AI工具掌握', 'MVP開發', '高管展示', 'AI領導力'],
  audience: {
    '@type': 'Audience',
    audienceType: lang === 'en' 
      ? 'Mid-level professionals aged 30-45'
      : '30-45歲中層專業人士'
  },
  offers: {
    '@type': 'Offer',
    price: '2000',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-04-01',
    category: 'Professional Training'
  }
});

const getBreadcrumbSchema = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: lang === 'en' ? 'Home' : '首頁',
      item: 'https://enreal-ai.vercel.app/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: lang === 'en' ? 'AI Career Course' : 'AI職業課程',
      item: lang === 'en' 
        ? 'https://enreal-ai.vercel.app/course/en' 
        : 'https://enreal-ai.vercel.app/course'
    }
  ]
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Enreal AI',
  url: 'https://enreal-ai.vercel.app',
  logo: 'https://enreal-ai.vercel.app/logo.png',
  sameAs: [],
  description: 'The intelligence layer for professionals entering an AI-native economy.'
};

// Legacy theme object for components not yet migrated
const T = {
  bg: '#FFFFFF',
  surface: '#F7F9FB',
  surfaceAlt: '#EEF1F6',
  text: '#181818',
  muted: '#5A5A5A',
  border: 'rgba(0,0,0,0.08)',
  primary: '#0176D3',
  primaryLight: '#E8F4FD',
  primaryDark: '#014486',
  secondary: '#1B96FF',
  success: '#2E844A',
  warning: '#F59E0B',
  danger: '#C23934',
};

export default function CoursePage({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'zh');
  const mainRef = useRef(null);
  const navigate = useNavigate();
  
  // Load content from JSON
  const content = getCourseContent(lang);
  const seo = getCourseSEO(lang);

  // Sync URL with language selection
  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (newLang === 'zh') {
      navigate('/course', { replace: true });
    } else {
      navigate('/course/en', { replace: true });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.config({ nullTargetWarn: false });
      
      // Global scroll animations are now handled by AnimatedSection components
      // This can be removed once all sections are migrated
    }, mainRef);
    
    return () => ctx.revert();
  }, []);

  const path = lang === 'en' ? '/course/en' : '/course';
  const alternates = [
    { hrefLang: 'en', href: '/course/en' },
    { hrefLang: 'zh-Hant', href: '/course' },
    { hrefLang: 'x-default', href: '/course' }
  ];

  const courseSchema = getCourseSchema(lang, content);
  const breadcrumbSchema = getBreadcrumbSchema(lang);

  return (
    <div 
      ref={mainRef} 
      style={{ 
        background: 'var(--color-bg)', 
        color: 'var(--color-text)', 
        fontFamily: 'var(--font-family-sans)',
        overflowX: 'hidden' 
      }}
    >
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        alternates={alternates}
        schema={[courseSchema, organizationSchema, breadcrumbSchema]}
      />
      
      <IndividualNavbar />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main>
          {/* New refactored sections */}
          <Hero t={content} />
          <Philosophy t={content} theme={T} />
          
          {/* Legacy sections (to be refactored) */}
          <LearningOutcomes t={{ ...content, outcomesSection: content.outcomesSection, outcomes: content.outcomes }} />
          <CurriculumOverview t={{ ...content, curriculumSection: content.curriculumSection, curriculum: content.curriculum }} />
          <ForWho t={{ ...content, forWho: content.forWho }} />
          <AllianceSection t={content} />
          <Pricing t={{ ...content, pricing: content.pricing }} />
        </main>
        
        <Footer 
          navLinks={content.footer.nav} 
          brandText={content.footer.brandText} 
          accentColor="#059669" 
        />
      </div>

      {/* Language Toggle */}
      <div 
        className="lang-toggle" 
        style={{ 
          position: 'fixed', 
          top: '100px', 
          right: '20px', 
          zIndex: 100, 
          display: 'flex', 
          gap: '8px', 
          background: 'rgba(255,255,255,0.95)', 
          padding: '8px', 
          borderRadius: '999px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
          border: '1px solid rgba(0,0,0,0.08)' 
        }}
      >
        <button 
          onClick={() => handleLangChange('en')} 
          style={{ 
            padding: '8px 16px', 
            borderRadius: '999px', 
            border: 'none', 
            background: lang === 'en' ? '#059669' : 'transparent', 
            color: lang === 'en' ? 'white' : '#0B0B0C', 
            fontWeight: 600, 
            cursor: 'pointer', 
            fontSize: '0.9rem' 
          }}
        >
          EN
        </button>
        <button 
          onClick={() => handleLangChange('zh')} 
          style={{ 
            padding: '8px 16px', 
            borderRadius: '999px', 
            border: 'none', 
            background: lang === 'zh' ? '#DC2626' : 'transparent', 
            color: lang === 'zh' ? 'white' : '#0B0B0C', 
            fontWeight: 600, 
            cursor: 'pointer', 
            fontSize: '0.9rem' 
          }}
        >
          中文
        </button>
      </div>
    </div>
  );
}

// Legacy section components (to be refactored in future)
// These are simplified versions - the full implementations would be moved to separate files

function LearningOutcomes({ t }) {
  // Simplified legacy implementation
  return (
    <section id="outcomes" style={{ padding: '10rem 5vw', background: T.surface }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2>{t.outcomesSection.title}</h2>
        {/* Legacy content */}
      </div>
    </section>
  );
}

function CurriculumOverview({ t }) {
  return (
    <section id="curriculum" style={{ padding: '8rem 5vw', background: T.bg }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2>{t.curriculumSection.title}</h2>
        {/* Legacy content */}
      </div>
    </section>
  );
}

function ForWho({ t }) {
  return (
    <section id="for-who" style={{ padding: '8rem 5vw', background: T.surface }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2>{t.forWho.title}</h2>
        {/* Legacy content */}
      </div>
    </section>
  );
}

function Pricing({ t }) {
  return (
    <section id="pricing" style={{ padding: '8rem 5vw', background: T.surfaceAlt }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2>{t.pricing.title}</h2>
        <button onClick={() => window.location.href = '/enroll'}>
          {t.pricing.cta}
        </button>
      </div>
    </section>
  );
}
