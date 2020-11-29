import { getRepository, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { IProductDTO, IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;
  constructor() {
    this.repository = getRepository(Product);
  }
  async create({ name, description, quantity }: IProductDTO): Promise<Product> {
    const product = this.repository.create();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    return await this.repository.save(product);
  }
  async findOne(id: string): Promise<Product> {
    return await this.repository.findOne(id);
  }
  async findByName(name: string): Promise<Product> {
    return await this.repository.findOne({ where: { name } })
  }
  async listAll(): Promise<Product[]> {
    return await this.repository.find();
  }
  async update(id: string, { name, description, quantity }: IProductDTO): Promise<Product> {
    const product = await this.repository.findOne(id);
    product.name = name || product.name;
    product.description = description || product.description;
    product.quantity = quantity || product.quantity;
    return await this.repository.save(product);
  }
}