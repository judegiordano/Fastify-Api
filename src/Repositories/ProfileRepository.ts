import { Profile } from "../Models/Profile";
import Utility from "../Helpers/Utility";

export default class ProfileRepository {

	public static async GetProfile(id: number): Promise<Profile> {
		try {
			const exists = await Profile.findOne({ id }) as Profile;
			if (!exists) throw "profile not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async UpdateProfile(id: number, photo: Buffer): Promise<boolean> {
		try {
			const exists = await Profile.findOne({ id }) as Profile;
			if (!exists) throw "profile not found";

			exists.photo = Utility.BufferToBase64(photo);
			await exists.save();

			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}