# Criando servidor MCP com Skill

O que vamos fazer agora? Vamos desenvolver um servidor MCP utilizando uma skill que já existe no guia oficial da Anthropic. Para você entender, no meu Claude Code eu tenho algumas skills disponíveis, e uma delas é o **MCP Builder**. Como coloquei essa skill aqui? Basicamente, peguei aquele clone dos repositórios que mostrei anteriormente, acessei a pasta `Skills` e copiei a pasta `mcpbuilder` para dentro da pasta `.claude/skills`. Foi literalmente um copiar e colar.

Se você observar, ela está consumindo, neste momento, **72 tokens** de descrição, porque o sistema leu apenas o *front matter*. Isso já ajuda na gestão da janela de contexto. Então, qual será o servidor MCP que vamos criar? Vamos desenvolver um servidor MCP em **TypeScript**, onde, dentro de uma pasta chamada `Guides`, vamos armazenar guias de linguagens de programação com boas práticas de desenvolvimento.

Eu defini que esse servidor será capaz de localizar e listar guias disponíveis, realizar buscas dentro do conteúdo desses guias, responder perguntas específicas sobre uma linguagem com base nesses conteúdos e executar uma *evaluation* de qualidade para garantir que o servidor esteja funcionando corretamente. Basicamente, esse foi o prompt que utilizei. A ideia aqui é executar um *one-shot prompt* e observar o Claude Code carregando a skill automaticamente.

Outro ponto importante que quero destacar é o seguinte: estou utilizando o modelo **Haiku**, que é o modelo mais rápido disponível, mas também o que tem menor capacidade de raciocínio em comparação com modelos como Opus ou Sonnet. A intenção aqui é usar um modelo mais rápido e verificar como a presença da skill melhora o resultado.

Então, enviei o prompt e a primeira coisa que precisamos observar é se a skill foi carregada. E aqui está o ponto principal: **a skill MCP Builder foi carregada automaticamente**. Nesse momento, o sistema entrou em modo de planejamento e passou a ter uma compreensão mais estruturada sobre como desenvolver um servidor MCP.

Ou seja, a skill foi ativada exatamente quando houve necessidade. Isso demonstra como a definição correta do front matter e do contexto permite que o agente utilize a skill de forma automática. Agora, o próximo passo é observar como ele cria o plano de implementação.

Ele começou a estruturar o plano e trouxe os principais elementos: o contexto do projeto, a criação do servidor MCP, as considerações técnicas e a organização do código. O servidor será criado dentro de uma pasta `guides`, e não na raiz do projeto. Também serão utilizadas boas práticas de TypeScript, seguindo o padrão do SDK, além de incluir um mecanismo de *evaluation* para testar a efetividade do sistema.

O plano foi dividido em fases. Na primeira fase, ele define o ambiente e as dependências. Na segunda fase, implementa as *tools* do MCP, como:

- *List Available Guides*
- *Get Guide Content*
- *Guide Query*

Essas ferramentas permitem consultar os guias e responder perguntas baseadas no conteúdo. Também foram definidos padrões de tratamento de erro, configuração do ambiente e processos de *build* e *test*.

Um ponto interessante é a definição dos critérios de *evaluation*. Ele indicou que irá criar **10 perguntas** para testar a efetividade do servidor, seguindo regras específicas:

- As perguntas devem ser *read-only*
- Não podem ser destrutivas
- Devem seguir um formato padronizado

Isso corresponde exatamente ao processo de avaliação descrito anteriormente, onde o sistema gera um arquivo de evaluation para validar o comportamento do servidor.

Se você observar, todo o planejamento segue uma lógica clara: criar o servidor, implementar as ferramentas, executar os testes e validar o resultado com uma evaluation estruturada. Esse fluxo demonstra como a skill orienta o comportamento do agente desde o planejamento até a verificação final.

E aqui fica evidente o impacto prático: **a presença da skill mudou completamente a forma como o agente organizou o trabalho**.

Porque não foi apenas o fato de ele ter criado o planejamento, porque planejamento ele cria mesmo. É só você colocar em modo *planning*. Mas o interessante é observar como ele seguiu a estrutura e a ideia de como iria trabalhar para fazer o desenvolvimento do servidor, principalmente porque ele leu a skill. E dá para perceber que ele leu, inclusive, a parte de *evaluation*, porque esses detalhes que ele colocou não estavam somente naquele `skill.md`, estavam dentro dos arquivos de referência. Então, deu para perceber que ele foi mais fundo na hora em que carregou.

Vamos deixar ele processando aqui. Eu vou dar uma pausa para esse vídeo não ficar muito grande. Agora, ele criou a maioria dos arquivos e está informando que o *build* foi concluído. **Três minutos** rodando, apenas para termos uma referência de tempo de execução aqui para ele trabalhar. Então, vamos lá. O modelo adora criar documentação. Você faz uma pergunta, ele gera um documento; faz outra pergunta, ele gera outro documento. Mas, pelo menos, ele entrou em modo plan, então ficou mais fácil, porque ele já tinha um planejamento do que precisava criar.

Agora ele vai verificar as *evaluations*, aquele XML que queríamos para ele testar. E o mais interessante de tudo isso é que agora ele consegue executar, inclusive, o script responsável por realizar aquela evaluation. Então, vamos aguardar a execução dessa etapa. Agora ele concluiu corretamente e informou que irá gerar um documento final mostrando como testar o servidor MCP, o *Model Context Protocol*.

Vamos aguardar. Foram aproximadamente quatro minutos de execução. Ele criou o documento de *testing*, mostrando como criar esse recurso e gerar um sumário final. Está executando o build novamente. Perfeito. Mais um guia de referência, mais um documento criado. Isso geralmente é apenas uma questão de ajustar isso no `cloud.md` para evitar a geração excessiva de documentos. Agora ele vai gerar mais um sumário final com tudo o que foi feito.

Provavelmente, uma parte significativa dos tokens consumidos foi utilizada para gerar esses sumários e documentações adicionais. Vamos continuar. Concluído. Agora ele criou um documento final mostrando a estrutura dos arquivos. O servidor está pronto para uso em produção e com testes abrangentes, incluindo 10 questões de *evaluation*. Para executar, basta rodar o build e iniciar o serviço.

É bem interessante observar esse tipo de resultado, principalmente nessa velocidade e utilizando um modelo considerado mais simples em comparação com outros modelos disponíveis. Além disso, o modo de raciocínio avançado estava desativado. Mesmo assim, utilizamos cerca de **50% da janela de contexto**, a skill foi carregada corretamente e ele conseguiu executar exatamente aquilo que era esperado.

O ponto mais relevante é que **ele seguiu fielmente o que estava definido naquela skill**. Ele executou os scripts, utilizou os recursos necessários e construiu o servidor com base nas instruções fornecidas. Então, uma reflexão importante é a seguinte: muitas vezes você pode ter um projeto sem skill ou sem uma definição clara e, mesmo utilizando o melhor modelo, esse modelo pode demorar mais, ter maior chance de erro e não entregar exatamente no formato desejado.

Por outro lado, quando existe uma skill bem construída, você pode utilizar um modelo mais rápido, mais econômico e até sem modo de raciocínio avançado. Esse modelo vai carregar a skill, que funciona como uma espécie de guia estruturado, executar as tarefas com mais velocidade e, muitas vezes, entregar com a mesma qualidade. Depois disso, naturalmente, você fará o *code review*, mas normalmente o resultado já chega com um nível muito bom de consistência.

Ele criou aqui um servidor MCP simples e colocou esse recurso para rodar com sucesso. Isso mostra, na prática, o quanto uma skill pode transformar a forma como o desenvolvimento acontece dentro de um projeto ou de uma empresa. Muitas vezes, padrões de desenvolvimento, processos de inicialização de projeto, regras de qualidade ou fluxos internos podem ser transformados em skills. E isso realmente faz diferença no dia a dia.
