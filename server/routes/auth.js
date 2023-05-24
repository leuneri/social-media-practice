import express from "express";
import { login } from "../controllers/auth.js";

// express can identify these routes will be configured
const router = express.Router();

// we know that website will be ____.com/auth/login from auth in index.js
// since we're using login function
router.post("/login", login);

export default router;



