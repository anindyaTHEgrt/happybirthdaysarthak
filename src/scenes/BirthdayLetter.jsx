import React, { useState } from 'react';
import { Mail, ChevronRight, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

/* ─────────────── Injected keyframe styles ─────────────── */
const letterStyles = `
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.1; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.2); }
  }
  @keyframes moonGlow {
    0%, 100% { box-shadow: 0 0 20px 6px rgba(200,210,255,0.3); }
    50%       { box-shadow: 0 0 40px 14px rgba(200,210,255,0.6); }
  }
  @keyframes candleFlicker {
    0%, 100% { transform: scaleX(1) scaleY(1); opacity: 1; }
    25%       { transform: scaleX(0.8) scaleY(1.2); }
    75%       { transform: scaleX(1.1) scaleY(0.9); opacity: 0.85; }
  }
  @keyframes lampGlow {
    0%, 100% { box-shadow: 0 0 24px 10px rgba(255,180,0,0.3); }
    50%       { box-shadow: 0 0 48px 20px rgba(255,180,0,0.5); }
  }
  @keyframes curtainSway {
    0%, 100% { transform: skewX(-1deg); }
    50%       { transform: skewX(1deg); }
  }
  @keyframes noteFloat {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50%       { transform: translateY(-6px) rotate(1deg); }
  }
  .anim-star     { animation: starTwinkle var(--sd) ease-in-out infinite; }
  .anim-moon     { animation: moonGlow 4s ease-in-out infinite; }
  .anim-candle   { animation: candleFlicker 1.2s ease-in-out infinite; }
  .anim-lamp     { animation: lampGlow 3s ease-in-out infinite; }
  .anim-curtain  { animation: curtainSway 5s ease-in-out infinite; }
  .anim-notefl   { animation: noteFloat 4s ease-in-out infinite; }
`;

/** Pixel star */
function Star({ x, y, size = 1, delay = 0, duration = 2 }) {
  return (
    <div className="anim-star absolute rounded-full pointer-events-none"
         style={{ left: x, top: y, width: size, height: size, background: '#fff',
                  '--sd': `${duration}s`, animationDelay: `${delay}s`, zIndex: 1 }} />
  );
}

/** Cozy desk lamp */
function DeskLamp({ right }) {
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ right, zIndex: 3 }}>
      {/* Lamp pole */}
      <div style={{ width: 4, height: 70, background: '#888', border: '1px solid #555', margin: '0 auto' }} />
      {/* Lamp shade */}
      <div className="anim-lamp absolute"
           style={{
             width: 36, height: 20, bottom: 68,
             right: -16,
             background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
             border: '2px solid #000',
             clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
           }} />
      {/* Glow cone on desk surface */}
      <div style={{
        position: 'absolute', bottom: 0, right: -30,
        width: 80, height: 30,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,180,0,0.3) 0%, transparent 70%)',
      }} />
    </div>
  );
}

/** Bookshelf silhouette */
function Bookshelf({ left }) {
  const books = [
    { w: 10, h: 50, c: '#8B1a1a' }, { w: 8, h: 44, c: '#1a3a8B' }, { w: 12, h: 55, c: '#1a6b2a' },
    { w: 9, h: 48, c: '#6b4a1a' }, { w: 11, h: 42, c: '#6b1a6b' }, { w: 8, h: 50, c: '#8B1a1a' },
    { w: 10, h: 45, c: '#1a3a8B' }, { w: 9, h: 52, c: '#1a6b2a' },
  ];
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ left, zIndex: 2 }}>
      {/* Shelf frame */}
      <div style={{ width: 90, background: '#3d2208', border: '2px solid #000', padding: '0 2px' }}>
        {/* Top shelf */}
        <div className="flex items-end gap-0.5" style={{ borderBottom: '3px solid #5a3416', paddingBottom: 2, marginBottom: 2 }}>
          {books.slice(0, 4).map((b, i) => (
            <div key={i} style={{ width: b.w, height: b.h * 0.6, background: b.c, border: '1px solid #000' }} />
          ))}
        </div>
        {/* Bottom shelf */}
        <div className="flex items-end gap-0.5" style={{ borderBottom: '3px solid #5a3416', paddingBottom: 2 }}>
          {books.slice(4).map((b, i) => (
            <div key={i} style={{ width: b.w, height: b.h * 0.5, background: b.c, border: '1px solid #000' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Cozy window with starry night and moon */
function NightWindow({ left }) {
  const stars = Array.from({ length: 12 }).map((_, i) => ({
    x: `${5 + (i * 23) % 85}%`, y: `${5 + (i * 17) % 70}%`,
    size: i % 4 === 0 ? 2 : 1,
    delay: i * 0.3,
    duration: 1.5 + (i % 4) * 0.5,
  }));
  return (
    <div className="absolute pointer-events-none" style={{ left, top: 60, zIndex: 3 }}>
      {/* Window frame */}
      <div style={{ width: 100, height: 130, background: '#060412', border: '5px solid #3d2208',
                    boxShadow: 'inset 0 0 20px rgba(60,20,100,0.4)', position: 'relative', overflow: 'hidden' }}>
        {/* Night sky gradient */}
        <div style={{ position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, #030210 0%, #0a0620 50%, #150a30 100%)' }} />
        {/* Stars */}
        {stars.map((s, i) => <Star key={i} {...s} />)}
        {/* Moon */}
        <div className="anim-moon absolute rounded-full"
             style={{ width: 24, height: 24, right: 8, top: 10,
                      background: 'linear-gradient(135deg, #e8e8e8, #c0c8d8)', border: '1px solid #aaa' }} />
        {/* Distant city silhouette */}
        {[0, 14, 25, 38, 52, 64, 76, 88].map((l, i) => (
          <div key={i} className="absolute bottom-0"
               style={{ left: `${l}%`, width: 10 + (i % 3) * 4, height: 20 + (i % 5) * 8,
                        background: '#050310', border: '1px solid #000' }} />
        ))}
        {/* Window cross-pane */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 4, background: '#3d2208' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '45%', height: 4, background: '#3d2208' }} />
      </div>
      {/* Curtains */}
      <div className="anim-curtain absolute"
           style={{ width: 22, height: 130, top: 0, left: -18,
                    background: 'linear-gradient(90deg, #6b1a2a, #8b2535)',
                    borderRight: '2px solid #000', transformOrigin: 'right center', opacity: 0.9 }} />
      <div className="anim-curtain absolute"
           style={{ width: 22, height: 130, top: 0, right: -18,
                    background: 'linear-gradient(270deg, #6b1a2a, #8b2535)',
                    borderLeft: '2px solid #000', transformOrigin: 'left center',
                    opacity: 0.9, animationDelay: '0.5s' }} />
      {/* Windowsill */}
      <div style={{ height: 8, background: '#5a3416', border: '2px solid #000', borderTop: '2px solid #7a4a20' }} />
    </div>
  );
}

/** Candle on desk */
function DeskCandle({ right, delay = 0 }) {
  return (
    <div className="absolute pointer-events-none" style={{ right, bottom: 30, zIndex: 4 }}>
      {/* Flame */}
      <div className="anim-candle"
           style={{ width: 6, height: 10, background: 'linear-gradient(180deg, #fff5a0, #FFB800)',
                    borderRadius: '50% 50% 20% 20%', margin: '0 auto -1px',
                    boxShadow: '0 0 8px 3px rgba(255,180,0,0.5)', animationDelay: `${delay}s` }} />
      {/* Wick */}
      <div style={{ width: 1, height: 4, background: '#333', margin: '0 auto' }} />
      {/* Candle body */}
      <div style={{ width: 10, height: 32, background: 'linear-gradient(180deg, #f5f5f5, #e0e0e0)',
                    border: '1px solid #ccc', margin: '0 auto', borderRadius: 1 }}>
        {/* Wax drips */}
        {[0, 3, 6].map((o, i) => (
          <div key={i} style={{ width: 3, height: 6 + i * 2, background: '#e8e8e8',
                                position: 'absolute', left: i * 3, top: 8 + i * 4, borderRadius: '0 0 2px 2px' }} />
        ))}
      </div>
      {/* Candle holder */}
      <div style={{ width: 16, height: 5, background: '#888', border: '1px solid #555',
                    borderRadius: 2, margin: '0 auto' }} />
      {/* Glow on surface */}
      <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                    width: 40, height: 15, background: 'radial-gradient(ellipse, rgba(255,180,0,0.25), transparent)' }} />
    </div>
  );
}

export default function BirthdayLetter() {
  const { unlockAchievement, nextScene } = useGame();
  const [isOpened, setIsOpened] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const { letter } = birthdayContent;

  const handleOpenEnvelope = () => {
    audioEngine.playSfx('claim');
    setIsOpened(true);
    unlockAchievement('heart-world');
    setRevealedParagraphs(letter.paragraphs.length);
  };

  const handleReplay = () => {
    setIsOpened(false);
    setRevealedParagraphs(0);
  };

  /* Background star field */
  const bgStars = Array.from({ length: 40 }).map((_, i) => ({
    x: `${(i * 59) % 100}%`, y: `${(i * 43) % 85}%`,
    size: i % 7 === 0 ? 2 : 1,
    delay: i * 0.15,
    duration: 1.8 + (i % 6) * 0.4,
  }));

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-x-hidden select-none px-4 pt-16 pb-8"
         style={{ background: '#06040f' }}>
      <style>{letterStyles}</style>

      {/* ── Deep night sky ── */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, #04030e 0%, #080518 25%, #0e0820 50%, #130c28 70%, #1a1030 85%, #221530 100%)' }} />

      {/* ── Background stars ── */}
      {bgStars.map((s, i) => (
        <div key={i} className="anim-star absolute rounded-full pointer-events-none"
             style={{ left: s.x, top: s.y, width: s.size, height: s.size,
                      background: '#fff', '--sd': `${s.duration}s`,
                      animationDelay: `${s.delay}s`, zIndex: 1 }} />
      ))}

      {/* ── Nebula blobs ── */}
      {[
        { left: '10%', top: '5%', w: 120, h: 60, color: 'rgba(80,20,120,0.12)' },
        { left: '60%', top: '15%', w: 100, h: 50, color: 'rgba(20,60,120,0.1)' },
        { left: '35%', top: '30%', w: 80, h: 40, color: 'rgba(120,20,60,0.08)' },
      ].map((n, i) => (
        <div key={i} className="absolute pointer-events-none rounded-full"
             style={{ left: n.left, top: n.top, width: n.w, height: n.h,
                      background: n.color, filter: 'blur(20px)', zIndex: 1 }} />
      ))}

      {/* ── Cozy window (left) ── */}
      <NightWindow left={16} />

      {/* ── Bookshelf (far left) ── */}
      <Bookshelf left={8} />

      {/* ── Desk lamp (right side) ── */}
      <DeskLamp right="8%" />

      {/* ── Candles on desk edge ── */}
      <DeskCandle right="12%" delay={0} />
      <DeskCandle right="18%" delay={0.6} />

      {/* ── Warm floor glow from lamp ── */}
      <div className="absolute pointer-events-none anim-lamp"
           style={{ right: '5%', bottom: 0, width: 150, height: 60,
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(255,160,0,0.15) 0%, transparent 80%)',
                    zIndex: 2 }} />

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)', zIndex: 3 }} />

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-xl relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 text-white"
             style={{ background: '#6b1a2a', border: '2px solid #000' }}>
          <Heart className="w-3.5 h-3.5 text-gold" />
          <span>STAGE 5: SPECIAL MESSAGE</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold drop-shadow-lg">{letter.heading}</h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">{letter.prompt}</p>
      </div>

      {/* ── Centre Stage: Envelope or Letter ── */}
      <div className="w-full max-w-2xl my-4 flex flex-col items-center z-10">
        {!isOpened ? (
          <div className="flex flex-col items-center py-8">
            {/* Floating notes around envelope */}
            {['♪', '♥', '★'].map((sym, i) => (
              <div key={i} className="anim-notefl absolute font-pixel text-gold pointer-events-none"
                   style={{ fontSize: 14 + i * 4, opacity: 0.5,
                            top: `${38 + (i * 6)}%`, left: `${20 + i * 25}%`,
                            animationDelay: `${i * 0.8}s`, zIndex: 5 }}>
                {sym}
              </div>
            ))}

            <button
              onClick={handleOpenEnvelope}
              className="group focus:outline-none focus:ring-4 focus:ring-gold flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
              aria-label="Open sealed birthday letter"
            >
              {/* Pixel Envelope */}
              <div className="w-64 sm:w-80 h-44 relative shadow-pixel-lg flex flex-col justify-between p-4"
                   style={{ background: '#E9D9B5', border: '4px solid #000' }}>
                {/* Flap */}
                <div className="absolute -top-1 left-0 right-0 h-20 group-hover:brightness-105"
                     style={{ background: '#D4BF94', borderBottom: '4px solid #000',
                              clipPath: 'polygon(0 0,100% 0,50% 100%)' }} />
                {/* Wax seal */}
                <div className="absolute z-10 group-hover:scale-110 transition-transform"
                     style={{ top: 56, left: '50%', transform: 'translateX(-50%)',
                              width: 48, height: 48, background: '#e53e3e', border: '2px solid #000',
                              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: '0 0 12px 4px rgba(229,62,62,0.4)' }}>
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                {/* Rose petals decoration */}
                {['12%', '82%', '5%', '88%'].map((left, i) => (
                  <div key={i} className="absolute text-sm pointer-events-none"
                       style={{ top: i < 2 ? '15%' : '75%', left, fontSize: 10, opacity: 0.5 }}>
                    🌹
                  </div>
                ))}
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
          /* Unfolded letter on warm parchment */
          <div className="w-full pixel-box-sandstone p-6 sm:p-8 text-obsidian shadow-pixel-lg animate-fadeIn border-4 border-black relative max-h-[65vh] overflow-y-auto">
            <button
              onClick={handleReplay}
              className="absolute top-4 right-4 p-1.5 bg-obsidian text-sandstone border border-black hover:bg-black font-pixel text-[9px] flex items-center gap-1"
              title="Fold letter back into envelope"
            >
              <RotateCcw className="w-3 h-3" /> FOLD
            </button>

            {/* Parchment decoration - top wax drips */}
            <div className="flex justify-center gap-4 mb-3 opacity-30">
              {['#e53e3e','#FFD700','#e53e3e'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 14, background: c, borderRadius: '0 0 4px 4px', border: '1px solid rgba(0,0,0,0.2)' }} />
              ))}
            </div>

            <div className="font-serif text-lg sm:text-xl font-bold border-b border-obsidian/20 pb-2 mb-4" style={{ color: '#e53e3e' }}>
              {letter.salutation}
            </div>
            <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-[#2B1E16] font-medium">
              {letter.paragraphs.map((paragraph, index) => (
                <p key={index} className="transition-opacity duration-300">{paragraph}</p>
              ))}
            </div>
            {/* Sign-off */}
            <div className="mt-8 pt-4 border-t border-obsidian/20 text-right">
              <div className="font-sans italic text-sm text-obsidian/80">{letter.signOff}</div>
              <div className="font-serif text-lg sm:text-xl font-bold mt-1" style={{ color: '#6b1a2a' }}>{letter.signature}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="z-10 w-full max-w-md flex justify-center mt-2">
        {isOpened && (
          <button onClick={nextScene} className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg">
            <span>GO TO BIRTHDAY CAKE FINALE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
