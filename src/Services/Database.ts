import path from "path";
import { cwd } from "process";
import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";

import config from "../Helpers/Config";
import log from "../Services/Log";

const orm = {
	type: config.DB_TYPE,
	host: config.DB_HOST,
	port: config.DB_PORT,
	username: config.DB_USERNAME,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
	synchronize: config.DB_SYNC,
	logging: config.DB_LOGGING,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: [path.join(cwd(), "build/Models/**/*.js")]
} as ConnectionOptions;

export default async (): Promise<void> => {
	let connection: Connection | undefined;
	try {
		connection = getConnection();
	} catch (e) {
		log.error("error connecting to database", e);
	}

	try {
		if (connection) {
			if (!connection.isConnected)
				await connection.connect();
		} else
			await createConnection(orm);
		log.info("successfully connected to database");
	} catch (e) {
		log.error("error connecting to database", e);
		throw Error(e);
	}
};
