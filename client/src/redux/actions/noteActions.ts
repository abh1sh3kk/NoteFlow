import { getFormattedDate } from "../../utilities/date";
import { store } from "../store";
import { fetchUser } from "./userActions";
import { v4 as uuidv4 } from "uuid";

export async function addNote(title: string, note: string, color: string) {
    const dateCreated: String = getFormattedDate();
    const dateModified: String = "";
    const id = uuidv4();
    //add try fetch block here ..
    try {
        const res = await fetch("http://localhost:3000/notes", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                title,
                note,
                color,
                dateCreated,
                dateModified,
            }),
        });

        if (!res.ok) {
            console.log("Add failed, store should not be updated. Return the function right now.");
            alert(
                "Sorry, the note couldn't be added. Either you didn't pay the internet bill or I did a mistake"
            );
            return;
        }
    } catch (e) {
        console.log("Oh no, I didn't expect this. Error in sending note.");
    }
    store.dispatch({
        type: "ADD_NOTE",
        payload: {
            id,
            title,
            note,
            color,
            dateCreated,
            dateModified,
        },
    });
}

export async function removeNote(id: String | Number) {
    try {
        const res = await fetch(`http://localhost:3000/notes/${id}`, {
            credentials: "include",
            method: "DELETE",
        });

        if (!res.ok) {
            console.log("Response is not ok. It must be sick of my bad code.");
            alert(
                "Sorry, the note couldn't be added. Either you didn't pay the internet bill or I did a mistake, and sorry for using alert."
            );
            return;
        }
    } catch (e) {
        console.log("Error in removing.");
    }
    // remove from database, if failed don't remove
    store.dispatch({
        type: "REMOVE_NOTE",
        payload: {
            id,
        },
    });
}

export async function fetchNotes() {
    try {
        const res = await fetch("http://localhost:3000/notes", { credentials: "include" });
        const data = await res.json();
        store.dispatch({
            type: "FETCH_SUCCESS",
            payload: {
                data,
            },
        });
    } catch (error) {
        store.dispatch({
            type: "FETCH_FAILURE",
            payload: {
                data: [],
                error: error.message,
            },
        });
    }
}

export function editNote(
    id: number,
    title: String,
    note: String,
    color: String,
    dateCreated: String
) {
    const newDateModified = getFormattedDate();
    // edit in db, if failed don't edit
    store.dispatch({
        type: "EDIT_NOTE",
        payload: {
            id,
            title,
            note,
            color,
            dateCreated,
            dateModified: newDateModified,
        },
    });
}

export function fetchUserData() {
    fetchUser();
    fetchNotes();
}

export function clearNotes() {
    store.dispatch({
        type: "CLEAR_NOTE",
    });
}
