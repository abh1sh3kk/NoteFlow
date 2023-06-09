import React, { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import Editor from "../../components/Editor/Editor";
import { NoteInterface } from "../../interfaces/interfaces";
import { sortById } from "./../../utilities/others";

function Homepage() {
    const noteData = useSelector((state: any) => state.notes);

    const sortedNotes = sortById([...noteData], 1);

    let [mode, setMode] = useState("create");

    const [noteDetailsForEditor, setNoteDetailsForEditor] = useState({
        id: "1",
        title: "No Title",
        note: "",
        color: "#fff6c7",
        dateCreated: "",
        dateModified: "",
    });

    const handleNoteClick = ({ id, title, note, color, dateCreated, dateModified }) => {
        // mode = "edit";
        setMode("edit");
        setNoteDetailsForEditor({
            id,
            title,
            note,
            color,
            dateCreated,
            dateModified,
        });
        showPopup();
    };

    const noteList = sortedNotes.map((note: NoteInterface) => {
        return (
            <Note
                id={note.id}
                key={note.id.toString()}
                title={note.title}
                note={note.note}
                dateCreated={note.dateCreated}
                dateModified={note.dateModified}
                color={note.color}
                handleNoteClick={handleNoteClick}
            />
        );
    });

    const handleCreateNote = () => {
        showPopup();
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const showPopup = () => {
        setModalOpen(true);
    };

    const hidePopup = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="w-full flex justify-center pb-8">
                <section className="w-full max-w-[965px] flex flex-col gap-4 px-4 lg:px-0">
                    <div className="create-note-area flex justify-between">
                        <div className="create-area my-4">
                            <button
                                onClick={handleCreateNote}
                                className="flex justify-center items-center gap-1 sm:gap-2 bg-purple-500 text-white py-2 pe-4 ps-3 sm:py-2 sm:ps-3 sm:pe-5 rounded-md"
                            >
                                <AiOutlinePlus />
                                <span className="text-sm sm:text-base">Create a note</span>
                            </button>
                        </div>
                        <div className="search-area relative flex justify-center items-center gap-2 ">
                            <CiSearch className="relative left-8" />
                            <input
                                placeholder="Search..."
                                className="ps-8 h-10 w-[8rem] sm:w-auto text-sm rounded-md outline-transparent border-none focus:outline-purple-400 focus:outline-[1px]"
                            />
                        </div>
                    </div>
                    <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))]">
                        {noteList}
                    </div>
                </section>
            </div>
            {isModalOpen ? (
                mode === "create" ? (
                    <Editor
                        hidePopup={hidePopup}
                        mode="create"
                        noteDetails={noteDetailsForEditor}
                    />
                ) : (
                    <Editor hidePopup={hidePopup} mode="edit" noteDetails={noteDetailsForEditor} />
                )
            ) : (
                ""
            )}
        </>
    );
}

export default Homepage;
