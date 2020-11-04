import { Between, getRepository, Repository } from "typeorm";
import { IChangeRepository } from "./IChangeRepository";
import { Change } from "../entity/Change";


export class ChangeRepository implements IChangeRepository {
  private repository: Repository<Change>;
  constructor() {
    this.repository = getRepository(Change);
  }
  async listAll(): Promise<Change[]> {
    return await this.repository.find();
  }
  async create(): Promise<Change> {
    const change = this.repository.create();
    return await this.repository.save(change);
  }
  async findOne(id: string): Promise<Change> {
    return await this.repository.findOne(id);
  }
  async findByDate(date: Date): Promise<Change[]> {
    const initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0)
    const finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0)
    return await this.repository.find({ where: { created_at: Between(initialDate, finalDate) } })
  }
}
