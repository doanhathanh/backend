import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1623900557910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_account',
        columns: [
          {
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            name: 'id',
            type: 'int'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '250',
            isNullable: false,
            isUnique: true
          }
        ]
      })
    );

    for (let i = 1; i <= 10; i++) {
      const scmd: string = 'INSERT INTO `user_account` (`email`) VALUES ("user_' + i.toString() + '@gmail.com");';
      await queryRunner.query(scmd);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_account');
  }
}
