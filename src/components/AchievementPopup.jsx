import React from 'react';
import { Trophy, Award, Flag, Box, Sparkles, Gamepad, Heart, X } from 'lucide-react';
import { useGame } from '../context/GameContext';

const iconMap = {
  trophy: Trophy,
  award: Award,
  flag: Flag,
  box: Box,
  sparkles: Sparkles,
  gamepad: Gamepad,
  heart: Heart,
};

export default function AchievementPopup() {
  const { activeToast, closeToast } = useGame();

  if (!activeToast) return null;

  const IconComponent = iconMap[activeToast.icon] || Trophy;

  return (
    <div 
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 z-50 max-w-sm w-full mx-2 sm:mx-0 animate-bounce-pixel"
    >
      <div className="pixel-box-gold p-4 relative shadow-pixel-lg">
        <button
          onClick={closeToast}
          aria-label="Close achievement popup"
          className="absolute top-2 right-2 text-obsidian hover:text-black p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-obsidian text-gold border-2 border-black shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="pr-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-pixel tracking-wider text-obsidian bg-gold-dark px-1.5 py-0.5 font-bold">
                Achievement Unlocked!
              </span>
            </div>
            <h4 className="font-pixel text-xs sm:text-sm text-obsidian mt-1 font-bold">
              {activeToast.title}
            </h4>
            <p className="font-sans text-xs text-obsidian/90 mt-1 font-medium">
              {activeToast.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
