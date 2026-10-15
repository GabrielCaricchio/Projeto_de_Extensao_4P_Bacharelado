export interface DicaSeguranca {
  titulo: string;
  descricao: string;
  icone: string;
}

export interface QuizPergunta {
  pergunta: string;
  opcoes: string[];
  indiceCorreto: number;
  explicacao: string;
}

export interface Topico {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  corDestaque: string;
  resumo: string;
  introducao: string;
  pontosChave: string[];
  dicas: DicaSeguranca[];
  quiz: QuizPergunta[];
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

