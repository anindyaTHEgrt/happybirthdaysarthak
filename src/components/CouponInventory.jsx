import React, { useState, useEffect } from 'react';
import { X, Gift, Heart, Cake, Gamepad2, Coffee, Sparkles, Award, CheckCircle } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import CouponDetail from './CouponDetail';

const iconMap = {
  heart: Heart,
  cake: Cake,
  gamepad: Gamepad2,
  coffee: Coffee,
  sparkles: Sparkles,
  award: Award,
};

export default function CouponInventory() {
  const { isCouponsOpen, setIsCouponsOpen, state } = useGame();
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCouponsOpen && !selectedCoupon) {
        setIsCouponsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCouponsOpen, setIsCouponsOpen, selectedCoupon]);

  if (!isCouponsOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupons-title"
      >
        <div className="pixel-box w-full max-w-2xl max-h-[90vh] flex flex-col bg-obsidian text-pixelWhite overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-4 border-black bg-obsidian-card">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-ferrari-light" />
              <div>
                <h2 id="coupons-title" className="font-pixel text-sm sm:text-base text-ferrari-light">
                  My Birthday Reward Passes
                </h2>
                <p className="font-sans text-xs text-mutedGrey">
                  {state.claimedCoupons.length} of {birthdayContent.coupons.length} Claimed
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCouponsOpen(false)}
              className="pixel-btn pixel-btn-dark !p-2"
              aria-label="Close coupons"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid of Coupons */}
          <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {birthdayContent.coupons.map((coupon) => {
              const isClaimed = state.claimedCoupons.includes(coupon.id);
              const Icon = iconMap[coupon.icon] || Heart;

              return (
                <div
                  key={coupon.id}
                  onClick={() => setSelectedCoupon(coupon)}
                  className={`p-3.5 border-2 cursor-pointer transition-transform hover:-translate-y-0.5 relative flex flex-col justify-between ${
                    isClaimed
                      ? 'border-grass bg-grass/10 shadow-pixel-sm'
                      : 'border-obsidian-border bg-obsidian-card hover:border-gold'
                  }`}
                >
                  {isClaimed && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-grass text-white text-[9px] font-pixel px-1.5 py-0.5 border border-black">
                      <CheckCircle className="w-3 h-3" /> CLAIMED
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-ferrari text-white border-2 border-black shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-gold">
                        {coupon.tag || 'Reward'}
                      </span>
                      <h4 className="font-pixel text-xs text-pixelWhite mt-0.5 line-clamp-1">
                        {coupon.title}
                      </h4>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-mutedGrey mt-2 line-clamp-2">
                    {coupon.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-obsidian-border flex items-center justify-between text-[10px] font-pixel text-gold">
                    <span>INSPECT TICKET →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t-4 border-black bg-obsidian-card text-center">
            <button
              onClick={() => setIsCouponsOpen(false)}
              className="pixel-btn pixel-btn-gold w-full sm:w-auto"
            >
              CLOSE INVENTORY
            </button>
          </div>
        </div>
      </div>

      {/* Selected detail */}
      {selectedCoupon && (
        <CouponDetail
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
        />
      )}
    </>
  );
}
