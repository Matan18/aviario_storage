import { getRepository, Repository } from "typeorm";
import DiskStorageProvider from "../../provider/StorageProvider/implementations/DiskStorageProvider";
import { Product } from "../entity/Product";
import { IProductDTO, IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;
  constructor() {
    this.repository = getRepository(Product);
  }
  async create({ name, description, quantity, image_url, price }: IProductDTO): Promise<Product> {
    const product = this.repository.create();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.image_url = image_url;
    product.price = price;
    return await this.repository.save(product);
  }
  async findOne(id: string): Promise<Product> {
    return await this.repository.findOne(id);
  }
  async findByName(name: string): Promise<Product> {
    return await this.repository.findOne({ where: { name } })
  }
  async searchByName(name: string): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder('product')
      .where('(product.name) ~* (:name)', { name }).getMany();
  }
  async listAll(): Promise<Product[]> {
    return await this.repository.find();
  }
  async update(id: string, { name, description, quantity, price }: IProductDTO): Promise<Product> {
    const product = await this.repository.findOne(id);

    product.name = name || product.name;
    product.description = description || product.description;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    return await this.repository.save(product);
  }
  async updateImage(id: string, { image_url }: { image_url: string }): Promise<Product> {
    const product = await this.repository.findOne(id);

    const storageProvider = new DiskStorageProvider();
    await storageProvider.deleteFile(product.image_url);

    product.image_url = image_url;

    return await this.repository.save(product);
  }
}