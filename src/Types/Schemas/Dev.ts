import { UserSchema } from "./User";

export const randomSchema = {
	tags: ["Dev"],
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
					type: "string"
				}
			}
		},
	}
};

export const getUserSchema = {
	tags: ["Dev"],
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

export const revokeTokenSchema = {
	tags: ["Dev"],
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