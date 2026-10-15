import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-20 border-t-2 border-cyan-500/40 bg-white dark:bg-[#080E21] text-slate-600 dark:text-slate-400 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <!-- Coluna 1: Sobre o Projeto -->
          <div class="md:col-span-2 space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-cyan-400">
                CD
              </div>
              <span class="text-lg font-bold text-slate-800 dark:text-slate-100">Cultura Digital</span>
            </div>
            <p class="text-sm leading-relaxed max-w-md">
              Iniciativa educativa para conscientização sobre navegação segura, prevenção de golpes virtuais e uso ético da Inteligência Artificial.
            </p>
            <div class="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400 font-medium">
              <span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
              Plataforma 100% aberta, sem cadastro e sem coleta de dados pessoais.
            </div>
          </div>

          <!-- Coluna 2: Tópicos Rápidos -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 text-cyan-600 dark:text-cyan-400">
              Segurança Online
            </h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/topicos/golpes-digitais" class="hover:text-cyan-500 transition-colors">Golpes Digitais</a></li>
              <li><a routerLink="/topicos/cyberbullying" class="hover:text-cyan-500 transition-colors">Cyberbullying</a></li>
              <li><a routerLink="/topicos/redes-sociais" class="hover:text-cyan-500 transition-colors">Redes Sociais</a></li>
              <li><a routerLink="/topicos/malwares" class="hover:text-cyan-500 transition-colors">Malwares e Vírus</a></li>
            </ul>
          </div>

          <!-- Coluna 3: Inteligência Artificial & Apoio -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 text-cyan-600 dark:text-cyan-400">
              IA & Ferramentas
            </h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/topicos/uso-inadequado-ia" class="hover:text-cyan-500 transition-colors">Uso Inadequado de IA</a></li>
              <li><a routerLink="/topicos/ia-estudos" class="hover:text-cyan-500 transition-colors">IA para Estudos</a></li>
              <li><a routerLink="/chatbot" class="hover:text-cyan-500 transition-colors flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">🤖 Assistente CyberBot</a></li>
            </ul>
          </div>

        </div>

        <!-- Linha Divisória e Copyright -->
        <div class="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Cultura Digital. Desenvolvido para fins educacionais.</p>
          <div class="flex items-center gap-4">
            <span class="px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-medium">Java 21 • Angular • Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}

