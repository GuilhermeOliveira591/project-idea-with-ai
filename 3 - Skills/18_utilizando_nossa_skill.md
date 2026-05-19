# Utilizando nossa Skill

Agora que ele criou a nossa skill e aparentemente também a empacotou, vamos ver como esse processo se comportou. Eu tenho a sensação de que ele fez tudo em português porque eu estava falando em português com ele, mas vamos lá. Deixa eu colocar aqui para mostrar os meus arquivos. A primeira coisa é que ele gerou um pacote chamado `criticalreview.skill`, que é basicamente um arquivo compactado, contendo a minha skill dentro.

Eu vou deletar esse pacote, porque ele faz isso apenas para facilitar o transporte da skill de um lugar para outro. E aqui é onde realmente importa: na minha pasta `.cloud`, eu tenho a pasta `skills`, e dentro dela eu tenho a minha skill chamada **Critical Review**. Esse *Critical Review*, na prática, criou um arquivo `skill.md`, que é exatamente o arquivo que contém a definição da nossa skill.

Como eu imaginei que iria acontecer, ele criou a nossa skill inteira em português, mas depois a gente pode pedir para ele traduzir. Então, o nome da nossa skill ficou *Critical Review*, e a descrição dela é *revisão crítica de documentos, código e especificações para encontrar contradições, ambiguidades, inconsistências e lacunas lógicas. Use quando o usuário pedir para revisar documentos técnicos, PRDs, RFCs, especificações, comparar código-fonte com documentação, encontrar contradições, buscar lacunas ou revisar mudanças não commitadas.*

Aqui também temos as *keywords*, como *revisar, revisão crítica* etc. E logo abaixo ele trouxe o *workflow*. O primeiro passo é **coletar o material**. Se o usuário apontar arquivos específicos, ler todos. Se o pedido for genérico, revisar o projeto usando um `git diff` ou verificar alterações *staged* e *unstaged*, por exemplo, com `git diff HEAD`, para capturar mudanças não commitadas. Se houver código e documentação, ler ambos para fazer o cruzamento das informações.

O segundo passo é **analisar em quatro dimensões**:

- **Contradições**, por exemplo, quando um arquivo diz uma coisa e outro diz algo diferente.
- **Ambiguidades**, identificando termos vagos ou critérios indefinidos.
- **Inconsistências**, detectando nomes diferentes para o mesmo conceito ou convenções de nomenclatura quebradas.
- **Lacunas lógicas**, verificando se cada passo de uma explicação decorre logicamente do anterior.

Depois disso, vem a **classificação da severidade**, que pode ser alta, média ou baixa. Em seguida, o formato de saída, com um resumo apresentando as contradições de acordo com o nível de criticidade. Também há a seção de **achados**, contendo contradições, ambiguidades, inconsistências, lacunas lógicas e recomendações. E, por fim, as **diretrizes**, como ser específico, sempre referenciar arquivo e linha, não inventar problemas, apenas reportar achados e, quando houver dúvida, marcar como possível problema e explicar.

Uma das observações é que a única coisa que eu não gostei foi essa questão de mostrar a linha do arquivo, mas tudo bem. A outra coisa que eu vou pedir agora é traduzir o arquivo `skill.md` para inglês, porque eu não quero manter isso em português. E agora a gente já tem a nossa skill criada, pronta para testar e evoluir.

Então, o que eu posso fazer agora? Eu posso pegar qualquer projeto que eu tenha. Eu encontrei um aqui, que tem vários testes com especificações, diversas experimentações e bastante conteúdo misturado. Nesse projeto, eu tenho uma pasta `.cloud` e algumas skills. E o que eu quero neste momento é usar a skill que a gente acabou de criar nesse projeto.

Para isso, eu vou acessar a pasta da skill *Critical Review*, copiar essa pasta e colar dentro da estrutura do projeto. Assim, eu passo a ter a minha skill disponível dentro desse novo projeto. Agora, quando eu abrir o projeto, vou ver que a skill está ali pronta para uso. E a nossa ideia principal passa a ser buscar contradições ou qualquer problema relacionado à aplicação.

Como a gente pode começar a testar? Eu posso observar que tenho um código completo e também um arquivo `cloud.md` com diversos detalhes. O que eu quero fazer é procurar problemas que existam nesse `cloud.md` e que talvez não façam sentido em relação à documentação ou a alguma parte do projeto, ou vice-versa. Também posso pedir para verificar contradições dentro de uma pasta de *issues* ou em uma pasta de *features* do projeto.

Ou seja, eu tenho um *PRD*, um *high-level plan*, um *high-level spec* e outros documentos de requisitos. Então, o que eu vou fazer agora é usar o *trigger* da nossa skill. Eu posso escrever algo como: *faça uma revisão crítica dos documentos* ou *busque por contradições e ambiguidades nos documentos dentro da pasta `@.codekit` e verifique se existem inconsistências, problemas ou outros pontos relevantes.*

Agora que ele criou a nossa skill e aparentemente também a empacotou, vamos ver como esse processo se comportou. Eu tenho a sensação de que ele fez tudo em português porque eu estava falando em português com ele, mas vamos lá. Deixa eu colocar aqui para mostrar os meus arquivos. A primeira coisa é que ele gerou um pacote chamado `criticalreview.skill`, que é basicamente um arquivo compactado, contendo a minha skill dentro.

Eu vou deletar esse pacote, porque ele faz isso apenas para facilitar o transporte da skill de um lugar para outro. E aqui é onde realmente importa: na minha pasta `.cloud`, eu tenho a pasta `skills`, e dentro dela eu tenho a minha skill chamada *Critical Review*. Esse *Critical Review*, na prática, criou um arquivo `skill.md`, que é exatamente o arquivo que contém a definição da nossa skill.

Como eu imaginei que iria acontecer, ele criou a nossa skill inteira em português, mas depois a gente pode pedir para ele traduzir. Então, o nome da nossa skill ficou *Critical Review*, e a descrição dela é *revisão crítica de documentos, código e especificações para encontrar contradições, ambiguidades, inconsistências e lacunas lógicas. Use quando o usuário pedir para revisar documentos técnicos, PRDs, RFCs, especificações, comparar código-fonte com documentação, encontrar contradições, buscar lacunas ou revisar mudanças não commitadas.*

Aqui também temos as *keywords*, como *revisar, revisão crítica* etc. E logo abaixo ele trouxe o *workflow*. O primeiro passo é coletar o material. Se o usuário apontar arquivos específicos, ler todos. Se o pedido for genérico, revisar o projeto usando um `git diff` ou verificar alterações *staged* e *unstaged*, por exemplo, com `git diff HEAD`, para capturar mudanças não commitadas. Se houver código e documentação, ler ambos para fazer o cruzamento das informações.

O segundo passo é analisar em quatro dimensões. *Contradições*, por exemplo, quando um arquivo diz uma coisa e outro diz algo diferente. *Ambiguidades*, identificando termos vagos ou critérios indefinidos. *Inconsistências*, detectando nomes diferentes para o mesmo conceito ou convenções de nomenclatura quebradas. E *lacunas lógicas*, verificando se cada passo de uma explicação decorre logicamente do anterior.

Depois disso, vem a classificação da severidade, que pode ser alta, média ou baixa. Em seguida, o formato de saída, com um resumo apresentando as contradições de acordo com o nível de criticidade. Também há a seção de achados, contendo contradições, ambiguidades, inconsistências, lacunas lógicas e recomendações. E, por fim, as diretrizes, como ser específico, sempre referenciar arquivo e linha, não inventar problemas, apenas reportar achados e, quando houver dúvida, marcar como possível problema e explicar.

Uma das observações é que a única coisa que eu não gostei foi essa questão de mostrar a linha do arquivo, mas tudo bem. A outra coisa que eu vou pedir agora é traduzir o arquivo `skill.md` para inglês, porque eu não quero manter isso em português. E agora a gente já tem a nossa skill criada, pronta para testar e evoluir.

Então, o que eu posso fazer agora? Eu posso pegar qualquer projeto que eu tenha. Eu encontrei um aqui, que tem vários testes com especificações, diversas experimentações e bastante conteúdo misturado. Nesse projeto, eu tenho uma pasta `.cloud` e algumas skills. E o que eu quero neste momento é usar a skill que a gente acabou de criar nesse projeto.

Para isso, eu vou acessar a pasta da skill *Critical Review*, copiar essa pasta e colar dentro da estrutura do projeto. Assim, eu passo a ter a minha skill disponível dentro desse novo projeto. Agora, quando eu abrir o projeto, vou ver que a skill está ali pronta para uso. E a nossa ideia principal passa a ser buscar contradições ou qualquer problema relacionado à aplicação.

Como a gente pode começar a testar? Eu posso observar que tenho um código completo e também um arquivo `cloud.md` com diversos detalhes. O que eu quero fazer é procurar problemas que existam nesse `cloud.md` e que talvez não façam sentido em relação à documentação ou a alguma parte do projeto, ou vice-versa. Também posso pedir para verificar contradições dentro de uma pasta de *issues* ou em uma pasta de *features* do projeto.

Ou seja, eu tenho um *PRD*, um *high-level plan*, um *high-level spec* e outros documentos de requisitos. Então, o que eu vou fazer agora é usar o *trigger* da nossa skill. Eu posso escrever algo como: *faça uma revisão crítica dos documentos* ou *busque por contradições e ambiguidades nos documentos dentro da pasta `@.codekit` e verifique se existem inconsistências, problemas ou outros pontos relevantes.*
