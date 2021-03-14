/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { cwd } from "process";
import cors from "fastify-cors";
import swagger from "fastify-swagger";
import rateLimit from "fastify-rate-limit";
import helmet from "fastify-helmet";
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import { register } from "./Register";
import Jwt from "../Helpers/Jwt";
import config from "../Helpers/Config";
import Utility from "../Helpers/Utility";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
	logger: config.IS_PROD ? false : true
});

server.register(cors, {
	origin: "*",
	allowedHeaders: ["Authorization"],
	exposedHeaders: ["Authorization"]
});

server.register((helmet), {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: [
				"'unsafe-inline'",
				"'self'",
				(res: any) => {
					return res.scriptNonce = Utility.RandomNumber().toString();
				}
			],
			styleSrc: [
				"'unsafe-inline'",
				"'self'",
				(res: any) => {
					return res.styleNonce = Utility.RandomNumber().toString();
				}
			]
		}
	}
});

server.decorate("validate", async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const token = request.headers.authorization.split(" ")[1];
		if (!token) {
			reply.statusCode = 401;
			throw new Error("not authorized");
		}
		request.jwt = await Jwt.Verify(token);
	} catch (err) {
		reply.send(err);
	}
});

server.decorate("restriction", async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		if (request.headers.apprestriction !== config.APP_RESTRICTION) {
			reply.statusCode = 401;
			throw new Error("not authorized");
		}
	} catch (err) {
		reply.send(err);
	}
});

server.register(rateLimit, {
	global: true,
	max: 3000,
	whitelist: ["127.0.0.1"],
	keyGenerator: (req: FastifyRequest) => {
		return (req.headers["x-real-ip"] as string) || (req.headers["x-client-ip"] as string) || req.ip;
	}
});

server.register(swagger, {
	routePrefix: `/api/${config.VERSION}/docs`,
	swagger: {
		info: {
			title: "Unknown",
			description: "API documentation for this service",
			version: "1.0.0",
		},
		host: `${config.HOST}:${config.PORT}`,
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"],
		tags: []
	},
	exposeRoute: true
});

register(path.join(cwd(), "./build/Controllers/"), async (file: string) => {
	if (path.extname(file) === ".js" && /^.*controller.*\.js$/i.test(file)) {
		await server.register(import(file), { prefix: `/api/${config.VERSION}` });
	}
});

export default server;