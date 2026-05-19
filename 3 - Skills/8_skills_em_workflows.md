# Skills em workflows

Seguinte, eu sei que estamos falando especificamente sobre Skills, mas existe um repositório interessante chamado **Superpowers**. A ideia desse projeto não é necessariamente focada apenas em Skills. Ele traz, na realidade, formas de você ter um *workflow* mais estruturado em relação ao desenvolvimento.

Então, você pode instalar isso no **Claude Code, Codex, Open Code** e em outras ferramentas. A proposta é oferecer um workflow básico que começa com *brainstorming*. Antes de escrever código, você inicia com essa etapa. Depois disso, você trabalha com **Git Worktrees** para conseguir lidar com ambientes isolados dentro do mesmo projeto.

Em seguida, entram etapas como criação de planos, uso de agentes de desenvolvimento e execução desses planos. Depois, *Test Driven Development*, *code review* e finalização de uma *development branch*. Se você observar, a ideia desse projeto está muito mais relacionada a estruturar um workflow de desenvolvimento, o que considero bastante interessante, e existem diversas iniciativas nessa linha.

Por outro lado, se você acessar a pasta de skills, vai encontrar as skills que foram criadas para sustentar esse fluxo de trabalho. E aqui está um ponto importante, porque você consegue ver a quantidade de skills existentes. Existe uma skill para *brainstorming*, uma skill para execução de planos e uma skill específica para quando você termina um desenvolvimento em uma branch.

Perceba também outro ponto importante. Muitas pessoas acreditam que skill é algo complexo de construir, mas, na prática, não é. **Uma skill mínima é basicamente um único arquivo.** Porém, conforme você aumenta o nível de profundidade e especialização, naturalmente começam a surgir mais arquivos, e vamos abordar isso também.

Então, por exemplo, quando estou terminando o desenvolvimento de uma branch, essa skill possui um *front matter* e um *overview*. Quando estivermos no editor, ficará mais fácil de visualizar. Mas, basicamente, ela define um fluxo: quando estou concluindo um desenvolvimento, a primeira coisa é verificar se os testes estão passando.

Se o teste falhar, a orientação é interromper o processo. Depois disso, determinar qual é a branch base. Em seguida, apresentar opções para o desenvolvedor: fazer um merge, criar uma pull request ou escolher outra alternativa. Depois disso, executar a decisão tomada. Se for a opção correspondente, criar a pull request. Se for outra opção, seguir o fluxo definido.

Ela também traz uma tabela de referências com *common mistakes*, problemas recorrentes, *red flags*, práticas recomendadas e aspectos de *integration*. E aqui entra um detalhe importante: essa skill trabalha em conjunto com o workflow que está sendo utilizado. Isso faz com que o comportamento dela seja ajustado ao contexto daquele processo.

Se você observar, essa skill pode fazer sentido para diversos cenários, mas foi claramente moldada para funcionar bem dentro do workflow específico desse projeto. Eu também vou mostrar algumas skills que criei, baseadas em um projeto de **Spec Driven Development**, onde existem skills específicas para aquele contexto.

Além disso, vamos construir skills juntos. Então, agora vamos seguir para o editor de código. Chega de apenas explicar e mostrar telas; vamos começar a trabalhar diretamente com os arquivos.
