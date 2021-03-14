import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity("User", { schema: "dbo" })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "username", nullable: false, length: 255 })
	username: string | null;

	@Column("varchar", { name: "password", nullable: false, length: 255 })
	password: string;

	@Column("varchar", { name: "email", nullable: false, length: 255 })
	email: string;

	@Column("datetime", { name: "created", nullable: false })
	created: Date;

	@Column("datetime", { name: "lastUpdated", nullable: true })
	lastUpdated: Date | null;
}