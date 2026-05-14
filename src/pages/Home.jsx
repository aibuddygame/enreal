import { useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import ProblemSection from '../components/home/ProblemSection.jsx'
import SolutionSection from '../components/home/SolutionSection.jsx'
import AIWorkforceGrid from '../components/home/AIWorkforceGrid.jsx'
import AIEmployeeDetails from '../components/home/AIEmployeeDetails.jsx'
import WorkflowSection from '../components/home/WorkflowSection.jsx'
import DeploymentSection from '../components/home/DeploymentSection.jsx'
import ConsultationForm from '../components/home/ConsultationForm.jsx'
import ClosingCTASection from '../components/home/ClosingCTASection.jsx'
import Footer from '../components/Footer.jsx'
import { AI_EMPLOYEES } from '../data.js'

const HOME_NAV_LINKS = [
    { label: 'AI Workforce', id: 'ai-workforce' },
    { label: 'How It Works', id: 'workflow' },
    { label: 'Deployment', id: 'deployment' },
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
            <ProblemSection />
            <SolutionSection />
            <AIWorkforceGrid employees={AI_EMPLOYEES} onSelect={scrollToEmployee} />
            <AIEmployeeDetails employees={AI_EMPLOYEES} />
            <WorkflowSection />
            <DeploymentSection />
            <ConsultationForm />
            <ClosingCTASection />
            <Footer
                navLinks={HOME_NAV_LINKS}
                brandText="Your Reliable AI Workforce Partner. Practical AI employees backed by dedicated human implementation support."
                accentColor="#2563EB"
            />
        </main>
        </>
    )
}
