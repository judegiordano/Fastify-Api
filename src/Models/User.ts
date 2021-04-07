import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Profile } from "./Profile";

@Entity("User")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "email", nullable: false, length: 255, unique: true })
	email: string;

	@Column("varchar", { name: "password", nullable: false, length: 255 })
	password: string;

	@Column("varchar", { name: "username", nullable: false, length: 255 })
	username: string;

	@Column("datetime", { name: "created", nullable: false, default: () => "GETDATE()" })
	created: Date;

	@Column("int", { name: "tokenVersion", nullable: false, default: 0 })
	tokenVersion: number;

	@Column("bit", { name: "verified", nullable: false, default: 0 })
	verified: boolean;

	@OneToOne(() => Profile, { cascade: true })
	@JoinColumn()
	profile: Profile
}