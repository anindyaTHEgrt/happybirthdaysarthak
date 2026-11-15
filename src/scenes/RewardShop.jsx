import React, { useState } from 'react';
import { Gift, ChevronRight, Heart, Cake, Gamepad2, Coffee, Sparkles, Award, CheckCircle } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import CouponDetail from '../components/CouponDetail';
import { audioEngine } from '../utils/audioSystem';

/* ─────────────── Injected keyframe styles ─────────────── */
const shopStyles = `
  @keyframes lanternSway {
    0%, 100% { transform: rotate(-6deg); }
    50%       { transform: rotate(6deg); }
  }
  @keyframes bannerWave {
    0%, 100% { transform: skewX(-2deg); }
    50%       { transform: skewX(2deg); }
  }
  @keyframes dustMote {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    30%  { opacity: 0.5; }
    70%  { opacity: 0.5; }
    100% { transform: translateY(-60px) translateX(var(--dx)); opacity: 0; }
  }
  @keyframes shelfGlow {
    0%, 100% { box-shadow: inset 0 -2px 8px rgba(255,180,0,0.2); }
    50%       { box-shadow: inset 0 -2px 16px rgba(255,180,0,0.5); }
  }
  .anim-lantern  { animation: lanternSway 3s ease-in-out infinite; transform-origin: top center; }
  .anim-banner   { animation: bannerWave 4s ease-in-out infinite; }
  .anim-dust     { animation: dustMote var(--dd) ease-in-out infinite; }
  .anim-shelfglo { animation: shelfGlow 3s ease-in-out infinite; }
`;

const iconMap = {
  heart: Heart, cake: Cake, gamepad: Gamepad2,
  coffee: Coffee, sparkles: Sparkles, award: Award,
};

/** Hanging lantern component */
function Lantern({ left, delay = 0 }) {
  return (
    <div className="absolute top-8 pointer-events-none" style={{ left, zIndex: 4 }}>
      {/* Rope */}
      <div style={{ width: 2, height: 20, background: '#7a5230', margin: '0 auto 0 auto' }} />
      {/* Lantern body */}
      <div className="anim-lantern flex items-center justify-center"
           style={{
             width: 18, height: 26,
             background: 'linear-gradient(135deg, #8B4513, #5a2d0c)',
             border: '2px solid #3d1f08',
             boxShadow: '0 0 14px 6px rgba(255,160,0,0.5)',
             animationDelay: `${delay}s`,
           }}>
        <div style={{ width: 10, height: 14, background: '#FFB800', opacity: 0.9,
                      boxShadow: '0 0 8px 3px rgba(255,200,0,0.7)', borderRadius: 1 }} />
      </div>
      {/* Glow pool on floor */}
      <div style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
        width: 60, height: 20,
        background: 'radial-gradient(ellipse, rgba(255,180,0,0.15) 0%, transparent 70%)',
        marginTop: 2,
      }} />
    </div>
  );
}

/** Decorative triangular bunting banner */
function BuntingBanner({ colors, top, left, right }) {
  return (
    <div className="absolute flex gap-0 pointer-events-none" style={{ top, left, right, zIndex: 3 }}>
      {/* String */}
      <div style={{ position: 'absolute', top: 2, left: 0, right: 0, height: 2, background: '#5a3a1a', opacity: 0.7 }} />
      {colors.map((c, i) => (
        <div key={i} className="anim-banner flex-shrink-0"
             style={{
               width: 18, height: 22, background: c,
               border: '1px solid rgba(0,0,0,0.5)',
               clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
               marginRight: 4,
               animationDelay: `${i * 0.3}s`,
             }} />
      ))}
    </div>
  );
}

/** Display shelf with items */
function DisplayShelf({ items, label }) {
  return (
    <div className="absolute bottom-16 pointer-events-none" style={{ left: '4%' }}>
      <div className="font-pixel text-[7px] text-sandstone mb-1 ml-1">{label}</div>
      <div className="anim-shelfglo flex gap-2 p-1.5"
           style={{ background: 'linear-gradient(90deg, #5a3416, #4a2a0e)', border: '2px solid #3d2208', minWidth: 100 }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center anim-float" style={{ animationDelay: `${i * 0.4}s` }}>
            <div style={{ fontSize: 16 }}>{item.emoji}</div>
            <div className="font-pixel text-[6px] text-sandstone mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
      {/* Shelf board */}
      <div style={{ height: 6, background: '#3d2208', border: '1px solid #000', borderTop: '2px solid #6b4423' }} />
    </div>
  );
}

export default function RewardShop() {
  const { state, nextScene } = useGame();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const claimedCount = state.claimedCoupons.length;

  /* Dust motes */
  const dustMotes = Array.from({ length: 8 }).map((_, i) => ({
    left: `${10 + i * 11}%`,
    top:  `${40 + (i * 7) % 40}%`,
    '--dx': `${(i % 2 === 0 ? -1 : 1) * (8 + i * 3)}px`,
    '--dd': `${4 + i * 0.7}s`,
    animationDelay: `${i * 0.6}s`,
  }));

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-hidden select-none px-4 pt-16 pb-8"
         style={{ background: '#1a0d07' }}>
      <style>{shopStyles}</style>

      {/* ── Multi-layer cozy wooden interior ── */}
      {/* Back wall */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, #2a1508 0%, #1a0d05 60%, #120800 100%)' }} />

      {/* Wood plank texture - vertical panels */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0"
               style={{
                 left: `${i * 8.33}%`, width: '8.33%',
                 borderRight: '2px solid rgba(0,0,0,0.4)',
                 background: i % 2 === 0
                   ? 'linear-gradient(90deg, rgba(90,52,22,0.08), rgba(60,30,8,0.15))'
                   : 'linear-gradient(90deg, rgba(60,30,8,0.1), rgba(90,52,22,0.05))',
               }} />
        ))}
        {/* Horizontal cross-beams */}
        {[15, 45, 75].map((pct, i) => (
          <div key={i} className="absolute left-0 right-0"
               style={{ top: `${pct}%`, height: 8, background: '#3d2208', border: '1px solid #000', opacity: 0.5 }} />
        ))}
      </div>

      {/* ── Ceiling beam ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 5 }}>
        <div style={{ height: 16, background: 'linear-gradient(180deg, #2a1508, #3d2208)', border: '2px solid #000' }} />
        {/* Ceiling hooks */}
        {[12, 32, 52, 70, 88].map((left, i) => (
          <div key={i} className="absolute top-0" style={{ left: `${left}%`, width: 3, height: 10, background: '#5a3416' }} />
        ))}
      </div>

      {/* ── Hanging lanterns ── */}
      <Lantern left="10%"  delay={0} />
      <Lantern left="30%"  delay={0.8} />
      <Lantern left="52%"  delay={1.4} />
      <Lantern left="72%"  delay={0.4} />
      <Lantern left="88%"  delay={1.1} />

      {/* ── Bunting banners ── */}
      <BuntingBanner
        colors={['#e53e3e','#FFD700','#22c55e','#3b82f6','#e53e3e','#FFD700','#9333ea','#f97316','#e53e3e','#FFD700']}
        top={28} left="0" right="0"
      />
      <BuntingBanner
        colors={['#9333ea','#f97316','#e53e3e','#22c55e','#FFD700','#3b82f6','#f97316','#9333ea']}
        top={48} left="5%" right="5%"
      />

      {/* ── Item display shelf (left side) ── */}
      <DisplayShelf
        label="TODAY'S SPECIAL"
        items={[{ emoji: '💝', label: 'Love' }, { emoji: '🎂', label: 'Cake' }, { emoji: '🎁', label: 'Gift' }]}
      />

      {/* ── Side wooden beams ── */}
      <div className="absolute top-16 bottom-0 pointer-events-none" style={{ left: '4%', width: 10, background: '#3d2208', border: '1px solid #000', opacity: 0.5 }} />
      <div className="absolute top-16 bottom-0 pointer-events-none" style={{ right: '4%', width: 10, background: '#3d2208', border: '1px solid #000', opacity: 0.5 }} />

      {/* ── Dust motes floating ── */}
      {dustMotes.map((d, i) => (
        <div key={i} className="anim-dust absolute rounded-full pointer-events-none"
             style={{ width: 3, height: 3, background: 'rgba(255,200,100,0.6)', ...d, zIndex: 2 }} />
      ))}

      {/* ── Floor boards ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 32, zIndex: 1 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0"
               style={{
                 left: `${i * 12.5}%`, width: '12.5%',
                 background: i % 2 === 0 ? '#3d2208' : '#4a2c0e',
                 borderRight: '1px solid #2a1508',
                 borderTop: '2px solid #5a3416',
               }} />
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 font-bold"
             style={{ background: '#FFD700', color: '#1a0d07', border: '2px solid #000' }}>
          <Gift className="w-4 h-4 text-ferrari" />
          <span>STAGE 3: {birthdayContent.rewardShopTitle}</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold drop-shadow-lg">
          Birthday Reward Passes
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">{birthdayContent.rewardShopSubtitle}</p>
      </div>

      {/* ── Shop Content ── */}
      <div className="w-full max-w-4xl my-2 flex flex-col items-center z-10">
        {/* Shopkeeper stall counter */}
        <div className="w-full max-w-md p-3 flex items-center justify-between shadow-pixel mb-3"
             style={{ background: 'linear-gradient(90deg, #5a3825, #4a2d14)', border: '4px solid #000' }}>
          <div className="flex items-center gap-3">
            {/* Shopkeeper pixel avatar */}
            <div className="relative shrink-0" style={{ width: 48, height: 52 }}>
              {/* Hat */}
              <div style={{ width: 48, height: 10, background: '#8B1a1a', border: '2px solid #000' }} />
              {/* Hat brim */}
              <div style={{ width: 54, height: 5, background: '#6b1414', border: '1px solid #000', marginLeft: -3, marginTop: -1 }} />
              {/* Face */}
              <div style={{ width: 36, height: 28, background: '#D4A373', border: '2px solid #000', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 6, padding: '0 6px' }}>
                  <div style={{ width: 5, height: 5, background: '#000', borderRadius: 1 }} />
                  <div style={{ width: 5, height: 5, background: '#000', borderRadius: 1 }} />
                </div>
                <div style={{ width: 10, height: 4, background: '#8D5524', border: '1px solid #000', margin: '4px auto 0' }} />
                <div style={{ width: 14, height: 3, background: '#c06040', border: '1px solid #000', margin: '2px auto 0', borderRadius: 1 }} />
              </div>
              {/* Body */}
              <div style={{ width: 36, height: 10, background: '#3d6b2c', border: '2px solid #000', borderTop: 'none', margin: '0 auto' }} />
            </div>

            <div>
              <div className="font-pixel text-[10px] text-gold uppercase">GIRLFRIEND'S TRADING BAZAAR</div>
              <p className="font-sans text-xs text-sandstone italic mt-0.5">
                "Special birthday currency: 100% free for Sarthak! Claim your passes below."
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-pixel text-[9px] text-mutedGrey block">CLAIMED</span>
            <span className="font-mono text-base font-bold text-grass">{claimedCount} / {birthdayContent.coupons.length}</span>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {birthdayContent.coupons.map((coupon) => {
            const isClaimed = state.claimedCoupons.includes(coupon.id);
            const Icon = iconMap[coupon.icon] || Heart;
            return (
              <div
                key={coupon.id}
                onClick={() => { audioEngine.playSfx('click'); setSelectedCoupon(coupon); }}
                className={`pixel-box p-3.5 cursor-pointer transition-all duration-150 hover:-translate-y-1 relative flex flex-col justify-between ${
                  isClaimed
                    ? 'border-grass bg-grass/15 shadow-pixel-sm'
                    : 'border-black bg-obsidian-card hover:border-gold shadow-pixel'
                }`}
              >
                {isClaimed && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-grass text-white text-[8px] font-pixel px-1.5 py-0.5 border border-black font-bold">
                    <CheckCircle className="w-3 h-3" /> CLAIMED
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-ferrari text-white border-2 border-black shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-gold uppercase tracking-wider">{coupon.tag || 'Reward'}</span>
                      <h4 className="font-pixel text-xs text-pixelWhite font-bold line-clamp-1">{coupon.title}</h4>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-mutedGrey mt-2 line-clamp-2 leading-relaxed">{coupon.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-obsidian-border flex items-center justify-between text-[10px] font-pixel">
                  <span className={isClaimed ? 'text-grass font-bold' : 'text-gold'}>
                    {isClaimed ? '✓ IN INVENTORY' : 'TAP TO INSPECT →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coupon Modal */}
      {selectedCoupon && <CouponDetail coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />}

      {/* Navigation */}
      <div className="z-10 w-full max-w-md flex justify-center mt-3">
        <button onClick={nextScene} className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg">
          <span>CONTINUE ADVENTURE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
