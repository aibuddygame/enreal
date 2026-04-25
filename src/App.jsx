import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Seo, { seoBase } from './components/Seo.jsx'

const CustomCursor = lazy(() => import('./components/ui/custom-cursor.jsx').then((module) => ({ default: module.CustomCursor })))
const LandingPage = lazy(() => import('./pages/Business.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))

const CoursePage = lazy(() => import('./pages/Course.jsx'))
const EnrollmentForm = lazy(() => import('./pages/EnrollmentForm.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))

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
        title: '7堂課成為公司AI負責人 | Enreal AI 職業加速器',
        description: '專為中層專業人士設計的AI職業加速器。7堂課學會領導公司AI轉型,建立MVP作品集,在真實CEO面前展示成果。不要只是學AI--成為AI領導。',
        alternates: [
            { hrefLang: 'zh-Hant', href: '/course' },
            { hrefLang: 'en', href: '/course/en' },
        ],
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI職業加速器:7堂課成為公司AI負責人',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/course`,
            description: '專為30-45歲中層專業人士設計。MVP作品集 + CEO人脈網絡 + 升職加薪籌碼',
        },
    },
    '/course/en': {
        title: '7 Sessions to Become Your Company\'s AI Lead | Enreal AI Career Accelerator',
        description: 'An AI career accelerator for mid-level professionals. 7 sessions to lead your company\'s AI transformation, build an MVP portfolio, and present to real CEOs. Don\'t just learn AI-become an AI leader.',
        alternates: [
            { hrefLang: 'zh-Hant', href: '/course' },
            { hrefLang: 'en', href: '/course/en' },
        ],
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI Career Accelerator: 7 Sessions to Become Your Company\'s AI Lead',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/course/en`,
            description: 'Designed for professionals ages 30-45. MVP portfolio + CEO network + promotion credentials',
        },
    },
    '/enroll': {
        title: 'Apply for the AI Mid-Level Promotion Course | Enreal AI',
        description: "Submit your application for Enreal AI's bilingual AI course and join a practical program built for professionals and managers.",
        schema: {
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: 'AI Mid-Level Promotion Course Application',
            provider: { '@type': 'Organization', name: 'Enreal AI', sameAs: seoBase.baseUrl },
            url: `${seoBase.baseUrl}/enroll`,
        },
    },
    '/gps-faker/privacy': {
        title: 'GPS Faker Privacy Policy',
        description: 'Privacy policy for GPS Faker app - mock location tool for Android. Learn how we handle your location data.',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'GPS Faker Privacy Policy',
            url: `${seoBase.baseUrl}/gps-faker/privacy`,
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
                    <Route path="/gps-faker/privacy" element={<PrivacyPolicy />} />
                    <Route path="/individual" element={<Navigate to="/course" replace />} />
                    <Route path="/individual/zh" element={<Navigate to="/course" replace />} />
                    <Route path="/work/:slug" element={<ProjectPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </>
    )
}
