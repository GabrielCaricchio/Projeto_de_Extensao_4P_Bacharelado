export interface TopicDetail {
  id: string;
  number: string;
  title: string;
  badge: string;
  badgeClass: 'cyan-badge' | 'red-badge' | 'green-badge' | 'purple-badge';
  category: 'golpes' | 'cidadania' | 'ia' | 'defesa';
  iconSvg: string;
  shortDesc: string;
  tags: string[];
  entenda: {
    title: string;
    text: string;
    conceitoChave: string;
  };
  reconheca: {
    title: string;
    exemplos: Array<{ title: string; desc: string }>;
    sinaisAlerta: string[];
  };
  previnase: {
    title: string;
    passos: string[];
  };
  saibaAgir: {
    title: string;
    orientacoes: string[];
    acolhimento: string;
  };
  revise: {
    title: string;
    checklist: string[];
  };
}

export const TOPICS_DATA: TopicDetail[] = [
  {
    id: 'ameacas-digitais',
    number: '00',
    title: 'Ameaças Digitais',
    badge: 'PANORAMA GERAL',
    badgeClass: 'red-badge',
    category: 'golpes',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L6 12V22C6 32 14 41 24 44C34 41 42 32 42 22V12L24 4Z" stroke="currentColor" stroke-width="2"/><path d="M24 16V26M24 32H24.02" stroke="var(--accent-red)" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    shortDesc: 'Visão geral dos riscos no ambiente digital, ensinando a diferenciar vulnerabilidades, reconhecer situações perigosas e proteger dispositivos, contas e dados pessoais.',
    tags: ['Visão Geral', 'Vulnerabilidades', 'Hábitos de Defesa'],
    entenda: {
      title: 'O que são Ameaças Digitais?',
      text: 'Estar no ambiente digital traz enormes oportunidades de estudo, diversão e conexão, mas também expõe nossos aparelhos e identidades a riscos. Uma ameaça digital é qualquer perigo potencial que tente invadir dispositivos, roubar contas, expor fotos ou prejudicar pessoas. Uma vulnerabilidade é uma brecha (como uma senha fácil ou sistema desatualizado), e o ataque acontece quando alguém tenta explorar essa brecha.',
      conceitoChave: 'Segurança não significa viver com medo de usar a internet: significa cultivar atenção e saber como se prevenir e agir quando algo parecer estranho.'
    },
    reconheca: {
      title: 'Principais tipos e situações cotidianas',
      exemplos: [
        { title: 'Roubo de Contas e Senhas', desc: 'Invasões de redes sociais ou jogos porque a senha era fraca ou foi compartilhada com conhecidos.' },
        { title: 'Perfis Falsos e Impostores', desc: 'Pessoas se passando por amigos, famosos ou autoridades para pedir informações ou dinheiro.' },
        { title: 'Exposição de Privacidade', desc: 'Vazamentos involuntários de localização em tempo real, uniforme escolar ou fotos íntimas.' },
        { title: 'Manipulações com IA', desc: 'Uso de imagens, áudios e vídeos sintéticos criados para enganar, constranger ou extorquir.' }
      ],
      sinaisAlerta: [
        'Mensagens repentinas com links exigindo ação urgente ou misteriosa.',
        'Pedidos para manter a conversa em segredo absoluto ou sair de canais conhecidos.',
        'Promessas de dinheiro fácil, skins grátis ou vantagens exageradas.',
        'Aplicativos ou jogos solicitando permissões estranhas (ex: lanterna pedindo acesso aos contatos).'
      ]
    },
    previnase: {
      title: 'Como se proteger no dia a dia',
      passos: [
        'Crie senhas longas, exclusivas e difíceis de adivinhar para cada serviço importante.',
        'Ative a autenticação multifator (MFA/2FA) em todas as contas de e-mail, redes sociais e jogos.',
        'Mantenha o celular, computador e aplicativos sempre atualizados.',
        'Evite baixar arquivos de sites duvidosos ou clicar em links recebidos de desconhecidos.',
        'Não divulgue sua localização em tempo real, endereço ou rotina de estudo em posts abertos.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao sofrer uma ameaça?',
      orientacoes: [
        'Interrompa o contato imediatamente. Não responda com raiva nem ceda a pressões.',
        'Guarde evidências tirando capturas de tela (prints com data e horário) e anotando links.',
        'Bloqueie o usuário e denuncie o conteúdo diretamente na plataforma.',
        'Conte imediatamente a um adulto de confiança (pais, responsáveis ou professores).'
      ],
      acolhimento: 'Lembre-se sempre: se algo der errado ou você cair em uma cilada, você é a vítima e não deve se sentir culpado. Procure ajuda sem medo de julgamentos.'
    },
    revise: {
      title: 'Checklist de Ameaças Digitais',
      checklist: [
        'Desconfie de promessas milagrosas e urgências excessivas.',
        'Proteja suas contas com MFA e senhas que ninguém mais saiba.',
        'Guarde evidências e avise adultos responsáveis em qualquer situação desconfortável.'
      ]
    }
  },
  {
    id: 'golpes-digitais',
    number: '01',
    title: 'Golpes Digitais & Sites Falsos',
    badge: 'FRAUDES FINANCEIRAS & SITES CLONADOS',
    badgeClass: 'red-badge',
    category: 'golpes',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" stroke-width="2"/><path d="M6 18H42M16 28H22M30 28H34" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="28" r="4" fill="var(--accent-red)"/></svg>`,
    shortDesc: 'Como reconhecer tentativas de fraude pela internet: falsas promoções, falso Pix, lojas falsas, itens fictícios em games e falsos prêmios.',
    tags: ['Falso Pix', 'Lojas Falsas', 'Jogos & Skins', 'Clonagem de Voz'],
    entenda: {
      title: 'O que são Golpes Digitais?',
      text: 'Golpes digitais ocorrem quando criminosos enganam pessoas pela internet para obter dinheiro, dados pessoais ou acesso a perfis. Os golpistas criam páginas idênticas a lojas oficiais, inventam promoções imperdíveis ou fingem ser conhecidos para induzir a vítima a fazer pagamentos via Pix ou enviar códigos de acesso.',
      conceitoChave: 'Na internet, preços muito abaixo do normal e pressão de tempo quase sempre indicam uma armadilha.'
    },
    reconheca: {
      title: 'Principais tipos e exemplos reais',
      exemplos: [
        { title: 'Lojas e Sites Falsos', desc: 'Páginas clonadas vendendo produtos de marca com 80% de desconto que nunca são entregues.' },
        { title: 'Golpe do Falso Pix', desc: 'Comprovantes falsificados ou pedidos de transferência alegando que o dinheiro cairá em dobro.' },
        { title: 'Itens de Jogos e Moedas Fictícias', desc: 'Sites que prometem Robux, V-Bucks ou skins raras em troca de login e pagamento antecipado.' },
        { title: 'Golpe da Recuperação de Conta', desc: 'Perfis falsos cobrando valores prometendo "destravar" uma conta de rede social invadida.' }
      ],
      sinaisAlerta: [
        'Endereços de site (URLs) com letras trocadas ou finais estranhos (ex: loja-oficial-promo.xyz).',
        'Chave Pix em nome de pessoa física desconhecida em compras que deveriam ser empresariais.',
        'Insistência extrema: "Pague nos próximos 5 minutos ou perderá para sempre".',
        'Exigência de código de SMS ou senha para resgatar brindes.'
      ]
    },
    previnase: {
      title: 'Como se proteger de fraudes',
      passos: [
        'Pesquise a reputação de lojas em sites oficiais de reclamação e canais de proteção ao consumidor.',
        'Antes de confirmar um Pix, leia com atenção o nome do titular e o valor na tela do banco.',
        'Compre apenas em plataformas oficiais e nunca conclua transações fora do aplicativo do jogo.',
        'Não clique em links de promoções recebidos por WhatsApp ou redes sociais sem verificar o site oficial.',
        'Lembre-se: o símbolo de cadeado (HTTPS) indica que a conexão é criptografada, mas golpistas também podem ter certificados.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer se cair em um golpe?',
      orientacoes: [
        'Avise imediatamente seus pais ou responsáveis para acionar os canais adequados.',
        'Se envolveu Pix ou cartão, entre em contato imediatamente com o banco pelo canal oficial solicitando o Mecanismo Especial de Devolução (MED).',
        'Guarde capturas de tela, conversas, comprovantes de transação e endereços de sites.',
        'Troque senhas caso tenha preenchido dados de login e registre Boletim de Ocorrência na Delegacia de Crimes Digitais.'
      ],
      acolhimento: 'Qualquer pessoa pode ser enganada por criminosos profissionais. Fale a verdade para sua família o mais rápido possível: quanto antes o banco for avisado, maior a chance de conter prejuízos.'
    },
    revise: {
      title: 'Checklist Antigolpe',
      checklist: [
        'Preço milagroso = desconfiança imediata.',
        'Confira o nome do destinatário antes de qualquer Pix.',
        'Nunca informe senhas ou códigos recebidos por SMS.'
      ]
    }
  },
  {
    id: 'cyberbullying',
    number: '02',
    title: 'Cyberbullying & Convivência Digital',
    badge: 'RESPONSABILIDADE & RESPEITO',
    badgeClass: 'purple-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="currentColor" stroke-width="2"/><path d="M12 40C12 32.27 17.37 26 24 26C30.63 26 36 32.27 36 40" stroke="currentColor" stroke-width="2"/><path d="M36 12L44 20M44 12L36 20" stroke="var(--accent-red)" stroke-width="2" stroke-linecap="round"/></svg>`,
    shortDesc: 'Promovendo respeito, empatia e solidariedade na escola e nas redes. Como identificar agressões virtuais, apoiar vítimas e interromper cadeias de humilhação.',
    tags: ['Convivência Escolar', 'Apoio à Vítima', 'Não Repassar', 'Denúncia'],
    entenda: {
      title: 'O que é Cyberbullying?',
      text: 'Cyberbullying é o uso da internet, redes sociais, jogos ou aplicativos de mensagens para humilhar, insultar, ameaçar, excluir ou perseguir alguém intencionalmente e de forma repetida. Ao contrário de um desentendimento passageiro, o cyberbullying invade o espaço pessoal da vítima 24 horas por dia e pode ser visto por dezenas ou centenas de pessoas em poucos minutos.',
      conceitoChave: 'Quem curte, comenta ou compartilha uma agressão também está colaborando para o sofrimento da outra pessoa.'
    },
    reconheca: {
      title: 'Como costuma ocorrer e como identificar',
      exemplos: [
        { title: 'Grupos de Exclusão e Ataque', desc: 'Criar grupos específicos no WhatsApp para difamar ou rir de colegas de classe.' },
        { title: 'Memes e Montagens Ofensivas', desc: 'Usar fotos de colegas ou ferramentas de IA para criar caricaturas e montagens humilhantes.' },
        { title: 'Vazamento de Conversas Privadas', desc: 'Expor segredos, desabafos ou fotos íntimas confiadas em conversas privadas.' },
        { title: 'Perfis Falsos de Difamação', desc: 'Criar páginas anônimas dedicadas a postar fofocas ou inventar mentiras sobre pessoas da escola.' }
      ],
      sinaisAlerta: [
        'Insultos frequentes disfarçados de "só uma brincadeirinha".',
        'Pressão coletiva para que todos ataquem ou ignorem um estudante.',
        'Medo de abrir redes sociais, desespero ao receber mensagens ou vontade de faltar à escola.',
        'Tristeza repentina e isolamento de atividades em grupo.'
      ]
    },
    previnase: {
      title: 'Como cultivar um ambiente saudável',
      passos: [
        'Pense antes de postar: se aquilo doesse em você, por que fazer com o outro?',
        'Não compartilhe montagens, fofocas ou fotos constrangedoras de colegas, mesmo no privado.',
        'Se presenciar alguém sendo atacado, não participe e manifeste apoio à pessoa.',
        'Configure a privacidade de suas contas para que apenas pessoas de confiança possam comentar ou mandar mensagens diretas.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer diante do cyberbullying?',
      orientacoes: [
        'Não responda impulsivamente nem revide com novas agressões: isso alimenta o ciclo de conflito.',
        'Guarde evidências: tire capturas de tela mostrando perfil, data, horário e conteúdo das ofensas.',
        'Bloqueie o agressor e faça a denúncia formal nas opções da própria plataforma.',
        'Avise seus pais e procure a direção ou coordenação da escola para intervir com acolhimento.',
        'Se o caso envolver ameaças graves ou fotos íntimas, a família deve procurar a delegacia e os canais da SaferNet Brasil.'
      ],
      acolhimento: 'A vítima nunca tem culpa pelo que está acontecendo. Você tem o direito de ser respeitado e de pedir ajuda até que a situação seja resolvida.'
    },
    revise: {
      title: 'Checklist de Convivência',
      checklist: [
        'Respeito sempre: atrás da tela existe uma pessoa com sentimentos.',
        'Não seja cúmplice: não curta nem repasse humilhações.',
        'Peça ajuda à escola e guarde provas.'
      ]
    }
  },
  {
    id: 'redes-sociais',
    number: '03',
    title: 'Redes Sociais: Uso Seguro',
    badge: 'PRIVACIDADE & BEM-ESTAR',
    badgeClass: 'cyan-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M16 14C16 18.4 12.4 22 8 22C3.6 22 0 18.4 0 14C0 9.6 3.6 6 8 6C12.4 6 16 9.6 16 14Z" stroke="currentColor" stroke-width="2"/><path d="M48 14C48 18.4 44.4 22 40 22C35.6 22 32 18.4 32 14C32 9.6 35.6 6 40 6C44.4 6 48 9.6 48 14Z" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="32" r="8" stroke="currentColor" stroke-width="2"/><path d="M14 18L18 26M34 18L30 26" stroke="var(--accent-cyan)" stroke-width="2"/></svg>`,
    shortDesc: 'Como usar TikTok, Instagram, Discord e WhatsApp com autonomia: perfis privados, proteção da localização, limites com estranhos e saúde mental.',
    tags: ['Perfil Privado', 'Localização', 'Estranhos', 'Bem-Estar'],
    entenda: {
      title: 'O que envolve o uso seguro de redes sociais?',
      text: 'As redes sociais conectam pessoas ao redor do mundo, mas funcionam com algoritmos desenhados para capturar nossa atenção por horas e coletar dados sobre preferências e rotinas. Manter um uso seguro significa controlar quem tem acesso ao seu conteúdo, preservar sua privacidade e evitar a exposição de detalhes da sua vida pessoal para desconhecidos.',
      conceitoChave: 'Tudo o que é postado na internet pode ser salvo e compartilhado por outros, mesmo depois de você apagar.'
    },
    reconheca: {
      title: 'Riscos mais comuns e situações de perigo',
      exemplos: [
        { title: 'Contatos com Desconhecidos Suspeitos', desc: 'Perfis de estranhos tentando ganhar intimidade muito rápido e pedindo para manter conversas secretas.' },
        { title: 'Exposição Involuntária de Rotina', desc: 'Fotos que mostram o emblema da escola, fachada da casa, placas de carro ou localização exata em tempo real.' },
        { title: 'Pressão por Curtidas e Padrões Falsos', desc: 'Sentimento de ansiedade e baixa autoestima causado pela comparação com fotos retocadas e filtros irreais.' },
        { title: 'Desafios Perigosos', desc: 'Tendências virtuais que incentivam brincadeiras arriscadas contra a própria saúde e integridade.' }
      ],
      sinaisAlerta: [
        'Pessoas desconhecidas pedindo fotos particulares ou propondo encontros a sós.',
        'Contas que enviam links misteriosos via DM dizendo "veja o que estão falando de você".',
        'Necessidade de ficar checando o celular a cada cinco minutos por medo de perder algo.'
      ]
    },
    previnase: {
      title: 'Boas práticas para blindar seu perfil',
      passos: [
        'Deixe seu perfil em modo privado: aprove manualmente quem pode seguir e ver seus posts.',
        'Revise periodicamente sua lista de seguidores e remova quem você não conhece na vida real.',
        'Desative o compartilhamento de localização em tempo real nos aplicativos de fotos e redes.',
        'Nunca publique documentos, números de telefone, horários de treino ou itinerários diários.',
        'Defina limites de tempo de tela e faça pausas diárias para descansar mente e olhos.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer diante de problemas nas redes?',
      orientacoes: [
        'Se alguém desconhecido fizer pedidos estranhos ou insistentes, bloqueie imediatamente.',
        'Nunca aceite propostas de segredo ou ameaças de exposição.',
        'Avise seus pais ou professores se sentir desconforto com qualquer contato online.',
        'Se sua conta for invadida, use os formulários oficiais de recuperação da própria rede social.'
      ],
      acolhimento: 'Sua paz de espírito vale muito mais do que seguidores ou curtidas. Você tem todo o controle para silenciar e afastar quem não te faz bem.'
    },
    revise: {
      title: 'Checklist das Redes',
      checklist: [
        'Perfil privado e seguidores selecionados.',
        'Localização e uniforme escolar fora das fotos.',
        'Nenhum segredo com desconhecidos da internet.'
      ]
    }
  },
  {
    id: 'ia-estudos-seguranca',
    number: '04',
    title: 'Uso de IA: Estudos e Cibersegurança',
    badge: 'INTELIGÊNCIA ARTIFICIAL',
    badgeClass: 'green-badge',
    category: 'ia',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="6" stroke="currentColor" stroke-width="2"/><circle cx="19" cy="20" r="3" fill="var(--accent-cyan)"/><circle cx="29" cy="20" r="3" fill="var(--accent-cyan)"/><path d="M18 30C20 33 28 33 30 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 2V10M10 24H2M46 24H38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    shortDesc: 'Compreendendo o potencial e os limites da inteligência artificial: como usar como tutor para aprender, evitar alucinações e reconhecer golpes criados com IA.',
    tags: ['Tutor de IA', 'Alucinações', 'Deepfakes', 'Ética Escolar'],
    entenda: {
      title: 'O que é Inteligência Artificial e como funciona?',
      text: 'Ferramentas de IA generativa (como ChatGPT, Gemini e geradores de imagens) são sistemas treinados com imensos volumes de dados para prever palavras e imagens mais prováveis com base no seu comando (prompt). Elas não pensam, não sentem e não "sabem" a verdade: são assistentes estatísticos que podem formular respostas muito convincentes, mas completamente incorretas (fenômeno conhecido como "alucinação").',
      conceitoChave: 'A IA deve ser utilizada como uma bicicleta para o seu cérebro — ajudando você a chegar mais longe —, e não como um substituto que pedala por você.'
    },
    reconheca: {
      title: 'Usos adequados vs. usos inadequados',
      exemplos: [
        { title: 'Uso Adequado nos Estudos', desc: 'Pedir à IA para explicar uma matéria com analogias simples, sugerir planos de revisão e gerar simulados.' },
        { title: 'Uso Inadequado Escolar', desc: 'Copiar e colar respostas prontas em trabalhos sem entender o conteúdo, cometendo plágio e perdendo o aprendizado.' },
        { title: 'Uso em Golpes e Fraudes', desc: 'Criminosos usando IA para clonar vozes de pessoas em apuros ou criar e-mails de phishing sem erros ortográficos.' },
        { title: 'Deepfakes e Manipulação', desc: 'Criação de vídeos ou áudios forjados atribuindo declarações falsas a colegas ou professores.' }
      ],
      sinaisAlerta: [
        'Respostas de IA que citam livros ou dados que não existem quando pesquisados no Google.',
        'Mensagens recebidas em redes com tom excessivamente polido ou urgente imitando contatos reais.',
        'Áudios com pequenas quebras de ritmo ou respiração metálica não natural.'
      ]
    },
    previnase: {
      title: 'Como utilizar ferramentas de IA com responsabilidade',
      passos: [
        'Sempre cheque as informações fornecidas pela IA com livros didáticos e fontes confiáveis.',
        'Nunca digite senhas, dados de documentos, endereço ou segredos particulares em ferramentas de IA.',
        'Não envie fotos íntimas ou imagens de terceiros sem autorização para sistemas de IA generativa.',
        'Declare o uso de IA em trabalhos acadêmicos quando as diretrizes do seu professor permitirem.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao encontrar usos maliciosos de IA?',
      orientacoes: [
        'Se receber áudio suspeito com a voz de familiar pedindo dinheiro, confirme ligando por telefone comum.',
        'Não compartilhe montagens ou vídeos sintéticos criados para humilhar ninguém.',
        'Denuncie conteúdos gerados por IA com teor ofensivo na própria plataforma e avise a escola.'
      ],
      acolhimento: 'A tecnologia evolui rapidamente, mas o senso crítico e o bom senso continuam sendo a melhor proteção humana.'
    },
    revise: {
      title: 'Checklist de Inteligência Artificial',
      checklist: [
        'Use para aprender a pensar, não para não pensar.',
        'Cheque dados: a IA pode alucinar com convicção.',
        'Privacidade máxima: não insira dados pessoais nos chats.'
      ]
    }
  },
  {
    id: 'tecnologias-estudos',
    number: '05',
    title: 'Tecnologias para Auxiliar Estudos',
    badge: 'APRENDIZAGEM & AUTONOMIA',
    badgeClass: 'green-badge',
    category: 'defesa',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 8H20C22.2 8 24 9.8 24 12V40C24 38.3 22.2 37 20 37H8V8Z" stroke="currentColor" stroke-width="2"/><path d="M40 8H28C25.8 8 24 9.8 24 12V40C24 38.3 25.8 37 28 37H40V8Z" stroke="currentColor" stroke-width="2"/><path d="M14 18H18M14 26H18M30 18H34M30 26H34" stroke="var(--accent-cyan)" stroke-width="2"/></svg>`,
    shortDesc: 'Apresentando ferramentas digitais que impulsionam o aprendizado: mapas mentais, flashcards, simuladores, ferramentas de acessibilidade e rotinas eficientes.',
    tags: ['Mapas Mentais', 'Flashcards', 'Simuladores', 'Acessibilidade'],
    entenda: {
      title: 'O que são Tecnologias Educacionais?',
      text: 'São aplicativos, plataformas e recursos digitais desenvolvidos para ajudar estudantes a organizar rotinas, memorizar conceitos de forma duradoura, praticar exercícios e explorar matérias de forma interativa. Quando combinadas com disciplina e curiosidade, essas ferramentas transformam a forma de aprender.',
      conceitoChave: 'A tecnologia é um meio para enriquecer seus estudos, mantendo você no papel de protagonista do seu aprendizado.'
    },
    reconheca: {
      title: 'Principais ferramentas e suas contribuições',
      exemplos: [
        { title: 'Flashcards e Repetição Espaçada', desc: 'Aplicativos que cronometram a revisão de conteúdos nos momentos exatos antes de esquecermos (como Anki).' },
        { title: 'Mapas Mentais e Diagramas', desc: 'Ferramentas visuais que conectam ideias e facilitam o entendimento de matérias complexas de ciências ou história.' },
        { title: 'Simuladores e Laboratórios Virtuais', desc: 'Plataformas interativas para testar reações químicas, circuitos elétricos ou física sem risco real.' },
        { title: 'Acessibilidade e Leitura em Voz Alta', desc: 'Recursos de sintetizador de voz, legendas e ampliação que tornam o aprendizado inclusivo para todos.' }
      ],
      sinaisAlerta: [
        'Depender de respostas automáticas sem tentar resolver os problemas por conta própria.',
        'Passar mais tempo configurando o aplicativo de estudo do que realmente estudando.',
        'Ficar conectado a aplicativos enquanto estuda e perder o foco com notificações de jogos ou redes.'
      ]
    },
    previnase: {
      title: 'Como manter o equilíbrio nos estudos digitais',
      passos: [
        'Tente resolver os exercícios primeiro com sua própria mente antes de consultar qualquer ferramenta.',
        'Ative o modo "Não Perturbe" ou "Foco" no celular enquanto estiver no horário de estudo.',
        'Combine o aprendizado digital com anotações à mão, leitura de livros e discussões com colegas.',
        'Não baixe materiais de fontes piratas que possam infectar seu computador com vírus.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao se sentir sobrecarregado?',
      orientacoes: [
        'Organize seu tempo em blocos curtos (como a técnica Pomodoro: 25 minutos de foco e 5 de descanso).',
        'Se tiver dúvidas sobre o uso de alguma ferramenta na escola, converse com seus professores.',
        'Lembre-se de descansar a vista e levantar para se movimentar periodicamente.'
      ],
      acolhimento: 'Aprender leva tempo e dedicação. Usar boas ferramentas faz parte do caminho, mas sua persistência é o verdadeiro segredo do sucesso.'
    },
    revise: {
      title: 'Checklist de Estudos',
      checklist: [
        'Use flashcards e mapas mentais para fixar conteúdos.',
        'Desative notificações de redes na hora de estudar.',
        'Exercite seu raciocínio antes de buscar respostas prontas.'
      ]
    }
  },
  {
    id: 'malwares',
    number: '06',
    title: 'Malwares & Arquivos Suspeitos',
    badge: 'AMEAÇAS A DISPOSITIVOS',
    badgeClass: 'red-badge',
    category: 'golpes',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="10" width="32" height="24" rx="3" stroke="currentColor" stroke-width="2"/><path d="M18 34V40M30 34V40M12 40H36" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="22" r="6" stroke="var(--accent-red)" stroke-width="2"/><path d="M21 22H27M24 19V25" stroke="var(--accent-red)" stroke-width="2"/></svg>`,
    shortDesc: 'O que são vírus, cavalos de Troia, spywares e ransomwares. Como ocorrem em downloads piratas, mods de jogos e como manter o dispositivo blindado.',
    tags: ['Vírus', 'Spyware', 'Mods de Games', 'Ransomware'],
    entenda: {
      title: 'O que são Malwares?',
      text: 'A palavra "malware" é a abreviação de "malicious software" (programa malicioso). Trata-se de qualquer código ou aplicativo desenvolvido deliberadamente para danificar computadores e celulares, espionar atividades, roubar senhas guardadas ou sequestrar arquivos exigindo resgates.',
      conceitoChave: 'A maioria dos malwares depende de um erro humano — como clicar em um download suspeito — para conseguir entrar no aparelho.'
    },
    reconheca: {
      title: 'Tipos mais frequentes e portas de entrada',
      exemplos: [
        { title: 'Trojans (Cavalos de Troia)', desc: 'Programas disfarçados de joguinhos, cheats ou instaladores que trazem código malicioso escondido.' },
        { title: 'Spyware e Infostealers', desc: 'Programas espiões que capturam o que você digita no teclado e copiam senhas salvas no navegador.' },
        { title: 'Ransomware', desc: 'Malware que bloqueia e criptografa suas fotos e trabalhos escolares exigindo pagamento em criptomoedas.' },
        { title: 'Adware Abusivo', desc: 'Softwares que enchem a tela do celular de propagandas intrusivas e abrem sites desconhecidos sozinhos.' }
      ],
      sinaisAlerta: [
        'Aparelho subitamente muito lento, esquentando sem uso ou com bateria acabando rápido demais.',
        'Janelas de navegador e abas que se abrem sozinhas com avisos falsos de "Seu celular está infectado".',
        'Ícones de aplicativos novos aparecendo na tela sem que você se lembre de ter instalado.',
        'Extensões estranhas em arquivos (como documento.pdf.exe).'
      ]
    },
    previnase: {
      title: 'Como blindar seus aparelhos',
      passos: [
        'Baixe jogos, aplicativos e atualizações apenas de lojas oficiais (Google Play, App Store, Steam, etc.).',
        'Nunca baixe cheats, geradores de moedas ou cópias piratas de jogos.',
        'Não clique em links de downloads em fóruns desconhecidos ou descrições de vídeos do YouTube.',
        'Mantenha as proteções integradas do sistema (como Windows Defender e Play Protect) sempre ativas.',
        'Faça cópias de segurança (backup) dos seus arquivos importantes na nuvem ou em um pendrive.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer se suspeitar de infecção?',
      orientacoes: [
        'Desconecte o aparelho da internet (desligue o Wi-Fi e os dados móveis) para impedir vazamento de dados.',
        'Não digite senhas nem acesse aplicativos de banco no aparelho suspeito.',
        'Execute uma varredura completa com um programa antivírus confiável com ajuda de um responsável.',
        'Troque senhas essenciais a partir de outro computador ou celular sabidamente seguro.'
      ],
      acolhimento: 'Não esconda o problema se o computador começar a travar. Avise seus pais na hora: resolver no começo é muito mais fácil do que depois.'
    },
    revise: {
      title: 'Checklist Antimalware',
      checklist: [
        'Downloads apenas de fontes oficiais e confiáveis.',
        'Nunca desative o antivírus para rodar um arquivo suspeito.',
        'Mantenha backups regulares de seus trabalhos.'
      ]
    }
  },
  {
    id: 'phishing',
    number: '07',
    title: 'Phishing & Páginas Falsas',
    badge: 'PESCARIA DE DADOS',
    badgeClass: 'red-badge',
    category: 'golpes',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 12L24 24L40 12M8 12H40V36H8V12Z" stroke="currentColor" stroke-width="2"/><path d="M28 28L34 34M34 28L28 34" stroke="var(--accent-red)" stroke-width="2"/></svg>`,
    shortDesc: 'Mensagens e sites clones criados para roubar senhas, códigos e dados pessoais. Como verificar URLs, entender smishing e não se iludir pelo cadeado HTTPS.',
    tags: ['E-mails Falsos', 'Smishing', 'Links Clones', 'Cadeado HTTPS'],
    entenda: {
      title: 'O que é Phishing?',
      text: 'A palavra vem de "fishing" (pescaria). É uma técnica em que golpistas lançam "iscas" — mensagens por e-mail, SMS (smishing), WhatsApp ou redes sociais — fingindo ser serviços conhecidos (escolas, Netflix, bancos, Roblox, Instagram) para induzir você a morder o anzol e digitar sua senha ou dados de cartão.',
      conceitoChave: 'Nenhuma empresa ou escola respeitável pede sua senha ou código de verificação por mensagem privada.'
    },
    reconheca: {
      title: 'Formatos comuns e sinais reveladores',
      exemplos: [
        { title: 'Falso Alerta de Bloqueio', desc: '"Sua conta será cancelada em 2 horas caso não confirme seus dados neste link".' },
        { title: 'Falsa Entrega de Encomenda', desc: 'SMS dizendo que há uma taxa pendente dos Correios com link para pagamento rápido.' },
        { title: 'Página Clonada de Login', desc: 'Tela idêntica à do Instagram, Google ou Discord feita apenas para registrar o que você digita.' },
        { title: 'Smishing e Vishing', desc: 'Mensagens de texto ou ligações telefônicas fingindo ser da central de segurança da sua escola ou banco.' }
      ],
      sinaisAlerta: [
        'Erros sutis no endereço do site (ex: www.g00gle.com, netfIix-login.com).',
        'Tom de extrema urgência provocando medo ou ganância.',
        'Links recebidos de números de telefone não cadastrados ou e-mails com domínios gratuitos estranhos.',
        'Promessas de brindes que exigem login fora da plataforma oficial.'
      ]
    },
    previnase: {
      title: 'Como não cair no anzol do phishing',
      passos: [
        'Acesse os serviços digitando o endereço diretamente no navegador ou abrindo o aplicativo oficial.',
        'Examine atentamente o domínio completo na barra de endereços antes de digitar qualquer dado.',
        'Ative a autenticação em duas etapas (MFA): mesmo se pegarem sua senha, não conseguirão entrar.',
        'Lembre-se: o cadeado HTTPS só garante que a conexão é segura, NÃO que o site seja honesto.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer se inseriu dados em uma página falsa?',
      orientacoes: [
        'Aja rápido: abra o site verdadeiro e altere sua senha imediatamente.',
        'Se você usa a mesma senha em outros serviços, mude em todos eles agora mesmo.',
        'Encerre todas as sessões ativas nas configurações de segurança da sua conta.',
        'Avise seus pais ou professores caso a mensagem mencione finanças ou a escola.'
      ],
      acolhimento: 'Páginas falsas são feitas para enganar até adultos com anos de experiência. Se caiu em uma, aja rápido para trocar as senhas e aprenda com o ocorrido.'
    },
    revise: {
      title: 'Checklist Antiphishing',
      checklist: [
        'Verifique a URL completa antes de logar.',
        'Urgência com link = probabilidade altíssima de golpe.',
        'MFA ativado protege você mesmo se a senha vazar.'
      ]
    }
  },
  {
    id: 'engenharia-social',
    number: '08',
    title: 'Golpes de Engenharia Social',
    badge: 'MANIPULAÇÃO PSICOLÓGICA',
    badgeClass: 'red-badge',
    category: 'golpes',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6V18M24 30V42M14 16L34 32M14 32L34 16" stroke="currentColor" stroke-width="2" stroke-dasharray="2 4"/><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="var(--accent-red)"/></svg>`,
    shortDesc: 'A ciência de manipular emoções para obter acessos, dinheiro e segredos: gatilhos de urgência, medo, autoridade e falsos amigos.',
    tags: ['Gatilho de Urgência', 'Falsos Familiares', 'Manipulação', 'Códigos SMS'],
    entenda: {
      title: 'O que é Engenharia Social?',
      text: 'Em cibersegurança, engenharia social é o uso de manipulação psicológica para fazer com que as pessoas quebrem regras de segurança, cliquem em links perigosos, transfiram dinheiro ou entreguem códigos de acesso. Em vez de atacar computadores com linhas de código complexas, o golpista ataca a confiança e as emoções humanas.',
      conceitoChave: 'Os golpistas exploram o medo de perder algo, a pressa, a curiosidade ou o desejo de ajudar quem parece estar em apuros.'
    },
    reconheca: {
      title: 'Gatilhos mentais e cenários cotidianos',
      exemplos: [
        { title: 'Falso Número de Familiar', desc: 'Golpista manda mensagem dizendo "troquei de número, anota aí" e depois inventa uma emergência pedindo Pix.' },
        { title: 'Falso Suporte de Plataforma', desc: 'Mensagem fingindo ser moderador do Discord ou WhatsApp pedindo o código de 6 dígitos recebido por SMS.' },
        { title: 'Oportunidade Imperdível', desc: 'Proposta de "trabalho fácil" para curtir vídeos e ganhar dinheiro, exigindo depósito inicial.' },
        { title: 'Apelo Emocional e Medo', desc: 'Histórias dramáticas inventadas de saúde ou ameaças de processos judiciais inexistentes.' }
      ],
      sinaisAlerta: [
        'Exigência para não consultar ninguém: "Faça agora e não conte para seus pais".',
        'Pressão para manter segredo e agir antes que dê tempo de pensar com clareza.',
        'Pedidos de códigos de confirmação de aplicativos recebidos no celular.',
        'Mudança repentina de conta de pagamento ou tom de conversa diferente do habitual.'
      ]
    },
    previnase: {
      title: 'Como se defender da manipulação',
      passos: [
        'Respire fundo e pause: a urgência é a arma principal do golpista.',
        'Confirme pedidos de dinheiro ligando para o número antigo e conhecido da pessoa.',
        'Nunca, sob hipótese alguma, repasse códigos de autenticação recebidos por SMS.',
        'Desconfie de pedidos de ajuda de pessoas que você só conhece pela internet.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao desconfiar de um golpe?',
      orientacoes: [
        'Não responda nem ceda à chantagem. Interrompa a conversa na hora.',
        'Ligue diretamente para a pessoa citada ou procure um adulto de confiança.',
        'Se compartilhou códigos ou senhas, entre imediatamente nas configurações do aplicativo e recupere o acesso.',
        'Bloqueie o contato e denuncie na plataforma.'
      ],
      acolhimento: 'Ser enganado por alguém que explorou sua boa vontade não é motivo de vergonha. Converse com seus responsáveis para que possam te apoiar.'
    },
    revise: {
      title: 'Checklist de Defesa Emocional',
      checklist: [
        'Sentiu pressa ou medo? Pare e respire antes de fazer qualquer coisa.',
        'Confirme a identidade por outro canal conhecido.',
        'Código de SMS é pessoal e intransferível.'
      ]
    }
  },
  {
    id: 'ciberseguranca-habitos',
    number: '09',
    title: 'Cibersegurança & Hábitos de Defesa',
    badge: 'BLINDAGEM & HIGIENE DIGITAL',
    badgeClass: 'cyan-badge',
    category: 'defesa',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L8 12V22C8 32 15 41 24 44C33 41 40 32 40 22V12L24 4Z" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" stroke="var(--accent-cyan)" stroke-width="2"/><path d="M24 30V34" stroke="var(--accent-cyan)" stroke-width="2"/></svg>`,
    shortDesc: 'Princípios fundamentais da segurança digital: senhas fortes, gerenciadores de senhas, MFA, atualizações automáticas, backups e redes Wi-Fi públicas.',
    tags: ['Senhas Fortes', 'MFA', 'Backups', 'Wi-Fi Seguro'],
    entenda: {
      title: 'O que é Cibersegurança?',
      text: 'Cibersegurança é a prática de proteger computadores, celulares, redes, contas e dados contra ataques e acessos indevidos. A segurança digital de uma pessoa não depende de supercomputadores caros, mas de atitudes diárias simples — da mesma forma que trancamos a porta de casa e olhamos para os dois lados antes de atravessar a rua.',
      conceitoChave: 'A segurança da sua vida digital é construída com pequenos hábitos diários que impedem 99% das tentativas de invasão.'
    },
    reconheca: {
      title: 'Principais brechas e sinais de fragilidade',
      exemplos: [
        { title: 'Reutilização de Senhas', desc: 'Usar a mesma senha simples em redes sociais, e-mail escolar e contas de jogos.' },
        { title: 'Ausência de MFA (Duas Etapas)', desc: 'Contas que dependem apenas de senha, ficando vulneráveis a vazamentos de dados.' },
        { title: 'Aparelhos sem Atualização', desc: 'Adiar atualizações de sistema por meses, mantendo brechas conhecidas abertas.' },
        { title: 'Redes Wi-Fi Públicas Desprotegidas', desc: 'Acessar serviços essenciais ou fazer compras em redes abertas de praças e cafés.' }
      ],
      sinaisAlerta: [
        'E-mails com avisos de login feitos a partir de cidades ou aparelhos desconhecidos.',
        'Senhas com nomes de parentes, datas de aniversário ou sequências como "123456".',
        'Falta de cópias de segurança de fotos de família e trabalhos escolares importantes.'
      ]
    },
    previnase: {
      title: 'Regras de ouro da higiene digital',
      passos: [
        'Crie senhas longas (mais de 12 caracteres) combinando frases divertidas com símbolos e números.',
        'Considere usar um gerenciador de senhas confiável para não precisar memorizar dezenas de senhas.',
        'Ative a autenticação em duas etapas (MFA) em todas as contas importantes.',
        'Habilite atualizações automáticas no seu celular e computador.',
        'Evite acessar contas sensíveis conectado a redes Wi-Fi públicas sem proteção.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao ter uma conta comprometida?',
      orientacoes: [
        'Acesse a página de recuperação oficial da plataforma e redefina a senha imediatamente.',
        'Revogue todas as sessões conectadas nas opções de privacidade da conta.',
        'Revise os métodos de recuperação (e-mail e telefone) para garantir que o invasor não trocou.',
        'Avise seus amigos para que desconsiderem pedidos estranhos ou links enviados em seu nome.'
      ],
      acolhimento: 'Manter a calma é fundamental. Siga o passo a passo de recuperação com a ajuda de um adulto responsável.'
    },
    revise: {
      title: 'Checklist de Blindagem',
      checklist: [
        'Senhas longas, exclusivas e sem repetições.',
        'MFA ativado no e-mail e em todas as redes.',
        'Atualizações em dia e backups salvos.'
      ]
    }
  },
  {
    id: 'fake-news-ia',
    number: '10',
    title: 'Fake News & Conteúdo Falso com IA',
    badge: 'PENSAMENTO CRÍTICO & CHECAGEM',
    badgeClass: 'purple-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" stroke-width="2"/><path d="M12 16H24M12 22H24M12 28H18" stroke="currentColor" stroke-width="2"/><rect x="28" y="16" width="10" height="12" stroke="var(--accent-cyan)" stroke-width="2"/><circle cx="33" cy="22" r="2" fill="var(--accent-red)"/></svg>`,
    shortDesc: 'Pensamento crítico no combate à desinformação: como checar fontes, identificar manchetes sensacionalistas, detectar deepfakes e não repassar boatos.',
    tags: ['Checagem de Fatos', 'Sensacionalismo', 'Deepfakes', 'Não Repasse'],
    entenda: {
      title: 'O que são Fake News e Desinformação?',
      text: 'Fake news são informações falsas ou distorcidas divulgadas como se fossem verdades com o objetivo de enganar pessoas, gerar pânico, conseguir cliques ou difamar indivíduos e instituições. Com as ferramentas de inteligência artificial, criar imagens realistas, clonar vozes e inventar notícias parece cada vez mais autêntico.',
      conceitoChave: 'Informar-se bem exige pausar: a desinformação foi feita para provocar emoções fortes e fazer você repassar sem pensar.'
    },
    reconheca: {
      title: 'Formatos de desinformação mais comuns',
      exemplos: [
        { title: 'Manchetes Sensacionalistas', desc: 'Títulos apelativos que não correspondem ao conteúdo real da notícia (clickbait).' },
        { title: 'Vídeos Fora de Contexto', desc: 'Gravações antigas ou de outros países apresentadas como se tivessem acontecido ontem na sua cidade.' },
        { title: 'Imagens e Áudios Gerados por IA', desc: 'Fotos hiper-realistas de acontecimentos que nunca existiram ou vozes falsificadas de pessoas famosas.' },
        { title: 'Boatos Escolares em Época de Provas', desc: 'Mensagens afirmando falsamente suspensões de aula, vazamento de vestibulares ou ameaças infundadas.' }
      ],
      sinaisAlerta: [
        'Texto com letras maiúsculas exageradas, erros de pontuação e tom alarmista ("URGENTE! REPASSE PARA TODOS!").',
        'Ausência de fonte confiável, autor responsável ou data de publicação.',
        'Notícia bombástica que não aparece em nenhum dos grandes portais jornalísticos do país.',
        'Imagens com mãos estranhas, texturas de pele borradas ou letras sem sentido em placas ao fundo.'
      ]
    },
    previnase: {
      title: 'O método de checagem do detetive digital',
      passos: [
        'Leia além da manchete: confira o texto todo antes de formar uma opinião.',
        'Pesquise a informação em mais de um veículo de comunicação independente e confiável.',
        'Consulte agências profissionais de checagem de fatos (como Fato ou Fake, Aos Fatos e Lupa).',
        'Na dúvida sobre a veracidade, NUNCA compartilhe em grupos de mensagens ou redes.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer ao se deparar com uma fake news?',
      orientacoes: [
        'Não comente nem compartilhe a publicação ofensiva, pois isso amplia o alcance do algoritmo.',
        'Se um amigo ou familiar compartilhou um boato em grupo, alerte com educação enviando o link da checagem real.',
        'Denuncie a publicação na própria rede social como conteúdo falso ou desinformação.',
        'Se envolver acusações contra pessoas da sua escola, converse com professores e responsáveis.'
      ],
      acolhimento: 'Errar e cair em uma notícia falsa já aconteceu com quase todo mundo. O importante é desenvolver o hábito de checar antes de passar para frente.'
    },
    revise: {
      title: 'Checklist da Verdade',
      checklist: [
        'Cheque antes de repassar.',
        'Desconfie de notícias que provocam pânico ou raiva.',
        'Consulte fontes oficiais e agências de checagem.'
      ]
    }
  },
  {
    id: 'senhas-mfa',
    number: '11',
    title: 'Senhas & Autenticação Multifator',
    badge: 'MÓDULO COMPLEMENTAR',
    badgeClass: 'cyan-badge',
    category: 'defesa',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="20" width="24" height="20" rx="4" stroke="currentColor" stroke-width="2"/><path d="M18 20V14C18 10.7 20.7 8 24 8C27.3 8 30 10.7 30 14V20" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="30" r="3" fill="var(--accent-cyan)"/></svg>`,
    shortDesc: 'Aprenda a criar frases-senha inquebráveis, usar gerenciadores de senhas e configurar aplicativos autenticadores em todas as suas contas essenciais.',
    tags: ['Frases-Senha', 'MFA via App', 'Gerenciadores', 'Tokens'],
    entenda: {
      title: 'Por que apenas uma senha simples não é suficiente?',
      text: 'Computadores modernos conseguem testar bilhões de senhas por segundo. Senhas curtas ou óbvias (como nomes de animais de estimação ou sequências numéricas) são descobertas em frações de segundo. A autenticação multifator (MFA) acrescenta uma segunda barreira: algo que você sabe (sua senha) mais algo que você tem (seu celular com um código temporário de aplicativo).',
      conceitoChave: 'Mesmo que um invasor descubra sua senha em um vazamento, com o MFA ativado ele continuará do lado de fora.'
    },
    reconheca: {
      title: 'Diferença entre senhas fracas e seguras',
      exemplos: [
        { title: 'Senha Fraca', desc: 'mari123, flamengo2024, data de nascimento. Descoberta em segundos.' },
        { title: 'Frase-Senha Segura', desc: 'MeuGatoPipoca!Salta2026# (longa, fácil de lembrar e dificílima para robôs).' },
        { title: 'MFA por Aplicativo vs. SMS', desc: 'Aplicativos (Google Authenticator) são muito mais seguros do que códigos enviados por SMS.' }
      ],
      sinaisAlerta: [
        'Utilizar a mesma senha para o e-mail principal e para jogos online.',
        'Anotar senhas em bloco de notas desprotegido no celular.',
        'Ignorar avisos do navegador de que sua senha foi encontrada em vazamentos.'
      ]
    },
    previnase: {
      title: 'Passos para proteger suas contas agora',
      passos: [
        'Crie senhas com pelo menos 14 caracteres combinando palavras aleatórias.',
        'Ative a verificação em duas etapas no seu e-mail principal primeiro (ele é a chave de todas as outras contas).',
        'Salve códigos de recuperação em um lugar seguro fora do computador.',
        'Nunca informe códigos de verificação para ninguém que peça por mensagem.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer se desconfiar de vazamento?',
      orientacoes: [
        'Troque a senha da conta imediatamente por uma totalmente nova.',
        'Ative o MFA usando um aplicativo autenticador.',
        'Verifique os e-mails e números de recuperação cadastrados.'
      ],
      acolhimento: 'Proteger suas contas é um hábito que você levará para a vida inteira. Comece hoje mesmo pela sua conta de e-mail.'
    },
    revise: {
      title: 'Checklist de Senhas',
      checklist: [
        'Senhas longas em forma de frases.',
        'MFA ativado no e-mail e redes sociais.',
        'Códigos de recuperação salvos com segurança.'
      ]
    }
  },
  {
    id: 'privacidade-pegada-digital',
    number: '12',
    title: 'Privacidade & Pegada Digital',
    badge: 'MÓDULO COMPLEMENTAR',
    badgeClass: 'cyan-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8C14 8 6 16 6 24C6 32 14 40 24 40C34 40 42 32 42 24C42 16 34 8 24 8Z" stroke="currentColor" stroke-width="2"/><path d="M16 24C16 20 20 16 24 16C28 16 32 20 32 24C32 28 28 32 24 32" stroke="var(--accent-cyan)" stroke-width="2"/></svg>`,
    shortDesc: 'O que é pegada digital e como tudo o que fazemos na internet constrói nossa história e reputação para o futuro. Cuidados com dados pessoais e a LGPD.',
    tags: ['Pegada Digital', 'Dados Pessoais', 'Permissões', 'LGPD'],
    entenda: {
      title: 'O que é Pegada Digital?',
      text: 'Cada pesquisa no Google, foto publicada, comentário feito em vídeo, curtida ou aplicativo instalado deixa um rastro indelével chamado "pegada digital". Essa pegada pode ser encontrada por faculdades, empregadores, amigos e familiares muitos anos depois. Compreender seus dados pessoais é o primeiro passo para ter controle sobre a própria história.',
      conceitoChave: 'A internet tem memória infinita: publique somente aquilo de que você se orgulharia de ver em um telão público amanhã.'
    },
    reconheca: {
      title: 'Exemplos de pegada digital positiva e negativa',
      exemplos: [
        { title: 'Pegada Negativa', desc: 'Comentários preconceituosos antigos, postagens com ofensas ou exposição de brigas que prejudicam oportunidades futuras.' },
        { title: 'Pegada Positiva', desc: 'Compartilhar projetos escolares, hobbies criativos, desenhos, códigos ou esportes que demonstram talentos.' },
        { title: 'Permissões Abusivas em Apps', desc: 'Jogos pedindo acesso ao microfone, contatos e localização sem nenhuma necessidade funcional.' }
      ],
      sinaisAlerta: [
        'Publicar desabafos com raiva que expõem detalhes íntimos de amigos ou da família.',
        'Instalar aplicativos sem ler as permissões de privacidade solicitadas.',
        'Pesquisar seu próprio nome no Google e encontrar fotos ou dados que deveriam ser privados.'
      ]
    },
    previnase: {
      title: 'Como manter sua pegada limpa e segura',
      passos: [
        'Antes de publicar, faça a regra dos 10 segundos: imagine seus avós ou professores lendo aquilo.',
        'Revise as permissões de aplicativos nas configurações do seu celular e revogue acessos desnecessários.',
        'Pesquise seu nome no Google periodicamente para saber o que está público sobre você.',
        'Respeite a imagem dos seus amigos: nunca poste fotos deles sem autorização.'
      ]
    },
    saibaAgir: {
      title: 'Como apagar conteúdos comprometedores?',
      orientacoes: [
        'Exclua publicações antigas ou torne seu perfil privado para conter o alcance.',
        'Peça educadamente para quem postou fotos suas sem consentimento retirá-las do ar.',
        'Em casos de vazamentos graves, procure a SaferNet Brasil para orientação de remoção legal.'
      ],
      acolhimento: 'Todo mundo amadurece e muda de ideia. Cuidar da sua privacidade hoje é um presente para o seu futuro.'
    },
    revise: {
      title: 'Checklist de Privacidade',
      checklist: [
        'Pense antes de postar.',
        'Revise permissões de aplicativos no celular.',
        'Peça autorização antes de postar fotos de amigos.'
      ]
    }
  },
  {
    id: 'protecao-assedio',
    number: '13',
    title: 'Proteção contra Assédio & Aliciamento',
    badge: 'MÓDULO COMPLEMENTAR — PROTEÇÃO TOTAL',
    badgeClass: 'purple-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L8 12V24C8 34 15 42 24 44C33 42 40 34 40 24V12L24 4Z" stroke="currentColor" stroke-width="2"/><path d="M24 16V28M18 22H30" stroke="var(--accent-red)" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    shortDesc: 'Reconhecendo tentativas de manipulação, chantagem com fotos e pedidos inadequados de estranhos ou conhecidos. Como recusar, bloquear e pedir ajuda sem culpa.',
    tags: ['Acolhimento', 'Sem Culpa', 'Canais de Ajuda', 'SaferNet & Disque 100'],
    entenda: {
      title: 'Proteção Integral de Crianças e Adolescentes',
      text: 'O aliciamento e o assédio online acontecem quando alguém (seja um desconhecido na internet ou até alguém conhecido) tenta ganhar a confiança de uma criança ou adolescente para pedir segredos, fotos íntimas, vídeos ou encontros escondidos. Quem faz isso costuma usar elogios excessivos, presentes em jogos ou ameaças para assustar a vítima.',
      conceitoChave: 'Ninguém tem o direito de exigir fotos suas, fazer chantagens ou pedir segredos. A culpa NUNCA é de quem sofreu a chantagem.'
    },
    reconheca: {
      title: 'Sinais de alerta de aliciamento e chantagem',
      exemplos: [
        { title: 'Tentativa de Criar Segredos', desc: '"Essa é nossa conversa secreta, não mostre para seus pais nem para seus amigos".' },
        { title: 'Presentes em Jogos em Troca de Intimidade', desc: 'Pessoas oferecendo itens caros e pedindo para migrar para canais privados de vídeo ou fotos.' },
        { title: 'Chantagem com Fotos (Sextorsão)', desc: 'Ameaçar divulgar uma foto ou conversa caso a pessoa não mande mais imagens ou dinheiro.' }
      ],
      sinaisAlerta: [
        'Pessoas que insistem em manter conversas privadas em horários incomuns.',
        'Sensação de medo, angústia ou vergonha ao receber notificações de uma pessoa específica.',
        'Ameaças de prejudicar sua família ou sua reputação na escola.'
      ]
    },
    previnase: {
      title: 'Como se defender preventivamente',
      passos: [
        'Nunca envie fotos íntimas ou particulares pela internet: uma vez enviadas, perdem-se o controle sobre elas.',
        'Desconfie de adultos ou jovens desconhecidos que queiram ser íntimos rápido demais em jogos ou redes.',
        'Recuse categoricamente pedidos de segredo.',
        'Mantenha diálogo aberto com pessoas de sua confiança na família ou na escola.'
      ]
    },
    saibaAgir: {
      title: 'O que fazer se alguém estiver chantageando você?',
      orientacoes: [
        'Interrompa o contato imediatamente. NÃO envie mais fotos nem dinheiro: quem chantageia nunca para ao receber o que pede.',
        'Guarde as evidências: tire capturas de tela das mensagens e perfis.',
        'Procure imediatamente um adulto de confiança (pais, professores ou psicólogos escolares).',
        'Acione os canais oficiais e confidenciais: Disque 100 (Disque Direitos Humanos) e o Helpline da SaferNet Brasil (helpline.org.br).'
      ],
      acolhimento: 'Você não fez nada de errado. Adultos e autoridades especializadas sabem exatamente como te proteger e resolver o problema sem que você seja exposto ou punido.'
    },
    revise: {
      title: 'Checklist de Proteção',
      checklist: [
        'Nenhum segredo com estranhos na internet.',
        'Chantagem? Não ceda, guarde prints e avise adultos.',
        'A culpa NUNCA é da vítima. Peça ajuda sem medo.'
      ]
    }
  },
  {
    id: 'etica-cidadania-digital',
    number: '14',
    title: 'Ética, Cidadania & Convivência',
    badge: 'MÓDULO COMPLEMENTAR',
    badgeClass: 'green-badge',
    category: 'cidadania',
    iconSvg: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2"/><path d="M12 24C12 24 16 16 24 16C32 16 36 24 36 24C36 24 32 32 24 32C16 32 12 24 12 24Z" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="var(--accent-cyan)"/></svg>`,
    shortDesc: 'Construindo uma comunidade online inclusiva, ética e respeitosa: direitos autorais, plágio, empatia e o papel de cada estudante na cultura digital.',
    tags: ['Cidadania', 'Direitos Autorais', 'Empatia', 'Inclusão'],
    entenda: {
      title: 'O que é Cidadania Digital?',
      text: 'Assim como exercemos a cidadania na nossa cidade respeitando leis e cuidando dos espaços comuns, a cidadania digital é a prática de agir com ética, empatia, responsabilidade e respeito aos direitos alheios no ambiente virtual. Ser um bom cidadão digital significa usar a tecnologia para somar, apoiar pessoas e enriquecer o conhecimento coletivo.',
      conceitoChave: 'A internet é feita de pessoas reais. Trate os outros online exatamente como você gostaria de ser tratado.'
    },
    reconheca: {
      title: 'Práticas éticas e direitos autorais',
      exemplos: [
        { title: 'Respeito aos Direitos Autorais', desc: 'Citar fontes de imagens, textos e músicas utilizadas em trabalhos escolares em vez de plagiar.' },
        { title: 'Combate ao Discurso de Ódio', desc: 'Não tolerar preconceito de raça, gênero, religião ou orientação em jogos e redes.' },
        { title: 'Apoio Mútuo nos Estudos', desc: 'Usar grupos de mensagens para compartilhar explicações, resumos e incentivar colegas.' }
      ],
      sinaisAlerta: [
        'Utilizar o anonimato da internet para fazer comentários cruéis que jamais diria pessoalmente.',
        'Apropriar-se de artes ou textos de colegas dizendo que foram feitos por você.'
      ]
    },
    previnase: {
      title: 'Como ser um cidadão digital exemplar',
      passos: [
        'Dê crédito aos autores das obras e ideias que você utilizar.',
        'Promova discussões construtivas, mesmo quando discordar de opiniões alheias.',
        'Seja a voz que acalma e protege colegas quando um conflito começar.',
        'Use seus conhecimentos digitais para ajudar quem tem mais dificuldade com a tecnologia.'
      ]
    },
    saibaAgir: {
      title: 'Como agir diante de injustiças online?',
      orientacoes: [
        'Não permaneça em silêncio quando presenciar injustiças ou crueldades.',
        'Denuncie conteúdos ilegais ou de ódio na própria plataforma.',
        'Converse com a coordenação da sua escola para criar projetos de cultura digital positiva.'
      ],
      acolhimento: 'Cada atitude positiva sua na internet ajuda a construir uma rede mais segura e acolhedora para milhares de pessoas.'
    },
    revise: {
      title: 'Checklist de Cidadania',
      checklist: [
        'Respeito e empatia sempre em primeiro lugar.',
        'Dê os devidos créditos aos autores das ideias.',
        'Use a tecnologia para apoiar e inspirar sua comunidade.'
      ]
    }
  }
];

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: Array<{
    letter: 'A' | 'B' | 'C';
    text: string;
    isSafe: boolean;
    explanation: string;
  }>;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'Você recebe uma mensagem de um colega da escola no WhatsApp dizendo: "Entra urgente nesse link pra ganhar 2.000 Robux / V-Bucks grátis! Só precisa colocar seu e-mail e senha da conta!".',
    question: 'Qual é a atitude mais segura a ser tomada?',
    options: [
      {
        letter: 'A',
        text: 'Clicar no link e digitar a senha rápido antes que a promoção acabe.',
        isSafe: false,
        explanation: 'Incorreto! Trata-se de uma tentativa clássica de phishing. Ao colocar a senha, você terá sua conta roubada.'
      },
      {
        letter: 'B',
        text: 'Não clicar no link, avisar o amigo que a conta dele pode ter sido invadida e não repassar para ninguém.',
        isSafe: true,
        explanation: 'Correto! Plataformas oficiais nunca distribuem moedas grátis através de páginas de login de terceiros. Avisar o amigo é atitude de cidadão digital.'
      },
      {
        letter: 'C',
        text: 'Repassar o link no grupo da sala de aula para ver se funciona com alguém.',
        isSafe: false,
        explanation: 'Incorreto! Repassar o link coloca em risco todos os seus colegas de escola.'
      }
    ]
  },
  {
    id: 2,
    scenario: 'Em um grupo da turma, alguém postou uma montagem ofensiva feita com inteligência artificial distorcendo a imagem de uma colega e todos começaram a rir e marcar a pessoa.',
    question: 'Qual deve ser sua postura diante do ocorrido?',
    options: [
      {
        letter: 'A',
        text: 'Não participar do ataque, manifestar apoio à colega no privado, tirar prints e avisar a coordenação da escola.',
        isSafe: true,
        explanation: 'Correto! Essa atitude quebra o ciclo do cyberbullying, apoia a vítima e permite que a escola adote medidas pedagógicas seguras.'
      },
      {
        letter: 'B',
        text: 'Criar outra montagem ofensiva contra quem começou o ataque para vingar a colega.',
        isSafe: false,
        explanation: 'Incorreto! Revidar com outra agressão apenas escala o ódio e gera mais violência no ambiente escolar.'
      },
      {
        letter: 'C',
        text: 'Curtir e encaminhar para amigos de outras salas para mostrar o que aconteceu.',
        isSafe: false,
        explanation: 'Incorreto! Quem encaminha ou ri de conteúdos humilhantes está sendo cúmplice da agressão.'
      }
    ]
  },
  {
    id: 3,
    scenario: 'Você está no TikTok e vê um vídeo com a voz e imagem de uma autoridade famosa anunciando que amanhã as aulas no estado inteiro foram suspensas por causa de um perigo meteorológico. O vídeo não tem link de portal oficial de notícias.',
    question: 'O que você deve fazer antes de acreditar ou repassar?',
    options: [
      {
        letter: 'A',
        text: 'Encaminhar imediatamente para o grupo da família dizendo que não vai ter aula.',
        isSafe: false,
        explanation: 'Incorreto! Propagar desinformação sem checar causa pânico e confusão em centenas de famílias.'
      },
      {
        letter: 'B',
        text: 'Pesquisar nos canais oficiais da escola e nos principais portais jornalísticos para confirmar a notícia.',
        isSafe: true,
        explanation: 'Correto! Hoje ferramentas de IA clonam vozes e rostos facilmente. Notícias importantes sempre aparecem nos canais oficiais.'
      },
      {
        letter: 'C',
        text: 'Comentar no vídeo pedindo para o perfil mandar o Pix de quem publicou.',
        isSafe: false,
        explanation: 'Incorreto! Isso não resolve a dúvida e ainda gera engajamento para a publicação mentirosa.'
      }
    ]
  },
  {
    id: 4,
    scenario: 'Seu professor de ciências passou uma pesquisa sobre aquecimento global. Você quer usar uma ferramenta de inteligência artificial (como ChatGPT ou Gemini) para auxiliar.',
    question: 'Qual é o uso mais inteligente, ético e proveitoso da ferramenta?',
    options: [
      {
        letter: 'A',
        text: 'Pedir para a IA escrever o trabalho inteiro, copiar, colar e entregar fingindo que você escreveu.',
        isSafe: false,
        explanation: 'Incorreto! Isso é plágio, a IA pode inventar dados (alucinação) e você não aprenderá nada.'
      },
      {
        letter: 'B',
        text: 'Pedir à IA para explicar os conceitos com exemplos do dia a dia, sugerir tópicos de estudo e conferir tudo nos livros didáticos.',
        isSafe: true,
        explanation: 'Correto! Usar a IA como tutora para esclarecer dúvidas e inspirar o raciocínio estimula o aprendizado real com rigor ético.'
      },
      {
        letter: 'C',
        text: 'Digitar no chat da IA o nome completo, telefone e endereço de todos os colegas do grupo de trabalho.',
        isSafe: false,
        explanation: 'Incorreto! Nunca devemos colocar dados pessoais ou de terceiros em ferramentas de inteligência artificial.'
      }
    ]
  },
  {
    id: 5,
    scenario: 'Enquanto joga online, um usuário que você conheceu há dois dias diz que é muito seu amigo, promete te presentear com passes de temporada e pede para vocês conversarem em segredo pelo Discord, pedindo fotos particulares suas.',
    question: 'O que essa situação indica e como agir?',
    options: [
      {
        letter: 'A',
        text: 'É um sinal clássico de aliciamento online. Recuse imediatamente, não mande nada, bloqueie e conte para um adulto de confiança.',
        isSafe: true,
        explanation: 'Correto! Pedidos de segredo e presentes em troca de intimidade são alertas vermelhos gravíssimos. Falar com seus pais é a atitude mais segura.'
      },
      {
        letter: 'B',
        text: 'Aceitar os presentes e mandar apenas fotos do seu uniforme escolar para ele ver onde você estuda.',
        isSafe: false,
        explanation: 'Incorreto! Expor seu uniforme e imagens pessoais coloca sua integridade física em alto risco.'
      },
      {
        letter: 'C',
        text: 'Manter a conversa em segredo absoluto para que seus pais não descubram que você joga online.',
        isSafe: false,
        explanation: 'Incorreto! O segredo é a principal ferramenta usada por abusadores para isolar a vítima de quem pode protegê-la.'
      }
    ]
  },
  {
    id: 6,
    scenario: 'Você recebe uma mensagem no WhatsApp de um número desconhecido com a foto da sua mãe dizendo: "Filho(a), troquei de número porque meu celular caiu na água. Preciso urgente que você pague esse Pix de R$ 90 para o entregador".',
    question: 'Qual é o procedimento mais seguro e correto?',
    options: [
      {
        letter: 'A',
        text: 'Fazer o Pix correndo antes que o entregador vá embora.',
        isSafe: false,
        explanation: 'Incorreto! Esse é o clássico golpe do novo número. Golpistas pegam fotos de perfis públicos para fingir emergências familiares.'
      },
      {
        letter: 'B',
        text: 'Ligar imediatamente para o número habitual conhecido da sua mãe ou falar pessoalmente com ela antes de qualquer ação.',
        isSafe: true,
        explanation: 'Correto! Sempre confirme pedidos de dinheiro por outro canal conhecido e independente. Jamais faça transferências impulsivas.'
      },
      {
        letter: 'C',
        text: 'Pedir para a pessoa mandar uma foto do documento de identidade pelo próprio chat suspeito.',
        isSafe: false,
        explanation: 'Incorreto! Documentos falsos podem ser forjados ou roubados. A única forma segura é o contato direto com a pessoa de confiança.'
      }
    ]
  },
  {
    id: 7,
    scenario: 'Você vai configurar o acesso à sua conta de e-mail e aos seus jogos favoritos para garantir que ninguém consiga invadi-los.',
    question: 'Qual é a melhor combinação de segurança recomendada pela CyberTech?',
    options: [
      {
        letter: 'A',
        text: 'Usar sua data de nascimento como senha e anotá-la na capinha do celular.',
        isSafe: false,
        explanation: 'Incorreto! Datas de nascimento são os primeiros palpites testados por invasores em ataques de força bruta.'
      },
      {
        letter: 'B',
        text: 'Criar uma senha longa e única (como uma frase incomum com letras, números e símbolos) e ativar a Autenticação Multifator (MFA/2FA).',
        isSafe: true,
        explanation: 'Correto! Senhas fortes e autenticação em dois fatores criam uma camada dupla intransponível para invasores comuns.'
      },
      {
        letter: 'C',
        text: 'Usar a mesma senha forte em todos os sites e redes sociais para não esquecer.',
        isSafe: false,
        explanation: 'Incorreto! Reutilizar senhas faz com que o vazamento de um único site exponha todas as suas outras contas.'
      }
    ]
  },
  {
    id: 8,
    scenario: 'Em um vídeo no YouTube sobre jogos, a descrição traz um link para download de um "mod milagroso com dinheiro infinito", mas o navegador alerta que o arquivo pode conter malware.',
    question: 'Como reagir diante desse alerta de perigo?',
    options: [
      {
        letter: 'A',
        text: 'Desativar o antivírus temporariamente para forçar a instalação do mod.',
        isSafe: false,
        explanation: 'Incorreto! Desativar proteções é a porta de entrada para vírus, keyloggers que roubam senhas e ransomwares que bloqueiam seu computador.'
      },
      {
        letter: 'B',
        text: 'Interromper o download imediatamente, não executar o arquivo e baixar extensões e jogos apenas de lojas oficiais.',
        isSafe: true,
        explanation: 'Correto! Mods e downloads piratas de origens desconhecidas são os principais veículos de distribuição de códigos maliciosos.'
      },
      {
        letter: 'C',
        text: 'Executar o arquivo e mandar para amigos para testar se trava o celular deles primeiro.',
        isSafe: false,
        explanation: 'Incorreto! Disseminar arquivos perigosos prejudica a comunidade e seus amigos.'
      }
    ]
  },
  {
    id: 9,
    scenario: 'Você quer postar uma foto divertida tirada com os amigos no pátio da escola durante o recreio.',
    question: 'Quais cuidados de privacidade e cidadania digital você deve ter antes de publicar?',
    options: [
      {
        letter: 'A',
        text: 'Pedir permissão aos amigos antes de postar e evitar expor o nome da escola, horários de entrada e sua localização em tempo real.',
        isSafe: true,
        explanation: 'Correto! Respeitar a imagem e o consentimento dos outros e proteger sua localização física são práticas fundamentais de cidadania digital.'
      },
      {
        letter: 'B',
        text: 'Marcar a localização exata da escola e postar em modo público para ganhar o máximo de seguidores desconhecidos.',
        isSafe: false,
        explanation: 'Incorreto! Expor rotina escolar e localização em tempo real para desconhecidos gera graves riscos à sua segurança física.'
      },
      {
        letter: 'C',
        text: 'Postar fotos zombando da cara de um colega sem que ele saiba.',
        isSafe: false,
        explanation: 'Incorreto! Publicar imagens depreciativas sem consentimento é uma forma direta de violência digital e cyberbullying.'
      }
    ]
  },
  {
    id: 10,
    scenario: 'Uma mensagem se passando pela moderação do seu jogo favorito avisa: "Sua conta será permanentemente deletada em 10 minutos! Envie agora o código de 6 dígitos que chegou por SMS para confirmar que você é o dono".',
    question: 'Qual é o golpe que está acontecendo e como se defender?',
    options: [
      {
        letter: 'A',
        text: 'Enviar o código correndo para não perder o progresso do jogo.',
        isSafe: false,
        explanation: 'Incorreto! O código SMS recebido é a chave de acesso ou recuperação da sua conta. Ao entregá-lo, o golpista assume o controle total.'
      },
      {
        letter: 'B',
        text: 'É um golpe de engenharia social com falso senso de urgência. Nunca compartilhe códigos de verificação recebidos e ignore ou denuncie a mensagem.',
        isSafe: true,
        explanation: 'Correto! Golpistas usam urgência e ameaças de perda para desligar seu raciocínio crítico. Suportes oficiais NUNCA pedem códigos por chat.'
      },
      {
        letter: 'C',
        text: 'Passar o número de telefone de um amigo para que ele receba o código no seu lugar.',
        isSafe: false,
        explanation: 'Incorreto! Isso apenas transfere a tentativa de invasão para seu amigo.'
      }
    ]
  }
];

