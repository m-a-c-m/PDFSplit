# ✂️ Dividir PDF Online Gratis — Split PDF por Páginas

**Free PDF Split tool.** Divide a PDF file in 3 modes: extract a custom page range into one PDF, split into equal chunks of N pages, or export each page as an individual PDF file. No sign-up, no ads, 100% client-side.

🌐 **Demo en vivo / Live demo:** [miguelacm.es/tools/pdf-split](https://miguelacm.es/tools/pdf-split)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Features

- ✂️ **3 modos de división / 3 split modes:**
  - **Rango de páginas / Page range:** Extract any pages into one PDF (e.g. `1-3, 5, 7-9`)
  - **Cada N páginas / Every N pages:** Split into equal chunks — `Math.ceil(pages/N)` files
  - **Página por página / Page by page:** One PDF per selected page
- 📊 **Detección automática / Auto-detection:** Reads page count immediately on upload
- 🔢 **Sintaxis flexible / Flexible syntax:** Ranges (`1-5`), individual pages (`3`), mixed (`1-3, 5, 8-10`)
- ⬇️ **Descarga automática / Auto-download:** Multiple files download with staggered 80–100ms intervals
- 🔒 **Sin servidor / Zero server:** All processing via pdf-lib — your file never leaves your device
- 📦 **Embebible / Embeddable:** Use as iframe on any website

---

## 🚀 Quick start

```bash
git clone https://github.com/m-a-c-m/PDFSplit.git
cd PDFSplit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (optional)

```env
NEXT_PUBLIC_SITE_URL=https://miguelacm.es/tools/pdf-split
```

---

## 📦 Embed on your website

### Iframe (plug & play)

```html
<iframe
  src="https://miguelacm.es/embed/pdf-split"
  width="100%"
  height="700"
  style="border:none;border-radius:12px;"
  title="PDF Split — miguelacm.es"
  loading="lazy"
></iframe>
```

### Link with attribution (recommended for backlink)

```html
<a href="https://miguelacm.es/tools/pdf-split" target="_blank" rel="noopener">
  Dividir PDF gratis por MACM
</a>
```

> 💡 The link option generates a real backlink that benefits the project. Recommended if your platform supports custom HTML.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | React framework + SSG |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling |
| [pdf-lib](https://github.com/Hopding/pdf-lib) | 1 | PDF page extraction and splitting |
| [react-icons](https://react-icons.github.io/react-icons/) | 5 | Icons |

---

## 📄 License

MIT © [Miguel Ángel Colorado Marin (MACM)](https://miguelacm.es)

Built with ❤️ by **[MACM](https://miguelacm.es)** — Full Stack Developer & Cybersecurity Specialist from Guadalajara, Spain.

- 🌐 Portfolio: [miguelacm.es](https://miguelacm.es)
- 💼 LinkedIn: [linkedin.com/in/macm](https://www.linkedin.com/in/macm/)
- 🐙 GitHub: [github.com/m-a-c-m](https://github.com/m-a-c-m)
