import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Prioriza a escolha salva; se for a primeira visita, usa a preferência do sistema.
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    this.isDarkMode.set(initialDark);
    this.applyTheme(initialDark);

    // Mantém a classe do documento e a preferência salva sincronizadas com o sinal.
    effect(() => {
      const dark = this.isDarkMode();
      this.applyTheme(dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(prev => !prev);
  }

  private applyTheme(dark: boolean): void {
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}

