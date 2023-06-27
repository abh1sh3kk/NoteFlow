import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userData from "../models/userModel";
import bcrypt from "bcrypt";
import { MyRequest, authenticateUser } from "../middlewares/auth";
import { config } from "dotenv";
import { getAccessTokenFromRequest, getPayloadFromToken, getUserEmail } from "..";
import cookieParser from "cookie-parser";
config();
const router = express.Router();
router.use(cookieParser());

export const generateTokens = (payload: any) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
        algorithm: "HS256",
        // until I find a way to handle the error when jwt expires
        expiresIn: "1y",
    });

    const refreshToken: string = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
        expiresIn: "1y",
    });

    return { accessToken, refreshToken };
};

// ---------------------Test-----------------
router.get("/email", (req, res) => {
    const email: string = getUserEmail(req);

    return res.status(200).json(email);
});

router.get("/signup", (req, res) => {
    res.cookie("access_token", "Abhishek");
    res.send("Sign up successful");
});

router.get("/signin", (req, res) => {
    const tokens = generateTokens({ email: "abhishekacharya171@gmail.com" });

    console.log("get signin token new", tokens);
    console.log("Sign in with get successful");
    res.cookie("access_token", "Abhishek").cookie("tokens", JSON.stringify(tokens)).end();
});

// ---------------------Real-----------------
router.get("/signout", (req, res) => {
    // res.clearCookie("accesstoken");
    res.clearCookie("tokens");
    console.log("Cookies has been cleared.");
    return res.status(204).end();
});

router.post("/signin", async (req: MyRequest, res) => {
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
        .cookie("tokens", JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }))
        .end();
});

router.post("/signup", async (req, res) => {
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
        .cookie("tokens", JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }))
        .end();

    // -------------------- RETURN THE RESPONSE -----------------------
});

router.get("/data/populate", async (req: MyRequest, res) => {
    const email: string = getUserEmail(req);

    let readyMadeNotes = [
        {
            id: 2,
            title: "Abhishek is a hero",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#ded9ff",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "",
        },
        {
            id: 1,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#FFD9EB",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 22, 2023",
        },
        {
            id: 3,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#ded9ff",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 4,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 5,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#DDFFE9",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 6,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 7,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 8,
            title: "Do nothing",
            note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
            color: "#ded9ff",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
    ];

    await userData.findOneAndUpdate({ email }, { noteList: readyMadeNotes });

    return res.status(204);
});

export default router;
