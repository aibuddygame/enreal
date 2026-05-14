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

    return (
        <>
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
