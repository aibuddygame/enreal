import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Seo, { seoBase } from './components/Seo.jsx'

const CustomCursor = lazy(() => import('./components/ui/custom-cursor.jsx').then((module) => ({ default: module.CustomCursor })))
const LandingPage = lazy(() => import('./pages/Business.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))

const CoursePage = lazy(() => import('./pages/Course.jsx'))
const EnrollmentForm = lazy(() => import('./pages/EnrollmentForm.jsx'))

const routeSeo = {
    '/': {
        title: 'Enreal AI, AI Consulting and Executive AI Programs in Hong Kong',
        description: 'Enreal AI helps businesses and professionals in Hong Kong adopt AI through consulting, automation strategy, and executive-ready AI training programs.',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Enreal AI',
            url: seoBase.baseUrl,
        },
    },
    '/business': {
        title: 'Business AI Consulting, Workflow Automation and AI Strategy | Enreal AI',
        description: 'AI consulting for Hong Kong teams, from workflow automation and decision support to practical AI implementation for growth and operations.',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Enreal AI',
            url: `${seoBase.baseUrl}/business`,
            areaServed: 'Hong Kong',
            serviceType: 'AI consulting and workflow automation',
        },
    },

    '/course': {
        title: 'AI Mid-Level Promotion Course | Enreal AI',
        description: 'A bilingual AI course for mid-level professionals who need to propose, build, and present AI solutions that matter to management.',
        alternates: [
            { hrefLang: 'zh-Hant', href: '/course' },
            { hrefLang: 'en', href: '/course/en' },
        ],
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI 中層晉升課程',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/course`,
        },
    },
    '/course/en': {
        title: 'AI Mid-Level Promotion Course | Enreal AI',
        description: 'A practical AI program for managers and professionals to design workflows, build MVPs, and present AI transformation ideas with credibility.',
        alternates: [
            { hrefLang: 'zh-Hant', href: '/course' },
            { hrefLang: 'en', href: '/course/en' },
        ],
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI Mid-Level Promotion Course',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/course/en`,
        },
    },
    '/enroll': {
        title: 'Apply for the AI Mid-Level Promotion Course | Enreal AI',
        description: 'Submit your application for Enreal AI’s bilingual AI course and join a practical program built for professionals and managers.',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: 'AI Mid-Level Promotion Course Application',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/enroll`,
        },
    },
}

function RouteSeo() {
    const location = useLocation()
    const seo = routeSeo[location.pathname] || {
        title: 'Enreal AI',
        description: 'Enreal AI helps businesses and professionals adopt AI with practical consulting and education.',
    }

    return <Seo path={location.pathname} {...seo} />
}

function AppFallback() {
    return <div style={{ minHeight: '100vh', background: '#fff' }} aria-hidden="true" />
}

export default function App() {
    return (
        <>
            <RouteSeo />
            <Suspense fallback={null}>
                <CustomCursor cursorType="circle-and-dot" color="#2563EB" size={18} />
            </Suspense>
            <Suspense fallback={<AppFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/business" element={<LandingPage />} />

                    <Route path="/course" element={<CoursePage lang="zh" />} />
                    <Route path="/course/en" element={<CoursePage lang="en" />} />
                    <Route path="/enroll" element={<EnrollmentForm />} />
                    <Route path="/individual" element={<Navigate to="/course" replace />} />
                    <Route path="/individual/zh" element={<Navigate to="/course" replace />} />
                    <Route path="/work/:slug" element={<ProjectPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </>
    )
}
