# Criando nossa primeira skill

E para dizer que a gente não criou nenhuma skill aqui em conjunto, a gente vai fazer algo bem simples, mas pelo menos eu acho que vai dar para você ter uma ideia de como você pode começar a criar sua própria skill, e eu acho que as possibilidades agora são infinitas. **As skills realmente dão superpoderes para qualquer pessoa que utilize**, independentemente de ser da área de desenvolvimento.

Esse tempo atrás eu tenho trabalhado muito com **Spec Driven Development**. O Spec Driven Development ajuda você, por meio de especificações, a desenvolver seu software muito baseado nessa parte de documentação. Porém, uma das coisas que eu percebi muito durante esse desafio é que, apesar de você pedir algo para a inteligência artificial, ela vai gerar aquilo e, quando gera, às vezes múltiplos documentos ou qualquer coisa desse tipo, ela mesma acaba gerando contradições daquilo que está fazendo.

Ou, às vezes, você desenvolveu uma feature, está trabalhando em um código e realmente acha que pode ter um furo ali naquele código, alguma coisa em que você tinha uma determinada intenção e, no final das contas, estava fazendo outra coisa. Então, o que eu resolvi fazer? **Eu criei uma skill de validação.** E essa skill de validação, basicamente, o que ela faz? Quando eu peço para ela validar o que eu estou fazendo, ela simplesmente lê os arquivos em que eu estou trabalhando e, com base nisso, faz uma análise do que pode estar inconsistente.

Então, eu queria compartilhar isso com vocês, mas, para a gente fazer isso juntos, eu não vou usar necessariamente a minha skill ou o meu prompt do jeito que está, porque eu quero que a gente consiga trabalhar em conjunto. Então, a nossa ideia da skill que a gente vai fazer aqui é uma skill que vai validar inconsistências gerais dentro do *codebase* e das *docs* dos nossos projetos. No final das contas, eu acabei utilizando essa skill para tudo na minha vida, para falar a verdade, mas eu acho que vale a pena você ter essa experiência. É algo bem simples que a gente vai fazer, mas vai valer a pena.

Esse é o nosso primeiro ponto que a gente vai criar aqui, e a gente vai testar e ver isso funcionando. Uma outra skill que nós vamos criar, na realidade, não é que nós vamos criar, é que eu já criei, mas eu vou explicar passo a passo. É basicamente fazer o *setup* de uma aplicação usando o **Next.js**, e eu vou explicar o porquê de essa skill existir. Mas vamos focar aqui primeiramente nesse ponto de validar as inconsistências.

O primeiro passo que você pode ter para começar a fazer uma skill é o seguinte: você tem a opção mais simples possível, que é criar um arquivo chamado `skill.md`, colocá-lo dentro de uma pasta e disponibilizá-lo dentro da sua `.cloud` ou da sua `.agents`. Não importa qual é a plataforma que você está utilizando. O ponto é que ela tem que fazer parte dessa estrutura básica de como as skills funcionam.

O que acontece no meio dessa história? Eu, aqui, somente para a gente não gastar tempo e eu ficar escrevendo um português muito feio na frente de vocês, basicamente, a minha ideia é que eu desejo que a minha skill busque por **contradições**. Por exemplo, o código faz X, mas a especificação diz que faz Y. Aí eu quero que ela identifique **ambiguidades** com termos vagos, critérios indefinidos ou múltiplas interpretações possíveis.

Então, vou colocar aqui somente para a gente ter um prompt básico para criar essa nossa skill. A ideia é ter uma skill que vai buscar **lacunas lógicas**, especialmente em explicações passo a passo, que apresentem um buraco no meio do raciocínio. Ou seja, a ideia é identificar falhas, inconsistências ou furos naquilo que foi construído.

**Como eu crio uma nova skill?** Bom, a primeira coisa que eu posso fazer é, por exemplo, se eu estou usando o Cloud Code, posso acessar a minha pasta `skills`, criar uma pasta com o nome da skill, criar um arquivo chamado `skill.md`, adicionar o *front matter* com as descrições da minha skill, e ela já estará criada e funcionando.

Por outro lado, existem formas, ou templates, que tornam mais fácil criar uma skill. Um desses templates é baseado em uma skill chamada **Skill Creator**, que foi criada pela Anthropic. E eu falo bastante da Anthropic porque foi a empresa que criou o conceito de *Agents Skills* da forma como a gente conhece hoje e que acabou se tornando um padrão aberto.

Como funciona isso? Se eu voltar aqui, lembra que a gente deu uma olhada no *Agents Skill Directory*, que é da **Vercel Labs**? Existe uma forma de instalar facilmente skills utilizando esse recurso. E, na realidade, eu não estou aqui para ficar dizendo qual ferramenta você deve usar para instalar determinadas skills. Existem diversas opções no mercado, ou, inclusive, se você quiser, pode clonar o repositório e utilizar diretamente.

Mas, basicamente, você pode executar um `npm install skills` ou utilizar o comando `npx skills init` para começar a criar suas skills. E também existe essa skill que a Anthropic disponibiliza chamada *Skill Creator*.

Essa skill aqui, basicamente, é bem simples. **Ela vai ensinar e ajudar você a criar uma skill.** Então, essa é uma skill que ajuda você a criar uma skill. Ela tem todos esses detalhes, todos os padrões, os processos e as *guidelines*. Ou seja, basicamente, é um manual de como se cria uma skill.

Ela fornece um script em Python para conseguir trabalhar e tudo mais. A nossa ideia é instalar essa skill para que a gente possa utilizá-la no nosso projeto. Então, o que eu vou fazer? Eu vou copiar aqui e vou chegar aqui na minha IDE. Nesse caso, eu vou abrir um terminal e colar aqui o comando `skill add`, vou passar a URL, vou passar o nome da skill que eu vou colocar, e ele vai instalar aqui para mim.

Ele vai perguntar onde você quer instalar a sua skill. Vou escolher o Cloud Code aqui para mim, e por padrão ele já está selecionando o Codex do Gemini, CLI etc., que ele já tem aqui configurado. Eu vou informar que quero fazer isso no meu Cloud Code. Quando eu fizer isso no meu Cloud Code, eu vou ter duas opções.

Uma opção é **global**. O que isso significa? Significa que ele vai instalar essa minha skill na minha pasta `home` do usuário. Ou seja, vai funcionar para todos os projetos que eu tenha no meu computador usando o Cloud Code. Se eu colocar `global`, é isso. Se eu colocar `project`, significa que essa skill vai ser criada dentro da pasta `skills` do meu projeto.

Eu vou colocar em `project` aqui para a gente. Então, eu vou dar Enter, e aqui ele pergunta se você quer realmente copiar a skill ou se você quer simplesmente criar um **link simbólico**. E toda vez que eu fizer um *update* da skill, isso vai ser atualizado em qualquer lugar que eu esteja usando essa skill. Então, o link simbólico faz bastante sentido aqui. Eu vou dar Enter.

Você quer instalar? Eu vou confirmar a instalação. E pronto, instalou a minha skill. Então, se eu for agora aqui no meu `.cloud` e depois em `Skills`, você vai ver que eu tenho o *Skill Creator* disponível. E eu também tenho um `.agents`, que é um *Skill Creator* que ele acabou criando, porque eu pedi para instalar no Codex também. Então, o Codex tem uma pasta `.agents` ali.

> **Dica:** Sempre que você tiver um arquivo `Cloud.md`, faça um link simbólico de um `Cloud.md` para um `Agents.md`, porque, quando você muda em um, muda em todos. Eu gostaria muito que a Anthropic utilizasse apenas `Agents.md` ao invés de `Cloud.md`, para todo mundo ficar dentro da mesma convenção, usando somente `Agents.md`.

Quem sabe, no momento em que você estiver assistindo a este vídeo, isso já tenha acontecido. Mas, por enquanto, não existe nenhuma movimentação da Anthropic, pelo que eu tenha observado. Bom, agora eu tenho a minha skill criada. Como eu consigo ver isso primeiro? A primeira coisa é acessar o meu *Skill Creator* e abrir a skill que a Anthropic criou, que serve como guia para criar uma skill efetiva.

A skill deve fazer isso, isso e aquilo etc. Então, basicamente, tem toda a especificação, aquilo que a gente viu lá no diretório de Skills. Está tudo aqui. Ele também tem **referências**, ou seja, como ele espera que a skill seja gerada. Aqui tem o *workflow* que deve ser seguido, um exemplo, e também **scripts**.

Então, ele vai executar um `initSkill`, tem um `package skill`, porque ele compacta tudo e gera um arquivo `.skill` para você poder distribuir, e também tem um `validate`, que verifica se a skill está correta. Então, observe que, mesmo quando a gente analisa uma skill de outra pessoa, é possível perceber o nível de flexibilidade que você tem ao utilizar uma skill no seu computador ou na sua aplicação.

Porque você consegue definir instruções, pedir para executar scripts e realizar diversas ações. E esse *Skill Creator* vai nos ajudar com isso.

O que eu vou fazer aqui neste momento? Eu vou fechar esse monte de arquivos, para a gente não bagunçar, e vou abrir aqui o meu Cloud Code. Meu Cloud Code abriu, e o que eu vou fazer? No caso do Cloud Code, vai depender muito de qual é o seu editor, mas isso é indiferente, porque cada agente de desenvolvimento, cada sistema, o próprio Cursor, o próprio Codex etc., todos podem ter esse *Skill Creator* que vai acabar fazendo a mesma coisa. Por isso que é importante você entender que isso é independente do Cloud Code.

No Cloud Code, o que eu posso fazer? Eu posso digitar aqui `Skills`. E, se eu digitar `Skills`, eu consigo ver todas as skills que eu tenho no meu computador. Então, eu consigo ver *plugin skills*, ou seja, skills que fazem parte de plugins que estão instalados. Isso aqui é uma coisa específica do Cloud. Agora, eu tenho *user skills*. O que significa? São skills que estão na minha pasta de usuário, que são skills **globais**. Elas estão sempre habilitadas aqui para mim.

E eu tenho as *project skills*, onde eu tenho o meu *Skill Creator*, que é o que a gente acabou de instalar, e também a do nosso projeto com Next.js, que eu vou mostrar em outra ocasião. Então, uma vez que eu sei que o meu *Skill Creator* está aqui, o que eu posso fazer? Eu posso trabalhar de duas formas. Uma forma é escrever para o Cloud Code que eu gostaria de criar uma skill.

Por que eu faço isso? Porque, se eu olhar o *front matter* dessa minha skill, olha o que está escrito ali. A descrição é um guia para criar uma skill efetiva. Essa skill pode ser usada quando usuários querem criar uma nova skill ou atualizar uma skill que possa estender as capacidades do Cloud Code com conhecimentos específicos, *workflows* ou integrações de ferramenta. Então, esse *front matter* pode fazer com que, quando eu digite para o Cloud Code que eu quero criar uma skill, ele tente carregar essa skill para fazer a criação da skill para a gente.

E isso é um ponto importante. O que eu vou fazer é o seguinte: eu gostaria de criar uma skill, e vou colar essa configuração aqui. Vamos ver como o Cloud Code se sai, se ele consegue fazer o *trigger* dessa skill. Então, vamos observar. Ele vai rodar. E olha só o que aconteceu: a gente já viu que ele carregou o *Skill Creator*. Ou seja, ele conseguiu identificar no *front matter* que existe a necessidade de criar uma nova skill. Eu tive a necessidade de criar uma skill, ele carregou a skill e agora vai começar a trabalhar.

E daí ele começa a perguntar: essa skill vai ser usada principalmente para revisar que tipo de conteúdo? Documentos técnicos, código, especificação ou qualquer texto. Eu vou colocar as três opções aqui para ele. E também vou adicionar uma outra opção, que é mudanças de documentos que ainda não estão commitadas. Por que eu estou dizendo isso? Porque, eventualmente, você fez uma alteração e o seu código ainda está *staged*, mas não foi commitado no Git.

Eventualmente, eu posso pedir para ela fazer a comparação de como o meu código estava antes, ou como o meu conteúdo estava antes, com o que está agora, e ela também utilizar isso como uma informação adicional. Vou dar Enter aqui. E, em seguida, ele pergunta sobre o *trigger*: como você imagina ativar essa skill? Por exemplo, frases como *revise esse documento*, *encontre problemas* ou *compare o código com esses arquivos*.

E eu vou colocar algo como: busque por contradições, ambiguidades ou qualquer coisa que gere inconsistência entre os arquivos. Provavelmente ele está fazendo essa pergunta porque esse *trigger* é o que vai definir como ele vai criar o *front matter*, que vai conter a *description*. Esse é o momento mais importante da skill para o agente poder escolhê-la quando essas palavras aparecerem. Então, basicamente, essas são as minhas respostas. Eu vou enviar e vamos ver o que ele consegue fazer aqui para a gente.

Ele informou que tem uma boa visão do escopo, está tentando criar alguns componentes, e aí ele não tem permissão, porque eu estou rodando dentro de uma *sandbox*. Então, eu vou permitir para ele não perguntar novamente. Ainda estou rodando sem o meu `Cloud.md` e sem os *settings* com todos os parâmetros liberados, porque estou dentro de uma *sandbox*. Vamos aguardar alguns instantes para ver como essa skill vai ser gerada.

Olha só: ele já trouxe o resultado aqui e está conectado com o meu editor. Ele também está informando que eu posso sempre permitir que ele utilize esses recursos nesta sessão. Eu confirmei que sim, que ele pode editar os arquivos. Ele vai perguntar isso com frequência porque eu não tenho todas as permissões configuradas. Agora, provavelmente ele está fazendo o *packaging*, executando aqueles scripts em Python para gerar a nossa skill.

Em tese, a nossa skill foi criada. Eu não vou deixar esse vídeo muito longo, então vou encerrar por aqui e a gente continua depois para analisar a skill com mais detalhes.
