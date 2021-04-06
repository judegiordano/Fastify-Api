import { Profile } from "../Models/Profile";

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
}