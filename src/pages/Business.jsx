import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Capabilities from '../components/Capabilities.jsx'
import Work from '../components/Work.jsx'
import Philosophy from '../components/Philosophy.jsx'
import Method from '../components/Method.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import { NAV, T } from '../data.js'

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
            <Footer navLinks={NAV} />
        </div>
    )
}
