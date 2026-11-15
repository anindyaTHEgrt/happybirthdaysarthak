import React, { useState } from 'react';
import { Home, Sparkles, ChevronRight, X, Heart, ShieldAlert } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import TreasureChest from '../components/TreasureChest';
import PhotoGallery from '../components/PhotoGallery';
import { audioEngine } from '../utils/audioSystem';

export default function MinecraftWorld() {
  const { state, dispatch, unlockAchievement, nextScene } = useGame();
  const [selectedSign, setSelectedSign] = useState(null);
  const [hiddenChestOpenedModal, setHiddenChestOpenedModal] = useState(false);

  const isMainChestOpened = state.openedChests.includes('main-minecraft');
  const isHiddenChestOpened = state.openedChests.includes('hidden-minecraft');

  const handleOpenMainChest = () => {
    dispatch({ type: 'OPEN_CHEST', payload: 'main-minecraft' });
    unlockAchievement('master-builder');
  };

  const handleOpenHiddenChest = () => {
    dispatch({ type: 'OPEN_CHEST', payload: 'hidden-minecraft' });
    unlockAchievement('treasure-collector');
    setHiddenChestOpenedModal(true);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#15231B] overflow-x-hidden select-none px-4 pt-16 pb-8">
      {/* Sunset Minecraft Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E1C38] via-[#853E43] to-[#D38B5D] -z-10" />

      {/* Pixel Sun Setting */}
      <div className="absolute top-20 right-16 w-20 h-20 bg-[#FFA07A] border-4 border-black/30 shadow-pixel-sm -z-5" />

      {/* Header Info */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-grass-dark text-white border-2 border-black font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2">
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>STAGE 2: {birthdayContent.minecraftWorldTitle}</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold">
          Our Shared World
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">
          {birthdayContent.minecraftPrompt}
        </p>
      </div>

      {/* Minecraft Cottage Landscape & Interactive Props */}
      <div className="relative w-full max-w-4xl my-3 flex flex-col items-center z-10">
        {/* Landscape Composition Area */}
        <div className="relative w-full h-64 sm:h-72 border-4 border-black bg-[#254A35]/60 overflow-hidden shadow-pixel-lg">
          {/* Ground Grass Blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#38733E] border-t-4 border-[#4D9B56]">
            <div className="w-full h-8 bg-[#8D5524] mt-8 border-t-2 border-[#583416]" />
          </div>

          {/* Minecraft Block Cottage (Left side) */}
          <div className="absolute bottom-16 left-6 sm:left-12 flex flex-col items-center">
            {/* Wooden Roof with Lantern */}
            <div className="w-36 sm:w-44 h-16 bg-[#5A3825] border-4 border-black relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-3 bg-black" />
              {/* Hanging Lantern */}
              <div className="absolute bottom-1 left-2 w-4 h-6 bg-gold border border-black anim-float" />
            </div>
            {/* Cobblestone Wall & Warm Window */}
            <div className="w-32 sm:w-40 h-24 bg-[#444154] border-4 border-t-0 border-black flex items-center justify-around px-2">
              <div className="w-8 h-10 bg-[#FFD166] border-2 border-black shadow-[0_0_12px_#FFD166]" /> {/* Glowing Window */}
              <div className="w-10 h-16 bg-[#633A19] border-2 border-black self-end" /> {/* Wooden Door */}
            </div>
          </div>

          {/* Hidden Chest (Tucked behind tree on the far right) */}
          <div className="absolute bottom-16 right-4 sm:right-8 z-20 flex flex-col items-center">
            {/* Tree hiding it */}
            <div className="w-14 h-16 bg-[#2E6B37] border-2 border-black absolute -top-10 -left-2 pointer-events-none opacity-85" />
            <TreasureChest
              id="hidden-minecraft"
              title="Secret Hidden Chest"
              isOpened={isHiddenChestOpened}
              onOpen={handleOpenHiddenChest}
              glow={!isHiddenChestOpened}
              size="small"
            />
          </div>

          {/* Main Photo Chest (Center Stage) */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <TreasureChest
              id="main-minecraft"
              title="Main Photo Memory Chest"
              isOpened={isMainChestOpened}
              onOpen={handleOpenMainChest}
              glow={!isMainChestOpened}
              size="normal"
            />
          </div>

          {/* Garden Memory Signs */}
          <div className="absolute bottom-16 right-24 sm:right-36 hidden sm:flex items-end gap-3 z-10">
            {birthdayContent.memorySigns.slice(0, 3).map((sign, idx) => (
              <button
                key={sign.id}
                onClick={() => {
                  audioEngine.playSfx('click');
                  setSelectedSign(sign);
                }}
                className="flex flex-col items-center group cursor-pointer"
                aria-label={`Inspect garden sign: ${sign.title}`}
              >
                <div className="pixel-box-sandstone px-2 py-1 border border-black group-hover:scale-105 transition-transform text-[8px] font-pixel text-obsidian">
                  SIGN #{idx + 1}
                </div>
                <div className="w-2 h-6 bg-[#633A19] border-x border-black" />
              </button>
            ))}
          </div>
        </div>

        {/* Garden Sign Detail Modal */}
        {selectedSign && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="pixel-box-sandstone p-5 max-w-sm w-full text-obsidian shadow-pixel-lg animate-bounce-pixel relative">
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-2 right-2 p-1 bg-obsidian text-white border border-black"
                aria-label="Close sign"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="font-pixel text-xs text-ferrari font-bold uppercase mb-2">
                📜 {selectedSign.title}
              </div>
              <p className="font-sans text-sm font-semibold leading-relaxed">
                "{selectedSign.message}"
              </p>
            </div>
          </div>
        )}

        {/* Hidden Chest Secret Modal */}
        {hiddenChestOpenedModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="pixel-box-gold p-6 max-w-md w-full text-obsidian shadow-pixel-lg animate-bounce-pixel relative">
              <button
                onClick={() => setHiddenChestOpenedModal(false)}
                className="absolute top-3 right-3 p-1 bg-obsidian text-gold border-2 border-black"
                aria-label="Close secret note"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-ferrari" />
                <h3 className="font-pixel text-sm sm:text-base text-obsidian font-bold">
                  {birthdayContent.hiddenChest.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-obsidian font-medium leading-relaxed bg-white/40 p-3 border border-black/20">
                {birthdayContent.hiddenChest.message}
              </p>
              <p className="font-sans text-xs text-ferrari-dark font-bold mt-3 italic">
                {birthdayContent.hiddenChest.secretNote}
              </p>
            </div>
          </div>
        )}

        {/* Memory Photo Gallery (Revealed when main chest opened or clicked) */}
        {isMainChestOpened ? (
          <div className="w-full mt-4 animate-fadeIn">
            <PhotoGallery photos={birthdayContent.memories} />
          </div>
        ) : (
          <div className="w-full text-center py-4">
            <button
              onClick={handleOpenMainChest}
              className="pixel-btn pixel-btn-gold animate-bounce"
            >
              ✨ OPEN MEMORY CHEST
            </button>
          </div>
        )}
      </div>

      {/* Scene Navigation to Reward Shop */}
      <div className="z-10 w-full max-w-md flex justify-center mt-2">
        {isMainChestOpened && (
          <button
            onClick={nextScene}
            className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg"
          >
            <span>VISIT REWARD SHOP</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
