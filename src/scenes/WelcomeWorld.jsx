import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Compass, MapPin } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import DialogueBox from '../components/DialogueBox';
import { audioEngine } from '../utils/audioSystem';

export default function WelcomeWorld() {
  const { nextScene } = useGame();
  const [signOpened, setSignOpened] = useState(false);

  const handleSignClick = () => {
    audioEngine.playSfx('click');
    setSignOpened(!signOpened);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#1D3528] overflow-hidden select-none px-4 pt-16 pb-8">
      {/* Sky & Clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A8EB7] via-[#75B2D6] to-[#A2D3EA] -z-10" />

      {/* Pixel Sun & Pixel Clouds */}
      <div className="absolute top-12 right-12 w-16 h-16 bg-[#FFF275] border-4 border-black/40 shadow-pixel-sm -z-5" />
      <div className="absolute top-20 left-16 w-32 h-8 bg-white/70 border-b-4 border-white/50 -z-5" />
      <div className="absolute top-28 left-48 w-24 h-6 bg-white/60 -z-5" />
      <div className="absolute top-16 right-44 w-36 h-9 bg-white/65 -z-5" />

      {/* Distant Mountain Range */}
      <div className="absolute bottom-48 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_bottom,#254A35_0%,transparent_70%)] opacity-40 -z-4" />

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        {/* Level Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-obsidian/80 border-2 border-black text-gold font-pixel text-xs shadow-pixel-sm mb-4">
          <Compass className="w-4 h-4 text-ferrari-light" />
          <span>STAGE 1: OVERWORLD SPAWN</span>
        </div>

        {/* Scene Composition: Pixel Garden, Characters, Car & Sign */}
        <div className="relative w-full max-w-2xl h-64 sm:h-72 mt-2 flex items-end justify-center">
          {/* Ground: Minecraft Grass Blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#38733E] border-t-4 border-[#4D9B56]">
            {/* Dirt Layer under grass */}
            <div className="w-full h-8 bg-[#8D5524] mt-12 border-t-2 border-[#583416]" />
          </div>

          {/* Minecraft Tree Left */}
          <div className="absolute bottom-20 left-4 sm:left-12 flex flex-col items-center">
            {/* Leaves */}
            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-[#2E6B37] border-4 border-[#1E4D25] shadow-pixel-sm flex items-center justify-center">
              <div className="w-12 h-12 bg-[#3C8A47]" />
            </div>
            {/* Trunk */}
            <div className="w-8 h-16 bg-[#633A19] border-x-4 border-[#3D230D]" />
          </div>

          {/* Minecraft Tree Right */}
          <div className="absolute bottom-20 right-6 sm:right-16 hidden sm:flex flex-col items-center">
            <div className="w-16 h-16 bg-[#2E6B37] border-4 border-[#1E4D25] shadow-pixel-sm" />
            <div className="w-6 h-14 bg-[#633A19] border-x-4 border-[#3D230D]" />
          </div>

          {/* Interactive Wooden Signboard */}
          <div 
            onClick={handleSignClick}
            className="absolute bottom-20 left-28 sm:left-44 cursor-pointer group flex flex-col items-center z-10"
          >
            <div className="pixel-box-sandstone px-3 py-1.5 border-2 border-black group-hover:scale-105 transition-transform">
              <div className="font-pixel text-[9px] text-obsidian font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-ferrari" />
                <span>SPAWN SIGN</span>
              </div>
            </div>
            <div className="w-3 h-10 bg-[#633A19] border-x-2 border-black" />
          </div>

          {/* Pixel Couple Sprites */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-3 z-10">
            {/* Sarthak Sprite */}
            <div className="flex flex-col items-center group">
              <div className="w-6 h-6 bg-[#D4A373] border-2 border-black relative">
                <div className="w-full h-2 bg-[#2C1B18]" /> {/* Hair */}
                <div className="w-1 h-1 bg-black absolute top-3 left-1" /> {/* Eye L */}
                <div className="w-1 h-1 bg-black absolute top-3 right-1" /> {/* Eye R */}
              </div>
              <div className="w-7 h-8 bg-ferrari border-x-2 border-b-2 border-black" /> {/* Ferrari red shirt */}
              <div className="flex gap-0.5">
                <div className="w-3 h-7 bg-[#1A252C] border-2 border-black" />
                <div className="w-3 h-7 bg-[#1A252C] border-2 border-black" />
              </div>
              <span className="font-pixel text-[8px] bg-black text-white px-1 mt-0.5 border border-gold">
                SARTHAK
              </span>
            </div>

            {/* Girlfriend Sprite */}
            <div className="flex flex-col items-center group">
              <div className="w-6 h-6 bg-[#E8C5A0] border-2 border-black relative">
                <div className="w-7 -ml-0.5 h-3 bg-[#4A2810]" /> {/* Hair */}
                <div className="w-1 h-1 bg-black absolute top-3 left-1" />
                <div className="w-1 h-1 bg-black absolute top-3 right-1" />
              </div>
              <div className="w-7 h-8 bg-grass border-x-2 border-b-2 border-black" /> {/* Green sweater */}
              <div className="flex gap-0.5">
                <div className="w-3 h-7 bg-[#2B3A42] border-2 border-black" />
                <div className="w-3 h-7 bg-[#2B3A42] border-2 border-black" />
              </div>
              <span className="font-pixel text-[8px] bg-black text-white px-1 mt-0.5 border border-ferrari">
                GIRLFRIEND
              </span>
            </div>
          </div>

          {/* Red Racing Car parked nearby */}
          <div className="absolute bottom-20 right-20 sm:right-32 hidden md:block">
            <img
              src="assets/sprites/ferrari-car.svg"
              alt="Racing Car parked at spawn"
              className="w-32 h-auto pixelated drop-shadow-md"
            />
          </div>
        </div>

        {/* Sign Popup Info (If clicked) */}
        {signOpened && (
          <div className="pixel-box-sandstone p-3 my-3 max-w-md text-obsidian border-2 border-black animate-bounce-pixel shadow-pixel">
            <div className="font-pixel text-[10px] text-ferrari font-bold uppercase mb-1">
              📜 Spawn Signboard Message:
            </div>
            <p className="font-sans text-xs font-semibold">
              {birthdayContent.welcomeSignText}
            </p>
          </div>
        )}

        {/* Guided Dialogue Box */}
        <div className="w-full max-w-xl mt-4">
          <DialogueBox
            speaker={birthdayContent.welcomeHeading}
            lines={birthdayContent.welcomeDialogue}
            onComplete={nextScene}
            buttonLabel="ENTER GRAND PRIX"
          />
        </div>
      </div>

      {/* Stone Pathway Footer Motif */}
      <div className="w-full h-4 bg-[#616161] border-t-2 border-black flex justify-around opacity-40">
        <div className="w-8 h-full bg-[#424242]" />
        <div className="w-12 h-full bg-[#424242]" />
        <div className="w-10 h-full bg-[#424242]" />
      </div>
    </div>
  );
}
