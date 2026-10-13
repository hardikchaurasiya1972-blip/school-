# Sacred Heart Convent School — Teacher's Day & Silver Jubilee Memory Archive

> **"Truth & Diligence"** — *Sacred Heart Convent School Motto*  
> **"A teacher affects eternity; he can never tell where his influence stops."**

An authentic institutional digital memory archive and interactive celebration portal commemorating **Sacred Heart Convent School's** Teacher's Day celebration and the **25-Year Silver Jubilee** honoring **Richa Ma'am and Neeta Ma'am** (September 4, 2021).

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, this application serves over **400 original high-resolution photographs** across an interactive Hero Carousel, a 4-Chapter Narrative Timeline, an Asymmetric Bento Showcase, and a Filtered Master Gallery with full-screen zoom and direct client-side downloads.

---

## 📌 Project Overview

- **Project Name**: Sacred Heart Convent School — Teacher's Day & Silver Jubilee Archive
- **Institution**: Sacred Heart Convent School
- **Event Commemorated**: Teacher's Day 2021 & Silver Jubilee (25 Years of Service) of Richa Ma'am and Neeta Ma'am
- **Date of Event**: September 4, 2021
- **Architecture**: Strict Frontend-Only (Zero backend, zero cloud databases, zero external tracking)
- **Repository**: [https://github.com/hardikchaurasiya1972-blip/school-](https://github.com/hardikchaurasiya1972-blip/school-)

---

## ✨ Main Features

1. **Interactive Hero Photo Carousel**:
   - Rotates through 6 featured high-resolution celebration moments (Faculty Grand Portrait, Diya Lighting, Jubilee Felicitation Stage, Invocational Prayer Dance, Rose-Bearing Choir, and Backstage Corridor Candids).
   - Thumbnail switcher strip, auto-advance timer (5.5s), play/pause toggles, and direct full-screen inspection.
   - Live metrics bar displaying 400+ real photographs, 960+ MB archive size, and 100% client-side privacy.

2. **Stage Quotes & Motto Ribbon**:
   - Authentic blackboard and stage quotes (*"Teachers plant the seeds of knowledge that will grow forever"*, *"Though you wrote in chalk, you brightened our lives"*).

3. **Event Chronicles (4-Chapter Narrative Timeline)**:
   - **Chapter I: Auspicious Diya Lighting & Prayer** — Solemn invocation led by Sister Superiors and senior teachers.
   - **Chapter II: Silver Jubilee Felicitation** — 25 Years of Mentorship honoring Richa Ma'am & Neeta Ma'am with ceremonial shawls and garlands.
   - **Chapter III: Cultural Stage Extravaganza** — Prayer dance, Mother Teresa tribute, classroom comedy skits, and student choir.
   - **Chapter IV: Faculty & Classmate Bonds** — Backstage laughter, student council tributes, and the ceremonial faculty portrait.
   - Interactive chapter tabs dynamically update primary photos, supporting photo grids, descriptions, and quotes.

4. **Asymmetric Bento Grid Showcase**:
   - Modern Bento layout featuring panoramic stage views, candids, and group portraits with quick zoom and direct download buttons.

5. **Master Photographic Gallery with Smart Filtering**:
   - Categorized by event milestones: *All Photos*, *Diya & Invocations*, *Silver Jubilee*, *Choir & Stage*, *Faculty & Mentors*, and *Classmates & Candid*.
   - Instant search across moment titles, descriptions, and tags.
   - Progressive pagination (24 initial items with "Load More") maintaining 60fps scrolling across 400+ photos.

6. **Comprehensive Event Archive**:
   - Searchable digital repository supporting Grid and List Table views, sort options (Date, Name, Size), and sequential batch downloading.

7. **Full-Screen Lightbox Modal**:
   - High-definition image inspection with keyboard controls (`Left`/`Right` arrow keys for carousel cycling, `Esc` to close).
   - Interactive Zoom In (`+`), Zoom Out (`-`), and Reset controls.
   - Technical metadata inspector displaying image dimensions, aspect ratio, camera source, and file size.
   - Direct native Full HD image download button.

8. **Strict Client-Side Privacy & Native Downloads**:
   - Zero cloud uploads; all files are rendered client-side.
   - Native browser downloads for Full HD camera and mobile photos.
   - Automatic object URL revocation (`URL.revokeObjectURL`) preventing memory leaks.

---

## 🛠️ Technologies Used

| Technology | Version / Description |
| :--- | :--- |
| **React** | `^19.2.8` — Component-based user interface |
| **TypeScript** | `~6.0.2` — Strict type safety and maintainable code |
| **Vite** | `^8.3.0` — Fast modern development server and bundler |
| **Tailwind CSS** | `^4.0.0` with `@tailwindcss/vite` — Modern utility-first CSS |
| **Lucide React** | `^1.16.0` — Clean and consistent iconography |

---

## 🎨 Color Palette & Design Identity

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Warm Ivory** | `#FAF7F2` / `#FDFCF9` | Primary page canvas & card surfaces |
| **Cream Linen** | `#F4EFE6` / `#E8E0D3` | Secondary surfaces, borders, and controls |
| **Deep Burgundy** | `#5A1626` / `#3F0E19` | Hero insignia, primary action buttons, brand accents |
| **Antique Gold** | `#C69238` / `#E8BD6D` | Stage ornaments, radiant borders, badge highlights |
| **Charcoal** | `#23201F` / `#524C49` | High-contrast readable typography |

---

## 📂 Project Structure

```
frontend/
├── public/
│   ├── cam/                     # 159 Full HD camera photos (1920x1080)
│   ├── phone/                   # 244 High-resolution mobile photos
│   └── favicon.svg              # Sacred Heart insignia favicon
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Brand navigation & mobile menu
│   │   ├── Hero.tsx             # Interactive 6-photo hero carousel & metrics
│   │   ├── StageQuotesRibbon.tsx # Authentic stage quotes and school motto
│   │   ├── EventChronicles.tsx  # 4-chapter narrative timeline
│   │   ├── BentoShowcase.tsx    # Asymmetric bento grid highlights
│   │   ├── PhotoGallerySection.tsx # Master gallery with category filter pills
│   │   ├── FileManager.tsx      # Archive manager (Search, Sort, Grid/Table)
│   │   ├── FileGridCard.tsx     # Card view for archive items
│   │   ├── FileListItem.tsx     # Table row view for archive items
│   │   ├── FilePreviewModal.tsx # Full-screen lightbox modal with zoom & nav
│   │   ├── VideosSection.tsx    # Video archive section
│   │   ├── DocumentsSection.tsx # Documents archive section
│   │   ├── PrivacyBanner.tsx    # Client-side privacy banner
│   │   ├── FileUploader.tsx     # Add files dropzone & picker
│   │   ├── PermanentPackagingGuide.tsx # Curator guide
│   │   ├── MobileDownloadGuide.tsx # iOS/Android download tips
│   │   └── Footer.tsx           # Institutional footer
│   ├── data/
│   │   └── curatedArchive.ts    # Typed catalog of 403 photos with metadata
│   ├── types/
│   │   └── archive.ts           # ArchiveFile, FileCategory, SortField types
│   ├── utils/
│   │   └── fileHelpers.ts       # Formatting, downloads, categorizing
│   ├── App.tsx                  # Main application state & section assembler
│   ├── index.css                # Tailwind directives & design system tokens
│   └── main.tsx                 # React DOM mount point
├── .gitignore                   # Production ignore rules
├── index.html                   # HTML template with Google Fonts (Cinzel, Cormorant, Plus Jakarta)
├── package.json                 # Project dependencies & scripts
├── tsconfig.app.json            # Client TypeScript configuration
├── tsconfig.json                # TypeScript project references
└── vite.config.ts               # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Installation & Local Development

### Prerequisites
- **Node.js** (version 18.0 or later)
- **npm** (version 9.0 or later)

### 1. Clone the repository
```bash
git clone https://github.com/hardikchaurasiya1972-blip/school-.git
cd school-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
*(On Windows PowerShell, if script execution is restricted, run `npm.cmd run dev`)*

Open your browser at **`http://localhost:5173`**.

### 4. Build for production
```bash
npm run build
```

---

## 🔒 Security & Privacy Notice

- This repository does **not** contain any API keys, passwords, authentication tokens, `.env` files, or private cloud credentials.
- All file handling uses browser-native File and Blob APIs with automatic memory revocation (`URL.revokeObjectURL`) to prevent memory leaks.
- Zero tracking scripts or third-party analytical cookies are embedded.

---

## 📜 License

Created for the preservation and celebration of Sacred Heart Convent School memories. All photographs and memories belong to their respective creators and the Sacred Heart community.
