import {MigrationInterface, QueryRunner} from "typeorm";

export class Sync1617667374012 implements MigrationInterface {
    name = 'Sync1617667374012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."Profile" ("id" int NOT NULL IDENTITY(1,1), "photo" nvarchar(MAX), CONSTRAINT "PK_572e221e959965f7bb08f102267" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."User" ("id" int NOT NULL IDENTITY(1,1), "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "created" datetime NOT NULL CONSTRAINT "DF_dd7ba9c4226c04ad50ed96378aa" DEFAULT GETDATE(), "tokenVersion" int NOT NULL CONSTRAINT "DF_9f0711f6b838d45e170619dd8a7" DEFAULT 0, "verified" bit NOT NULL CONSTRAINT "DF_387f894d12d47a930e39b9e24c9" DEFAULT 0, "profileId" int, CONSTRAINT "UQ_cf10664533065f153bc2a4da86a" UNIQUE ("email"), CONSTRAINT "PK_a7701776dd2cc11a04cb15bf27a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_4f2d196d0a93383c91de7e9fb1" ON "dbo"."User" ("profileId") WHERE "profileId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."User" ADD CONSTRAINT "FK_4f2d196d0a93383c91de7e9fb19" FOREIGN KEY ("profileId") REFERENCES "dbo"."Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."User" DROP CONSTRAINT "FK_4f2d196d0a93383c91de7e9fb19"`);
        await queryRunner.query(`DROP INDEX "REL_4f2d196d0a93383c91de7e9fb1" ON "dbo"."User"`);
        await queryRunner.query(`DROP TABLE "dbo"."User"`);
        await queryRunner.query(`DROP TABLE "dbo"."Profile"`);
    }

}
