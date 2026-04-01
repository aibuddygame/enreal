import { Routes, Route } from 'react-router-dom'
import { CustomCursor } from './components/ui/custom-cursor.jsx'
import LandingPage from './pages/Business.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import Mother from './pages/Home.jsx'
import IndividualPage from './pages/Individual.jsx'
import CoursePage from './pages/Course.jsx'
import EnrollmentForm from './pages/EnrollmentForm.jsx'

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
                <Route path="/" element={<Mother />} />
                <Route path="/business" element={<LandingPage />} />
                <Route path="/individual" element={<IndividualPage lang="en" />} />
                <Route path="/individual/zh" element={<IndividualPage lang="zh" />} />
                <Route path="/course" element={<CoursePage lang="zh" />} />
                <Route path="/course/en" element={<CoursePage lang="en" />} />
                <Route path="/enroll" element={<EnrollmentForm />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
            </Routes>
        </>
    )
}
