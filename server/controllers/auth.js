import bcrypt from "bcrypt"; // Encrypt password
import jwt from "jsonwebtoken"; // give web token for authorization
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => { 
// async since calling to mongoDB, like API call
// req for request body from frontend, res for response to send to frontend
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation
		} = req.body // extract and structure from req.body
// front end needs to structure request body this way
		const salt = await bcrypt.genSalt();
// await is to wait until this function is executed before moving on
// make a random salt from bcrypt -> encryption -> use to encrypt password
		const passwordHash = await bcrypt.hash(password, salt);
// encrypt password by hashing with salt
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,     // NEW, save as password hash
			picturePath,
			friends,
			location,
			occupation,
// stuff below is added but for simplicity is random
			viewedProfile: Math.floor(Math.random() * 1000),
			impressions: Math.floor(Math.random() * 1000),
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser); //send status 201 if everything works so far, 201 for something created
// create json for savedUser so frontend gets response


	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/* LOGGING IN */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
// check into mongoose to find user info for user with that email
		if (!user) return res.status(400).json({ msg: "User does not exist. " });

		const isMatch = await bcrypt.compare(password, user.password);
// use same salt to if both passwords use the same hash
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// sign with user id and pass in secret string to make token

// Flow is encrypt password, save encryption, 
// when user provides password then salt and check if correct
// Then give JWT token if correct
        delete user.password;
// important to delete password so it is safe and not sent back to frontend
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}