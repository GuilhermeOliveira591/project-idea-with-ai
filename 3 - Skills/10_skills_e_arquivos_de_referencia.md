# Skills e arquivos de referência

Agora que falamos um pouco sobre o *front matter*, aqui basicamente temos o conteúdo relacionado à própria skill. É isso que vai guiar o comportamento e é isso que vamos analisar. Se você observar, basicamente é um prompt. Ou seja, estou olhando aqui e vejo um prompt que define como a IA vai trabalhar.

Algumas dicas importantes em relação a essa parte da skill são as seguintes. Se você observar, é altamente recomendável manter o arquivo `skill.md` o menor possível. Normalmente, a recomendação é que esse arquivo tenha **menos de 500 linhas**. Raramente você verá um arquivo `skill.md` com mais de 500 linhas e, se conseguir manter em torno de 300 linhas, ainda melhor. Quanto menos conteúdo o agente precisar carregar, melhor será o desempenho.

Agora vamos observar a parte de **referência**, porque isso também é muito importante. Vou pegar aqui uma skill de *MCP Builder*. E por que esse caso muda um pouco de cenário? Observe a descrição: é um guia para criação de MCPs de alta qualidade, ajudando LLMs a interagirem com o mundo externo. Use quando você estiver criando um servidor MCP, integrando APIs externas, independentemente de ser em Python utilizando *FastMCP*, ou em Node/TypeScript utilizando o *MCP SDK*.

Esse foi o front matter. Agora observe o ponto mais relevante: aqui está o conteúdo da skill. Ele define um processo, ou seja, um *high-level workflow*. Primeiro, realizar uma pesquisa profunda e entender como funciona a forma moderna de criação de um MCP. Depois, avaliar se o objetivo é cobrir uma API ou executar um workflow. Em seguida, pensar em nomes de ferramentas e *discoverability*, ou seja, na forma como as ferramentas serão chamadas e organizadas.

Depois disso, vem o estudo do protocolo e da documentação, seguido do estudo da documentação do framework que será utilizado. Essa é a **fase 1**, que corresponde ao planejamento. A seguir, entramos na **fase 2**, que é a implementação. Nessa etapa, deve-se preparar a estrutura do projeto e consultar os guias específicos da linguagem.

Aqui surge um ponto importante. Dentro da skill, existe uma pasta chamada `Reference`. Dentro dessa pasta, existem outros arquivos mais especializados que ajudam a construir o MCP. Quando a skill suporta múltiplas linguagens, por exemplo Python e TypeScript, ela orienta: se o projeto for em Python, utilize determinado guia; se for em TypeScript, utilize outro.

Um detalhe interessante é que **a IA lê apenas os arquivos que fazem sentido para o contexto**. Se o projeto for em TypeScript, ela abre o guia de TypeScript e não precisa abrir o guia de Python. Isso também gera economia de tokens, porque evita carregar conteúdo desnecessário.

Nesse guia de referência, você encontra instruções como inicialização do servidor, registro de ferramentas, convenções de nomes, estrutura do projeto e implementação de ferramentas. Quando você observa esse Markdown, percebe que ele pode ser bastante extenso. Em alguns casos, pode chegar a cerca de **900 linhas**, incluindo uma *checklist* de qualidade ao final.

Essa checklist significa que, após a implementação, você deve verificar se todas as etapas foram cumpridas corretamente. Esse tipo de estrutura é extremamente útil, porque você está guiando a IA e ela só carrega essas informações quando realmente precisa. Assim, o fluxo pode incluir implementação de tarefas, definição de schemas, anotações e, depois, a **fase 3**, que corresponde ao *review*.

Nessa etapa, entram verificação de qualidade de código, *build* e testes. Em projetos com TypeScript, por exemplo, pode ser necessário executar `run build`. Em projetos com Python, pode haver comandos específicos de compilação ou execução. Observe que existe uma distinção entre níveis de detalhe: algumas instruções são de alto nível, enquanto outras são mais específicas.

Isso acontece porque, em muitos casos, apenas a leitura do arquivo `skill.md` já é suficiente para resolver o problema. Mas, quando a situação exige maior profundidade, a IA passa a consultar os arquivos de referência. Por isso, no `skill.md`, você pode repetir alguns conceitos presentes nas referências, porém de forma resumida, contendo apenas o essencial para orientar rapidamente a execução.

Outro ponto importante é que, após a implementação, existe uma **fase 4**, que corresponde à *evaluation*. Ou seja, verificar se a solução realmente está funcionando conforme esperado.

Então, entenda o propósito. Crie dez questões de evaluation. Quais são os *requirements*, os requisitos? Como deve ser o formato do output dessa evaluation? Se você observar, existe um *Evaluation Guide*, que é mais um arquivo de referência. Esse guia explica como funciona o processo de avaliação.

Por exemplo, criar dez questões em linguagem natural que um humano consiga entender. Essas questões devem ser *read-only*, independentes e não destrutivas. Para cada questão, será necessário utilizar diversas chamadas e *tool calls* do MCP. Algumas podem ser simples, outras mais complexas, mas precisam ser estáveis, ou seja, não devem mudar. E o formato deve seguir um padrão específico, com propósito, guidelines, nível de complexidade e critérios de verificação das respostas.

Por que isso acontece? Isso não é uma aula sobre MCP, mas quando você trabalha com **Model Context Protocol**, existem processos definidos. Na hora de fazer uma chamada, o cliente precisa identificar quais ferramentas estão disponíveis. Depois, com base na solicitação, ele pode chamar múltiplas ferramentas dentro do MCP. E, ao final, é necessário garantir que o formato de resposta seja aceitável para que o sistema consiga processar corretamente.

Essa parte de *evaluation* define todas as regras de como testar o servidor MCP de forma consistente e garantir que o processo funcione corretamente. Inclusive, é assim que você verifica se o seu servidor MCP está operando como esperado. Também existe um padrão de arquivo que define como essa avaliação deve ser estruturada, além de exemplos de evaluation, como pares de *Question* e *Answer*, geralmente em Python.

Quando você tem esses elementos, o sistema executa as perguntas, chama o MCP e verifica os resultados. Existe todo um processo de verificação: como criar as perguntas, como executar as evaluations, como fazer o *setup*, configurar scripts em Python, definir a API key, estabelecer o formato e executar o fluxo completo. Todos esses detalhes estão descritos para orientar a execução correta.

Agora, perceba um ponto importante: esse guia é lido pela IA. Quando ela estiver construindo um servidor MCP, entrará na etapa de evaluation, que apresenta apenas uma visão geral dos passos. Já o *Evaluation Guide* traz o detalhamento completo de cada etapa. A ideia é que a IA consiga seguir esse processo até finalizar a construção do servidor.

Outro ponto relevante é que isso não é um agente de IA por si só. Se você criasse um agente específico para construir um servidor MCP, poderia utilizar exatamente esses mesmos prompts. A diferença é que **esses prompts são carregados apenas quando necessários**. Por exemplo, em uma ferramenta como Claude Code, você pode chamar essa skill por meio de um comando.

Isso significa que você pode executar um comando como: criar um MCP para se comunicar com uma determinada API. A partir daí, o sistema seguirá todas as etapas definidas na skill para realizar a criação. Ou seja, você pode chamar essa skill manualmente por comando, ou o agente pode acioná-la automaticamente durante a execução.

Agora surge outro ponto interessante: ao criar uma skill, além do arquivo `skill.md` e dos arquivos de referência, **você também pode ter scripts**. Por exemplo, já existem scripts preparados para executar a evaluation. O agente cria as dez perguntas de avaliação, utiliza esses scripts, conecta ao servidor MCP, executa a avaliação e gera um arquivo com as perguntas no formato definido.

Esse formato existe porque outro componente precisa ler esse arquivo e executar a verificação. Também existem arquivos de *requirements*, geralmente em `.txt`, que definem as dependências necessárias, como bibliotecas Python. Isso mostra que **uma skill não é apenas um arquivo Markdown**.

Uma skill pode ser composta por um `skill.md`, referências adicionais e scripts executáveis que a IA utiliza para realizar determinadas etapas. Por exemplo, na fase de evaluation, a IA identifica os scripts, executa o processo, gera o arquivo de perguntas e verifica se tudo passou no *checklist* de qualidade de código.

Esse ponto muda completamente a forma de trabalhar. Muitas pessoas pensam que uma skill é apenas um texto, mas ela pode ir muito além disso. Você pode permitir que a IA execute scripts automaticamente para garantir que as tarefas estejam sendo realizadas corretamente.

Por exemplo, em uma skill relacionada a PDF, o sistema pode incluir operações como leitura, extração de dados, manipulação de tabelas, divisão de arquivos, rotação de páginas e combinação de múltiplos documentos. O `skill.md` traz as operações básicas, normalmente com algumas centenas de linhas. Já os processos avançados ficam em arquivos de referência adicionais.

Nesses casos, podem existir diversos scripts prontos para lidar com formulários, extração de campos ou outras operações específicas. Assim, a IA não precisa criar soluções do zero. Ela simplesmente utiliza os scripts disponíveis dentro da skill.

Isso fornece verdadeiros **superpoderes** ao agente, porque a skill não faz parte do código do seu projeto. Você não precisa necessariamente versionar essa skill junto com o repositório. Ela pode ser instalada no projeto, no usuário ou diretamente na ferramenta que você utiliza.

O ponto central é que a skill eleva o nível de capacidade da IA, pois reúne tudo o que ela precisa para resolver um determinado tipo de problema. E uma das possibilidades mais poderosas é criar seus próprios scripts, porque isso realmente leva o uso de IA para um outro patamar.
