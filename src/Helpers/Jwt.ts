import jwt from "jsonwebtoken";
import { FastifyReply } from "fastify";

import config from "./Config";
import { IJwtPayload } from "../Types/Jwt";
import { User } from "../Models/User";

export default class Jwt {

	public static Sign(user: User): string {
		try {
			return jwt.sign({ id: user.id }, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static Verify(token: string): IJwtPayload {
		try {
			const data = jwt.verify(token, config.JWT_SECRET) as IJwtPayload;
			return {
				id: data.id,
				tokenVersion: data.tokenVersion,
				iat: data.iat,
				exp: data.exp
			};
		} catch (error) {
			throw Error(error);
		}
	}

	public static SignRefresh(user: User): string {
		try {
			return jwt.sign({ id: user.id, tokenVersion: user.tokenVersion }, config.JWT_REFRESH_SECRET, {
				expiresIn: config.JWT_REFRESH_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static VerifyRefresh(token: string): IJwtPayload {
		try {
			const data = jwt.verify(token, config.JWT_REFRESH_SECRET) as IJwtPayload;
			return { id: data.id, tokenVersion: data.tokenVersion };
		} catch (error) {
			throw Error(error);
		}
	}

	public static SetRefreshCookie(response: FastifyReply, user: User): FastifyReply {
		try {
			return response.setCookie("jid", Jwt.SignRefresh(user), {
				httpOnly: true,
				signed: false,
				secure: config.IS_PROD,
				path: "/"
			});
		} catch (error) {
			throw Error(error);
		}
	}
}