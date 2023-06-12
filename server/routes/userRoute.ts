import express from "express";
import jwt from "jsonwebtoken";
import userData from "../models/userModel";
import bcrypt from "bcrypt";
import { authenticateUser } from "../middlewares/auth";
const router = express.Router();

router.get("/signup", (req, res) => {
    res.cookie("access_token", "Abhishek");
    res.send("Sign up successful");
});

router.get("/signin", (req, res) => {
    res.cookie("access_token", "Abhishek");
    console.log("Sign in with get successful");
    res.end();
});

router.post("/signin", authenticateUser, (req, res) => {
    res.cookie("access_token", "Abhishek");
    console.log("Sign in with post successful");
    res.end();
});

router.get("/signout", (req, res) => {
    res.clearCookie("access_token");
    console.log("Cookies has been cleared.");
    res.end();
});

router.post("/signup", async (req, res) => {
    console.log(req.body.email, req.body.password);
    const { email, password } = req?.body;

    // -------------------- Validity Check -----------------------
    async function emailAlreadyExists(email: string) {
        try {
            const userFound = await userData.findOne({ email: email });
            return userFound;
        } catch (e) {
            console.log("Error while finding the user", e);
        }
    }

    const userExists = await emailAlreadyExists(email);
    if (userExists) {
        return res.status(400).send("Sorry, the email already exists");
    }
    // -------------------- Validity Check -----------------------

    // -------------------- GENERATE JWT -----------------------

    const ACCESS_TOKEN_KEY = "SOME_RANDOM_KEY";
    const REFRESH_TOKEN_KEY = "SOME_RANDOM_KEY_2";

    const accessToken = jwt.sign({ email }, ACCESS_TOKEN_KEY, {
        algorithm: "HS256",
        expiresIn: "10m",
    });

    const refreshToken: string = jwt.sign({ email }, REFRESH_TOKEN_KEY, {
        algorithm: "HS256",
        expiresIn: "1y",
    });

    // -------------------- GENERATE JWT -----------------------

    // -------------------- STORE IN DATABASE -----------------------
    const COST_FACTOR = 10;
    let encryptedPassword: string = "nonencryptedpw";
    let salt;

    try {
        salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);
    } catch (e) {
        console.log("Error in encrypting the password. ", e);
    }

    const userDataToStore = {
        email,
        encryptedPassword,
        noteList: [],
        sessions: [refreshToken],
    };
    try {
        await userData.create(userDataToStore);
    } catch (e) {
        console.log("Error in inserting into db", e);
    }

    // -------------------- STORE IN DATABASE -----------------------

    // -------------------- RETURN THE RESPONSE -----------------------

    res.cookie("tokens", JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }));
    console.log("sign up with post successful");
    return res.status(200).json({ accessToken, refreshToken });

    // -------------------- RETURN THE RESPONSE -----------------------

    res.end();
});

router.get("/email", (req, res) => {
    if (!req.cookies.access_token) return res.json("");
    return res.json(req.cookies.access_token);
});

export default router;
