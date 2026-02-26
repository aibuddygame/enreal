import { Routes, Route } from 'react-router-dom'
import { CustomCursor } from './components/ui/custom-cursor.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

export default function App() {
    return (
        <>
            {/* Global custom cursor — rendered once, works on all pages */}
            <CustomCursor
                cursorType="circle-and-dot"
                color="#2563EB"
                size={18}
            />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
            </Routes>
        </>
    )
}
