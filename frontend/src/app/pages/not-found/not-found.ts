import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="py-20 text-center max-w-lg mx-auto space-y-6">
      <div class="text-8xl select-none animate-bounce">
        🛸
      </div>
      
      <div class="space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Erro 404</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Página não encontrada no ciberespaço!
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          O link que você tentou acessar não existe ou foi movido para outro setor de segurança.
        </p>
      </div>

      <div>
        <a routerLink="/" 
           class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all text-sm">
          <span>🏠</span> Voltar para a Página Inicial
        </a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}

