import { store } from "../store";

function addNote(id: Number, title: string, note: string) {
    store.dispatch({
        type: "ADD_NOTE",
        payload: {
            id,
            title,
            note,
        },
    });
}

function removeNote(id: number) {
    store.dispatch({
        type: "REMOVE_NOTE",
        payload: {
            id,
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