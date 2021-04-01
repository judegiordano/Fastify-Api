export interface IJwtPayload {
	id: number,
	tokenVersion: number
	email?: string,
	iat?: number,
	exp?: number
}