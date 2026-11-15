import React, { useState } from 'react';
import { Compass, MapPin } from 'lucide-react';
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
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-hidden select-none px-4 pt-16 pb-8">

      {/* ── RICH SKY BACKGROUND ── */}
      {/* Deep gradient sky with layered depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B3D6F] via-[#3D7AB5] via-[#6BAED6] to-[#B8E0F7]" />

      {/* Sun with glow halo */}
      <div className="absolute top-20 right-16 z-0">
        <div className="w-20 h-20 bg-[#FFF275] border-4 border-[#F5E84A]/50 shadow-[0_0_60px_30px_#FFF27580] relative">
          {/* Sun rays */}
          {[0,45,90,135].map(r => (
            <div key={r} className="absolute top-1/2 left-1/2 w-28 h-1 bg-[#FFF27530] origin-left" style={{ transform: `translate(-50%,-50%) rotate(${r}deg)` }} />
          ))}
        </div>
      </div>

      {/* Layered pixel clouds */}
      <div className="absolute top-24 left-8 z-0">
        <div className="w-40 h-10 bg-white/85 relative shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.1)]">
          <div className="absolute -top-5 left-6 w-16 h-10 bg-white/85" />
          <div className="absolute -top-7 left-14 w-20 h-12 bg-white/90" />
          <div className="absolute -top-4 left-28 w-14 h-8 bg-white/85" />
        </div>
      </div>
      <div className="absolute top-20 right-44 z-0">
        <div className="w-32 h-8 bg-white/75 relative">
          <div className="absolute -top-5 left-4 w-14 h-10 bg-white/80" />
          <div className="absolute -top-3 left-16 w-16 h-9 bg-white/75" />
        </div>
      </div>
      <div className="absolute top-36 left-56 z-0 opacity-70">
        <div className="w-28 h-7 bg-white/70 relative">
          <div className="absolute -top-4 left-6 w-16 h-9 bg-white/75" />
        </div>
      </div>

      {/* Far mountains (distant, blue-grey) */}
      <div className="absolute bottom-56 left-0 right-0 z-0 flex items-end">
        <div className="w-0 h-0 border-b-[90px] border-b-[#4A6F8A] border-l-[0px] border-r-[120px] border-r-transparent opacity-50" />
        <div className="w-0 h-0 border-b-[110px] border-b-[#3A5A72] border-l-[80px] border-l-transparent border-r-[160px] border-r-transparent opacity-60" />
        <div className="w-0 h-0 border-b-[80px] border-b-[#4A6F8A] border-l-[0px] border-r-[100px] border-r-transparent opacity-45" />
        <div className="flex-1 h-0 border-b-[70px] border-b-[#3A5A72] border-l-[120px] border-l-transparent opacity-50" />
        <div className="w-0 h-0 border-b-[100px] border-b-[#4A6F8A] border-l-[140px] border-l-transparent border-r-[100px] border-r-transparent opacity-55" />
      </div>

      {/* Mid rolling hills */}
      <div className="absolute bottom-44 left-0 right-0 z-0">
        <div className="w-full h-24 bg-[#3A7D44]" style={{ borderRadius: '60% 60% 0 0 / 40px 40px 0 0' }} />
      </div>
      <div className="absolute bottom-48 left-[-5%] w-[55%] z-0">
        <div className="w-full h-20 bg-[#4D9B56]" style={{ borderRadius: '50% 80% 0 0 / 30px 40px 0 0' }} />
      </div>
      <div className="absolute bottom-44 right-[-5%] w-[55%] z-0">
        <div className="w-full h-16 bg-[#3A7D44]" style={{ borderRadius: '80% 50% 0 0 / 40px 30px 0 0' }} />
      </div>

      {/* Scene floor: grass blocks layer */}
      <div className="absolute bottom-0 left-0 right-0 h-44 z-1">
        <div className="w-full h-8 bg-[#4D9B56] border-t-4 border-[#6AB873]" /> {/* Top grass */}
        <div className="w-full h-36 bg-[#38733E]" /> {/* Grass body */}
        {/* Block texture seams */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <div key={i} className="absolute bottom-0 top-8 w-px bg-[#2E5A2E]" style={{ left: `${12.5*i}%` }} />
        ))}
        {/* Dirt layer */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#8D5524]">
          <div className="w-full h-2 bg-[#583416]" />
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} className="absolute bottom-0 top-0 w-px bg-[#6B3F18]" style={{ left: `${12.5*i}%` }} />
          ))}
        </div>
        {/* Grass tufts */}
        {[8,22,38,52,68,80,92].map((left, i) => (
          <div key={i} className="absolute top-1 w-3 h-4 bg-[#5DB464]" style={{ left: `${left}%` }} />
        ))}
      </div>

      {/* ── SCENE CONTENT ── */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        {/* Level Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-obsidian/80 border-2 border-black text-gold font-pixel text-xs shadow-pixel-sm mb-4">
          <Compass className="w-4 h-4 text-ferrari-light" />
          <span>STAGE 1: OVERWORLD SPAWN</span>
        </div>

        {/* Scene Composition */}
        <div className="relative w-full max-w-3xl h-72 sm:h-80 flex items-end justify-center">

          {/* Detailed Minecraft Tree — Left */}
          <div className="absolute bottom-44 left-2 sm:left-8 flex flex-col items-center z-5">
            {/* Layered leaf blocks for depth */}
            <div className="w-28 h-8 bg-[#1E4D25] border-2 border-[#163A1A]" />
            <div className="w-36 h-8 bg-[#2E6B37] border-2 border-[#1E4D25]" />
            <div className="w-40 h-10 bg-[#3C8A47] border-2 border-[#2E6B37]">
              {/* Leaf texture dapples */}
              <div className="w-4 h-4 bg-[#2E6B37] absolute top-1 left-2" />
              <div className="w-4 h-4 bg-[#2E6B37] absolute top-3 left-10" />
              <div className="w-4 h-4 bg-[#2E6B37] absolute top-1 right-4" />
            </div>
            <div className="w-28 h-6 bg-[#2E6B37] border-2 border-[#1E4D25]" />
            {/* Trunk */}
            <div className="w-10 h-24 bg-[#633A19] border-x-4 border-[#3D230D] relative">
              <div className="w-2 h-8 bg-[#3D230D] absolute top-4 left-2" />
              <div className="w-2 h-6 bg-[#3D230D] absolute top-14 right-2" />
            </div>
          </div>

          {/* Smaller tree — Right */}
          <div className="absolute bottom-44 right-4 sm:right-10 hidden sm:flex flex-col items-center z-5">
            <div className="w-20 h-6 bg-[#1E4D25] border-2 border-[#163A1A]" />
            <div className="w-28 h-8 bg-[#2E6B37] border-2 border-[#1E4D25]" />
            <div className="w-24 h-8 bg-[#3C8A47] border-2 border-[#2E6B37]" />
            <div className="w-8 h-20 bg-[#633A19] border-x-4 border-[#3D230D]" />
          </div>

          {/* Lantern post — left of centre */}
          <div className="absolute bottom-44 left-32 sm:left-48 hidden md:flex flex-col items-center z-5">
            <div className="w-8 h-8 bg-[#E9C55B] border-2 border-black shadow-[0_0_16px_8px_rgba(233,197,91,0.5)] anim-float">
              <div className="w-full h-full bg-[#FFF0A8] opacity-60" />
            </div>
            <div className="w-2 h-20 bg-[#555555] border-x border-black" />
            <div className="w-6 h-3 bg-[#555555] border border-black" />
          </div>

          {/* Flower patches at ground level */}
          <div className="absolute bottom-44 left-[18%] flex gap-1 z-5">
            {['#FF6B6B','#FFD700','#FF6B6B','#FFD700'].map((c,i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border border-black" style={{background:c}} />
                <div className="w-1 h-4 bg-[#4D9B56]" />
              </div>
            ))}
          </div>

          {/* Interactive Signboard */}
          <div
            onClick={handleSignClick}
            className="absolute bottom-44 left-[35%] sm:left-[40%] cursor-pointer group flex flex-col items-center z-10"
          >
            <div className="pixel-box-sandstone px-4 py-2 border-2 border-black group-hover:scale-105 group-hover:border-gold transition-all shadow-pixel">
              <div className="font-pixel text-[9px] text-obsidian font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-ferrari" />
                <span>QUEST BOARD</span>
              </div>
            </div>
            <div className="w-3 h-10 bg-[#633A19] border-x-2 border-black" />
          </div>

          {/* ── DETAILED PIXEL COUPLE SPRITES ── */}
          <div className="absolute bottom-44 left-1/2 -translate-x-1/2 flex items-end gap-2 z-20">
            <PixelSarthak />
            <PixelGirlfriend />
          </div>

          {/* Red Racing Car parked on the right */}
          <div className="absolute bottom-44 right-16 sm:right-24 hidden lg:block z-5">
            <img
              src="assets/sprites/ferrari-car.svg"
              alt="Racing Car parked at spawn"
              className="w-36 h-auto pixelated drop-shadow-[0_4px_16px_rgba(201,29,40,0.6)]"
            />
          </div>
        </div>

        {/* Sign popup */}
        {signOpened && (
          <div className="pixel-box-sandstone p-3 my-3 max-w-md text-obsidian border-2 border-black animate-bounce-pixel shadow-pixel">
            <div className="font-pixel text-[10px] text-ferrari font-bold uppercase mb-1">
              📜 Quest Board:
            </div>
            <p className="font-sans text-xs font-semibold">{birthdayContent.welcomeSignText}</p>
          </div>
        )}

        {/* Dialogue Box */}
        <div className="w-full max-w-xl mt-4">
          <DialogueBox
            speaker={birthdayContent.welcomeHeading}
            lines={birthdayContent.welcomeDialogue}
            onComplete={nextScene}
            buttonLabel="ENTER GRAND PRIX"
          />
        </div>
      </div>

      {/* Stone path footer */}
      <div className="absolute bottom-44 left-0 right-0 flex justify-center gap-1 z-5">
        {[...Array(14)].map((_,i) => (
          <div key={i} className="h-6 border border-[#444]" style={{ width: `${5+Math.sin(i)*2}%`, backgroundColor: i % 2 === 0 ? '#616161' : '#555555' }} />
        ))}
      </div>
    </div>
  );
}

/* ── Detailed Sarthak Sprite — darker brown skin ── */
function PixelSarthak() {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 36 80" width="52" height="116" shapeRendering="crispEdges">
        {/* Hair */}
        <rect x="2" y="0" width="32" height="12" fill="#2C1A0E" />
        <rect x="0" y="8" width="6" height="8" fill="#2C1A0E" />
        <rect x="30" y="8" width="6" height="8" fill="#2C1A0E" />
        {/* Head (darker brown) */}
        <rect x="4" y="8" width="28" height="26" fill="#8B5E3C" />
        <rect x="6" y="10" width="24" height="6" fill="#9E6A44" />
        {/* Eyes */}
        <rect x="8" y="18" width="8" height="6" fill="#fff" />
        <rect x="20" y="18" width="8" height="6" fill="#fff" />
        <rect x="10" y="19" width="4" height="4" fill="#1A0A00" />
        <rect x="22" y="19" width="4" height="4" fill="#1A0A00" />
        <rect x="11" y="19" width="1" height="1" fill="#fff" />
        <rect x="23" y="19" width="1" height="1" fill="#fff" />
        {/* Eyebrows */}
        <rect x="8" y="15" width="8" height="2" fill="#1A0A00" />
        <rect x="20" y="15" width="8" height="2" fill="#1A0A00" />
        {/* Nose */}
        <rect x="15" y="24" width="6" height="4" fill="#7A4E2E" />
        {/* Smile */}
        <rect x="11" y="29" width="14" height="2" fill="#8B1A1A" />
        <rect x="9"  y="27" width="2" height="2" fill="#8B1A1A" />
        <rect x="25" y="27" width="2" height="2" fill="#8B1A1A" />
        {/* Ears */}
        <rect x="0"  y="18" width="4" height="10" fill="#8B5E3C" />
        <rect x="32" y="18" width="4" height="10" fill="#8B5E3C" />
        {/* Neck */}
        <rect x="12" y="34" width="12" height="8" fill="#8B5E3C" />
        {/* Body: Ferrari red shirt */}
        <rect x="2"  y="42" width="32" height="22" fill="#C91D28" />
        <rect x="2"  y="42" width="6"  height="22" fill="#9B131C" />
        <rect x="28" y="42" width="6"  height="22" fill="#9B131C" />
        {/* Collar */}
        <rect x="12" y="40" width="5"  height="6" fill="#E8E8E8" />
        <rect x="19" y="40" width="5"  height="6" fill="#E8E8E8" />
        {/* Arms */}
        <rect x="-4" y="43" width="8"  height="20" fill="#C91D28" />
        <rect x="32" y="43" width="8"  height="20" fill="#C91D28" />
        {/* Hands */}
        <rect x="-4" y="62" width="8"  height="8" fill="#8B5E3C" />
        <rect x="32" y="62" width="8"  height="8" fill="#8B5E3C" />
        {/* Legs */}
        <rect x="4"  y="64" width="13" height="16" fill="#1A252C" />
        <rect x="19" y="64" width="13" height="16" fill="#1A252C" />
        {/* Crease */}
        <rect x="10" y="64" width="2"  height="16" fill="#141E24" />
        <rect x="24" y="64" width="2"  height="16" fill="#141E24" />
        {/* Shoes */}
        <rect x="2"  y="78" width="15" height="4" fill="#111" />
        <rect x="19" y="78" width="15" height="4" fill="#111" />
      </svg>
      <span className="font-pixel text-[8px] bg-obsidian text-gold px-1 mt-0.5 border border-gold">SARTHAK</span>
    </div>
  );
}

/* ── Detailed Girlfriend Sprite — fair skin ── */
function PixelGirlfriend() {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 36 80" width="48" height="110" shapeRendering="crispEdges">
        {/* Long hair top */}
        <rect x="1" y="0" width="34" height="14" fill="#2C1507" />
        {/* Hair sides (flowing) */}
        <rect x="0"  y="8"  width="6"  height="40" fill="#2C1507" />
        <rect x="30" y="8"  width="6"  height="36" fill="#2C1507" />
        {/* Hair highlight */}
        <rect x="12" y="2" width="8" height="4" fill="#4A2810" />
        {/* Head (fair skin) */}
        <rect x="5"  y="8"  width="26" height="26" fill="#F5CDA9" />
        <rect x="7"  y="10" width="22" height="6"  fill="#FDDCC0" />
        {/* Eyes */}
        <rect x="8"  y="18" width="8" height="6" fill="#fff" />
        <rect x="20" y="18" width="8" height="6" fill="#fff" />
        <rect x="10" y="19" width="4" height="4" fill="#3B1A0A" />
        <rect x="22" y="19" width="4" height="4" fill="#3B1A0A" />
        <rect x="11" y="19" width="1" height="1" fill="#fff" />
        <rect x="23" y="19" width="1" height="1" fill="#fff" />
        {/* Eyelashes */}
        <rect x="8"  y="16" width="8" height="2" fill="#1A0A00" />
        <rect x="20" y="16" width="8" height="2" fill="#1A0A00" />
        {/* Eyebrows */}
        <rect x="9"  y="14" width="6" height="2" fill="#2C1507" />
        <rect x="21" y="14" width="6" height="2" fill="#2C1507" />
        {/* Nose */}
        <rect x="16" y="24" width="4" height="3" fill="#E8B090" />
        {/* Blush */}
        <rect x="6"  y="26" width="6" height="4" fill="#F4A0A0" opacity="0.7" />
        <rect x="24" y="26" width="6" height="4" fill="#F4A0A0" opacity="0.7" />
        {/* Smile */}
        <rect x="12" y="30" width="12" height="2" fill="#D4654A" />
        <rect x="10" y="28" width="2" height="2" fill="#D4654A" />
        <rect x="24" y="28" width="2" height="2" fill="#D4654A" />
        {/* Ears */}
        <rect x="0"  y="18" width="6" height="10" fill="#F5CDA9" />
        <rect x="30" y="18" width="6" height="10" fill="#F5CDA9" />
        {/* Gold earrings */}
        <rect x="0"  y="24" width="4" height="4" fill="#E9C55B" />
        <rect x="32" y="24" width="4" height="4" fill="#E9C55B" />
        {/* Neck */}
        <rect x="13" y="34" width="10" height="8" fill="#F5CDA9" />
        {/* Necklace */}
        <rect x="9"  y="40" width="18" height="2" fill="#E9C55B" />
        <rect x="15" y="42" width="6"  height="4" fill="#C8A33A" />
        {/* Body: emerald sweater */}
        <rect x="3"  y="42" width="30" height="22" fill="#2E8B57" />
        <rect x="3"  y="42" width="5"  height="22" fill="#245C3A" />
        <rect x="28" y="42" width="5"  height="22" fill="#245C3A" />
        {/* Ribbing */}
        <rect x="3"  y="50" width="30" height="2" fill="#245C3A" />
        <rect x="3"  y="56" width="30" height="2" fill="#245C3A" />
        {/* V-neck */}
        <rect x="14" y="40" width="4" height="6" fill="#245C3A" />
        <rect x="18" y="40" width="4" height="6" fill="#245C3A" />
        {/* Arms */}
        <rect x="-2" y="43" width="7"  height="18" fill="#2E8B57" />
        <rect x="31" y="43" width="7"  height="18" fill="#2E8B57" />
        {/* Hands */}
        <rect x="-2" y="60" width="7"  height="8" fill="#F5CDA9" />
        <rect x="31" y="60" width="7"  height="8" fill="#F5CDA9" />
        {/* Skirt */}
        <rect x="5"  y="64" width="26" height="16" fill="#2B3A42" />
        {/* Skirt pleats */}
        <rect x="12" y="64" width="2"  height="16" fill="#1E2B30" />
        <rect x="22" y="64" width="2"  height="16" fill="#1E2B30" />
        {/* Gold shoes */}
        <rect x="4"  y="78" width="13" height="4" fill="#E9C55B" />
        <rect x="19" y="78" width="13" height="4" fill="#E9C55B" />
      </svg>
      <span className="font-pixel text-[8px] bg-obsidian text-ferrari-light px-1 mt-0.5 border border-ferrari">GIRLFRIEND</span>
    </div>
  );
}
