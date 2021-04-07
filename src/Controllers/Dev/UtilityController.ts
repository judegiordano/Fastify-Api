import { FastifyInstance } from "fastify";

import Utility from "../../Helpers/Utility";
import * as Schemas from "../../Types/Schemas/Dev";

interface IRandomAssert {
	Querystring: { length: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.get<IRandomAssert>("/utility/random", {
		schema: Schemas.randomSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: Utility.RandomUid(request.query.length)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
});