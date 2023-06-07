import { store } from "../store";

export const logIn = () => {
    store.dispatch({ type: "LOGIN" });
};

export const logOut = () => {
    store.dispatch({ type: "LOGOUT" });
};
