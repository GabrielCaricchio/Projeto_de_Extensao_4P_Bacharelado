import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="w-full lg:w-72 shrink-0">
      <div class="sticky top-20 bg-white dark:bg-[#1E293B] rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        
        <div class="flex items-center gap-2 px-3 py-2 mb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-400"></span>
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tópicos de Conscientização
          </h2>
        </div>

        <nav class="flex flex-col gap-1.5">
          <a routerLink="/"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">🏠</span>
            <span>Visão Geral</span>
          </a>

          <a routerLink="/topicos/golpes-digitais"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">🛡️</span>
            <div class="flex flex-col">
              <span>Golpes Digitais</span>
              <span class="text-[10px] text-slate-400">Phishing e PIX</span>
            </div>
          </a>

          <a routerLink="/topicos/cyberbullying"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">🤝</span>
            <div class="flex flex-col">
              <span>Cyberbullying</span>
              <span class="text-[10px] text-slate-400">Respeito e Apoio</span>
            </div>
          </a>

          <a routerLink="/topicos/redes-sociais"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">📱</span>
            <div class="flex flex-col">
              <span>Redes Sociais</span>
              <span class="text-[10px] text-slate-400">Privacidade e Fotos</span>
            </div>
          </a>

          <a routerLink="/topicos/malwares"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">🦠</span>
            <div class="flex flex-col">
              <span>Malwares e Vírus</span>
              <span class="text-[10px] text-slate-400">Proteção de Dispositivos</span>
            </div>
          </a>

          <a routerLink="/topicos/uso-inadequado-ia"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">⚠️</span>
            <div class="flex flex-col">
              <span>Uso Inadequado de IA</span>
              <span class="text-[10px] text-slate-400">Deepfakes e Plágio</span>
            </div>
          </a>

          <a routerLink="/topicos/ia-estudos"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group">
            <span class="text-lg group-hover:scale-110 transition-transform">🎓</span>
            <div class="flex flex-col">
              <span>IA para Estudos</span>
              <span class="text-[10px] text-slate-400">Tutoria e Aprendizado</span>
            </div>
          </a>

          <div class="my-2 border-t border-slate-100 dark:border-slate-800"></div>

          <a routerLink="/chatbot"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-all group">
            <span class="text-lg animate-bounce">🤖</span>
            <div class="flex flex-col">
              <span>Tirar Dúvidas (IA)</span>
              <span class="text-[10px] opacity-80">CyberBot Online</span>
            </div>
          </a>
        </nav>

        <!-- Card de Apoio e Emergência -->
        <div class="mt-5 p-3.5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-cyan-950/30 border border-cyan-200/60 dark:border-cyan-800/40 text-xs">
          <div class="flex items-center gap-1.5 font-bold text-cyan-800 dark:text-cyan-300 mb-1">
            <span>📞</span> Canal de Apoio
          </div>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Presenciou crimes virtuais ou cyberbullying grave? Disque <strong>100</strong> (gratuito e anônimo).
          </p>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {}

