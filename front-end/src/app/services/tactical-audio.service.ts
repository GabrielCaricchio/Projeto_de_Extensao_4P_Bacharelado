import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TacticalAudioService {
  readonly audioEnabled = signal(false);
  private ctx: AudioContext | null = null;

  init(): void {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleAudio(): boolean {
    const nextState = !this.audioEnabled();
    this.audioEnabled.set(nextState);
    if (nextState) {
      this.init();
      this.playTone(920, 0.1, 'sine', 0.06);
    }
    return nextState;
  }

  private blip(setup: (osc: OscillatorNode, now: number) => void, duration: number, volume: number, type: OscillatorType): void {
    if (!this.audioEnabled()) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      setup(osc, now);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio unavailable or blocked: silent fail
    }
  }

  playTone(freq = 880, duration = 0.08, type: OscillatorType = 'sine', volume = 0.05): void {
    this.blip((o, n) => o.frequency.setValueAtTime(freq, n), duration, volume, type);
  }

  playAlertTone(): void {
    this.blip((o, n) => {
      o.frequency.setValueAtTime(440, n);
      o.frequency.linearRampToValueAtTime(880, n + 0.15);
      o.frequency.linearRampToValueAtTime(440, n + 0.3);
    }, 0.35, 0.07, 'sawtooth');
  }

  playContainmentShield(): void {
    this.blip((o, n) => {
      o.frequency.setValueAtTime(260, n);
      o.frequency.exponentialRampToValueAtTime(1200, n + 0.25);
    }, 0.3, 0.08, 'triangle');
  }
}
