import React, { FormEvent, FormEventHandler, FormHTMLAttributes, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Colors from "../Colors/Colors";
import { IoMdSend } from "react-icons/io";
import { addNote, editNote } from "../../redux/actions/noteActions";

function Editor({
    hidePopup,
    mode,
    noteDetails: { id, title, note, color, dateCreated, dateModified },
}) {

    const [selectedColor, setSelectedColor] = useState(color || "#fff6c7");

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleCrossButton = () => {
        hidePopup();
    };

    useEffect(() => {
        const handleKeyboardShortcut = (e: any) => {
            if (e.key === "Escape") hidePopup();
        };
        window.addEventListener("keydown", handleKeyboardShortcut);

        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcut);
        };
    }, []);

    const [theNote, setTheNote] = useState(note || "");
    const [theTitle, setTheTitle] = useState(title || "");

    function handleNoteChange(e: any) {
        setTheNote(e.target.value);
    }

    function handleTitleChange(e: any) {
        setTheTitle(e.target.value);
    }

    const handleNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "create") {
            addNote(theTitle, theNote, color);
        } else if (mode === "edit") {
            editNote(id, theTitle, theNote, selectedColor, dateCreated, dateModified);
        } else {
            throw new Error("Invalid mode value.");
        }

        hidePopup();
    };

    return (
        <main className="min-h-screen min-w-full bg-black bg-opacity-40 text-white absolute scroll-m-8 top-0 left-0 flex justify-center items-center">
            {/* Popup area */}
            <div className="lg:my-4 lg:rounded-md w-full bg-texture bg-white bg-fixed bg-cover flex sm:pt-10 max-w-[850px] justify-center items-center p-4 relative">
                <button
                    onClick={handleCrossButton}
                    className="text-slate-600 absolute top-2 right-2"
                >
                    <RxCross2 />
                </button>
                {/* article area */}
                <form
                    onSubmit={handleNoteSubmit}
                    className="flex flex-col items-start mt-6 sm:mt-auto max-w-[924px] text-slate-700 mb-4 h-[600px] gap-4 sm:gap-8 w-full sm:w-auto"
                >
                    <div className="flex items-center justify-between w-full sm:max-w-[580px]">
                        <div>
                            <Colors
                                selectedColor={selectedColor}
                                handleColorChange={handleColorChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex gap-2 items-center bg-purple-600 text-white px-3 py-1 rounded-md"
                        >
                            <span>Save</span>
                            <IoMdSend className="pt-" />
                        </button>
                    </div>

                    <textarea
                        name="title"
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        wrap="soft"
                        onChange={handleTitleChange}
                        value={theTitle}
                        autoFocus={true}
                        placeholder="Enter a Title"
                        className="caret-purple-500 focus:outline-none text-2xl sm:text-3xl font-semibold border-b-2 border-b-purple-600 w-full bg-transparent resize-y"
                    >
                        {/* {title} */}
                    </textarea>

                    <textarea
                        name="note"
                        className="sm:min-w-[580px] bg-transparent w-full overflow-auto h-[500px] resize-none break-words focus:outline-none"
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder="Describe your note here.."
                        wrap="soft"
                        value={theNote}
                        onChange={handleNoteChange}
                    ></textarea>
                </form>
            </div>
        </main>
    );
}

export default Editor;
