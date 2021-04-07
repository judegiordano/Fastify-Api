import { FastifyInstance } from "fastify";

import User from "../../Repositories/UserRepository";
import * as Schemas from "../../Types/Schemas/Dev";

interface IUserAssert {
	Params: { id: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.delete<IUserAssert>("/user/delete/:id", {
		preValidation: [fastify.restriction],
		schema: Schemas.getUserSchema
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
		schema: Schemas.revokeTokenSchema
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
		schema: Schemas.getUserSchema
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