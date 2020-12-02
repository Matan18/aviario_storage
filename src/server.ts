import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import multer from "multer";
import { createConnection } from "typeorm";
import cors from 'cors';
import uploadConfig, { tmpFolder } from "./config/upload";
import { ProductRepository } from "./database/repository/ProductRepository";

const app = express();
app.use(cors());
app.use(express.json())

const uploadMiddleware = multer(uploadConfig);
app.use('/files', express.static(tmpFolder));
createConnection()

app.post('/products', uploadMiddleware.single('image_url'), async (request, response) => {
  const { name, description, quantity, price } = request.body;
  const { filename } = request.file;
  const productRepository = new ProductRepository();
  const product = await productRepository.create({ name, description, quantity, image_url: filename, price });

  return response.send(product);
})

app.get('/products', async (_, response) => {
  const productRepository = new ProductRepository();
  const products = await productRepository.listAll();

  return response.send(products);
})

app.get('/products/search', async (request, response) => {
  const { name } = request.query;
  const productRepository = new ProductRepository();
  const products = await productRepository.searchByName(name as string);
  return response.send(products);
})
app.get('/products/:id', async (request, response) => {
  const { id } = request.params;
  const productRepository = new ProductRepository();
  const product = await productRepository.findOne(id);

  return response.send(product);
})

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  return response.status(500).json({
    status: 'Ocorreu um erro inesperado',
    message: err.message
  })
})

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3333);
app.set('port', port);

app.listen(port, () => {
  console.log('Sever initialized');
})
