# FOR MY RITI ❤️ — A Little World Made Just For You

A personalised, interactive romantic digital experience created by **Ankit** exclusively for **Preeti ("Riti")** — celebrating a childhood memory from KYOTA, heartfelt questions, five personal *Open When…* letters, an interactive 36-item relationship bucket list, original romantic piano & ambient pad music, and a final surprise before meeting in person.

---

## Project Structure

```text
for-my-riti/
│
├── index.html          # Semantic HTML5 structure (Welcome, Prologue, Questions, Letters, Bucket List, Surprise)
├── style.css           # Pure CSS3 luxury romantic styling, animations, glassmorphism & mobile-first responsiveness
├── script.js           # Pure Vanilla JavaScript interactivity, localStorage persistence & Web Audio API music engine
│
├── assets/
│   ├── images/
│   │   └── heart-emblem.svg  # Bespoke rose-gold heart crest SVG icon (ready for personal photos too)
│   └── music/                # Ready for an optional custom MP3 file (if added later)
│
└── README.md                 # Project overview & GitHub Pages deployment guide
```

---

## Technology Stack

Built strictly with **zero external frameworks or build requirements**:

- **HTML5**
- **CSS3** (Custom properties, CSS Grid/Flexbox, keyframe animations, `prefers-reduced-motion` accessibility)
- **Vanilla JavaScript** (ES6+, `IntersectionObserver`, HTML5 `<canvas>` ambient petals & particles, `localStorage`, and `Web Audio API` romantic piano/pad synthesizer)

You can open `index.html` directly in any modern browser (`Chrome`, `Safari`, `Edge`, `Firefox`) with a double-click—no `npm install`, server, or build step required.

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub (for example, `for-my-riti`).
2. Upload or push `index.html`, `style.css`, `script.js`, `assets/`, and `README.md` to the root of your `main` branch.
3. Open your **GitHub Repository** → click **Settings** in the top tab bar.
4. In the left sidebar, click **Pages**.
5. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
6. Under **Branch**, choose **`main`** and folder **`/ (root)`**, then click **Save**.
7. Wait ~60 seconds and refresh the Pages settings screen—GitHub will display your live shareable link (`https://<your-username>.github.io/for-my-riti/`) ready to send to Preeti!

---

## Optional Future Customisation

- **Custom Background Song (Optional):** By default, `script.js` plays an original dreamy piano & ambient pad composition generated live via the browser's native Web Audio API (no external audio files needed). If you ever wish to use a specific `.mp3` recording instead, place your file inside `assets/music/` (e.g., `assets/music/our-song.mp3`) and set `CUSTOM_AUDIO_FILE = "./assets/music/our-song.mp3"` near the top of `script.js`.
- **Personal Photographs (Optional):** No stock, placeholder, or generated photos are used anywhere on the site. If you later want to add real photographs into `assets/images/`, they can be referenced with relative paths (`./assets/images/...`) so they work seamlessly on GitHub Pages.
