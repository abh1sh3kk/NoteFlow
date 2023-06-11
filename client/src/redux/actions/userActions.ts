import { AiOutlineConsoleSql } from "react-icons/ai";
import { store } from "../store";
import { clearNotes } from "./noteActions";

export async function fetchUser() {
    try {
        const res_username = await fetch("http://localhost:3000/users/email", {
            credentials: "include",
        });
        const username: string = await res_username.json();

        store.dispatch({
            type: "USER_FETCH_SUCCESS",
            payload: {
                username,
            },
        });
    } catch (e) {
        store.dispatch({
            type: "USER_FETCH_FAILURE",
            payload: {
                username: "",
                error: e.message,
            },
        });
        console.error(e);
    }
}

export async function removeUser() {
    try {
        await fetch("http://localhost:3000/users/signout", { credentials: "include" });
        clearNotes();
    } catch (err) {
        console.log("Error in removing the cookies of a user", err);
    }
    store.dispatch({
        type: "REMOVE_USER",
    });
}
