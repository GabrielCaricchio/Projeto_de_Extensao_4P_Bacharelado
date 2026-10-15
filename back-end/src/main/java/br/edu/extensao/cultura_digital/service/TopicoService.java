package br.edu.extensao.cultura_digital.service;

import br.edu.extensao.cultura_digital.model.DicaSeguranca;
import br.edu.extensao.cultura_digital.model.QuizPergunta;
import br.edu.extensao.cultura_digital.model.Topico;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Serviço responsável por disponibilizar os tópicos educativos em memória.
 * Não utiliza banco de dados para manter a aplicação leve, rápida e simples.
 */
@Service
public class TopicoService {

    private final List<Topico> topicos;

    public TopicoService() {
        this.topicos = List.of(
                new Topico(
                        "1",
                        "golpes-digitais",
                        "Golpes Digitais",
                        "Aprenda a identificar armadilhas, links falsos e promessas milagrosas na internet.",
                        "shield-alert",
                        "#EF4444",
                        "Phishing, clonagem de WhatsApp e ofertas 'boas demais para ser verdade'. Descubra como não cair nelas!",
                        "Os golpes digitais acontecem quando criminosos usam mensagens falsas, prêmios inexistentes ou clonagem de contas para enganar as pessoas. Saber desconfiar é o seu maior superpoder!",
                        List.of(
                                "Desconfie de mensagens urgentes pedindo dinheiro, senhas ou códigos recebidos por SMS.",
                                "Nunca clique em links enviados por desconhecidos que prometem diamantes em jogos, PIX de presente ou celulares grátis.",
                                "Se um amigo mandar mensagem pedindo dinheiro com urgência pelo WhatsApp, ligue para ele antes de qualquer atitude."
                        ),
                        List.of(
                                new DicaSeguranca("Regra de Ouro", "Se parece bom demais para ser verdade, quase com certeza é golpe!", "alert-triangle"),
                                new DicaSeguranca("Códigos Secretos", "Nunca compartilhe o código de 6 dígitos que chega no seu SMS com ninguém.", "key"),
                                new DicaSeguranca("Converse com Responsáveis", "Sempre mostre para seus pais ou responsáveis qualquer mensagem suspeita.", "users")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Você recebeu uma mensagem no WhatsApp dizendo que ganhou um videogame de graça, mas precisa clicar no link agora. O que você faz?",
                                        List.of("Clico rápido para não perder o prêmio!", "Desconfio, não clico e mostro para um adulto responsável.", "Encaminho o link para todos os meus amigos."),
                                        1,
                                        "Correto! Ninguém distribui presentes caros de graça por mensagens sem motivo. É quase sempre golpe de phishing."
                                ),
                                new QuizPergunta(
                                        "Alguém na internet pede o código de confirmação que acabou de chegar no seu celular por SMS. Você deve:",
                                        List.of("Passar o código se a pessoa parecer simpática.", "Nunca passar o código para ninguém, pois ele protege sua conta.", "Postar o código nos stories."),
                                        1,
                                        "Excelente! Esse código é a chave da sua conta (como o WhatsApp). Quem o tiver pode roubar seu acesso."
                                )
                        )
                ),
                new Topico(
                        "2",
                        "cyberbullying",
                        "Cyberbullying",
                        "Respeito e empatia também se praticam na tela do computador e do celular.",
                        "heart-handshake",
                        "#F59E0B",
                        "Entenda o que é o assédio virtual, como agir ao presenciá-lo e os canais seguros para buscar ajuda.",
                        "Cyberbullying é quando alguém usa a internet, redes sociais ou jogos online para ofender, espalhar boatos, excluir ou ridicularizar outra pessoa repetidamente. A internet não é terra sem lei!",
                        List.of(
                                "Palavras digitadas na tela machucam tanto quanto palavras ditas pessoalmente.",
                                "Não repasse mensagens, figurinhas ofensivas ou fotos de colegas sem a permissão deles.",
                                "Se você ou alguém que você conhece está sofrendo cyberbullying, não guarde para si: conte a um adulto e registre provas com prints."
                        ),
                        List.of(
                                new DicaSeguranca("Guarde as Provas", "Tire prints das ofensas com data e horário para poder denunciar.", "camera"),
                                new DicaSeguranca("Bloqueie e Denuncie", "Use as ferramentas da própria rede social ou jogo para bloquear o agressor.", "ban"),
                                new DicaSeguranca("Disque 100", "Em casos graves, o Disque 100 recebe denúncias gratuitas e anônimas de violação de direitos.", "phone-call")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Se você vir colegas rindo e criando figurinhas ofensivas de um colega no grupo de WhatsApp, o que é melhor fazer?",
                                        List.of("Continuar rindo e repassar para outros grupos.", "Não repassar, apoiar o colega e avisar a coordenação ou responsáveis.", "Ficar quieto e mandar mais uma foto zoando."),
                                        1,
                                        "Perfeito! Não ser cúmplice e acolher quem foi ofendido é a atitude correta para combater o cyberbullying."
                                )
                        )
                ),
                new Topico(
                        "3",
                        "redes-sociais",
                        "Uso Seguro de Redes Sociais",
                        "Como navegar no TikTok, Instagram e YouTube sem expor a sua vida particular e sua segurança.",
                        "users-check",
                        "#06B6D4",
                        "Ajuste sua privacidade, proteja fotos pessoais e saiba quem realmente pode ver suas publicações.",
                        "As redes sociais são ótimas para interagir e aprender, mas tudo o que é postado pode ficar registrado para sempre. Cuidar das suas informações pessoais é proteger o seu presente e futuro.",
                        List.of(
                                "Mantenha o seu perfil privado para que apenas pessoas conhecidas e aprovadas possam ver seu conteúdo.",
                                "Evite postar fotos com o uniforme da sua escola, a fachada da sua casa ou placas de rua que revelem sua localização.",
                                "Nem todo perfil na internet é quem diz ser: pessoas desconhecidas não devem ser adicionadas como amigos íntimos."
                        ),
                        List.of(
                                new DicaSeguranca("Localização Desligada", "Desative a localização em tempo real nas fotos que postar.", "map-pin"),
                                new DicaSeguranca("Filtro de Amizades", "Só aceite pedidos de pessoas que você realmente conhece no mundo real.", "user-check"),
                                new DicaSeguranca("Pegada Digital", "Lembre-se: depois que você posta uma foto ou vídeo, você perde o controle de onde ele vai parar.", "footprints")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Qual das seguintes informações é PERIGOSA de postar publicamente no seu perfil?",
                                        List.of("Um desenho que você fez de um robô.", "O endereço da sua casa ou o nome da sua escola com horários de saída.", "Sua música favorita."),
                                        1,
                                        "Isso mesmo! Endereço, rotina e escola são informações que colocam sua integridade física em risco."
                                )
                        )
                ),
                new Topico(
                        "4",
                        "malwares",
                        "Malwares e Vírus",
                        "Proteja seu celular e computador contra programas maliciosos que roubam dados ou travam o sistema.",
                        "bug",
                        "#8B5CF6",
                        "O que são cavalos de troia, spywares e ransomwares, e os cuidados essenciais ao baixar jogos e apps.",
                        "Malware é a abreviação de 'software malicioso'. São programas criados para danificar dispositivos, espionar o que você digita ou roubar fotos e senhas. Eles costumam se fantasiar de jogos e programas famosos.",
                        List.of(
                                "Baixe aplicativos e jogos somente de lojas oficiais (Google Play Store, Apple App Store ou Steam).",
                                "Mods, hacks e 'cheats' de jogos prometendo moedas infinitas são o meio mais comum de infectar seu aparelho com vírus.",
                                "Mantenha o sistema operacional e o antivírus sempre atualizados para corrigir falhas de segurança."
                        ),
                        List.of(
                                new DicaSeguranca("Lojas Oficiais", "Evite baixar arquivos APK ou executáveis (.exe) de sites aleatórios.", "download"),
                                new DicaSeguranca("Permissões Estranhas", "Um aplicativo de calculadora não precisa de permissão para ler seus contatos e câmera!", "eye"),
                                new DicaSeguranca("Sintomas de Vírus", "Celular esquentando muito rápido, propagandas pulando do nada e bateria sumindo são sinais de alerta.", "battery-warning")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Você quer muito um jogo pago e encontra um site desconhecido oferecendo ele de graça em um arquivo 'jogo_gratis.apk'. O que você faz?",
                                        List.of("Baixo e desativo o antivírus para instalar mais rápido.", "Não baixo, pois tem grande chance de ser um cavalo de troia (malware).", "Baixo no computador da escola."),
                                        1,
                                        "Muito bem! Jogos piratas e APKs de fontes não confiáveis frequentemente vêm com programas espiões embutidos."
                                )
                        )
                ),
                new Topico(
                        "5",
                        "uso-inadequado-ia",
                        "Uso Inadequado de IA",
                        "Deepfakes, cópia de trabalhos, desinformação e os limites éticos das novas tecnologias.",
                        "cpu",
                        "#EC4899",
                        "Aprenda a reconhecer imagens e vozes geradas por IA, evitar plágio e proteger sua própria imagem.",
                        "A inteligência artificial evoluiu rápido e agora consegue recriar vozes, rostos e textos inteiros. Porém, criar imagens falsas de colegas (deepfakes) ou copiar redações sem aprender nada são usos prejudiciais e antiéticos.",
                        List.of(
                                "Criar ou espalhar fotos manipuladas por IA sem autorização pode ser considerado crime e causar grande sofrimento.",
                                "IAs geradoras de texto podem 'alucinar' (inventar fatos errados com muita certeza). Sempre cheque as fontes!",
                                "Pedir para a IA fazer 100% da sua tarefa de casa sem você ler ou pensar impede o desenvolvimento do seu cérebro."
                        ),
                        List.of(
                                new DicaSeguranca("Atenção aos Detalhes", "Em fotos geradas por IA, repare nas mãos, dentes, reflexos nos olhos e textos ao fundo.", "sparkles"),
                                new DicaSeguranca("Ética e Consentimento", "Nunca use fotos de outras pessoas para alimentar aplicativos de troca de rosto.", "shield-check"),
                                new DicaSeguranca("Pense por Si Mesmo", "Use a IA como uma enciclopédia interativa, nunca como um substituto do seu raciocínio.", "brain")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Se você vir um vídeo no TikTok de uma pessoa famosa ou colega falando algo absurdo, o que é prudente pensar?",
                                        List.of("Acredito na hora porque tem vídeo, e vídeo nunca mente.", "Desconfio que pode ser uma deepfake criada por IA e verifico em fontes confiáveis.", "Mando para todos os meus contatos."),
                                        1,
                                        "Corretíssimo! Hoje em dia vídeos e áudios podem ser forjados com inteligência artificial com alto realismo."
                                )
                        )
                ),
                new Topico(
                        "6",
                        "ia-estudos",
                        "IA para Auxiliar Estudos e Aprendizados",
                        "Transforme a Inteligência Artificial em sua parceira de estudos, pesquisas e criatividade.",
                        "graduation-cap",
                        "#10B981",
                        "Como fazer boas perguntas (prompts), criar resumos, simulados e tirar dúvidas de matérias escolares.",
                        "Quando usada com responsabilidade, a inteligência artificial pode ser um professor particular paciente: ela explica matemática com analogias, cria desafios de história e ajuda você a revisar para provas!",
                        List.of(
                                "Faça perguntas contextualizadas: diga a sua idade, a matéria e o nível de explicação que deseja.",
                                "Peça para a IA fazer perguntas para você responder, treinando sua memória para a prova em vez de apenas ler respostas prontas.",
                                "Revise sempre com livros didáticos e pergunte aos seus professores para validar o conteúdo estudado."
                        ),
                        List.of(
                                new DicaSeguranca("Bons Prompts", "Em vez de 'me dê a resposta', peça: 'me explique o passo a passo de como resolver este cálculo'.", "message-square"),
                                new DicaSeguranca("Simulados Personalizados", "Peça: 'crie 3 perguntas fáceis e 2 médias sobre a Revolução Francesa para eu treinar'.", "check-circle"),
                                new DicaSeguranca("Professor em Primeiro Lugar", "Se houver conflito entre a IA e seu professor, a palavra do professor e dos livros é a correta.", "award")
                        ),
                        List.of(
                                new QuizPergunta(
                                        "Qual é a melhor maneira de usar a IA para aprender um assunto difícil de ciências?",
                                        List.of("Pedir para ela escrever um resumo e copiar sem ler.", "Pedir: 'explique como funciona a fotossíntese como se eu tivesse 10 anos, usando exemplos do dia a dia'.", "Pedir para ela inventar uma história falsa."),
                                        1,
                                        "Exatamente! Pedir explicações didáticas e analogias ajuda você a compreender de verdade o assunto."
                                )
                        )
                )
        );
    }

    public List<Topico> listarTodos() {
        return topicos;
    }

    public Optional<Topico> buscarPorSlug(String slug) {
        if (slug == null) return Optional.empty();
        return topicos.stream()
                .filter(t -> t.slug().equalsIgnoreCase(slug.trim()))
                .findFirst();
    }
}

