import express from "express";
const router=express.Router();
import { login, signup } from "../Controller/User.Controller.js";

router.post("/signup",signup);
router.post("/login",login);

export default router;