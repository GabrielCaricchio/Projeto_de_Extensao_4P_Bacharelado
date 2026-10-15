import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicoService } from '../../services/topico.service';
import { Topico } from '../../models/topico.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-12">
      
      <!-- Hero Section Estilo Claude Mythos (Formal, porém Lúdico) -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-500/20 p-8 sm:p-12 shadow-sm">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-4 border border-cyan-300/40">
            <span>✨</span> Guia Interativo de Segurança Digital
          </div>
          
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            Navegue no Universo Digital com 
            <span class="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Segurança e Sabedoria
            </span>
          </h1>

          <p class="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Descubra como se proteger de armadilhas na internet, combater o cyberbullying, blindar suas redes sociais e utilizar a Inteligência Artificial como uma superaliada nos seus estudos escolares!
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a href="#topicos-guia" 
               class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <span>🚀</span> Começar a Explorar
            </a>
            
            <a routerLink="/chatbot" 
               class="px-6 py-3 rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 font-semibold border border-cyan-500/30 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-105 transition-all flex items-center gap-2 shadow-sm">
              <span class="animate-bounce">🤖</span> Conversar com o CyberBot
            </a>
          </div>
        </div>

        <!-- Elemento Decorativo Flutuante -->
        <div class="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-9xl opacity-30 select-none animate-bot-float">
          🛡️
        </div>
      </section>

      <!-- Grade dos 6 Tópicos Requisitados -->
      <section id="topicos-guia" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="text-cyan-500">#</span> Trilhas de Aprendizado
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Escolha um tema para aprender as regras de proteção e testar seus conhecimentos no quiz:
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (topico of topicos(); track topico.id) {
            <div class="mythos-card bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform"
                       [style.background-color]="topico.corDestaque + '20'">
                    @switch (topico.slug) {
                      @case ('golpes-digitais') { <span>🛡️</span> }
                      @case ('cyberbullying') { <span>🤝</span> }
                      @case ('redes-sociais') { <span>📱</span> }
                      @case ('malwares') { <span>🦠</span> }
                      @case ('uso-inadequado-ia') { <span>⚠️</span> }
                      @case ('ia-estudos') { <span>🎓</span> }
                      @default { <span>💡</span> }
                    }
                  </div>
                  <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Tópico {{ topico.id }}
                  </span>
                </div>

                <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {{ topico.titulo }}
                </h3>

                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {{ topico.resumo }}
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span class="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                  <span>🧠</span> Inclui Mini-Quiz
                </span>

                <a [routerLink]="['/topicos', topico.slug]"
                   class="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Acessar <span>→</span>
                </a>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Banner de Destaque do Chatbot Educativo -->
      <section class="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 sm:p-10 text-white shadow-xl shadow-cyan-600/20 relative overflow-hidden">
        <div class="max-w-2xl relative z-10 space-y-4">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
            <span>🤖</span> Assistente Sempre Disponível
          </div>
          <h2 class="text-2xl sm:text-4xl font-extrabold leading-tight">
            Ficou com alguma dúvida sobre golpes ou segurança?
          </h2>
          <p class="text-cyan-100 text-sm sm:text-base leading-relaxed">
            O <strong>CyberBot</strong> é o nosso assistente virtual focado em segurança infantil e juvenil. Ele responde dúvidas instantaneamente sem que você precise fazer nenhum cadastro!
          </p>

          <div class="pt-2">
            <a routerLink="/chatbot"
               class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-cyan-800 font-bold shadow-lg hover:bg-cyan-50 hover:scale-105 active:scale-95 transition-all">
              <span>💬</span> Abrir Chat com o CyberBot
            </a>
          </div>
        </div>

        <div class="hidden md:block absolute -right-6 -bottom-10 text-9xl opacity-20 select-none">
          🤖
        </div>
      </section>

      <!-- Regras de Ouro da Convivência Digital -->
      <section class="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div class="text-center max-w-xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-500">Segurança em Primeiro Lugar</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Os 3 Superpoderes do Cidadão Digital
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div class="p-6 rounded-2xl bg-cyan-50/50 dark:bg-slate-800/60 border border-cyan-100 dark:border-slate-700/60 text-center space-y-3">
            <div class="text-4xl">🕵️‍♂️</div>
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Desconfiar de Urgência</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Golpistas sempre exigem pressa. Pare, respire e verifique a informação com um adulto.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-cyan-50/50 dark:bg-slate-800/60 border border-cyan-100 dark:border-slate-700/60 text-center space-y-3">
            <div class="text-4xl">🔒</div>
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Guardar seus Segredos</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Senhas e códigos SMS são como a chave da sua casa: não se empresta a ninguém.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-cyan-50/50 dark:bg-slate-800/60 border border-cyan-100 dark:border-slate-700/60 text-center space-y-3">
            <div class="text-4xl">❤️</div>
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Espalhar Respeito</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Do outro lado da tela há outro ser humano. Seja gentil e nunca compartilhe ofensas.
            </p>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent implements OnInit {
  private topicoService = inject(TopicoService);
  topicos = signal<Topico[]>([]);

  ngOnInit(): void {
    this.topicoService.listarTodos().subscribe(data => {
      this.topicos.set(data);
    });
  }
}

