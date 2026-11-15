/*
================================================================================
SCENE CONFIGURATION
================================================================================
Defines sequential scene order, metadata, and progression paths.
*/

export const SCENES = [
  {
    id: "loading",
    index: 0,
    title: "Game Boot",
    shortTitle: "Title Screen",
    isOptional: false,
    nextScene: "welcome",
    prevScene: null,
  },
  {
    id: "welcome",
    index: 1,
    title: "Welcome World",
    shortTitle: "Level 25",
    isOptional: false,
    nextScene: "grand-prix",
    prevScene: "loading",
  },
  {
    id: "grand-prix",
    index: 2,
    title: "Ferrari Grand Prix",
    shortTitle: "P1 Circuit",
    isOptional: false,
    nextScene: "minecraft",
    prevScene: "welcome",
  },
  {
    id: "minecraft",
    index: 3,
    title: "Our Minecraft World",
    shortTitle: "Memory Realm",
    isOptional: false,
    nextScene: "shop",
    prevScene: "grand-prix",
  },
  {
    id: "shop",
    index: 4,
    title: "Reward Shop",
    shortTitle: "Birthday Bazaar",
    isOptional: false,
    nextScene: "hug-meter",
    prevScene: "minecraft",
  },
  {
    id: "hug-meter",
    index: 5,
    title: "Hug & Kiss Meter",
    shortTitle: "Love Meter",
    isOptional: false,
    nextScene: "letter",
    prevScene: "shop",
  },
  {
    id: "letter",
    index: 6,
    title: "Birthday Letter",
    shortTitle: "Special Letter",
    isOptional: false,
    nextScene: "cake",
    prevScene: "hug-meter",
  },
  {
    id: "cake",
    index: 7,
    title: "Birthday Cake Finale",
    shortTitle: "Grand Finale",
    isOptional: false,
    nextScene: null,
    prevScene: "letter",
  }
];

export const getSceneByIndex = (index) => SCENES.find(s => s.index === index);
export const getSceneById = (id) => SCENES.find(s => s.id === id);
