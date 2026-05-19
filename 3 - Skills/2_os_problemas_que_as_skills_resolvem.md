# Os problemas que as Skills resolvem

A primeira coisa que talvez alguém estranhe é que você vai perceber que eu escrevi aqui **Project Skills**. E por que eu escrevi Project Skills? Na realidade, quem executa e utiliza um skill é um agente de IA. Mas o nosso ponto principal aqui é ter, na prática, o passo a passo para iniciar um projeto de desenvolvimento com IA. E uma das partes dessa definição, na hora que você vai trabalhar com o seu projeto, é ter os skills que vão ser necessários para codificar.

Então, somente para deixar claro, quem utiliza skill é o agente, mas eu estou chamando isso aqui de Project Skills, porque é uma outra etapa que nós temos para trabalhar com o desenvolvimento com IA. Tivemos uma etapa muito importante em relação à parte do `Cloud.md`. Por exemplo, o `Agents.md`, normalmente você vai criar um link simbólico para ajudar, mas a parte de skills é extremamente relevante.

Então, vamos começar do começo. **O que são Skills, no final das contas?** Os Skills são habilidades que poderão ser informadas ao agente para resolver tarefas de domínios específicos. Esse tipo de coisa é muito válido, por quê? Porque, às vezes, você quer que o agente se comporte para fazer algo específico da sua empresa ou do seu projeto naquele padrão que você está trabalhando.

Mas, muitas vezes, você quer que o agente se comporte como, por exemplo, um *code reviewer*. E um code reviewer, muitas vezes, precisa ter habilidades e uma metodologia para atuar. Ou, às vezes, você quer que um agente tenha um superpoder, um skill, para que ele consiga desenvolver uma aplicação com Next.js utilizando boas práticas. Ou que ele entenda de React para conseguir desenvolver os componentes da melhor forma possível.

Ou seja, vamos falar por categorizações daqui a pouco, mas o importante é que, quando você tem algo específico e não apenas de codificação geral, os skills fazem muita diferença. Então, o que acontece? É aqui que muitas pessoas acabam não entendendo a importância e o conceito de como os skills são utilizados.

Então é o seguinte: os skills normalmente são carregados **on-demand**, ou seja, toda vez que o agente carrega um skill, ele faz isso somente porque existe uma necessidade. O agente carrega um skill apenas quando há necessidade de executar alguma tarefa relacionada a ele. E por que isso muda muito o jogo? Por conta dessa palavrinha aqui: *on-demand*.

Quando estamos desenvolvendo, uma das nossas maiores dificuldades com o agente de IA é a **janela de contexto** limitada. Então, novamente, temos aqui a nossa janela de contexto limitada, e é nesse espaço que o agente mantém todas as informações que ele precisa para trabalhar. Agora, qual é o grande ponto? Se todas as guidelines e todas as informações que você tiver ali são necessárias para o agente ler para desenvolver seu projeto, esse agente já vai nascer ocupando esse espaço da sua janela de contexto.

Você só vai ter esse pedaço aqui para quê? Para programar. Mas você vai perceber também que acontece o seguinte: quando ele é iniciado, ele tem um *system prompt*, que já vem nele, que é o responsável pela codificação. Além disso, fora o system prompt, o que vai existir aqui? A memory dele, o `Cloud.md` que ele vai utilizar.

Além disso, o que nós vamos ter aqui, e depois podemos falar, são os **servidores MCP**. Então, ele vai ter que carregar e ler as descrições dos servidores MCP, e isso consome tokens. Depois disso também, ele tem a lista de agentes que precisa carregar, e também a lista de skills que precisa carregar. E eu não estou dizendo que essa é a proporção exata, mas, na realidade, às vezes, só de você começar uma sessão, você pode ter, por exemplo, cerca de **20% da janela de contexto** ocupada.

Então, você vai dar um oi e já terá consumido aproximadamente 20% da sua janela de contexto. Mas tem uma outra coisa no meio dessa história, que é o seguinte: quando estamos programando e a janela de contexto está acabando, o agente, para conseguir compactar a sua mensagem e o histórico, e assim poder continuar a conversa, precisa de tokens para fazer esse processo.

Então, o que acontece? Quando começamos a chegar mais ou menos nesse ponto, com a nossa janela de contexto quase no limite, ele precisa de em torno de **15% a 20% de espaço reservado** para conseguir fazer a compactação. Ou seja, na prática, algo em torno de 75% a 80% da janela precisa estar disponível para que ele consiga realizar esse processo.

Quando você for observar, vai perceber que terá apenas esse espaço aqui para trabalhar com o agente, o que significa menos espaço e menos sessões. E, além disso, tudo isso vai consumindo cada vez mais tokens.

Agora, imagine que eu preciso que o agente faça um code review, depois programe em React, depois trabalhe com Python, depois execute outras tarefas. Se eu pegar toda essa informação e colocar diretamente na janela de contexto apenas para iniciar a conversa, nós teremos todo esse espaço ocupado.

A nossa ideia aqui é a seguinte: quando trabalhamos com skills, o agente vai gastar alguns tokens com skills, mas vai gastar tokens apenas para listar e entender as descrições que cada skill possui. Isso é um ponto importante para você compreender.

E pelo fato de as skills serem carregadas *on-demand*, significa que você não vai iniciar uma conversa com o agente carregando tudo o que ele precisa saber. Isso faz muita diferença. Hoje em dia, muitas pessoas sabem como funciona uma skill, ou já ouviram falar em skill, mas acabam esquecendo desse detalhe, e foi exatamente por isso que as skills surgiram.

Agora, existe um outro detalhe interessante nessa história. Em alguns softwares de codificação, o pessoal resolveu ir um pouco além. Normalmente, uma skill é carregada *on-demand*, mas, às vezes, você pode querer forçar o agente a utilizar uma determinada skill, porque, no final das contas, **uma skill não deixa de ser um prompt**.

Então, por exemplo, e aqui estou dando um exemplo do **Cloud Code**, o que ele permite? Ele permite que você utilize um *slash command*. Ou seja, você digita uma barra no Cloud Code, onde existem diversos comandos que podem ser executados, e um desses comandos pode ser uma skill.

E, quando a skill aparece, você pode executá-la como se fosse um comando. Então, isso é importante você saber. A skill pode ser executada dessa forma, mas o objetivo principal dela continua sendo trabalhar *on-demand*. Existem algumas variações, e nós vamos falar sobre isso também em relação à parte de agentes.

Mas vamos lá, acredito que esses são os conceitos principais. Depois existem as exceções, e nós vamos falar sobre isso.
