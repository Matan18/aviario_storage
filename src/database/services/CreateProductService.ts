import { IProductDTO, IProductRepository } from "../repository/IProductRepository";

export class CreateProductService {
  constructor(
    private productRepository: IProductRepository
  ) { }
  async execute(data: IProductDTO) {
    const product = await this.productRepository.findByName(data.name);
    if (product) {
      return product;
    }
    return await this.productRepository.create(data);
  }
}