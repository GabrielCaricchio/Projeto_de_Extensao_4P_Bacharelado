import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopicoService } from '../../services/topico.service';
import { Topico, QuizPergunta } from '../../models/topico.model';

@Component({
  selector: 'app-topico-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (topico(); as t) {
      <div class="space-y-10 animate-fade-in">
        
        <!-- Cabeçalho do Tópico -->
        <div class="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="space-y-3 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800">
                <span>🛡️</span> Conscientização Digital
              </div>
              
              <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {{ t.titulo }}
              </h1>

              <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {{ t.subtitulo }}
              </p>
            </div>

            <!-- Ícone Decorativo -->
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0"
                 [style.background-color]="t.corDestaque + '20'">
              @switch (t.slug) {
                @case ('golpes-digitais') { <span>🛡️</span> }
                @case ('cyberbullying') { <span>🤝</span> }
                @case ('redes-sociais') { <span>📱</span> }
                @case ('malwares') { <span>🦠</span> }
                @case ('uso-inadequado-ia') { <span>⚠️</span> }
                @case ('ia-estudos') { <span>🎓</span> }
                @default { <span>💡</span> }
              }
            </div>
          </div>
        </div>

        <!-- Seção: O que você precisa saber (Introdução e Pontos Chave) -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="text-cyan-500">📖</span> O que é e como funciona?
            </h2>

            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {{ t.introducao }}
            </p>

            <div class="space-y-3 pt-2">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pontos de Atenção
              </h3>
              <ul class="space-y-2.5">
                @for (ponto of t.pontosChave; track $index) {
                  <li class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                    <span class="text-cyan-500 font-bold shrink-0">✓</span>
                    <span>{{ ponto }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Dicas Rápidas -->
          <div class="space-y-4">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="text-cyan-500">⚡</span> Dicas de Ouro
            </h2>

            @for (dica of t.dicas; track dica.titulo) {
              <div class="mythos-card bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div class="flex items-center gap-2 font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                  <span>💡</span> {{ dica.titulo }}
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {{ dica.descricao }}
                </p>
              </div>
            }
          </div>

        </section>

        <!-- Seção: Mini Quiz Interativo -->
        @if (t.quiz && t.quiz.length > 0) {
          <section class="bg-gradient-to-br from-cyan-500/10 via-white to-blue-500/10 dark:from-slate-800 dark:via-[#1E293B] dark:to-cyan-950/20 rounded-3xl p-8 border-2 border-cyan-500/30 shadow-md space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Desafio de Fixação</span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  🧠 Teste seus Conhecimentos
                </h2>
              </div>
              <span class="text-xs px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 font-bold">
                Sem Notas • Apenas Prática
              </span>
            </div>

            <div class="space-y-6">
              @for (pergunta of t.quiz; track $index; let qIndex = $index) {
                <div class="bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                  <p class="font-semibold text-slate-800 dark:text-slate-100 text-base">
                    {{ qIndex + 1 }}. {{ pergunta.pergunta }}
                  </p>

                  <div class="grid grid-cols-1 gap-2.5">
                    @for (opcao of pergunta.opcoes; track $index; let optIndex = $index) {
                      <button (click)="responderQuiz(qIndex, optIndex, pergunta.indiceCorreto)"
                              type="button"
                              [disabled]="respostasUsuario()[qIndex] !== undefined"
                              [class]="obterEstiloBotaoQuiz(qIndex, optIndex, pergunta.indiceCorreto)"
                              class="w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between">
                        <span>{{ opcao }}</span>
                        
                        @if (respostasUsuario()[qIndex] !== undefined) {
                          @if (optIndex === pergunta.indiceCorreto) {
                            <span class="text-emerald-500 font-bold">✓ Correto</span>
                          } @else if (respostasUsuario()[qIndex] === optIndex) {
                            <span class="text-rose-500 font-bold">✗ Errado</span>
                          }
                        }
                      </button>
                    }
                  </div>

                  @if (respostasUsuario()[qIndex] !== undefined) {
                    <div class="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-xs text-slate-700 dark:text-cyan-200 leading-relaxed animate-fade-in">
                      <strong>Explicação:</strong> {{ pergunta.explicacao }}
                    </div>
                  }
                </div>
              }
            </div>
          </section>
        }

        <!-- Navegação Rápida entre Tópicos -->
        <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a routerLink="/" class="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors flex items-center gap-1.5">
            <span>←</span> Voltar para o Início
          </a>

          <a routerLink="/chatbot" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
            <span>🤖</span> Tirar Dúvidas com CyberBot
          </a>
        </div>

      </div>
    } @else {
      <!-- Carregando ou Não Encontrado -->
      <div class="py-20 text-center space-y-4">
        <div class="text-5xl animate-spin inline-block">🔄</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Carregando conteúdo educativo...</h2>
        <p class="text-sm text-slate-500">Se demorar, tente voltar para a página inicial.</p>
        <a routerLink="/" class="inline-block mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-semibold">
          Ir para o Início
        </a>
      </div>
    }
  `
})
export class TopicoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private topicoService = inject(TopicoService);

  topico = signal<Topico | undefined>(undefined);
  respostasUsuario = signal<{ [key: number]: number }>({});

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.respostasUsuario.set({});
        this.topicoService.buscarPorSlug(slug).subscribe(data => {
          this.topico.set(data);
        });
      }
    });
  }

  responderQuiz(perguntaIndex: number, opcaoIndex: number, corretoIndex: number): void {
    this.respostasUsuario.update(prev => ({
      ...prev,
      [perguntaIndex]: opcaoIndex
    }));
  }

  obterEstiloBotaoQuiz(perguntaIndex: number, opcaoIndex: number, corretoIndex: number): string {
    const resposta = this.respostasUsuario()[perguntaIndex];
    if (resposta === undefined) {
      return 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:border-cyan-300';
    }
    if (opcaoIndex === corretoIndex) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-bold';
    }
    if (resposta === opcaoIndex) {
      return 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200';
    }
    return 'border-slate-200 dark:border-slate-800 opacity-50 bg-slate-50 dark:bg-slate-800 text-slate-400';
  }
}

