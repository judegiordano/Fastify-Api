
export interface IJwtPayload {
	id: number,
	created: Date,
	username: string,
	email: string,
	iat?: number,
	exp?: number
}