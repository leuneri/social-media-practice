import jwt from "jsonwebtoken";

    export const verifyToken = async (req, res, next) => {
        try {
            let token = req.header("Authorization");
// grabbing authorization header from req on the frontend
		if (!token) {
			return res.status(403).send("Access Denied");
		}

		if (token.startsWith("Bearer ")) {
			token = token.slice(7, token.length).trimLeft();
// takes everything in string except Bearer
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next(); // function from verifyToken above, process to next step of function
	} catch (err) {
		res.status(500).json({ error:err.message })
    }
}