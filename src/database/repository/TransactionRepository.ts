import { Between, getRepository, Repository } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { ITransactionRepository, ITransactionDTO } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;
  constructor() {
    this.repository = getRepository(Transaction);

  }
  async create({ change_id, product_id, quantity }: ITransactionDTO): Promise<Transaction> {
    const transaction = this.repository.create();
    transaction.change_id = change_id;
    transaction.product_id = product_id;
    transaction.quantity = quantity;
    return await this.repository.save(transaction);
  }
  async findOne(id: string): Promise<Transaction> {
    return await this.repository.findOne(id);
  }
  async findByChange(change_id: string): Promise<Transaction[]> {
    return await this.repository.find({ where: { change_id } })
  }
  async findByProduct(product_id: string): Promise<Transaction[]> {
    return await this.repository.find({ where: { product_id } })
  }
  async findByDate(date: Date): Promise<Transaction[]> {
    const initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0)
    const finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0)
    return await this.repository.find({ where: { created_at: Between(initialDate, finalDate) } })
  }
  async listAll(): Promise<Transaction[]> {
    return await this.repository.find();
  }
}