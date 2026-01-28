import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateRestaurantSpecialDishes20260125145000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurant_special_dishes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'restaurantId', type: 'int', isNullable: false },
          { name: 'fileId', type: 'int', isNullable: false },
          { name: 'title', type: 'varchar', length: '255', isNullable: true },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'restaurant_special_dishes',
      new TableForeignKey({
        columnNames: ['restaurantId'],
        referencedTableName: 'restaurants',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'restaurant_special_dishes',
      new TableForeignKey({
        columnNames: ['fileId'],
        referencedTableName: 'files',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createIndex(
      'restaurant_special_dishes',
      new TableIndex({
        name: 'IDX_restaurant_special_dishes_restaurantId',
        columnNames: ['restaurantId'],
      }),
    );

    await queryRunner.createIndex(
      'restaurant_special_dishes',
      new TableIndex({
        name: 'IDX_restaurant_special_dishes_fileId',
        columnNames: ['fileId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('restaurant_special_dishes', true);
  }
}
