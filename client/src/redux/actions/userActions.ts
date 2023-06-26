import { AiOutlineConsoleSql } from "react-icons/ai";
import { store } from "../store";
import { clearNotes } from "./noteActions";

export async function fetchUser() {
    const userNameFromEmail = (email: string): string => {
        return email.split("@")[0];
    };
    try {
        const res_email = await fetch("http://localhost:3000/users/email", {
            credentials: "include",
        });
        const email: string = await res_email.json();
        const username: string = userNameFromEmail(email);

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
    }
}

export async function removeUser() {
    try {
        // clearing cookies from client side should work
        await fetch("http://localhost:3000/users/signout", { credentials: "include" });
        clearNotes();
    } catch (err) {
        console.log("Error in removing the cookies of a user", err);
    }
    store.dispatch({
        type: "REMOVE_USER",
    });
}