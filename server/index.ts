// import "./models/db";
import express, { Response } from "express";
const app = express();

app.listen("3000", () => {
    console.log("Listening");
});

app.get("/", (req, res: Response) => {
    res.send("I am up and running");
});

app.get("/users/signup", (req, res) => {
	res.send("Sign up successful")
})

app.get("/users/signin", (req, res) => {
	res.send("Sign in successful")
})