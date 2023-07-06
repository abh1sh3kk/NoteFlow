import { getNoteFromEmail, getUserEmail } from "..";
import { MyRequest } from "../middlewares/auth";
import userData, { INote } from "../models/user.model";

const populateWithNotes = async (req: MyRequest, res: any) => {
    const email: string = getUserEmail(req);

    if (email === "") return res.status(400);

    let readyMadeNotes = [
        {
            id: "2",
            title: "Introduction to JavaScript",
            note: "JavaScript is a powerful programming language used for creating interactive websites. It allows you to add functionality, validate forms, manipulate HTML elements, and much more.",
            color: "#D9E8FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "",
        },
        {
            id: "1",
            title: "Getting Started with Python",
            note: "Python is a versatile programming language known for its simplicity and readability. It is widely used in various domains, including web development, data analysis, machine learning, and automation.",
            color: "#FFD9EB",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 22, 2023",
        },
        {
            id: "3",
            title: "Introduction to HTML5",
            note: "HTML5 is the latest version of Hypertext Markup Language used for structuring and presenting content on the web. It introduces new elements, APIs, and improved multimedia support.",
            color: "#DED9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "4",
            title: "CSS Styling Techniques",
            note: "CSS (Cascading Style Sheets) is used for applying styles and layout to HTML documents. With CSS, you can control the appearance of elements, create responsive designs, and implement animations.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "5",
            title: "Learning SQL Basics",
            note: "SQL (Structured Query Language) is a programming language for managing relational databases. It allows you to query, insert, update, and delete data, as well as define database structures and relationships.",
            color: "#DDFFE9",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "6",
            title: "Introduction to React",
            note: "React is a popular JavaScript library for building user interfaces. It uses a component-based architecture and allows you to create reusable UI components, handle state, and efficiently update the DOM.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "7",
            title: "Working with Git",
            note: "Git is a distributed version control system widely used in software development. It allows you to track changes, collaborate with others, and manage different versions of your codebase effectively.",
            color: "#D9E8FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "8",
            title: "Building RESTful APIs with Node.js",
            note: "Node.js is a runtime environment for executing JavaScript code outside of a web browser. It enables you to build scalable and high-performance server-side applications, including RESTful APIs.",
            color: "#FFD9EB",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "9",
            title: "Introduction to Java",
            note: "Java is a general-purpose programming language used for developing a wide range of applications, including desktop, web, mobile, and enterprise solutions. It is known for its robustness and platform independence.",
            color: "#DDD9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: "10",
            title: "Data Structures and Algorithms",
            note: "Data structures and algorithms are fundamental concepts in computer science. They help optimize the storage and retrieval of data and provide efficient solutions to various computational problems.",
            color: "#DED9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
    ];

    await userData.findOneAndUpdate({ email }, { noteList: readyMadeNotes });

    return res.status(204);
};

const getNotes = async (req: any, res: any) => {
    let notes: INote[] = [];

    const email = getUserEmail(req);
    notes = await getNoteFromEmail(email);

    res.status(200).json(notes);
};

const editNote = async (req: any, res: any) => {
    const { id, title, note, color, dateCreated, dateModified } = req.body;
    const email = getUserEmail(req);
    const noteToStore = { id, title, note, color, dateCreated, dateModified };

    try {
        await userData.findOneAndUpdate(
            { email: email, "noteList.id": id },
            { $set: { "noteList.$": noteToStore } }
        );
    } catch (e) {
        console.log("Error in editing new data");
        return res.status(500).send("Data update failed").end();
    }

    // return res.status(201).end();
    console.log("Edit was successful");
    res.end();
};

const removeNote = async (req: any, res: any) => {
    const id = req?.params?.noteId;

    const email = getUserEmail(req);
    try {
        const newData = await userData.findOneAndUpdate(
            { email },
            { $pull: { noteList: { id } } },
            { new: true }
        );
    } catch (e) {
        return res.status(500).end();
    }

    console.log("Removed Successfully");
    res.status(204).end();
};

export const insertNote = async (req: any, res: any) => {
    const { id, title, note, color, dateCreated = "", dateModified = "" } = req.body;

    const email = getUserEmail(req);

    const noteToStore: INote = { id, title, note, color, dateCreated, dateModified };

    try {
        await userData.findOneAndUpdate(
            { email: email },
            { $push: { noteList: noteToStore } },
            { new: true }
        );
    } catch (e: any) {
        console.log("Error in pushing new data", e.message);
        return res.status(500).send("Data inserstion failed").end();
    }

    console.log("Added Successfully");
    return res.status(201).end();
};

const healthCheck = (req: MyRequest, res: any) => {
    console.log("I am slow but I am working");
    res.send("I am ok, how are you?");
    res.end();
};

export default {
    populateWithNotes,
    getNotes,
    editNote,
    removeNote,
    insertNote,
    healthCheck,
};
