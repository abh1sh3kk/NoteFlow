import React, { useEffect } from "react";
import Note from "../../components/Note/Note";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
// import "../../redux";
import { useSelector } from "react-redux";

interface NoteInterface {
    id: Number;
    note: String;
}

function Homepage() {
    const noteData = useSelector((state: any) => state.notes);

    const noteList = noteData.map((note) => {
        return <Note key={note.id} title={note.title} note={note.note} color={note.color} />;
    });

    return (
        <div className="w-full flex justify-center ">
            <section className="w-full max-w-[965px] flex flex-col gap-4 px-4 lg:px-0">
                <div className="create-note-area flex justify-between">
                    <div className="create-area my-4">
                        <button className="flex justify-center items-center gap-1 sm:gap-2 bg-purple-500 text-white py-2 pe-4 ps-3 sm:py-2 sm:ps-3 sm:pe-5 rounded-md">
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
    );
}

export default Homepage;
