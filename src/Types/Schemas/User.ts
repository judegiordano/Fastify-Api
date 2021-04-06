import { ProfileSchema } from "./Profile";

export const UserSchema = {
	type: "object",
	properties: {
		id: {
			type: "number"
		},
		username: {
			type: "string"
		},
		// password: {
		// 	type: "string"
		// },
		email: {
			type: "string"
		},
		tokenVersion: {
			type: "number"
		},
		created: {
			type: "string"
		},
		lastUpdated: {
			type: "string"
		},
		profile: ProfileSchema
	}
};