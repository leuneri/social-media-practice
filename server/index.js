import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js";


/* CONFIGURATIONS -> runs between requests */
const __filename = fileURLToPath(import.meta.url); // Grab file URL
const __dirname = path.dirname(__filename); // Only for type: modules in package.json
dotenv.config(); // Can use dot.env files
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// For above stuff, settings on website to see what configurations do if want to
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
// ^ sets directory of where we keep assets (images) -> usually want to add to AWS S3

/* FILE STORAGE */
const storage = multer.diskStorage( {
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({ storage });
// ^ most just come from package instructions -> github repo of multer

/* AUTHENTICATION & AUTHORIZATION */
/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
// Hit this route^ and then use middleware (upload picture locally to public/assets folder and occurs before the next logic), then registers
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// grabs picture from frontend in http call then upload

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // if port doesn't work, go to 6001
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParse: true,
	useUnifiedTopology: true,
}).then(() => {
	app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); //Confirm that we're sending to right port

	// /* ADD DATA ONE TIME */
	// User.insertMany(users);
	// Post.insertMany(posts);

}).catch((error) => console.log(`${error} did not connect`));
