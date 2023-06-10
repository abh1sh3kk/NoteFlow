import { Schema, model } from "mongoose";

interface INote {
    id: Number;
    title: String;
    note: String;
    color: String;
    dateCreated: String;
    dataModified: String;
}

const noteSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,
        required: true,
    },
    dateModified: {
        type: String,
        required: false,
        default: "",
    },
});

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    noteList: {
        type: [noteSchema],
        required: true,
        defualt: [],
    },
    sessions: [String],
});

const userData = model("User Data", userSchema);

export default userData;
