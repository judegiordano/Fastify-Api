import "dotenv/config";
import path from "path";
import os from "os";

import { Env, Host } from "../Types/Constants";

const config = {
	NODE_ENV: <Env>process.env.NODE_ENV || Env.dev,
	PORT: <number>parseInt(process.env.PORT as string) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	VERSION: <string>process.env.VERSION || "v1",
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod) ? true : false,
	IS_COMPILED: <boolean>(path.extname(__filename).includes("js")) ? true : false,
	APP_RESTRICTION: <string>process.env.APP_RESTRICTION || undefined,
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: <string | number>(60 * 15),
	JWT_REFRESH_SECRET: <string>process.env.JWT_REFRESH_SECRET || undefined,
	JWT_REFRESH_EXPIRATION: <string | number>(60 * 60 * 24 * 7),
	COOKIE_SECRET: <string>(process.env.COOKIE_SECRET) || undefined,
	CORES: <number>os.cpus().length,
};

if (config.JWT_SECRET === undefined)
	throw Error("JWT_SECRET not specified");
else if (config.JWT_REFRESH_SECRET === undefined)
	throw Error("JWT_REFRESH_SECRET not specified");
else if (config.APP_RESTRICTION === undefined)
	throw Error("APP_RESTRICTION not specified");

export default config;
