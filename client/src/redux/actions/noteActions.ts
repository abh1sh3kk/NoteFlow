import { store } from "../store";
import { fetchUser } from "./userActions";

export function addNote(title: string, note: string, color: string) {
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
    store.dispatch({
        type: "REMOVE_NOTE",
        payload: {
            id,
        },
    });
}

export async function fetchNotes() {
    try {
        const res = await fetch("http://localhost:3000/data/notes", { credentials: "include" });
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

export function fetchUserData() {
    fetchUser();
    fetchNotes();
}

export function clearNotes() {
    store.dispatch({
        type: "CLEAR_NOTE",
    })
}

export function editNote(
    id: number,
    title: String,
    note: String,
    color: String,
    dateCreated: String,
    dateModified: String
) {
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
