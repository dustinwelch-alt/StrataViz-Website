# StrataViz — Marketing Site PRD

## Problem Statement
Marketing/landing website for "StrataViz Sports", a desktop sports film breakdown app for coaches (create clips, build playlists). App already built. Need a showcase site with DIRECT file downloads for Windows + two Mac versions (Apple Silicon + Intel). No login. Dark athletic theme (silver + orange from logo). Awwwards-level motion.

## Users
- Sports coaches / analysts who want to download the desktop app.

## Architecture
- Backend: FastAPI + MongoDB. Collections: `downloads` (seeded 3 builds), `subscribers`.
  - GET /api/downloads
  - POST /api/downloads/{platform}/track (increments download_count)
  - POST /api/subscribe (email waitlist, dedup by email)
- Frontend: React + Tailwind + framer-motion + lenis + react-fast-marquee. Single page.
  - Sections: Navbar, Hero (kinetic masked reveal + parallax), BrandMarquee, Manifesto (numbered chapters), Features (bento), Downloads (3 platform cards, OS-detect recommended), Subscribe, Footer.
  - Fonts: Anton (display) + Manrope (body). Metallic silver text + orange accents.

## Implemented (2026-07-16)
- Full marketing site, all sections, motion, smooth scroll.
- Download cards with live count tracking + direct file download via anchor.
- Waitlist subscribe. Tested end-to-end: backend 100%, frontend 100%.

## Notes / Backlog
- P0: Replace placeholder download URLs (downloads.strataviz.app/...) with real installer files. Update in DB `downloads.file_url` per platform or edit DEFAULT_BUILDS in server.py.
- P1: Real product screenshots in Features section (currently editorial stock imagery).
- P2: Email notifications for subscribers (Resend), analytics, versioned changelog.
