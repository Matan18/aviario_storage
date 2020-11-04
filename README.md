# Backend para controle de estoque

1. Após fazer o clone dessa aplicação, execute o comando `npm i` ou `yarn`;
2. Crie um banco de dados em postgres como mostra no arquivo `ormconfig.example.json`, ou crie um novo banco de dados e atualize o arquivo `ormconfig.example.json`;
3. No postgres, tenha certeza que a extenção uuid está instalada, para isso, execute a seguinte query no banco:
`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
4. Altere o nome do arquivo `ormconfig.example.json` para `ormconfig.json` ;
5. Execute `npm typeorm migration:run` ou `yarn typeorm migration:run` para atualizar o banco de dados;
6. Execute o comando `yarn start` ou `npm start` para ver o banco de dados funcionando; 
7. Execute o comando `yarn dev:server` ou `npm dev:server` parar iniciar o servidor;

# Estrutura dos Dados

Esta é o que eu imagino como um modelo simples de registrar produtos de uma loja e registrar as transações de compras e vendas, tem 3 entidades:

Product:

    id: 'uuid' (Será alterada para o código de barras do produto posteriormente);
    name: 'string' (nome do produto);
    description: 'string' (descrição);
    quantity: 'integer' (quantos itens existem no estoque);
    sell_price: 'integer' (preço, em centavos do produto,`NOT IMPLEMENTED`)
    created_at: 'date' (data da criação do produto);
    updated_at: 'date' (data da última atualização do produto);

Transaction:

    id: 'uuid';
    product_id: 'uuid' (relação com o produto);
    change_id: 'uuid' (relação com a mudança);
    quantity: 'integer' (quantos itens foram comprados (vendidos se o valor for negativo));
    created_at: 'date' (data da transação);

Change:

    id: 'uuid';
    type: ['ENTRADA', 'SAIDA', 'VENDA' 'PERDA'] (`NOT IMPLEMENTED`)
    description: 'string' (detalhamento da mudança realizada)
    transactions: 'transaction[]' (lista das transações executadas no mesmo momento);
    created_at: 'date' (data de quanto a mudança foi executada);


# Painel Admin

## Requisitos funcionais

* O usuário admin deve poder registrar todos os tipos entradas e saídas de produtos;
* O usuário admin deve poder listar todas as mudanças de estoque;

# Painel Operador

## Requisitos funcionais 

* O usuário operador deve poder registrar entradas e saídas de produtos exceto quando perda;
* O usuário operador deve poder verificar quantos itens existem no estoque;
* O usuário operador não pode registrar perda de produtos (`NOT IMPLEMENTED`);


# Painel histórico


# Requisitos não funcionais

* Um resumo das mudanças do dia devem ser armazenadas em cache (Redis);
* Um resumo de todas as mudanças devem ser armazenadas no MongoDB;
* Um resumo do dia deve ser enviado para o e-mail do prestador;
* Antes de finalizar o registro de uma mudança, é confirmado os dados da mudança com o usuário;
* Se durante o registro de uma mudança, um produto ficar com estoque negativo, é notificado ao usuário e ao prestador através de e-mail;

# Regras de negócio

* Um produto pode ser cadastrado individualmente;
* Um produto não pode ser descadastrado;
* Uma alteração no estoque de um produto não deve ser realizada manualmente;
* Uma alteração no estoque de um produto deve ser registrada através de uma transação;
* Uma transação deve ser registrada através de uma mudança;
* Um mudança por vez pode ser cadastrada previamente e confirmada mais tarde, é inicialmente registrada em MongoDB, é passada para o banco principal mais tarde;

