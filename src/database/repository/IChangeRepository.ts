import { Change } from "../entity/Change";

export interface IChangeRepository {
  create(): Promise<Change>;
  listAll(): Promise<Change[]>;
  findOne(id: string): Promise<Change>;
  findByDate(date: Date): Promise<Change[]>
}