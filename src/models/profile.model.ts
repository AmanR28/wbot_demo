import { Schema, model, Model } from "mongoose";

export interface IUserProfile {
	userId: string;
	state: string;
	name: string;
}

export interface IUserProfileModel extends Model<IUserProfile> {
	getOrCreate(userId: string): Promise<IUserProfile>;
}

const userProfile = new Schema<IUserProfile>({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	state: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
});

userProfile.statics.getOrCreate = async function (userId: string) {
	let user = await UserProfile.findOne({ userId });

	if (!user) {
		user = await UserProfile.create({
			userId,
		});
	}

	return user;
};

export const UserProfile = model<IUserProfile, IUserProfileModel>(
	"UserProfile",
	userProfile,
	"user_profile"
);
