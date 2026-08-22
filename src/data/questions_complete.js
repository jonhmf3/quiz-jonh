const data = [
  {
    category: "Futebol",
    questions: [
     {
    question: "Qual país é o maior vencedor da história das Copas do Mundo de futebol masculino, com 5 títulos?",
    options: ["Alemanha", "Itália", "Brasil", "Argentina"],
    answer: "Brasil",
    tip: "É a única seleção que participou de todas as edições do torneio mundial.",
    difficulty: "Fácil"
  },
  {
    question: "Quem é amplamente conhecido em todo o mundo como o 'Rei do Futebol'?",
    options: ["Diego Maradona", "Pelé", "Lionel Messi", "Cristiano Ronaldo"],
    answer: "Pelé",
    tip: "Ele conquistou três Copas do Mundo vestindo a camisa 10 da Seleção Brasileira.",
    difficulty: "Fácil"
  },
  {
    question: "Qual jogador detém o recorde de maior número de prêmios Bola de Ouro (Ballon d'Or) da história?",
    options: ["Cristiano Ronaldo", "Zinedine Zidane", "Lionel Messi", "Ronaldo Fenômeno"],
    answer: "Lionel Messi",
    tip: "O craque argentino construiu a maior parte da sua carreira vitoriosa no Barcelona.",
    difficulty: "Fácil"
  },
  {
    question: "Qual clube europeu possui o maior número de títulos da UEFA Champions League?",
    options: ["Milan", "Real Madrid", "Bayern de Munique", "Liverpool"],
    answer: "Real Madrid",
    tip: "Este clube espanhol é famoso por sua era de 'Galácticos' e camisas brancas tradicionais.",
    difficulty: "Fácil"
  },
  {
    question: "Em qual Copa do Mundo a Seleção Brasileira sofreu a histórica derrota por 7 a 1 contra a Alemanha?",
    options: ["Copa do Mundo de 2010", "Copa do Mundo de 2014", "Copa do Mundo de 2006", "Copa do Mundo de 2018"],
    answer: "Copa do Mundo de 2014",
    tip: "O torneio foi sediado no próprio Brasil e a partida aconteceu no estádio do Mineirão.",
    difficulty: "Fácil"
  },
  {
    question: "Quem é o maior artilheiro da história das Copas do Mundo masculinas, com 16 gols marcados?",
    options: ["Miroslav Klose", "Ronaldo Fenômeno", "Gerd Müller", "Just Fontaine"],
    answer: "Miroslav Klose",
    tip: "O atacante alemão ultrapassou o recorde do brasileiro Ronaldo justamente na Copa de 2014.",
    difficulty: "Média"
  },
  {
    question: "Qual é o jogador com mais gols oficiais marcados na história do futebol mundial?",
    options: ["Pelé", "Lionel Messi", "Cristiano Ronaldo", "Romário"],
    answer: "Cristiano Ronaldo",
    tip: "O atacante português é conhecido pela sua obsessão por recordes e pela icônica comemoração 'Siu!'.",
    difficulty: "Fácil"
  },
  {
    question: "Qual clube brasileiro é conhecido popularmente pelo apelido de 'Imortal Tricolor'?",
    options: ["São Paulo", "Fluminense", "Grêmio", "Bahia"],
    answer: "Grêmio",
    tip: "Este clube tradicional do Rio Grande do Sul manda seus jogos em Porto Alegre.",
    difficulty: "Média"
  },
  {
    question: "Qual jogador argentino ficou famoso pelo gol histórico conhecido como 'A Mão de Deus' (La Mano de Dios)?",
    options: ["Diego Maradona", "Lionel Messi", "Gabriel Batistuta", "Mario Kempes"],
    answer: "Diego Maradona",
    tip: "O lance aconteceu nas quartas de final da Copa do Mundo de 1986 contra a Inglaterra.",
    difficulty: "Fácil"
  },
  {
    question: "Qual equipe conquistou a primeira edição da Copa Libertadores da América, em 1960?",
    options: ["Santos", "Peñarol", "Olimpia", "Boca Juniors"],
    answer: "Peñarol",
    tip: "É um dos clubes mais tradicionais do Uruguai e superou o Olimpia na grande final.",
    difficulty: "Difícil"
  },
  {
    question: "Qual estádio brasileiro é historicamente conhecido como o 'Templo do Futebol'?",
    options: ["Morumbi", "Maracanã", "Mineirão", "Beira-Rio"],
    answer: "Maracanã",
    tip: "Localizado no Rio de Janeiro, foi o palco das finais das Copas do Mundo de 1950 e 2014.",
    difficulty: "Fácil"
  },
  {
    question: "Quem é a maior artilheira da história das Copas do Mundo de futebol feminino?",
    options: ["Marta", "Abby Wambach", "Megan Rapinoe", "Birgit Prinz"],
    answer: "Marta",
    tip: "A Rainha do futebol brasileiro superou recordes tanto do feminino quanto do masculino no torneio.",
    difficulty: "Média"
  },
  {
    question: "Qual treinador é amplamente considerado um dos maiores da história após comandar o Manchester United por 26 anos?",
    options: ["Pep Guardiola", "Alex Ferguson", "José Mourinho", "Arsène Wenger"],
    answer: "Alex Ferguson",
    tip: "O lendário técnico escocês foi condecorado como 'Sir' pela rainha da Inglaterra.",
    difficulty: "Média"
  },
  {
    question: "Qual país africano fez história ao se tornar o primeiro do continentee a chegar a uma semifinal de Copa do Mundo?",
    options: ["Camarões", "Senegal", "Gana", "Marrocos"],
    answer: "Marrocos",
    tip: "O feito inédito e emocionante aconteceu na Copa do Mundo realizada no Catar em 2022.",
    difficulty: "Média"
  },
  {
    question: "Qual time inglês conseguiu a façanha de vencer a Premier League de forma invicta na temporada 2003/2004?",
    options: ["Manchester City", "Chelsea", "Arsenal", "Liverpool"],
    answer: "Arsenal",
    tip: "O elenco comandado por Arsène Wenger ficou conhecido pelo apelido de 'Os Invencíveis'.",
    difficulty: "Média"
  },
  {
    question: "Quem era o capitão da Seleção Brasileira que ergueu a taça do pentacampeonato mundial em 2002?",
    options: ["Cafu", "Ronaldo", "Roberto Carlos", "Rivaldo"],
    answer: "Cafu",
    tip: "O lateral-direito jogou três finais consecutivas de Copa do Mundo (1994, 1998 e 2002).",
    difficulty: "Média"
  },
  {
    question: "Qual é o nome oficial do troféu entregue anualmente ao campeão da Copa do Mundo da FIFA?",
    options: ["Taça Jules Rimet", "Taça FIFA da Copa do Mundo", "Troféu Campeões do Mundo", "Taça Continental"],
    answer: "Taça FIFA da Copa do Mundo",
    tip: "Substituiu a antiga Jules Rimet, que ficou em posse definitiva do Brasil após o tricampeonato em 1970.",
    difficulty: "Média"
  },
  {
    question: "Qual tradicional clube italiano é conhecido mundialmente pelo apelido de 'Velha Senhora' (La Vecchia Signora)?",
    options: ["Inter de Milão", "Milan", "Juventus", "Roma"],
    answer: "Juventus",
    tip: "Sediado em Turim, o clube veste listras verticais em preto e branco.",
    difficulty: "Média"
  },
  {
    question: "Qual jogador brasileiro venceu o prêmio de Melhor do Mundo da FIFA em 2007, sendo o último antes da era Messi/Cristiano Ronaldo?",
    options: ["Ronaldinho Gaúcho", "Kaká", "Neymar", "Adriano Imperador"],
    answer: "Kaká",
    tip: "O meia teve um ano brilhante liderando o Milan na conquista da Champions League naquele período.",
    difficulty: "Média"
  },
  {
    question: "Qual país sul-americano sediou e venceu a primeiríssima edição da Copa do Mundo em 1930?",
    options: ["Argentina", "Brasil", "Uruguai", "Chile"],
    answer: "Uruguai",
    tip: "A final histórica foi disputada no Estádio Centenário, em Montevidéu.",
    difficulty: "Média"
  },
  {
    question: "Quantos jogadores de cada equipe podem ficar dentro de campo no início de uma partida oficial de futebol?",
    options: ["10", "12", "11", "9"],
    answer: "11",
    tip: "Esse número já inclui obrigatoriamente o goleiro de cada time.",
    difficulty: "Fácil"
  },
  {
    question: "Qual clube brasileiro protagonizou a famosa 'Democracia Corintiana' na década de 1980?",
    options: ["Corinthians", "Palmeiras", "Santos", "Flamengo"],
    answer: "Corinthians",
    tip: "Liderado por Sócrates e Casagrande, o movimento permitia que todos votassem nas decisões do clube.",
    difficulty: "Média"
  },
  {
    question: "Quem é o maior artilheiro da história da Seleção Brasileira Masculina em jogos oficiais da FIFA?",
    options: ["Pelé", "Neymar", "Ronaldo Fenômeno", "Romário"],
    answer: "Neymar",
    tip: "O craque revelado pelo Santos superou o recorde de gols oficiais do Rei Pelé.",
    difficulty: "Média"
  },
  {
    question: "Qual destas infrações resulta em um cartão vermelho direto para o jogador?",
    options: ["Reclamação leve com o árbitro", "Falta violenta com risco de lesão grave", "Demorar para cobrar um tiro de meta", "Dar um toque acidental de mão no meio-campo"],
    answer: "Falta violenta com risco de lesão grave",
    tip: "A regra visa proteger a integridade física dos atletas contra condutas violentas.",
    difficulty: "Fácil"
  },
  {
    question: "Qual clube alemão domina historicamente a Bundesliga e manda seus jogos na moderna Allianz Arena?",
    options: ["Borussia Dortmund", "Bayern de Munique", "Bayer Leverkusen", "Schalke 04"],
    answer: "Bayern de Munique",
    tip: "É a equipe mais rica e vitoriosa do futebol germânico.",
    difficulty: "Fácil"
  },
  {
    question: "De quantos em quantos anos é realizada a Copa do Mundo de futebol da FIFA?",
    options: ["De 2 em 2 anos", "De 3 em 3 anos", "De 4 em 4 anos", "De 5 em 5 anos"],
    answer: "De 4 em 4 anos",
    tip: "O ciclo olímpico tradicional também segue essa mesma janela de tempo.",
    difficulty: "Fácil"
  },
  {
    question: "Qual jogador francês chocou o mundo ao desferir uma cabeçada no peito de Materazzi na final da Copa de 2006?",
    options: ["Thierry Henry", "Zinedine Zidane", "Patrick Vieira", "Franck Ribéry"],
    answer: "Zinedine Zidane",
    tip: "A partida marcava a despedida oficial dos gramados daquele que foi um dos maiores camisas 10 da França.",
    difficulty: "Fácil"
  },
  {
    question: "Qual clube espanhol tem como lema a famosa frase 'Més que un club' (Mais que um clube)?",
    options: ["Real Madrid", "Atlético de Madrid", "Barcelona", "Sevilla"],
    answer: "Barcelona",
    tip: "O lema reflete a forte ligação identitária e cultural do time com a região da Catalunha.",
    difficulty: "Média"
  },
    ],
  },

  {
    category: "Novela Rebelde (RBD)",
    questions: [
      {
    question: "Qual é o nome do colégio interno de elite onde os protagonistas estudam na novela?",
    options: ["Las Encinas", "Elite Way School", "Liberty High", "Saint Mary School"],
    answer: "Elite Way School",
    tip: "A sigla do colégio (EWS) aparece estampada em vários cenários e uniformes.",
    difficulty: "Fácil"
  },
  {
    question: "Quem são os seis integrantes oficiais da banda RBD?",
    options: [
      "Mía, Miguel, Roberta, Diego, Lupita e Giovanni",
      "Mía, Miguel, Roberta, Diego, Celina e Vick",
      "Mía, Miguel, Sol, Diego, Lupita e Tomás",
      "Roberta, Diego, Lupita, Santos, Pilar e Giovanni"
    ],
    answer: "Mía, Miguel, Roberta, Diego, Lupita e Giovanni",
    tip: "Eles se reúnem no porão da escola escondidos para ensaiar no começo.",
    difficulty: "Fácil"
  },
  {
    question: "Qual era o nome do grupo secreto que perseguia os bolsistas na escola?",
    options: ["Os Escolhidos", "Irmandade Rebelde", "A Seita (La Logia)", "Clube dos Ricos"],
    answer: "A Seita (La Logia)",
    tip: "Eles usavam máscaras e faziam reuniões secretas para expulsar quem não tinha dinheiro.",
    difficulty: "Média"
  },
  {
    question: "Qual é o famoso bordão de Mía Colucci quando está frustrada ou triste?",
    options: ["Ninguém me entende!", "Como é difícil ser eu!", "Eu sou a rainha do colégio!", "Me poupe, querido!"],
    answer: "Como é difícil ser eu!",
    tip: "Frase marcante dita pela personagem de Anahí, frequentemente acompanhada de um choro dramático.",
    difficulty: "Fácil"
  },
  {
    question: "Qual era a profissão da mãe de Roberta Pardo, a extravagante Alma Rey?",
    options: ["Atriz de TV", "Modelo internacional", "Cantora", "Empresária de moda"],
    answer: "Cantora",
    tip: "Ela é uma artista famosa de música de estilo grupero e muito querida pelo público.",
    difficulty: "Fácil"
  },
  {
    question: "O que os pais de Giovanni Méndez faziam para viver, o que ele tentava esconder a todo custo?",
    options: ["Eram faxineiros", "Trabalhavam em um açougue", "Eram feirantes", "Eram motoristas"],
    answer: "Trabalhavam em um açougue",
    tip: "Ele tinha vergonha da origem humilde e inventava que os pais eram empresários internacionais.",
    difficulty: "Média"
  },
  {
    question: "Qual era a profissão do pai autoritário de Diego Bustamante, o León Bustamante?",
    options: ["Diretor de cinema", "Advogado famoso", "Político", "Banqueiro"],
    answer: "Político",
    tip: "Ele era um parlamentar influente que tentava moldar o filho para seguir a mesma carreira.",
    difficulty: "Fácil"
  },
  {
    question: "De quem Mía Colucci tinha ciúmes e apelidou provocativamente de 'gatinho de sarjeta'?",
    options: ["Diego", "Giovanni", "Miguel", "Gastão"],
    answer: "Miguel",
    tip: "Apesar das brigas e dos apelidos, ele acabou se tornando o grande amor da vida dela.",
    difficulty: "Fácil"
  },
  {
    question: "Qual professor era o maior aliado dos alunos contra as injustiças da diretoria?",
    options: ["Pascoal Gandía", "Enrique Madariaga", "Professor Estevão", "Professor Hilário"],
    answer: "Enrique Madariaga",
    tip: "Ele lecionava ética e literatura, sempre defendendo a liberdade de expressão dos jovens.",
    difficulty: "Média"
  },
  {
    question: "Qual música é o grande tema de abertura da primeira temporada da novela?",
    options: ["Sálvame", "Sólo Quédate En Silencio", "Nuestro Amor", "Rebelde"],
    answer: "Rebelde",
    tip: "A letra começa com 'Mientras mi mente viaja donde tú estás...'.",
    difficulty: "Fácil"
  },
  {
    question: "Por qual motivo o personagem Miguel Arango vai morar na Cidade do México e entrar no colégio?",
    options: ["Ganhar uma bolsa de estudos", "Vingar a morte de seu pai", "Fugir de problemas na sua cidade natal", "Se tornar um cantor famoso"],
    answer: "Vingar a morte de seu pai",
    tip: "Ele culpava Franco Colucci, pai de Mía, pela falência e suicídio de seu pai.",
    difficulty: "Média"
  },
  {
    question: "Qual era o nome da banda rival que tentou competir com o RBD no colégio?",
    options: ["C3Q", "Erreway", "Os Mutantes", "The Rebels"],
    answer: "C3Q",
    tip: "Era formada por Celina, Vick e Sol Riva Riva, lançando a música 'No Me Importa'.",
    difficulty: "Difícil"
  },
  {
    question: "Quem era o inspetor do colégio que infernizava a vida dos bolsistas e trabalhava para a Seita?",
    options: ["Gastão Diestro", "Pascoal Gandía", "Blas Heredia (Gastão)", "Estevão Nolasco"],
    answer: "Blas Heredia (Gastão)",
    tip: "Na dublagem brasileira ficou conhecido como Gastão, o tutor implacável de Lupita e inimigo de Miguel.",
    difficulty: "Difícil"
  },
  {
    question: "Quem é o verdadeiro pai biológico de Roberta Pardo, revelado mais adiante na trama?",
    options: ["Franco Colucci", "Carlo Colucci", "Martin Reverte", "Antonio Pardo"],
    answer: "Martin Reverte",
    tip: "Ele fingiu ser o professor substituto Octavio Reverte para ficar perto da filha.",
    difficulty: "Difícil"
  },
  {
    question: "Qual das seguintes atrizes interpretou a doce e tímida Lupita Fernández?",
    options: ["Maite Perroni", "Dulce María", "Anahí", "Zoraida Gómez"],
    answer: "Maite Perroni",
    tip: "Essa personagem marcou a estreia da atriz na televisão internacional.",
    difficulty: "Fácil"
  }
      
    ],
  },

  
  {
    category: "Bíblia",
    questions: [
      {
    question: "De acordo com o livro de Gênesis, qual é o primeiro livro oficial da Bíblia Sagrada?",
    options: ["Êxodo", "Apocalipse", "Salmos", "Gênesis"],
    answer: "Gênesis",
    tip: "O nome do livro significa 'origem' ou 'princípio' e narra a criação do mundo.",
    difficulty: "Fácil"
  },
  {
    question: "Qual homem construiu uma arca para salvar sua família e os animais de um grande dilúvio?",
    options: ["Abraão", "Noé", "Moisés", "Isaías"],
    answer: "Noé",
    tip: "Ele era um homem justo em sua geração e choveu por 40 dias e 40 noites.",
    difficulty: "Fácil"
  },
  {
    question: "Qual personagem bíblico foi vendido como escravo por seus próprios irmãos e levado para o Egito?",
    options: ["José", "Benjamin", "Davi", "Sansão"],
    answer: "José",
    tip: "Ele ganhou de seu pai, Jacó, uma túnica colorida de mangas compridas.",
    difficulty: "Fácil"
  },
  {
    question: "Quem foi o líder escolhido por Deus para libertar o povo de Israel da escravidão no Egito?",
    options: ["Josué", "Gideão", "Moisés", "Arão"],
    answer: "Moisés",
    tip: "Deus falou com ele pela primeira vez através de uma sarça ardente que não se consumia.",
    difficulty: "Fácil"
  },
  {
    question: "Qual pastor de ovelhas derrotou o gigante filisteu Golias usando apenas uma funda e uma pedra?",
    options: ["Saul", "Salomão", "Davi", "Jonatas"],
    answer: "Davi",
    tip: "Ele mais tarde se tornou o rei mais famoso e amado de Israel.",
    difficulty: "Fácil"
  },
  {
    question: "Quem é conhecido na Bíblia como o homem mais sábio que já existiu?",
    options: ["Salomão", "Daniel", "Ezequiel", "Jó"],
    answer: "Salomão",
    tip: "Ele era filho do Rei Davi e construiu o primeiro Templo de Jerusalém.",
    difficulty: "Fácil"
  },
  {
    question: "Qual profeta foi lançado na cova dos leões por se recusar a parar de orar a Deus?",
    options: ["Elias", "Jeremias", "Daniel", "Isaías"],
    answer: "Daniel",
    tip: "Ele era um jovem cativo na Babilônia que conseguia interpretar sonhos.",
    difficulty: "Fácil"
  },
  {
    question: "Qual profeta passou três dias e três noites dentro da barriga de um grande peixe?",
    options: ["Jonas", "Eliseu", "Amós", "Miqueias"],
    answer: "Jonas",
    tip: "Ele tentou fugir de navio para não pregar na cidade de Nínive.",
    difficulty: "Fácil"
  },
  {
    question: "Em qual cidade nasceu Jesus Cristo, o Salvador?",
    options: ["Nazaré", "Jerusalém", "Belém", "Cafarnaum"],
    answer: "Belém",
    tip: "A cidade fica na Judeia e cumpriu a profecia do profeta Miqueias.",
    difficulty: "Fácil"
  },
  {
    question: "Qual era a profissão de base de Pedro, Tiago e João antes de seguirem a Jesus?",
    options: ["Carpinteiros", "Pescadores", "Cobradores de impostos", "Pastores"],
    answer: "Pescadores",
    tip: "Jesus disse que os transformaria em 'pescadores de homens'.",
    difficulty: "Média"
  },
  {
    question: "Qual foi o primeiro milagre público realizado por Jesus registrado nos Evangelhos?",
    options: ["Multiplicação dos pães", "Transformação de água em vinho", "Cura de um cego", "Ressurreição de Lázaro"],
    answer: "Transformação de água em vinho",
    tip: "Este milagre aconteceu durante uma festa de casamento em Caná da Galileia.",
    difficulty: "Média"
  },
  {
    question: "Qual amigo de Jesus havia morrido e estava no túmulo há quatro dias antes de ser ressuscitado?",
    options: ["Lázaro", "Bartolomeu", "Nicodemos", "Zaqueu"],
    answer: "Lázaro",
    tip: "Ele era irmão de Marta e de Maria, e morava na aldeia de Betânia.",
    difficulty: "Fácil"
  },
  {
    question: "Qual discípulo traiu Jesus por trinta moedas de prata?",
    options: ["Tomé", "Judas Iscariotes", "Simão, o Zelote", "Tadeu"],
    answer: "Judas Iscariotes",
    tip: "Ele identificou Jesus para os guardas entregando-lhe um beijo no rosto.",
    difficulty: "Fácil"
  },
  {
    question: "Qual apóstolo negou conhecer Jesus três vezes antes do galo cantar?",
    options: ["João", "Tiago", "Pedro", "André"],
    answer: "Pedro",
    tip: "Jesus já havia previsto essa negação durante a Última Ceia.",
    difficulty: "Fácil"
  },
  {
    question: "Quem era o governador romano que lavou as mãos e condenou Jesus à crucificação?",
    options: ["Herodes", "Pôncio Pilatos", "César Augusto", "Félix"],
    answer: "Pôncio Pilatos",
    tip: "Ele perguntou à multidão se preferiam soltar Jesus ou o criminoso Barrabás.",
    difficulty: "Média"
  },
  {
    question: "Qual perseguidor de cristãos viu uma luz brilhante no caminho de Damasco e se tornou o maior missionário do Novo Testamento?",
    options: ["Saulo (Paulo)", "Barnabé", "Estêvão", "Lucas"],
    answer: "Saulo (Paulo)",
    tip: "Ele ficou cego por três dias após ouvir a voz de Jesus lhe perguntando: 'Por que me persegues?'.",
    difficulty: "Média"
  },
  {
    question: "Qual livro da Bíblia é o mais longo e consiste inteiramente em cânticos e poemas de louvor?",
    options: ["Provérbios", "Salmos", "Cântico dos Cânticos", "Lamentações"],
    answer: "Salmos",
    tip: "Contém 150 capítulos e grande parte deles foi escrita pelo Rei Davi.",
    difficulty: "Fácil"
  },
  {
    question: "Qual homem perdeu seus filhos, sua riqueza e sua saúde, mas manteve sua fé e paciência em Deus?",
    options: ["Jó", "Abraão", "Ló", "Isaque"],
    answer: "Jó",
    tip: "Sua história é um grande exemplo de fidelidade em meio ao sofrimento intenso.",
    difficulty: "Média"
  },
  {
    question: "Quantos mandamentos foram escritos por Deus nas tábuas de pedra entregues a Moisés no Monte Sinai?",
    options: ["7", "12", "10", "40"],
    answer: "10",
    tip: "Eles servem como a base moral das leis divinas e começam com o mandamento de amar a Deus sobre todas as coisas.",
    difficulty: "Fácil"
  },
  {
    question: "Quem foi a primeira mulher criada por Deus, de acordo com o relato do Éden?",
    options: ["Sara", "Eva", "Rute", "Ester"],
    answer: "Eva",
    tip: "O nome dela significa 'mãe de todos os seres viventes'.",
    difficulty: "Fácil"
  },
  {
    question: "Qual homem bíblico era conhecido por sua força extraordinária ligada ao seu cabelo comprido?",
    options: ["Gideão", "Sansão", "Saul", "Absalão"],
    answer: "Sansão",
    tip: "Ele foi um dos juízes de Israel e acabou sendo traído por uma mulher chamada Dalila.",
    difficulty: "Fácil"
  },
  {
    question: "Qual rainha judia arriscou sua vida para salvar seu povo de um decreto de destruição no Império Persa?",
    options: ["Ester", "Jezabel", "Vasti", "Atalia"],
    answer: "Ester",
    tip: "Ela foi criada por seu primo Mardoqueu e venceu um concurso de beleza para se tornar rainha.",
    difficulty: "Média"
  },
  {
    question: "De acordo com o Novo Testamento, qual é o último livro da Bíblia?",
    options: ["Romanos", "Hebreus", "Judas", "Apocalipse"],
    answer: "Apocalipse",
    tip: "O nome vem do grego e significa 'revelação'; foi escrito pelo apóstolo João na ilha de Patmos.",
    difficulty: "Fácil"
  },
  {
    question: "Qual jovem foi jogado na fornalha ardente com seus amigos Sadraque e Abede-Nego, mas saiu sem nenhuma queimadura?",
    options: ["Mesaque", "Daniel", "Neemias", "Esdras"],
    answer: "Mesaque",
    tip: "O rei Nabucodonosor viu uma quarta pessoa andando com eles no fogo, semelhante a um filho dos deuses.",
    difficulty: "Difícil"
  },
  {
    question: "Quem batizou Jesus Cristo no Rio Jordão no início de seu ministério?",
    options: ["João Batista", "Pedro", "Nicodemos", "Ananias"],
    answer: "João Batista",
    tip: "Ele vivia no deserto, vestia pele de camelo e se alimentava de gafanhotos e mel silvestre.",
    difficulty: "Fácil"
  },
  {
    question: "Qual mulher estrangeira decidiu não abandonar sua sogra Noemi e disse a famosa frase: 'O teu povo será o meu povo'?",
    options: ["Rute", "Orfa", "Raabe", "Lia"],
    answer: "Rute",
    tip: "Ela era moabita e acabou se tornando bisavó do Rei Davi.",
    difficulty: "Média"
  },
  {
    question: "Qual mar foi milagrosamente aberto por Deus para que o povo de Israel passasse a pé enxuto fugindo dos egípcios?",
    options: ["Mar Morto", "Mar Vermelho", "Mar da Galileia", "Mar Mediterrâneo"],
    answer: "Mar Vermelho",
    tip: "Moisés estendeu o seu cajado sobre as águas para que o vento as dividisse.",
    difficulty: "Fácil"
  },
  {
    question: "Quem subiu aos céus em um redemoinho com uma carruagem e cavalos de fogo diante de seu sucessor?",
    options: ["Elias", "Eliseu", "Enoque", "Moisés"],
    answer: "Elias",
    tip: "Seu sucessor espiritual, que viu o acontecimento, foi o profeta Eliseu.",
    difficulty: "Difícil"
  },
  {
    question: "Qual foi o homem que viveu mais tempo registrado na Bíblia, alcançando a idade de 969 anos?",
    options: ["Matusalém", "Adão", "Noé", "Jarede"],
    answer: "Matusalém",
    tip: "Ele era avô de Noé e filho de Enoque.",
    difficulty: "Média"
  },
  {
    question: "Qual é o menor livro do Antigo Testamento, contendo apenas um capítulo com 21 versículos?",
    options: ["Naum", "Obadias", "Ageu", "Habacuque"],
    answer: "Obadias",
    tip: "Este livro traz uma profecia curta focada no julgamento da nação de Edom.",
    difficulty: "Difícil"
  }
],


  },
];

export default data;
