# Agents.md vs Skills e Progressive disclosure

E ainda falando sobre *Progressive Disclosure*, existe um ponto que acaba gerando, eu não vou dizer uma confusão, porque não tem muito o que é certo ou errado, mas é importante você ter clareza. Eu acho que, quando a gente entende o que acontece por trás, a gente tem clareza sobre em qual contexto vale mais a pena utilizar.

A gente passou um tempo falando muito sobre `agents.md`, `cloud.md`, `gemini.md` etc. E a gente sabe que esses arquivos vão guiar basicamente o nosso projeto no momento zero, quando a nossa sessão iniciar. Ou seja, quando você iniciar a sessão, aquilo ali já vai entrar na nossa janela de contexto e, automaticamente, já vai ocupar os nossos tokens para trazer essas informações importantes.

Agora, o que acontece? Existe uma diferença, mas ela é uma diferença boba, porém **muda completamente o jogo**. Então, vamos lá. Quando fazemos uma referência a um documento no arquivo de memória — e quando eu estou falando em arquivo de memória e inicialização, eu estou querendo dizer o `agent.md`, o `cloud.md`, `gemini.md` etc. — o que acontece? A gente pode trabalhar no formato de *progressive disclosure*, informando referências mais aprofundadas aos arquivos, porém com diversas limitações.

O que eu estou querendo dizer em relação a limitações? Quando eu falei, inclusive, acho que no capítulo anterior, sobre quando você tem seu `Cloud.md` e, para ele não ficar muito grande, você consegue colocar suas referências embaixo, o que isso garante para a gente, na realidade? Garante que aquelas informações estão ali e, **se o seu agente resolver ler, ele vai ler**. Caso ele resolva não ler, ele não vai ler, e acabou. É zero garantia para você.

Da mesma forma, isso acaba acontecendo com skills. E por que eu digo isso em relação às skills? Porque o seu agente pode resolver não fazer o *trigger* da sua skill. Mas, uma vez que a sua skill é acionada, o que acontece aí no meio da história? Simplesmente, a gente sabe que houve aquele carregamento. A gente está vendo aquele carregamento na nossa frente e sabe o que está acontecendo.

No caso do `Cloud.md` e `Agents.md`, é um pouco mais difícil ter essa clareza em relação a esse *progressive disclosure*, apesar de muitas vezes fazer sentido. Então, muitas vezes, a gente pode tentar induzir o agente a ler. Mas vamos a algumas observações em que você pode cair em algumas pegadinhas, que é o seguinte.

Toda vez que você vai, por exemplo, fazer uma referência no seu `Cloud.md`, `Agent.md` etc., o que acontece? **Se você fizer a referência utilizando o arroba (`@`) na frente do caminho, significa que isso basicamente vai ser um import.** Ou seja, ele vai ler esse arquivo e já vai carregar na sua janela de contexto. Então, o que eu estou querendo dizer é que, se você colocou 200 linhas ali, 100 linhas no seu `Cloud.md`, tudo pequenininho, super conciso, e depois fez um monte de referências com arroba, e esses arquivos têm 500, 600, 700 linhas, todas essas linhas vão ser importadas juntas e vão entrar automaticamente na sua janela de contexto.

Ou seja, usar o arroba é como se você estivesse fazendo um **link simbólico** e realizando um *append* dentro do arquivo. Então, você tem que pensar dez vezes antes de fazer isso. Quando você quer fazer isso? Quando você quer organizar um pouco melhor os seus arquivos, mas sabendo que você está carregando todos eles dentro da sua janela de contexto.

Agora, quando nós **não colocamos o arroba** e fazemos a referência, a gente cai novamente no *Progressive Disclosure*, porque a IA tem a chance de, quando perceber, fazer a leitura daquele arquivo. Normalmente, existem algumas tentativas de induzir a IA a fazer isso. Por exemplo, você coloca ali logo embaixo:

> *Important, before starting any activity, understand what docs below are relevant for your task and read them first.*

Então, basicamente, o que ele está querendo dizer é o seguinte: olha, eu tenho o meu `Cloud.md`, ele está pequenininho aqui. Mas, na hora que você for começar uma tarefa, dê uma olhada nos arquivos aqui embaixo e, se eles fizerem sentido para você, leia esses arquivos. É uma tentativa de fazer com que a IA tenha um *trigger* para leitura nessa situação, mas isso **não é garantido**.

O que mais faz sentido nesses tipos de situação atualmente, uma vez que você tem skills, não é necessariamente fazer isso, é você ter uma skill. Significa que você não pode fazer isso? Não, não significa. Você pode e, eventualmente, deve. É bom colocar essas referências, principalmente quando são referências extremamente correlatas ao seu projeto, em um nível específico, aqueles *gotchas* do seu projeto, onde a IA acaba emperrando somente naquele contexto e que, às vezes, não justifica você criar uma skill.

Mas o importante é você ter uma clareza muito grande do que é colocar um arroba na frente, do que é fazer uma referência e ter ciência de que **não é porque você fez essa referência no `Cloud.md` que ele vai ler e seguir aquelas instruções**. Então, esse é um ponto importante para você observar.

Agora, quando a gente está trabalhando com skills, a gente entra na pegada do *Progressive Disclosure*, porque elas são desenhadas para começar com pouco contexto, decidir o que precisam ler, buscar somente os arquivos certos e parar de ler quando já tiverem o suficiente. Ou seja, a skill obtém a informação necessária e não precisa continuar lendo, além de possuir um fluxo consistente de como deve seguir.

E o que acontece? Hoje em dia, você pode fazer com que as skills rodem como **comandos**. Ou seja, você pode fazer a skill executar uma determinada ação para você. Algumas ferramentas de codificação, como um Cloud Code, fazem isso. Por outro lado, existem diversas formas de trabalhar dessa maneira.

Então, existe uma diferença muito grande entre um `Agents.md` e uma Skill. Skills são **distribuíveis, compartilháveis**, podem conter informações específicas etc. Já um `Cloud.md` ou `Agent.md`, mesmo com as suas referências, normalmente são referências internas do projeto, de pontos específicos daquele projeto, e que, em geral, não são compartilháveis em outros contextos.

Assim, a skill acaba se tornando algo compartilhável, reutilizável etc. Então, talvez algumas pessoas tenham essa dúvida: para que eu tenho uma skill se eu posso trabalhar com *Progressive Disclosure* no meu próprio arquivo de inicialização? Basicamente, a resposta está aí, e isso é muito importante entender.
