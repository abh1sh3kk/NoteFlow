import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Colors from "../Colors/Colors";
import Note from "./../Note/Note";

function Editor({ hidePopup, title, note }) {
    const handleClick = () => {
        hidePopup();
    };

    const handleShortcut = (e) => {
        if (e.key === "Escape") hidePopup();
    };
    useEffect(() => {
        window.addEventListener("keydown", handleShortcut);

        return () => {
            window.removeEventListener("keydown", handleShortcut);
        };
    }, []);

    const [textArea, setTextArea] = useState(note);

    function handleTextAreaChange(e: any) {
        setTextArea(e?.target?.value);
    }

    return (
        <main className="min-h-screen min-w-full bg-black bg-opacity-40 text-white absolute scroll-m-8 top-0 left-0 flex justify-center items-center">
            {/* Popup area */}
            <div className="lg:my-4 lg:rounded-md w-full bg-texture bg-white bg-fixed bg-cover flex sm:pt-10 max-w-[850px] justify-center items-center p-4">
                {/* article area */}
                <div className="flex flex-col items-start max-w-[924px] text-slate-700 mb-4 h-[600px] gap-4 sm:gap-8 w-full sm:w-auto">
                    <div className="flex justify-between w-full sm:max-w-[580px]">
                        <div>
                            <Colors />
                        </div>
                        <button onClick={handleClick}>
                            <RxCross2 />
                        </button>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold border-b-2 border-b-purple-600 pb-4 w-full">
                        {title}
                    </h1>

                    <textarea
                        className="sm:min-w-[580px] bg-transparent w-full overflow-auto h-[500px] resize-none break-words focus:outline-none"
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        wrap="soft"
                        value={textArea}
                        onChange={handleTextAreaChange}
                    ></textarea>
                </div>
            </div>
        </main>
    );
}

export default Editor;
