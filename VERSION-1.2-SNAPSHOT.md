# Enreal AI Website - Version 1.2 Snapshot
**Date:** April 1, 2026  
**Time:** 21:38 HKT  
**Tag:** v1.2-apr1-updates

---

## Summary of Today's Changes

### 1. Enrollment Form Added
- **File:** `src/pages/EnrollmentForm.jsx`
- **Route:** `/enroll`
- **Features:**
  - Bilingual support (Chinese primary, English toggle)
  - 10 questions across 4 sections
  - Email submission to barry.lau@enreallab.com.hk and pierce.tam@enreallab.com.hk
  - Responsive design matching site theme

### 2. Branding Updates
- **Homepage button:** "AI Professional Programs" → "AI Elite Course"
- **Navbar switch button:** "Switch to Individual" → "Switch to Elite Course"
- Updated in both desktop and mobile navbars

### 3. Contact Form Enhancement
- Added barry.lau@enreallab.com.hk as recipient
- Form submits via EmailJS
- Fields: Name, Email, Company (optional), Message

### 4. UI/UX Improvements
- Removed LinkedIn logo from footer
- Fixed Vercel routing for work/project images
- All changes deployed to enreal-ai.vercel.app

---

## Git Status
- **Branch:** main
- **Status:** Clean (up to date with origin/main)
- **Recent commits:**
  - `d9cbe6e` Add barry.lau@enreallab.com.hk as contact form recipient
  - `d859348` Update navbar switch button: Individual -> Elite Course
  - `d75a924` Update AI Professional Programs to AI Elite Course
  - `37cbb11` Remove LinkedIn logo and link from footer
  - `6b8cd11` Add enrollment form with bilingual support and email submission

---

## Backup Created
- **File:** `enreallab-backup-v1.2-apr1-2137.tar.gz`
- **Size:** 4.4 MB
- **Location:** `/Users/vxreal/`

---

## URLs
- **Business:** https://enreal-ai.vercel.app/business
- **Elite Course (EN):** https://enreal-ai.vercel.app/individual
- **Elite Course (ZH):** https://enreal-ai.vercel.app/individual/zh
- **Enrollment Form:** https://enreal-ai.vercel.app/enroll

---

## Next Steps (Future)
- [ ] Configure EmailJS environment variables in Vercel
- [ ] Test enrollment form email delivery
- [ ] Add form validation improvements if needed
- [ ] Consider backend database for form submissions

---

*All progress saved and backed up. Ready for next session.*
