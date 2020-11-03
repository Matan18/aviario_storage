import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Change } from "./entity/Change";
import { Product } from "./entity/Product";
import { Transaction } from "./entity/Transaction";

createConnection().then(async connection => {

  console.log('Creating Change');
  const change = await createChange(connection);
  const prodList = [
    { name: 'produtoTeste1', desc: 'dçlfaj', quant: 43 },
    { name: 'produtoTeste2', desc: 'dçlfaj', quant: 10 },
    { name: 'produtoTeste3', desc: 'dçlfaj', quant: 8 },
    { name: 'produtoTeste4', desc: 'dçlfaj', quant: 45 },
    { name: 'produtoTeste5', desc: 'dçlfaj', quant: 54 },
    { name: 'produtoTeste6', desc: 'dçlfaj', quant: 97 },
    { name: 'produtoTeste7', desc: 'dçlfaj', quant: 1007 },
  ]
  const promises = prodList.map(async prodItem => {
    return createProduct(connection, { name: prodItem.name, desc: prodItem.desc, quant: prodItem.quant }).then(
      product => {
        return createTransactions(connection, { product, change, quant: product.quantity })
      })
  })
  const transactions = await Promise.all(promises)
  change.transactions = transactions;
  await connection.manager.save(change)
  console.log('Será que executou antes?')

  await listChanges(connection);


  await connection.close();

}).catch(error => console.log(error));


async function listChanges(connection: Connection) {
  const changes = await connection.getRepository(Change).find({relations: ["transactions"]})
  console.log(changes)
  return;
}

async function createChange(connection: Connection) {
  const change = connection.manager.create(Change);
  change.transactions = [];
  return await connection.manager.save(change);
}

async function createTransactions(connection: Connection, transDto: { product: Product, change: Change, quant: number }) {
  const transaction = connection.manager.create(Transaction);
  transaction.product = transDto.product;
  transaction.change = transDto.change;
  transaction.quantity = transDto.quant;
  return await connection.manager.save(transaction);
}

async function createProduct(connection: Connection, prodDto: { name: string, desc: string, quant: number }) {
  const product = connection.manager.create(Product);
  product.name = prodDto.name;
  product.description = prodDto.desc;
  product.quantity = prodDto.quant;
  return await connection.manager.save(product);
}