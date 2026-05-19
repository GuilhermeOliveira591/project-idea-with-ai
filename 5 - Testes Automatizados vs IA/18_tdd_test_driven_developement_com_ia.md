# TDD - Test Driven Developement com IA

Nesta aula, é introduzido o uso da metodologia ***Test Driven Development (TDD)*** no contexto de desenvolvimento de software com inteligência artificial, destacando como essa abordagem continua sendo relevante mesmo com o uso de ferramentas automatizadas. O professor apresenta o **TDD** como uma prática consolidada ao longo do tempo e reforça que sua aplicação pode trazer **maior controle, previsibilidade e qualidade** ao processo de desenvolvimento assistido por IA.

O princípio central do *TDD* consiste em **escrever os testes antes da implementação do código**. A partir de uma lista de funcionalidades ou comportamentos desejados para a aplicação, o desenvolvedor seleciona um item, cria o teste correspondente, implementa o código necessário para que esse teste passe e, em seguida, realiza a **refatoração** do código para melhorar sua qualidade e organização. Esse ciclo é repetido continuamente até que todos os comportamentos previstos sejam implementados.

Esse processo é frequentemente representado pelo ciclo conhecido como ***Red, Green, Refactor***:

- **Red**: o teste é criado e falha, pois ainda não existe implementação.
- **Green**: o código mínimo necessário é desenvolvido para que o teste passe.
- **Refactor**: o código é reorganizado e aprimorado sem alterar seu comportamento, garantindo que continue atendendo aos testes já definidos.

A lógica é permitir que o sistema **evolua de forma incremental**, mantendo a segurança proporcionada pelos testes automatizados.

Um ponto importante destacado é que o **primeiro objetivo não é criar a melhor implementação possível**, mas sim fazer o teste passar com a menor complexidade necessária. Somente após garantir que o comportamento esperado está funcionando, o código deve ser refatorado para alcançar melhor qualidade, legibilidade e manutenção. Essa abordagem reduz o risco de introduzir erros e facilita a evolução contínua do sistema.

No contexto da inteligência artificial, o professor apresenta a utilização de ***skills*** específicas para *TDD*, que auxiliam na aplicação dessa metodologia no dia a dia do desenvolvimento. Essas *skills* incorporam princípios fundamentais do *TDD*, como **definição clara de comportamentos, identificação de interfaces e validação incremental** das funcionalidades. Elas também ajudam a evitar práticas inadequadas, conhecidas como ***anti-patterns***, que comprometem a efetividade dos testes.

Entre esses *anti-patterns*, destaca-se a abordagem chamada ***horizontal slices***, na qual todos os testes são escritos primeiro e toda a implementação é realizada depois. O modelo recomendado é o ***vertical slicing***, em que cada funcionalidade é desenvolvida de forma completa antes de iniciar a próxima. Nesse modelo, o ciclo ocorre da seguinte forma: escrever o teste de uma funcionalidade, implementar o código necessário para fazê-lo passar e, em seguida, refatorar antes de avançar para o próximo comportamento.

Outro aspecto relevante é que **a escrita de cada teste influencia diretamente a criação dos testes seguintes**. Isso ocorre porque, à medida que o sistema evolui, novos cenários e dependências surgem naturalmente. Por esse motivo, o desenvolvimento orientado por testes deve ser **sequencial e incremental**, permitindo que a arquitetura do sistema se adapte gradualmente às necessidades do domínio.

A *skill* apresentada também propõe um ***workflow* estruturado** para conduzir o processo de *TDD*. Esse fluxo inclui a confirmação das interfaces que precisam ser modificadas, a identificação dos comportamentos esperados, a definição dos pontos que devem ser testados e a execução iterativa do ciclo de desenvolvimento. Esse modelo reforça que **não é necessário testar tudo**, mas sim priorizar os comportamentos mais relevantes para o funcionamento do sistema.

Por fim, o professor destaca que a utilização de **testes bem definidos altera significativamente a forma como a inteligência artificial gera código**. Quando os testes estão claros e estruturados, a IA passa a trabalhar dentro de restrições específicas, o que orienta a implementação e reduz comportamentos inesperados. Dessa forma, o *TDD* se torna uma **ferramenta estratégica** para garantir qualidade e previsibilidade no desenvolvimento de software assistido por inteligência artificial.
