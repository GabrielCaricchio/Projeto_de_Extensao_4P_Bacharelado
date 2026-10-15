import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Topico } from '../models/topico.model';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/topicos';

  // Dados de fallback locais caso o backend não esteja ativo (ex: deploy estático na Vercel)
  private fallbackTopicos: Topico[] = [
    {
      id: '1',
      slug: 'golpes-digitais',
      titulo: 'Golpes Digitais',
      subtitulo: 'Aprenda a identificar armadilhas, links falsos e promessas milagrosas na internet.',
      icone: 'shield-alert',
      corDestaque: '#EF4444',
      resumo: 'Phishing, clonagem de WhatsApp e ofertas "boas demais para ser verdade". Descubra como não cair nelas!',
      introducao: 'Os golpes digitais acontecem quando criminosos usam mensagens falsas, prêmios inexistentes ou clonagem de contas para enganar as pessoas. Saber desconfiar é o seu maior superpoder!',
      pontosChave: [
        'Desconfie de mensagens urgentes pedindo dinheiro, senhas ou códigos recebidos por SMS.',
        'Nunca clique em links enviados por desconhecidos que prometem diamantes em jogos, PIX de presente ou celulares grátis.',
        'Se um amigo mandar mensagem pedindo dinheiro com urgência pelo WhatsApp, ligue para ele antes de qualquer atitude.'
      ],
      dicas: [
        { titulo: 'Regra de Ouro', descricao: 'Se parece bom demais para ser verdade, quase com certeza é golpe!', icone: 'alert-triangle' },
        { titulo: 'Códigos Secretos', descricao: 'Nunca compartilhe o código de 6 dígitos que chega no seu SMS com ninguém.', icone: 'key' },
        { titulo: 'Converse com Responsáveis', descricao: 'Sempre mostre para seus pais ou responsáveis qualquer mensagem suspeita.', icone: 'users' }
      ],
      quiz: [
        {
          pergunta: 'Você recebeu uma mensagem no WhatsApp dizendo que ganhou um videogame de graça, mas precisa clicar no link agora. O que você faz?',
          opcoes: ['Clico rápido para não perder o prêmio!', 'Desconfio, não clico e mostro para um adulto responsável.', 'Encaminho o link para todos os meus amigos.'],
          indiceCorreto: 1,
          explicacao: 'Correto! Ninguém distribui presentes caros de graça por mensagens sem motivo. É quase sempre golpe de phishing.'
        }
      ]
    },
    {
      id: '2',
      slug: 'cyberbullying',
      titulo: 'Cyberbullying',
      subtitulo: 'Respeito e empatia também se praticam na tela do computador e do celular.',
      icone: 'heart-handshake',
      corDestaque: '#F59E0B',
      resumo: 'Entenda o que é o assédio virtual, como agir ao presenciá-lo e os canais seguros para buscar ajuda.',
      introducao: 'Cyberbullying é quando alguém usa a internet, redes sociais ou jogos online para ofender, espalhar boatos, excluir ou ridicularizar outra pessoa repetidamente. A internet não é terra sem lei!',
      pontosChave: [
        'Palavras digitadas na tela machucam tanto quanto palavras ditas pessoalmente.',
        'Não repasse mensagens, figurinhas ofensivas ou fotos de colegas sem a permissão deles.',
        'Se você ou alguém que você conhece está sofrendo cyberbullying, não guarde para si: conte a um adulto e registre provas com prints.'
      ],
      dicas: [
        { titulo: 'Guarde as Provas', descricao: 'Tire prints das ofensas com data e horário para poder denunciar.', icone: 'camera' },
        { titulo: 'Bloqueie e Denuncie', descricao: 'Use as ferramentas da própria rede social ou jogo para bloquear o agressor.', icone: 'ban' },
        { titulo: 'Disque 100', descricao: 'Em casos graves, o Disque 100 recebe denúncias gratuitas e anônimas de violação de direitos.', icone: 'phone-call' }
      ],
      quiz: [
        {
          pergunta: 'Se você vir colegas rindo e criando figurinhas ofensivas de um colega no grupo de WhatsApp, o que é melhor fazer?',
          opcoes: ['Continuar rindo e repassar para outros grupos.', 'Não repassar, apoiar o colega e avisar a coordenação ou responsáveis.', 'Ficar quieto e mandar mais uma foto zoando.'],
          indiceCorreto: 1,
          explicacao: 'Perfeito! Não ser cúmplice e acolher quem foi ofendido é a atitude correta para combater o cyberbullying.'
        }
      ]
    },
    {
      id: '3',
      slug: 'redes-sociais',
      titulo: 'Uso Seguro de Redes Sociais',
      subtitulo: 'Como navegar no TikTok, Instagram e YouTube sem expor a sua vida particular e sua segurança.',
      icone: 'users-check',
      corDestaque: '#06B6D4',
      resumo: 'Ajuste sua privacidade, proteja fotos pessoais e saiba quem realmente pode ver suas publicações.',
      introducao: 'As redes sociais são ótimas para interagir e aprender, mas tudo o que é postado pode ficar registrado para sempre. Cuidar das suas informações pessoais é proteger o seu presente e futuro.',
      pontosChave: [
        'Mantenha o seu perfil privado para que apenas pessoas conhecidas e aprovadas possam ver seu conteúdo.',
        'Evite postar fotos com o uniforme da sua escola, a fachada da sua casa ou placas de rua que revelem sua localização.',
        'Nem todo perfil na internet é quem diz ser: pessoas desconhecidas não devem ser adicionadas como amigos íntimos.'
      ],
      dicas: [
        { titulo: 'Localização Desligada', descricao: 'Desative a localização em tempo real nas fotos que postar.', icone: 'map-pin' },
        { titulo: 'Filtro de Amizades', descricao: 'Só aceite pedidos de pessoas que você realmente conhece no mundo real.', icone: 'user-check' },
        { titulo: 'Pegada Digital', descricao: 'Lembre-se: depois que você posta uma foto ou vídeo, você perde o controle de onde ele vai parar.', icone: 'footprints' }
      ],
      quiz: [
        {
          pergunta: 'Qual das seguintes informações é PERIGOSA de postar publicamente no seu perfil?',
          opcoes: ['Um desenho que você fez de um robô.', 'O endereço da sua casa ou o nome da sua escola com horários de saída.', 'Sua música favorita.'],
          indiceCorreto: 1,
          explicacao: 'Isso mesmo! Endereço, rotina e escola são informações que colocam sua integridade física em risco.'
        }
      ]
    },
    {
      id: '4',
      slug: 'malwares',
      titulo: 'Malwares e Vírus',
      subtitulo: 'Proteja seu celular e computador contra programas maliciosos que roubam dados ou travam o sistema.',
      icone: 'bug',
      corDestaque: '#8B5CF6',
      resumo: 'O que são cavalos de troia, spywares e ransomwares, e os cuidados essenciais ao baixar jogos e apps.',
      introducao: 'Malware é a abreviação de "software malicioso". São programas criados para danificar dispositivos, espionar o que você digita ou roubar fotos e senhas. Eles costumam se fantasiar de jogos e programas famosos.',
      pontosChave: [
        'Baixe aplicativos e jogos somente de lojas oficiais (Google Play Store, Apple App Store ou Steam).',
        'Mods, hacks e "cheats" de jogos prometendo moedas infinitas são o meio mais comum de infectar seu aparelho com vírus.',
        'Mantenha o sistema operacional e o antivírus sempre atualizados para corrigir falhas de segurança.'
      ],
      dicas: [
        { titulo: 'Lojas Oficiais', descricao: 'Evite baixar arquivos APK ou executáveis (.exe) de sites aleatórios.', icone: 'download' },
        { titulo: 'Permissões Estranhas', descricao: 'Um aplicativo de calculadora não precisa de permissão para ler seus contatos e câmera!', icone: 'eye' },
        { titulo: 'Sintomas de Vírus', descricao: 'Celular esquentando muito rápido, propagandas pulando do nada e bateria sumindo são sinais de alerta.', icone: 'battery-warning' }
      ],
      quiz: [
        {
          pergunta: 'Você quer muito um jogo pago e encontra um site desconhecido oferecendo ele de graça em um arquivo "jogo_gratis.apk". O que você faz?',
          opcoes: ['Baixo e desativo o antivírus para instalar mais rápido.', 'Não baixo, pois tem grande chance de ser um cavalo de troia (malware).', 'Baixo no computador da escola.'],
          indiceCorreto: 1,
          explicacao: 'Muito bem! Jogos piratas e APKs de fontes não confiáveis frequentemente vêm com programas espiões embutidos.'
        }
      ]
    },
    {
      id: '5',
      slug: 'uso-inadequado-ia',
      titulo: 'Uso Inadequado de IA',
      subtitulo: 'Deepfakes, cópia de trabalhos, desinformação e os limites éticos das novas tecnologias.',
      icone: 'cpu',
      corDestaque: '#EC4899',
      resumo: 'Aprenda a reconhecer imagens e vozes geradas por IA, evitar plágio e proteger sua própria imagem.',
      introducao: 'A inteligência artificial evoluiu rápido e agora consegue recriar vozes, rostos e textos inteiros. Porém, criar imagens falsas de colegas (deepfakes) ou copiar redações sem aprender nada são usos prejudiciais e antiéticos.',
      pontosChave: [
        'Criar ou espalhar fotos manipuladas por IA sem autorização pode ser considerado crime e causar grande sofrimento.',
        'IAs geradoras de texto podem "alucinar" (inventar fatos errados com muita certeza). Sempre cheque as fontes!',
        'Pedir para a IA fazer 100% da sua tarefa de casa sem você ler ou pensar impede o desenvolvimento do seu cérebro.'
      ],
      dicas: [
        { titulo: 'Atenção aos Detalhes', descricao: 'Em fotos geradas por IA, repare nas mãos, dentes, reflexos nos olhos e textos ao fundo.', icone: 'sparkles' },
        { titulo: 'Ética e Consentimento', descricao: 'Nunca use fotos de outras pessoas para alimentar aplicativos de troca de rosto.', icone: 'shield-check' },
        { titulo: 'Pense por Si Mesmo', descricao: 'Use a IA como uma enciclopédia interativa, nunca como um substituto do seu raciocínio.', icone: 'brain' }
      ],
      quiz: [
        {
          pergunta: 'Se você vir um vídeo no TikTok de uma pessoa famosa ou colega falando algo absurdo, o que é prudente pensar?',
          opcoes: ['Acredito na hora porque tem vídeo, e vídeo nunca mente.', 'Desconfio que pode ser uma deepfake criada por IA e verifico em fontes confiáveis.', 'Mando para todos os meus contatos.'],
          indiceCorreto: 1,
          explicacao: 'Corretíssimo! Hoje em dia vídeos e áudios podem ser forjados com inteligência artificial com alto realismo.'
        }
      ]
    },
    {
      id: '6',
      slug: 'ia-estudos',
      titulo: 'IA para Auxiliar Estudos e Aprendizados',
      subtitulo: 'Transforme a Inteligência Artificial em sua parceira de estudos, pesquisas e criatividade.',
      icone: 'graduation-cap',
      corDestaque: '#10B981',
      resumo: 'Como fazer boas perguntas (prompts), criar resumos, simulados e tirar dúvidas de matérias escolares.',
      introducao: 'Quando usada com responsabilidade, a inteligência artificial pode ser um professor particular paciente: ela explica matemática com analogias, cria desafios de história e ajuda você a revisar para provas!',
      pontosChave: [
        'Faça perguntas contextualizadas: diga a sua idade, a matéria e o nível de explicação que deseja.',
        'Peça para a IA fazer perguntas para você responder, treinando sua memória para a prova em vez de apenas ler respostas prontas.',
        'Revise sempre com livros didáticos e pergunte aos seus professores para validar o conteúdo estudado.'
      ],
      dicas: [
        { titulo: 'Bons Prompts', descricao: 'Em vez de "me dê a resposta", peça: "me explique o passo a passo de como resolver este cálculo".', icone: 'message-square' },
        { titulo: 'Simulados Personalizados', descricao: 'Peça: "crie 3 perguntas fáceis e 2 médias sobre a Revolução Francesa para eu treinar".', icone: 'check-circle' },
        { titulo: 'Professor em Primeiro Lugar', descricao: 'Se houver conflito entre a IA e seu professor, a palavra do professor e dos livros é a correta.', icone: 'award' }
      ],
      quiz: [
        {
          pergunta: 'Qual é a melhor maneira de usar a IA para aprender um assunto difícil de ciências?',
          opcoes: ['Pedir para ela escrever um resumo e copiar sem ler.', 'Pedir: "explique como funciona a fotossíntese como se eu tivesse 10 anos, usando exemplos do dia a dia".', 'Pedir para ela inventar uma história falsa.'],
          indiceCorreto: 1,
          explicacao: 'Exatamente! Pedir explicações didáticas e analogias ajuda você a compreender de verdade o assunto.'
        }
      ]
    }
  ];

  listarTodos(): Observable<Topico[]> {
    return this.http.get<Topico[]>(this.apiUrl).pipe(
      catchError(() => of(this.fallbackTopicos))
    );
  }

  buscarPorSlug(slug: string): Observable<Topico | undefined> {
    return this.http.get<Topico>(`${this.apiUrl}/${slug}`).pipe(
      catchError(() => of(this.fallbackTopicos.find(t => t.slug === slug)))
    );
  }
}

