# Desafio Loja Delivery
<br>
O projeto da mentoria Stone da Turma Resilia + Stone consiste na criação de uma aplicação para uma loja delivery. 
<br><br>
## Requisitos para a aplicação:

- Criar, remover, atualizar e listar produtos; <br>
- Gerenciar vendas - ou seja, poder criar e cancelar vendas; <br>
- Consultar histórico de vendas (com paginação); <br>
- Calcular o valor do frete para entrega para um CEP baseado na seguintes regras: <br>
. A sede da loja fica no Rio de Janeiro; <br>
. Entregas na mesma cidade custam R$10,00; <br>
. Entregas para outras cidades custam R$20,00; <br>
. Entregas para outros estados custam R$40,00;<br>

## Extras:
- Cadastrar clientes;
- Consultar histórico de vendas por clientes (com paginação)
- A dona da loja também deseja que seja possível que os atendentes consigam atender de suas casas, evitando que todos estejam na loja para receber os pedidos. Dessa forma, uma aplicação web parece ser o melhor cenário para atendê-la. Dessa forma, temos mais alguns requisitos:
- A dona da loja precisa gerenciar os atendentes que podem fazer as operações no sistema da loja;
- Apenas permitir que atendentes autenticados façam as operações no sistema da loja.
<br><br>
Fizemos a separação do projeto em 2 repositorios o backend e o front end. Abaixo iremos documentar a aplicação back-end. Você pode visualizar as informações do front-end em https://github.com/ana-vitoria-freitas/frontEnd-projeto-stone.git <br><br>

- Precisamos implementar uma API que disponibilize todos os endpoints necessários para as operações acima. <br>
- A API precisa ser RESTful; <br>
- Seguir os princípios SOLID;<br>
Atenção para utilizar os status codes do HTTP corretamente de acordo com cada operação da API;<br><br>

Alguns diferenciais técnicos na construção dessa API são:<br><br>

- Testes de unidade que não consumam o recurso real, ou seja, deve ser feito mock;<br>
- Utilização de containers.<br>

## Pré-requisitos necessários para a utilização da Aplicação

- Instale NodeJS em seu computador.<br>
- Clone os aquivos do repositório.<br>
```sh
git clone https://github.com/ana-vitoria-freitas/backEnd-projeto-stone.git
```
-Após entrar na pasta clonada, instale via terminal utilizando o comando:
```sh
npm install 
```
Em seguida, inicie a aplicação via terminal utilizando o comando:
```sh
node server.js
```

## 🛠️ Ambiente de construção

* [JavaScript]
* [NodeJS]
* [NPM]
* [Fastify] 
* [JWT] 
* [PostgreSQL]
* [Heroku] 

<br>

## Rotas

Foi utilizado o heroku para a hospedagem da api. Para a visualização dos dados é necessaria a autenticação no banco de dados. Mas para fins explicativos substituirei o endereço da api por http://localhost:3000 e explicar o acesso as rotas.
<br>
- http://localhost:3000/usuarios <br>
- http://localhost:3000/clientes <br>
- http://localhost:3000/produtos <br>
- http://localhost:3000/vendas <br>

