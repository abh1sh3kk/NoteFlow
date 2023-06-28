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

    const handleClick = () => {
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
                <div className="note-upper flex flex-col gap-4">
                    <h2 className="text-lg line-clamp-1">{title}</h2>
                    <p onClick={handleClick} className="line-clamp-4">
                        {note}
                    </p>
                </div>

                <div className="note-lower flex justify-between gap-2 w-full">
                    <div className="note__icons-left flex gap-4 text-base">
                        {isPinned ? <BsPinAngleFill /> : <BsPinAngle />}
                        <MdOutlineControlPointDuplicate onClick={handleDuplicateNote} />
                        <FiEdit />

                        {/* <GoDuplicate /> */}
                    </div>
                    <div onClick={handleNoteDelete} className="note__icons-right text-lg">
                        <MdDeleteForever />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Note;
