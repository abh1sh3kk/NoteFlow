import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./reducers/noteReducers";
import { loginReducer } from "./reducers/loginReducer";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        loggedIn: loginReducer,
        userName: userReducer,
    },
});
