import React, { useState } from "react";
import {
    MdOutlineControlPointDuplicate,
    MdDeleteForever,
    MdOutlineDeleteOutline,
} from "react-icons/md";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Editor from "../Editor/Editor";

function Note() {
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
                    <h2 className="text-lg line-clamp-1">Do Something</h2>
                    <p className="line-clamp-4">
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                    </p>
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
            {isModalOpen && <Editor hidePopup={hidePopup} />}
        </>
    );
}

export default Note;
