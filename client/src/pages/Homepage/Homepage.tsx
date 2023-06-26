import React, { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { NoteInterface } from "../../interfaces/interfaces";
import { sortById } from "./../../utilities/others";
import Editor from "../../components/Editor/Editor";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../../redux/actions/noteActions";
import { fetchUser } from "../../redux/actions/userActions";
import { store } from "../../redux/store";

function Homepage() {
    const navigate = useNavigate();
    fetchUser();
    const username: string = useSelector((state: any) => state.userName);
    const noteData = useSelector((state: any) => state.notes);

    useEffect(() => {
        if (username === "") navigate("/users/signup");
        else fetchNotes();
    }, [username]);


    const [sortedNotes, setSortedNotes] = useState(noteData);

    useEffect(() => {
        setSortedNotes(sortById([...noteData], 1));
    }, [noteData]);

    // -------------------- Struggle to open editor ---------------------
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
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
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
                    {noteList.length === 0 ? (
                        <div>I am empty</div>
                    ) : (
                        <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))]">
                            {noteList}
                        </div>
                    )}
                </section>
            </div>

            {isModalOpen && (
                <Editor
                    hidePopup={hidePopup}
                    mode={mode === "create" ? "create" : "edit"}
                    noteDetails={noteDetailsForEditor}
                />
            )}
        </main>
    );
}

export default Homepage;
