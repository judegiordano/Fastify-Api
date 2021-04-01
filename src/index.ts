import "reflect-metadata";
import cluster from "cluster";

import config from "./Helpers/Config";
import fastify from "./Services/Server";
import log from "./Services/Log";
import connect from "./Services/Database";

const start = async () => {
	try {
		await connect();
		await fastify.listen(config.PORT);
		log.info(`${config.NODE_ENV} worker started on http://${config.HOST}:${config.PORT}/api/${config.VERSION}/docs/`);
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};

if (cluster.isMaster) {
	for (let i = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else start();