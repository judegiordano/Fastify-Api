import { FastifyInstance } from "fastify";

import User from "../../Repositories/UserRepository";
import { ILogin, IRegister } from "../../Types/Abstract";
import Jwt from "../../Helpers/Jwt";

const registerSchema = {
	body: {
		type: "object",
		required: ["username", "email", "password"],
		properties: {
			username: {
				type: "string"
			},
			email: {
				type: "string"
			},
			password: {
				type: "string"
			}
		}
	},
	response: {
		200: {
			type: "object",
			properties: {
				ok: {
					type: "boolean"
				},
				status: {
					type: "number"
				},
				data: {
					type: "object",
					properties: {
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

const validateSchema = {
	response: {
		200: {
			type: "object",
			properties: {
				ok: {
					type: "boolean"
				},
				status: {
					type: "number"
				},
				data: {
					type: "object",
					properties: {
						id: {
							type: "number"
						},
						iat: {
							type: "number"
						},
						exp: {
							type: "number"
						}
					}
				}
			}
		},
	}
};

const loginSchema = {
	body: {
		type: "object",
		required: ["username", "password"],
		properties: {
			username: {
				type: "string"
			},
			password: {
				type: "string"
			}
		}
	},
	response: {
		200: {
			type: "object",
			properties: {
				ok: {
					type: "boolean"
				},
				status: {
					type: "number"
				},
				data: {
					type: "object",
					properties: {
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

const refreshSchema = {
	response: {
		200: {
			type: "object",
			properties: {
				ok: {
					type: "boolean"
				},
				status: {
					type: "number"
				},
				data: {
					type: "object",
					properties: {
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

interface IRegisterAssert {
	Body: IRegister
}

interface ILoginAssert {
	Body: ILogin
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.post<IRegisterAssert>("/user/register", {
		schema: registerSchema
	}, async (request, response) => {
		try {
			const user = await User.Register(request.body);

			Jwt.SetRefreshCookie(response, user);

			return {
				ok: true,
				status: response.statusCode,
				data: { token: Jwt.Sign(user) }
			};
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.post<ILoginAssert>("/user/login", {
		schema: loginSchema
	}, async (request, response) => {
		try {
			const user = await User.Login(request.body);

			Jwt.SetRefreshCookie(response, user);

			return {
				ok: true,
				status: response.statusCode,
				data: { token: Jwt.Sign(user) }
			};
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.post("/user/validate", {
		preValidation: [fastify.validate],
		schema: validateSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: request.jwt
			};
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.post("/user/refresh", {
		schema: refreshSchema
	}, async (request, response) => {
		try {
			const token = request.cookies.jid as string;
			if (!token) throw "unathorized";

			const payload = Jwt.VerifyRefresh(token);
			const user = await User.GetUser(payload.id);

			if (user.tokenVersion !== payload.tokenVersion) {
				throw "invalid token";
			}

			Jwt.SetRefreshCookie(response, user);

			return {
				ok: true,
				status: response.statusCode,
				data: { token: Jwt.Sign(user) }
			};
		} catch (error) {
			throw new Error(error);
		}
	});
});