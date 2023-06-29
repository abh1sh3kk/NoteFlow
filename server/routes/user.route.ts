import express from "express";
import cookieParser from "cookie-parser";
import UserController from "./../controllers/user.controller";
const router = express.Router();
router.use(cookieParser());

router.get("/signout", UserController.signout);

router.post("/signin", UserController.signin);

router.post("/signup", UserController.signup);

router.get("/email", UserController.getEmail);

router.get("/signoutAll", UserController.signOutFromAllSessions)

export default router;
