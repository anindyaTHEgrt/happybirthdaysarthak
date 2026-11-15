import React, { useEffect } from 'react';
import { X, Trophy, Award, Flag, Box, Sparkles, Gamepad, Heart, CheckCircle2, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';
import { useGame } from '../context/GameContext';

const iconMap = {
  trophy: Trophy,
  award: Award,
  flag: Flag,
  box: Box,
  sparkles: Sparkles,
  gamepad: Gamepad,
  heart: Heart,
};

export default function AchievementCollection() {
  const { isAchievementsOpen, setIsAchievementsOpen, state } = useGame();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAchievementsOpen) {
        setIsAchievementsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAchievementsOpen, setIsAchievementsOpen]);

  if (!isAchievementsOpen) return null;

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievements-title"
    >
      <div className="pixel-box w-full max-w-2xl max-h-[90vh] flex flex-col bg-obsidian text-pixelWhite overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-obsidian-card">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-gold" />
            <div>
              <h2 id="achievements-title" className="font-pixel text-sm sm:text-base text-gold">
                Achievements Hall
              </h2>
              <p className="font-sans text-xs text-mutedGrey">
                {unlockedCount} of {totalCount} Unlocked ({progressPercent}%)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAchievementsOpen(false)}
            className="pixel-btn pixel-btn-dark !p-2"
            aria-label="Close achievements"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 bg-black/50 border-b-2 border-obsidian-border">
          <div className="w-full bg-obsidian h-3 border border-black overflow-hidden">
            <div 
              className="bg-gold h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Achievements List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = state.unlockedAchievements.includes(ach.id);
            const Icon = iconMap[ach.icon] || Trophy;

            return (
              <div
                key={ach.id}
                className={`p-3.5 border-2 transition-all flex items-start gap-4 ${
                  isUnlocked 
                    ? 'border-gold bg-obsidian-card/80 shadow-pixel-sm' 
                    : 'border-obsidian-border bg-black/40 opacity-60'
                }`}
              >
                <div 
                  className={`p-2.5 border-2 shrink-0 ${
                    isUnlocked 
                      ? 'border-black bg-gold text-obsidian' 
                      : 'border-obsidian-border bg-obsidian text-mutedGrey'
                  }`}
                >
                  {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-pixel text-xs sm:text-sm truncate ${isUnlocked ? 'text-gold' : 'text-mutedGrey'}`}>
                      {ach.title}
                    </h3>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 font-pixel text-[10px] text-grass font-bold shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED
                      </span>
                    ) : (
                      <span className="font-pixel text-[10px] text-mutedGrey shrink-0">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-pixelWhite/80 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-4 border-black bg-obsidian-card text-center">
          <button
            onClick={() => setIsAchievementsOpen(false)}
            className="pixel-btn pixel-btn-gold w-full sm:w-auto"
          >
            CLOSE HALL
          </button>
        </div>
      </div>
    </div>
  );
}
