Chegou a hora de entrar no assunto que eu queria trazer para vocês. Acredito que vocês perceberam que fui repetitivo, mas eu queria que sentíssemos isso juntos, para ter essa experiência. Apesar de ser repetitivo, poucas pessoas têm a paciência de fazer isso que fizemos, então foi importante para vocês, acreditem.

Agora, tenho algo um pouco diferente. Estou rodando usando o Claude da Anthropic, mas isso pode servir para qualquer agente de inteligência artificial. Normalmente, esses agentes têm um arquivo .md. Neste caso, ele se chama CLAUDE.md. Existem AGENTS.md, que normalmente eles reconhecem, GEMINI.md, AGENTS.md da OpenAI, mas de forma geral os agentes reconhecem esses arquivos.

Qual é a grande diferença de um README.md para um CLAUDE.md? O ponto é o seguinte: quando iniciamos, esse arquivo já é injetado no contexto da IA. Na hora em que ele é injetado, a IA já tem o que precisa para conseguir organizar o ambiente.

Vou mostrar rapidamente alguns aspectos do CLAUDE.md. Ele tem um project overview normal e a seção de environment setup and running. Lá estão os comandos: environment status, back-end, front-end, both; inicialização de back-end, front-end, both; e both com migrations (recomendado pela primeira vez); comandos para parar e resetar, limpar volumes, containers, etc.; executar serviços, porta default; rodar migrações; checar migrações atuais; e uma instrução importante: sempre rode comandos dentro do container, omitindo a flag -it do Docker.

É um arquivo extremamente simples e curto, não tem um monte de blá-blá-blá como alguns READMEs. Agora, com um modelo mais simples, peço: "Inicie o ambiente para rodarmos testes." Percebam que ele nem fez a leitura das minhas pastas. Ele simplesmente não perdeu absolutamente nenhum segundo de tempo procurando, varrendo, tentando entender um diretório para depois fazer qualquer tipo de execução, simplesmente por conta desse arquivo que já estava configurado.

Quando começamos a fazer esse tipo de coisa, tudo muda completamente a experiência com desenvolvimento. O tempo que gastamos rodando o programa, apenas fazendo a IA subir o ambiente, pode parecer uma bobeira, mas não é. E o mais interessante de tudo é ter scripts de inicialização e todo o restante.

No próximo vídeo, vamos explorar um pouco mais toda essa história do CLAUDE.md, AGENTS.md — não importa qual .md estamos falando. O ponto importante é o arquivo que a IA utiliza para inicialização. Acredite que, depois de hoje, vocês vão dar muito, mas muito mais valor a esse arquivo. 

 