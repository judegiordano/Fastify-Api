/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyInstance } from "fastify";
import { IJwtPayload } from "../Jwt";

declare module "fastify" {
	export interface FastifyInstance {
		/**
		 * verifies a jwt and throws an error if invalid
		 *
		 * @memberof FastifyInstance
		 */
		validate(): void;
		restriction(): void;
	}
	export interface FastifyRequest {
		jwt: IJwtPayload;
	}
}
