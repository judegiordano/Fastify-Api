import { FastifyInstance } from "fastify";

import User from "../../Repositories/UserRepository";
import { UserSchema } from "../../Types/Schemas/User";

const getUserSchema = {
	params: {
		id: {
			type: "number",
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
				data: UserSchema
			}
		}
	}
};

const revokeTokenSchema = {
	params: {
		id: {
			type: "number",
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
					type: "boolean"
				}
			}
		}
	}
};

interface IUserAssert {
	Params: { id: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.delete<IUserAssert>("/user/delete/:id", {
		preValidation: [fastify.restriction],
		schema: getUserSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: await User.DeleteUser(request.params.id)
			};
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.post<IUserAssert>("/user/revoketoken/:id", {
		preValidation: [fastify.restriction],
		schema: revokeTokenSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: await User.Increment(request.params.id)
			};
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.get<IUserAssert>("/user/:id", {
		preValidation: [fastify.restriction],
		schema: getUserSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: await User.GetUser(request.params.id)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
});