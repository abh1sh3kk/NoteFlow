import express from "express";
import cookieParser from "cookie-parser";
import UserController from "./../controllers/user.controller";
import { populateWithNotes } from "./data.route";
const router = express.Router();
router.use(cookieParser());

router.get("/signout", UserController.signout);

router.post("/signin", UserController.signin);

router.post("/signup", UserController.signup);

router.get("/email", UserController.getEmail);

router.get("/data/populate", populateWithNotes);

export default router;
