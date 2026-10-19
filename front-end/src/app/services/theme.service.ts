import { Injectable, inject, signal } from '@angular/core';
import { TacticalAudioService } from './tactical-audio.service';

export type CyberTheme = 'cyan' | 'red';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly audio = inject(TacticalAudioService);

  readonly theme = signal<CyberTheme>('cyan');
  readonly mix = signal<number>(0);

  private listeners: Array<(theme: CyberTheme) => void> = [];

  setTheme(theme: CyberTheme): void {
    if (this.theme() === theme) return;
    this.theme.set(theme);

    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-cyan', 'theme-red');
      document.body.classList.add(`theme-${theme}`);
      document.body.setAttribute('data-theme', theme);
    }

    if (theme === 'red') {
      this.audio.playAlertTone();
    } else {
      this.audio.playTone(660, 0.12, 'triangle', 0.05);
    }

    this.listeners.forEach((fn) => fn(theme));
  }

  onThemeChange(fn: (theme: CyberTheme) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}
