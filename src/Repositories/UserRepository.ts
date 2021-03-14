import { User } from "../Models/User";

import Password from "../Helpers/Password";
import { ILogin, IRegister } from "../Types/Abstract";

export default class UserRepository {

	public static async Register(req: IRegister): Promise<User> {
		try {
			const exists: User = await User.findOne({ where: [{ username: req.username }, { email: req.email }] });
			if (exists) throw "username / email taken";

			const newUser: User = new User();
			newUser.username = req.username;
			newUser.email = req.email;
			newUser.created = new Date();
			newUser.lastUpdated = new Date();
			newUser.password = await Password.Hash(req.password);

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

	public static async DeleteUser(id: number): Promise<User> {
		try {
			const exists: User = await User.findOne({ id: id });
			if (!exists) throw "user not found";

			return await User.remove(exists);
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetUser(id: number): Promise<User> {
		try {
			const exists: User = await User.findOne({ id: id });
			if (!exists) throw "user not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}
}