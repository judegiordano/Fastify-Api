import jwt from "jsonwebtoken";

import config from "./Config";
import { IJwtPayload } from "../Types/Jwt";

export default class Jwt {

	public static async Sign(payload: IJwtPayload): Promise<string> {
		try {
			return jwt.sign(payload, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Verify(token: string): Promise<IJwtPayload> {
		try {
			const data = jwt.verify(token, config.JWT_SECRET) as IJwtPayload;
			return {
				id: data.id,
				created: data.created,
				username: data.username,
				email: data.email,
				iat: data.iat,
				exp: data.exp
			};
		} catch (error) {
			throw Error(error);
		}
	}
}