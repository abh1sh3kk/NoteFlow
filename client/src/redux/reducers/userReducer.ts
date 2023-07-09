interface state {
    notes: any;
    loggedIn: boolean;
    userName: string;
}
export function userReducer(state: string | null = null, action: any): string | null {
    switch (action.type) {
        case "USER_FETCH_SUCCESS":
            return action.payload.username;
        case "USER_FETCH_FAILURE":
            return action.payload.username;
        case "REMOVE_USER":
            return "";
        case "USER_FETCH_PROGRESS":
            return null;
        default:
            return state;
    }
}
