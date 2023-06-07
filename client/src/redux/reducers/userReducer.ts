interface state {
    notes: any;
    loggedIn: boolean;
    userName: string;
}
export function userReducer(state: string = "", action: any) {
    switch (action.type) {
        case "ADD_USER":
            return action.payload.userName;
        case "REMOVE_USER":
            return "";
        default:
            return state;
    }
}
