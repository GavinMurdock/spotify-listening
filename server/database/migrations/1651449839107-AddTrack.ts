import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTrack1651449839107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'track',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'int',
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'snapshotId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['snapshotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'snapshot',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('track');
  }
}
