# Harsh Nautiyal — AI & Data Engineer Portfolio

A highly interactive, futuristic personal portfolio website with an Iron Man / Jarvis HUD interface aesthetic. Built with Next.js, TailwindCSS, and Framer Motion.

## ✨ Features

- 🎨 Iron Man HUD interface design with neon glow effects
- ⚡ Smooth Framer Motion scroll animations
- 🌐 Animated particle background in hero section
- ⌨️ Typing effect for role/headline
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔧 Single `content/config.ts` file for all editable content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
npm start
```

## 📝 Editing Content

All portfolio content (name, headline, skills, projects, timeline, social links) lives in a single file:

```
content/config.ts
```

Simply edit that file to update:
- Personal info (name, headline, subheadline)
- Social links (LinkedIn, GitHub, Email)
- Skills and technologies
- Featured projects
- Journey / timeline entries
- Resume PDF URL

No need to touch any UI code!

## 📄 Resume

Replace `public/resume.pdf` with your actual resume PDF file.

## 🚢 Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js — click **Deploy**

Or deploy with the CLI:

```bash
npm install -g vercel
vercel
```

## 🗂️ Project Structure

```
portfoilio/
├── app/
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Main page assembling all sections
│   └── globals.css      # Global styles and HUD effects
├── components/
│   ├── HeroSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── TimelineSection.tsx
│   ├── ContactSection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── GlowButton.tsx
│       ├── SectionHeading.tsx
│       ├── ProjectCard.tsx
│       ├── SkillCard.tsx
│       ├── TimelineItem.tsx
│       └── ParticleBackground.tsx
├── content/
│   └── config.ts        ← Edit all content here
├── public/
│   └── resume.pdf       ← Replace with your resume
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎨 Design System

- **Background**: `#0B0F19` (deep dark)
- **Accent Blue**: `#00D4FF` (arc-reactor blue)
- **Accent Cyan**: `#00FFFF`
- **Accent Orange**: `#FF6B35`
- **Headings**: Orbitron (futuristic) + Space Grotesk
- **Body**: Inter

---

*Designed & Built by Harsh Nautiyal*