import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="sticky top-0 z-50 backdrop-blur-md bg-[#F5F7FA]/90 dark:bg-[#0B132B]/90 border-b border-cyan-500/20 shadow-sm transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo com Acento Ciano -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cultura Digital
              </span>
            </div>
          </a>

          <!-- Menu Desktop -->
          <nav class="hidden md:flex items-center gap-1">
            <a routerLink="/"
               class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
              Início
            </a>
            <a routerLink="/topicos/golpes-digitais"
               class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
              Tópicos
            </a>
            <a routerLink="/chatbot"
               class="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              CyberBot (IA)
            </a>
          </nav>

          <!-- Ações: Botão Tema & Menu Mobile -->
          <div class="flex items-center gap-3">
            
            <!-- Botão Alternador de Modo Escuro / Claro -->
            <button (click)="themeService.toggleTheme()" 
                    type="button"
                    title="Alternar Modo Escuro / Claro"
                    class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              @if (themeService.isDarkMode()) {
                <!-- Ícone Sol (Modo Claro) -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } @else {
                <!-- Ícone Lua (Modo Escuro) -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>

            <!-- Botão Menu Mobile -->
            <button (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                    type="button"
                    class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Mobile Expandido -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden py-3 border-t border-cyan-500/20 flex flex-col gap-1">
            <a (click)="mobileMenuOpen.set(false)" routerLink="/" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Início</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/golpes-digitais" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Golpes Digitais</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/cyberbullying" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Cyberbullying</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/redes-sociais" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Redes Sociais</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/malwares" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Malwares</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/uso-inadequado-ia" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">Uso Inadequado de IA</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/topicos/ia-estudos" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">IA para Estudos</a>
            <a (click)="mobileMenuOpen.set(false)" routerLink="/chatbot" class="px-3 py-2 rounded-lg text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40">🤖 CyberBot (IA)</a>
          </div>
        }
      </div>
    </header>
  `
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  mobileMenuOpen = signal<boolean>(false);
}

