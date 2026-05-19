No vídeo anterior falamos sobre o que normalmente entra nesses arquivos. Esses são apenas tópicos que coloquei, não precisam criar o arquivo exatamente dessa forma, com itens enumerados. São assuntos que podem estar presentes. Você é livre para colocar o que quiser, desde que fique claro.

Uma das formas de saber o que faz sentido incluir é saber o que não faz sentido. O que não deve ter em um arquivo .md para o agente? Primeiro, informações que o agente consegue deduzir. Por exemplo, nome de arquivo, função, classe, documentação extensa de API ou bibliotecas, qualquer coisa que mude o tempo todo e tudo que é muito longo ou autoexplicativo.

Não adianta escrever coisas genéricas como "não escreva código com problema de segurança" ou "utilize boas práticas de desenvolvimento". A IA vai tender a realizar o desenvolvimento baseado no padrão que já encontra no seu código. Se quiser ser mais específico, diga algo como "utilize conceitos do Clean Code", mas coisas extremamente abertas assim são gasto de tempo.

Cada dia mais os modelos evoluem e melhoram em entender padrões de nomes, navegar na árvore de diretórios e filtrar arquivos relevantes. Quando você fixa nomes de arquivo, função ou classe, a chance de eles mudarem ao longo do tempo é grande, e seu arquivo de inicialização fica errado. Ter algo errado nesse arquivo é pior do que não ter. Documentação muito extensa gasta mais tokens e, muitas vezes, não serve para o problema que ele está resolvendo.

Se você remove o que muda toda hora, o que é grande, ou as coisas que fazem parte do dia a dia do desenvolvimento, mas não são regras gerais, você tira desse arquivo. Com essa linha de raciocínio, vai ficar cada vez mais claro o que precisa estar ali.

Existem sempre exceções. Às vezes temos alguns arquivos marcantes no projeto, aqueles arquivos realmente importantes para o projeto inteiro, que todo mundo do time sabe que tem aquela pegadinha que acaba atrapalhando o processo de desenvolvimento. Esse tipo de coisa, você coloca no CLAUDE.md. Porque é exceção. Uma coisa é sair colocando um monte de nomes de arquivo, outra coisa é colocar aquele arquivo que é vital para o projeto funcionar.

Não existe uma fórmula mágica para resolver isso. A melhor forma de escrever seu CLAUDE.md é usando esses conceitos. Como você vai fazer depende muito de você.

No próximo vídeo, vou trazer um exemplo de um CLAUDE.md que tenho em um projeto — tenho diversos — para deixar alguns pontos mais claros.

 