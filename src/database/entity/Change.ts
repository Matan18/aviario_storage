import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity('changes')
export class Change {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Transaction, transaction => transaction.change)
  transactions: Transaction[]

  @CreateDateColumn()
  created_at: Date;
}