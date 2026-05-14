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

// ── Nav (Homepage) ─────────────────────────────────────────
export const HOME_NAV = [
    { label: 'Home', id: 'hero' },
    { label: 'AI Workforce', id: 'ai-workforce' },
    { label: 'Solutions', id: 'solution' },
    { label: 'About', id: 'problem' },
    { label: 'Contact', id: 'consultation' },
]

// ── Nav (Business Page) ────────────────────────────────────
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

// ── AI Employees ───────────────────────────────────────────
export const AI_EMPLOYEES = [
    {
        id: 'ai-coding-engineer',
        name: 'AI Coding Engineer',
        summary: 'Builds, reviews, and maintains software with human-guided architecture decisions.',
        image: '/ai-coding-engineer.jpg',
        functions: [
            'Write and refactor production code across stacks',
            'Automate testing, CI/CD, and deployment pipelines',
            'Review pull requests and enforce code standards',
            'Generate technical documentation and API specs',
        ],
        humanSupport: [
            'Senior engineer reviews architecture decisions',
            'Code quality audits and security checks',
            'Complex debugging and performance tuning',
            'Client-specific customization and integration',
        ],
    },
    {
        id: 'ai-data-analyst',
        name: 'AI Data Analyst',
        summary: 'Transforms raw data into actionable business intelligence with human validation.',
        image: '/ai-data-analyst.jpg',
        functions: [
            'Automate data cleaning and pipeline workflows',
            'Generate dashboards and executive summaries',
            'Run statistical models and trend forecasting',
            'Monitor KPIs and anomaly detection alerts',
        ],
        humanSupport: [
            'Data strategy and source validation',
            'Interpretation of complex statistical results',
            'Custom metric design for your business',
            'Presentation coaching for stakeholder meetings',
        ],
    },
    {
        id: 'ai-report-specialist',
        name: 'AI Report Specialist',
        summary: 'Produces accurate, formatted reports on schedule with human fact-checking.',
        image: '/ai-report-specialist.jpg',
        functions: [
            'Generate financial, operational, and sales reports',
            'Automate chart creation and data visualization',
            'Schedule recurring report delivery',
            'Compile multi-source data into unified narratives',
        ],
        humanSupport: [
            'Report template design and branding alignment',
            'Data accuracy verification and fact-checking',
            'Executive summary writing and tone calibration',
            'Custom formatting for board presentations',
        ],
    },
    {
        id: 'ai-creative-director',
        name: 'AI Creative Director',
        summary: 'Creates on-brand visual and written content with human creative oversight.',
        image: '/ai-creative-director.jpg',
        functions: [
            'Generate marketing copy, blogs, and ad creatives',
            'Produce image concepts and design briefs',
            'Maintain brand voice across all channels',
            'A/B test messaging and creative variations',
        ],
        humanSupport: [
            'Brand strategy and positioning guidance',
            'Creative direction and campaign concepting',
            'Final quality control and brand compliance',
            'Photography and video production oversight',
        ],
    },
    {
        id: 'ai-social-media-influencer',
        name: 'AI Social Media Influencer',
        summary: 'Manages social presence, content calendars, and community engagement 24/7.',
        image: '/ai-social-media-influencer.jpg',
        functions: [
            'Schedule and publish content across platforms',
            'Engage with comments, DMs, and community',
            'Track trends and viral opportunity alerts',
            'Analyze engagement metrics and growth reports',
        ],
        humanSupport: [
            'Content strategy and campaign planning',
            'Crisis management and brand reputation',
            'Influencer partnership negotiations',
            'Live event coverage and real-time posting',
        ],
    },
    {
        id: 'ai-customer-service',
        name: 'AI Customer Service',
        summary: 'Handles inquiries, tickets, and support workflows with human escalation paths.',
        image: '/ai-customer-service.jpg',
        functions: [
            'Answer FAQs and resolve common issues instantly',
            'Route complex tickets to the right department',
            'Follow up on open cases automatically',
            'Collect feedback and satisfaction scores',
        ],
        humanSupport: [
            'Escalation handling for sensitive issues',
            'Tone and policy training for your brand',
            'Customer success check-ins and retention',
            'Service workflow design and optimization',
        ],
    },
    {
        id: 'ai-secretary',
        name: 'AI Secretary',
        summary: 'Manages scheduling, correspondence, and administrative tasks effortlessly.',
        image: '/ai-secretary.jpg',
        functions: [
            'Schedule meetings and manage calendars',
            'Draft emails, memos, and routine correspondence',
            'Organize files and document retrieval',
            'Set reminders and track action items',
        ],
        humanSupport: [
            'Executive assistant oversight for priorities',
            'Meeting preparation and briefing notes',
            'Confidential and sensitive communication handling',
            'Office management and vendor coordination',
        ],
    },
    {
        id: 'ai-hr-manager',
        name: 'AI HR Manager',
        summary: 'Streamlines recruitment, onboarding, and employee engagement processes.',
        image: '/ai-hr-manager.jpg',
        functions: [
            'Screen resumes and schedule interviews',
            'Automate onboarding checklists and paperwork',
            'Track attendance, leave, and compliance',
            'Run pulse surveys and engagement analytics',
        ],
        humanSupport: [
            'Culture fit assessment and final interviews',
            'Employee relations and conflict resolution',
            'Policy design and legal compliance review',
            'Leadership coaching and development planning',
        ],
    },
    {
        id: 'ai-accountant',
        name: 'AI Accountant',
        summary: 'Manages bookkeeping, invoicing, and financial reporting with accountant review.',
        image: '/ai-accountant.jpg',
        functions: [
            'Automate invoice generation and payment tracking',
            'Reconcile accounts and categorize transactions',
            'Generate P&L, balance sheet, and cash flow reports',
            'Flag discrepancies and compliance risks',
        ],
        humanSupport: [
            'Certified accountant review and sign-off',
            'Tax planning and regulatory compliance',
            'Financial strategy and forecasting',
            'Audit preparation and documentation',
        ],
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
