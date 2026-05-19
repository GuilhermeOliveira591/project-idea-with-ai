Antes de voltar à explicação em si, quero que vocês sintam aqui comigo problemas básicos que a inteligência artificial pode ter quando peço para ela fazer absolutamente qualquer coisa. No momento em que estou gravando este vídeo, estou rodando com Claude Code, no modelo Opus, mas o ponto aqui não é o modelo nem a ferramenta. Provavelmente, quando vocês assistirem a este vídeo, já podemos estar rodando com outro modelo, outra versão, etc. Acredito que o conceito permanecerá o mesmo.

Tenho um projeto aqui com algumas coisas bem explícitas. Tenho meu Docker Compose para subir os containers, uma pasta de front-end, uma pasta de back-end, e aparentemente tudo normal. Vou pedir algo extremamente simples e básico para a IA: "Inicie o ambiente para rodar todos os testes." Estou rodando com um modelo de pensamento, todo inteligente e poderoso.

Observem o que está acontecendo. Ela está entendendo o ambiente, vai instalar as dependências e a coisa começa a se estender. Vou parar por aqui porque, na realidade, ela já está fazendo tudo errado. Não sei se vocês já passaram por qualquer situação parecida com essa. Provavelmente sim, pelo menos em algum momento, dependendo do tipo de projeto.

Estou aqui com um modelo extremamente avançado para subir o meu ambiente. Vamos tentar nos colocar no lugar de um desenvolvedor. Vamos fingir que a IA é um desenvolvedor. Se alguém desse esse documento para você, a primeira coisa que eu faria seria rodar docker compose up -d. Por outro lado, a IA está tentando ser um pouco mais criteriosa para verificar se há algo a mais para rodar o ambiente, não apenas o Docker Compose. Provavelmente ela já olhou o Docker Compose, mas viu pastas de front-end e back-end, então resolveu explorar como as coisas estavam.

Posso tentar algo um pouco diferente. Posso tirar o modelo de Thinking e também mudar para um modelo mais barato e rápido que tenho. Vamos lá: "Inicie o ambiente e rode os testes." Aguardando, verificar o ambiente, super rápido. Ela leu o Docker Compose, já está olhando o Next.js, vendo o package.json. Verifico se o container está rodando, o banco de dados já está rodando. E assim vai. Parece haver um problema com a configuração e as coisas se estendem.

Parei por aqui para não gastarmos tempo. Qual é o ponto que quero mostrar? Se não houver uma forma ou um documento que facilite a vida da IA para subir o ambiente, às vezes metade da tarefa que você pedir para ela será ela tentando subir o ambiente para executar aquela tarefa.

No próximo vídeo, daremos mais um passo progressivo para vermos até que ponto precisamos ajudar a IA com o ambiente de desenvolvimento. 


 