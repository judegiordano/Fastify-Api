module.exports = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: process.env.DB_SYNC == "true" ? true : false,
	logging: process.env.DB_LOGGING == "true" ? true : false,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: ["build/Models/**/*.js"],
	migrations: ["src/Migrations/**/*.ts"],
	cli: {
		entitiesDir: "build/Models",
		migrationsDir: "src/Migrations",
	}
};