import React from 'react';
import { X, Heart, Cake, Gamepad2, Coffee, Sparkles, Award, CheckCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

const iconMap = {
  heart: Heart,
  cake: Cake,
  gamepad: Gamepad2,
  coffee: Coffee,
  sparkles: Sparkles,
  award: Award,
};

export default function CouponDetail({ coupon, onClose }) {
  const { state, dispatch } = useGame();

  if (!coupon) return null;

  const isClaimed = state.claimedCoupons.includes(coupon.id);
  const Icon = iconMap[coupon.icon] || Heart;

  const handleClaim = () => {
    dispatch({ type: 'CLAIM_COUPON', payload: coupon.id });
    audioEngine.playSfx('claim');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupon-modal-title"
    >
      <div className="pixel-box-sandstone w-full max-w-md p-6 relative text-obsidian shadow-pixel-lg animate-bounce-pixel">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close coupon detail"
          className="absolute top-3 right-3 p-1.5 bg-obsidian text-sandstone border-2 border-black hover:bg-black"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ticket Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-obsidian/40">
          <div className="inline-flex p-3 bg-ferrari text-white border-2 border-black mb-2 shadow-pixel-sm">
            <Icon className="w-8 h-8" />
          </div>
          <div className="text-[11px] font-pixel text-ferrari uppercase tracking-wider font-bold">
            Official Birthday Pass #{coupon.id.toUpperCase()}
          </div>
          <h3 id="coupon-modal-title" className="font-pixel text-base sm:text-lg text-obsidian mt-1 font-bold">
            {coupon.title}
          </h3>
        </div>

        {/* Coupon Body */}
        <div className="py-4 space-y-3 text-sm font-sans">
          <div>
            <h4 className="font-pixel text-[10px] text-obsidian/70 uppercase">Reward Description:</h4>
            <p className="mt-1 text-obsidian font-medium leading-relaxed bg-white/50 p-2.5 border border-obsidian/20">
              {coupon.description}
            </p>
          </div>

          <div>
            <h4 className="font-pixel text-[10px] text-obsidian/70 uppercase">How To Redeem:</h4>
            <p className="mt-1 text-obsidian/90 text-xs italic bg-white/40 p-2 border border-obsidian/20">
              {coupon.redemptionInstructions}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-obsidian/20">
            <span>EXPIRY: NEVER EXPIRES</span>
            <span>ISSUED BY: GIRLFRIEND</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          {isClaimed ? (
            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-grass text-white border-2 border-black font-pixel text-xs">
              <CheckCircle className="w-4 h-4" /> CLAIMED TO INVENTORY
            </div>
          ) : (
            <button
              onClick={handleClaim}
              className="pixel-btn pixel-btn-red w-full !text-sm"
            >
              CLAIM REWARD PASS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
