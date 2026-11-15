import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { ACHIEVEMENTS, getAchievementById } from '../data/achievements';
import { SCENES, getSceneById } from '../data/sceneConfig';
import { audioEngine } from '../utils/audioSystem';

const STORAGE_KEY = 'sarthakBirthdayProgress_v1';

const defaultState = {
  currentScene: 'loading',
  completedScenes: [],
  collectedRaceItems: [], // 'helmet', 'flag', 'trophy'
  openedChests: [], // 'main-minecraft', 'hidden-minecraft'
  unlockedAchievements: [],
  viewedCoupons: [],
  claimedCoupons: [],
  extinguishedCandles: [],
  musicEnabled: false,
  soundEnabled: true,
  finaleTriggered: false,
  hasBooted: false,
};

function loadStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultState;

    return {
      ...defaultState,
      currentScene: parsed.currentScene && getSceneById(parsed.currentScene) ? parsed.currentScene : defaultState.currentScene,
      completedScenes: Array.isArray(parsed.completedScenes) ? parsed.completedScenes : [],
      collectedRaceItems: Array.isArray(parsed.collectedRaceItems) ? parsed.collectedRaceItems : [],
      openedChests: Array.isArray(parsed.openedChests) ? parsed.openedChests : [],
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [],
      viewedCoupons: Array.isArray(parsed.viewedCoupons) ? parsed.viewedCoupons : [],
      claimedCoupons: Array.isArray(parsed.claimedCoupons) ? parsed.claimedCoupons : [],
      extinguishedCandles: Array.isArray(parsed.extinguishedCandles) ? parsed.extinguishedCandles : [],
      musicEnabled: typeof parsed.musicEnabled === 'boolean' ? parsed.musicEnabled : false,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      finaleTriggered: typeof parsed.finaleTriggered === 'boolean' ? parsed.finaleTriggered : false,
      hasBooted: typeof parsed.hasBooted === 'boolean' ? parsed.hasBooted : false,
    };
  } catch (err) {
    console.warn('Failed to parse stored birthday progress, resetting to default:', err);
    return defaultState;
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        currentScene: 'welcome',
        hasBooted: true,
        completedScenes: state.completedScenes.includes('loading') 
          ? state.completedScenes 
          : [...state.completedScenes, 'loading']
      };

    case 'GO_TO_SCENE':
      if (!getSceneById(action.payload)) return state;
      return {
        ...state,
        currentScene: action.payload
      };

    case 'COMPLETE_SCENE':
      return {
        ...state,
        completedScenes: state.completedScenes.includes(action.payload)
          ? state.completedScenes
          : [...state.completedScenes, action.payload]
      };

    case 'COLLECT_RACE_ITEM':
      if (state.collectedRaceItems.includes(action.payload)) return state;
      return {
        ...state,
        collectedRaceItems: [...state.collectedRaceItems, action.payload]
      };

    case 'OPEN_CHEST':
      if (state.openedChests.includes(action.payload)) return state;
      return {
        ...state,
        openedChests: [...state.openedChests, action.payload]
      };

    case 'UNLOCK_ACHIEVEMENT':
      if (state.unlockedAchievements.includes(action.payload)) return state;
      return {
        ...state,
        unlockedAchievements: [...state.unlockedAchievements, action.payload]
      };

    case 'VIEW_COUPON':
      if (state.viewedCoupons.includes(action.payload)) return state;
      return {
        ...state,
        viewedCoupons: [...state.viewedCoupons, action.payload]
      };

    case 'CLAIM_COUPON':
      if (state.claimedCoupons.includes(action.payload)) return state;
      return {
        ...state,
        claimedCoupons: [...state.claimedCoupons, action.payload]
      };

    case 'EXTINGUISH_CANDLE':
      if (state.extinguishedCandles.includes(action.payload)) return state;
      return {
        ...state,
        extinguishedCandles: [...state.extinguishedCandles, action.payload]
      };

    case 'EXTINGUISH_ALL_CANDLES':
      return {
        ...state,
        extinguishedCandles: action.payload // array of candle ids
      };

    case 'TRIGGER_FINALE':
      return {
        ...state,
        finaleTriggered: true
      };

    case 'TOGGLE_MUSIC': {
      const nextMusic = typeof action.payload === 'boolean' ? action.payload : !state.musicEnabled;
      return {
        ...state,
        musicEnabled: nextMusic
      };
    }

    case 'TOGGLE_SOUND': {
      const nextSound = typeof action.payload === 'boolean' ? action.payload : !state.soundEnabled;
      return {
        ...state,
        soundEnabled: nextSound
      };
    }

    case 'RESET_PROGRESS':
      return {
        ...defaultState,
        // Retain sound & music preference if desired, but resets game progress
        musicEnabled: state.musicEnabled,
        soundEnabled: state.soundEnabled,
      };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadStoredState);
  const [activeToast, setActiveToast] = useState(null);
  const [toastQueue, setToastQueue] = useState([]);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save birthday progress to localStorage:', err);
    }
  }, [state]);

  // Sync audio settings
  useEffect(() => {
    audioEngine.setSoundEnabled(state.soundEnabled);
    audioEngine.setMusicEnabled(state.musicEnabled);
  }, [state.soundEnabled, state.musicEnabled]);

  // Unlock achievement helper
  const unlockAchievement = useCallback((achievementId) => {
    if (state.unlockedAchievements.includes(achievementId)) return;
    const ach = getAchievementById(achievementId);
    if (!ach) return;

    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId });
    audioEngine.playSfx('achievement');
    setToastQueue(prev => [...prev, ach]);
  }, [state.unlockedAchievements]);

  // Manage toast queue
  useEffect(() => {
    if (!activeToast && toastQueue.length > 0) {
      const next = toastQueue[0];
      setActiveToast(next);
      setToastQueue(prev => prev.slice(1));

      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 4200);

      return () => clearTimeout(timer);
    }
  }, [activeToast, toastQueue]);

  // Navigation helpers
  const goToScene = useCallback((sceneId) => {
    audioEngine.playSfx('click');
    dispatch({ type: 'GO_TO_SCENE', payload: sceneId });
  }, []);

  const nextScene = useCallback(() => {
    const current = getSceneById(state.currentScene);
    if (current && current.nextScene) {
      dispatch({ type: 'COMPLETE_SCENE', payload: state.currentScene });
      audioEngine.playSfx('click');
      dispatch({ type: 'GO_TO_SCENE', payload: current.nextScene });
    }
  }, [state.currentScene]);

  const prevScene = useCallback(() => {
    const current = getSceneById(state.currentScene);
    if (current && current.prevScene) {
      audioEngine.playSfx('click');
      dispatch({ type: 'GO_TO_SCENE', payload: current.prevScene });
    }
  }, [state.currentScene]);

  const resetGame = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    dispatch({ type: 'RESET_PROGRESS' });
    setIsResetConfirmOpen(false);
  }, []);

  const value = {
    state,
    dispatch,
    activeToast,
    closeToast: () => setActiveToast(null),
    unlockAchievement,
    goToScene,
    nextScene,
    prevScene,
    isAchievementsOpen,
    setIsAchievementsOpen,
    isCouponsOpen,
    setIsCouponsOpen,
    isResetConfirmOpen,
    setIsResetConfirmOpen,
    resetGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
