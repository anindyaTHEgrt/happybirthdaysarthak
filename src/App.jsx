import React from 'react';
import { useGame } from './context/GameContext';
import GameHUD from './components/GameHUD';
import AchievementPopup from './components/AchievementPopup';
import AchievementCollection from './components/AchievementCollection';
import CouponInventory from './components/CouponInventory';

// Scenes
import LoadingScreen from './scenes/LoadingScreen';
import WelcomeWorld from './scenes/WelcomeWorld';
import FerrariGrandPrix from './scenes/FerrariGrandPrix';
import MinecraftWorld from './scenes/MinecraftWorld';
import RewardShop from './scenes/RewardShop';
import EasterEggArcade from './scenes/EasterEggArcade';
import BirthdayLetter from './scenes/BirthdayLetter';
import BirthdayFinale from './scenes/BirthdayFinale';

export default function App() {
  const { state } = useGame();

  const renderScene = () => {
    switch (state.currentScene) {
      case 'loading':
        return <LoadingScreen />;
      case 'welcome':
        return <WelcomeWorld />;
      case 'grand-prix':
        return <FerrariGrandPrix />;
      case 'minecraft':
        return <MinecraftWorld />;
      case 'shop':
        return <RewardShop />;
      case 'arcade':
        return <EasterEggArcade />;
      case 'letter':
        return <BirthdayLetter />;
      case 'cake':
        return <BirthdayFinale />;
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-obsidian text-pixelWhite font-sans relative selection:bg-ferrari selection:text-white">
      {/* Global Fixed Game HUD */}
      <GameHUD />

      {/* Main Active Scene */}
      <main className="w-full min-h-screen">
        {renderScene()}
      </main>

      {/* Global Achievement Toast Notification */}
      <AchievementPopup />

      {/* Global Modal Overlays */}
      <AchievementCollection />
      <CouponInventory />
    </div>
  );
}
