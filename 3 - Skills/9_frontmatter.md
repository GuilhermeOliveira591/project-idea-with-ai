# Frontmatter

Agora estou com a tela do meu computador, e vou explicar como será a nossa dinâmica para que possamos testar e fazer com que as skills funcionem. Então, o que eu fiz? Quero realizar algumas demonstrações, apresentar exemplos dos tipos de skills que existem e fazer algumas comparações importantes.

Para isso, clonei o repositório oficial da Anthropic, onde estão as skills, e também o repositório oficial da Vercel, para termos acesso às skills deles aqui. Além disso, tenho aqui as skills que utilizo, para analisarmos skills personalizadas, e também vamos criar uma skill juntos. Então, vamos lá.

A skill que estou usando agora é o **Skill Creator**, mas quero abrir outra skill apenas para termos mais informações. Vou selecionar uma skill específica. Vou pegar uma skill de *Web App Testing*. Esse exemplo será melhor para começarmos, porque é uma skill simples e facilita o entendimento inicial.

Então, existe um conceito que você vai ouvir cada vez mais: **front matter**. Sempre que alguém mencionar *front matter*, saiba que estamos falando dessa parte que fica no cabeçalho da sua skill, do seu agente ou do seu comando. Ou seja, trata-se de *metadata* em formato YAML. Portanto, quando se fala em front matter, estamos nos referindo a esse cabeçalho.

E por que quero enfatizar esse cabeçalho? Porque existem duas coisas fundamentais em uma skill. A primeira é que a skill seja útil e cumpra aquilo que promete, ou seja, que funcione quando for utilizada. Porém, **uma das partes mais importantes de uma skill é justamente o front matter**.

Estou dizendo isso porque o agente carrega a skill *on-demand*, ou seja, ele não lê todas as skills, pois isso consumiria toda a janela de contexto. Então, como ele decide chamar uma skill? Ele lê a **descrição** de todas as skills disponíveis e, conforme você escreve, solicita ou demonstra necessidade, ele identifica que existe uma skill capaz de executar aquela tarefa.

Por isso, o primeiro ponto que você precisa considerar ao trabalhar com uma skill é a **descrição**. Vamos imaginar que você criou a sua skill. Se você gastou, por exemplo, uma hora desenvolvendo essa skill, vale a pena dedicar pelo menos vinte ou trinta minutos trabalhando na descrição dela.

Isso porque essa descrição é o que vai definir se a sua skill será utilizada ou não. Em outras palavras, a descrição é a forma como você apresenta a sua skill para o agente. É ela que comunica o valor e a utilidade da skill.

A melhor maneira de avaliar essa descrição é testar na prática. Você utiliza a sua skill, conversa com o agente ou solicita tarefas específicas e observa se ele carrega a skill automaticamente. Se isso não acontecer, especialmente nos momentos em que você mais precisa, provavelmente a descrição não está adequada.

Nesse caso, é necessário trabalhar bastante nessa descrição até garantir que ela seja ativada corretamente. Esse processo é conhecido como **Skill Trigger**. Sempre que você ouvir esse termo, significa avaliar se o conteúdo do front matter é suficiente para disparar a execução da skill.

Se observarmos aqui, existe uma skill chamada *Doc to Co-authoring*. Ela guia o usuário por uma estrutura de workflow para realizar documentação colaborativa com coautores. Essa descrição inicial já indica claramente o objetivo da skill.

E aqui está um ponto importante para você observar com atenção. Quando analisamos a descrição de uma skill, percebemos que, na maioria das vezes, ela começa com uma sentença simples explicando o que a skill faz. Ou seja, qual é o objetivo principal da skill.

Porém, na prática, o que realmente faz o agente utilizar essa skill é a clareza sobre o que ela executa e em quais situações deve ser aplicada.

Mas aqui temos uma palavra-chave que normalmente é muito utilizada, que é `use when`. Ou seja, *use isso quando*. Use isso quando. Estou dizendo que você vai usar essa skill quando o usuário quiser escrever uma documentação. *User wants to write documentation*. Quando ele for fazer uma proposta, criar uma *technical spec*, tomar uma decisão de documentação ou quando tiver algum conteúdo com estrutura semelhante.

Esse workflow ajuda o usuário. Então, observe como isso é interessante. Esse workflow já indica que se trata de um processo que ajuda o usuário a ter mais eficiência, transferência de contexto, refinamento de conteúdo na interação e verificação da qualidade do trabalho para os leitores. Aqui temos outro ponto importante: ele explicou *quando* deve ser usado e também *como* isso ajuda, ou seja, por que essa skill vai ajudar.

E aqui existe outro elemento relevante: `trigger when user`. Observe: *trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks*. O motivo de dedicar tempo a essa parte é simples. Se você não tiver algo estruturado dessa forma, ou de formas semelhantes — e vamos ver outros exemplos — a sua skill não será ativada e todo o esforço para criá-la terá sido desperdiçado.

Por isso, **o front matter da skill é uma das principais partes nas quais você precisa investir tempo**. O que normalmente faço é pegar vários front matters que servem como referência em projetos conhecidos de skills, e depois adapto o meu. Eu defino que quero que a minha skill seja ativada e utilizo esses exemplos como templates para estruturar corretamente.

Então, é importante lembrar que o agente vai ler a sua skill e identificar as **palavras-chave**. Muitas vezes você vai precisar orientar isso de forma intencional. Sem essa estrutura, ter uma skill perde grande parte do sentido. Essa é uma orientação prática importante.

Outra dica é a seguinte. Em alguns momentos, você sabe que existe uma skill adequada para aquela tarefa, mas, durante o desenvolvimento ou a conversa com o agente, percebe que ele não está carregando essa skill. Nesse caso, existem algumas alternativas.

Uma delas seria escrever explicitamente para o agente carregar a skill, mas isso não é o ideal, porque você teria que lembrar disso constantemente. O que considero mais eficiente é utilizar, durante a conversa, as mesmas palavras-chave que aparecem no front matter. Assim, o agente reconhece o contexto e ativa a skill automaticamente.

Quando falo do agente, estou me referindo a dois cenários possíveis. Um deles é abrir, por exemplo, o **Claude Code**. Nesse ambiente, quando você começa a escrever, o sistema analisa as skills disponíveis e verifica quais são relevantes para aquela situação.

O ponto principal é que, muitas vezes, você também vai criar o seu próprio agente. E aqui está um aspecto importante. Quando você criar um agente personalizado, se não utilizar no agente as palavras-chave que estão no front matter da skill, o agente não vai ativar essa skill.

Ou seja, pode ser fácil pedir diretamente para carregar uma skill ou usar algumas palavras específicas durante a conversa. Porém, quando você cria um agente personalizado — algo que vamos estudar mais adiante — você também precisa garantir que essas palavras estejam presentes na configuração.

Esse é o principal ponto que quero destacar em relação ao desenvolvimento e ao entendimento de skills. Então, vamos seguir para o próximo vídeo para não deixar este muito longo. Aqui, a intenção foi focar bastante no front matter, porque ele é realmente uma parte fundamental.
