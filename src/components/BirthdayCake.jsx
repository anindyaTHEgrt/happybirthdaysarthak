import React from 'react';
import Candle from './Candle';
import { birthdayContent } from '../data/birthdayContent';

export default function BirthdayCake({ 
  candlesCount = 5, 
  extinguishedCandles = [], 
  onExtinguishCandle,
  onExtinguishAll
}) {
  const candlesList = Array.from({ length: candlesCount }, (_, i) => `candle-${i + 1}`);
  const remainingCount = candlesCount - extinguishedCandles.length;

  return (
    <div className="flex flex-col items-center select-none max-w-lg w-full">
      {/* Candle row placed precisely on top of cake */}
      <div className="flex justify-center items-end gap-3 sm:gap-5 mb-0 z-10">
        {candlesList.map((id, index) => (
          <Candle
            key={id}
            id={id}
            index={index}
            isLit={!extinguishedCandles.includes(id)}
            onExtinguish={onExtinguishCandle}
          />
        ))}
      </div>

      {/* Birthday Cake Structure (Pixel Art Blocks) */}
      <div className="relative w-64 sm:w-80 flex flex-col items-center">
        {/* Tier 1 (Top Frosting Layer with Golden Number 25 Topper) */}
        <div className="relative w-52 sm:w-60 h-16 bg-[#5A3825] border-4 border-black flex flex-col justify-between shadow-pixel">
          {/* Vanilla Cream Frosting Dripping */}
          <div className="h-6 bg-[#FFF2DE] border-b-2 border-black/30 flex justify-between px-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 bg-[#FFF2DE] rounded-b-sm border-b-2 border-black/20"
                style={{ height: i % 2 === 0 ? '16px' : '10px' }}
              />
            ))}
          </div>

          {/* Strawberry / Cherry Toppings */}
          <div className="absolute -top-3 left-0 right-0 flex justify-around px-4">
            <div className="w-3 h-3 bg-ferrari border border-black shadow-pixel-sm" />
            <div className="w-3 h-3 bg-ferrari border border-black shadow-pixel-sm" />
            <div className="w-3 h-3 bg-ferrari border border-black shadow-pixel-sm" />
            <div className="w-3 h-3 bg-ferrari border border-black shadow-pixel-sm" />
          </div>

          {/* Golden Badge: 25 */}
          <div className="self-center mb-1 px-3 py-0.5 bg-gold border-2 border-black shadow-pixel-sm flex items-center gap-1.5">
            <span className="font-pixel text-xs text-obsidian font-bold">LEVEL 25</span>
          </div>
        </div>

        {/* Tier 2 (Bottom Wider Sponge Layer) */}
        <div className="w-64 sm:w-76 h-20 bg-[#442818] border-4 border-t-0 border-black flex flex-col justify-between shadow-pixel-lg">
          {/* Middle Strawberry Cream Strip */}
          <div className="h-4 bg-ferrari border-y-2 border-black/40 flex items-center justify-around">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#FFF2DE]" />
            ))}
          </div>

          {/* Sponge Cake Base Texture */}
          <div className="p-2 flex justify-around opacity-40">
            <div className="w-2 h-2 bg-black" />
            <div className="w-2 h-2 bg-black" />
            <div className="w-2 h-2 bg-black" />
            <div className="w-2 h-2 bg-black" />
          </div>

          {/* Base Rim Plate */}
          <div className="h-3 bg-[#E9D9B5] border-t-2 border-black" />
        </div>

        {/* Cake Platter */}
        <div className="w-72 sm:w-88 h-4 bg-[#CCCCCC] border-2 border-black shadow-pixel mt-0.5" />
      </div>

      {/* Fallback button if user wants to blow out all candles */}
      {remainingCount > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={onExtinguishAll}
            className="font-pixel text-[10px] text-mutedGrey hover:text-gold underline underline-offset-4 focus:outline-none focus:text-gold"
          >
            💨 Blow out all candles at once
          </button>
        </div>
      )}
    </div>
  );
}
