import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
}

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
	
		const friends = await Promise.all(
// Promise.all() is method that takes iterable (such as an array) of promises as input and returns a new promise.
			user.friends.map((id) => User.findById(id)
            ));
// get each of the users from user.friends and gets all their info into an array of json object format
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath }
			}
            // format all information to only the info that we want per friend
		);
// format friends for the frontend to use
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
}


/* UPDATE */
export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
// remove friend if user has friend in their friends list
			user.friends = user.friends.filter((id) => id !== friendId);
// basically removing friendId from user.friends -> copy only where friendId doesn't exist
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
            // If not there, then add friend instead
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath }
			}
		);

		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
}