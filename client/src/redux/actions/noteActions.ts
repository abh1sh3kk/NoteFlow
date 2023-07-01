import { INote } from "../../interfaces/interfaces";
import { getFormattedDate } from "../../utilities/date";
import { store } from "../store";
import { fetchUser } from "./userActions";
import { v4 as uuidv4 } from "uuid";

export async function addNote(title: string, note: string, color: string) {
    const id: string = uuidv4();
    const dateCreated: String = getFormattedDate();
    const dateModified: String = "";
    try {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        const res = await fetch(`${backendLink}/notes`, {
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

        if (res.ok) {
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
            return;
        }
    } catch (e) {
        console.log("Oh no, I didn't expect this. Error in sending note.");
    }
    alert("Couldn't add note.");
    return;
}

export async function removeNote(id: string | Number) {
    try {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        const res = await fetch(`${backendLink}/notes/${id}`, {
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
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        const res = await fetch(`${backendLink}/notes`, { credentials: "include" });
        const data: INote[] = await res.json();
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

export async function editNote(
    id: string,
    title: String,
    note: String,
    color: String,
    dateCreated: String
) {
    const dateModified = getFormattedDate();
    try {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        const res = await fetch(`${backendLink}/notes`, {
            credentials: "include",
            method: "PUT",
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

        if (res.ok) {
            store.dispatch({
                type: "EDIT_NOTE",
                payload: {
                    id,
                    title,
                    note,
                    color,
                    dateCreated,
                    dateModified,
                },
            });
            return;
        }
    } catch (e) {
        console.log("Oh no, I didn't expect this. Error in sending note.");
    }
    alert("Couldn't be edited. Sorry.");
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
