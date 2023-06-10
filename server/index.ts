// import "./models/db";
import express, { NextFunction, Request, Response } from "express";
import "./models/db"
const app = express();
// ----------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------------------------------
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
    res.send("I am up and running");
});

app.get("/users/signup", (req, res) => {
    res.send("Sign up successful");
});

app.get("/users/signin", (req, res) => {
    res.send("Sign in successful");
});

app.post("/users/signin", authenticateUser, (req, res) => {
    res.json({ access_token: "asd;kfj4@#4;aksdjf" });
});

app.post("/users/signup", (req, res) => {
    console.log(req.body.password, req.body.email, req.body.confirmPassword);

    //   store password
		// connect to db
		// create a model
		// and then store it
    //	 generate token
    //   store that token in users cookies
    //   populate users store with respective data

    res.end();
});
