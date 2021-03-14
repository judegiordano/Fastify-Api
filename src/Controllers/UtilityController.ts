import { FastifyInstance } from "fastify";

import Utility from "../Helpers/Utility";

const randomSchema = {
	required: "length",
	querystring: {
		length: {
			type: "number",
			maximum: 100,
			minimum: 1
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
						random: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

interface IRandomAssert {
	Querystring: { length: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.get<IRandomAssert>("/utility/random", {
		schema: randomSchema
	}, async (request, response) => {
		try {
			return {
				ok: true,
				status: response.statusCode,
				data: {
					random: Utility.RandomUid(request.query.length)
				}
			};
		} catch (error) {
			throw new Error(error);
		}
	});
});