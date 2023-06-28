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
import NoteView from "../NoteView/NoteView";

function Homepage() {
    const navigate = useNavigate();
    fetchUser();
    const username: string = useSelector((state: any) => state.userName);
    const noteData = useSelector((state: any) => state.notes);

    const [searchText, setSearchText] = useState("");
    const handleSearch = (e: any) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        if (username === "") navigate("/users/signup");
        else fetchNotes();
    }, [username]);

    // -------------------- Struggle to open editor ---------------------
    let [mode, setMode] = useState("create");

    const [noteDetailsForEditor, setNoteDetailsForEditor] = useState({
        id: "",
        title: "",
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

    const handleCreateNote = () => {
        showPopup();
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const showPopup = () => {
        setModalOpen(true);
    };

    const hidePopup = () => {
        setModalOpen(false);
        setNoteDetailsForEditor({
            id: "1",
            title: "Title",
            note: "",
            color: "#fff6c7",
            dateCreated: "",
            dateModified: "",
        });
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
                                value={searchText}
                                onChange={handleSearch}
                                className="ps-8 h-10 w-[8rem] sm:w-auto text-sm rounded-md outline-transparent border-none focus:outline-purple-400 focus:outline-[1px]"
                            />
                        </div>
                    </div>
                    {noteData.length === 0 ? (
                        <div>Your notes are empty. Create new?</div>
                    ) : (
                        <NoteView handleNoteClick={handleNoteClick} searchText={searchText} />
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
