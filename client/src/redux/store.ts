import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./reducers/noteReducers";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        userName: userReducer,
    },
});
