import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar.jsx'
import Hero from '../Hero.jsx'
import Capabilities from '../Capabilities.jsx'
import Work from '../Work.jsx'
import Philosophy from '../Philosophy.jsx'
import Method from '../Method.jsx'
import About from '../About.jsx'
import Contact from '../Contact.jsx'
import Footer from '../Footer.jsx'
import { T } from '../data.js'

export default function LandingPage() {
    const location = useLocation()

    // Scroll to section when navigating back from inner page with state
    useEffect(() => {
        if (location.state?.scrollTo) {
            const id = location.state.scrollTo
            // Small delay to let page fully render
            const t = setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }, 120)
            return () => clearTimeout(t)
        }
    }, [location.state])

    return (
        <div className="page-enter" style={{ background: T.bg, color: T.text, minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />
            <main>
                <Hero />
                <Capabilities />
                <Work />
                <Philosophy />
                <Method />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
