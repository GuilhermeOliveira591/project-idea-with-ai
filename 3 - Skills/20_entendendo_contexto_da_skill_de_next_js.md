# Entendendo contexto da Skill de Next.js

A gente vai para a nossa última skill aqui. E a nossa skill é baseada no *setup* de uma aplicação com **Next.js**. Para isso, eu preciso contextualizar. Eu tenho criado vários projetos usando Next.js para fazer testes com IA e estou trabalhando bastante com front-end para tentar deixar as coisas extremamente consistentes com a parte de IA e com agentes de longa duração, *pixel perfect* etc.

O que começou a acontecer comigo foi o seguinte. Lembra que eu falei que uma das coisas mais importantes que você pode ter no seu sistema é o seu `agent.md`, o seu `cloud.md`, mas também formas fáceis de iniciar um ambiente, baixar um ambiente, verificar se o ambiente está ok e diversas outras coisas desse tipo. Quando eu estava executando o meu projeto assim, estava tudo funcionando perfeitamente. Mas aconteceu o seguinte.

Quando eu estou trabalhando aqui — estou dando apenas um exemplo — por favor, se você é especialista em Next.js, não me critique. Eu sou simplesmente um programador Go tentando resolver os problemas do dia a dia. Basicamente, o Next.js tem um arquivo chamado `.env.example`. E dentro desse arquivo a gente define, por exemplo, qual é a porta que a aplicação vai utilizar, normalmente algo como a porta **3000**.

Ele também tem diversos outros parâmetros, às vezes algumas *API keys* e vários outros valores que a gente precisa utilizar. Inclusive portas adicionais e algumas outras configurações importantes. Também existem configurações de conexão com banco de dados que são essenciais para o funcionamento da aplicação.

Mas o que acontece? Enquanto eu estou desenvolvendo o meu projeto dessa forma, eu não tenho nenhum problema. Por quê? Porque, quando eu subo o meu projeto, o que eu faço? Basicamente, eu duplico o arquivo `.env.example` para criar o meu `.env.local`. Depois disso, eu executo as migrações, faço o *seed* do banco e realizo diversas outras tarefas necessárias para que a aplicação fique no ar e funcionando corretamente.

Eu também tenho um script chamado `check.sh`, que verifica se as migrações foram executadas corretamente, se o servidor está rodando etc., o que é muito útil para validar o estado do ambiente antes de trabalhar. Outra coisa importante é o comando `down`, que serve para desligar o servidor. Mas existe também o `down --clean`.

Quando eu executo o `down --clean`, ele não apenas desliga o servidor, mas também remove o banco de dados, remove o arquivo `.env.local`, remove a pasta `node_modules` e reinicializa completamente a aplicação. Se eu executar o `down --force`, ele encerra todos os processos relacionados, inclusive **processos fantasmas** que o Playwright às vezes deixa rodando na máquina.

Esses processos podem deixar a máquina lenta, e muitas vezes você nem percebe que existem processos em execução. São processos do Playwright que ficaram abertos porque a IA esqueceu de encerrar corretamente. Mas, até então, tudo isso estava funcionando bem.

O que mudou foi que **eu comecei a trabalhar com múltiplos agentes simultaneamente**. Eu crio a base de um projeto e tenho diversas *features* sendo executadas ao mesmo tempo. Ou seja, eu tenho várias sessões de IA programando para mim continuamente. E, para que essas sessões funcionem, eu utilizo o **Git Worktree**.

O Worktree é basicamente como se você pudesse ter vários clones do mesmo repositório para trabalhar em paralelo sem gerar conflitos. Então, você consegue trabalhar com *Git Worktree* de forma isolada em cada branch. Mas surgiu um problema simples.

Eu estou aqui em um branch e executo um comando, por exemplo, `run`. Quando eu executo `run`, esse comando chama o `init`, que lê o `env.example`, pega a porta 3000 e inicia a aplicação. Quando outro agente executa o mesmo processo, ele tenta subir a aplicação também usando a porta 3000. Se a porta estiver ocupada, o Next.js automaticamente sobe a aplicação em outra porta, como **3001**.

O problema é que o banco de dados continua apontando para a mesma configuração. Às vezes, o Playwright inicia testes em uma porta e outra instância está usando outra porta. Quando uma terceira aplicação sobe, começa a acessar dados incorretos. Isso rapidamente vira um cenário caótico, principalmente porque os agentes não executam a aplicação apenas uma vez — eles fazem isso repetidamente.

Então, em determinado momento, um processo cai, mas o arquivo de configuração ainda aponta para a porta 3000. Logo depois, outro agente inicia a aplicação e encontra a porta livre, passando a utilizá-la. A partir daí, começam a surgir conflitos de portas, conflitos de processos de teste, conflitos de banco de dados e outros problemas semelhantes.

Foi nesse momento que eu quis simplificar todo esse processo. Então, organizei os meus scripts de uma forma que me permitisse trabalhar em paralelo com mais controle. Provavelmente, se você é especialista em Next.js, pode existir uma solução melhor do que a minha. Mas, na prática, trabalhar com *Worktrees* compartilhando o mesmo ambiente — principalmente sem usar Docker — torna esse cenário ainda mais complexo.

Outra questão importante é que eu preciso documentar tudo isso no meu `cloud.md` ou no meu `agents.md`. Se eu estiver usando testes, preciso documentar como instalar o Jest e outras dependências necessárias. Então, pensei o seguinte: já que estou enfrentando esse problema e precisava de um exemplo prático, **decidi criar uma skill que me ajudasse a iniciar um projeto Next.js com o mínimo necessário**.

Ou seja, uma skill que me permita criar e configurar o ambiente de forma mais simples e padronizada. Esse é o contexto geral dessa solução. No próximo vídeo, eu vou mostrar como essa skill ficou implementada, apenas para você ter uma visão prática do resultado.
