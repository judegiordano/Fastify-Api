export const UserSchema = {
	type: "object",
	properties: {
		id: {
			type: "number"
		},
		username: {
			type: "string"
		},
		password: {
			type: "string"
		},
		email: {
			type: "string"
		},
		created: {
			type: "string"
		},
		lastUpdated: {
			type: "string"
		}
	}
};