import React, { useState } from 'react';
import { Gift, ChevronRight, Heart, Cake, Gamepad2, Coffee, Sparkles, Award, CheckCircle } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import CouponDetail from '../components/CouponDetail';
import { audioEngine } from '../utils/audioSystem';

const iconMap = {
  heart: Heart,
  cake: Cake,
  gamepad: Gamepad2,
  coffee: Coffee,
  sparkles: Sparkles,
  award: Award,
};

export default function RewardShop() {
  const { state, nextScene } = useGame();
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const claimedCount = state.claimedCoupons.length;

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#1D1714] overflow-hidden select-none px-4 pt-16 pb-8">
      {/* Background Wood Shop Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E1A11] via-[#1F110B] to-[#120A06] -z-10" />

      {/* Decorative Wooden Beams */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#5A3825] border-b-2 border-black -z-5" />
      <div className="absolute top-4 left-8 sm:left-16 w-8 h-full bg-[#3D230D] border-x-2 border-black opacity-40 -z-5" />
      <div className="absolute top-4 right-8 sm:right-16 w-8 h-full bg-[#3D230D] border-x-2 border-black opacity-40 -z-5" />

      {/* Header Info */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-obsidian border-2 border-black font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 font-bold">
          <Gift className="w-4 h-4 text-ferrari" />
          <span>STAGE 3: {birthdayContent.rewardShopTitle}</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold">
          Birthday Reward Passes
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">
          {birthdayContent.rewardShopSubtitle}
        </p>
      </div>

      {/* Shopkeeper Trading Stall */}
      <div className="w-full max-w-4xl my-2 flex flex-col items-center z-10">
        {/* Stall Counter & Pixel Shopkeeper */}
        <div className="w-full max-w-md bg-[#5A3825] border-4 border-black p-3 flex items-center justify-between shadow-pixel mb-3">
          <div className="flex items-center gap-3">
            {/* Cute Pixel Shopkeeper Avatar */}
            <div className="w-12 h-12 bg-[#D4A373] border-2 border-black relative shrink-0">
              <div className="w-full h-3 bg-[#633A19]" /> {/* Villager cap */}
              <div className="w-3 h-4 bg-[#8D5524] absolute top-4 left-4" /> {/* Big Nose */}
              <div className="w-1 h-1 bg-black absolute top-5 left-2" />
              <div className="w-1 h-1 bg-black absolute top-5 right-2" />
            </div>

            <div>
              <div className="font-pixel text-[10px] text-gold uppercase">
                GIRLFRIEND'S TRADING BAZAAR
              </div>
              <p className="font-sans text-xs text-sandstone italic mt-0.5">
                "Special birthday currency: 100% free for Sarthak! Claim your passes below."
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-pixel text-[9px] text-mutedGrey block">CLAIMED</span>
            <span className="font-mono text-base font-bold text-grass">
              {claimedCount} / {birthdayContent.coupons.length}
            </span>
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
                onClick={() => {
                  audioEngine.playSfx('click');
                  setSelectedCoupon(coupon);
                }}
                className={`pixel-box p-3.5 cursor-pointer transition-all duration-150 hover:-translate-y-1 relative flex flex-col justify-between ${
                  isClaimed 
                    ? 'border-grass bg-grass/15 shadow-pixel-sm' 
                    : 'border-black bg-obsidian-card hover:border-gold shadow-pixel'
                }`}
              >
                {/* Claimed Ribbon */}
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
                      <span className="text-[9px] font-mono text-gold uppercase tracking-wider">
                        {coupon.tag || 'Reward'}
                      </span>
                      <h4 className="font-pixel text-xs text-pixelWhite font-bold line-clamp-1">
                        {coupon.title}
                      </h4>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-mutedGrey mt-2 line-clamp-2 leading-relaxed">
                    {coupon.description}
                  </p>
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

      {/* Selected Coupon Modal */}
      {selectedCoupon && (
        <CouponDetail
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
        />
      )}

      {/* Navigation to next stage */}
      <div className="z-10 w-full max-w-md flex justify-center mt-3">
        <button
          onClick={nextScene}
          className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg"
        >
          <span>CONTINUE ADVENTURE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
