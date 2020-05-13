import { MigrationInterface, QueryRunner } from "typeorm";

export class uniqueUserName1589155329256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE users
        DROP CONSTRAINT unique_username;`,
      undefined,
    );
  }
}
