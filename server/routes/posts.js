import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
// grab all post in the database when in the homepage
// nowadays will have algorithm (some AI or machine learning algorithm)
// such that those feeds are relevant
router.get("/:userId/posts", verifyToken, getUserPosts);
// only get posts from the user

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;