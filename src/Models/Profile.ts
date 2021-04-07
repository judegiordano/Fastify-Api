import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Profile")
export class Profile extends BaseEntity {

	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column({ name: "photo", type: "nvarchar", nullable: true, length: "MAX" })
	photo: string;
}