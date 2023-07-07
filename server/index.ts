import express, { Request } from "express";
import cors from "cors";
import "./configs/db";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import noteRouter from "./routes/note.route";
import { config } from "dotenv";
config();
import userData from "./models/user.model";
import { getAccessTokenFromRequest, getPayloadFromToken } from "./services/token.service";
import { limiter } from "./configs/ratelimit";

const app = express();
// ----------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ["https://xd-noteflow.netlify.app", "http://localhost:5173"],
        credentials: true,
    })
);
app.use("/notes", limiter);
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

export const getNoteFromEmail = async (email: string) => {
    const currentUser = await userData.findOne({ email }, { noteList: true });
    return currentUser?.noteList || [];
};

export interface IPayload {
    email?: string;
    iat?: number;
    exp?: number;
}

// ----------------------------------------------

export const getUserEmail = (req: Request) => {
    const accessToken: string = getAccessTokenFromRequest(req);
    const payload: any = getPayloadFromToken(accessToken);
    const email: string = payload?.email || "";

    return email;
};

// ----------------------------------------------

app.listen("3000", () => {
    console.log("Listening");
});
