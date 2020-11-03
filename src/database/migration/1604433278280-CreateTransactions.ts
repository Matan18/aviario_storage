import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateTransactions1604433278280 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'transactions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: "uuid",
          default: 'uuid_generate_v4()'
        },
        {
          name: 'product_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'change_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
      ],
      foreignKeys: [
        {
          name: 'TransactionProduct',
          columnNames: ['product_id'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        },
        {
          name: 'TransactionChange',
          columnNames: ['change_id'],
          referencedTableName: 'changes',
          referencedColumnNames: ['id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
    return
  }

}
