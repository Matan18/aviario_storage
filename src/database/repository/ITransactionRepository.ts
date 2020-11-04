import { Transaction } from "../entity/Transaction";

export interface ITransactionDTO {
  product_id: string;
  change_id: string;
  quantity: number;
}

export interface ITransactionRepository {
  create(data: ITransactionDTO): Promise<Transaction>;
  listAll(): Promise<Transaction[]>;
  findOne(id: string): Promise<Transaction>;
  findByChange(change_id: string): Promise<Transaction[]>;
  findByProduct(product_id: string): Promise<Transaction[]>;
  findByDate(date: Date): Promise<Transaction[]>;
}