import React, { useState } from 'react';
import { Mail, ChevronRight, Heart, Sparkles, RotateCcw, FastForward } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function BirthdayLetter() {
  const { unlockAchievement, nextScene } = useGame();
  const [isOpened, setIsOpened] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);

  const { letter } = birthdayContent;

  const handleOpenEnvelope = () => {
    audioEngine.playSfx('claim');
    setIsOpened(true);
    unlockAchievement('heart-world');
    setRevealedParagraphs(letter.paragraphs.length); // Reveal text
  };

  const handleReplay = () => {
    setIsOpened(false);
    setRevealedParagraphs(0);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#18151D] overflow-x-hidden select-none px-4 pt-16 pb-8">
      {/* Night Sky & Quiet Room Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0914] via-[#161224] to-[#1E1724] -z-10" />

      {/* Cozy Window with Starry Night */}
      <div className="absolute top-20 left-12 w-28 h-36 bg-[#080711] border-4 border-[#3D281D] hidden sm:flex flex-col justify-between p-2 opacity-60 -z-5">
        <div className="flex justify-between">
          <div className="w-1 h-1 bg-white animate-pulse" />
          <div className="w-1.5 h-1.5 bg-[#FFF275] rounded-full" />
        </div>
        <div className="w-1 h-1 bg-white self-center animate-pulse" />
      </div>

      {/* Header Info */}
      <div className="text-center z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-ferrari-dark text-white border-2 border-black font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2">
          <Heart className="w-3.5 h-3.5 text-gold" />
          <span>STAGE 5: SPECIAL MESSAGE</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold">
          {letter.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">
          {letter.prompt}
        </p>
      </div>

      {/* Center Stage: Envelope or Unfolded Letter */}
      <div className="w-full max-w-2xl my-4 flex flex-col items-center z-10">
        {!isOpened ? (
          /* Sealed Envelope on Desk */
          <div className="flex flex-col items-center py-8">
            <button
              onClick={handleOpenEnvelope}
              className="group focus:outline-none focus:ring-4 focus:ring-gold flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
              aria-label="Open sealed birthday letter"
            >
              {/* Pixel Envelope Body */}
              <div className="w-64 sm:w-80 h-44 bg-[#E9D9B5] border-4 border-black relative shadow-pixel-lg flex flex-col justify-between p-4">
                {/* Envelope Flap Triangle */}
                <div className="absolute -top-1 left-0 right-0 h-20 bg-[#D4BF94] border-b-4 border-black [clip-path:polygon(0_0,100%_0,50%_100%)] group-hover:brightness-105" />

                {/* Wax Seal Stamp (Ferrari Red with Heart) */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 bg-ferrari border-2 border-black rounded-full flex items-center justify-center shadow-pixel-sm z-10 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>

                <div className="mt-auto flex justify-between items-end text-obsidian/70 font-pixel text-[9px]">
                  <span>FOR: SARTHAK</span>
                  <span>FROM: GIRLFRIEND</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="pixel-btn pixel-btn-red !text-xs !py-2 !px-6 animate-pulse">
                  💌 TAP ENVELOPE TO UNSEAL
                </span>
              </div>
            </button>
          </div>
        ) : (
          /* Unfolded Letter on Warm Sandstone Parchment */
          <div className="w-full pixel-box-sandstone p-6 sm:p-8 text-obsidian shadow-pixel-lg animate-fadeIn border-4 border-black relative max-h-[65vh] overflow-y-auto">
            {/* Replay Button in corner */}
            <button
              onClick={handleReplay}
              className="absolute top-4 right-4 p-1.5 bg-obsidian text-sandstone border border-black hover:bg-black font-pixel text-[9px] flex items-center gap-1"
              title="Fold letter back into envelope"
            >
              <RotateCcw className="w-3 h-3" /> FOLD
            </button>

            {/* Salutation */}
            <div className="font-serif text-lg sm:text-xl font-bold text-ferrari border-b border-obsidian/20 pb-2 mb-4">
              {letter.salutation}
            </div>

            {/* Body Paragraphs (Clean, elegant, non-pixel font for high readability) */}
            <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-[#2B1E16] font-medium">
              {letter.paragraphs.map((paragraph, index) => (
                <p key={index} className="transition-opacity duration-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Sign-off & Signature */}
            <div className="mt-8 pt-4 border-t border-obsidian/20 text-right">
              <div className="font-sans italic text-sm text-obsidian/80">
                {letter.signOff}
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold text-ferrari-dark mt-1">
                {letter.signature}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation to Cake Finale */}
      <div className="z-10 w-full max-w-md flex justify-center mt-2">
        {isOpened && (
          <button
            onClick={nextScene}
            className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg"
          >
            <span>GO TO BIRTHDAY CAKE FINALE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
