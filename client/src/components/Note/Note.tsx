import React, { useState } from "react";
import {
    MdOutlineControlPointDuplicate,
    MdDeleteForever,
    MdOutlineDeleteOutline,
} from "react-icons/md";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Editor from "../Editor/Editor";

function Note({ title, note, color }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const showPopup = () => {
        setModalOpen(true);
    };
    const hidePopup = () => {
        setModalOpen(false);
    };

    const isPinned = false;
    return (
        <>
            <section
                onClick={showPopup}
                className="w-full bg-[#fff6c7] px-6 py-6 text-sm flex flex-col justify-between gap-8 rounded-[10px]"
            >
                <div className="note-upper flex flex-col gap-4">
                    <h2 className="text-lg line-clamp-1">{title}</h2>
                    <p className="line-clamp-4">{note}</p>
                </div>

                <div className="note-lower flex justify-between gap-2 w-full">
                    <div className="note__icons-left flex gap-4 text-base">
                        {isPinned ? <BsPinAngleFill /> : <BsPinAngle />}
                        <MdOutlineControlPointDuplicate />
                        <FiEdit />

                        {/* <GoDuplicate /> */}
                    </div>
                    <div className="note__icons-right text-lg">
                        <MdDeleteForever />
                    </div>
                </div>
            </section>
            {isModalOpen && <Editor hidePopup={hidePopup} title={title} note={note} />}
        </>
    );
}

export default Note;
