# 🏎️ Sarthak's Birthday Grand Prix (Level 25)

> A personalised 2D pixel-art interactive birthday adventure combining **Ferrari & Formula 1 racing** with a cozy **Minecraft world**, custom coupon rewards, pop culture Easter eggs, a personal birthday letter, and a grand fireworks cake finale!

**Live URL (GitHub Pages):** [https://anindyaTHEgrt.github.io/happybirthdaysarthak/](https://anindyaTHEgrt.github.io/happybirthdaysarthak/)

---

## 🎮 Features & Guided Adventure Stages

1. **Title / Game Boot Screen:**
   - 2D pixel-art racing garage with interactive headlights.
   - Retro 3-2-1 countdown transition with checkered flags and audio.
2. **Welcome World (Level 25 Spawn):**
   - Minecraft grass blocks, trees, couple avatars, and interactive spawn sign.
   - Restrained typewriter dialogue box with text-skip controls.
3. **Ferrari Grand Prix (P1 Circuit):**
   - Mini-game collectible challenge: Helmet, Checkered Flag, and Winner Trophy.
   - Triumphant P1 Podium reveal: *"P1 in my heart. Always."*
4. **Our Minecraft World (Memory Realm):**
   - Cozy cottage, sunset sky, garden signs with inside jokes, and hidden secret cache.
   - Main Memory Chest opens with golden glow to reveal a horizontal photo carousel.
   - High-quality photo lightbox modal with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).
5. **Birthday Reward Shop (Bazaar):**
   - Pixel-art trading stall with 6 collectible real-life passes (VIP Date Night, Master Baker, Uninterrupted Gaming, Sweet Craving, Infinite Hugs, Golden Wildcard).
   - "Claim Reward" interaction adds tickets into a persistent inventory.
6. **Hug & Kiss Meter:**
   - Tap-to-hug mechanic with real-time love meter progression.
   - Dynamic couple reactions (affectionate dialogues, floating hearts/kisses, loving milestones at 20%, 40%, 60%, 80%, and 100%).
   - Unlocks sweet kissing animation and secret "Love Meter: MAXED OUT" achievement.
7. **Heartfelt Birthday Letter:**
   - Sealed envelope on a cozy wooden desk under a starry night window.
   - Breaking the seal unfolds a personal, readable parchment letter with custom sign-off.
8. **Birthday Cake Grand Finale:**
   - Pixel cake with decorative Level 25 badge and 5 interactive candle flames.
   - Extinguishing all candles triggers grand fireworks, confetti bursts, a driving victory car, and final celebratory banner.
9. **Global Systems:**
   - 7 Unlockable Achievements with retro toast notifications & trophy hall.
   - Web Audio API synthesized chiptune BGM & retro SFX (100% original, copyright-free, zero missing-asset issues).
   - LocalStorage persistence (`sarthakBirthdayProgress_v1`) with Reset Adventure confirmation modal.
   - Responsive design for mobile, tablet, and desktop viewports.

---

## ✏️ HOW TO PERSONALISE THIS WEBSITE

All editable text, memories, coupons, and letters are centralised in one single file. You do **not** need to touch React components to customise the site!

### Step 1: Open the Central Content File
Open:
```
src/data/birthdayContent.js
```

### Step 2: Search for `EDIT HERE`
Use `Ctrl+F` (or `Cmd+F`) and search for:
```
EDIT HERE
```

### Step 3: Replace Content
1. **Birthday Person & Girlfriend Name:**
   - Update `birthdayPerson`, `age`, and `senderName`.
2. **Ferrari Podium Messages:**
   - Customise `podiumHeading`, `podiumMessage`, and `commentatorMessage`.
3. **Photos & Memories:**
   - Put your actual pictures in `public/assets/photos/` (e.g. `photo1.jpg`, `photo2.png`).
   - In `src/data/birthdayContent.js`, update the `image` paths, `title`, and `caption`.
   - *Recommended aspect ratio:* `4:3` or `16:9` (JPG, PNG, or WebP). The site uses pixel frames while preserving your original image clarity!
4. **Minecraft Garden Signs & Hidden Chest:**
   - Personalise inside jokes, server memories, or sweet notes in `memorySigns` and `hiddenChest`.
5. **Reward Passes / Coupons:**
   - Edit, add, or remove passes in `coupons` (e.g. customize date ideas, baked goods, or gaming passes).
6. **Easter Egg Messages:**
   - Personalise the jokes for *The Office*, *Breaking Bad*, *Manifest*, *Valorant*, and *Fortnite*.
7. **Birthday Letter:**
   - Replace the paragraphs in `letter.paragraphs` with your heartfelt personal letter, salutation, and signature.
8. **Birthday Cake & Finale:**
   - Customise `finalHeading`, `finalMessage`, and `finalSignOff`.

---

## 🚀 Local Development

To run the site locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

To verify a production build:
```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

This project is configured with GitHub Actions to deploy automatically upon pushing to the `main` branch.

### 1. Vite Base Path
Configured in `vite.config.js`:
```js
base: '/manrajbfbirthdaysite/'
```

### 2. GitHub Actions Deployment Workflow
The workflow `.github/workflows/deploy.yml` automatically:
1. Runs on push to `main`.
2. Checks out the code and sets up Node 20.
3. Installs dependencies with `npm ci`.
4. Runs `npm run build`.
5. Deploys the `./dist` folder to GitHub Pages.

### 3. Enabling GitHub Pages in Repository Settings
1. Open your repository on GitHub: `https://github.com/anindyaTHEgrt/manrajbfbirthdaysite`.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push to `main` (or trigger the workflow manually in the **Actions** tab).
5. Once the job succeeds, open `https://anindyaTHEgrt.github.io/manrajbfbirthdaysite/`.

---

## 🎨 Asset Conventions

- **Photos (`public/assets/photos/`):** Real photographs displayed in crisp retro frames without pixel distortion. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`.
- **Sprites (`public/assets/sprites/`):** Scalable vector pixel art (`crispEdges`) for cars, chests, trophies, and helmets.
- **Audio:** Powered by custom Web Audio API chiptune synthesis. You can also drop standard `.mp3` or `.ogg` files into `public/assets/music/` or `public/assets/sounds/` if desired.
