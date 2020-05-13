import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoring1588984729335 implements MigrationInterface {
  name = "refactoring1588984729335";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE FUNCTION update_record()
        RETURNS trigger
        LANGUAGE plpgsql
        AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END
        $$;`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "users" (
          "id" SERIAL NOT NULL PRIMARY KEY,
          "first_name" text NOT NULL,
          "last_name" text NOT NULL,
          "email" text NOT NULL,
          "password" text NOT NULL,
          "username" text NOT NULL,
          "created_at" timestamptz DEFAULT NOW(),
          "updated_at" timestamptz)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TRIGGER update_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_record();`,
    );
    await queryRunner.query(
      `CREATE TABLE "pets" (
          "id" SERIAL NOT NULL PRIMARY KEY,
          "name" text NOT NULL,
          "age" integer NOT NULL,
          "user_id" integer,
          "created_at" timestamptz DEFAULT NOW(),
          "updated_at" timestamptz,
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE);`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TRIGGER update_pets BEFORE UPDATE ON pets FOR EACH ROW EXECUTE PROCEDURE update_record();`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION "update_record"`, undefined);
    await queryRunner.query(`DROP TABLE "pets"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
