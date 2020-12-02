import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class InsertPrice1606914421088 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'price',
      type: 'integer',
      isNullable: false,
      default: '0'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'price')
  }
}
