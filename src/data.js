// ── Preset E: Pure Intelligence ────────────────────────────
export const T = {
    bg: '#FFFFFF',
    surface: '#F5F5F7',
    card: '#FFFFFF',
    text: '#1C1C1E',
    accent: '#2563EB',
    accentD: '#1D4ED8',
    accentL: 'rgba(37,99,235,0.08)',
    muted: 'rgba(28,28,30,0.52)',
    faint: 'rgba(28,28,30,0.22)',
    border: 'rgba(28,28,30,0.09)',
    borderH: 'rgba(37,99,235,0.35)',
    shadow: '0 2px 16px rgba(0,0,0,0.07)',
    shadowH: '0 12px 48px rgba(0,0,0,0.12)',
    philImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
}

// ── Nav ────────────────────────────────────────────────────
export const NAV = [
    { label: 'Solutions', id: 'solutions' },
    { label: 'Work', id: 'work' },
    { label: 'Method', id: 'method' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
]

// ── Cap 1: Shuffler ────────────────────────────────────────
export const SHUFFLER = [
    { label: 'Intelligent Outreach', sub: 'AI-powered email & messaging' },
    { label: 'WhatsApp AI Agents', sub: 'Automated conversation flows' },
    { label: 'Response Automation', sub: 'Real-time reply intelligence' },
]

// ── Cap 2: Typewriter ──────────────────────────────────────
export const TW_LINES = [
    'Connecting SAP ERP to AI decision layer...',
    'Invoice processing: 847 docs / 0.3s each',
    'HR onboarding workflow: automated',
    'Purchase order AI review: complete',
    'Workflow trigger: approval → escalation',
    'ERP bidirectional sync: real-time active',
]

// ── Projects ───────────────────────────────────────────────
export const PROJECTS = [
    {
        slug: 'wellaios',
        name: 'WELLAIOS',
        category: 'Web3 Agents',
        industry: 'Web3 Infrastructure / AI Agent Platform',
        summary: 'AI agent platform with live 3D interaction and decentralized infrastructure.',
        challenge: 'Lack of intelligent interfaces for decentralized ecosystems kept communities fragmented and unengaged.',
        solution: 'AI agent platform with live 3D interaction, TTS voice intelligence, and decentralized infrastructure using MCP Architecture.',
        tech: ['AI Agents', '3D Avatars', 'TTS', 'MCP Architecture', 'Token Systems'],
        impact: 'Enabled scalable AI interaction across large Web2/Web3 communities.',
        thumb: '/work/project-1/thumb.jpg',
        heroImg: '/work/project-1/hero.jpg',
        galleryL: '/work/project-1/gallery-main.jpg',
        gallery: [
            '/work/project-1/gallery-1.jpg',
            '/work/project-1/gallery-2.jpg',
            '/work/project-1/gallery-3.jpg',
        ],
        arch: {
            title: 'System Architecture',
            steps: [
                'User Input (Web2/Web3)  →  AI Agent Router',
                'Specialized Agents  →  TTS Voice Synthesis',
                '3D Avatar Rendering  →  Real-time Delivery',
                'Token System  →  Community Distribution',
            ],
        },
    },
    {
        slug: 'qooapp',
        name: 'QooApp AI Localization',
        category: 'AI Localization',
        industry: 'Global ACG Platform',
        summary: 'AI localization and OCR-driven translation agents integrated into the content pipeline.',
        challenge: 'Manual multilingual localization bottlenecks blocked global content scaling at speed.',
        solution: 'AI localization and OCR-driven translation agents integrated directly into the content pipeline.',
        tech: ['OCR', 'LLM Translation', 'Automation Pipelines'],
        impact: 'Global content scaling achieved without additional manpower.',
        thumb: '/work/project-2/thumb.jpg',
        heroImg: '/work/project-2/hero.jpg',
        galleryL: '/work/project-2/gallery-main.jpg',
        gallery: [
            '/work/project-2/gallery-1.jpg',
            '/work/project-2/gallery-2.jpg',
            '/work/project-2/gallery-3.jpg',
        ],
        arch: {
            title: 'Localization Pipeline',
            steps: [
                'Source Content  →  OCR Engine',
                'OCR Output  →  LLM Translation',
                'Quality Review  →  Localization Storage',
                'Multi-language Distribution  →  Live',
            ],
        },
    },
    {
        slug: 'newsa',
        name: 'Newsa.io Intelligence',
        category: 'Market Intelligence',
        industry: 'Financial Intelligence',
        summary: 'AI-driven aggregation and insight platform for faster executive decision-making.',
        challenge: 'Fragmented global market information forced analysts to manually aggregate signals across sources.',
        solution: 'AI-driven aggregation and insight platform combining search, social listening, and content intelligence.',
        tech: ['AI Search', 'Content Intelligence', 'Social Listening'],
        impact: 'Faster executive decision-making through fully automated intelligence.',
        thumb: '/work/project-3/thumb.jpg',
        heroImg: '/work/project-3/hero.jpg',
        galleryL: '/work/project-3/gallery-main.jpg',
        gallery: [
            '/work/project-3/gallery-1.jpg',
            '/work/project-3/gallery-2.jpg',
            '/work/project-3/gallery-3.jpg',
        ],
        arch: {
            title: 'Intelligence Engine',
            steps: [
                'Market Data Sources  →  AI Aggregation',
                'Social Listening  →  Sentiment Analysis',
                'Intelligence Synthesis  →  Insight Layer',
                'Executive Dashboard  →  Alert System',
            ],
        },
    },
]

// ── Methodology ────────────────────────────────────────────
export const METHODOLOGY = [
    {
        num: '01',
        title: 'Diagnose',
        desc: 'Map current operations, communication flows, and decision bottlenecks. Identify exactly where AI creates the highest leverage.',
    },
    {
        num: '02',
        title: 'Deploy',
        desc: 'Engineer and integrate the AI layer directly into your existing stack — ERP, CRM, communication tools. No rip-and-replace.',
    },
    {
        num: '03',
        title: 'Optimise',
        desc: 'Monitor, fine-tune, and compound intelligence over time. Every deployment gets more capable with real operational data.',
    },
]
