import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioSystem';

export default function FireworksOverlay({ active = false }) {
  const isReducedMotion = useRef(
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!active || isReducedMotion.current) return;

    // Trigger audio firework bursts
    audioEngine.playSfx('podium');
    audioEngine.playSfx('firework');

    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      // Launch left and right cannon bursts
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C91D28', '#E9C55B', '#4D9B56', '#F5F1E8']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C91D28', '#E9C55B', '#4D9B56', '#F5F1E8']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Heart bursts
    const heartInterval = setInterval(() => {
      audioEngine.playSfx('firework');
      confetti({
        particleCount: 20,
        spread: 80,
        origin: { y: 0.6, x: Math.random() * 0.6 + 0.2 },
        shapes: ['circle', 'square'],
        colors: ['#C91D28', '#E63946', '#FFB703', '#FFFFFF']
      });
    }, 1400);

    return () => clearInterval(heartInterval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Driving Pixel Racing Car at bottom celebrating */}
      <div 
        className="absolute bottom-4 left-0 w-48 sm:w-64"
        style={{
          animation: 'carDriveAcross 6s linear infinite',
        }}
      >
        <img
          src="assets/sprites/ferrari-car.svg"
          alt="Victory car celebration"
          className="w-full h-auto pixelated drop-shadow-lg"
        />
      </div>

      {/* Retro pixel starbursts in corners */}
      <div className="absolute top-16 left-8 font-pixel text-gold text-lg sm:text-2xl animate-pulse">
        ★ ✨ ★
      </div>
      <div className="absolute top-20 right-8 font-pixel text-ferrari text-lg sm:text-2xl animate-pulse">
        ★ 🏁 ★
      </div>
    </div>
  );
}
