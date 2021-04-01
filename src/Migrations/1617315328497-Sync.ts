import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1617315328497 implements MigrationInterface {
	name = 'Sync1617315328497'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "dbo"."User" ("id" int NOT NULL IDENTITY(1,1), "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "created" datetime NOT NULL CONSTRAINT "DF_dd7ba9c4226c04ad50ed96378aa" DEFAULT GETDATE(), "tokenVersion" int NOT NULL CONSTRAINT "DF_9f0711f6b838d45e170619dd8a7" DEFAULT 0, "verified" bit NOT NULL CONSTRAINT "DF_387f894d12d47a930e39b9e24c9" DEFAULT 0, CONSTRAINT "PK_a7701776dd2cc11a04cb15bf27a" PRIMARY KEY ("id"))`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "dbo"."User"`);
	}
}
