import { NoteInterface } from "../interfaces/interfaces";

export const sortById = (array: any, flag: 1 | -1) => {
    if (flag === 1) {
        return array.sort((a: any, b: any) => b.id - a.id);
    } else {
        return array.sort((a: any, b: any) => a.id - b.id);
    }
};

export const findIndexFromId = (state: NoteInterface[], givenId: number) => {
    return state.findIndex((currentNote) => currentNote.id === givenId);
};
