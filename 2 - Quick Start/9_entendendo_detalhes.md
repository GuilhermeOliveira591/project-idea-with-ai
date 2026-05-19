Este é um CLAUDE.md de um projeto que estou trabalhando e provavelmente usarei em diversos exemplos ao longo da disciplina. A ideia é variar em tamanhos de projeto e codebase para podermos brincar conforme evoluímos. Ele não é perfeito, mas no momento está atendendo muito bem.

O Project Overview é simples: "Videomax é uma plataforma de processamento de vídeo que permite ao usuário fazer upload, extrair o vídeo usando client-side com FFmpeg WebAssembly, transcrever usando OpenAI Whisper e gerar sumários com tópicos organizados via API do cloud, com timestamps grounded, navigation links e text summaries to video positions." É um parágrafo pequeno, mas diz muita coisa: nome do projeto, objetivo principal e aspectos técnicos não comuns. Por exemplo, parte do processamento é feita no browser do usuário com FFmpeg WebAssembly, transcrição com Whisper, sumários com API do cloud e timestamps para navegação.

Para subir o ambiente, coloquei as variações que o projeto tem, pois back-end e front-end estão no mesmo projeto. Incluí comandos para verificar o status do ambiente, inicialização, parar, rodar serviços e migrações. Uma pegadinha importante: qualquer comando deve ser executado dentro do container, usando docker exec (ou docker compose exec), e a flag -it é omitida porque o modo interativo impede a execução. Essas linhas definem como a IA vai executar qualquer comando dentro do projeto.

A estrutura do projeto é apresentada de forma concisa: backend com exemplo do arquivo .env, variáveis de ambiente, Docker, Docker Compose, regras de negócio, front-end. Não coloquei uma árvore de arquivos muito profunda, apenas os pontos importantes. Para backend, mencionei Pydantic e SQLAlchemy. No front-end, a mesma simplicidade. O objetivo é dar uma visão geral — níveis muito grandes são ruins, níveis muito pequenos são inúteis.

Para este projeto, alguns códigos de erro específicos são importantes, então incluí os padrões mais comuns que ocorrem ao trabalhar com vídeos. Autenticação: Bear Token no Authorization Header, token expira em uma hora, refresh token é HTTP only e expira em sete dias, account lockout em cinco tentativas falhas por 15 minutos. São informações simples que evitam que a IA fique verificando arquivos repetidamente — ela pode inferir, mas essas informações deixam claro o funcionamento.

A estrutura de logs também foi incluída. Conforme o projeto avança, esse arquivo vai sendo reestruturado. Durante o desenvolvimento, percebi que a IA estava fazendo logs de formas diferentes em partes distintas, então coloquei um exemplo para padronizar.

Os detalhes da stack também estão presentes, evitando que a IA fique navegando por package.json, requirements.txt e outros arquivos para pegar informações básicas.

Agora, sobre os detalhes da stack: poderiam estar mais acima? Sim, poderiam. Mas isso faz alguma diferença muito grande? Não. Poderia estar lá em cima ou mais embaixo. Uma vez que a IA vai ler tudo, não vai ter problema nenhum, ainda mais porque não são pontos de operação. Esse tipo de detalhe é importante porque evita que a IA fique navegando por package.json, requirements.txt e um monte de arquivo para pegar informações que ela já pode saber de cara: framework, ORM, autenticação, password, API externa, front-end, como funciona o sistema de upload — os uploads são chunkados em 5 MB até 2 GB, com capacidade de resume na sessão Xperia de 24 horas, XA-256 para verificação do chunk — e o pipeline de processamento.

Aqui entram as Development Guidelines. São aspectos que começam a virar peculiares do projeto, por isso passei no Scaladraw. São pontos que você precisa lembrar. Cada projeto tem suas peculiaridades, e você vai evoluindo esse arquivo conforme elas aparecem.

Muita gente fica presa em templates de CLAUDE.md, querendo saber o que é melhor ou pior. Você pode até utilizar um template como ponto de partida, mas o que vai mostrar se esse documento é bom para você é se a IA está se comportando da forma que você quer.

Por exemplo, estou rodando com um workflow de algumas automatizações para a IA desenvolver o projeto baseado em tarefas. A IA precisa fazer diversos commits durante o processo de desenvolvimento. Em algum momento, ela começou a incluir nos commits ou dentro de alguns arquivos Python, falando em qual tarefa aquela mudança ou aquele arquivo representava. Talvez isso não aconteça mais no futuro com outros modelos, mas naquele momento estava acontecendo.

Então, coloquei um exemplo extremamente simples: "os comentários devem descrever o que o código faz e por quê, e não os dados de uma tarefa." Mostrei um exemplo ruim e um exemplo bom, com docblock. Isso ajudou muito na parte de como documentar e como não fazer errado. Era uma peculiaridade que estava acontecendo naquele projeto.

Vou cortar aqui para este vídeo não ficar muito grande, porque no próximo precisamos falar de evolução também. 

 