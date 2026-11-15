import React, { useState, useEffect } from 'react';
import { Home, Sparkles, ChevronRight, X, Heart } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import TreasureChest from '../components/TreasureChest';
import PhotoGallery from '../components/PhotoGallery';
import { audioEngine } from '../utils/audioSystem';

/* ─────────────── Injected keyframe styles ─────────────── */
const mcStyles = `
  @keyframes fireflyFloat {
    0%   { transform: translate(0, 0);     opacity: 0; }
    20%  { opacity: 0.9; }
    80%  { opacity: 0.9; }
    100% { transform: translate(var(--fx), var(--fy)); opacity: 0; }
  }
  @keyframes windowPulse {
    0%, 100% { box-shadow: 0 0 8px 2px #FFD166; }
    50%       { box-shadow: 0 0 20px 6px #FFB800; }
  }
  @keyframes sunSet {
    0%   { top: 60px; opacity: 1; }
    100% { top: 100px; opacity: 0.6; }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 1; }
  }
  @keyframes leafSway {
    0%, 100% { transform: rotate(-3deg); }
    50%       { transform: rotate(3deg); }
  }
  .anim-firefly { animation: fireflyFloat var(--fd) ease-in-out infinite; }
  .anim-window  { animation: windowPulse 2.4s ease-in-out infinite; }
  .anim-star    { animation: starTwinkle var(--sd) ease-in-out infinite; }
  .anim-leaf    { animation: leafSway 2.5s ease-in-out infinite; }
`;

/* ─────────────── Firefly particles ─────────────── */
function Firefly({ style }) {
  return (
    <div
      className="anim-firefly absolute rounded-full pointer-events-none"
      style={{ width: 4, height: 4, background: '#a3f060', boxShadow: '0 0 6px 2px #a3f060', ...style }}
    />
  );
}

/* ─────────────── Silhouette tree row ─────────────── */
function TreeSilhouette({ left, height = 48, width = 20 }) {
  return (
    <div className="absolute bottom-16 pointer-events-none" style={{ left, zIndex: 1 }}>
      {/* Canopy */}
      <div style={{
        width, height: height * 0.65,
        background: 'linear-gradient(180deg, #1a4d2b 0%, #0f3320 100%)',
        border: '2px solid #000',
        marginLeft: width * 0.25,
      }} />
      {/* Trunk */}
      <div style={{
        width: width * 0.3, height: height * 0.4,
        background: '#4a2c0a', border: '1px solid #000',
        marginLeft: width * 0.37,
      }} />
    </div>
  );
}

export default function MinecraftWorld() {
  const { state, dispatch, unlockAchievement, nextScene } = useGame();
  const [selectedSign, setSelectedSign] = useState(null);
  const [hiddenChestOpenedModal, setHiddenChestOpenedModal] = useState(false);

  const isMainChestOpened   = state.openedChests.includes('main-minecraft');
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

  /* Firefly positions */
  const fireflies = Array.from({ length: 12 }).map((_, i) => ({
    left: `${10 + (i * 7.3) % 80}%`,
    top:  `${20 + (i * 11.7) % 55}%`,
    '--fx': `${(i % 3 === 0 ? -1 : 1) * (20 + i * 5)}px`,
    '--fy': `${-20 - i * 4}px`,
    '--fd': `${3 + (i % 4) * 1.5}s`,
    animationDelay: `${i * 0.4}s`,
  }));

  /* Star positions */
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    left: `${(i * 37) % 100}%`,
    top:  `${(i * 23) % 40}%`,
    '--sd': `${1.5 + (i % 5) * 0.6}s`,
    animationDelay: `${i * 0.2}s`,
    width: i % 5 === 0 ? 2 : 1,
    height: i % 5 === 0 ? 2 : 1,
  }));

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-x-hidden select-none px-4 pt-16 pb-8"
         style={{ background: '#0d1810' }}>
      <style>{mcStyles}</style>

      {/* ── Multi-layer sunset/dusk sky ── */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, #0a0618 0%, #1a0c3a 20%, #3d1a5a 35%, #7a2c5e 50%, #c45a3a 65%, #e8894a 75%, #38733E 76%, #254A35 100%)' }} />

      {/* ── Stars in upper sky ── */}
      {stars.map((s, i) => (
        <div key={i} className="anim-star absolute rounded-full pointer-events-none"
             style={{ background: '#fff', opacity: 0.5, zIndex: 1, ...s }} />
      ))}

      {/* ── Pixel sun descending ── */}
      <div className="absolute pointer-events-none"
           style={{
             right: '12%', top: 72, width: 28, height: 28,
             background: '#FFB800', border: '3px solid #FF8C00',
             boxShadow: '0 0 24px 8px rgba(255,200,0,0.4)',
             zIndex: 2,
           }} />
      {/* Sun rays */}
      {[0, 45, 90, 135].map((deg, i) => (
        <div key={i} className="absolute pointer-events-none"
             style={{
               right: 'calc(12% + 7px)', top: 86,
               width: 2, height: 14,
               background: '#FFD700', opacity: 0.5,
               transformOrigin: '50% 100%',
               transform: `rotate(${deg}deg) translateY(-22px)`,
               zIndex: 2,
             }} />
      ))}

      {/* ── Distant mountain silhouettes ── */}
      <div className="absolute pointer-events-none" style={{ bottom: '24%', left: 0, right: 0, height: 60, zIndex: 1 }}>
        {[
          { left: '5%',  width: 80,  height: 55, color: '#1a1030' },
          { left: '20%', width: 110, height: 70, color: '#1f1540' },
          { left: '55%', width: 90,  height: 60, color: '#1a1030' },
          { left: '75%', width: 70,  height: 50, color: '#1f1540' },
        ].map((m, i) => (
          <div key={i} className="absolute"
               style={{
                 left: m.left, bottom: 0,
                 width: m.width, height: m.height,
                 background: m.color,
                 clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                 border: '1px solid #000',
               }} />
        ))}
      </div>

      {/* ── Tree silhouette layer ── */}
      <TreeSilhouette left="2%" height={56} width={22} />
      <TreeSilhouette left="12%" height={42} width={18} />
      <TreeSilhouette left="62%" height={50} width={20} />
      <TreeSilhouette left="78%" height={38} width={16} />
      <TreeSilhouette left="90%" height={48} width={20} />

      {/* ── Fireflies ── */}
      {fireflies.map((f, i) => <Firefly key={i} style={f} />)}

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 text-white"
             style={{ background: '#254A35', border: '2px solid #000' }}>
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>STAGE 2: {birthdayContent.minecraftWorldTitle}</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold drop-shadow-lg">Our Shared World</h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">{birthdayContent.minecraftPrompt}</p>
      </div>

      {/* ── Landscape + Interactive Props ── */}
      <div className="relative w-full max-w-4xl my-3 flex flex-col items-center z-10">
        <div className="relative w-full overflow-hidden shadow-pixel-lg"
             style={{ height: 280, border: '4px solid #000', background: 'transparent' }}>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 64 }}>
            {/* Grass top */}
            <div style={{ height: 16, background: 'linear-gradient(180deg, #4D9B56 0%, #38733E 100%)', borderTop: '3px solid #2a5c30' }}>
              {/* Grass tufts */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="inline-block"
                     style={{ width: 4, height: i % 3 === 0 ? 6 : 4, background: '#5fba6b', marginLeft: `${i * 5}%`, verticalAlign: 'bottom' }} />
              ))}
            </div>
            {/* Dirt */}
            <div style={{ height: 48, background: 'linear-gradient(180deg, #7a4a20 0%, #5a3415 100%)', borderTop: '2px solid #3d2208' }} />
          </div>

          {/* ── Detailed Cottage (left) ── */}
          <div className="absolute bottom-16 flex flex-col items-start" style={{ left: '5%' }}>
            {/* Chimney */}
            <div style={{
              width: 10, height: 22, background: '#555', border: '2px solid #000',
              marginLeft: 70, marginBottom: -2, zIndex: 3, position: 'relative',
            }}>
              {/* Smoke puffs */}
              {[0, 1, 2].map((s) => (
                <div key={s} className="absolute anim-firefly rounded-full"
                     style={{
                       width: 6, height: 6, background: 'rgba(200,200,200,0.5)',
                       top: -10 - s * 8, left: 1,
                       '--fx': `${s * 4}px`, '--fy': `${-20 - s * 8}px`,
                       '--fd': `${1.5 + s * 0.4}s`,
                       animationDelay: `${s * 0.5}s`,
                     }} />
              ))}
            </div>

            {/* Roof */}
            <div style={{
              width: 160, height: 50,
              background: 'linear-gradient(135deg, #6b4423 0%, #4a2e14 100%)',
              border: '3px solid #000', clipPath: 'polygon(0% 100%, 15% 0%, 85% 0%, 100% 100%)',
            }} />

            {/* Walls */}
            <div className="flex" style={{ width: 148, background: '#5a5168', border: '3px solid #000', borderTop: 'none', marginTop: -2 }}>
              {/* Left cobble panel */}
              <div style={{ width: 60, height: 90, background: '#4a4555', borderRight: '2px solid #000', padding: 4 }}>
                {Array.from({ length: 9 }).map((_, r) => (
                  <div key={r} className="flex gap-0.5 mb-0.5">
                    {Array.from({ length: 3 }).map((_, c) => (
                      <div key={c} style={{ flex: 1, height: 7, background: (r + c) % 2 === 0 ? '#555' : '#3d394a', border: '0.5px solid #333' }} />
                    ))}
                  </div>
                ))}
              </div>

              {/* Glowing window */}
              <div className="anim-window flex items-center justify-center"
                   style={{ width: 36, height: 44, margin: '8px 4px', background: '#FFD166', border: '3px solid #3d2208', alignSelf: 'flex-start' }}>
                {/* Window pane cross */}
                <div style={{ position: 'absolute', width: 1, height: '80%', background: '#8B5E3C', opacity: 0.5 }} />
                <div style={{ position: 'absolute', height: 1, width: '80%', background: '#8B5E3C', opacity: 0.5 }} />
              </div>

              {/* Wooden door */}
              <div style={{ width: 28, height: 60, background: '#5a3416', border: '2px solid #3d2208', marginTop: 'auto', marginLeft: 4, borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD700', border: '1px solid #000' }} />
                {/* Door wood grain */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ width: '70%', height: 1, background: '#3d2208', marginTop: 7, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            {/* Hanging lantern */}
            <div className="absolute anim-float"
                 style={{ top: 48, right: -16, width: 10, height: 18, background: '#FFD700', border: '2px solid #000',
                          boxShadow: '0 0 10px 4px rgba(255,200,0,0.5)', zIndex: 4 }} />
            <div style={{ position: 'absolute', top: 46, right: -11, width: 1, height: 6, background: '#888' }} />

            {/* Flower patch in front */}
            <div className="flex gap-1 mt-1">
              {['#ff6b8a','#ff9f00','#9f65d4','#ff6b8a'].map((c, i) => (
                <div key={i} style={{ width: 6, height: 10 }}>
                  <div style={{ width: 6, height: 6, background: c, border: '1px solid #000', borderRadius: 1 }} />
                  <div style={{ width: 2, height: 5, background: '#3d8a3a', margin: '0 auto', border: '0.5px solid #2a5c20' }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Torch post (centre-left) ── */}
          <div className="absolute bottom-16 anim-float"
               style={{ left: '44%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5 }}>
            <div style={{ width: 4, height: 4, background: '#FF8C00', border: '1px solid #FF4500',
                          boxShadow: '0 0 8px 4px rgba(255,100,0,0.6)', marginBottom: -1 }} />
            <div style={{ width: 4, height: 20, background: '#8B5E3C', border: '1px solid #5a3416' }} />
          </div>

          {/* ── Hidden Chest (far right, behind tree) ── */}
          <div className="absolute bottom-16 z-20 flex flex-col items-center"
               style={{ right: '4%' }}>
            {/* Tree hiding it */}
            <div className="anim-leaf absolute pointer-events-none"
                 style={{ width: 55, height: 65, background: 'linear-gradient(135deg, #2E6B37, #1a4d26)',
                          border: '2px solid #000', top: -55, left: -10, zIndex: 3, opacity: 0.9 }} />
            <TreasureChest
              id="hidden-minecraft"
              title="Secret Hidden Chest"
              isOpened={isHiddenChestOpened}
              onOpen={handleOpenHiddenChest}
              glow={!isHiddenChestOpened}
              size="small"
            />
          </div>

          {/* ── Main Photo Chest (centre) ── */}
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

          {/* ── Garden Memory Signs ── */}
          <div className="absolute bottom-16 hidden sm:flex items-end gap-3 z-10"
               style={{ right: '22%' }}>
            {birthdayContent.memorySigns.slice(0, 3).map((sign, idx) => (
              <button
                key={sign.id}
                onClick={() => { audioEngine.playSfx('click'); setSelectedSign(sign); }}
                className="flex flex-col items-center group cursor-pointer"
                aria-label={`Inspect garden sign: ${sign.title}`}
              >
                <div className="pixel-box-sandstone px-2 py-1 border border-black group-hover:scale-105 transition-transform text-[8px] font-pixel text-obsidian">
                  SIGN #{idx + 1}
                </div>
                <div style={{ width: 4, height: 20, background: '#5a3416', borderLeft: '1px solid #000', borderRight: '1px solid #000' }} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Garden Sign Modal ── */}
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
               role="dialog" aria-modal="true">
            <div className="pixel-box-sandstone p-5 max-w-sm w-full text-obsidian shadow-pixel-lg animate-bounce-pixel relative">
              <button onClick={() => setSelectedSign(null)}
                      className="absolute top-2 right-2 p-1 bg-obsidian text-white border border-black"
                      aria-label="Close sign">
                <X className="w-4 h-4" />
              </button>
              <div className="font-pixel text-xs text-ferrari font-bold uppercase mb-2">📜 {selectedSign.title}</div>
              <p className="font-sans text-sm font-semibold leading-relaxed">"{selectedSign.message}"</p>
            </div>
          </div>
        )}

        {/* ── Hidden Chest Modal ── */}
        {hiddenChestOpenedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
               role="dialog" aria-modal="true">
            <div className="pixel-box-gold p-6 max-w-md w-full text-obsidian shadow-pixel-lg animate-bounce-pixel relative">
              <button onClick={() => setHiddenChestOpenedModal(false)}
                      className="absolute top-3 right-3 p-1 bg-obsidian text-gold border-2 border-black"
                      aria-label="Close secret note">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-ferrari" />
                <h3 className="font-pixel text-sm sm:text-base text-obsidian font-bold">{birthdayContent.hiddenChest.title}</h3>
              </div>
              <p className="font-sans text-sm text-obsidian font-medium leading-relaxed bg-white/40 p-3 border border-black/20">
                {birthdayContent.hiddenChest.message}
              </p>
              <p className="font-sans text-xs text-ferrari-dark font-bold mt-3 italic">{birthdayContent.hiddenChest.secretNote}</p>
            </div>
          </div>
        )}

        {/* ── Memory Photo Gallery ── */}
        {isMainChestOpened ? (
          <div className="w-full mt-4 animate-fadeIn"><PhotoGallery photos={birthdayContent.memories} /></div>
        ) : (
          <div className="w-full text-center py-4">
            <button onClick={handleOpenMainChest} className="pixel-btn pixel-btn-gold animate-bounce">
              ✨ OPEN MEMORY CHEST
            </button>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="z-10 w-full max-w-md flex justify-center mt-2">
        {isMainChestOpened && (
          <button onClick={nextScene} className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg">
            <span>VISIT REWARD SHOP</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
