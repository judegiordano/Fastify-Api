import { FastifyInstance } from "fastify";

import Profile from "../../Repositories/ProfileRepository";
import * as Schemas from "../../Types/Schemas/Profile";

interface IUserAssert {
	Params: { id: number }
}

export default (async (fastify: FastifyInstance): Promise<void> => {

	fastify.get<IUserAssert>("/profile/:id", {
		schema: Schemas.getProfileSchema
	}, async (request, response) => {
		try {
			const profile = await Profile.GetProfile(request.params.id);
			const image: Buffer = Buffer.from(profile.photo, "base64");
			return response.type("image/png").send(image);
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.post("/profile/update", {
		schema: Schemas.updateProfileSchema,
		preValidation: [fastify.validate],
	}, async (request, response) => {
		try {
			const data = await request.file();
			const buff = await data.toBuffer();
			const newProfile = await Profile.UpdateProfile(request.jwt.id, buff);
			return {
				ok: true,
				status: response.statusCode,
				data: newProfile
			};
		} catch (error) {
			throw new Error(error);
		}
	});
});