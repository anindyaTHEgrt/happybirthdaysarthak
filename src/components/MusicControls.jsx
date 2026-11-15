import React from 'react';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function MusicControls() {
  const { state, dispatch } = useGame();

  const toggleMusic = () => {
    const next = !state.musicEnabled;
    audioEngine.playSfx('click');
    dispatch({ type: 'TOGGLE_MUSIC', payload: next });
  };

  const toggleSound = () => {
    const next = !state.soundEnabled;
    audioEngine.playSfx('click');
    dispatch({ type: 'TOGGLE_SOUND', payload: next });
  };

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Audio Controls">
      {/* Background Music Toggle */}
      <button
        onClick={toggleMusic}
        aria-label={state.musicEnabled ? 'Disable background music' : 'Enable background music'}
        title={state.musicEnabled ? 'BGM: ON (Click to Mute)' : 'BGM: MUTED (Click to Play)'}
        className={`p-1.5 border-2 border-black transition-colors ${
          state.musicEnabled
            ? 'bg-gold text-obsidian shadow-pixel-sm'
            : 'bg-obsidian-card text-mutedGrey hover:text-white'
        }`}
      >
        <Music className="w-4 h-4" />
      </button>

      {/* Sound Effects Toggle */}
      <button
        onClick={toggleSound}
        aria-label={state.soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
        title={state.soundEnabled ? 'SFX: ON' : 'SFX: MUTED'}
        className={`p-1.5 border-2 border-black transition-colors ${
          state.soundEnabled
            ? 'bg-ferrari text-white shadow-pixel-sm'
            : 'bg-obsidian-card text-mutedGrey hover:text-white'
        }`}
      >
        {state.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
}
