import React, { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import { INote } from "../../interfaces/interfaces";
import { sortById } from "../../utilities/others";
import { useSelector } from "react-redux";
// @ts-ignore
import NotesNotFound from "../../assets/emptynotes.svg";

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
                <section className="flex flex-col justify-center h-full items-center w-full ">
                    <figure>
                        <img src={NotesNotFound} className="mt-14 w-40 sm:w-50" alt="" />
                    </figure>
                    <article className="text-slate-500 text-base sm:text-lg mt-2">
                        No results found.
                    </article>
                </section>
            ) : (
                <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))] select-none">
                    {noteList}
                </div>
            )}
        </>
    );
}
