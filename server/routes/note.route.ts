import express from "express";
import { config } from "dotenv";
import { getNoteFromEmail, getUserEmail } from "..";
import cookieParser from "cookie-parser";
import { getAccessToken, getPayloadFromToken } from "../services/token.service";
import { populateWithNotes } from "../controllers/note.controller";
import { MyRequest, authenticateUser } from "./../middlewares/auth";
import userData, { INote } from "../models/user.model";
import { getFormattedDate } from "../services/date";
config();
const router = express.Router();
router.use(cookieParser());

router.post("/", authenticateUser, async (req: any, res) => {
    const { id, title, note, color, dateCreated, dateModified } = req.body;

    const email = getUserEmail(req);
    const noteToStore = { id, title, note, color, dateCreated, dateModified };

    try {
        await userData.findOneAndUpdate({ email: email }, { $push: { noteList: noteToStore } });
    } catch (e) {
        console.log("Error in pushing new data");
        return res.status(500).send("Data inserstion failed").end();
    }

    console.log("Added Successfully");
    return res.status(201).end();
});

router.delete("/", authenticateUser, (req, res) => {
    console.log("Removed Successfully");
    res.end();
});

router.put("/", authenticateUser, (req, res) => {
    console.log("Edit was successful");
    res.end();
});

router.get("/", authenticateUser, async (req, res) => {
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

    const email = getUserEmail(req);
    notes = await getNoteFromEmail(email);

    res.status(200).json(notes);
});

router.get("/health", (req: MyRequest, res: any) => {
    res.send("I am ok, how are you?");
    res.end();
});

router.get("/populate", authenticateUser, populateWithNotes);

export default router;
