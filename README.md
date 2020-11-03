# Backend for Storage managment

1. Run `npm i` or `yarn` command;
2. Create a postgres database as shows in `ormconfig.example.json` file, or create another database and update `ormconfig.example.json` file;
3. Make sure, uuid extension is in your postgres database, to do that run the following query:
`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
4. Change name `ormconfig.example.json` to `ormconfig.json` ;
5. Run `npm typeorm migration:run` or `yarn typeorm migration:run` to update the database;
6. Run `yarn start` command to view database working; 
7. Run `yarn dev:server` command to initiate server;

# Data Structure

This has what I imagine as a simples way to register the products of a store and to register the buys and sells transactions, it has three entities:

Product:

    id: 'uuid' (it will turn to barcode);
    name: 'string' (name of the product);
    description: 'string';
    quantity: 'integer' (how many itens there is in storage);
    created_at: 'date' (when it was created);
    updated_at: 'date' (when it was updated);

Transaction:

    id: 'uuid';
    product_id: 'uuid' (relation to the product);
    change_id: 'uuid' (relation to the change);
    quantity: 'integer' (how many itens was bought or selled);
    created_at: 'date' (date of transaction);

Change:

    id: 'uuid';
    transactions: 'transaction[]' (list of all transaction executed at the same time);
    created_at: 'date' (date when change was executed);


