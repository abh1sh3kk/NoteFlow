import { INote } from "../../interfaces/interfaces";
import { findIndexFromId } from "../../utilities/others";

const initialNote = [];

export interface IAction {
    type: String;
    payload?: any;
}

export function notesReducer(state: INote[] | null = initialNote, action: IAction): INote[] | null {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state!, action.payload];

        case "REMOVE_NOTE":
            return state?.filter((note) => note.id !== action.payload.id) || null;

        case "EDIT_NOTE":
            const foundIndex = findIndexFromId(state!, action.payload.id);
            const newState = [...state!];
            newState.splice(foundIndex, 1, action.payload);
            return newState;

        case "FETCH_IN_PROGRESS":
            return null;

        case "FETCH_SUCCESS":
            return action.payload.data;

        case "FETCH_FAILURE":
            return action.payload.data;

        case "CLEAR_NOTE":
            return [];

        default:
            return state;
    }
}
