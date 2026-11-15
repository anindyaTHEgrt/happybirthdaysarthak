/*
================================================================================
ACHIEVEMENTS DEFINITIONS
================================================================================
Central definition of all 7 unlockable achievements.
*/

export const ACHIEVEMENTS = [
  {
    id: "welcome",
    title: "Welcome to Level 25",
    description: "Started Sarthak's Birthday Grand Prix adventure!",
    icon: "flag",
    category: "General",
    color: "#E9C55B"
  },
  {
    id: "pole-position",
    title: "Pole Position in Her Heart",
    description: "Collected all three Grand Prix racing items and secured P1 on the podium!",
    icon: "trophy",
    category: "Racing",
    color: "#C91D28"
  },
  {
    id: "master-builder",
    title: "Master Builder",
    description: "Unlocked the shared Minecraft memory chest and viewed the photo journey.",
    icon: "box",
    category: "Minecraft",
    color: "#4D9B56"
  },
  {
    id: "treasure-collector",
    title: "Treasure Collector",
    description: "Found and opened the hidden secret treasure chest!",
    icon: "sparkles",
    category: "Exploration",
    color: "#E9C55B"
  },
  {
    id: "pop-culture",
    title: "Pop Culture & Gaming Pro",
    description: "Explored the secret pop culture references and gaming lounge.",
    icon: "gamepad",
    category: "Arcade",
    color: "#6AB873"
  },
  {
    id: "heart-world",
    title: "Heart of the World",
    description: "Unsealed and read the personal birthday letter.",
    icon: "heart",
    category: "Story",
    color: "#E63946"
  },
  {
    id: "birthday-champion",
    title: "Birthday Champion",
    description: "Extinguished all birthday candles and unlocked the grand finale fireworks!",
    icon: "award",
    category: "Finale",
    color: "#E9C55B"
  }
];

export const getAchievementById = (id) => ACHIEVEMENTS.find(a => a.id === id);
