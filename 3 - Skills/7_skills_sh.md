# Skills.sh

Um outro recurso que eu recomendo muito que vocês conheçam é este projeto aqui. Esse projeto se chama **skills.sh**. Ele está muito ligado, principalmente, ao pessoal da Vercel. Então, a ideia é ter uma ferramenta que ajuda a gerenciar skills. Ou seja, é um diretório de skills, onde você pode, por meio de um comando, instalar skills no seu computador, independentemente da IDE ou do agente.

Então, se você observar aqui, existem integrações com **Cursor, Claude, AntiGravity, GitHub Copilot, Codex** e várias outras ferramentas. A ideia principal é entender como essas skills podem ser aplicadas nesses ambientes. É interessante porque existe toda uma iniciativa em torno disso. E o que considero mais relevante é que existe uma skill que você pode utilizar diretamente por comando para buscar outras skills, chamada `findSkills`.

O que acontece aqui, se você perceber, é que eles possuem alguns *leaderboards*, ou seja, uma forma de acompanhar popularidade e uso. Eles mostram as skills em destaque nas últimas 24 horas ou as mais utilizadas. Provavelmente, quando você acessar esse conteúdo, esses números ou até o design do site podem estar diferentes. Mas o ponto mais importante aqui é o conceito.

Porque você vai perceber que existem diversas skills, e grande parte delas está relacionada ao desenvolvimento de software. Por exemplo, imagine que você queira trabalhar com boas práticas em React, especialmente em aplicações hospedadas na Vercel. Quando você clica nessa opção, ele mostra informações interessantes, como a quantidade de instalações na semana.

Além disso, ele apresenta um ponto fundamental: **quando essa skill deve ser aplicada**. Guarde bem esse conceito — *quando aplicar* — porque isso é um aspecto crítico na criação de skills. Vamos explorar isso com bastante profundidade. Então, quando a IA tende a aplicar essa skill? Quando você está criando um novo componente em React ou Next.js, desenvolvendo uma página em Next.js, implementando *data fetching* no client-side, revisando código com problemas de performance, refatorando uma aplicação em React ou Next.js, ou otimizando bundles e tempos de carregamento.

E aqui ele apresenta, basicamente, quais regras impactam o uso dessa skill, quais práticas ela vai aplicar e quais referências ela utiliza. Por exemplo: eliminar *waterfall*, reduzir *bundle size*, melhorar performance no server-side, otimizar data fetching no client-side, reduzir re-renderizações e melhorar o desempenho geral em JavaScript.

Também existe uma seção explicando *como* e *quando* usar, além de documentos que servem como referência. Esses documentos podem ser lidos pela IA durante a execução da skill, ajudando-a a aplicar as melhores práticas de forma mais consistente.

O que acontece? Isso aqui que você está vendo é uma skill, mas você vai perceber que existem skills que são grandes. E, às vezes, temos skills que são muito pequenas, que fazem com que o comportamento do agente mude apenas pelo fato de ele ter carregado esse recurso aqui. Então, este é um exemplo de skills para trabalharmos.

Vou pegar outro exemplo interessante que eu tinha visto. Perceba que você consegue ver, por exemplo, a `docx` da Anthropic que acabamos de mencionar, a *Debugging*, que também é outro repositório que vou mostrar para vocês. Mas observe algo interessante: **Test Driven Development**, ou seja, TDD.

Então, se eu clicar aqui, imagine que você quer programar e fazer com que o agente siga práticas de TDD. Quando você vai usar isso? Quando for criar uma nova feature, quando for corrigir um bug, quando for fazer um refactoring, quando houver mudança de comportamento, exceções e assim por diante.

Aqui ele apresenta as chamadas *iron laws*. Por exemplo: não escrever código de produção sem antes ter um teste falhando. Ou seja, se estou trabalhando dessa forma, não vou criar nenhum código antes de iniciar um teste que falhe. Aqui também aparecem as exceções e o conceito de *red-green-refactor* do TDD.

Ele criou um diagrama Mermaid, que não está renderizando neste momento, e explica como funciona o fluxo red-green-refactor, quais são os requisitos, como o processo ocorre e como o código evolui. Basicamente, ele está apresentando a metodologia para trabalhar com TDD.

Agora imagine que você desenvolve sua aplicação utilizando TDD, mas precisa, o tempo todo, ficar dizendo para a IA: crie o teste primeiro, depois execute o teste, verifique se ele passou, ou utilize TDD dessa forma. Isso é algo muito abrangente e, às vezes, ambíguo.

Então, o que acontece aqui é o seguinte: quando você tem uma skill com esse tipo de conteúdo — checklists, orientações sobre o que fazer quando você está travado, informações de debug, regras e procedimentos — isso aqui é, na prática, **o arquivo de uma skill**. É apenas um arquivo Markdown, para você entender.

Você pode observar que esse arquivo é o `skill.md`. Esse é o arquivo principal e mínimo necessário para existir uma skill. Então, o que estou lendo aqui não é uma descrição sobre o que é essa skill. Isso é a própria skill que estou mostrando para vocês.

Ou seja, quando o agente perceber que precisa trabalhar com TDD, ele vai carregar e ler esse arquivo Markdown. Isso aqui representa uma skill em um único arquivo. Basicamente, é esse recurso que o agente utiliza.

Agora, por exemplo, se não me engano, no caso do *React Best Practices*, existe o `skill.md`, mas também existem outras referências adicionais. Por quê? Porque esse arquivo inicial, o `skill.md`, precisa conter o resumo da skill ou a própria skill.

Mas, conforme vamos especializando cada vez mais a skill, o que acontece? Você passa a incluir conteúdos adicionais como referência, que a IA também pode ler *on-demand*, apenas quando precisar. Então, isso é um ponto importante para você entender.

Por isso, esse projeto **skills.sh** vale a pena ser explorado. Inclusive, vamos instalar uma skill relacionada a isso apenas para que você veja como é a experiência no computador e como tudo funciona na prática.

E, apenas para reforçar, provavelmente vou selecionar aqui a skill de TDD. Vou deixá-la marcada para utilizarmos. Existem várias opções: *TDD Workflow, Laravel TDD, TDD Guide, Django TDD*. Ou seja, como trabalhar com TDD utilizando Django, por exemplo.

Se você observar, existe uma grande quantidade de conteúdo relacionado a TDD, e o sistema também mostra a quantidade de instalações. Assim, você consegue acompanhar como essas skills estão sendo utilizadas.

Então, no próximo vídeo, vamos analisar outro repositório. Depois disso, vamos para a minha IDE e começar a explorar os arquivos na prática, entendendo como tudo funciona.
