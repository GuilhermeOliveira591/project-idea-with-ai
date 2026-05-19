# Deep diving na Skill

Para a gente fechar aqui com chave de ouro, vamos dar uma olhada nessas skills e concluir o raciocínio. Eu espero ter conseguido trazer uma visão geral para vocês. Então, quando eu estou dentro da minha skill, eu tenho o **Next.js Project Setup** como arquivo principal. Nesse arquivo, eu tenho o meu *front matter* e é nele que eu coloco o conhecimento necessário para fazer o *setup* de uma aplicação Next.js em ambientes de desenvolvimento, incluindo estrutura de arquivos, convenções e outros padrões.

Então, quando eu quero criar um novo projeto, fazer o *setup* do ambiente, iniciar a aplicação, criar um projeto Node.js, gerar um *scaffold* ou criar um `Cloud.md` para um projeto Next.js, eu tenho essas definições aqui. Também existem algumas *keywords* que ajudam o agente a identificar quando essa skill deve ser utilizada. E, basicamente, o que acontece é que eu tenho algumas regras definidas.

Uma dessas regras é que **nada deve ser executado automaticamente sem perguntar primeiro para o usuário**, mesmo que o sistema saiba exatamente o que precisa ser feito. Também existem orientações sobre como iniciar o processo, incluindo aquelas perguntas iniciais para entender o escopo do projeto. A ideia é que o agente consiga inferir melhor o contexto e sugerir as ações mais adequadas.

Como uma skill não pode ser muito grande, eu trouxe apenas os principais comandos necessários. Por exemplo, como criar um projeto com `create app`, como configurar variáveis de ambiente e como preparar o ambiente inicial. Para isso, eu utilizo um *template* base chamado `env.example`, que fica dentro da pasta `assets`.

Esse `env.example` não é o modelo padrão do Next.js, mas sim um modelo baseado nas necessidades do meu ambiente. Nele, pelo menos, estão definidos o *server port* e o *port range*. Caso exista banco de dados, também são configuradas as variáveis relacionadas. E, se houver autenticação, o sistema pode adicionar automaticamente variáveis como o *secret* e a URL necessários para autenticação.

Também existe uma regra importante: os arquivos `.env` e `.env.local` devem estar no `.gitignore` e **nunca devem ser commitados** no repositório. O arquivo `init.env.example` deve ser criado automaticamente durante o *setup* do projeto. Em seguida, eu defino os scripts de desenvolvimento, explicando que todo projeto deve conter esses scripts básicos.

Se eu acessar a pasta `assets`, eu tenho scripts prontos que podem ser copiados automaticamente para o projeto. Esses scripts representam o padrão de execução que eu utilizo. Também existem definições de comportamento, como garantir que todos os scripts estejam presentes no diretório do projeto e que o comando `init` seja **idempotente**, ou seja, se o servidor já estiver rodando, nada deve ser reiniciado desnecessariamente.

Além disso, existem convenções e um *checklist* para garantir que o *setup* foi concluído corretamente. Por exemplo, verificar se o banco de dados foi configurado, se autenticação foi habilitada ou se testes foram instalados. Algumas dessas verificações são condicionais, porque dependem do tipo de projeto que está sendo criado.

Também existe uma seção dedicada à manutenção do `Cloud.md`. Toda vez que alguma mudança for feita no projeto — como adicionar scripts, instalar pacotes ou modificar a configuração — é necessário atualizar o `Cloud.md` para refletir essas alterações. Essa consistência entre o projeto e a documentação é uma regra fundamental da skill.

Dentro da pasta `references`, eu mantenho padrões de estrutura para o `Cloud.md`. Esses padrões incluem uma visão geral do projeto, configuração do ambiente, *stack* tecnológica, estrutura de diretórios, testes, banco de dados, padrões de desenvolvimento, uso de *worktrees* e regras operacionais. O agente detecta o que existe no projeto e atualiza o `Cloud.md` seguindo essas diretrizes.

Existe também uma pasta chamada `verify scripts`. Nela, há um script que valida se todos os componentes necessários foram criados corretamente. Esse script verifica se os comandos `init`, `down` e `check` foram copiados, se o `Cloud.md` foi gerado e se todas as etapas da skill foram executadas. Caso algo esteja faltando, o sistema retorna um erro e tenta corrigir automaticamente.

Ou seja, eu tenho **assets** que são copiados para o projeto, **scripts** que verificam a instalação, **arquivos de referência** que servem como padrão e o **arquivo principal** da skill. Esse arquivo tem pouco mais de cem linhas e utiliza referências para outros arquivos, aplicando o conceito de *Progressive Disclosure* para manter a estrutura organizada e eficiente.

Isso muda bastante o jogo em termos de produtividade e automação. Agora, imagine ter algo semelhante dentro do contexto da sua empresa. **Cada empresa e cada desenvolvedor têm necessidades diferentes.** No meu caso, eu precisei adaptar o *setup* do Next.js por causa dos diferentes ambientes em que eu executo a aplicação.

Por exemplo, quando eu executo o projeto em determinados ambientes na nuvem — como em plataformas de IA que executam código — pode existir limitação para rodar containers Docker ou conectar diretamente a um banco de dados Postgres. Nesses casos, eu preciso utilizar alternativas, como bancos de dados locais ou versões embarcadas, por exemplo.

Então, o que acontece é que o ambiente pode ser muito mais restrito, funcionando dentro de um *sandbox* com várias limitações. Por isso, muitas vezes é necessário customizar o *setup* do projeto para se adaptar a essas restrições. E a principal recomendação aqui é **adaptar os seus projetos à realidade do ambiente em que eles serão executados**, porque isso facilita muito o trabalho do agente e melhora a eficiência do desenvolvimento.
