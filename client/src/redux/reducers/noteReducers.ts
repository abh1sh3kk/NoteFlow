import Note from "../../components/Note/Note";
import { NoteInterface } from "../../interfaces/interfaces";
import { getFormattedDate } from "../../utilities/date";
import { findIndexFromId } from "../../utilities/others";

const initialNote = [
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

let lastId = 10;
export function notesReducer(state: NoteInterface[] = initialNote, action: any) {
    switch (action.type) {
        case "ADD_NOTE":
            const currentDate = getFormattedDate();

            const newNote = {
                id: ++lastId,
                title: action.payload.title,
                note: action.payload.note,
                color: action.payload.color,
                dateCreated: currentDate,
                dateModified: currentDate,
            };
            return [...state, newNote];
        case "REMOVE_NOTE":
            return state.filter((note) => note.id !== action.payload.id);
        case "EDIT_NOTE":
            const newDate = getFormattedDate();

            const editedNote = {
                id: action.payload.id,
                title: action.payload.title,
                note: action.payload.note,
                color: action.payload.color,
                dateCreated: action.payload.dateCreated,
                dateModified: newDate,
            };

            const foundIndex = findIndexFromId(state, action.payload.id);

            const newState = [...state];
            console.log("before splice", newState)
            console.log(newState.splice(foundIndex, 1, editedNote));
            console.log("after splice", newState)
            console.log("but editedNote is ", editedNote)

            return newState;
        default:
            return state;
    }
}
