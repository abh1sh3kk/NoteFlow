import React, { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import { INote } from "../../interfaces/interfaces";
import { sortById } from "../../utilities/others";
import { useSelector } from "react-redux";

export default function NoteView({ handleNoteClick, searchText }) {
    const noteData = useSelector((state: any) => state.notes);

    const [filteredNotes, setFilteredNotes] = useState(noteData);
    const [sortedNotes, setSortedNotes] = useState(filteredNotes);

    useEffect(() => {
        setFilteredNotes(
            noteData.filter((note: any) =>
                note.title.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, noteData]);

    useEffect(() => {
        setSortedNotes(sortById([...filteredNotes], 1));
    }, [filteredNotes]);

    const noteList = sortedNotes.map((note: INote) => {
        return (
            <Note
                id={note.id}
                key={note.id}
                title={note.title}
                note={note.note}
                dateCreated={note.dateCreated}
                dateModified={note.dateModified}
                color={note.color}
                handleNoteClick={handleNoteClick}
            />
        );
    });

    return (
        <>
            {noteList.length === 0 ? (
                <div>No results found</div>
            ) : (
                <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))]">
                    {noteList}
                </div>
            )}
        </>
    );
}
