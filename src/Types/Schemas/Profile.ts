export const ProfileSchema = {
	type: "object",
	properties: {
		id: {
			type: "number"
		},
		photo: {
			type: "string"
		}
	}
};

export const getProfileSchema = {
	tags: ["Profile"],
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

export const updateProfileSchema = {
	tags: ["Profile"],
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
		},
	}
};