import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Heart, ChevronRight, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';
import { birthdayContent } from '../data/birthdayContent';

// Floating emoji particle object
let particleId = 0;

const MILESTONES = [
  { at: 20,  label: 'First Squeeze!',       emoji: '🤗', bg: 'bg-pink-800' },
  { at: 40,  label: 'Double the Love!',      emoji: '💕', bg: 'bg-rose-700' },
  { at: 60,  label: 'Cuddle Champion!',      emoji: '🥰', bg: 'bg-ferrari'  },
  { at: 80,  label: 'Kiss Unlocked! 💋',     emoji: '😘', bg: 'bg-ferrari-dark' },
  { at: 100, label: 'LOVE METER MAXED! ❤️‍🔥', emoji: '💞', bg: 'bg-gold'   },
];

export default function HugMeter() {
  const { nextScene, unlockAchievement } = useGame();
  const [taps, setTaps]         = useState(0);
  const [particles, setParticles] = useState([]);
  const [milestone, setMilestone] = useState(null);
  const [maxed, setMaxed]         = useState(false);
  const milestoneTimerRef         = useRef(null);
  const prevMilestoneRef          = useRef(-1);

  const TAP_GOAL   = 50;   // taps needed to max the meter
  const percent    = Math.min(Math.round((taps / TAP_GOAL) * 100), 100);

  // Which milestones message to show (based on percent)
  const currentMilestone = MILESTONES.filter(m => percent >= m.at).slice(-1)[0];

  // Spawn a floating particle on each tap
  const spawnParticle = useCallback((e) => {
    const rect = e.currentTarget?.getBoundingClientRect?.() ?? { left: 0, top: 0, width: 300, height: 200 };
    const x = e.clientX != null
      ? e.clientX - rect.left
      : rect.width / 2 + (Math.random() - 0.5) * 60;
    const y = e.clientY != null
      ? e.clientY - rect.top
      : rect.height / 2 + (Math.random() - 0.5) * 40;

    const emojis = percent < 40 ? ['🤗','💕','💗'] : percent < 70 ? ['😘','💋','💖'] : ['❤️‍🔥','💞','✨','😍'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const id = ++particleId;
    setParticles(prev => [...prev.slice(-25), { id, x, y, emoji, angle: (Math.random() - 0.5) * 60 }]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1100);
  }, [percent]);

  const handleTap = useCallback((e) => {
    if (maxed) return;
    audioEngine.playSfx('collect');
    spawnParticle(e);
    setTaps(prev => {
      const next = Math.min(prev + 1, TAP_GOAL);
      return next;
    });
  }, [maxed, spawnParticle]);

  // Handle milestone announcements
  useEffect(() => {
    if (!currentMilestone) return;
    if (currentMilestone.at === prevMilestoneRef.current) return;
    prevMilestoneRef.current = currentMilestone.at;

    setMilestone(currentMilestone);
    audioEngine.playSfx('achievement');
    clearTimeout(milestoneTimerRef.current);
    milestoneTimerRef.current = setTimeout(() => setMilestone(null), 2200);

    if (percent >= 100) {
      setMaxed(true);
      unlockAchievement('love-maxed');
      audioEngine.playSfx('podium');
    }
  }, [currentMilestone, percent, unlockAchievement]);

  // Pick the right couple emotion to display
  const coupleEmotion = percent < 40 ? 'default' : percent < 80 ? 'hugging' : 'kissing';

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between overflow-hidden select-none px-4 pt-16 pb-8">

      {/* ── BACKGROUND ── */}
      {/* Layered gradient: deep romantic plum → rose → soft peach */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A18] via-[#3B1230] to-[#5C1A36] -z-20" />

      {/* Animated bokeh glow circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              width:  `${40 + (i * 23) % 120}px`,
              height: `${40 + (i * 23) % 120}px`,
              background: i % 3 === 0 ? '#C91D28' : i % 3 === 1 ? '#E9C55B' : '#FF6B9D',
              left: `${(i * 37) % 95}%`,
              top:  `${(i * 61) % 90}%`,
              filter: 'blur(28px)',
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Floating heart rain (always present) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute text-sm opacity-30"
            style={{
              left:   `${(i * 53) % 97}%`,
              top:    `-${10 + (i * 7) % 30}%`,
              animation: `fallDown ${4 + (i % 5)}s linear ${(i * 0.6) % 5}s infinite`,
              fontSize: `${10 + (i % 12)}px`,
            }}
          >
            {['❤️','💕','✨','💗','💖'][i % 5]}
          </span>
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-ferrari/40 border-2 border-ferrari-light text-white font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2">
          <Heart className="w-3.5 h-3.5 text-gold fill-current" />
          <span>STAGE 4: HUG &amp; KISS METER</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold leading-snug">
          Tap to Send Your Love!
        </h2>
        <p className="font-sans text-xs sm:text-sm text-pink-200 mt-1">
          Tap the couple as fast as you can — fill the love meter to 100% 💕
        </p>
      </div>

      {/* ── CENTRAL INTERACTION ZONE ── */}
      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-lg">

        {/* Milestone Toast */}
        {milestone && (
          <div
            className={`absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 px-4 py-2 border-4 border-black ${milestone.bg} text-white font-pixel text-xs shadow-pixel-lg animate-bounce-pixel`}
          >
            {milestone.emoji} {milestone.label}
          </div>
        )}

        {/* Couple Pixel Art (SVG-based, detailed) */}
        <button
          onClick={handleTap}
          disabled={maxed}
          aria-label="Tap to send hugs and kisses"
          className={`relative focus:outline-none focus:ring-4 focus:ring-gold group transition-transform active:scale-95 ${!maxed ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {/* Particle canvas */}
          <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
            {particles.map(p => (
              <span
                key={p.id}
                className="absolute text-xl pointer-events-none"
                style={{
                  left: p.x,
                  top:  p.y,
                  animation: 'floatUp 1.1s ease-out forwards',
                  transform: `rotate(${p.angle}deg)`,
                }}
              >
                {p.emoji}
              </span>
            ))}
          </div>

          {/* Couple SVG Scene */}
          <CouplePixelArt emotion={coupleEmotion} percent={percent} />

          {/* Pulsing ring on hover */}
          {!maxed && (
            <div className="absolute inset-0 rounded-full border-4 border-pink-400/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
          )}
        </button>

        {/* TAP COUNT */}
        <div className="font-pixel text-sm sm:text-base text-gold drop-shadow text-center">
          {maxed ? '💞 LOVE MAXED! 💞' : `${taps} / ${TAP_GOAL} TAPS`}
        </div>

        {/* METER BAR */}
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-1 font-pixel text-[10px]">
            <span className="text-pink-300">❤️ LOVE METER</span>
            <span className="text-gold font-bold">{percent}%</span>
          </div>
          <div className="w-full h-7 bg-black/60 border-4 border-black relative overflow-hidden shadow-pixel">
            {/* Fill gradient */}
            <div
              className="h-full transition-all duration-200 ease-out relative"
              style={{
                width: `${percent}%`,
                background: percent >= 80
                  ? 'linear-gradient(90deg, #C91D28, #E9C55B, #FF6B9D)'
                  : percent >= 40
                  ? 'linear-gradient(90deg, #C91D28, #FF6B9D)'
                  : 'linear-gradient(90deg, #9B131C, #C91D28)',
              }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
            {/* Milestone tick marks */}
            {MILESTONES.map(m => (
              <div
                key={m.at}
                className={`absolute top-0 bottom-0 w-0.5 ${percent >= m.at ? 'bg-white/60' : 'bg-white/20'}`}
                style={{ left: `${m.at}%` }}
              />
            ))}
            {/* Heart pulse when maxed */}
            {maxed && (
              <div className="absolute inset-0 flex items-center justify-center font-pixel text-white text-xs animate-pulse">
                ❤️‍🔥 MAXED OUT ❤️‍🔥
              </div>
            )}
          </div>

          {/* Milestone labels */}
          <div className="flex justify-between mt-1">
            {MILESTONES.map(m => (
              <span
                key={m.at}
                className={`font-pixel text-[7px] transition-colors ${percent >= m.at ? 'text-gold' : 'text-mutedGrey/40'}`}
                title={m.label}
              >
                {m.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Affection message box */}
        <div className="pixel-box p-3 w-full max-w-sm bg-obsidian-card/80 border-2 border-pink-900 text-center">
          <p className="font-sans text-xs sm:text-sm text-pink-100 italic leading-relaxed">
            {percent === 0  && '"Every hug from you is my favourite place in the world."'}
            {percent > 0  && percent < 40  && '"Keep going! I never want to stop hugging you. 🤗"'}
            {percent >= 40 && percent < 80  && "\"You're literally the warmest, most wonderful hug I've ever known. 💕\""}
            {percent >= 80 && percent < 100 && '"Almost there... P.S. I really want to kiss you right now 😘"'}
            {percent >= 100 && `"${birthdayContent.finalSignOff} You're my P1. Always. ❤️‍🔥"`}
          </p>
        </div>

        {!maxed && (
          <span className="font-pixel text-[9px] text-pink-300/70 animate-pulse">
            TAP ANYWHERE ON THE COUPLE ↑
          </span>
        )}
      </div>

      {/* ── CONTINUE BUTTON ── */}
      <div className="z-10 w-full max-w-md flex justify-center mt-3">
        {maxed ? (
          <button
            onClick={nextScene}
            className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg animate-bounce-pixel"
          >
            <span>READ BIRTHDAY LETTER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={nextScene}
            className="font-pixel text-[10px] text-mutedGrey/60 hover:text-mutedGrey underline underline-offset-4 focus:outline-none focus:text-white"
          >
            Skip for now →
          </button>
        )}
      </div>

      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) rotate(var(--rot, 0deg)) scale(1); }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-80px) rotate(var(--rot, 20deg)) scale(1.4); }
        }
        @keyframes fallDown {
          0%   { transform: translateY(-10%) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.25; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Detailed Pixel Couple SVG Art ── */
function CouplePixelArt({ emotion, percent }) {
  const isHugging = emotion === 'hugging' || emotion === 'kissing';
  const isKissing = emotion === 'kissing';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 260"
      width="260"
      height="300"
      shapeRendering="crispEdges"
      className="drop-shadow-[0_8px_30px_rgba(201,29,40,0.5)] transition-transform duration-200 hover:scale-105"
      aria-label="Pixel art couple"
    >
      {/* ── BACKGROUND HEART (behind couple) ── */}
      <path d="M75 60 h8 v8 h-8z M83 52 h8 v8 h-8z M67 52 h8 v8 h-8z M59 60 h8 v16 h-8z M91 60 h8 v16 h-8z M67 76 h8 v8 h-8z M83 76 h8 v8 h-8z M75 84 h8 v8 h-8z"
        fill="#C91D28" opacity="0.25" />

      {/* Large heart behind couple when high percent */}
      {percent >= 60 && (
        <path d="M100 55 h12 v12 h-12z M112 43 h12 v12 h-12z M88 43 h12 v12 h-12z M76 55 h12 v24 h-12z M124 55 h12 v24 h-12z M88 79 h12 v12 h-12z M112 79 h12 v12 h-12z M100 91 h12 v12 h-12z"
          fill="#E63946" opacity="0.3" />
      )}

      {/* ═══════════════════════════════════
           SARTHAK (LEFT) — darker brown skin
           ═══════════════════════════════════ */}

      {/* Head */}
      <rect x="38" y="58" width="34" height="34" fill="#8B5E3C" />
      {/* Skin highlight on forehead */}
      <rect x="40" y="60" width="28" height="6" fill="#9E6A44" />
      {/* Dark brown hair — thick, slight side part */}
      <rect x="34" y="50" width="42" height="14" fill="#2C1A0E" />
      <rect x="34" y="62" width="6" height="8"  fill="#2C1A0E" /> {/* sideburn */}
      <rect x="70" y="62" width="6" height="8"  fill="#2C1A0E" />
      {/* Eyes (dark, with whites) */}
      <rect x="43" y="70" width="8" height="6" fill="white" />
      <rect x="59" y="70" width="8" height="6" fill="white" />
      <rect x="46" y="71" width="4" height="4" fill="#1A0A00" />
      <rect x="62" y="71" width="4" height="4" fill="#1A0A00" />
      {/* Eye shine */}
      <rect x="47" y="71" width="1" height="1" fill="white" />
      <rect x="63" y="71" width="1" height="1" fill="white" />
      {/* Eyebrows */}
      <rect x="43" y="67" width="8" height="2" fill="#1A0A00" />
      <rect x="59" y="67" width="8" height="2" fill="#1A0A00" />
      {/* Nose */}
      <rect x="53" y="76" width="4" height="3" fill="#7A4E2E" />
      {/* Mouth — smile or kiss */}
      {isKissing
        ? <><rect x="51" y="82" width="8" height="3" fill="#D4654A" /><rect x="53" y="80" width="4" height="2" fill="#D4654A" /></>
        : <><rect x="49" y="82" width="12" height="2" fill="#8B1A1A" /><rect x="47" y="80" width="2" height="2" fill="#8B1A1A" /><rect x="61" y="80" width="2" height="2" fill="#8B1A1A" /></>}
      {/* Ear */}
      <rect x="34" y="70" width="6" height="10" fill="#8B5E3C" />
      <rect x="70" y="70" width="6" height="10" fill="#8B5E3C" />

      {/* Neck */}
      <rect x="48" y="92" width="14" height="10" fill="#8B5E3C" />

      {/* Body — Ferrari Red shirt */}
      <rect x="30" y="102" width="50" height="50" fill="#C91D28" />
      {/* Shirt collar */}
      <rect x="48" y="100" width="6" height="6" fill="#E8E8E8" />
      <rect x="52" y="100" width="6" height="6" fill="#E8E8E8" />
      {/* Shirt pocket detail */}
      <rect x="34" y="110" width="10" height="8" fill="#9B131C" />
      <rect x="36" y="112" width="6" height="4" fill="#C91D28" />
      {/* Shirt shade */}
      <rect x="30" y="102" width="6" height="50" fill="#9B131C" />
      <rect x="74" y="102" width="6" height="50" fill="#9B131C" />

      {/* Arms */}
      {/* Left arm resting */}
      <rect x="20" y="104" width="12" height="38" fill="#C91D28" />
      <rect x="20" y="140" width="12" height="10" fill="#8B5E3C" /> {/* hand */}
      {/* Right arm — hugging / normal */}
      {isHugging
        ? <><rect x="80" y="104" width="12" height="20" fill="#C91D28" /><rect x="80" y="124" width="30" height="8" fill="#C91D28" /><rect x="80" y="140" width="12" height="10" fill="#8B5E3C" /></>
        : <><rect x="80" y="104" width="12" height="38" fill="#C91D28" /><rect x="80" y="140" width="12" height="10" fill="#8B5E3C" /></>}

      {/* Legs */}
      <rect x="34" y="152" width="18" height="52" fill="#1A252C" />
      <rect x="58" y="152" width="18" height="52" fill="#1A252C" />
      {/* Pant crease */}
      <rect x="43" y="152" width="2" height="52" fill="#141E24" />
      <rect x="67" y="152" width="2" height="52" fill="#141E24" />
      {/* Shoes */}
      <rect x="30" y="202" width="22" height="8" fill="#111111" />
      <rect x="56" y="202" width="22" height="8" fill="#111111" />
      <rect x="30" y="206" width="22" height="4" fill="#222222" />
      <rect x="56" y="206" width="22" height="4" fill="#222222" />

      {/* Name tag */}
      <rect x="30" y="218" width="50" height="14" fill="#191919" />
      <text x="55" y="228" fill="#E9C55B" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">SARTHAK</text>

      {/* ═══════════════════════════════════
           GIRLFRIEND (RIGHT) — fair skin
           ═══════════════════════════════════ */}

      {/* Head */}
      <rect x="148" y="58" width="34" height="34" fill="#F5CDA9" />
      {/* Skin highlight */}
      <rect x="150" y="60" width="28" height="6" fill="#FDDCC0" />
      {/* Long dark hair — flowing over shoulders */}
      <rect x="142" y="48" width="46" height="18" fill="#2C1507" />
      <rect x="140" y="62" width="10" height="38" fill="#2C1507" /> {/* left hair falls */}
      <rect x="180" y="62" width="10" height="34" fill="#2C1507" /> {/* right hair falls */}
      <rect x="142" y="78" width="8" height="22" fill="#2C1507" /> {/* loose strand */}
      {/* Hair highlight */}
      <rect x="152" y="50" width="10" height="4" fill="#4A2810" />
      {/* Eyes (lighter, warmer) */}
      <rect x="153" y="70" width="8" height="6" fill="white" />
      <rect x="169" y="70" width="8" height="6" fill="white" />
      <rect x="156" y="71" width="4" height="4" fill="#3B1A0A" />
      <rect x="172" y="71" width="4" height="4" fill="#3B1A0A" />
      {/* Eye shine */}
      <rect x="157" y="71" width="1" height="1" fill="white" />
      <rect x="173" y="71" width="1" height="1" fill="white" />
      {/* Eyelashes (top line) */}
      <rect x="153" y="68" width="8" height="2" fill="#1A0A00" />
      <rect x="169" y="68" width="8" height="2" fill="#1A0A00" />
      {/* Eyebrows — slightly arched */}
      <rect x="154" y="66" width="6" height="2" fill="#2C1507" />
      <rect x="170" y="66" width="6" height="2" fill="#2C1507" />
      {/* Nose */}
      <rect x="163" y="76" width="4" height="3" fill="#E8B090" />
      {/* Blush cheeks */}
      <rect x="150" y="78" width="6" height="4" fill="#F4A0A0" opacity="0.7" />
      <rect x="174" y="78" width="6" height="4" fill="#F4A0A0" opacity="0.7" />
      {/* Mouth */}
      {isKissing
        ? <><rect x="161" y="82" width="8" height="3" fill="#D4654A" /><rect x="163" y="80" width="4" height="2" fill="#D4654A" /></>
        : <><rect x="159" y="82" width="12" height="2" fill="#D4654A" /><rect x="157" y="80" width="2" height="2" fill="#D4654A" /><rect x="171" y="80" width="2" height="2" fill="#D4654A" /></>}
      {/* Ear */}
      <rect x="142" y="70" width="8" height="10" fill="#F5CDA9" />
      <rect x="180" y="70" width="8" height="10" fill="#F5CDA9" />
      {/* Small earring */}
      <rect x="140" y="78" width="4" height="4" fill="#E9C55B" />

      {/* Neck */}
      <rect x="158" y="92" width="14" height="10" fill="#F5CDA9" />
      {/* Necklace */}
      <rect x="155" y="98" width="20" height="2" fill="#E9C55B" />
      <rect x="162" y="100" width="6" height="4" fill="#C8A33A" />

      {/* Body — emerald green sweater */}
      <rect x="140" y="102" width="50" height="50" fill="#2E8B57" />
      {/* Sweater collar V-neck */}
      <rect x="158" y="100" width="5" height="10" fill="#245C3A" />
      <rect x="167" y="100" width="5" height="10" fill="#245C3A" />
      {/* Sweater ribbed texture lines */}
      <rect x="140" y="114" width="50" height="2" fill="#245C3A" />
      <rect x="140" y="122" width="50" height="2" fill="#245C3A" />
      <rect x="140" y="130" width="50" height="2" fill="#245C3A" />
      <rect x="140" y="138" width="50" height="2" fill="#245C3A" />
      {/* Sweater side shade */}
      <rect x="140" y="102" width="6" height="50" fill="#245C3A" />
      <rect x="184" y="102" width="6" height="50" fill="#245C3A" />

      {/* Arms */}
      {/* Right arm resting */}
      <rect x="188" y="104" width="12" height="38" fill="#2E8B57" />
      <rect x="188" y="140" width="12" height="10" fill="#F5CDA9" /> {/* hand */}
      {/* Left arm — hugging / normal */}
      {isHugging
        ? <><rect x="128" y="104" width="12" height="20" fill="#2E8B57" /><rect x="108" y="124" width="30" height="8" fill="#2E8B57" /><rect x="128" y="140" width="12" height="10" fill="#F5CDA9" /></>
        : <><rect x="128" y="104" width="12" height="38" fill="#2E8B57" /><rect x="128" y="140" width="12" height="10" fill="#F5CDA9" /></>}

      {/* Skirt / Jeans */}
      <rect x="144" y="152" width="42" height="52" fill="#2B3A42" />
      {/* Skirt pleat detail */}
      <rect x="155" y="152" width="2" height="52" fill="#1E2B30" />
      <rect x="173" y="152" width="2" height="52" fill="#1E2B30" />
      {/* Shoes — strappy gold */}
      <rect x="142" y="202" width="20" height="8" fill="#E9C55B" />
      <rect x="168" y="202" width="20" height="8" fill="#E9C55B" />
      <rect x="142" y="206" width="20" height="4" fill="#C8A33A" />
      <rect x="168" y="206" width="20" height="4" fill="#C8A33A" />

      {/* Name tag */}
      <rect x="140" y="218" width="50" height="14" fill="#191919" />
      <text x="165" y="228" fill="#FF6B9D" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">GIRLFRIEND</text>

      {/* ── HELD HANDS IN MIDDLE ── */}
      {!isHugging && (
        <>
          <rect x="92"  y="140" width="16" height="10" fill="#8B5E3C" />
          <rect x="108" y="140" width="16" height="10" fill="#F5CDA9" />
          {/* Interlocked fingers */}
          <rect x="96"  y="138" width="4" height="4" fill="#8B5E3C" />
          <rect x="102" y="138" width="4" height="4" fill="#F5CDA9" />
          <rect x="108" y="138" width="4" height="4" fill="#F5CDA9" />
          <rect x="114" y="138" width="4" height="4" fill="#8B5E3C" />
        </>
      )}

      {/* ── KISS SPARKLES ── */}
      {isKissing && (
        <>
          <text x="100" y="58" fontFamily="monospace" fontSize="16">💋</text>
          <text x="112" y="44" fontFamily="monospace" fontSize="10">✨</text>
          <text x="88"  y="46" fontFamily="monospace" fontSize="10">✨</text>
        </>
      )}

      {/* ── HUG HEART (between them when hugging) ── */}
      {isHugging && !isKissing && (
        <text x="94" y="128" fontFamily="monospace" fontSize="20">❤️</text>
      )}
    </svg>
  );
}
