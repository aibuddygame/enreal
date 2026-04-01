# Enreal AI Website - Version 1.0 Snapshot

**Date:** April 1, 2026  
**Tag:** `v1.0-before-merge`  
**Backup:** `~/enreallab-backup-20260401-1835.tar.gz`

---

## Current State

### Pages

| Page | File | Description |
|------|------|-------------|
| Home | `src/pages/Home.jsx` | Landing page with infinite grid animation |
| Business | `src/pages/Business.jsx` | Corporate/enterprise AI services |
| Individual | `src/pages/Individual.jsx` | AI course for individual professionals |
| Course | `src/pages/Course.jsx` | AI mid-level promotion course (corporate) |
| ProjectPage | `src/pages/ProjectPage.jsx` | Case study/project details |

### Language URLs

**Individual Page:**
- `/individual` → English
- `/individual/zh` → Chinese

**Course Page:**
- `/course` → Chinese (default)
- `/course/en` → English

### Key Features

- ✅ Bilingual support (EN/ZH) for Individual and Course pages
- ✅ Language toggle with URL sync
- ✅ SPA routing with Vercel
- ✅ EmailJS contact forms
- ✅ GSAP animations
- ✅ React Router with language-specific routes

### Technical Stack

- React + Vite
- React Router (BrowserRouter)
- GSAP + ScrollTrigger
- Tailwind CSS
- EmailJS
- Framer Motion

### Git Status

```
Repo: https://github.com/aibuddygame/enreal
Branch: main
Tag: v1.0-before-merge
Latest commit: Add language-specific URLs for Course page
```

---

## Next Step: Merge Individual + Course Pages

**Goal:** Combine both pages into a single unified course page.

**Considerations:**
- Both pages have similar structures (Hero, Outcomes, Curriculum, etc.)
- Individual page targets professionals seeking AI skills
- Course page targets mid-level managers seeking promotion
- May need to differentiate by audience or combine content

**Files to Review:**
- `src/pages/Individual.jsx` - 350+ lines
- `src/pages/Course.jsx` - 320+ lines
- `src/App.jsx` - Route definitions

---

## Restore Instructions

If needed, restore this version:

```bash
# From git tag
git checkout v1.0-before-merge

# Or from backup
cd ~
tar -xzf enreallab-backup-20260401-1835.tar.gz
```

---

*Snapshot created before merging Individual and Course pages.*
