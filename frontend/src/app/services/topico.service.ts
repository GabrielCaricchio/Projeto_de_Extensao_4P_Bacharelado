import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Topico } from '../models/topico.model';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private topicos: Topico[] = [
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
        },
        {
          pergunta: 'Alguém na internet pede o código de confirmação que acabou de chegar no seu celular por SMS. Você deve:',
          opcoes: ['Passar o código se a pessoa parecer simpática.', 'Nunca passar o código para ninguém, pois ele protege sua conta.', 'Postar o código nos stories.'],
          indiceCorreto: 1,
          explicacao: 'Esse código é a chave da sua conta. Quem o tiver pode roubar seu acesso.'
        },
        {
          pergunta: 'Um e-mail do banco pede que você clique em um link para atualizar sua senha. O que fazer?',
          opcoes: ['Clicar no link e preencher os dados.', 'Não clicar e acessar o aplicativo ou site oficial digitando o endereço.', 'Encaminhar o e-mail para os amigos.'],
          indiceCorreto: 1,
          explicacao: 'Mensagens falsas podem imitar bancos. Acesse o serviço pelos canais oficiais.'
        },
        {
          pergunta: 'Uma pessoa liga dizendo ser do banco e pede a senha completa do cartão para cancelar uma compra. Você deve:',
          opcoes: ['Informar a senha para resolver rápido.', 'Desligar e ligar para o número oficial do banco.', 'Enviar uma foto do cartão.'],
          indiceCorreto: 1,
          explicacao: 'Bancos não precisam da sua senha completa por telefone. Confirme o contato pelos canais oficiais.'
        },
        {
          pergunta: 'Antes de confirmar um PIX, você percebe que o nome de quem vai receber não é o esperado. Qual é a atitude segura?',
          opcoes: ['Confirmar mesmo assim para não perder tempo.', 'Cancelar e conferir os dados com quem pediu o pagamento por outro canal.', 'Mandar outro PIX para testar.'],
          indiceCorreto: 1,
          explicacao: 'Confira nome, instituição e valor antes de confirmar. Tire dúvidas por outro canal.'
        },
        {
          pergunta: 'Uma mensagem diz que sua conta será bloqueada em cinco minutos se você não clicar. O que esse tom urgente pode indicar?',
          opcoes: ['Que a mensagem é oficial com certeza.', 'Uma tentativa de pressionar você a cair em um golpe.', 'Que você deve compartilhar a mensagem.'],
          indiceCorreto: 1,
          explicacao: 'Golpistas criam urgência para impedir que você pense e verifique a informação.'
        },
        {
          pergunta: 'Um site mostra um cadeado e começa com HTTPS. Isso garante que a loja é verdadeira?',
          opcoes: ['Sim, o cadeado garante que o site é confiável.', 'Não. Ainda é preciso conferir o endereço e a reputação da loja.', 'Sim, desde que tenha imagens bonitas.'],
          indiceCorreto: 1,
          explicacao: 'HTTPS protege a conexão, mas não prova que o site pertence a uma empresa legítima.'
        },
        {
          pergunta: 'Você recebe um SMS sobre uma entrega e um link para pagar uma pequena taxa. Como verificar?',
          opcoes: ['Pagar pelo link sem conferir.', 'Consultar a entrega no aplicativo ou site oficial da transportadora.', 'Enviar seus dados para quem mandou a mensagem.'],
          indiceCorreto: 1,
          explicacao: 'Golpes podem imitar transportadoras. Verifique o pedido pelos canais oficiais.'
        },
        {
          pergunta: 'Um desconhecido envia um QR Code prometendo um prêmio. O que fazer antes de pagar ou informar dados?',
          opcoes: ['Escanear e confirmar tudo rapidamente.', 'Não escanear; se necessário, verificar a promoção em um canal oficial.', 'Compartilhar o QR Code com a turma.'],
          indiceCorreto: 1,
          explicacao: 'QR Codes podem levar a páginas falsas ou pagamentos. Evite códigos enviados por desconhecidos.'
        },
        {
          pergunta: 'Você percebe que informou sua senha em uma página suspeita. Qual é o próximo passo?',
          opcoes: ['Esperar para ver se algo acontece.', 'Avisar um responsável e trocar a senha pelo aplicativo ou site oficial.', 'Usar a mesma senha em todos os serviços.'],
          indiceCorreto: 1,
          explicacao: 'Agir rapidamente ajuda a proteger a conta. Avise um adulto e use canais oficiais para trocar a senha.'
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
        },
        {
          pergunta: 'Você recebe uma mensagem ofensiva sobre um colega. O que fazer com ela?',
          opcoes: ['Repassar para a turma toda.', 'Não compartilhar, guardar evidências e contar a um adulto de confiança.', 'Editar para ficar mais engraçada.'],
          indiceCorreto: 1,
          explicacao: 'Não espalhar a ofensa evita aumentar o dano. Evidências podem ajudar um adulto a agir.'
        },
        {
          pergunta: 'Alguém está sendo atacado repetidamente em um jogo online. Qual atitude ajuda?',
          opcoes: ['Participar dos ataques.', 'Apoiar a pessoa, bloquear e denunciar o perfil e avisar um responsável.', 'Publicar os dados pessoais do agressor.'],
          indiceCorreto: 1,
          explicacao: 'Apoio, denúncia e ajuda de um adulto são mais seguros do que retaliar.'
        },
        {
          pergunta: 'Um perfil ameaça divulgar uma conversa privada se você não fizer o que ele pede. O que fazer?',
          opcoes: ['Ceder e enviar mais informações.', 'Não responder com mais dados, guardar as mensagens e pedir ajuda a um adulto.', 'Apagar tudo e ficar sozinho com o problema.'],
          indiceCorreto: 1,
          explicacao: 'Ameaças devem ser levadas a sério. Guarde provas e procure um adulto de confiança.'
        },
        {
          pergunta: 'Uma pessoa é sempre excluída de propósito de grupos e atividades online. Isso pode ser cyberbullying?',
          opcoes: ['Não, exclusão nunca machuca.', 'Sim, excluir e humilhar repetidamente também pode ser uma forma de agressão.', 'Só se houver uma briga presencial.'],
          indiceCorreto: 1,
          explicacao: 'Cyberbullying pode incluir exclusão intencional e repetida, além de mensagens ofensivas.'
        },
        {
          pergunta: 'Você presencia uma discussão ofensiva em um grupo. O que é melhor evitar?',
          opcoes: ['Acolher a pessoa atacada em particular.', 'Dar curtidas e encaminhar as ofensas para outros grupos.', 'Avisar um adulto responsável.'],
          indiceCorreto: 1,
          explicacao: 'Curtidas e compartilhamentos aumentam o alcance da agressão. Não amplifique o conteúdo.'
        },
        {
          pergunta: 'Um perfil anônimo manda insultos e diz que ninguém vai descobrir quem é. O que fazer?',
          opcoes: ['Tentar descobrir e divulgar o endereço da pessoa.', 'Guardar evidências, bloquear, denunciar e contar a um adulto.', 'Responder com ameaças.'],
          indiceCorreto: 1,
          explicacao: 'Não exponha nem ameace ninguém. Use as ferramentas de denúncia e procure apoio seguro.'
        },
        {
          pergunta: 'Seu amigo conta que está sofrendo cyberbullying e pede segredo. Como você pode ajudar?',
          opcoes: ['Prometer nunca contar a nenhum adulto.', 'Ouvir com respeito e ajudá-lo a procurar um adulto de confiança.', 'Dizer que ele precisa resolver sozinho.'],
          indiceCorreto: 1,
          explicacao: 'Acolha seu amigo e explique que pedir ajuda a um adulto confiável é importante para protegê-lo.'
        },
        {
          pergunta: 'Qual é a melhor resposta para alguém que está provocando você online?',
          opcoes: ['Ameaçar a pessoa de volta.', 'Evitar a troca de ofensas, bloquear e denunciar, buscando apoio se continuar.', 'Publicar uma montagem para se vingar.'],
          indiceCorreto: 1,
          explicacao: 'Retaliar pode piorar a situação. Bloqueio, denúncia e apoio são alternativas mais seguras.'
        },
        {
          pergunta: 'Depois de receber mensagens que machucaram você, como pode cuidar de si?',
          opcoes: ['Acreditar que precisa lidar com isso sem ajuda.', 'Conversar com alguém de confiança e se afastar da conversa se precisar.', 'Apagar as provas e continuar respondendo.'],
          indiceCorreto: 1,
          explicacao: 'Você não precisa passar por isso sozinho. Conversar com alguém de confiança pode ajudar.'
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
        },
        {
          pergunta: 'Seu perfil está privado. Quem você deve aceitar como seguidor?',
          opcoes: ['Qualquer pessoa que tenha uma foto bonita.', 'Pessoas que você conhece e com quem se sente seguro em compartilhar conteúdo.', 'Todos os perfis que pedirem.'],
          indiceCorreto: 1,
          explicacao: 'Um perfil privado ajuda, mas você ainda deve avaliar cada pedido de amizade.'
        },
        {
          pergunta: 'Uma foto mostra o uniforme da escola e uma placa com o nome da rua. O que é mais seguro?',
          opcoes: ['Publicar com a localização ativada.', 'Não publicar ou remover detalhes que revelem sua escola e localização.', 'Marcar a escola e a rua.'],
          indiceCorreto: 1,
          explicacao: 'Uniformes e placas podem revelar lugares que você frequenta. Evite divulgar esses detalhes.'
        },
        {
          pergunta: 'Você vai postar uma foto em tempo real durante uma viagem. Que cuidado é importante?',
          opcoes: ['Ativar a localização exata para todos.', 'Evitar divulgar sua localização e rotina enquanto estiver fora.', 'Escrever o endereço do local na legenda.'],
          indiceCorreto: 1,
          explicacao: 'Compartilhar localização em tempo real pode revelar onde você está e que sua casa está vazia.'
        },
        {
          pergunta: 'Um perfil desconhecido diz que estuda na sua escola e pede para ser seu amigo. Como agir?',
          opcoes: ['Aceitar porque a pessoa conhece o nome da escola.', 'Não aceitar sem confirmar com segurança quem é e conversar com um responsável.', 'Enviar seu telefone para confirmar.'],
          indiceCorreto: 1,
          explicacao: 'Informações públicas podem ser usadas para parecer conhecido. Não compartilhe dados pessoais com desconhecidos.'
        },
        {
          pergunta: 'Quais dados você deve evitar deixar visíveis para qualquer pessoa?',
          opcoes: ['Seu desenho favorito.', 'Telefone, endereço, data de nascimento completa e rotina.', 'Uma recomendação de livro.'],
          indiceCorreto: 1,
          explicacao: 'Dados pessoais podem ser usados para localizar ou enganar você. Compartilhe o mínimo necessário.'
        },
        {
          pergunta: 'Um amigo quer publicar uma foto sua que você não gosta. O que você pode fazer?',
          opcoes: ['Aceitar porque a foto já foi tirada.', 'Pedir que não publique ou que remova a foto; imagens devem ser compartilhadas com consentimento.', 'Publicar uma foto dele em troca.'],
          indiceCorreto: 1,
          explicacao: 'Você pode pedir respeito à sua privacidade. Peça autorização antes de publicar fotos de outras pessoas.'
        },
        {
          pergunta: 'Você suspeita que alguém entrou na sua conta de rede social. O que fazer?',
          opcoes: ['Ignorar e continuar usando normalmente.', 'Avisar um responsável e proteger a conta pelos canais oficiais, trocando a senha.', 'Enviar a senha para o suporte por mensagem privada.'],
          indiceCorreto: 1,
          explicacao: 'Use os recursos oficiais de segurança e não envie sua senha a ninguém.'
        },
        {
          pergunta: 'Qual prática ajuda a proteger suas contas nas redes sociais?',
          opcoes: ['Usar a mesma senha em todos os aplicativos.', 'Usar uma senha forte e diferente e ativar a verificação em duas etapas quando possível.', 'Compartilhar a senha com os seguidores.'],
          indiceCorreto: 1,
          explicacao: 'Senhas diferentes reduzem o risco de outras contas serem acessadas se uma delas for descoberta.'
        },
        {
          pergunta: 'Com que frequência é bom revisar quem pode ver suas publicações?',
          opcoes: ['Nunca; as configurações não mudam.', 'De tempos em tempos, conferindo as opções de privacidade e os seguidores.', 'Só depois de compartilhar o endereço.'],
          indiceCorreto: 1,
          explicacao: 'Revisar as configurações ajuda a manter o público das postagens sob controle.'
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
        },
        {
          pergunta: 'Um e-mail inesperado traz um anexo e pede que você o abra para ver uma encomenda. O que fazer?',
          opcoes: ['Abrir o arquivo para descobrir o que é.', 'Não abrir e confirmar a mensagem com um adulto ou pelo canal oficial da empresa.', 'Encaminhar o anexo para colegas testarem.'],
          indiceCorreto: 1,
          explicacao: 'Anexos inesperados podem instalar programas maliciosos. Confirme a origem antes de abrir qualquer arquivo.'
        },
        {
          pergunta: 'Um site mostra um aviso dizendo que seu celular está infectado e oferece um botão para instalar um antivírus. Como agir?',
          opcoes: ['Tocar no botão imediatamente.', 'Fechar a página sem baixar nada e pedir ajuda a um responsável.', 'Ligar para o número que aparece no aviso.'],
          indiceCorreto: 1,
          explicacao: 'Avisos alarmantes em páginas podem ser golpes. Não instale o que um pop-up desconhecido sugere.'
        },
        {
          pergunta: 'Por que é importante instalar atualizações do sistema e dos aplicativos?',
          opcoes: ['Elas nunca mudam a segurança.', 'Elas podem corrigir falhas que programas maliciosos tentam explorar.', 'Elas servem apenas para trocar a cor da tela.'],
          indiceCorreto: 1,
          explicacao: 'Atualizações frequentemente corrigem vulnerabilidades. Instale-as pelas configurações e lojas oficiais.'
        },
        {
          pergunta: 'Ao escolher um aplicativo em uma loja oficial, o que mais vale conferir?',
          opcoes: ['Somente o número de imagens da página.', 'O desenvolvedor, as avaliações, as permissões e se o app é realmente necessário.', 'Se alguém prometeu moedas grátis por ele.'],
          indiceCorreto: 1,
          explicacao: 'Lojas oficiais reduzem riscos, mas ainda é importante conferir quem desenvolveu o app e o que ele solicita.'
        },
        {
          pergunta: 'Um aplicativo simples pede acesso aos contatos, microfone e localização sem explicar o motivo. O que fazer?',
          opcoes: ['Permitir tudo para continuar.', 'Negar permissões desnecessárias e conversar com um responsável.', 'Compartilhar as permissões com outros apps.'],
          indiceCorreto: 1,
          explicacao: 'Permita apenas o que for necessário para a função do aplicativo e revise as permissões nas configurações.'
        },
        {
          pergunta: 'Você encontra um pendrive no pátio. Qual é a atitude segura?',
          opcoes: ['Conectar no computador para descobrir de quem é.', 'Não conectar; entregar a um adulto ou responsável pela escola.', 'Usar em todos os computadores da sala.'],
          indiceCorreto: 1,
          explicacao: 'Um pendrive desconhecido pode conter arquivos maliciosos. Peça a um responsável para lidar com ele.'
        },
        {
          pergunta: 'Uma tela informa que seus arquivos foram bloqueados e exige pagamento. O que fazer?',
          opcoes: ['Pagar usando qualquer link exibido.', 'Não pagar nem clicar; pedir ajuda a um responsável ou ao suporte técnico.', 'Enviar sua senha para o contato indicado.'],
          indiceCorreto: 1,
          explicacao: 'Pode ser ransomware. Não negocie sozinho; peça ajuda a um adulto ou profissional de suporte.'
        },
        {
          pergunta: 'Uma janela afirma que você ganhou um prêmio e precisa instalar um programa para recebê-lo. O que fazer?',
          opcoes: ['Instalar o programa porque o prêmio parece bom.', 'Fechar a janela e não instalar arquivos oferecidos por anúncios desconhecidos.', 'Desativar as proteções do aparelho.'],
          indiceCorreto: 1,
          explicacao: 'Promessas de prêmio podem atrair você para baixar malware. Não instale programas de fontes desconhecidas.'
        },
        {
          pergunta: 'Onde é mais seguro atualizar um aplicativo de segurança?',
          opcoes: ['Em um link enviado por um estranho.', 'Nas configurações do dispositivo ou na loja oficial.', 'Em qualquer anúncio que apareça na tela.'],
          indiceCorreto: 1,
          explicacao: 'Atualize ferramentas de segurança usando apenas as configurações, o aplicativo ou a loja oficial.'
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
        },
        {
          pergunta: 'Uma ferramenta de IA dá uma resposta cheia de detalhes, mas sem fontes. O que fazer?',
          opcoes: ['Acreditar porque a resposta parece confiante.', 'Conferir as informações em fontes confiáveis antes de compartilhar ou usar.', 'Inventar uma fonte para completar o texto.'],
          indiceCorreto: 1,
          explicacao: 'A IA pode apresentar informações incorretas com segurança. Verifique os fatos em fontes confiáveis.'
        },
        {
          pergunta: 'Você quer usar a foto de um colega para criar uma imagem engraçada com IA. Qual é a atitude ética?',
          opcoes: ['Usar sem contar, porque é só uma brincadeira.', 'Não usar a imagem sem consentimento e não criar conteúdo que possa humilhar a pessoa.', 'Publicar primeiro e pedir autorização depois.'],
          indiceCorreto: 1,
          explicacao: 'A imagem de alguém deve ser respeitada. Nunca use IA para constranger ou prejudicar outra pessoa.'
        },
        {
          pergunta: 'Copiar uma redação inteira feita por IA e entregar como se fosse sua é uma boa forma de estudar?',
          opcoes: ['Sim, porque a IA escreveu rápido.', 'Não. Use a ferramenta para aprender e produza seu próprio trabalho, seguindo as orientações do professor.', 'Sim, desde que troque o título.'],
          indiceCorreto: 1,
          explicacao: 'Entregar um texto copiado impede o aprendizado e pode violar as regras da atividade.'
        },
        {
          pergunta: 'Que tipo de informação você não deve enviar a um chatbot público?',
          opcoes: ['Uma pergunta geral sobre ciências.', 'Senhas, endereço, documentos ou dados pessoais seus e de outras pessoas.', 'Um pedido para explicar uma palavra.'],
          indiceCorreto: 1,
          explicacao: 'Proteja sua privacidade e a de outras pessoas. Não coloque dados sensíveis em ferramentas públicas.'
        },
        {
          pergunta: 'Uma pessoa pede para você criar com IA uma montagem humilhante de um colega. O que fazer?',
          opcoes: ['Criar e publicar sem pensar.', 'Recusar e explicar que isso pode machucar a pessoa; avisar um adulto se houver pressão.', 'Fazer a montagem e enviar apenas para desconhecidos.'],
          indiceCorreto: 1,
          explicacao: 'Não use IA para humilhar ou perseguir alguém. Procure ajuda se a situação continuar.'
        },
        {
          pergunta: 'Uma IA descreve um grupo de pessoas de forma injusta e estereotipada. Como avaliar a resposta?',
          opcoes: ['Aceitar como verdade para todos.', 'Questionar possíveis vieses e buscar informações de fontes diversas e confiáveis.', 'Repetir a afirmação sem conferir.'],
          indiceCorreto: 1,
          explicacao: 'Sistemas de IA podem reproduzir vieses. Analise criticamente e compare com fontes responsáveis.'
        },
        {
          pergunta: 'A IA lista livros e artigos que você não consegue encontrar. O que fazer?',
          opcoes: ['Citar todos sem verificar.', 'Confirmar se as referências existem e consultar as fontes originais.', 'Inventar links para elas.'],
          indiceCorreto: 1,
          explicacao: 'Ferramentas de IA podem inventar referências. Verifique título, autoria e publicação antes de citar.'
        },
        {
          pergunta: 'Você recebe um áudio urgente com a voz de um familiar pedindo dinheiro. Qual é a forma segura de confirmar?',
          opcoes: ['Enviar o dinheiro imediatamente.', 'Ligar para a pessoa por um número conhecido ou confirmar pessoalmente com um adulto.', 'Publicar o áudio para todos ouvirem.'],
          indiceCorreto: 1,
          explicacao: 'Vozes podem ser imitadas por IA. Confirme o pedido por outro canal antes de qualquer transferência.'
        },
        {
          pergunta: 'Se você não sabe se uma imagem foi alterada por IA, como deve compartilhá-la?',
          opcoes: ['Compartilhar como fato sem verificar.', 'Evitar afirmar que é verdadeira e buscar confirmação em fontes confiáveis.', 'Adicionar uma legenda inventada.'],
          indiceCorreto: 1,
          explicacao: 'Quando a origem é incerta, não apresente o conteúdo como verdadeiro nem ajude a espalhar desinformação.'
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
        },
        {
          pergunta: 'Você está aprendendo uma conta de matemática. Como a IA pode ajudar sem fazer tudo por você?',
          opcoes: ['Pedir somente o resultado para copiar.', 'Pedir uma explicação passo a passo e tentar resolver outro exemplo sozinho.', 'Pedir para esconder a resposta do professor.'],
          indiceCorreto: 1,
          explicacao: 'Entender as etapas e depois praticar por conta própria ajuda a desenvolver o raciocínio.'
        },
        {
          pergunta: 'Qual pedido ajuda a treinar para uma prova?',
          opcoes: ['"Responda a prova por mim".', '"Crie perguntas sobre o tema, espere minhas respostas e depois explique meus erros".', '"Diga que eu já sei tudo".'],
          indiceCorreto: 1,
          explicacao: 'Um quiz interativo permite praticar a recuperação das informações e aprender com os erros.'
        },
        {
          pergunta: 'Você não entendeu uma explicação. O que pode pedir à IA?',
          opcoes: ['Que repita exatamente o mesmo texto.', 'Que explique com palavras mais simples e use um exemplo do cotidiano.', 'Que invente uma resposta sem relação com o tema.'],
          indiceCorreto: 1,
          explicacao: 'Pedir outra explicação ou uma analogia pode tornar um conceito difícil mais compreensível.'
        },
        {
          pergunta: 'A IA e o livro didático apresentam resultados diferentes. O que fazer?',
          opcoes: ['Escolher a resposta da IA sem verificar.', 'Conferir o conteúdo no livro e conversar com o professor.', 'Apagar o livro.'],
          indiceCorreto: 1,
          explicacao: 'Compare as fontes e peça orientação ao professor para entender a diferença.'
        },
        {
          pergunta: 'Você pediu sugestões para melhorar um texto. Como usar o retorno da IA?',
          opcoes: ['Aceitar todas as mudanças sem ler.', 'Avaliar cada sugestão, manter sua autoria e revisar o texto final.', 'Entregar o texto sem conferir.'],
          indiceCorreto: 1,
          explicacao: 'A IA pode sugerir melhorias, mas você deve decidir o que faz sentido e revisar o resultado.'
        },
        {
          pergunta: 'Ao pedir ajuda para uma tarefa, que informação é melhor não incluir no prompt?',
          opcoes: ['A matéria estudada.', 'Seu nome completo, endereço, senha ou dados pessoais.', 'O nível de explicação que você prefere.'],
          indiceCorreto: 1,
          explicacao: 'Dê contexto escolar sem compartilhar dados pessoais ou informações confidenciais.'
        },
        {
          pergunta: 'A IA e uma fonte confiável discordam sobre um fato. Qual é um bom próximo passo?',
          opcoes: ['Ignorar todas as fontes.', 'Comparar fontes confiáveis e pedir ajuda ao professor para entender a divergência.', 'Escolher a resposta mais divertida.'],
          indiceCorreto: 1,
          explicacao: 'Comparar evidências e consultar o professor ajuda a identificar erros e entender melhor o assunto.'
        },
        {
          pergunta: 'Depois de estudar um exemplo resolvido pela IA, o que ajuda a verificar se você aprendeu?',
          opcoes: ['Ler o exemplo outra vez sem tentar.', 'Resolver um problema parecido sem olhar a resposta e conferir depois.', 'Decorar apenas a última linha.'],
          indiceCorreto: 1,
          explicacao: 'Resolver um novo exercício por conta própria mostra se você compreendeu o método.'
        },
        {
          pergunta: 'Como a IA pode ajudar a organizar uma rotina de estudos?',
          opcoes: ['Mandar você estudar sem pausas o dia inteiro.', 'Ajudar a montar um plano com matérias, horários realistas e intervalos, que você pode ajustar.', 'Substituir todas as aulas.'],
          indiceCorreto: 1,
          explicacao: 'Um plano equilibrado pode ajudar na organização, mas deve ser adaptado à sua rotina e às orientações da escola.'
        }
      ]
    }
  ];

  listarTodos(): Observable<Topico[]> {
    return of(this.topicos);
  }

  buscarPorSlug(slug: string): Observable<Topico | undefined> {
    return of(this.topicos.find(topico => topico.slug === slug));
  }
}

