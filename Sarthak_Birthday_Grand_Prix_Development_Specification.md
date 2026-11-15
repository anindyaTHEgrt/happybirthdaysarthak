# Sarthak's Birthday Grand Prix

## Antigravity Development Specification

**Project type:** Personalised, static birthday website\
**Primary visual direction:** Ferrari / Formula 1 × Minecraft-inspired
2D pixel art\
**Experience style:** Guided interactive adventure\
**Deployment target:** GitHub Pages\
**Document status:** Approved concept and implementation brief

------------------------------------------------------------------------

## 1. Project brief

Build a polished, responsive birthday website for **Sarthak Shetty**,
whose birthday is **17 November 2001**. The experience is designed as a
guided 2D pixel-art adventure that combines his interests in Ferrari,
Formula 1, Minecraft, gaming, baking and television series with personal
memories and messages from his girlfriend.

The website should feel like a small, lovingly made game rather than a
conventional birthday landing page. Sarthak follows a guided sequence of
scenes, interacts with objects, discovers optional hidden chests,
collects achievements, opens birthday coupons, reads a personal letter
and completes the experience by extinguishing candles on a birthday
cake.

### 1.1 Creative direction

-   **Primary theme:** Ferrari / F1 racing.
-   **Visual language:** Minecraft-inspired 2D pixel art, block-based
    environments, pixel sprites and game-interface details.
-   **Mood:** A balance of funny, playful, romantic and heartfelt.
-   **Navigation:** Guided progression. No free-roaming game controls
    are required.
-   **Age treatment:** Subtle. The birthday can be referred to as Level
    25, but age 25 should not dominate every screen.
-   **Emotional centre:** The shared Minecraft world and personal
    memories.
-   **Final emotional message:** "P1 in my heart. Always." The
    girlfriend may edit this wording.
-   **Required bonus systems:** Achievements, hidden treasure chests,
    music and fireworks.

### 1.2 Intended experience

1.  The visitor opens the site and sees a game-style loading/title
    screen.
2.  They press Start to enter the birthday world.
3.  They progress through a sequence of illustrated scenes using clear
    buttons and clickable objects.
4.  They complete a small F1-themed collectible challenge and see a
    podium reveal.
5.  They explore a shared Minecraft-inspired world and open a
    photo-memory chest.
6.  They visit a reward shop and inspect personalised coupons.
7.  They discover optional pop-culture and gaming Easter eggs.
8.  They open and read a personal birthday letter.
9.  They reach the birthday cake, extinguish its candles and trigger a
    fireworks finale.
10. They can revisit completed scenes, achievements and coupons.

### 1.3 Non-goals

Do not build a full Minecraft clone, a physics-based racing simulator,
multiplayer functionality, user accounts, a server, a database, payment
functionality or a complex 3D game. The desired result is a lightweight
static website with carefully designed 2D scenes and game-like
interactions.

------------------------------------------------------------------------

## 2. Mandatory implementation principles

These requirements apply to the entire project.

1.  **Build the complete experience, not just a visual mock-up.** Every
    button and interactive object must perform the action described in
    this document.
2.  **Use guided progression.** The user advances through scenes using
    clear Continue, Enter, Open, Claim or equivalent controls.
3.  **Keep the visual identity consistent.** Use one cohesive pixel-art
    style, a restrained palette and consistent sprite proportions.
4.  **Preserve photograph quality.** User-provided photographs must not
    be pixelated or distorted. Place them in pixel-style frames while
    retaining their original visual quality.
5.  **Centralise editable copy.** Birthday messages, captions, coupons,
    labels, dialogue, achievement descriptions and letter content must
    be stored in a central content file wherever practical.
6.  **Mark editable content in source code.** Every field intended for
    personalisation must have a prominent `EDIT HERE` comment. These
    comments must never appear on the rendered website.
7.  **Use original or properly licensed assets.** Do not copy Minecraft
    textures, Ferrari/F1 logos, TV screenshots, game character artwork,
    music or sound effects.
8.  **Make the site mobile-first and accessible.** Every hover
    interaction must have a tap/click equivalent.
9.  **Support GitHub Pages.** Configure the build and asset paths for a
    project-site deployment, not just local development.
10. **Do not invent personal memories.** Use clearly labelled
    placeholders until the girlfriend supplies the actual photographs,
    captions, jokes and letter.

------------------------------------------------------------------------

## 3. Visual design system

### 3.1 Palette

Use the following starting palette. The developer may tune shades for
contrast, but should retain the Ferrari-red / dark-racing /
Minecraft-earth identity.

  -----------------------------------------------------------------------
  Token                   Hex                     Use
  ----------------------- ----------------------- -----------------------
  Ferrari red             `#C91D28`               Primary accent, calls
                                                  to action, racing
                                                  details

  Obsidian                `#191919`               Dark backgrounds, HUD,
                                                  title screens

  Warm sandstone          `#E9D9B5`               Paper, letter, warm
                                                  surfaces

  Grass green             `#4D9B56`               Minecraft grass,
                                                  success, world details

  Deep forest             `#254A35`               Night/world contrast

  Gold                    `#E9C55B`               Trophies, achievements,
                                                  rewards

  Off-white               `#F5F1E8`               Main readable text

  Muted grey              `#A8A8A8`               Secondary text
  -----------------------------------------------------------------------

### 3.2 Typography

-   Pixel/display font: headings, short labels, game notifications and
    button text.
-   Clean sans-serif: paragraphs, instructions and long-form letter
    content.
-   Monospace: race stats, coordinates, player labels and HUD metadata.
-   Use a readable font size on mobile. Do not use pixel fonts for long
    paragraphs or the birthday letter.
-   Load fonts locally where possible, with sensible system fallbacks.

### 3.3 Pixel-art treatment

-   Use crisp pixel edges for sprites and illustrations.
-   Use `image-rendering: pixelated` only on pixel-art assets, never on
    real photographs.
-   Use block-based ground, trees, signs, chests, portals and props.
-   Use subtle animations: flag waving, light flicker, sparkle, item
    pickup, chest opening, flame flicker and fireworks.
-   Avoid excessive parallax, flashing effects or constant movement that
    makes text hard to read.
-   Keep the same art direction across all scenes.

### 3.4 Responsive scene layout

Design scenes as responsive compositions, not fixed screenshots.

-   Desktop: wide landscape environment with scene art, character/object
    placement and dialogue panel.
-   Tablet: preserve the scene composition while reducing decorative
    detail.
-   Mobile: use a portrait-friendly scene layout. Place dialogue and
    primary actions in a bottom panel. Keep important interactive
    objects visible and large enough to tap.
-   Avoid horizontal page scrolling.
-   Do not crop the cake, letter, photographs or primary interaction
    targets.
-   If a scene uses a background illustration, provide an appropriate
    mobile crop or alternate composition.

### 3.5 Interface components

Create reusable components for:

-   `GameHUD`
-   `ProgressTracker`
-   `DialogueBox`
-   `PrimaryActionButton`
-   `AchievementPopup`
-   `AchievementCollection`
-   `TreasureChest`
-   `PhotoGallery`
-   `PhotoLightbox`
-   `CouponInventory`
-   `CouponDetail`
-   `MusicControls`
-   `SoundControls`
-   `SceneTransition`
-   `BirthdayCake`
-   `Candle`
-   `FireworksOverlay`
-   `ConfirmationDialog`

Use a consistent visual system for focus, hover, pressed, disabled,
locked and completed states.

------------------------------------------------------------------------

## 4. Storyboard and screen specifications

The main journey contains eight screens. The Easter egg arcade is
optional and does not block the main route.

### Screen 0 --- Game boot / title screen

**Purpose:** Establish the racing-game identity and invite the visitor
into the experience.

**Visuals:** - Dark pixel-art racing garage. - Ferrari-red inspired car
in the garage; use original artwork without official logos. - Headlights
illuminate the floor. - Pixel lights, garage signage and checkered
details. - Title: "Sarthak's Birthday Grand Prix". - Subtitle: "A world
made just for you". - Player label: Sarthak. - Optional subtle version
label such as `SPECIAL EDITION`.

**Content placeholders:** - Main title. - Subtitle. - Player name. -
Start button label.

**Interactions:** - `START ADVENTURE` starts the experience. - Music
toggle enables/disables background music. - Car may animate headlights
on hover or tap. - Start interaction triggers a short 3--2--1 countdown,
checkered-flag transition and move to Screen 1. - Audio must not
autoplay before a user gesture. The Start action may initialise audio
after the visitor has interacted.

**Acceptance criteria:** - Start works on desktop and mobile. - Audio
remains muted until explicitly enabled or until the user has interacted
and opted in. - The scene does not remain stuck on a simulated loading
bar.

### Screen 1 --- Welcome to the birthday world

**Purpose:** Introduce the birthday quest and explain how to progress.

**Visuals:** - Bright Minecraft-inspired pixel landscape. - Grass
blocks, trees, flowers, stone path, lanterns and a welcome sign. -
Ferrari-red car as a visual motif. - Optional two pixel characters
representing the couple, if the girlfriend supplies or approves the
character appearance.

**Suggested copy (editable):** - Heading: "Welcome, Sarthak!" - Body:
"You've unlocked a brand-new adventure. Your mission is simple: enjoy
your birthday, collect surprises and discover what someone special has
prepared for you." - Objective: "Complete your birthday quest."

**Interactions:** - Dialogue appears with a restrained typewriter
effect. - Clicking the sign reveals the next instruction. - Continue
button opens Screen 2. - Optional first achievement unlock:
`Welcome to Level 25`.

**Acceptance criteria:** - All dialogue can be edited centrally. -
Continue is visible and keyboard accessible. - Typewriter animation must
not prevent the visitor from advancing; provide a skip or show-full-text
option.

### Screen 2 --- Ferrari Grand Prix

**Purpose:** Celebrate Sarthak's Ferrari/F1 interest and deliver the "P1
in my heart" moment.

**Visuals:** - Pixel-art race circuit, grandstand, pit lane, checkered
starting line and red racing car. - Use generic racing design cues; do
not use official team marks or protected logos. - Scoreboard and
podium. - The podium should make first place visually dominant.

**Mini-game: collectible challenge:** - Three visible objects: racing
helmet, checkered flag and golden trophy. - Each object is
clickable/tappable. - On collection: animate the object, play an
optional short sound and update the collectible count. - Once all three
are collected, enable the podium reveal.

**Podium reveal:** - Display Sarthak on the P1 podium. - Main editable
message: "P1 in my heart. Always." - Supporting message placeholder:
"Some people chase championships. You've already won the most important
one." - Optional text-based commentator announcement. Do not require
voice audio.

**Achievement:** - `POLE POSITION` / `Pole Position in Her Heart`.

**Transition:** - A small red racing car drives off-screen and a
transition leads into Screen 3.

**Acceptance criteria:** - Each collectible can only be collected
once. - The challenge cannot advance until all three items are
collected, unless an explicit skip option is provided. - The podium
reveal triggers exactly once per completion. - The challenge works with
mouse, keyboard and touch.

### Screen 3 --- Our Minecraft World

**Purpose:** The emotional centrepiece. Reference the fact that the
couple played Minecraft together and make this environment feel like a
shared world.

**Visuals:** - Cozy Minecraft-inspired cottage, garden, lanterns, trees
and sunset. - Two small characters may represent the couple. - A house,
garden signs, mailbox and several chests. - Keep the environment warm
and inviting rather than overly busy.

**Memory/photo chest:** - A prominent chest opens when clicked/tapped. -
Chest opening triggers a short glow and lid animation. - Opening the
chest reveals a horizontal photo strip or gallery. - Use the actual
photographs supplied by the girlfriend. - Preserve original image
quality. - Each photo has an editable caption. - Desktop supports
previous/next controls and scrolling. - Mobile supports swipe gestures
and visible arrow controls. - Clicking a photo opens a larger lightbox
with close button and caption. - Provide descriptive alt text for
meaningful photographs.

**Memory signs:** - Add three to five optional clickable signs. - Each
sign opens a short editable memory or inside joke. - Use placeholders if
the actual memory text is not yet available.

**Hidden chest:** - Add at least one optional chest tucked behind a tree
or near the house. - It reveals a special image, message or
collectible. - It must not block main progression. - Mark it as opened
in the state system and award the treasure achievement when applicable.

**Achievement:** - `MASTER BUILDER` / `Best Co-op Partner`.

**Transition:** - A glowing portal or clear Continue action opens Screen
4.

**Acceptance criteria:** - Empty photo slots must show a tasteful
placeholder during development, not broken images. - The gallery remains
usable on narrow screens. - The lightbox can be closed using a visible
button and Escape key. - Optional chests can be revisited without
duplicating rewards.

### Screen 4 --- Birthday Reward Shop

**Purpose:** Present personalised coupons as collectible game rewards.

**Visuals:** - Pixel-art trading shop, counter, shopkeeper and reward
inventory. - Coupon cards styled like game inventory items or tickets. -
Each card has a distinct icon and title.

**Initial suggested coupons (all editable):** 1. Date Night Pass --- one
special date planned for him. 2. Master Baker Pass --- one baking or
dessert session together. 3. Gaming Pass --- an uninterrupted gaming
session. 4. Dessert Pass --- one dessert of his choice. 5. Hug Pass ---
unlimited hugs. 6. Wildcard Pass --- one special wish, subject to
girlfriend approval.

The girlfriend may remove, rename or add coupons. Do not treat these
suggested examples as final personal promises.

**Coupon interactions:** - Click/tap a coupon to flip or expand it. -
Show the title, description, optional expiry and redemption
instructions. - `CLAIM REWARD` marks it as claimed/viewed, not
automatically redeemed. - Show a confirmation animation. - Coupons
remain available in a persistent `My Coupons` inventory. - Provide a way
to revisit coupon details. - Do not create a real messaging integration
or claim that a coupon has been sent.

**Achievement:** - `TREASURE COLLECTOR`.

**Acceptance criteria:** - Coupon data is centralised and editable. -
Claimed state persists locally. - Claiming a coupon does not remove it
from the inventory. - Coupon controls work by keyboard and touch.

### Screen 5 --- Easter Egg Arcade (optional)

**Purpose:** Include secondary interests without distracting from the
romantic story.

**Visuals:** - A compact pixel-art arcade/room with four clickable areas
or props. - Optional references to The Office, Breaking Bad, Manifest,
Valorant and Fortnite. - Keep all references transformative and
text-based. Do not use TV screenshots, show logos, game logos or copied
character art.

**Suggested Easter eggs:**

**The Office desk** - Click a mug or computer. - Reveal a playful
"World's Best Boyfriend" / employee-of-the-month style message. - Keep
the wording editable and avoid copying show dialogue.

**Chemistry lab / Breaking Bad reference** - Click a brewing stand or
lab prop. - Trigger bubbling animation. - Reveal an original
birthday-themed "birthday formula" message. - Do not reproduce show
imagery, logos or dialogue.

**Manifest reference** - Optional boarding pass or flight board. -
Destination can be "Birthday Level 25". - Use an original fictional
design.

**Valorant** - Click a gaming terminal. - Reveal a custom birthday
player card with editable stats such as player name, rank and playful
ability description. - Do not use Valorant's official marks or agent
artwork.

**Fortnite** - Click a battle-arena chest. - Reveal an original "Victory
Royale" style birthday message, without copying game UI or artwork.

**Achievement:** - `POP CULTURE EXPERT`.

**Progression:** - All Easter eggs are optional. - The main Continue
button remains available. - The user can discover them in any order. -
Do not force completion of every Easter egg to access the letter.

### Screen 6 --- Birthday Letter

**Purpose:** Provide a quiet, personal emotional moment.

**Visuals:** - Cozy pixel-art room, warm lanterns, desk, window and
night sky. - Sealed envelope or mailbox on the desk. - Reduce background
motion and visual noise.

**Suggested prompt (editable):** "You've collected trophies, unlocked
rewards and discovered memories. But there's one final thing waiting for
you."

**Letter interaction:** 1. Click/tap envelope. 2. Envelope moves to
centre. 3. Seal breaks. 4. Letter unfolds. 5. Letter text appears with a
gentle typewriter effect or paragraph reveal. 6. Continue button appears
when the letter is shown. 7. Provide a replay-letter control.

**Content:** - Entire letter is stored in the central content file. -
Support paragraphs and line breaks. - Include editable salutation and
signature. - Use a readable non-pixel font for the body. - Do not invent
the girlfriend's name or write a fake personal letter. - Use a clearly
marked placeholder until she supplies the final wording.

**Achievement:** - `HEART OF THE WORLD`.

**Acceptance criteria:** - Long letters scroll inside a readable panel
or page. - Text animation can be skipped. - The letter remains readable
on mobile. - The signature is editable.

### Screen 7 --- Birthday Cake Finale

**Purpose:** Deliver the birthday cake interaction, fireworks and final
greeting.

**Visuals:** - A central pixel-art birthday cake. - Number 25 may appear
as a cake topper or decoration. - Use approximately five to seven
individually interactive candles; do not require 25 separate candle
interactions. - Darkened celebratory background with enough contrast to
see the cake. - Fireworks and pixel confetti are reserved for the
finale.

**Cake interaction:** - Display prompt: "Make a wish, birthday boy!" -
Candle flames flicker when the pointer approaches. - A candle can be
extinguished by click/tap. - Optional microphone blowing may be
implemented as an enhancement, but must never be the only way to
extinguish candles. - If microphone support is added, request permission
only after an explicit button press, explain why permission is needed
and provide a fallback. - Each extinguished candle produces a small
smoke puff. - Track extinguished candles. - When all candles are
extinguished, trigger the finale exactly once.

**Finale sequence:** 1. Room dims slightly. 2. Fireworks appear behind
the cake. 3. Pixel hearts and confetti fall. 4. A small red racing car
drives across the bottom. 5. A trophy appears. 6. Final birthday message
fades in.

**Suggested final copy (editable):** - "HAPPY BIRTHDAY, SARTHAK!" -
"Here's to more adventures, more memories, more Minecraft worlds and
many more birthdays together." - "P1 IN MY HEART. ALWAYS."

**Post-finale options:** - Replay adventure. - View achievements. - Open
coupon inventory. - Revisit completed scenes. - Explore any missed
optional chests.

**Achievement:** - `BIRTHDAY CHAMPION`.

**Acceptance criteria:** - Candle interactions work on desktop and
mobile. - Hover is an enhancement, not the only interaction. - Fireworks
trigger once after the final candle. - Respect reduced-motion
settings. - Provide a skip-animation option if the celebration animation
is long.

------------------------------------------------------------------------

## 5. Global systems

### 5.1 Guided navigation and progress

The main progression order is:

`Loading → Welcome → Ferrari Grand Prix → Minecraft World → Reward Shop → Easter Egg Arcade → Birthday Letter → Cake Finale`

Rules: - Main scenes unlock sequentially. - Optional chests and Easter
eggs never block the main route. - Completed scenes can be revisited. -
A visible Continue/Next action must always exist when the user can
progress. - Provide a Back action where appropriate. - Do not let the
browser Back button unexpectedly reset the experience. - Show current
scene and overall progress in the HUD. - On revisit, preserve completed
challenge state and collected items.

### 5.2 Game HUD

A small, unobtrusive HUD may include: - Project/player label. - Current
scene. - Progress indicator. - Achievement collection button. - Music
toggle. - Sound-effects toggle. - Coupon inventory button once coupons
are unlocked. - Optional restart control inside a settings/menu panel.

On mobile, simplify the HUD and avoid covering important scene objects.

### 5.3 Achievement system

Show a small game-style toast in a consistent corner of the screen. Each
achievement contains an icon, title and short description.

Suggested achievements:

  -----------------------------------------------------------------------
  ID                      Title                   Unlock condition
  ----------------------- ----------------------- -----------------------
  `welcome`               Welcome to Level 25     Start the adventure

  `pole-position`         Pole Position           Complete all three
                                                  racing collectibles

  `master-builder`        Master Builder          Open the main Minecraft
                                                  memory chest

  `treasure-collector`    Treasure Collector      Open the required
                                                  hidden chest(s)

  `pop-culture`           Pop Culture Expert      Discover at least the
                                                  configured number of
                                                  Easter eggs

  `heart-world`           Heart of the World      Open/read the birthday
                                                  letter

  `birthday-champion`     Birthday Champion       Complete the cake
                                                  finale
  -----------------------------------------------------------------------

Implementation rules: - Store achievement definitions centrally. -
Unlock each achievement only once. - Persist unlocked achievement IDs in
local storage. - Provide an achievements collection screen/panel. -
Achievement popups must not block important controls. - Include
accessible text; do not communicate achievement status by colour alone.

### 5.4 Hidden chests

-   Include three or four chests across the experience.
-   At least one chest is optional and hidden in the Minecraft
    environment.
-   Chest states: hidden/not discovered, available, opened.
-   Opening a chest reveals a message, image or collectible.
-   Persist opened chest IDs.
-   Prevent duplicate rewards on repeated opening.
-   Use subtle sparkle/glow cues, not intrusive flashing.
-   Make chest interactions accessible by keyboard and touch.

### 5.5 Music and sound

Provide separate controls for: - Background music. - Sound effects.

Rules: - Never force audio playback before a user gesture. - The Start
button may unlock audio capability, but the visitor must still have a
clear music preference control. - Show an obvious mute/unmute state. -
Use original or properly licensed tracks and effects. - Keep audio files
local in the project. - Handle missing audio gracefully; the site must
still work silently. - Do not embed copyrighted Minecraft, F1, Ferrari,
TV-series or video-game soundtracks. - Respect browser audio
restrictions and avoid repeated overlapping sound instances. - Stop or
fade scene-specific sounds when leaving a scene.

### 5.6 Progress persistence

Use React state for live UI and `localStorage` for progress persistence.

Suggested stored state: - Current scene ID. - Completed scene IDs. -
Collected racing item IDs. - Opened chest IDs. - Unlocked achievement
IDs. - Coupon claimed/viewed IDs. - Candle extinguished IDs. - Music
preference. - Sound-effects preference.

Rules: - Validate data loaded from local storage. - Use a versioned
storage key, e.g. `sarthakBirthdayProgress_v1`. - If stored data is
missing or invalid, initialise safely. - Provide a clearly labelled
Reset Adventure option with a confirmation prompt. - Resetting should
clear progress/preferences for this website only. - Do not store
personal data beyond the local browser experience. - Do not imply that
progress syncs across devices.

------------------------------------------------------------------------

## 6. Personalisation architecture --- mandatory

This is a key requirement. The girlfriend should be able to edit the
words and replace photographs without searching through React
components.

### 6.1 Central content file

Create:

`src/data/birthdayContent.js`

This file should contain all content that the girlfriend may want to
personalise.

Suggested structure:

``` javascript
/*
========================================================
SARTHAK'S BIRTHDAY WEBSITE — PERSONALISATION FILE

Search for: EDIT HERE

Change the values in this file to personalise the site.
Do not edit the scene components just to change wording.
========================================================
*/

export const birthdayContent = {
  // EDIT HERE: Birthday person's name
  birthdayPerson: "Sarthak Shetty",

  // EDIT HERE: Birthday date and age display
  birthdayDate: "17 November 2026",
  age: 25,
  showAgeProminently: false,

  // EDIT HERE: Girlfriend's name/signature
  senderName: "[EDIT HERE: Your name]",

  // EDIT HERE: Main title and welcome copy
  siteTitle: "Sarthak's Birthday Grand Prix",
  siteSubtitle: "A world made just for you",
  welcomeHeading: "Welcome, Sarthak!",
  welcomeMessage:
    "[EDIT HERE: Write the birthday welcome message]",

  // EDIT HERE: Ferrari podium messages
  podiumHeading: "P1 in my heart. Always.",
  podiumMessage:
    "[EDIT HERE: Add a personal podium message]",

  // EDIT HERE: Photo gallery
  memories: [
    {
      id: "memory-01",
      image: "/assets/photos/memory-01.jpg",
      alt: "[EDIT HERE: Describe this photograph]",
      caption: "[EDIT HERE: Add the memory caption]"
    }
  ],

  // EDIT HERE: Minecraft signs / inside jokes
  memorySigns: [
    {
      id: "sign-01",
      title: "[EDIT HERE: Sign title]",
      message: "[EDIT HERE: Memory or inside joke]"
    }
  ],

  // EDIT HERE: Coupons
  coupons: [
    {
      id: "date-night",
      title: "Date Night Pass",
      description: "[EDIT HERE: Describe the reward]",
      redemptionInstructions:
        "[EDIT HERE: Explain how to redeem]",
      icon: "heart"
    }
  ],

  // EDIT HERE: Easter egg messages
  easterEggs: {
    office: "[EDIT HERE: The Office reference]",
    breakingBad: "[EDIT HERE: Birthday lab message]",
    manifest: "[EDIT HERE: Boarding pass message]",
    valorant: "[EDIT HERE: Player card message]",
    fortnite: "[EDIT HERE: Victory message]"
  },

  // EDIT HERE: Birthday letter
  letter: {
    heading: "A letter for you",
    salutation: "Dear Sarthak,",
    paragraphs: [
      "[EDIT HERE: Write the first paragraph]",
      "[EDIT HERE: Write the second paragraph]"
    ],
    signOff: "With love,",
    signature: "[EDIT HERE: Your name]"
  },

  // EDIT HERE: Cake and final message
  cakePrompt: "Make a wish, birthday boy!",
  finalHeading: "Happy Birthday, Sarthak!",
  finalMessage:
    "[EDIT HERE: Write the final birthday message]",
  finalSignOff: "P1 in my heart. Always."
};
```

This is a structural example. Antigravity may extend the schema to cover
all scene dialogue, achievement copy, button labels and optional
content, but it must preserve one central source of truth.

### 6.2 Required code comment convention

Use prominent comments above every personalisation section:

``` javascript
// ==================================================
// EDIT HERE: CHANGE THE BIRTHDAY GREETING
// ==================================================
```

For individual data:

``` javascript
// EDIT HERE: Replace with your own photograph and caption.
```

Rules: - Use `EDIT HERE` consistently so the developer can search for
it. - Personalised text must not be duplicated across multiple
components. - Avoid hardcoding messages directly in JSX. - Keep
functional logic separate from editable copy. - Do not display
`EDIT HERE` instructions in the rendered website. - Use clear
placeholder text until real content is supplied.

### 6.3 Personalisation README

The root `README.md` must contain a prominent section titled:

`HOW TO PERSONALISE THIS WEBSITE`

Explain: 1. Open `src/data/birthdayContent.js`. 2. Search for
`EDIT HERE`. 3. Replace the placeholder messages. 4. Add photographs to
`public/assets/photos/`. 5. Update each photo path and caption in the
content file. 6. Replace the birthday letter paragraphs and signature.
7. Edit, remove or add coupon entries. 8. Edit Easter egg messages. 9.
Replace audio files only with properly licensed/original assets. 10. Run
the local development server and preview the website before deployment.

Also document image naming conventions, supported formats and
recommended aspect ratios.

------------------------------------------------------------------------

## 7. Recommended technical architecture

### 7.1 Stack

Use: - React. - Vite. - JavaScript (unless TypeScript materially
improves the implementation). - Tailwind CSS or well-organised CSS
modules/custom CSS. - Framer Motion only where it adds value; CSS
animations are suitable for simple pixel effects. - React state/context
or a lightweight reducer for progression. - Local storage for
progress. - HTML/CSS/SVG/canvas only where appropriate for effects.

Avoid unnecessary libraries and large game engines.

### 7.2 Project structure

Use a clear, maintainable structure similar to:

``` text
sarthak-birthday/
├── public/
│   ├── assets/
│   │   ├── backgrounds/
│   │   ├── characters/
│   │   ├── objects/
│   │   ├── photos/
│   │   ├── icons/
│   │   ├── music/
│   │   └── sounds/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── GameHUD.jsx
│   │   ├── ProgressTracker.jsx
│   │   ├── DialogueBox.jsx
│   │   ├── AchievementPopup.jsx
│   │   ├── AchievementCollection.jsx
│   │   ├── TreasureChest.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── PhotoLightbox.jsx
│   │   ├── CouponInventory.jsx
│   │   ├── CouponDetail.jsx
│   │   ├── MusicControls.jsx
│   │   ├── SceneTransition.jsx
│   │   ├── BirthdayCake.jsx
│   │   └── FireworksOverlay.jsx
│   │
│   ├── scenes/
│   │   ├── LoadingScreen.jsx
│   │   ├── WelcomeWorld.jsx
│   │   ├── FerrariGrandPrix.jsx
│   │   ├── MinecraftWorld.jsx
│   │   ├── RewardShop.jsx
│   │   ├── EasterEggArcade.jsx
│   │   ├── BirthdayLetter.jsx
│   │   └── BirthdayFinale.jsx
│   │
│   ├── data/
│   │   ├── birthdayContent.js
│   │   ├── achievements.js
│   │   └── sceneConfig.js
│   │
│   ├── hooks/
│   │   ├── useProgress.js
│   │   └── useAudio.js
│   │
│   ├── context/
│   │   └── GameContext.jsx
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── pixel-art.css
│   │   └── animations.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
├── package.json
└── vite.config.js
```

Antigravity may adjust filenames or group components differently if the
result is cleaner, but keep the separation between scenes, reusable
components, content and state.

### 7.3 State model

Use a central game state. Suggested shape:

``` javascript
const initialGameState = {
  currentScene: "loading",
  completedScenes: [],
  collectedRaceItems: [],
  openedChests: [],
  unlockedAchievements: [],
  viewedCoupons: [],
  claimedCoupons: [],
  extinguishedCandles: [],
  musicEnabled: false,
  soundEnabled: true,
  finaleTriggered: false
};
```

Suggested actions: - `START_GAME` - `GO_TO_SCENE` - `COMPLETE_SCENE` -
`COLLECT_RACE_ITEM` - `OPEN_CHEST` - `UNLOCK_ACHIEVEMENT` -
`VIEW_COUPON` - `CLAIM_COUPON` - `EXTINGUISH_CANDLE` - `TOGGLE_MUSIC` -
`TOGGLE_SOUND` - `RESET_PROGRESS`

Implementation rules: - Use a reducer or equivalent central
state-management approach. - Avoid duplicating the same state in
unrelated components. - Make state updates immutable. - Guard against
collecting the same object twice. - Guard against unlocking the same
achievement more than once. - Persist the relevant state to local
storage. - Keep transient animation state separate from persisted
progress. - Handle a missing or malformed local-storage record
gracefully.

### 7.4 Scene configuration

Represent scene order and metadata in a central configuration file. Each
scene should have an ID, title, order, optional flag and completion
rule.

The Easter egg arcade is optional. Hidden chests are optional. The main
route must remain completable without discovering every optional item.

### 7.5 Asset loading and fallback

-   Use local assets rather than remote hotlinked images.
-   Provide a fallback for any missing image or audio file.
-   Use descriptive filenames.
-   Compress large images appropriately.
-   Prefer WebP for photographs where practical, while retaining
    original files outside the deployed bundle if needed.
-   Preload only critical first-screen assets.
-   Lazy-load later scene artwork and photo images.
-   Avoid a long fake loading screen; show a real loading indicator only
    when needed.

------------------------------------------------------------------------

## 8. Animation and interaction specification

### 8.1 General animation rules

-   Use short, purposeful animations.
-   Scene transitions should feel consistent.
-   Avoid animation that blocks navigation.
-   Make typewriter effects skippable.
-   Keep important controls visible during transitions.
-   Respect `prefers-reduced-motion`.
-   Provide a reduced-motion alternative for fireworks and large
    movement.
-   Avoid rapid flashing or strobing.

### 8.2 Required interaction states

Every interactive object must define: - Default state. - Hover state
(where relevant). - Focus state. - Pressed state. - Disabled/locked
state. - Completed/opened state.

### 8.3 Keyboard accessibility

-   Buttons must be reachable by Tab.
-   Enter/Space activates buttons.
-   Escape closes lightboxes and dialogs.
-   Visible focus indicators must be present.
-   Do not require mouse movement to progress.
-   Do not implement essential actions exclusively on hover.

### 8.4 Candle interaction details

-   Use individual buttons or accessible interactive elements for
    candles.
-   Hover flicker may preview the effect.
-   Click/tap extinguishes the candle.
-   Once extinguished, the candle remains out.
-   A smoke animation is decorative and must not convey the only
    indication that the candle was extinguished.
-   Fireworks are triggered when all required candles are out.
-   Add a visible "Extinguish candles" fallback if individual
    interactions fail.

### 8.5 Audio details

-   Create a single audio controller or hook.
-   Avoid multiple background tracks playing simultaneously.
-   Mute state must be reflected in the UI.
-   If audio fails to load, show no blocking error.
-   Keep all sound effects optional.
-   Do not use copyrighted game/film/music recordings without
    permission.

------------------------------------------------------------------------

## 9. Responsive design and accessibility

### 9.1 Responsive breakpoints

Use sensible breakpoints based on content, for example: - Small mobile:
up to 480px. - Large mobile: 481--767px. - Tablet: 768--1023px. -
Desktop: 1024px and above.

These are design guides, not rigid device assumptions.

### 9.2 Accessibility requirements

-   Use semantic HTML.
-   Use buttons for actions and links for navigation.
-   Add alt text to meaningful images.
-   Decorative images should have empty alt text.
-   Ensure adequate text/background contrast.
-   Do not communicate status using colour alone.
-   Provide keyboard focus indicators.
-   Ensure text remains readable when zoomed.
-   Support reduced motion.
-   Make dialogues and modals accessible to screen readers.
-   Return focus to the triggering element when a modal closes.
-   Keep touch targets comfortably sized.
-   Provide captions or text alternatives for audio-based information.

### 9.3 Performance

-   Optimise images and sprites.
-   Avoid huge uncompressed background images.
-   Lazy-load later scenes.
-   Avoid unnecessary rerenders during animation.
-   Avoid large dependencies for small effects.
-   Ensure the initial screen loads quickly on mobile data.
-   Do not rely on external image URLs that may expire.

------------------------------------------------------------------------

## 10. GitHub Pages deployment requirements

The site must be a static client-side application and deploy
successfully to GitHub Pages.

### 10.1 Vite base path

Configure `vite.config.js` correctly.

For a repository named `sarthak-birthday`, the base path should be:

``` javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/sarthak-birthday/"
});
```

If deploying to a repository named `<username>.github.io`, use `/` as
the base. The base path must match the actual repository deployment.

### 10.2 Build scripts

Ensure `package.json` contains working scripts such as:

``` json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Do not assume a deploy script is necessary if GitHub Actions handles
deployment.

### 10.3 GitHub Actions

Create a workflow such as:

`.github/workflows/deploy.yml`

It should: 1. Trigger on pushes to the configured deployment branch
(normally `main`). 2. Check out the repository. 3. Set up a supported
Node.js version. 4. Install dependencies using the lockfile (`npm ci`).
5. Run the production build. 6. Upload the `dist` directory as the Pages
artifact. 7. Deploy to GitHub Pages using the official Pages actions. 8.
Use the required Pages permissions and concurrency configuration.

Use the current official GitHub Pages Actions workflow conventions when
implementing. Do not hardcode secrets or personal tokens into the
repository.

### 10.4 GitHub repository setup

README deployment instructions must explain: 1. Create a GitHub
repository. 2. Push the project. 3. Confirm the Vite base path matches
the repository name. 4. Open repository Settings → Pages. 5. Select
GitHub Actions as the build/deployment source if required. 6. Push to
the deployment branch. 7. Wait for the workflow to complete. 8. Open the
published Pages URL. 9. Test the site on both mobile and desktop.

### 10.5 Deployment checks

-   Confirm asset paths work under the repository subpath.
-   Confirm refresh does not cause a 404.
-   Avoid unnecessary client-side routing. A single-scene application
    with state-based navigation is preferred.
-   Confirm all local image/audio paths resolve.
-   Confirm no development-only localhost URLs remain.
-   Confirm the deployed site uses HTTPS.
-   Confirm the site can load without a backend.

------------------------------------------------------------------------

## 11. Testing and acceptance checklist

The developer must test the complete experience before considering it
finished.

### Functional

-   [ ] Start button begins the experience.
-   [ ] Countdown and opening transition work.
-   [ ] All eight scenes render.
-   [ ] Main progression follows the specified order.
-   [ ] Back/Continue/revisit controls work.
-   [ ] All three racing collectibles work and cannot be duplicated.
-   [ ] Podium reveal triggers after the challenge.
-   [ ] Main Minecraft chest opens.
-   [ ] Photo strip works with arrows and swipe.
-   [ ] Photo lightbox opens and closes.
-   [ ] Hidden chests work and persist.
-   [ ] Memory signs reveal their messages.
-   [ ] Coupons open and show descriptions.
-   [ ] Coupon claims persist and can be revisited.
-   [ ] Easter eggs are optional and functional.
-   [ ] Birthday letter opens and can be read fully.
-   [ ] Letter animation can be skipped/replayed.
-   [ ] Candles can be extinguished by click/tap.
-   [ ] Hover effect works as an enhancement on desktop.
-   [ ] Fireworks trigger after the last candle.
-   [ ] Achievements unlock correctly.
-   [ ] Music and sound toggles work independently.
-   [ ] Reset Adventure asks for confirmation.

### Persistence

-   [ ] Refreshing the page does not unexpectedly reset progress.
-   [ ] Reopening a chest does not duplicate rewards.
-   [ ] Recollecting an item does not duplicate it.
-   [ ] Achievements remain unlocked.
-   [ ] Coupon state remains consistent.
-   [ ] Invalid local-storage data does not crash the app.
-   [ ] Reset clears the appropriate local progress.

### Responsive

-   [ ] Test a narrow mobile viewport.
-   [ ] Test a large mobile viewport.
-   [ ] Test tablet layout.
-   [ ] Test desktop layout.
-   [ ] No horizontal overflow.
-   [ ] All controls are touch-friendly.
-   [ ] Dialogue and letter remain readable.
-   [ ] Important objects are not cropped.
-   [ ] Gallery supports touch navigation.

### Accessibility

-   [ ] Keyboard-only navigation is possible.
-   [ ] Focus indicators are visible.
-   [ ] Buttons have accessible names.
-   [ ] Images have appropriate alt text.
-   [ ] Modals can be closed accessibly.
-   [ ] Reduced-motion preference is respected.
-   [ ] Audio is not forced on the visitor.

### Production

-   [ ] `npm run build` succeeds.
-   [ ] No broken asset requests.
-   [ ] No critical browser console errors.
-   [ ] No placeholder text accidentally appears unless intentionally
    left for personalisation.
-   [ ] GitHub Pages base path is correct.
-   [ ] Deployed site loads over HTTPS.
-   [ ] Deployed site works from a fresh browser session.

------------------------------------------------------------------------

## 12. Content and asset handover checklist

The following content may be supplied after the initial build. The
developer must make the website functional with placeholders in the
meantime.

### Personal details

-   [ ] Confirm girlfriend's preferred name/signature.
-   [ ] Confirm whether to display Sarthak's full name or first name
    only.
-   [ ] Confirm final birthday title and greeting.

### Photographs

-   [ ] Select approximately 8--12 photos.
-   [ ] Include optional screenshots/photos from shared Minecraft
    sessions.
-   [ ] Write a caption for each photo.
-   [ ] Confirm which photo, if any, should be the special hidden-chest
    reveal.

### Letter

-   [ ] Write the birthday letter.
-   [ ] Confirm salutation.
-   [ ] Confirm sign-off and signature.

### Coupons

-   [ ] Confirm final coupon list.
-   [ ] Personalise reward descriptions.
-   [ ] Add redemption instructions.
-   [ ] Remove any coupon that does not represent a real intended
    promise.

### Easter eggs

-   [ ] Add personalised jokes or references for The Office.
-   [ ] Add Breaking Bad reference.
-   [ ] Decide whether to include Manifest.
-   [ ] Add Valorant player-card joke.
-   [ ] Add Fortnite message.

### Art and audio

-   [ ] Approve the two pixel characters if used.
-   [ ] Approve the Minecraft cottage/world environment.
-   [ ] Approve the pixel racing car.
-   [ ] Approve cake illustration.
-   [ ] Select original/licensed music and sound effects.

------------------------------------------------------------------------

## 13. Suggested asset-generation brief

Use this brief when generating or commissioning the original art assets.

### Global art direction

"Create a cohesive set of original 2D pixel-art assets for a
personalised birthday adventure website. The visual identity combines a
Ferrari-red racing atmosphere with a warm Minecraft-inspired block
world. Use crisp pixel edges, consistent sprite scale, readable
silhouettes, warm lighting and a restrained palette of racing red,
obsidian, sandstone, grass green and gold. The assets must be original
and must not reproduce official Minecraft textures, Ferrari/F1 logos, TV
screenshots, game characters or copyrighted UI."

### Required artwork

1.  **Racing garage background:** Wide 16:9 pixel-art garage, red
    sports/racing car silhouette, dramatic but warm lighting, no text or
    logos.
2.  **Racing car sprite:** Original red open-wheel-inspired pixel racing
    car, side view, transparent background if possible.
3.  **Race circuit background:** Pixel-art circuit, grandstand, pit lane
    and checkered track details.
4.  **Podium:** Three-level podium with a prominent first-place position
    and trophy.
5.  **Welcome world:** Grass-block landscape, path, trees, flowers,
    lanterns and signboard.
6.  **Minecraft-style cottage:** Cozy block-built house with garden,
    warm windows and lanterns.
7.  **Couple sprites:** Two original, consistent small pixel characters.
    Their appearance should be based only on details/photos the user
    chooses to provide. Do not invent real-person appearance.
8.  **Chest sprites:** Closed, open and glowing chest states.
9.  **Reward shop:** Pixel-art trading counter and inventory props.
10. **Easter egg props:** Office desk/mug, generic chemistry lab,
    boarding pass, gaming terminal and battle-arena chest.
11. **Letter room:** Cozy interior, desk, mailbox/envelope, lantern and
    starry window.
12. **Birthday cake:** Front-facing pixel-art cake with 5--7 separate
    candle flame states, plus unlit states.
13. **Fireworks:** Transparent pixel-art fireworks/confetti overlays.
14. **Achievement icons:** Small pixel icons for trophy, helmet, house,
    chest, letter and cake.

### Asset consistency requirements

-   Keep sprite scale and perspective consistent.
-   Provide transparent PNGs for individual objects where appropriate.
-   Provide separate flame-on and flame-off states for candles.
-   Provide open and closed chest states.
-   Do not bake text into artwork; render editable text in HTML.
-   Avoid putting important scene instructions inside background images.
-   Include mobile-friendly compositions or enough clean space for
    responsive cropping.

------------------------------------------------------------------------

## 14. Instructions to Antigravity

Treat this document as the source of truth for the project. Implement
the full website in the workspace, not merely a plan or a prototype.

### Required build sequence

**Phase 1 --- Foundation** - Initialise React + Vite. - Configure
styling and responsive layout. - Create the content file and README. -
Create the central game state and scene navigation. - Set up the GitHub
Pages base path correctly.

**Phase 2 --- Visual foundation** - Establish palette, fonts, pixel-art
styling and reusable HUD. - Create scene backgrounds and reusable
interaction components. - Use temporary original placeholder assets
where final art is unavailable.

**Phase 3 --- Main scenes** - Implement all eight screens. - Implement
scene transitions and guided progression. - Implement racing
collectibles and podium. - Implement Minecraft memory gallery and hidden
chests. - Implement coupon inventory. - Implement optional Easter egg
arcade. - Implement letter and cake finale.

**Phase 4 --- Global systems** - Implement achievements. - Implement
audio controls. - Implement local persistence. - Implement revisit and
reset behaviour.

**Phase 5 --- Quality assurance** - Test desktop, tablet and mobile. -
Test keyboard and touch. - Test all state transitions and persistence. -
Test missing assets and audio fallback. - Fix layout overflow and
console errors. - Run the production build.

**Phase 6 --- Deployment preparation** - Confirm repository name and
base path. - Add GitHub Actions Pages workflow. - Document deployment
and personalisation in README. - Do not claim deployment is complete
until the deployed GitHub Pages URL has been tested.

### Antigravity working rules

-   Do not stop after generating a homepage.
-   Do not replace the specified journey with a generic scrolling
    landing page.
-   Do not omit interactions because an illustration is difficult to
    source; use a clearly labelled original placeholder and implement
    the behaviour.
-   Do not put all scenes into one giant component.
-   Do not hardcode personal messages throughout JSX.
-   Do not invent photographs, inside jokes or a personal letter.
-   Do not use copyrighted logos, game assets, show screenshots or
    soundtrack files.
-   Do not add a backend or external service unless a requirement
    genuinely needs it.
-   Do not leave non-functional buttons or decorative controls that look
    interactive.
-   Explain any feature that cannot be implemented as specified and
    provide a working fallback.
-   Keep the README updated as the project structure changes.

### Final deliverables expected from Antigravity

1.  Complete React + Vite source project.
2.  All eight working scenes.
3.  Central personalisation file with `EDIT HERE` comments.
4.  Organised assets directory with placeholders where final media is
    unavailable.
5.  Functional progression, achievements, chests, coupons, music
    controls and cake finale.
6.  Responsive desktop and mobile layouts.
7.  README with personalisation, local development, testing and
    deployment instructions.
8.  GitHub Actions deployment workflow.
9.  Successful production build.
10. A short handover summary listing any remaining placeholder content
    or assets the girlfriend must supply.

------------------------------------------------------------------------

## 15. Final definition of done

The project is complete when Sarthak can open the GitHub Pages link on a
phone or desktop, start the birthday adventure, progress through all
main scenes, complete the racing challenge, discover the shared
Minecraft memories, open coupons, explore optional Easter eggs, read the
letter, extinguish the cake candles and see the final fireworks message.

The website must be personalisable by editing the central content file
and replacing assets, without needing to rewrite React components.

**The intended emotional balance is simple:** - Ferrari/F1 makes the
experience immediately recognisable to him. - Minecraft makes it
personal to their shared history. - Gaming references make it funny and
interactive. - The photos and letter make it meaningful. - The cake and
fireworks make the birthday feel like a proper finale.

**Final creative line:** "You might race for the podium, but you've
already secured P1 in my heart."
