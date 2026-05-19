# Conditional details

A gente parou naquela parte de *Domain Specific Organization*, em relação ao *Progressive Disclosure*, e aqui temos um outro formato, um outro padrão chamado **Conditional Details**. Ou seja, é quando você consegue definir condições claras para que a IA faça leituras de arquivos ou tome algum tipo de decisão específica.

Vou dar um exemplo. Eu tenho, internamente, uma ferramenta com diversos *workflows* para fazer análise de nível de maturidade de código. Então, quando a IA precisa tomar uma decisão sobre rodar alguma ferramenta ou fazer uma análise de *codebase*, eu crio algumas categorias. Por exemplo, se o nível de maturidade do sistema é **Greenfield**, que significa um projeto novo, ou **Emerging**, quando ele tem poucos componentes, ou **Established**, quando já possui mais estrutura e padrões definidos, ou ainda **Mature**, quando é um sistema consolidado.

Nesse contexto, eu posso definir métodos de detecção baseados em exploração da *codebase* ou em análise arquitetural. Posso verificar a contagem de componentes, o nível médio de acoplamento, o grau de integração e, a partir disso, aplicar uma classificação lógica. É exatamente aqui que entram os *Conditional Details*, porque eu passo a trabalhar com **condições explícitas** para determinar o comportamento da skill.

Por exemplo, se não houver código ou o número de componentes for zero, o nível de maturidade é *Greenfield*. Caso contrário, pode ser *Emerging*, depois *Established* e, por fim, *Mature*. Uma vez que esse resultado é obtido, eu direciono o agente para documentos específicos, como `greenfield.md`, `emerging.md`, `established.md` ou `mature.md`. Dessa forma, a skill passa a tomar decisões baseadas em condições bem definidas.

Quando você começa a estruturar as coisas dessa forma, percebe que existem diferentes modelos de organização. Você pode ter uma skill de alto nível que trata um único assunto e fornece referências detalhadas. Pode ter uma skill que atua como um *roteador* entre vários domínios. Ou pode ter uma skill baseada em condições, onde o agente decide o caminho a seguir com base em regras específicas. Essas são três formas claras de trabalhar com skills no dia a dia.

Uma dica importante é a seguinte: quando a sua skill começa a crescer e se aproxima de **500 linhas**, vale a pena criar uma *Table of Contents*, ou seja, um sumário. Esse sumário funciona como um índice que organiza o conteúdo por seções. Assim, quando o agente precisa de um tópico específico, como *Greenfield Projects*, ele pode acessar diretamente aquela parte sem precisar processar todo o restante do arquivo.

Isso é especialmente útil quando você tem referências extensas, como documentação de APIs, regras de negócio ou fluxos de autenticação. Quanto mais clara for a visão geral do conteúdo da skill, mais fácil será para a IA identificar onde está a informação relevante e carregar apenas o necessário. Essa organização melhora a eficiência e reduz o consumo desnecessário de tokens.

No final das contas, existe uma tendência clara de evolução nesse cenário. O custo de tokens tende a diminuir ao longo do tempo, mas ainda assim é frustrante iniciar uma sessão com uma parte significativa da janela de contexto já consumida. Da mesma forma, quando uma skill contém informação excessiva e mal organizada, o agente pode se confundir ou tentar ler tudo de uma vez. Por isso, essas técnicas de estruturação fazem muita diferença na prática.

Outra prática importante é ajudar a IA a entender **como deve conduzir o trabalho depois que a skill é carregada**. Ou seja, não basta apenas fornecer conteúdo; é necessário orientar o fluxo de uso. Esse é um aspecto fundamental para garantir consistência e previsibilidade no comportamento do agente durante o desenvolvimento.
