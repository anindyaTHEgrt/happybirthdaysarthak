import React, { useState, useEffect } from 'react';
import { FastForward, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audioSystem';

export default function DialogueBox({ 
  lines = [], 
  speaker = "Game Master", 
  onComplete,
  buttonLabel = "CONTINUE",
  className = "" 
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText = lines[currentLineIndex] || "";

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [currentLineIndex, fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTyping(false);
  };

  const handleNextLine = () => {
    audioEngine.playSfx('click');
    if (isTyping) {
      handleSkipTyping();
      return;
    }

    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const isLastLine = currentLineIndex >= lines.length - 1;

  return (
    <div className={`pixel-box p-4 bg-obsidian/95 border-4 border-black text-pixelWhite ${className}`}>
      {/* Speaker Bar */}
      <div className="flex items-center justify-between border-b-2 border-obsidian-border pb-2 mb-3">
        <span className="font-pixel text-[11px] text-gold uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <span className="inline-block w-2 h-2 bg-ferrari"></span>
          {speaker}
        </span>
        <div className="flex items-center gap-2">
          {lines.length > 1 && (
            <span className="font-mono text-xs text-mutedGrey">
              {currentLineIndex + 1} / {lines.length}
            </span>
          )}
          {isTyping && (
            <button
              onClick={handleSkipTyping}
              className="font-pixel text-[9px] text-mutedGrey hover:text-white flex items-center gap-1 px-1.5 py-0.5 bg-black/60 border border-obsidian-border"
              title="Skip typing"
            >
              <FastForward className="w-3 h-3" /> SKIP
            </button>
          )}
        </div>
      </div>

      {/* Dialogue Content */}
      <div className="min-h-[3.5rem] py-1 font-sans text-sm sm:text-base leading-relaxed text-pixelWhite font-medium">
        {displayedText}
        {isTyping && <span className="inline-block w-2 h-4 bg-gold ml-1 cursor-blink" />}
      </div>

      {/* Action / Next Button */}
      <div className="mt-4 pt-2 border-t-2 border-obsidian-border flex justify-end">
        <button
          onClick={handleNextLine}
          className={`pixel-btn ${isLastLine && !isTyping ? 'pixel-btn-red' : 'pixel-btn-gold'} !py-1.5 !px-4 flex items-center gap-2`}
        >
          <span>{isTyping ? 'COMPLETE TEXT' : (isLastLine ? buttonLabel : 'NEXT')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
