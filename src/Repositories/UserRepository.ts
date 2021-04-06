import path from "path";
import { cwd } from "process";

import { User } from "../Models/User";
import { Profile } from "../Models/Profile";
import Password from "../Helpers/Password";
import { ILogin, IRegister } from "../Types/Abstract";
import Utility from "../Helpers/Utility";

export default class UserRepository {

	public static async Register(req: IRegister): Promise<User> {
		try {
			const exists: User = await User.findOne({ where: [{ username: req.username }, { email: req.email }] });
			if (exists) throw "username / email taken";

			const profile = new Profile();
			profile.photo = Utility.EncodeBase64(path.join(cwd(), "static/default_profile.png"));
			await profile.save();

			const newUser: User = new User();
			newUser.username = req.username;
			newUser.email = req.email;
			newUser.password = await Password.Hash(req.password);
			newUser.profile = profile;

			return await newUser.save();
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Login(req: ILogin): Promise<User> {
		try {
			const exists: User = await User.findOne({ username: req.username });
			if (!exists) throw "username not found";

			const pass: boolean = await Password.Compare(req.password, exists.password);
			if (!pass) throw "incorrect password";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Increment(id: number): Promise<boolean> {
		try {
			const exists: User = await User.findOne({ id });
			if (!exists) throw "user not found";

			exists.tokenVersion += 1;
			exists.save();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async DeleteUser(id: number): Promise<User> {
		try {
			const exists: User = await User.findOne({ id });
			if (!exists) throw "user not found";

			return await User.remove(exists);
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetUser(id: number): Promise<User> {
		try {
			const exists = await User.findOne({ where: { id }, relations: ["profile"] }) as User;
			if (!exists) throw "user not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}
}