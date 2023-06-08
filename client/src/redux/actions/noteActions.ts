import { store } from "../store";

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

// store.dispatch({
//     type: "ADD_NOTE",
//     payload: {
//         id: 2,
//         title: "Title",
//         note: "This is the note",
//     },
// });

// store.dispatch({
//     type: "ADD_NOTE",
//     payload: {
//         id: 3,
//         title: "Third",
//         note: "This is the third note",
//     },
// });
