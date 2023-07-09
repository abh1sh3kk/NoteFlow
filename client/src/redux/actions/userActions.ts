import { store } from "../store";
import { clearNotes } from "./noteActions";

export async function fetchUser() {
    const userNameFromEmail = (email: string): string => {
        return email.split("@")[0];
    };
    store.dispatch({ type: "USER_FETCH_PROGRESS" });
    try {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        const res_email = await fetch(`${backendLink}/users/email`, {
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
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        await fetch(`${backendLink}/users/signout`, { credentials: "include" });
        clearNotes();
    } catch (err) {
        console.log("Error in removing the cookies of a user", err);
    }
    store.dispatch({
        type: "REMOVE_USER",
    });
}
