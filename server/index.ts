// import "./models/db";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "./models/db";
import cookieParser from "cookie-parser";
const app = express();
// ----------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ----------------------------------------------
const validateCookie = (req: Request) => {
    if (req.cookies.access_token !== "Abhishek") {
        return false;
    } else {
        return true;
    }
};
function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log(req.body);

    const validateCredentials = (email: string, password: string) => {
        console.log(email, password);
        return true;
    };

    const isValidatedUser = validateCredentials(email, password);

    next();
}
// ----------------------------------------------
app.listen("3000", () => {
    console.log("Listening");
});

app.get("/", (req, res: Response) => {
    console.log(res.cookie);
    res.send("I am up and running");
});

app.get("/users/signup", (req, res) => {
    res.cookie("access_token", "Abhishek");
    res.send("Sign up successful");
});

app.get("/users/signin", (req, res) => {
    res.cookie("access_token", "Abhishek");
    console.log("Sign in with get successful");
    res.end();
});

app.post("/users/signin", authenticateUser, (req, res) => {
    res.cookie("access_token", "Abhishek");
    console.log("Sign in with post successful");
    res.end();
});

app.get("/users/signout", (req, res) => {
    res.clearCookie("access_token");
    console.log("Cookies has been cleared.");
    res.end();
});

app.post("/users/signup", (req, res) => {
    res.cookie("access_token", "Abhishek");
    console.log("sign up with post successful");
    res.end();
});

app.get("/users/email", (req, res) => {
    if (!req.cookies.access_token) return res.json("");
    return res.json(req.cookies.access_token);
});

app.get("/data/notes", (req, res) => {
    const isCookieValid = validateCookie(req);
    console.log(req.cookies);

    if (!isCookieValid) return res.json({});

    const initialNote = [
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

    res.json(initialNote);
});
