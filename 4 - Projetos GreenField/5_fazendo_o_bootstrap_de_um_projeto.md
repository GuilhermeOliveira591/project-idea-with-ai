# Fazendo o bootstrap de um projeto

Agora aqui na tela do meu computador acho que vai ficar mais fácil mostrar isso para vocês. O lance é o seguinte: se você pensar bem, o que tenho aqui para me ajudar? Tenho uma skill que criei, chamada **Next.js Bootstrap**, exatamente para dar este exemplo. Vou deixá-la disponível, mas lembrem-se: é um exemplo, não necessariamente você vai usar isso na sua empresa, em um projeto em produção. Tem várias peculiaridades, mas é para que vocês entendam a ideia.

O grande ponto é: **como é uma skill, ela vai ser independente do agente de IA que você estiver utilizando**. Todos os agentes praticamente utilizam skills. Neste caso, o *Claude Code* me permite executar uma skill como se fosse um comando, mas eu poderia digitar *"faça o setup de um Next.js Bootstrap"* e ele identificaria essa skill. Esse é um ponto importante.

Ele está perguntando se quero usar o diretório atual. Vou pedir para criar um diretório diferente, só para não misturar tudo dentro do projeto. Ele pergunta o nome do projeto, a descrição. Vou colocar o nome do projeto como `MyApp`, e o diretório como `myapp`. Ele pergunta uma descrição do projeto e então inicia.

Agora, vocês vão perceber duas coisas. Ele já gerou a pasta `MyApp`, e está utilizando o script padrão do Next.js para gerar toda aquela estrutura de diretórios e documentos. Ou seja, **criei um *wrapper* em cima desse script**. Por outro lado, o que fiz também para nos ajudar nesse aspecto? Estou gerando coisas além dessa base, que vão me ajudar a não partir mais do zero quando estou criando uma aplicação usando IA.

Vou mostrar as principais diferenças que ele está fazendo. Depois vamos navegar um pouco na skill e ver algumas coisas que foram geradas a partir dela. Ele está gerando `node_modules`, então acaba demorando um pouco, não só pela IA, mas pelo próprio comando de geração de um novo projeto com Next.js.

Aqui ele trouxe que o projeto foi gerado, e esta foi a *stack* que escolhi: **Next.js, Tailwind, Prisma, NextAuth, Ingest, Claude MD e scripts operacionais**. O que isso significa? Tenho agora minha aplicação e posso pedir para iniciar o sistema.

Quando faço isso, ele já chama um script `SH`, criou um `.env` e `.env.local`, e já mexeu em algumas coisas. Outra coisa que vocês devem ter percebido, e já falamos sobre isso, é que **a IA não gastou nenhum segundo tentando explorar meu código**. Por quê? Porque isso já está configurado nela. Ou seja, já consigo, no dia zero, utilizar a IA sem ficar gastando tempo no projeto. Ele colocou na porta **3000**, gerou uma página inicial falando qual foi a *stack* que está trazendo para trabalhar.

O mais interessante não é obviamente essa página, nem apenas os arquivos gerados, mas o ponto de que, a partir de agora, se eu quiser passar tarefas para a IA desenvolver, ela já vai desenvolver. E você pode pensar: *"Wesley, qualquer um que gerar um projeto desse e pedir uma tarefa para a IA, ela vai desenvolver."* Concordo com você, mas **a diferença é *como* ela vai desenvolver**. Por quê? Porque este *setup* que fiz acabou cobrindo esses dois aspectos: a base inicial do projeto e a base inicial para que a IA trabalhe de forma confortável.

No próximo vídeo, vamos explorar isso aqui, e depois também explorar a skill.
