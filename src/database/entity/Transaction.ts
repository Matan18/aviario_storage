import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Change } from "./Change";
import { Product } from "./Product";

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  change_id: string;

  @ManyToOne(() => Change, change => change.transactions)
  @JoinColumn({ name: 'change_id' })
  change: Change;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}