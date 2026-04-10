import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import IndividualNavbar from '../components/IndividualNavbar.jsx'
import Footer from '../components/Footer.jsx'
import {
    EMAILJS_SERVICE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_TEMPLATE_ENROLLMENT,
} from '../lib/emailjsConfig.js'

const T = {
    bg: '#FFFFFF',
    surface: '#F7F9FB',
    text: '#181818',
    muted: '#5A5A5A',
    border: 'rgba(0,0,0,0.08)',
    primary: '#0176D3',
    primaryLight: '#E8F4FD',
    primaryDark: '#014486',
    success: '#2E844A',
    danger: '#C23934',
}

const CONTENT = {
    zh: {
        title: 'Enreal AI 中層晉升課程｜申請問卷',
        subtitle: '本課程只適合希望用AI提升職場價值的人，並會進行篩選，成功申請者將獲安排面談',
        sections: {
            personal: '【個人資料】',
            situation: '【現況與痛點】',
            mindset: '【思維與能力】',
            commitment: '【動機與投入】'
        },
        questions: {
            q1: '1. 姓名（中文及英文）、聯絡電話（WhatsApp）及電郵地址',
            q1Placeholder: '例如：陳大文 / John Chan, +852 9123 4567, john@example.com',
            q2: '2. 你目前的職位、工作年資，以及是否需要向管理層／老闆匯報？',
            q2Placeholder: '例如：市場部經理，5年經驗，需要向CMO匯報',
            q3: '3. 你目前所屬的行業是？（必答）',
            q3Placeholder: '例如：金融科技、零售、製造業等',
            q4: '4. 你目前公司是否正在或準備進行AI相關項目？你在其中的角色是什麼？',
            q4Placeholder: '請描述你公司目前的AI項目狀況，以及你的參與程度',
            q5: '5. 當需要向上匯報AI相關方案時，你覺得自己最大的困難是什麼？',
            q5Placeholder: '例如：不知道如何量化AI的價值、缺乏技術背景說服老闆等',
            q6: '6. 你曾否使用AI（例如ChatGPT）處理工作？實際效果如何？',
            q6Placeholder: '請分享你使用AI的經驗，包括成功或失敗的案例',
            q7: '7. 你認為企業在推動AI轉型時，最大的問題是什麼？',
            q7Placeholder: '例如：員工抗拒、缺乏技術人才、預算不足等',
            q8: '8. 以下哪一項最接近你對AI的理解？',
            q8Options: ['A. 提升效率的工具', 'B. 協助完成工作', 'C. 應整合成一套工作流程', 'D. 不太清楚'],
            q9: '9. 請簡單描述一個你目前工作中「可以用AI改善」的問題',
            q9Placeholder: '例如：每天花2小時整理Excel報表，希望自動化處理',
            q10: '10. 你報讀此課程的目標是什麼？以及你是否願意投入時間完成？',
            q10Placeholder: '請說明你的學習目標，以及每週可以投入的時間'
        },
        submit: '提交申請',
        submitting: '提交中...',
        success: {
            title: '申請已提交',
            message: '感謝你的申請！我們會在3個工作日內審核，成功申請者將獲安排面談。',
            button: '返回主頁'
        }
    },
    en: {
        title: 'AI Mid-Level Promotion Course | Application Form',
        subtitle: 'This course is only for those who want to use AI to enhance their career value. Applications will be screened, and successful applicants will be invited for an interview.',
        sections: {
            personal: '[Personal Information]',
            situation: '[Current Situation & Pain Points]',
            mindset: '[Mindset & Capability]',
            commitment: '[Motivation & Commitment]'
        },
        questions: {
            q1: '1. Full Name (Chinese & English), Contact Phone (WhatsApp) & Email Address',
            q1Placeholder: 'e.g., John Chan / 陳大文, +852 9123 4567, john@example.com',
            q2: '2. Your current position, years of experience, and do you need to report to management/boss?',
            q2Placeholder: 'e.g., Marketing Manager, 5 years experience, report to CMO',
            q3: '3. What industry are you currently in? (Required)',
            q3Placeholder: 'e.g., FinTech, Retail, Manufacturing, etc.',
            q4: '4. Is your company currently conducting or preparing AI-related projects? What is your role?',
            q4Placeholder: 'Please describe your company\'s current AI project status and your level of involvement',
            q5: '5. When you need to report AI-related proposals to superiors, what is your biggest difficulty?',
            q5Placeholder: 'e.g., don\'t know how to quantify AI value, lack technical background to convince boss, etc.',
            q6: '6. Have you ever used AI (e.g., ChatGPT) for work? What were the actual results?',
            q6Placeholder: 'Please share your experience using AI, including successful or failed cases',
            q7: '7. What do you think is the biggest problem when companies drive AI transformation?',
            q7Placeholder: 'e.g., employee resistance, lack of technical talent, insufficient budget, etc.',
            q8: '8. Which of the following is closest to your understanding of AI?',
            q8Options: ['A. A tool to improve efficiency', 'B. Assistance to complete work', 'C. Should be integrated into a workflow', 'D. Not very clear'],
            q9: '9. Briefly describe a problem in your current work that "could be improved with AI"',
            q9Placeholder: 'e.g., spending 2 hours daily organizing Excel reports, hoping to automate processing',
            q10: '10. What is your goal for enrolling in this course? And are you willing to commit time to complete it?',
            q10Placeholder: 'Please state your learning goals and how many hours per week you can commit'
        },
        submit: 'Submit Application',
        submitting: 'Submitting...',
        success: {
            title: 'Application Submitted',
            message: 'Thank you for your application! We will review it within 3 business days, and successful applicants will be invited for an interview.',
            button: 'Back to Home'
        }
    }
}

export default function EnrollmentForm() {
    const navigate = useNavigate()
    const [lang, setLang] = useState('zh')
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: ''
    })

    const t = CONTENT[lang]

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        
        try {
            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ENROLLMENT,
                {
                    // Template variables for EmailJS
                    to_email: 'hello@enreallab.com.hk',
                    subject: lang === 'zh' 
                        ? `AI課程申請 - ${formData.q1.split(' / ')[0] || formData.q1}`
                        : `AI Course Application - ${formData.q1.split(' / ')[0] || formData.q1}`,
                    language: lang === 'zh' ? '中文' : 'English',
                    applicant_name: formData.q1,
                    position: formData.q2,
                    industry: formData.q3,
                    ai_project: formData.q4,
                    difficulty: formData.q5,
                    ai_experience: formData.q6,
                    ai_problem: formData.q7,
                    ai_understanding: formData.q8,
                    improvement_area: formData.q9,
                    goal: formData.q10,
                    submitted_at: new Date().toLocaleString(),
                    // Full formatted message
                    message: `
【個人資料】
姓名/聯絡: ${formData.q1}
職位/年資: ${formData.q2}
行業: ${formData.q3}

【現況與痛點】
AI項目: ${formData.q4}
匯報困難: ${formData.q5}
AI經驗: ${formData.q6}

【思維與能力】
AI理解: ${formData.q8}
改善問題: ${formData.q9}

【動機與投入】
學習目標: ${formData.q10}

---
語言: ${lang === 'zh' ? '中文' : 'English'}
提交時間: ${new Date().toLocaleString()}
                    `.trim()
                },
                EMAILJS_PUBLIC_KEY
            )
            
            setSubmitted(true)
        } catch (error) {
            console.error('EmailJS error:', error)
            alert(lang === 'zh' 
                ? '提交失敗，請稍後再試或直接聯絡我們。' 
                : 'Submission failed. Please try again later or contact us directly.'
            )
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: T.bg, fontFamily: 'Inter, sans-serif' }}>
                <IndividualNavbar />
                <div style={{ paddingTop: '120px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <div style={{ maxWidth: 600, width: '90%', textAlign: 'center', padding: '3rem', background: T.surface, borderRadius: '1.5rem', border: `1px solid ${T.border}` }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: T.success, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <span style={{ color: 'white', fontSize: '2rem' }}>✓</span>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: T.text }}>{t.success.title}</h2>
                        <p style={{ color: T.muted, marginBottom: '2rem', lineHeight: 1.6 }}>{t.success.message}</p>
                        <button 
                            onClick={() => navigate('/individual')}
                            style={{ background: T.primary, color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            {t.success.button}
                        </button>
                    </div>
                </div>
                <Footer navLinks={t.footer?.nav || []} brandText={t.footer?.brandText || ''} accentColor={T.primary} />
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: T.bg, fontFamily: 'Inter, sans-serif' }}>
            <IndividualNavbar />
            
            {/* Language Toggle */}
            <div style={{ position: 'fixed', top: '100px', right: '20px', zIndex: 100, display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.95)', padding: '8px', borderRadius: '999px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <button onClick={() => setLang('en')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'en' ? T.primary : 'transparent', color: lang === 'en' ? 'white' : T.text, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>EN</button>
                <button onClick={() => setLang('zh')} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', background: lang === 'zh' ? T.primary : 'transparent', color: lang === 'zh' ? 'white' : T.text, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>中文</button>
            </div>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 5vw' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: T.text }}>{t.title}</h1>
                        <p style={{ color: T.muted, fontSize: '1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {/* Personal Information */}
                        <div style={{ background: T.surface, padding: '2rem', borderRadius: '1rem', border: `1px solid ${T.border}` }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: T.primary }}>{t.sections.personal}</h3>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions.q1}</label>
                                <textarea 
                                    value={formData.q1} 
                                    onChange={(e) => handleChange('q1', e.target.value)}
                                    placeholder={t.questions.q1Placeholder}
                                    required
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '80px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions.q2}</label>
                                <textarea 
                                    value={formData.q2} 
                                    onChange={(e) => handleChange('q2', e.target.value)}
                                    placeholder={t.questions.q2Placeholder}
                                    required
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '80px' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions.q3}</label>
                                <input 
                                    type="text"
                                    value={formData.q3} 
                                    onChange={(e) => handleChange('q3', e.target.value)}
                                    placeholder={t.questions.q3Placeholder}
                                    required
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit' }}
                                />
                            </div>
                        </div>

                        {/* Current Situation */}
                        <div style={{ background: T.surface, padding: '2rem', borderRadius: '1rem', border: `1px solid ${T.border}` }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: T.primary }}>{t.sections.situation}</h3>
                            
                            {[4, 5, 6, 7].map((num) => (
                                <div key={num} style={{ marginBottom: num < 7 ? '1.5rem' : 0 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions[`q${num}`]}</label>
                                    <textarea 
                                        value={formData[`q${num}`]} 
                                        onChange={(e) => handleChange(`q${num}`, e.target.value)}
                                        placeholder={t.questions[`q${num}Placeholder`]}
                                        required
                                        style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '100px' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mindset */}
                        <div style={{ background: T.surface, padding: '2rem', borderRadius: '1rem', border: `1px solid ${T.border}` }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: T.primary }}>{t.sections.mindset}</h3>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: T.text, fontWeight: 500 }}>{t.questions.q8}</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {t.questions.q8Options.map((option, idx) => (
                                        <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${formData.q8 === option ? T.primary : T.border}`, background: formData.q8 === option ? T.primaryLight : T.bg, cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <input 
                                                type="radio" 
                                                name="q8" 
                                                value={option}
                                                checked={formData.q8 === option}
                                                onChange={(e) => handleChange('q8', e.target.value)}
                                                required
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <span style={{ color: T.text }}>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions.q9}</label>
                                <textarea 
                                    value={formData.q9} 
                                    onChange={(e) => handleChange('q9', e.target.value)}
                                    placeholder={t.questions.q9Placeholder}
                                    required
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '100px' }}
                                />
                            </div>
                        </div>

                        {/* Commitment */}
                        <div style={{ background: T.surface, padding: '2rem', borderRadius: '1rem', border: `1px solid ${T.border}` }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: T.primary }}>{t.sections.commitment}</h3>
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: T.text, fontWeight: 500 }}>{t.questions.q10}</label>
                                <textarea 
                                    value={formData.q10} 
                                    onChange={(e) => handleChange('q10', e.target.value)}
                                    placeholder={t.questions.q10Placeholder}
                                    required
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${T.border}`, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px' }}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={submitting}
                            style={{ 
                                background: T.primary, 
                                color: 'white', 
                                padding: '1.25rem', 
                                border: 'none', 
                                borderRadius: '0.75rem', 
                                fontSize: '1.1rem', 
                                fontWeight: 600, 
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                opacity: submitting ? 0.7 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {submitting ? t.submitting : t.submit}
                        </button>
                    </form>
                </div>
            </div>

            <Footer navLinks={[]} brandText={lang === 'zh' ? '為進入AI原生經濟的專業人士提供智能層。' : 'The intelligence layer for professionals entering an AI-native economy.'} accentColor={T.primary} />
        </div>
    )
}
