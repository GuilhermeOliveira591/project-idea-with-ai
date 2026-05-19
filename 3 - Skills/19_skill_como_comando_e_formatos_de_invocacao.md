# Skill como comando e formatos de invocação

Nós criamos essa nossa skill agora, certo? Mas o grande ponto no meio de toda essa história é o seguinte: se você perceber, como que a skill foi chamada aqui? Eu escrevi o que eu queria, o Cloud percebeu, viu o *front matter* e falou: *bom, com base em tudo que eu tenho, acho que essa skill vai me ajudar*, e ele começou a trabalhar em cima disso.

Mas o que acontece no meio dessa história toda? Hoje em dia, eu também posso fazer um caminho um pouco ao contrário. Deixa eu limpar essa sessão aqui. Eu posso chegar, nesse caso — estou falando especificamente do **Cloud Code** — não é um curso de Cloud Code, mas é importante você entender que existe a possibilidade de fazer isso, porque, se você pensar bem, **tudo acaba sendo prompt**.

E se eu digitar uma barra aqui e digitar agora o nome da nossa skill, que é *Critical Review*, você vai ver que essa minha skill virou um *slash command* dentro do meu Cloud Code. Ou seja, ela é uma skill, mas, ao mesmo tempo, também é um comando. Então, o que eu tenho para dizer é que **o comando de ontem é a skill de hoje**.

Eu acredito que, eventualmente, ao longo do tempo, a gente vai parar de criar *commands* separados, e os nossos comandos vão se tornar skills, ou os *commands* vão ficar restritos a coisas extremamente específicas. Mas, de forma geral, as nossas skills podem ser executadas como comandos agora, dessa forma. E elas também podem **receber argumentos**.

Então, eu posso passar argumentos como se estivesse passando parâmetros para ela e, com base nesses parâmetros, definir como isso deve funcionar. Esse é um ponto importante. Um outro ponto importante é o seguinte: quando nós estamos trabalhando com uma skill, especificamente no Cloud Code, eu tenho uma opção chamada **user invocable**.

O que isso significa? Às vezes, eu quero criar uma skill que somente o Cloud pode chamar. Ou seja, eu estou conversando com o modelo e ele chama a skill automaticamente. Quando eu desativo essa opção, significa que eu não vou mais poder chamar essa skill diretamente por meio de um *slash command*. Vou abrir uma nova sessão aqui só para você ver.

Se eu digitar agora `critical`, você vai perceber que ela não aparece mais. Por quê? Porque eu bloqueei a chamada dessa skill por comando. Isso facilita quando eu quero evitar que várias pessoas saiam executando skills que não devem ser chamadas diretamente por um *slash command*. Nesse caso, ela deve ser utilizada apenas automaticamente pelo modelo.

Existe uma outra opção também chamada **Disable Model Invocation**. O que isso significa? Significa que o modelo **não pode** carregar a minha skill automaticamente. É um pouco o inverso da situação anterior. Quando eu digo que o usuário não pode invocar a skill, significa que ele não pode chamá-la diretamente por comando.

Agora, quando eu desabilito o *model invocation*, significa que, quando eu estiver escrevendo ali, o modelo não vai poder chamar a minha skill automaticamente, como aconteceu anteriormente. Nesse caso, ela poderia ser chamada apenas manualmente, por meio do comando. E, se eu desabilitar o *user invocable*, o usuário também não poderá chamá-la.

Essas são algumas opções adicionais que você pode ter. Estou falando especificamente de parâmetros adicionais que você pode configurar no Cloud Code. Por exemplo, se o usuário pode invocar a skill, isso permite que ela funcione como um comando. E, se ela funciona como um comando, significa que, ao executar o *Critical Review*, eu posso passar argumentos.

Se eu passar argumentos, posso utilizá-los como *variables*. Por exemplo, se eu informar A, B e C, o primeiro argumento será A, o segundo será B e o terceiro será C, porque ele segue a ordem dos argumentos informados. Esses valores passam a ser utilizados internamente como variáveis.

Eu também posso definir um *type hint* ou um *argument hint* para especificar exatamente como esses argumentos devem ser utilizados. Isso facilita bastante o uso, porque a própria ferramenta pode sugerir o formato correto. Mas eu acho que o ponto principal — isso aqui já entra em detalhes de implementação do Cloud Code — é você entender a ideia de Skills.

E a gente criou a nossa skill em conjunto. No próximo vídeo, eu vou mostrar uma outra skill que eu criei. A gente não criou juntos, mas eu quero que você veja como ela funciona e que a gente explore essa outra skill em conjunto.
