import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableUnique,
} from 'typeorm';

export class CreateWishlists20260128191400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wishlists',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'int', isNullable: false },
          { name: 'placeId', type: 'int', isNullable: false },
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
      'wishlists',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'wishlists',
      new TableForeignKey({
        columnNames: ['placeId'],
        referencedTableName: 'places',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'wishlists',
      new TableIndex({
        name: 'IDX_wishlists_userId',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'wishlists',
      new TableIndex({
        name: 'IDX_wishlists_placeId',
        columnNames: ['placeId'],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'wishlists',
      new TableUnique({
        name: 'UQ_wishlists_userId_placeId',
        columnNames: ['userId', 'placeId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wishlists', true);
  }
}
