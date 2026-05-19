# Executando projeto e analisando regras

No vídeo anterior subimos, utilizando uma skill, um novo projeto. Ele foi criado e está pronto para uso. Quando digo pronto para uso, é ponto: **pronto para eu desenvolver qualquer coisa**. O porquê disso é o seguinte: primeira coisa, se você perceber, ele tem aqui um `Claude.md`. Pode ter o meu `Claude.md` de cara, ou o meu `Agent.md`. Recomendo que, quando você for fazer e gerar, já gere um **link simbólico** apontando um para o outro, porque basicamente a Anthropic insiste em ter o `claude.md` e não lê por padrão o `agent.md`, pelo menos no momento da gravação deste vídeo. O que normalmente se faz é gerar um `agent.md` baseado no `claude.md` e vice-versa, e dar um `ln -s` e seguir a vida.

O grande ponto é: se você olhar, ele trouxe um *overview* do projeto e, de cara, os scripts que a IA precisa para se guiar no dia a dia. Tenho o meu `init.sh`, que faz um *setup* do `.env`, pega as dependências, dá um `prisma generate` em relação ao banco de dados, dá um `push` no banco, sobe as *seeds* (*fixtures*, dados *fakes*), sobe o servidor e ainda mostra o *health check* para garantir que está tudo funcionando. Somente de eu dar esse `init`, resolvo um monte de problemas, e vou mostrar outros problemas que resolvi com alguns desses scripts.

Outro script: dou um `down`, ele mata o servidor. Se dou um `down --force`, ele derruba o servidor e mata todos os processos que vieram a partir dessa inicialização. Às vezes você executa uma aplicação, ele gera um *Playwright* para fazer teste, tem um *Jest* parado ali, e você fica com um monte de **processo zumbi** na aplicação. Quando dou `--force`, garanto que mato tudo que está em volta.

Se dou um `--clean`, ele zera tudo: mata variáveis de ambiente, `node_modules`, `.next`, etc., para deixar o projeto zerado. **Toda vez que for trabalhar com o seu projeto, parte do princípio de que a IA vai trabalhar com ele zerado**, ou seja, a inicialização tem que ser tranquila.

Tenho o `check.sh`, que verifica se o servidor está rodando. Tenho o `--fix`: se o servidor não está funcionando ou não está saudável, ele mata o processo órfão, tenta reiniciar o serviço e sobe o servidor. Tenho um `watch.sh`, que fica vendo os logs que estão rodando no servidor, e um `watch.sh --ps`, que mostra os processos rodando na aplicação no momento.

Isso é importante porque se a IA quiser ficar vendo um `tail` do que está vindo, ela pode chamar o `watch.sh`. Se quiser ver os processos, pode chamar o `--ps`. Tudo isso ajuda para que ela não tenha que ficar **inferindo manualmente** e tentando fazer esse tipo de coisa.

Isso que estou passando são exemplos exatamente para este tipo de situação, para esta aplicação, mas você deve fazer isso para o seu framework, para a sua linguagem de programação. **O importante é a ideia principal.**

Quando trabalho com Next.js, às vezes estou rodando múltiplos agentes, e eles vão rodando diversas aplicações e processos. Começo a ter **problemas de porta**. Uso uma porta, ele sobe outra, mas aí tenho outro script navegando e fazendo teste em um pedaço, e mistura com o software do processo do outro. A coisa vira uma bagunça. Então, no `.env` e `.env.local`, na hora da geração, escolho qual porta ele vai subir baseado num *range*. Se subir outro processo, ele verifica se está ocupado; se não estiver, ele sobe e já configura o arquivo baseado na porta que vai ser usada, exatamente para evitar confusão. Mas isso é uma questão mais técnica do Next.js.

Tenho lista de comandos básicos, a *tech stack*, a estrutura do projeto, a forma de testar — e depois vamos parar uma parte só para falar de teste. **Precisamos de um capítulo só de teste, porque teste também tem que estar organizado no dia zero.** Tenho regras de qualidade de teste, comandos de teste, localizações dos arquivos de teste, padrões de teste, regras, etc. Por quê? Porque tudo isso vai me ajudar a, a partir de agora, programar sem fazer com que a IA sofra para desenvolver. Ela já tem aqui as regras do jogo que precisa seguir, porque não parte mais do zero.

No próximo vídeo, vamos dar uma olhada na skill que gerou isso e como você pode fazer isso no seu dia a dia.
