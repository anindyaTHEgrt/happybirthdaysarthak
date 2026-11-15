/*
================================================================================
SYNTHESIZED 8-BIT AUDIO SYSTEM (WEB AUDIO API)
================================================================================
Completely original, copyright-free, zero-asset-dependency chiptune audio engine.
Provides background music and retro sound effects that work offline and online.
================================================================================
*/

class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmOsc1 = null;
    this.bgmOsc2 = null;
    this.bgmGain = null;
    this.bgmInterval = null;
    this.isBgmPlaying = false;
    this.musicEnabled = false;
    this.soundEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  // Play retro sound effect
  playSfx(name) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      switch (name) {
        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'countdown': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        }

        case 'countdown-go': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, now);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }

        case 'collect': {
          // Retro coin chime
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = 'sine';
          osc2.type = 'square';
          osc1.frequency.setValueAtTime(987.77, now); // B5
          osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6
          osc2.frequency.setValueAtTime(987.77 / 2, now);
          osc2.frequency.setValueAtTime(1318.51 / 2, now + 0.08);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.3);
          osc2.stop(now + 0.3);
          break;
        }

        case 'chest': {
          // Mystery unlock arpeggio
          const notes = [440, 554.37, 659.25, 880];
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.12, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.2);
          });
          break;
        }

        case 'achievement': {
          // Fanfare
          const chords = [523.25, 659.25, 783.99, 1046.50];
          chords.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            gain.gain.setValueAtTime(0.14, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.4);
          });
          break;
        }

        case 'podium': {
          // Grand prix victory trumpet riff
          const riff = [
            { f: 523.25, d: 0.12 },
            { f: 659.25, d: 0.12 },
            { f: 783.99, d: 0.12 },
            { f: 1046.50, d: 0.35 }
          ];
          let offset = 0;
          riff.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, now + offset);
            gain.gain.setValueAtTime(0.18, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + item.d);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + offset);
            osc.stop(now + offset + item.d);
            offset += item.d * 0.9;
          });
          break;
        }

        case 'claim': {
          // Reward acquired
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now);
          osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.2);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
        }

        case 'blow': {
          // Candle blow / smoke noise
          const bufferSize = this.ctx.sampleRate * 0.2;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);
          filter.frequency.exponentialRampToValueAtTime(200, now + 0.2);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          noise.start(now);
          break;
        }

        case 'firework': {
          // Pop & crackle
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
        }

        default:
          break;
      }
    } catch {
      // Audio errors are non-blocking
    }
  }

  // Cozy 8-bit chiptune background music loop
  startBgm() {
    if (this.isBgmPlaying || !this.musicEnabled) return;
    this.init();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const melody = [
      261.63, 329.63, 392.00, 523.25, // C E G C
      293.66, 349.23, 440.00, 587.33, // D F A D
      329.63, 392.00, 493.88, 659.25, // E G B E
      349.23, 440.00, 523.25, 698.46, // F A C F
      392.00, 493.88, 587.33, 783.99, // G B D G
      349.23, 440.00, 523.25, 659.25, // F A C E
      329.63, 392.00, 523.25, 493.88, // E G C B
      261.63, 329.63, 392.00, 523.25  // C E G C
    ];

    let noteIndex = 0;
    const stepDuration = 220; // ms per note

    const playStep = () => {
      if (!this.isBgmPlaying || !this.musicEnabled) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melody[noteIndex % melody.length], now);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (stepDuration / 1000) * 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + (stepDuration / 1000));

        noteIndex++;
      } catch {
        // Fallback
      }
    };

    this.bgmInterval = setInterval(playStep, stepDuration);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audioEngine = new RetroAudioEngine();
