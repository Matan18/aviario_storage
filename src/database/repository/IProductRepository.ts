import { Product } from "../entity/Product";

export interface IProductDTO {
  name: string;
  description: string;
  quantity: number;
  image_url?: string;
  price: number;
}

export interface IProductRepository {
  create(data: IProductDTO): Promise<Product>;
  findOne(id: string): Promise<Product>;
  listAll(): Promise<Product[]>;
  update(id: string, data: IProductDTO): Promise<Product>;
  updateImage(id: string, { image_url }: { image_url: string }): Promise<Product>;
  findByName(name: string): Promise<Product>;
  searchByName(name: string): Promise<Product[]>;
}