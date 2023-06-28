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
            title: "Introduction to JavaScript",
            note: "JavaScript is a powerful programming language used for creating interactive websites. It allows you to add functionality, validate forms, manipulate HTML elements, and much more.",
            color: "#D9E8FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "",
        },
        {
            id: 1,
            title: "Getting Started with Python",
            note: "Python is a versatile programming language known for its simplicity and readability. It is widely used in various domains, including web development, data analysis, machine learning, and automation.",
            color: "#FFD9EB",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 22, 2023",
        },
        {
            id: 3,
            title: "Introduction to HTML5",
            note: "HTML5 is the latest version of Hypertext Markup Language used for structuring and presenting content on the web. It introduces new elements, APIs, and improved multimedia support.",
            color: "#DED9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 4,
            title: "CSS Styling Techniques",
            note: "CSS (Cascading Style Sheets) is used for applying styles and layout to HTML documents. With CSS, you can control the appearance of elements, create responsive designs, and implement animations.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 5,
            title: "Learning SQL Basics",
            note: "SQL (Structured Query Language) is a programming language for managing relational databases. It allows you to query, insert, update, and delete data, as well as define database structures and relationships.",
            color: "#DDFFE9",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 6,
            title: "Introduction to React",
            note: "React is a popular JavaScript library for building user interfaces. It uses a component-based architecture and allows you to create reusable UI components, handle state, and efficiently update the DOM.",
            color: "#FFF6C7",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 7,
            title: "Working with Git",
            note: "Git is a distributed version control system widely used in software development. It allows you to track changes, collaborate with others, and manage different versions of your codebase effectively.",
            color: "#D9E8FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 8,
            title: "Building RESTful APIs with Node.js",
            note: "Node.js is a runtime environment for executing JavaScript code outside of a web browser. It enables you to build scalable and high-performance server-side applications, including RESTful APIs.",
            color: "#FFD9EB",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 9,
            title: "Introduction to Java",
            note: "Java is a general-purpose programming language used for developing a wide range of applications, including desktop, web, mobile, and enterprise solutions. It is known for its robustness and platform independence.",
            color: "#DDD9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
        {
            id: 10,
            title: "Data Structures and Algorithms",
            note: "Data structures and algorithms are fundamental concepts in computer science. They help optimize the storage and retrieval of data and provide efficient solutions to various computational problems.",
            color: "#DED9FF",
            dateCreated: "June 10, 2023, 10:45 AM",
            dateModified: "June 10, 2023, 10:45 AM",
        },
    ];

    await userData.findOneAndUpdate({ email }, { noteList: readyMadeNotes });

    return res.status(204);
});

export default router;
