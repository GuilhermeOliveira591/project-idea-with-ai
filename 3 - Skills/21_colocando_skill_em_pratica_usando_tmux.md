# Colocando Skill em Pratica usando tmux

Agora que eu acho que você entendeu mais ou menos o contexto da situação, o que acontece? Se eu chegar agora aqui no meu Cloud, na minha IDE, no meu Cursor, você vai perceber que eu tenho uma skill que eu criei chamada **Next.js Project Setup**. Você vai perceber que eu tenho aqui o meu diretório de Skills, tenho `Scripts`, `References` e `Assets` no meio da estrutura.

Qual é a minha ideia aqui? A minha ideia é fazer algo do tipo: *gostaria de fazer o setup de um novo projeto em Next.js*. Então, em tese, agora ele vai carregar a minha skill *Next.js Project Setup*. E, para prosseguir, ele vai pedir para entender o escopo do projeto. Por exemplo: o que você vai construir? Um *dashboard*, um *admin*, uma *landing page*, um *SaaS* ou um *blog*?

Eu vou responder algo como um sistema simples, em que eu precise de um *dashboard* e algumas operações mais avançadas. Ele perguntou se eu vou usar banco de dados, autenticação ou algo desse tipo, e eu nem respondi naquele momento. Em seguida, ele apresentou um plano de *setup* para mim, definindo o framework como Next.js com TypeScript, Tailwind e *App Router* na pasta `src`.

Ele também sugeriu banco de dados com **Postgres e Prisma**, autenticação opcional para adicionar depois, e scripts como `init`, `down`, `check` e `watch`, além da criação de um `Cloud.md` ao final. Eu defini um nome para o projeto, por exemplo, *Projeto Super Next*, e informei que não queria banco de dados. Vamos observar o que acontece a partir disso.

Então, ele vai criar o projeto, gerar a estrutura do Next.js e um `Cloud.md` no final. Eu confirmei e aguardei alguns instantes. Como estou executando em um ambiente *sandbox*, ele continua pedindo permissões, mas isso é esperado nesse contexto. Depois de alguns momentos, ele concluiu a criação do projeto.

Ele gerou o *Super Next Dashboard System* com **Next.js 15** e **React 19**. Poderia ter solicitado outra versão, mas aqui o objetivo era apenas demonstrar o funcionamento. Então, ele criou o diretório do projeto e instalou o Next.js, além de gerar um `Cloud.md` automaticamente.

Vamos analisar esse `Cloud.md` que ele criou. Ele definiu um *dashboard system*, colocou a *stack* tecnológica, os principais componentes, a estrutura básica do projeto, o ambiente de desenvolvimento, padrões de código, convenções de *commit* e algumas regras, como **nunca instalar pacotes sem solicitar confirmação ao usuário**. Ou seja, ele gerou um `Cloud.md` inicial para orientar o desenvolvimento.

Agora, qual é o ponto principal? Ele também explicou como eu devo executar o projeto. A partir disso, eu posso solicitar algo adicional, como: *gostaria de ter scripts de inicialização para controlar melhor o projeto*. E, nesse momento, algo interessante aconteceu. Ele começou a adaptar o ambiente com base nas instruções da skill.

Na minha skill, eu explico que posso trabalhar com scripts de inicialização. Então, ele interpretou isso corretamente e executou duas ações principais. Primeiro, criou uma pasta chamada `scripts` contendo todos os arquivos necessários para automação do ambiente. Segundo, ele atualizou o `Cloud.md` para refletir essa nova estrutura operacional.

No `Cloud.md` atualizado, ele definiu comandos como:

- `init` para instalar dependências e iniciar o servidor
- `down` para desligar o servidor de forma controlada
- `down --force` para encerrar processos órfãos
- `down --clean` para remover completamente o ambiente
- `check` para verificar o estado do sistema
- `fix` para corrigir conflitos de porta
- `watch` para monitorar processos em execução

Também incluiu suporte a **tmux** para visualizar logs e acompanhar a execução dos processos. Ou seja, ele copiou os scripts e integrou tudo ao fluxo de desenvolvimento. A partir daí, eu poderia solicitar outra funcionalidade, como suporte a testes automatizados usando **Jest**.

Nesse momento, ele passou a utilizar o script `init` para iniciar o projeto, em vez de comandos tradicionais como `npm run dev` ou `next dev`. Isso acontece porque, ao usar skills, o processo de inicialização passa a ser controlado por scripts que preparam o ambiente de forma mais robusta, especialmente quando se trabalha com múltiplos ambientes em paralelo na mesma máquina.

Ele também criou exemplos de testes automatizados, executou uma validação inicial e atualizou novamente o `Cloud.md` com a seção de *testing*, documentando como executar os testes. Agora eu tenho os scripts atualizados, o Jest configurado e uma área dedicada a testes dentro da documentação do projeto.

Se eu solicitar algo como trabalhar com Prisma e Postgres, é provável que a skill também consiga configurar esse cenário. E uma coisa é certa: você poderia fazer esse pedido diretamente para o Cloud, para o Gemini ou para o Codex, e eles provavelmente instalariam o Jest ou configurariam várias dependências automaticamente.

**A diferença agora aqui é que a skill sabe exatamente o que fazer, do jeito que eu quero que ela faça**, para resolver exatamente o problema que eu tenho, com os meus scripts, com os meus tipos de documentação, com a minha forma de configurar o Jest e com a maneira como eu estou trabalhando com Prisma. Então, agora o que ele fez? Ele configurou o Prisma e, se você olhar aqui, eu tenho o meu `env.example` com o *server port* definido.

E por que ele tem um *port range* aqui? Esse *port range* vai da porta **3000 até a 3010**, permitindo que a aplicação mude de porta automaticamente quando eu executo o `init`. Esse `init` consegue fazer verificações para evitar que diferentes agentes utilizem a mesma porta ao mesmo tempo e gerem conflitos. Eu também tenho aqui a *base URL* do Postgres configurada, além da configuração básica do Prisma.

Se eu acessar o meu `cloud.md` agora e olhar a seção de *tech stack*, ele adicionou Postgres com Prisma. E, na parte de *database*, também estão definidos Postgres e Prisma, além do *dev workflow* com comandos como `npx` e outros detalhes operacionais. Então, se você perceber, essa é uma skill para fazer o *setup* de um novo projeto. Mas não é o *setup* de qualquer projeto.

Qualquer pessoa consegue rodar um comando e iniciar um projeto Next.js? Consegue. O Next.js é muito simples de configurar. Mas fazer o *setup* do Next.js com exatamente os scripts que eu utilizo para inicialização, verificação de ambiente e uso de *tmux* para monitorar processos é algo mais específico. Essas são práticas que não vêm prontas no Next.js e refletem a forma como eu trabalho.

Eu vou dar um exemplo. Dentro dos meus scripts, existe um script chamado `setup web`, que consegue baixar diversas skills e preparar o ambiente remoto para execução de agentes, seja na Anthropic, na OpenAI, no Codex ou no Cloud Code Web. Ou seja, são configurações adicionais que refletem necessidades específicas do ambiente de desenvolvimento.

Esses são aqueles ajustes finos que normalmente você gostaria de ter em um projeto e que antes ficavam em *boilerplates*. Agora eu tenho uma skill que, conforme eu preciso, já executa as ações exatamente da forma como estou acostumado a trabalhar. Vou dar um exemplo simples. Eu posso chegar aqui e solicitar para o Cloud: *suba o ambiente*.

Mesmo rodando em *sandbox*, ele tentou iniciar o ambiente. Ele criou a estrutura necessária e iniciou a aplicação na porta **3002**, porque a porta 3000 estava ocupada. Isso resolve exatamente aqueles conflitos de porta que eu mencionei anteriormente. E, além disso, quando o `init` foi executado, o arquivo `env.local` também foi atualizado automaticamente para refletir a nova porta.

Ou seja, são pequenos detalhes operacionais, mas a aplicação já está rodando corretamente. Agora, eu posso solicitar outra ação, como criar uma sessão **tmux**. E, nesse caso, o que ele faz é iniciar uma sessão usando *tmux*, permitindo acompanhar os logs do servidor e os processos que estão em execução.

Se eu abrir o terminal e executar o comando para conectar à sessão *tmux* criada, eu consigo visualizar em tempo real tudo o que está acontecendo: logs do Next.js, processos ativos e qualquer atividade relacionada à aplicação. Isso é possível porque eu tenho scripts como `watch`, que monitoram processos, e porque configurei no `cloud.md` que, ao solicitar a criação de uma sessão *tmux*, o sistema deve iniciar automaticamente esse ambiente.

Assim, eu consigo desenvolver acompanhando os processos em execução. Isso é importante porque eu tenho vários processos rodando ao mesmo tempo, como testes com Playwright, outras sessões e tarefas agendadas. Muitas vezes, algo continua rodando em segundo plano e não fica claro o motivo. Por isso, monitorar os processos e visualizar os logs é fundamental.

É verdade que eu poderia visualizar os logs diretamente no terminal da IDE, e isso funciona normalmente. Mas eu prefiro manter meus terminais organizados usando *tmux*, com painéis separados, porque hoje eu não estou mais desenvolvendo apenas uma aplicação por vez. **Eu estou executando várias aplicações simultaneamente.**

Então, para você conseguir organizar todas as sessões funcionando em paralelo, não vai ser apenas uma IDE que vai resolver. Na maioria das vezes, eu não estou na frente da IDE. Eu fico, na realidade, monitorando e organizando as sessões, porque o agente está programando ali para mim. Quando eu coloco a mão na massa com o agente, no final das contas, é na *last mile*.

Depois que ele fez tudo, eu entro para corrigir os 5% ou 10% finais, ou coisas que ele eventualmente errou, e faço os meus ajustes. Mas, enquanto isso está acontecendo, o meu papel principal é coordenar o processo. Então, subir sessões, dividir tarefas e organizar os painéis é extremamente útil para eu saber tudo o que está acontecendo naquele momento.

Isso acaba me ajudando muito, porque iniciar um projeto fica cada vez mais simples, e isso se transforma em uma skill. Toda vez que eu preciso fazer o *setup* de um projeto, ele executa o processo exatamente da forma que eu defini, porque está utilizando a minha própria skill. E, na minha skill, se vocês quiserem analisar, eu tenho a configuração chamada *NextJS Project Setup*.

Vamos navegar nessa skill no próximo vídeo, para explorar os detalhes com mais calma, porque, caso contrário, esse vídeo ficaria muito extenso.
