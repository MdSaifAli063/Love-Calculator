<div align="center">

<h1>💖 Love Calculator 💘</h1>

<p>Beautiful, animated, and delightfully romantic single‑page app to calculate the “chemistry” between two names.</p>

<img alt="Love badge" src="https://img.shields.io/badge/Love_Calculator-%23ff4d6d?style=for-the-badge&logo=none&labelColor=1a0b2e&color=ff4d6d">
<img alt="Vanilla JS" src="https://img.shields.io/badge/Vanilla_JS-%2300c853?style=for-the-badge&labelColor=1a0b2e&color=41cc92">
<img alt="Glassy UI" src="https://img.shields.io/badge/Glassy_UI-%239C27B0?style=for-the-badge&labelColor=1a0b2e&color=c274ff">
<img alt="No Dependencies" src="https://img.shields.io/badge/No_Dependencies-%23007acc?style=for-the-badge&labelColor=1a0b2e&color=59a5ff">

</div>

---

## ✨ Highlights

- Glassmorphism card with soft glow and gradients
- Floating, colorful heart background (SVG, GPU‑friendly)
- Heart‑burst celebration on calculate (big, shiny emojis)
- Animated score counter and gradient progress meter
- Responsive, accessible (labels, aria-live, focus states)
- 100% vanilla HTML/CSS/JS — no build step, no deps

---

## 📸 Screenshots

![image](https://github.com/Mdsaif4363/Love-Calculator/blob/4074c2e144ab66a7157aac2ae36d0c32c37ddb84/Screenshot%202025-08-30%20020253.png)



Example in Markdown:
```md

 📦 Project Structure


love/ ├─ index.html # The entire app (HTML + CSS + JS) └─ README.md # You are here


---

 🚀 Quick Start

- Double‑click love/index.html to open in your browser, or
- Serve locally (recommended for consistent file paths):
  - Node: npx serve love
  - Python: cd love && python3 -m http.server 5173
  - VS Code: Use “Live Server” on love/index.html

Then navigate to the served URL (e.g., http://localhost:5173).

---

 🧪 How It Works (at a glance)

- Names are sanitized (letters, spaces, hyphens, apostrophes).
- A fun “compatibility” score is generated randomly between 10 and 100.
- The number animates up, the meter fills, a message appears, and hearts burst.

Key sections in index.html:
- CSS variables and theming: :root { --accent, --bg-1, ... }
- Background hearts: SVG + requestAnimationFrame animation
- Celebration hearts: .floating-heart with keyframed floatUp

---

 🎨 Customize & Tweak

Make it “more beautiful and attractive” or tune performance easily.

- Colors and glow (CSS variables near the top):
  - --accent, --accent-2, --bg-1, --bg-2, --glow
- Emoji sizes:
  - Title emojis: .title .emoji { font-size: 1.25em; }
  - Center heart between inputs: .and { font-size: 36px; }
  - Score badge: .score .badge-emoji { font-size: 1.4em; }
- Celebration heart burst (JS):
  - Function: heartBurst(x, y)
  - Count: const count = 18; → increase for more hearts
  - Size: span.style.fontSize = (18 + Math.random()*18) + 'px';
- Background hearts density (JS):
  - spawnHearts(): base = 70; extra = min(80, floor(area / 15000))
  - Increase base or decrease area divisor for more hearts
- Meter animation speed:
  - .meter-fill { transition: width 1s cubic-bezier(...); }

Tip: Balance density and animation with device performance (see below).

---

 ♿ Accessibility

- Proper form labels for inputs
- aria-live region for announcing the score/message
- Focus ring and larger click targets for clear/close buttons
- Color contrast tuned for dark background

---

 ⚡ Performance Tips

- Lower background hearts: reduce base and/or extra in spawnHearts()
- Lower celebration hearts: reduce count in heartBurst()
- Prefer serving over file:// (some browsers throttle animations differently)
- Avoid heavy background tabs to keep animations smooth

---

 🛠️ Tech

- HTML5
- Modern CSS (variables, gradients, blur/glass)
- Vanilla JavaScript (no libraries)
- SVG for performant background animation

---


 🌐 Deploy

GitHub Pages:
Put the love/ folder in your repo
In repository settings, enable Pages → deploy from main /root
Access at: https://.github.io//love/
Netlify / Vercel:
Drag‑and‑drop the love/ folder or set it as the publish directory

 📄 License

MIT — feel free to use, modify, and share.

 💝 Acknowledgements

Emoji magic courtesy of your device’s emoji font
Gradient inspiration from modern glass UI patterns
Made with lots of 💖, 💘, and a sprinkle of ✨
