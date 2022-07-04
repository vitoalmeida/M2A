export const admin = {
  id: 1,
  username: "MarceloAdmin",
  password: "123456",
  ativo: true,
  email: "marceloadmin@gmail.com",
  tipo: 1,
  user_inf: {
    nome: "Marcelo",
    sobrenome: "Silva",
    cpf: "00000000000",
  },
};

export const consultor = {
  id: 2,
  username: "MarceloConsultor",
  password: "123456",
  ativo: true,
  email: "marceloconsultor@gmail.com",
  tipo: 2,
  user_inf: {
    nome: "Marcelo",
    sobrenome: "Silva",
    cpf: "00000000000",
    formacao: "superior",
    uf: 2,
    telefone: "00000000",
  },
};

export const empresaMaster = {
  id: 3,
  username: "empresamaster",
  password: "123456",
  ativo: true,
  email: "empresamaster@email.com",
  tipo: 4,
  user_inf: {
    cnpj: "0",
    razao_social: "vazio",
    fantasia: "vazio",
    num_empregados: 1,
    dt_ano_inicio: "2022-06-06",
    telefone: "0",
    resp_nome: "vazio",
    resp_sobrenome: "vazio",
    resp_email: "vazio",
    resp_sexo: "vazio",
    resp_formacao_academica: "vazio",
    endereco: 1,
    segmento: 1,
    setor: 1,
    tipo_industria: 1,
    valor_arrecadacao: 1,
  },
};

export const perguntas = [
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método de separação/segmentação/agrupamento para seus novos clientes com características iguais ou parecidas?",
    objetivo: "O agrupamento dos clientes tem por objetivo estabelecer os tipos de clientes com características similares, possibilitando a oferta de serviços ou produtos adequados para cada grupo de clientes. Exemplo de critério: idade, sexo e etc.",
    conceito: "",
    fundamento: 1,
    respostas: [1, 2, 3, 4],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para realizar o levantamento de informações para conhecer necessidades e expectativas dos seus clientes?",
    objetivo: "A identificação, a análise e a compreensão das necessidades e expectativas dos clientes-alvo visam obter as informações necessárias para a configuração de serviços e produtos, que incorporem as características mais relevantes para os grupos de clientes.",
    conceito: "",
    fundamento: 1,
    respostas: [5, 6, 7, 8],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para realizar a divulgação dos seus produtos e serviços aos seus clientes e ao mercado?",
    objetivo: "A divulgação dos produtos tem a finalidade de despertar o interesse dos clientes atuais e potenciais nos segmentos de mercado pelos produtos de empresa.",
    conceito: "",
    fundamento: 1,
    respostas: [9, 10, 11, 12],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para tratar as reclamações feitas pelos seus clientes?",
    objetivo: "O tratamento das reclamações, de forma pronta e eficaz, tem a finalidade de eliminar falhas em serviços e produtos, melhorando suas características. Objetiva, também, melhorar os níveis de satisfação e de fidelização dos clientes.",
    conceito: "",
    fundamento: 1,
    respostas: [13, 14, 15, 16],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para avaliar o nível de satisfação dos seus clientes e do mercado referente aos seus produtos e/ou serviços?",
    objetivo: "A avaliação da satisfação dos clientes tem por objetivo mensurar sua percepção sobre a empresa, seus serviços e produtos, identificando oportunidades para a melhoria. Ex: existe alguma forma de avaliar a satisfação dos clientes?",
    conceito: "",
    fundamento: 1,
    respostas: [17, 18, 19, 20],
  },
  {
    texto_pergunta:
      "Sr. Empresário, todo negócio/empresa gera algum tipo de impacto negativo ao meio ambiente. A sua empresa possui algum método para tratar esses impactos?",
    objetivo: "Para que a empresa possa tratar seus impactos ambientais é necessário que, primeiramente, conheça os danos que suas atividades e instalações causam ao meio ambiente.",
    conceito: "",
    fundamento: 2,
    respostas: [21, 22, 23, 24],
  },
  {
    texto_pergunta:
      "Sr. Empresário, você conhece quais são as exigências legais para o funcionamento do seu negócio? Você procura se atualizar sempre em relação a essas exigências legais?",
    objetivo: "As exigências legais são aquelas determinadas pela legislação vigente, sob o controle de órgão competente municipal, estadual e federal (MEC, vigilância Sanitária, órgão Ambiental, Procon, etc).",
    conceito: "",
    fundamento: 2,
    respostas: [25, 26, 27, 28],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui algum tipo de ação independente ou coletiva de participação em projeto social que beneficie, de alguma forma, a comunidade e/ou a sociedade?",
    objetivo: "As ações sociais, como doações que auxiliem temporariamente a comunidade, não geram o desenvolvimento sustentado. O desenvolvimento sustentado é promovido quando ocorre o crescimento econômico, social, humano e ambiental da comunidade.",
    conceito: "",
    fundamento: 2,
    respostas: [29, 30, 31, 32],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui missão e valores definidos? Como essa missão e valores são repassados/divulgados para os colaboradores?",
    objetivo: "A definição da missão tem como finalidade deixar clara a razão de existir da empresa, assegurando a convergência nas ações de todas as pessoas. A definição dos valores tem como finalidade deixar claros os princípios que regem comportamentos e atitudes das pessoas na empresa. Exemplos: confiança, ética, respeito ao meio ambiente e etc. A comunicação da missão e dos valores aos colaboradores tem como finalidade contribuir para que todos compartilhem e persigam os mesmos ideais, potencializando a contribuição de cada um na empresa.",
    conceito: "",
    fundamento: 3,
    respostas: [33, 34, 35, 36],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui definido os valores éticos para serem seguidos pelos dirigentes e colaboradores no ambiente interno e externo?",
    objetivo: "O tratamento das questões éticas visa promover o relacionamento ético entre as pessoas da empresa e nas relações externas com clientes, fornecedores, concorrentes e governo.",
    conceito: "",
    fundamento: 3,
    respostas: [37, 38, 39, 40],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui algum método para analisar o desempenho do negócio e dos colaboradores?",
    objetivo: "A análise de desempenho do negócio é fundamental para que os dirigentes identifiquem se os objetivos/metas estão sendo alcançados. Esta análise deve ser realizada com informações e indicadores relacionados não só aos aspectos financeiros e da produção, mas também relacionados a vendas, fornecedores, clientes, colaboradores, clientes, colaboradores, financeiro, produção e aspectos ambientais.",
    conceito: "",
    fundamento: 3,
    respostas: [41, 42, 43, 44],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui algum método para divulgar e/ou compartilhar informações com os colaboradores?",
    objetivo: "O compartilhamento de informações sobre a empresa com os colaboradores tem como finalidade desenvolver um sentimento coletivo de pertencer a um grupo de pessoas que perseguem os mesmos ideais, potencializando a contribuição de cada um. Quando todos os colaboradores entendem quais são os objetivos da empresa e acompanha os resultados obtidos rumo ao cumprimento destes objetivos, a produtividade aumenta. Ex: mural, email, em reuniões, via email e se existe política de comunicação interna.",
    conceito: "",
    fundamento: 3,
    respostas: [45, 46, 47, 48],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa promove, incentiva e/ou patrocina de algum tipo de capacitação para o DESENVOLVIMENTO GERENCIAL? Como esses conhecimentos são aplicados na própria empresa?",
    objetivo: "A busca por conhecimentos gerenciais pelos dirigentes tem a finalidade de manter-se atualizado em relação às exigências do mercado na condução do negócio. Ex: cursos, palestras, feiras, congresso (com ou sem a participação de colaboradores).",
    conceito: "",
    fundamento: 3,
    respostas: [49, 50, 51, 52],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui algum método para promover a melhoria dos produtos, serviços, processos e métodos de gestão?",
    objetivo: "A promoção de melhorias e a busca de inovação dos métodos de gestão, marketing, processos, serviços e produtos têm como finalidade aumentar a competitividade da empresa. A melhoria pode ser buscada internamente, ouvindo os colaboradores, e externamente, por meio da interação com o ambiente externo, como, por exemplo: outras empresas, inclusive concorrentes, universidades, centros de pesquisas, associações, rede de relacionamentos, etc.",
    conceito: "",
    fundamento: 3,
    respostas: [53, 54, 55, 56],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui visão de futuro? Como ela é divulgada e compreendida pelos colaboradores?",
    objetivo: "A definição da visão tem como finalidade deixar claro o que os dirigentes esperam da empresa num futuro definido. Essa visão deverá nortear as ações do planejamento estratégico. A comunicação da visão aos colaboradores tem como finalidade contribuir para que todos compartilhem e persigam os mesmos ideais, potencializando a contribuição de cada um na empresa.",
    conceito: "",
    fundamento: 4,
    respostas: [57, 58, 59, 60],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa possui algum tipo de estratégia para alcançar a visão de futuro estabelecida pela empresa?",
    objetivo: "Ao definir a visão, a empresa deve estabelecer estratégias para alcançá-las e direcionar seus esforços. Essas estratégias devem levar em conta informações relativas aos clientes, mercado, fornecedores, colaboradores, sua capacidade de prestar serviços, produzir e vender, para posicioná-la de forma competitiva e garantir a sua continuidade. Ex: planejamento estratégico anual, Plano de Marketing e entre outras.",
    conceito: "",
    fundamento: 4,
    respostas: [61, 62, 63, 64],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa estabelece algum indicativo e/ou meta para as estratégias estabelecidas?",
    objetivo: "A definição dos indicadores tem o objetivo de permitir a avaliação do alcance das estratégias por meio de resultados quantitativos. O estabelecimento de metas para os indicadores visa definir níveis de resultados esperados para permitir a análise do desempenho do negócio. Ex: quantos clientes pretendem conquistar, quanto do produto/serviço X quero vendar a mais e etc.",
    conceito: "",
    fundamento: 4,
    respostas: [65, 66, 67, 68],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa possui algum método de planejamento para implementar as ações estratégicas definidas para atingir as metas estabelecidas? ex; plano de ação.",
    objetivo: "Os Planos de Ação são importantes ferramentas para desdobrar as estratégias de modo a atingir as metas. De modo geral, os planos de ação são estabelecidos para realizar aquilo que a empresa deve fazer para que sua estratégia seja bem-sucedida. Ex: o plano ação define quem, aonde, como, prazo, custo e etc.",
    conceito: "",
    fundamento: 4,
    respostas: [69, 70, 71, 72],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa tem bem definidas as funções e responsabilidades dos dirigentes e/ou colaboradores?",
    objetivo: "A definição clara das funções e responsabilidades e seu conhecimento por todos da empresa têm a finalidade de esclarecer como deve ser a participação das pessoas,  promover a sinergia do trabalho em equipe e a eficiência e produtividade do sistema de trabalho como um todo. Ex: existe política de RH, organograma e etc.",
    conceito: "",
    fundamento: 5,
    respostas: [73, 74, 75, 76],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa possui algum método para realizar a contratação dos colaboradores?",
    objetivo: "A contratação de colaboradores tem como objetivo preencher as vagas da empresa com profissionais aptos para atender às necessidades atuais e futuras. Pode considerar as oportunidades para o desenvolvimento de membros da equipe atual, assim como promover a inserção e integração de novas pessoas para o exercício das funções. Ex: a empresa avalia o perfil da vaga e do colaborador ideal, a empresa avalia a possibilidade de aproveitar um colaborador interno, o meio para encontrar o colaborador ideal é colocação de anúncio, indicação e etc.",
    conceito: "",
    fundamento: 5,
    respostas: [77, 78, 79, 80],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sua empresa promove, incentiva e/ou patrocina algum tipo de capacitação para o desenvolvimento dos colaboradores?",
    objetivo: "A capacitação dos colaboradores tem por finalidade desenvolver as habilidades e conhecimento para que eles possam desenvolver suas atividades diárias, de forma a garantir a eficiência e a sinergia da equipe. Ex: são oferecidos cursos, palestras, congressos, treinamentos pelos fornecedores e etc.",
    conceito: "",
    fundamento: 5,
    respostas: [81, 82, 83, 84],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa possui algum método para identificar: perigos de acidentes, de saúde e/ou de segurança no ambiente de trabalho da empresa?",
    objetivo: "A identificação dos perigos e o tratamento dos riscos relacionados a saúde e segurança no trabalho têm como objetivo inventariar, priorizar e viabilizar o tratamento corretivo e preventivo dos fatores que possam ameaçar a integridade física ou psicológica dos integrantes da força de trabalho em decorrência de suas atividades.  Ex: sua empresa atende as exigências PCMSO( Programa de Controle de Medicina e Saúde Ocupacional) e do PPRA(Programa de Prevenção de Riscos Ambientais).",
    conceito: "",
    fundamento: 5,
    respostas: [85, 86, 87, 88],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa possui alguma forma de avaliar e tratar o bem-estar e satisfação dos colaboradores?",
    objetivo: "A doação de ações para garantir o bem-estar e a satisfação dos colaboradores tem como finalidade promover um ambiente de trabalho mais participativo e agradável que proporcione motivação para a realização do trabalho. Estas ações podem incluir, por Ex: benefícios adicionais exigidos pela legislação, realização de atividades esportivas, confraternizações, áreas de lazer, facilidade de comunicação em todos os níveis entre outros.",
    conceito: "",
    fundamento: 5,
    respostas: [89, 90, 91, 92],
  },
  {
    texto_pergunta:
      "Sr. Empresário, para que as atividades da empresa sejam executadas de maneira eficiente e padronizada, gostaria de saber se existe algum tipo de padrão de execução de tarefa documentado?",
    objetivo: "As atividades da empresa estão associadas à prestação de serviços, à comercialização e à produção de bens para atender às necessidades dos clientes. O uso de padrões definidos e documentados assegura a uniformidade e continuidade da execução das atividades. Esses devem levar em consideração os requisitos, os quais são obtidos principalmente a partir de informações das necessidades dos clientes e da legislação. Ex: manual de processos, registros de normas e padrões e etc.",
    conceito: "",
    fundamento: 6,
    respostas: [93, 94, 95, 96],
  },
  {
    texto_pergunta:
      "Sr.Empresário, a empresa possui algum método para controlar as atividades e o seu desempenho?",
    objetivo: "O controle das atividades tem por finalidade assegurar que os requisitos definidos sejam atendidos, permitindo a tomada de medidas corretivas quando necessário. O estabelecimento de metas para os indicadores visa definir os níveis de resultados esperados para os requisitos. Ex: produção, fornecedores, logística, estoque, vendas e etc.",
    conceito: "",
    fundamento: 6,
    respostas: [97, 98, 99, 100],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a empresa possui algum método para selecionar e avaliar os seus fornecedores em relação ao seu desempenho?",
    objetivo: "A qualidade dos serviços prestados e produtos fornecidos aos clientes pela empresa depende da qualidade dos itens/serviços adquiridos de fornecedores. Por isso, é importante que a empresa selecione e monitore o desempenho de seus fornecedores, com o objetivo de otimizar a qualidade e reduzir os custos de fornecimento.",
    conceito: "",
    fundamento: 6,
    respostas: [101, 102, 103, 104],
  },
  {
    texto_pergunta:
      "Sr. Empresário, sabemos que o controle financeiro de uma empresa é fundamental para a sobrevivência, tomadas de decisões e sucesso. Neste sentido gostaria de saber se a sua empresa possui algum método para realizar os controles financeiros afim de melhor utilizá-los? ",
    objetivo: "A operação da empresa depende da disponibilidade de recursos financeiros para fazer frente a compras de serviços e materiais, para pagar empregados e despesas, e para investir em equipamentos necessários a comercialização, prestação de serviços ou a fabricação de produtos e sua entrega. O monitoramento e o controle dos aspectos financeiros são essenciais para assegurar as operações. O plano financeiro orçamentário tem como finalidade fazer uma previsão das receitas, despesas e investimentos para assegurar a disponibilidade de recursos para a execução das atividades.",
    conceito: "",
    fundamento: 6,
    respostas: [105, 106, 107, 108],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para definir quais informações são necessárias para a análise, execução das atividades e para a gestão do seu negócio?",
    objetivo: "A definição de sistemas de informação tem o objetivo de desenvolver e disponibilizar as ferramentas e tecnologias mais eficazes para atender às necessidades identificadas junto aos colaboradores. Ex: existe aproveitamento das informações internas (vendas, comissões, logística, produção, estoque), fornecedor, concorrência e etc. ",
    conceito: "",
    fundamento: 7,
    respostas: [109, 110, 111, 112],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para disponibilizar as informações para os colaboradores?",
    objetivo: "A disponibilização das informações, quando pertinente, tem como finalidade permitir a adequada operação e condução do negócio em todos os níveis. A retenção do conhecimento da empresa, utilizando-se de registros, assegura a continuidade da operação em caso de substituição de pessoas.",
    conceito: "",
    fundamento: 7,
    respostas: [113, 114, 115, 116],
  },
  {
    texto_pergunta:
      "Sr. Empresário, a sua empresa possui algum método para buscar informações de outras empresas com o objetivo de comparar e avaliar o desempenho e melhorar os serviços, produtos e processos da sua empresa?",
    objetivo: "A obtenção de informações comparativas inclui aquelas oriundas de empresa do seu ramo ou outros ramos de atividade e permite adotar novas práticas ou métodos para a melhoria dos serviços, produtos e processos. Permite também a comparação de seus resultados, identificando diferenciais favoráveis e desfavoráveis a serem tratados.",
    conceito: "",
    fundamento: 7,
    respostas: [117, 118, 119, 120],
  },
];
