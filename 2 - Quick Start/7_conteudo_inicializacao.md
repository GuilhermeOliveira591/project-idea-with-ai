No vídeo anterior mostrei e fizemos um passo que foi meio lento, mas acredito que consegui provar e trazer meu ponto para vocês. Agora, vamos voltar um pouco mais aos conceitos para que fique claro o que precisamos fazer e por que temos que dar tanto valor a esse arquivo.

Parece básico, mas é básico e também não é fácil. Primeira coisa que percebemos: o README ajuda. Segundo ponto que percebemos e que faz muita diferença são os scripts de inicialização. A dica número zero que dou para vocês hoje, na empresa de vocês, é: criem scripts de inicialização para subir os ambientes com um único comando. Se já tiverem isso no projeto, ótimo, documentem de qualquer forma. Se não tiverem, criem. Ainda mais hoje com IA, é cada vez mais fácil fazer esse tipo de coisa. Dá trabalho fazer esses scripts, mas vocês farão uma única vez e isso vai ajudar muito para sempre.

Uma vez que damos valor para subir o ambiente de desenvolvimento e descer o ambiente com todas as variações, ganhamos um tempo enorme. A grande questão é: o que precisamos ter nesses arquivos de inicialização para nos ajudar a ter um resultado melhor? É nesse momento que quero sentar sério com vocês para entrarmos nessa linha de raciocínio.

Um arquivo de inicialização para um agente — seja CLAUDE.md, AGENTS.md, GEMINI.md — não importa o nome. Esse arquivo usa um racional muito interessante de forma geral. O que estou colocando aqui é baseado na experiência que tenho criando muitos desses arquivos, gastando muito tempo neles, e também em diversas boas práticas, projetos que vi que seguem determinados padrões, documentações e referências.

Primeira coisa: quando o modelo vai ler, ou nós vamos ler esse arquivo, precisamos entender o que entra e o que sai. Quando você tem essa clareza, esse arquivo vai ficando cada vez mais fácil de criar, mas ainda assim é complexo mantê-lo.

O primeiro ponto é o contexto do projeto. Numa única linha que orienta o agente imediatamente sobre as tecnologias e propósitos. Exemplo: "API REST com FastAPI para autenticação de usuários". Tudo nesse arquivo deve ser o mais curto possível. Quanto menor o arquivo, melhor: menos tokens, mais chance do agente carregar. Se o arquivo for muito grande, o agente pode até ignorá-lo. O menos aqui é mais, mas também não pode ser tão pouco que faça o agente não se comportar como você quer.

Comandos frequentes também são importantes. Eles evitam que o agente adivinhe ou alucine flags inexistentes. Você precisa documentar comandos de build, testes, lint, com seus parâmetros exatos.

Guias de estilo específicos podem ser incluídos. Em vez de "formate o código corretamente", você pode especificar: "use ES modules, import sort para TypeScript, strict mode, indentação de dois espaços".

Diretórios-chave do projeto ajudam o agente a navegar de forma mais eficiente, ainda mais em monorepos. Uma árvore de diretórios ajuda a localizar as pastas rapidamente.

Orientações de workflow também são importantes: abertura de PR, code review, uso de branches, limite de escopo, verificações manuais necessárias. Tudo que um desenvolvedor faz no dia a dia em um projeto — a IA precisa saber. São as regras do jogo. A IA sabe abrir PR, mas ela abre exatamente da forma como você faz? O code review, como é feito? O que é levado em conta? Qual o padrão de branches? Como limitar o escopo do que o projeto faz? Essas orientações ajudam a IA a trabalhar programando no seu código. Isso não é o workflow geral do processo completo de desenvolvimento, mas sim os micro comportamentos que acontecem no momento em que a IA está codificando e quando pedimos algo para ela.

Observações sobre o ambiente e problemas comuns também são úteis. Por exemplo: se a porta está ocupada, pode matar a porta sem medo. Regras sobre variáveis de ambiente obrigatórias ou não.

Regras mais restritivas, normalmente de nível enterprise, como "nunca faça push na main", "revise a descrição do commit antes de enviar", "não crie testes de unidade que já estejam cobertos de integração". O workflow é a forma como os devs e a IA trabalham, mas aqui limitamos o escopo dela e indicamos quando precisamos de uma dupla verificação.

Importação de arquivos é outro ponto. Não adianta querer colocar tudo em um único arquivo. O agente pode pular, ou não vai precisar de todas as informações naquele momento. Você pode dividir o arquivo em seções menores e colocar paths de referência. Por exemplo: "quando precisar saber mais sobre Coding Style, veja esse arquivo". Esses arquivos de referência também devem ser específicos e menores. Existem outros tipos de arquivos que a IA vai inferir durante o processo de desenvolvimento através de recursos como Skills — falaremos sobre Skills em outro momento.

Sei que este vídeo ficou grande. No próximo vídeo, vamos falar sobre o que não devemos colocar nesse arquivo. 

 