import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationDialog({ 
  isOpen, 
  title = "Reset Adventure?", 
  message = "Are you sure you want to reset all your progress, unlocked achievements, and claimed coupons? This cannot be undone.",
  confirmLabel = "YES, RESET",
  cancelLabel = "CANCEL",
  onConfirm, 
  onCancel 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div className="pixel-box w-full max-w-md p-6 bg-obsidian text-pixelWhite border-4 border-ferrari shadow-pixel-lg animate-bounce-pixel">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-ferrari text-white border-2 border-black shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="flex-1">
            <h3 id="confirm-dialog-title" className="font-pixel text-sm sm:text-base text-ferrari-light font-bold">
              {title}
            </h3>
            <p id="confirm-dialog-desc" className="font-sans text-xs sm:text-sm text-mutedGrey mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end border-t-2 border-obsidian-border pt-4">
          <button
            onClick={onCancel}
            className="pixel-btn pixel-btn-dark !py-2 !px-4 order-2 sm:order-1"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="pixel-btn pixel-btn-red !py-2 !px-4 order-1 sm:order-2"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
