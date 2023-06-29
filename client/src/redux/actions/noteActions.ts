import { store } from "../store";
import { fetchUser } from "./userActions";

export async function addNote(title: string, note: string, color: string) {
    // add note request, if failed don't add, else add

    const res = await fetch("http://localhost:3000/notes", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            note,
            color,
        }),
    });

    if (!res.ok) {
        console.log("Add failed, store should not be updated. Return the function right now.");
    }
    store.dispatch({
        type: "ADD_NOTE",
        payload: {
            title,
            note,
            color,
        },
    });
}

export function removeNote(id: number) {
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
    dateCreated: String,
    dateModified: String
) {
    // edit in db, if failed don't edit
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
