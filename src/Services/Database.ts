import { Connection, createConnection, getConnection } from "typeorm";

import log from "../Services/Log";
import ORMConfig from "../Helpers/OrmConfig";

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
			await createConnection(ORMConfig);
		log.info("successfully connected to database");
	} catch (e) {
		log.error("error connecting to database", e);
		throw Error(e);
	}
};
