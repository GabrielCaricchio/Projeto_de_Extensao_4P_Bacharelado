import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/topico.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Cabeçalho do Chatbot com Estilo Lúdico -->
      <div class="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="space-y-1 text-center sm:text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Assistente com IA • Respostas em segundos
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold flex items-center justify-center sm:justify-start gap-2">
            <span>🤖</span> CyberBot Educativo
          </h1>
          <p class="text-xs sm:text-sm text-cyan-100 max-w-lg leading-relaxed">
            Tire suas dúvidas sobre senhas, segurança em jogos, redes sociais e uso inteligente da IA com o nosso robô amigo!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner animate-bot-float">
          🛡️
        </div>
      </div>

      <!-- Sugestões de Perguntas Rápidas (Chips para Crianças) -->
      <div class="space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>💡</span> Perguntas Rápidas Sugeridas:
        </span>
        <div class="flex flex-wrap gap-2">
          @for (sugestao of sugestoes; track sugestao) {
            <button (click)="enviarSugestao(sugestao)"
                    type="button"
                    class="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#1E293B] border border-cyan-500/30 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-xs">
              {{ sugestao }}
            </button>
          }
        </div>
      </div>

      <!-- Janela de Conversa -->
      <div class="bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        <!-- Lista de Mensagens -->
        <div class="flex-1 p-6 overflow-y-auto space-y-4">
          @for (msg of mensagens(); track $index) {
            <div class="flex gap-3" [class.justify-end]="msg.sender === 'user'">
              
              @if (msg.sender === 'bot') {
                <div class="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg shrink-0">
                  🤖
                </div>
              }

              <div class="max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs"
                   [class.bg-gradient-to-r]="msg.sender === 'user'"
                   [class.from-cyan-500]="msg.sender === 'user'"
                   [class.to-blue-600]="msg.sender === 'user'"
                   [class.text-white]="msg.sender === 'user'"
                   [class.bg-slate-50]="msg.sender === 'bot'"
                   [class.dark:bg-slate-800/80]="msg.sender === 'bot'"
                   [class.border]="msg.sender === 'bot'"
                   [class.border-slate-200/70]="msg.sender === 'bot'"
                   [class.dark:border-slate-700/60]="msg.sender === 'bot'"
                   [class.text-slate-800]="msg.sender === 'bot'"
                   [class.dark:text-slate-100]="msg.sender === 'bot'">
                <p class="whitespace-pre-wrap">{{ msg.text }}</p>
                <span class="block text-[10px] mt-1.5 opacity-60 text-right">
                  {{ msg.timestamp }}
                </span>
              </div>

              @if (msg.sender === 'user') {
                <div class="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold shrink-0">
                  👤
                </div>
              }

            </div>
          }

          @if (carregando()) {
            <div class="flex gap-3 items-center text-xs text-slate-500 dark:text-slate-400 italic">
              <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm animate-spin">
                ⚙️
              </div>
              CyberBot está pensando na resposta...
            </div>
          }
        </div>

        <!-- Barra de Entrada de Mensagem -->
        <div class="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
          <form (ngSubmit)="enviar()" class="flex items-center gap-3">
            <input type="text" 
                   [(ngModel)]="textoInput" 
                   name="textoInput"
                   placeholder="Digite sua dúvida sobre segurança na internet..."
                   [disabled]="carregando()"
                   class="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm">

            <button type="submit" 
                    [disabled]="!textoInput.trim() || carregando()"
                    class="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center gap-1.5">
              <span>Enviar</span>
              <span>🚀</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  `
})
export class ChatbotComponent {
  private chatService = inject(ChatService);

  textoInput = '';
  carregando = signal<boolean>(false);

  sugestoes = [
    'O que é phishing?',
    'Como saber se um link é golpe?',
    'Dicas para criar senha forte',
    'Como evitar vírus no celular?',
    'O que fazer em caso de cyberbullying?',
    'Como usar IA para estudar história?'
  ];

  mensagens = signal<ChatMessage[]>([
    {
      text: 'Olá! Sou o CyberBot 🤖, seu assistente virtual de Cultura e Segurança Digital! Como posso te ajudar a navegar com segurança hoje?',
      sender: 'bot',
      timestamp: 'Agora'
    }
  ]);

  enviar(): void {
    const texto = this.textoInput.trim();
    if (!texto || this.carregando()) return;

    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Adiciona mensagem do usuário
    this.mensagens.update(prev => [
      ...prev,
      { text: texto, sender: 'user', timestamp: hora }
    ]);

    this.textoInput = '';
    this.carregando.set(true);

    this.chatService.enviarMensagem(texto).subscribe({
      next: res => {
        this.mensagens.update(prev => [
          ...prev,
          { text: res.reply, sender: 'bot', timestamp: hora }
        ]);
        this.carregando.set(false);
      },
      error: () => {
        this.mensagens.update(prev => [
          ...prev,
          {
            text: 'Não consegui consultar a IA agora. Verifique sua conexão, a validade da chave Groq e o modelo configurado, depois tente novamente.',
            sender: 'bot',
            timestamp: hora
          }
        ]);
        this.carregando.set(false);
      }
    });
  }

  enviarSugestao(sugestao: string): void {
    this.textoInput = sugestao;
    this.enviar();
  }
}

