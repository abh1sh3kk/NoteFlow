import { NoteInterface } from "../../interfaces/interfaces";
import { getFormattedDate } from "../../utilities/date";
import { findIndexFromId } from "../../utilities/others";

const fetchedState = [
    {
        id: 2,
        title: "Abhishek is a hero",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
        dateCreated: getFormattedDate(),
        dateModified: "",
    },
    {
        id: 1,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#FFD9EB",
        dateCreated: getFormattedDate(),
        dateModified: "June 22, 2023",
    },
    {
        id: 3,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
    {
        id: 4,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#FFF6C7",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
    {
        id: 5,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#DDFFE9",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
    {
        id: 6,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#FFF6C7",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
    {
        id: 7,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#FFF6C7",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
    {
        id: 8,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
        dateCreated: getFormattedDate(),
        dateModified: getFormattedDate(),
    },
];

const initialNote = [];

let lastId = 10;
export function notesReducer(state: NoteInterface[] = initialNote, action: any) {
    switch (action.type) {
        case "ADD_NOTE":
            const newNote = {
                id: action.payload.id,
                title: action.payload.title,
                note: action.payload.note,
                color: action.payload.color,
                dateCreated: action.payload.dateCreated,
                dateModified: action.payload.dateModified,
            };
            return [...state, newNote];

        case "REMOVE_NOTE":
            return state.filter((note) => note.id !== action.payload.id);

        case "EDIT_NOTE":
            const editedNote = {
                id: action.payload.id,
                title: action.payload.title,
                note: action.payload.note,
                color: action.payload.color,
                dateCreated: action.payload.dateCreated,
                dateModified: action.payload.dateModified,
            };

            const foundIndex = findIndexFromId(state, action.payload.id);

            const newState = [...state];
            newState.splice(foundIndex, 1, editedNote);

            return newState;

        case "FETCH_SUCCESS":
            return action.payload.data;
        // return [];

        case "FETCH_FAILURE":
            return action.payload.data;

        case "CLEAR_NOTE":
            return [];

        default:
            return state;
    }
}
