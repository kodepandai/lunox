import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { idIncrement, timestamps } from "./BaseMigration";

export class CreateUserTable1691913364057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          ...idIncrement,
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "user_name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          ...timestamps,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true);
  }
}
