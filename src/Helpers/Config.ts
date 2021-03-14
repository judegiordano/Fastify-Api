import "dotenv/config";
import path from "path";
import os from "os";

import { Env, Host } from "../Types/Constants";

const config = {
	VERSION: <string>process.env.VERSION || "v1",
	APP_RESTRICTION: <string>process.env.APP_RESTRICTION || undefined,
	PORT: <number>parseInt(process.env.PORT as string) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_REFRESH_SECRET: <string>process.env.JWT_REFRESH_SECRET || undefined,
	JWT_EXPIRATION: <string | number>(60 * 1),
	NODE_ENV: <Env>process.env.NODE_ENV || Env.dev,
	DB_TYPE: <string>process.env.DB_TYPE || undefined,
	DB_NAME: <string>process.env.DB_NAME || undefined,
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod) ? true : false,
	IS_COMPILED: <boolean>(path.extname(__filename).includes("js")) ? true : false,
	CORES: <number>os.cpus().length,
};

if (config.DB_TYPE === undefined)
	throw Error("DB_TYPE not specified");
else if (config.DB_NAME === undefined)
	throw Error("DB_NAME not specified");
else if (config.JWT_SECRET === undefined)
	throw Error("JWT_SECRET not specified");
else if (config.JWT_REFRESH_SECRET === undefined)
	throw Error("JWT_REFRESH_SECRET not specified");
else if (config.APP_RESTRICTION === undefined)
	throw Error("APP_RESTRICTION not specified");

export default config;
