// import "./models/db";
import express, { Request, Response } from "express";
import cors from "cors";
import "./models/db";
import cookieParser from "cookie-parser";
import userRouter, { generateTokens } from "./routes/userRoute";
import { config } from "dotenv";
config();
import jwt, { JwtPayload } from "jsonwebtoken";
import userData from "./models/userModel";
import { INote } from "./models/userModel";
const app = express();
// ----------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/users", userRouter);

export const getAccessToken = (req: Request) => {
    const extractedAccessToken: string = getAccessTokenFromRequest(req);
    const extractedRefreshToken: string = getRefreshTokenFromRequest(req);

    let decodedToken;
    try {
        decodedToken = jwt.verify(extractedAccessToken, process.env.ACCESS_TOKEN_KEY!);
    } catch (err) {
        decodedToken = null;
    }

    if (decodedToken) return extractedAccessToken;

    let refreshDecoded: any;
    try {
        refreshDecoded = jwt.verify(extractedRefreshToken, process.env.REFRESH_TOKEN_KEY!);
    } catch (err) {
        refreshDecoded = null;
    }

    if (!refreshDecoded) return "";

    const { accessToken } = generateTokens(refreshDecoded.email);

    return accessToken;
};

export const getPayloadFromToken = (access_token: string) => {
    const decodedJWT: any = jwt.decode(access_token) || {};
    // const decodedJWT: string | jwt.JwtPayload = jwt.decode(access_token) || {};
    return decodedJWT;
};

const getNoteFromEmail = async (email: string) => {
    const currentUser = await userData.findOne({ email }, { noteList: true });
    return currentUser?.noteList || [];
};

export const getAccessTokenFromRequest = (req: Request) => {
    const tokens_string: string = req?.cookies?.tokens;
    const tokens = tokens_string && JSON.parse(tokens_string);
    const access_token: string = tokens?.accessToken || "";

    return access_token;
};

export const getRefreshTokenFromRequest = (req: Request) => {
    const tokens_string: string = req?.cookies?.tokens || "";
    const tokens = tokens_string && JSON.parse(tokens_string);
    const refresh_token: string = tokens?.refreshToken || "";

    return refresh_token;
};

export interface IPayload {
    email?: string;
    iat?: number;
    exp?: number;
}

// ----------------------------------------------
export const getUserEmail = (req: Request) => {
    const access_token: string = getAccessTokenFromRequest(req);
    const payload: any = getPayloadFromToken(access_token);
    const email: string = payload?.email || "";

    return email;
};

// ----------------------------------------------

// ----------------------------------------------

app.listen("3000", () => {
    console.log("Listening");
});

app.get("/data/notes", async (req, res) => {
    const access_token: string = getAccessToken(req);

    const extractedPayload: any = getPayloadFromToken(access_token);

    let notes: any = [
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

    if (extractedPayload) notes = await getNoteFromEmail(extractedPayload.email);

    res.status(200).json(notes);
});
