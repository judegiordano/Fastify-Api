import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumn1617308718963 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn("User", new TableColumn({
			name: "test",
			type: "varChar"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("User", "test");
	}

}
