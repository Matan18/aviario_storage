import "reflect-metadata";
import { createConnection } from "typeorm";
import { ChangeRepository } from "./repository/ChangeRepository";
import { ProductRepository } from "./repository/ProductRepository";
import { TransactionRepository } from "./repository/TransactionRepository";

createConnection().then(async connection => {

  const prodList = [
    { name: 'produtoUltimo1', description: 'dçlfaj', price: 0, image_url: 'no_image1.jpg', quantity: 43 },
    { name: 'produtoUltimo2', description: 'dçlfaj', price: 0, image_url: 'no_image2.jpg', quantity: 10 },
    { name: 'produtoUltimo3', description: 'dçlfaj', price: 0, image_url: 'no_image3.jpg', quantity: 8 },
    { name: 'produtoUltimo4', description: 'dçlfaj', price: 0, image_url: 'no_image4.jpg', quantity: 45 },
    { name: 'produtoUltimo5', description: 'dçlfaj', price: 0, image_url: 'no_image5.jpg', quantity: 54 },
    { name: 'produtoUltimo6', description: 'dçlfaj', price: 0, image_url: 'no_image6.jpg', quantity: 97 },
    { name: 'produtoUltimo7', description: 'dçlfaj', price: 0, image_url: 'no_image7.jpg', quantity: 1007 },
  ]
  console.log('Initiating Repositories')
  const changeRepository = new ChangeRepository();
  const productRepository = new ProductRepository();
  const transactionRepository = new TransactionRepository();
  console.log('Creating change')
  const change = await changeRepository.create();
  console.log('Creating Products');
  const promises = prodList.map(async prodItem => {
    return productRepository.create(prodItem).then(product => {
      return transactionRepository.create({ change_id: change.id, product_id: product.id, quantity: prodItem.quantity })
    })
  })
  const transactions = await Promise.all(promises)
  console.log('Será que executou antes?')
  const changes = await changeRepository.listAll();
  console.log(changes);

  await searchChange(changeRepository, transactionRepository, transactions[5].id);


  await connection.close();

}).catch(error => console.log(error));

async function searchChange(changeRepository: ChangeRepository, transactionRepository: TransactionRepository, transaction_id: string) {
  const transaction = await transactionRepository.findOne(transaction_id);
  console.log('Searching change by id: ', transaction.change_id)
  const change = await changeRepository.findOne(transaction.change_id);
  console.log(change)
}