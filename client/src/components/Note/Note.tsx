import React, { SyntheticEvent } from "react";
import { MdOutlineControlPointDuplicate, MdDeleteForever } from "react-icons/md";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { addNote, removeNote } from "../../redux/actions/noteActions";

function Note({ id, title, note, color, dateCreated, dateModified, handleNoteClick }) {
    const handleNoteDelete = (e: SyntheticEvent) => {
        e.stopPropagation();
        removeNote(id);
    };

    const handleNoteEdit = (e: SyntheticEvent) => {
        e.stopPropagation();
        handleNoteClick({ id, title, note, color, dateCreated, dateModified });
    };

    const handleDuplicateNote = (e: SyntheticEvent) => {
        e.stopPropagation();
        const colors = ["#FFF6C7", "#DED9FF", "#DDFFE9", "#FFD9EB", "#D9E8FF"];
        let randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];
        addNote(title, note, randomColor);
    };

    return (
        <section
            style={{ backgroundColor: color }}
            className="transition-all duration-200 border-[1px] hover:scale-[101%] border-slate-400 w-full px-6 py-6 text-sm flex flex-col justify-between gap-8 rounded-[10px] hover:shadow-sm hover:border-slate-900 cursor-pointer"
            onClick={handleNoteEdit}
        >
            <div className="flex flex-col gap-4 justify-between h-full note-upper">
                <div className="flex flex-col gap-1 sm:gap-2">
                    <h2 className="text-xl font-medium text-slate-800 line-clamp-1" title={title}>{title}</h2>
                    <p className="text-base font-light line-clamp-4">{note}</p>
                </div>
                <div className="flex flex-col gap-1">
                    {!dateModified && (
                        <p className="line-clamp-2 text-slate-700">Created On: {dateCreated}</p>
                    )}
                    {dateModified && (
                        <p className="line-clamp-2 text-slate-600">Last Modified: {dateModified}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-2 justify-between w-full note-lower">
                <div className="flex gap-4 text-lg note__icons-left">
                    <MdOutlineControlPointDuplicate
                        className="hover:scale-110"
                        onClick={handleDuplicateNote}
                    />
                    <FiEdit className="hover:scale-110" onClick={handleNoteEdit} />

                    {/* <GoDuplicate /> */}
                </div>
                <div onClick={handleNoteDelete} className="flex gap-2 text-xl note__icons-right">
                    <MdDeleteForever className="hover:scale-110" />
                </div>
            </div>
        </section>
    );
}

export default Note;
