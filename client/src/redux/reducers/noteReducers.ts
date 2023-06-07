interface NoteInterface {
    id: Number;
    title: string;
    note: string;
    color: string;
}

const initialNote = [
    {
        id: 1,
        title: "Abhishek is a hero",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 2,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 3,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 4,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 5,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 6,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 7,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
    {
        id: 8,
        title: "Do nothing",
        note: "One of the biggest problems when working with multiple mobile platforms is push notifications. You need to understand how to interact with every one of the backends from Apple, Google and Microsoft to be able to send the notifications to the devices. Azure has an awesome service called Notifications Hub, part of Service Bus, that help you to simplify this task.",
        color: "#ded9ff",
    },
];

export function notesReducer(state: NoteInterface[] = initialNote, action: any) {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload];
        case "REMOVE_NOTE":
            return state.filter((note) => note.id !== action.payload.id);
        default:
            return state;
    }
}
