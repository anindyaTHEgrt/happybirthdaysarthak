/*
================================================================================
SARTHAK'S BIRTHDAY GRAND PRIX — CENTRAL PERSONALISATION FILE
================================================================================

HOW TO EDIT:
Search this file for: EDIT HERE
Modify the text inside the quotation marks or arrays to personalise the site!
Everything updated here automatically reflects across the entire website.
Do not modify the component code or functional logic.
================================================================================
*/

export const birthdayContent = {
  // ==================================================
  // EDIT HERE: BIRTHDAY PERSON DETAILS
  // ==================================================
  birthdayPerson: "Sarthak Shetty",
  birthdayDate: "17 November 2026",
  age: 25,
  showAgeProminently: false,

  // ==================================================
  // EDIT HERE: GIRLFRIEND / SENDER NAME & SIGNATURE
  // ==================================================
  senderName: "Koibito❤️", // EDIT HERE: Replace with your name or nickname

  // ==================================================
  // EDIT HERE: SCREEN 0 — TITLE / GAME BOOT SCREEN
  // ==================================================
  siteTitle: "Sarthak's Birthday Grand Prix",
  siteSubtitle: "A world made just for you",
  playerNickname: "Sarthak",
  versionLabel: "LEVEL 25 SPECIAL EDITION",
  bootPrompt: "PRESS START TO INITIATE GRAND PRIX",

  // ==================================================
  // EDIT HERE: SCREEN 1 — WELCOME WORLD
  // ==================================================
  welcomeHeading: "Welcome, Sarthak!",
  welcomeDialogue: [
    "You have unlocked a brand-new adventure: Level 25!",
    "Your mission is simple: enjoy your special day, collect racing treasures, and explore this world together.",
    " This whole universe is made for you to Explore and Engage. Ready to race?"
  ],
  welcomeSignText: "Quest Log: Head to the Ferrari Grand Prix Circuit to claim your first trophy!",

  // ==================================================
  // EDIT HERE: SCREEN 2 — FERRARI GRAND PRIX & PODIUM
  // ==================================================
  racingTrackTitle: "Autodromo di Sarthak",
  racingInstructions: "Collect all 3 racing gear items on the track to unlock the P1 podium!",
  podiumHeading: "P1 in my heart. Always.",
  podiumMessage: "Some people chase world championships. You've already won the most important one in my universe.",
  commentatorMessage: "RADIO CHECK: 'Sarthak, you are P1! Fantastic drive, champion! The trophy is yours!'",

  // ==================================================
  // EDIT HERE: SCREEN 3 — OUR MINECRAFT WORLD & MEMORIES
  // ==================================================
  minecraftWorldTitle: "Our Cozy Realm",
  minecraftPrompt: "Click the main treasure chest to reveal our photo memories, or read the garden signs!",

  // EDIT HERE: Photos of the two of you!
  // To add your real photos, put them in public/assets/photos/
  // and update the image paths below.
  memories: [
    {
      id: "memory-01",
      image: "assets/photos/memory-01.jpeg",
      title: "OUR 1ST TRIP TOGETHER",
      caption: "Still laughing my ass off with you just have added onto the list of inside jokes and honed our bad grammer spotting skills palmero=palermo to our scrabble skills.",
    },
    {
      id: "memory-02",
      image: "assets/photos/memory-02.jpeg",
      title: "Esplanade runs",
      caption: "From nizam’s kebabs, random street shopping of Amul macho(just to embarrass you *heheh*). To being introduced by you to Nahoum’s bakery ( cant get over walnut marshmellows and cashew rings. These trips have been one of the best memories of college +falooda on top",
    },
    {
      id: "memory-05",
      image: "assets/photos/memory-05.jpeg",
      title: "Saraswati pujo x matching fits",
      caption: "From learning to carry saree in Bengal to matching with you on each pujo and visiting all hostels while having heel breakdowns has always been such a core memory. Not to mention random photo shoots in your hostel room (only time of the year when I am allowed)",
    },
    {
      id: "memory-04",
      image: "assets/photos/memory-04.jpeg",
      title: "From CRs to Rebecca publications heads",
      caption: "We have shared the same college responsibilities, same same much now? Ironically, we don’t have many overlaps in our music, hobbies or watchlist choices but we always find way back to each other in many ways whether it being 2 player games or design choices (really important as perfectionists who get a stroke over alignment issues)",
    },
    {
      id: "memory-03",
      image: "assets/photos/memory-03.jpeg",
      title: "LDR – destination 1",
      caption: "All my trips to Bhopal on paper have been for “research purposes” but along the lines even I started liking the city of lakes as much as I loved meeting you there .Discovered the Best Nescafe spot by the lake (10/10 date spot) + café amado with its food and how can I forget the wildass auto rides.",
    },
    {
      id: "memory-06",
      image: "assets/photos/memory-06.jpeg",
      title: "LDR – destination 2",
      caption: "Bangalore, I hope will be our last long distance destination cause I am at my wits end. In these 2 ½ yrs of long distance we have managed to stick to our commitment of meeting at least once in 3 months (+ became sushi ravagers) & I hope this fuckass MBA can stop interrupting my schedule with you.I sometimes think back when we used to sit ours on each others archi projects …it was tense but fun at the same time.",
    }
  ],

  // EDIT HERE: Memory signs inside the Minecraft garden
  memorySigns: [
    {
      id: "sign-01",
      title: "Cottage Rules",
      message: "Rule #1: Never dig straight down. Rule #2: Sarthak always gets the best enchanted sword!"
    },
    {
      id: "sign-02",
      title: "The Garden Plot",
      message: "Planted with love, carrots, and sweet berries. Guarded from creepers 24/7."
    },
    {
      id: "sign-03",
      title: "Inside Joke Waypoint",
      message: "'Remember when we got completely lost in the nether and you blamed the coordinate compass?'"
    },
    {
      id: "sign-04",
      title: "Cozy Hearth",
      message: "The warmest fire in the server. Always home when you're here."
    }
  ],

  // EDIT HERE: Hidden Chest Surprise
  hiddenChest: {
    title: "Secret Netherite Cache!",
    message: "You found the hidden chest! Bonus achievement unlocked. You have the sharpest eyes, champion!",
    secretNote: "P.S. I love you more than words, blocks, or trophies can say."
  },

  // ==================================================
  // EDIT HERE: SCREEN 4 — BIRTHDAY REWARD SHOP / COUPONS
  // ==================================================
  rewardShopTitle: "The Birthday Bazaar",
  rewardShopSubtitle: "Trade your birthday tokens for exclusive real-life coupons!",
  coupons: [
    {
      id: "date-night",
      title: "VIP Date Night Pass",
      description: "One all-expenses planned romantic date night of your choosing. You just show up and be handsome!",
      redemptionInstructions: "Redeem whenever you want a special dinner, movie night, or adventure.",
      icon: "heart",
      tag: "Romantic"
    },
    {
      id: "master-baker",
      title: "Master Baker Pass",
      description: "One weekend baking session where we make your absolute favourite dessert from scratch together.",
      redemptionInstructions: "Give 24-hour notice so we can gather the best butter and chocolate!",
      icon: "cake",
      tag: "Delicious"
    },
    {
      id: "gaming-pass",
      title: "Uninterrupted Gaming Pass",
      description: "A full evening of zero-distraction gaming (Valorant, Fortnite, or whatever you want), with snacks delivered.",
      redemptionInstructions: "Present this ticket to activate gaming mode without any interruptions.",
      icon: "gamepad",
      tag: "Fun"
    },
    {
      id: "dessert-pass",
      title: "Sweet Craving Pass",
      description: "Valid for one gourmet dessert, ice cream run, or bakery treat on demand, no questions asked.",
      redemptionInstructions: "Valid anytime your sweet tooth kicks in.",
      icon: "coffee",
      tag: "Food"
    },
    {
      id: "unlimited-hugs",
      title: "Infinite Hugs Pass",
      description: "Never expires! Guaranteed warm bear hugs anytime, anywhere, for as long as you want.",
      redemptionInstructions: "Simply open your arms to redeem.",
      icon: "sparkles",
      tag: "Love"
    },
    {
      id: "wildcard-pass",
      title: "The Golden Wildcard",
      description: "One custom birthday wish of your choice! (Subject to sweet girlfriend approval 😉).",
      redemptionInstructions: "State your wish clearly and hand over this golden ticket.",
      icon: "award",
      tag: "Special"
    }
  ],

  // ==================================================
  // EDIT HERE: SCREEN 5 — EASTER EGG ARCADE (OPTIONAL)
  // ==================================================
  arcadeTitle: "Pop Culture & Gaming Lounge",
  arcadeSubtitle: "Inspect Sarthak's favourite obsessions! (Discover them all for a bonus achievement)",
  easterEggs: {
    office: {
      id: "egg-office",
      propName: "World's Best Boyfriend Mug",
      title: "Dunder Mifflin Memo",
      message: "Identity theft is not a joke, Jim! But having the World's Best Boyfriend is 100% certified fact. Dundie Award Winner for: Hottest & Sweetest Guy!",
      tag: "The Office"
    },
    breakingBad: {
      id: "egg-breaking-bad",
      propName: "Chemistry Brewing Flask",
      title: "The Birthday Formula",
      message: "Jesse, we need to bake! Compound formula: 99.1% pure love, 0.9% racing fuel. You are the danger...ously handsome one.",
      tag: "Breaking Bad"
    },
    manifest: {
      id: "egg-manifest",
      propName: "Flight 828 Boarding Pass",
      title: "Flight 828 to Level 25",
      message: "Calling all passengers: Your flight from age 24 has landed smoothly at Gate 25. Destination: The best year of your life yet!",
      tag: "Manifest"
    },
    valorant: {
      id: "egg-valorant",
      propName: "Tactical Gaming Terminal",
      title: "Radiant Player Card: SARTHAK",
      message: "Rank: RADIANT #1. Ultimate Ability: Stealing hearts with one smile. Headshot percentage: 100% on making me laugh every single day.",
      tag: "Valorant"
    },
    fortnite: {
      id: "egg-fortnite",
      propName: "Battle Royale Supply Drop",
      title: "#1 Victory Royale!",
      message: "Eliminated the competition. Survived the storm. Secured the Crowned Victory Royale for Birthday Boy Sarthak!",
      tag: "Fortnite"
    }
  },

  // ==================================================
  // EDIT HERE: SCREEN 6 — BIRTHDAY LETTER
  // ==================================================
  letter: {
    heading: "A Letter For My Favourite Person",
    prompt: "You've collected trophies, unlocked rewards and discovered memories. But there's one final thing waiting for you.",
    salutation: "Dear Oppressed Obsessed Sarthak,",
    paragraphs: [
      "Its that timeeee of the year again where I try to condense my love for you into a tiny letter. So this is gonna be my 5th letter to you since we started dating .",
      "You were 20 when we started dating and very much unemployed and master-less( sorry for the bad pun) .Now seeing you bag your 1st job has been truly a wonderful journey. I hope I am there in future to be part of all your wins just like these. ",
      "You are my true soulmate in every sense I can think of. Just spending time with you brings be so much joy. I hope we keep learning and unravelling new things about each other in all the years to come and never stop dating like two silly fools walking on this earth by coincidence. My love for you has seen seasons and has only grown fonder .The warmth and safety you bring always makes me soft inside.",
      "My guardian angel and twin flame happy 25th and I wish you all the luck and abundance this world has to offer. May you achieve all you wish for and more. Hope soon we can be together in person and complete “our dates saved folder on insta”  and cuddle like hibernating bears."
    ],
    signOff: "Yours Lovingly,",
    signature: "Koibito" // EDIT HERE: Your signature/name
  },

  // ==================================================
  // EDIT HERE: SCREEN 7 — BIRTHDAY CAKE & FINALE
  // ==================================================
  cakePrompt: "Make a wish and tap the candles to blow them out!",
  candlesCount: 5,
  finalHeading: "HAPPY 25TH BIRTHDAY, SARTHAK!",
  finalMessage: "Here's to more adventures, more memories, more Minecraft worlds and many more birthdays together.",
  finalSignOff: "P1 IN MY HEART. ALWAYS. 🏎️🏁🎂"
};
