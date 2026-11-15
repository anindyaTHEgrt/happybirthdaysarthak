import React from 'react';
import { SCENES } from '../data/sceneConfig';
import { useGame } from '../context/GameContext';

export default function ProgressTracker({ compact = false }) {
  const { state, goToScene } = useGame();

  const currentSceneIndex = SCENES.findIndex(s => s.id === state.currentScene);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5" aria-label="Game scene progress">
        {SCENES.map((scene, idx) => {
          const isCurrent = scene.id === state.currentScene;
          const isCompleted = state.completedScenes.includes(scene.id);
          const canJump = isCompleted || isCurrent;

          return (
            <button
              key={scene.id}
              disabled={!canJump}
              onClick={() => canJump && goToScene(scene.id)}
              aria-label={`Scene ${idx + 1}: ${scene.title} ${isCompleted ? '(Completed)' : ''} ${isCurrent ? '(Current)' : ''}`}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black transition-transform ${
                isCurrent
                  ? 'bg-ferrari scale-125 ring-2 ring-gold'
                  : isCompleted
                  ? 'bg-grass hover:scale-110 cursor-pointer'
                  : 'bg-black/60 opacity-40 cursor-not-allowed'
              }`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full bg-obsidian-card p-3 border-2 border-black">
      <div className="flex items-center justify-between mb-2">
        <span className="font-pixel text-[10px] text-gold uppercase">
          Grand Prix Timeline
        </span>
        <span className="font-mono text-xs text-mutedGrey">
          Stage {currentSceneIndex + 1} / {SCENES.length}
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {SCENES.map((scene, idx) => {
          const isCurrent = scene.id === state.currentScene;
          const isCompleted = state.completedScenes.includes(scene.id);
          const canJump = isCompleted || isCurrent;

          return (
            <button
              key={scene.id}
              disabled={!canJump}
              onClick={() => canJump && goToScene(scene.id)}
              className={`p-1.5 text-center border-2 transition-all ${
                isCurrent
                  ? 'border-gold bg-ferrari text-white shadow-pixel-sm'
                  : isCompleted
                  ? 'border-grass bg-forest text-pixelWhite hover:border-gold cursor-pointer'
                  : 'border-obsidian-border bg-black/50 text-mutedGrey opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="font-mono text-[9px]">{idx + 1}</div>
              <div className="font-pixel text-[8px] truncate mt-0.5">
                {scene.shortTitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
