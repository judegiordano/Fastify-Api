import { FastifyInstance } from "fastify";

import Profile from "../../Repositories/ProfileRepository";

const getProfileSchema = {
	required: "id",
	params: {
		id: {
			type: "number",
		}
	},
	response: {
		200: {
			type: "string"
		}
	}
};

interface IUserAssert {
	Params: { id: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.get<IUserAssert>("/profile/:id", {
		schema: getProfileSchema
	}, async (request, response) => {
		try {
			const profile = await Profile.GetProfile(request.params.id);
			const image: Buffer = Buffer.from(profile.photo, "base64");
			return response.type("image/png").send(image);
		} catch (error) {
			throw new Error(error);
		}
	});
});