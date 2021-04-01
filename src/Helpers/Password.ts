import argon from "argon2";

export default class Password {

	public static async Hash(string: string): Promise<string> {
		try {
			return await argon.hash(string);
		} catch (e) {
			throw Error(e);
		}
	}

	public static async Compare(pass: string, hash: string): Promise<boolean> {
		try {
			return await argon.verify(hash, pass);
		} catch (e) {
			throw Error(e);
		}
	}
}
