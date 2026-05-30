import { useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import AIWorkforceGrid from '../components/home/AIWorkforceGrid.jsx'
import AIEmployeeDetails from '../components/home/AIEmployeeDetails.jsx'
import WhyAIHuman from '../components/home/WhyAIHuman.jsx'
import WorkflowSection from '../components/home/WorkflowSection.jsx'
// WhoThisIsFor removed per user request
// PricingSection removed per user request
import ConsultationForm from '../components/home/ConsultationForm.jsx'
import ClosingCTASection from '../components/home/ClosingCTASection.jsx'
import Footer from '../components/Footer.jsx'
import Seo, { seoBase } from '../components/Seo.jsx'
import { AI_EMPLOYEES } from '../data.js'

const HOME_NAV_LINKS = [
    { label: 'AI Workforce', id: 'ai-workforce' },
    { label: 'How It Works', id: 'workflow' },
    { label: 'Consultation', id: 'consultation' },
]

export default function HomePage() {
    const scrollToEmployee = useCallback((id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])

    const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                name: 'Enreal AI',
                alternateName: ['Enreal', 'enreallab.com.hk'],
                url: seoBase.baseUrl,
                description: 'Deploy reliable AI employees backed by dedicated human support',
                publisher: {
                    '@type': 'Organization',
                    name: 'Enreal AI',
                    url: seoBase.baseUrl,
                    logo: {
                        '@type': 'ImageObject',
                        url: `${seoBase.baseUrl}/favicon.svg`,
                    },
                },
            },
            {
                '@type': 'Organization',
                name: 'Enreal AI',
                alternateName: ['Enreal'],
                url: seoBase.baseUrl,
                logo: `${seoBase.baseUrl}/favicon.svg`,
                sameAs: [],
                description: 'Your Reliable AI Workforce Partner in Hong Kong',
            },
            {
                '@type': 'LocalBusiness',
                name: 'Enreal AI',
                alternateName: ['Enreal'],
                url: seoBase.baseUrl,
                description: 'AI workforce deployment and consulting services in Hong Kong',
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'HK',
                    addressLocality: 'Hong Kong',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '22.3193',
                    longitude: '114.1694',
                },
                priceRange: '$$$',
            },
        ],
    }

    return (
        <>
            <Seo
                title="Enreal AI | Your Reliable AI Workforce Partner in Hong Kong"
                description="Enreal AI helps businesses deploy reliable AI employees across operations, reporting, marketing, customer service, administration, and software workflows — backed by dedicated human implementation support. Starting from USD 2,000/month per AI employee."
                path="/"
                keywords="AI Employee, AI Workforce, AI Agent, Agentic AI, AI Secretary, business automation, AI consulting, Hong Kong AI, workflow automation, AI implementation, AI staff, digital workforce"
                schema={homeSchema}
            />
            <Navbar />
            <main className="bg-white">
                <HeroSection />
                <AIWorkforceGrid employees={AI_EMPLOYEES} onSelect={scrollToEmployee} />
                <AIEmployeeDetails employees={AI_EMPLOYEES} />
                <WhyAIHuman />
                <WorkflowSection />
                <ConsultationForm />
                <ClosingCTASection />
            </main>
            <Footer
                navLinks={HOME_NAV_LINKS}
                brandText="Your Reliable AI Workforce Partner. Practical AI employees backed by dedicated human implementation support."
                accentColor="#EA580C"
            />
        </>
    )
}
