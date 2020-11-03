import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1604430291539 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'quantity',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
    return;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('products')
  }

}
