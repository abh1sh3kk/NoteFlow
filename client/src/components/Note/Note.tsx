import React from "react";
import { MdOutlineControlPointDuplicate, MdDeleteForever } from "react-icons/md";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { addNote, removeNote } from "../../redux/actions/noteActions";

function Note({ id, title, note, color, dateCreated, dateModified, handleNoteClick }) {
    const isPinned = false;

    const handleNoteDelete = () => {
        removeNote(id);
    };

    const handleNoteEdit = () => {
        handleNoteClick({ id, title, note, color, dateCreated, dateModified });
    };

    const handleDuplicateNote = () => {
        const colors = ["#FFF6C7", "#DED9FF", "#DDFFE9", "#FFD9EB", "#D9E8FF"];
        let randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];
        addNote(title, note, randomColor);
    };

    return (
        <>
            <section
                style={{ backgroundColor: color }}
                className="w-full px-6 py-6 text-sm flex flex-col justify-between gap-8 rounded-[10px] hover:shadow-sm cursor-pointer"
            >
                <div className="note-upper flex flex-col gap-4 justify-between h-full">
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <h2 className="text-lg line-clamp-1">{title}</h2>
                        <p className="line-clamp-4 text-base">{note}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        {!dateModified && (
                            <p className="line-clamp-2 text-slate-700 ">
                                Created On: {dateCreated}
                            </p>
                        )}
                        {dateModified && (
                            <p className="line-clamp-2 text-slate-600">
                                Last Modified: {dateModified}
                            </p>
                        )}
                    </div>
                </div>

                <div className="note-lower flex justify-between gap-2 w-full">
                    <div className="note__icons-left flex gap-4 text-lg">
                        {/* {isPinned ? <BsPinAngleFill /> : <BsPinAngle />} */}
                        <MdOutlineControlPointDuplicate className="hover:scale-110" onClick={handleDuplicateNote} />
                        <FiEdit className="hover:scale-110" onClick={handleNoteEdit} />

                        {/* <GoDuplicate /> */}
                    </div>
                    <div onClick={handleNoteDelete} className="note__icons-right text-xl">
                        <MdDeleteForever className="hover:scale-110" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Note;
