API investimento em ações
:dizzy::dizzy::dizzy:**************:dizzy::dizzy::dizzy:

![Investimento](https://media4.giphy.com/media/RLzvxHDMUoq092A5TV/giphy.gif?cid=ecf05e47hr61m06w4v527x6d2f9f50ih7ih4o7plr94byg50&rid=giphy.gif)

Tecnologias utilizadas :question::

* NodeJS -> para desenvolvimento de api(que é um lugar onde guardamos informação) escrita inicialmente em Typescrit como um desafio já que estou aprendendo e por ser tipado é um pouco mais complicado que sua base em javascrit;
* MySQL -> tecnologia escolhida para manipular os dados de forma mais crua ao ser necessário escrever queries para comandar as ações no banco. Temos as ORM's (object-relational mapping) que facilitam a manipulação do banco de dados, por exemplo, o Sequelize que apresenta comandos para facilitar a vida, mas pessoalmente prefiro criar as queries eu mesma. Para mim é divertido e posso treinar.

************* 😇:notes:
Módulos utilizados neste projeto:
:seedling:
* git-commit-msg-linter -> para commits descritivos (e atômicos);
* Express -> biblioteca que facilita a criação de endpoints para api;
* Cors -> facilita o uso da api pelo front-end;
* Mysql2 -> faz a integração entre o banco de dados e o código da api;
* Dotenv -> necessário para conectar ao banco de dados de maneira mais segura, pois assim os dados do dono do banco não ficam expostos. Por esse motivo aqui nesse repositório contém um arquivo chamado .env.example que pode ser usado de modelo para escrita dos seus próprios dados no mysql e assim ter permissão de acesso. As chaves PORT, HOST e DATABASE podem ser mantidas.
* Eslint -> padronização de escrita do código.
* ts-node -> utilizado para que seja possível que o projeto rode mesmo que em typescript.

************* :exclamation:
Instruções de uso:
* Ao chegar nesse repositório faça o clone para uma pasta em sua máquina;
* Abra o repositório localmente e pelo terminal digite o comando: npm install -> assim você instalará todas as dependências necessárias para o projeto funcionar;
* Vá no arquivo .env.example e renomeio para .env -> coloque suas informações pessoais para acessar o mysql;
* O banco já vem com algumas informações para teste. Rode o arquivo PSEL_XP.sql pelo workbench, se você o tiver em sua máquina, ou no próprio vscode através das extensões que manipulam bancos de dados, como o "database client". Como neste projeto não uso ORM, não temos um script para criar o banco. Pretendo futuramente criar um script para criar o banco direto pelo terminal atrvés de um script.

*** COMANDOS ***
:pray::pray::pray::pray:
- npm start -> roda a aplicação localmente com ts-node na porta 3002: http://localhost:3002/

************** :white_flower:Endpoints disponíveis:
 - /ativos -> lista todos os ativos disponíveis
 - /ativos/{id} -> retorna o ativo com aquele id
 - /ativos/cliente/{id} -> retorna todos os ativos do cliente com esse id -> talvez essa url esteja confusa.
 - /contas -> lista todas as contas cadastradas -> Isso deve ter uma autenticação para admin.
 - /contas/{id} -> retorna a conta daquele cliente específico;
- /contas/saque -> atualiza a conta com um saque;
- /contas/deposito -> atualiza a conta com um deposito;

**********************:four_leaf_clover:
Desafios
* O planejamento leva tempo, mas ele é essencial porque poupa tempo a longo prazo;
  - Na imagem psel-xp.v1.png não tenho a modelagem do banco porque só lembrei na hora de codar;
  - O esquema do banco está na imagem dawSQL;
* Escolhi trabalhar com classes e typescript e é desafiador porque tem que tipar os retornos e ainda me confundo com os implements, extends e uso do as para retornos. Realmente quero desenvolver essas habilidades e estou me divertindo com o projeto porque estou treinando.
* Criar controller em classe está sendo desafiador porque só vem undefined, então precisei usar funções para não ficar travada no projeto, mas o objetivo é refatorar assim que terminar de implementar as autenticações e testes.
* Trabalhar com MSC é uma prática que deixa a aplicação mais robusta e segura porque em cada camada temos uma responsabilidade. No entando, eu fiquei um tempinho para resolver um problema de retorno porque estava olhando a model e só depois lembrei de olhar como estava no service. Eu estava tentando extends uma interface da outra, mas ficou confuso porque as duas possuem keys iguais para entidades diferentes. Por exemplo, id e name tanto na interface ativo, quanto na cliente.
* Estava confundindo os modelos/contratos das entidades no código com o banco de dados em si, mas ao trabalhar consegui clarear minhas ideias e perceber que tenho a tabela intermediária justamente para ter a liberdade de mexer nas outras duas tabelas.
* Tomei a liberdade de modificar as rotas e métodos http conforme meu entendimento atual do que me parece correto. No documento de FAQ do processo seletivo dizia que as toas eram sugestões e poderiam ser modificadas.

