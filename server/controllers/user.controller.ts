import { MyRequest } from "../middlewares/auth";
import userData from "../models/user.model";
import bcrypt from "bcrypt";
import { generateTokens } from "../services/token.service";
import { getUserEmail } from "..";

const signout = async (req: MyRequest, res: any) => {
    const email = getUserEmail(req);
    const refreshToken = JSON.parse(req.cookies.tokens).refreshToken;

    await userData.findOneAndUpdate(
        { email },
        { $pull: { sessions: refreshToken } },
        { new: true }
    );

    res.clearCookie("tokens");
    console.log("Cookies has been cleared.");
    return res.status(204).end();
};

const signin = async (req: MyRequest, res: any) => {
    const { email, password } = req.body;

    // -------------------- Validity Check -----------------------
    const currentUser = await userData.findOne({ email });

    if (currentUser === null) {
        console.log("User doesn't exist.");
        return res.status(400).send("Sorry, the user doesn't exist.");
    }

    const passwordInDatabase: string | undefined = currentUser.password;

    let isPasswordValid =
        passwordInDatabase && (await bcrypt.compare(password, passwordInDatabase));

    if (!isPasswordValid) return res.status(401).send("Sorry the password is wrong.");

    // -------------------- Validity Check -----------------------
    // -------------------- GENERATE JWT -----------------------
    const { accessToken, refreshToken } = generateTokens({ email });

    // -------------------- GENERATE JWT -----------------------
    // -------------------- STORE IT TO DATABASE -----------------------
    const updatedData = { sessions: [...currentUser.sessions, refreshToken] };
    await userData.findOneAndUpdate({ email: email }, updatedData);

    // -------------------- STORE IT TO DATABASE -----------------------
    console.log("sign in with post successful");
    return res
        .status(201)
        .cookie(
            "tokens",
            JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
            {
                sameSite: "None",
                secure: true,
            }
        )
        .end();
};

const signup = async (req: MyRequest, res: any) => {
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
        return res.status(409).send("Sorry, the email already exists");
    }

    // -------------------- Validity Check -----------------------
    // -------------------- GENERATE JWT -----------------------
    const { accessToken, refreshToken } = generateTokens({ email });

    // -------------------- GENERATE JWT -----------------------
    // -------------------- STORE IN DATABASE -----------------------
    const COST_FACTOR = 10;
    let encryptedPassword: string = password;
    let salt;

    try {
        salt = await bcrypt.genSalt(COST_FACTOR);
        encryptedPassword = await bcrypt.hash(password, salt);
    } catch (e) {
        console.log("Error in encrypting the password. ", e);
    }

    const userDataToStore = {
        email,
        password: encryptedPassword,
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
    console.log("Sign up with post successful");

    return res
        .status(201)
        .cookie(
            "tokens",
            JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
            {
                sameSite: "None",
                secure: true,
            }
        )
        .end();
};

const signOutFromAllSessions = async (req: MyRequest, res: any) => {
    const email: string = getUserEmail(req);
    try {
        await userData.findOneAndUpdate({ email }, { $set: { sessions: [] } });
    } catch (e) {
        console.log("Failed to signout from all sessions");
    }
    res.clearCookie("token").status(204).end();
};

const getEmail = (req: MyRequest, res: any) => {
    const email: string = getUserEmail(req);

    return res.status(200).json(email);
};

export default {
    signout,
    signin,
    signup,
    getEmail,
    signOutFromAllSessions,
};
