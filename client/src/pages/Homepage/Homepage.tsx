import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import Editor from "../../components/Editor/Editor";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../../redux/actions/noteActions";
import { fetchUser } from "../../redux/actions/userActions";
import NoteView from "../NoteView/NoteView";
import EmptyPage from "../EmptyPage/EmptyPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const username: string | null = useSelector((state: any) => state.userName);
    const noteData: any = useSelector((state: any) => state.notes);

    const [searchText, setSearchText] = useState("");
    const handleSearch = (e: any) => {
        setSearchText(e.target.value);
    };
    const searchRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (username === null) return;
        if (username === "") {
            navigate("/users/signup");
        } else fetchNotes();
    }, [username]);

    // -------------------- Struggle to open editor ---------------------
    let [mode, setMode] = useState<"create" | "edit">("create");

    const [noteDetailsForEditor, setNoteDetailsForEditor] = useState({
        id: "",
        title: "",
        note: "",
        color: "#FFF6C7",
        dateCreated: "",
        dateModified: "",
    });

    const handleNoteClick = ({ id, title, note, color, dateCreated, dateModified }) => {
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
        setMode("create");
        showPopup();
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const showPopup = () => {
        setModalOpen(true);
    };

    const hidePopup = () => {
        setModalOpen(false);
        setNoteDetailsForEditor({
            id: "",
            title: "Title",
            note: "",
            color: "#FFF6C7",
            dateCreated: "",
            dateModified: "",
        });
    };

    // // ------------Shortcuts----------------
    // useEffect(() => {
    //         searchRef.current.addEventListener("focus", () => {
    //             if (searchRef.current) searchRef.current.value = "";
    //         });
    //     const searchText = searchRef.current?.textContent;
    //     const handleShortcut = (e: KeyboardEvent) => {
    //         if (e.key === "N" && e.shiftKey) handleCreateNote();
    //         if (e.key === "/") searchRef.current?.focus();

    //         if (e.key === "Escape") searchRef.current?.blur();
    //     };
    //     document.addEventListener("keydown", handleShortcut);
    //     return () => {
    //         document.removeEventListener("keydown", handleShortcut);
    //     };
    // }, []);

    return (
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
            <div className="w-full flex justify-center pb-8">
                <section className="w-full max-w-[1050px] flex flex-col gap-7 px-4 lg:px-0">
                    <div className="create-note-area flex justify-between pt-6">
                        <div className="create-area">
                            <button
                                disabled={username === null}
                                style={username === null ? { opacity: "60%" } : {}}
                                onClick={handleCreateNote}
                                className="flex justify-center items-center select-none gap-1 sm:gap-2 bg-purple-500 text-white py-2 pe-4 ps-3 sm:py-2 sm:ps-3 sm:pe-5 rounded-md"
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
                                ref={searchRef}
                                className="ps-8 h-10 w-[8rem] sm:w-auto text-sm rounded-md outline-transparent border-none focus:outline-purple-400 focus:outline-[1px]"
                            />
                        </div>
                    </div>
                    {noteData === null || username === null ? (
                        <LoadingScreen />
                    ) : noteData.length === 0 ? (
                        <EmptyPage />
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
