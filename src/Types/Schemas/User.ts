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

export const registerSchema = {
	tags: ["User"],
	body: {
		type: "object",
		required: ["username", "email", "password"],
		properties: {
			username: {
				type: "string"
			},
			email: {
				type: "string"
			},
			password: {
				type: "string"
			}
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
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

export const validateSchema = {
	tags: ["User"],
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
						id: {
							type: "number"
						},
						iat: {
							type: "number"
						},
						exp: {
							type: "number"
						}
					}
				}
			}
		},
	}
};

export const loginSchema = {
	tags: ["User"],
	body: {
		type: "object",
		required: ["username", "password"],
		properties: {
			username: {
				type: "string"
			},
			password: {
				type: "string"
			}
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
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};

export const refreshSchema = {
	tags: ["User"],
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
						token: {
							type: "string"
						}
					}
				}
			}
		},
	}
};