import { Schema, model } from "mongoose";

export interface INote {
    id: Number | String;
    title: String;
    note: String;
    color: String;
    dateCreated: String;
    dateModified: String;
}

const noteSchema = new Schema({
    id: {
        type: Schema.Types.Mixed,
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

const userData = model("UserData", userSchema);

export default userData;
