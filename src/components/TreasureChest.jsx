import React from 'react';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function TreasureChest({ 
  id, 
  title = "Treasure Chest", 
  isOpened, 
  onOpen, 
  glow = false,
  size = "normal", // 'small' | 'normal' | 'large'
  className = "" 
}) {
  const { dispatch } = useGame();

  const handleOpen = () => {
    if (!isOpened) {
      audioEngine.playSfx('chest');
      dispatch({ type: 'OPEN_CHEST', payload: id });
      if (onOpen) onOpen();
    }
  };

  const sizeClasses = {
    small: "w-12 h-12",
    normal: "w-20 h-20 sm:w-24 sm:h-24",
    large: "w-28 h-28 sm:w-36 sm:h-36"
  }[size] || "w-20 h-20";

  return (
    <button
      onClick={handleOpen}
      aria-label={`${title} (${isOpened ? 'Opened' : 'Click to open'})`}
      className={`relative inline-block group focus:outline-none focus:ring-4 focus:ring-gold ${className}`}
    >
      {/* Glow Effect */}
      {glow && !isOpened && (
        <div className="absolute -inset-2 bg-gold/30 rounded-full blur-md anim-chest-glow -z-10" />
      )}

      {/* Chest Sprite */}
      <img
        src={isOpened ? "assets/sprites/minecraft-chest-open.svg" : "assets/sprites/minecraft-chest-closed.svg"}
        alt={title}
        className={`${sizeClasses} pixelated transition-transform duration-150 group-hover:scale-105 group-active:scale-95`}
      />

      {/* Badge label */}
      <div className="mt-1 text-center">
        <span className={`inline-block font-pixel text-[9px] px-1.5 py-0.5 border ${
          isOpened 
            ? 'bg-obsidian/80 text-mutedGrey border-obsidian' 
            : 'bg-gold text-obsidian border-black font-bold group-hover:bg-gold-light'
        }`}>
          {isOpened ? 'OPENED' : 'TAP TO OPEN'}
        </span>
      </div>
    </button>
  );
}
