# Enreal AI Website - Version 1.1 Snapshot

**Date:** April 1, 2026  
**Tag:** `v1.1-content-updated`  
**Backup:** `~/enreallab-backup-v1.1-20260401-2003.tar.gz`

---

## Current State

### Pages

| Page | File | Description |
|------|------|-------------|
| Home | `src/pages/Home.jsx` | Landing page with infinite grid animation |
| Business | `src/pages/Business.jsx` | Corporate/enterprise AI services |
| Individual | `src/pages/Individual.jsx` | **UPDATED** - AI course with Course page content |
| Course | `src/pages/Course.jsx` | AI mid-level promotion course (source content) |
| ProjectPage | `src/pages/ProjectPage.jsx` | Case study/project details |

### Language URLs

**Individual Page:**
- `/individual` → English
- `/individual/zh` → Chinese

**Course Page:**
- `/course` → Chinese (default)
- `/course/en` → English

### Key Features (v1.1)

- ✅ **Bilingual support** (EN/ZH) with URL-based language switching
- ✅ **Content from Course page** migrated to Individual page:
  - 3-phase curriculum (Mindset → MVP → Executive Presentation)
  - 3 transformation outcomes (Tools→Strategy, Execution→Design, Employee→Indispensable)
  - Limited offer pricing section
- ✅ **Professional color scheme** (Salesforce-inspired):
  - Primary blue: `#0176D3`
  - Clean grays for backgrounds
  - Cohesive, enterprise-grade appearance
- ✅ **Differentiated section backgrounds**:
  - Hero: White
  - Philosophy: Light gray
  - Outcomes: White
  - Curriculum: White with subtle phase colors
  - For Who: Light gray
  - Pricing: Lighter gray
- ✅ **Curriculum phase colors** (subtle):
  - Phase 1: Light blue (`#F0F9FF`)
  - Phase 2: Light purple (`#F5F3FF`)
  - Phase 3: Light yellow (`#FFFBEB`)
- ✅ **Vercel deployment** working with SPA routing

### Technical Stack

- React + Vite
- React Router (BrowserRouter) with language routes
- GSAP + ScrollTrigger
- Tailwind CSS
- EmailJS (configured with fallbacks)

### Git Status

```
Repo: https://github.com/aibuddygame/enreal
Branch: main
Tag: v1.1-content-updated
Latest commit: Differentiate section backgrounds and add subtle phase colors
```

---

## Version History

| Version | Tag | Description |
|---------|-----|-------------|
| v1.0 | `v1.0-before-merge` | Original separate Individual and Course pages |
| v1.1 | `v1.1-content-updated` | Individual page updated with Course content, professional colors |

---

## Restore Instructions

If needed, restore this version:

```bash
# From git tag
git checkout v1.1-content-updated

# Or from backup
cd ~
tar -xzf enreallab-backup-v1.1-20260401-2003.tar.gz
```

---

*Snapshot created before OpenClaw update.*
