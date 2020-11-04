import { Product } from "../entity/Product";

export interface IProductDTO {
  name: string;
  description: string;
  quantity: number;
}

export interface IProductRepository {
  create(data: IProductDTO): Promise<Product>;
  findOne(id: string): Promise<Product>;
  listAll(): Promise<Product[]>;
  update(id: string, data: IProductDTO): Promise<Product>;
}