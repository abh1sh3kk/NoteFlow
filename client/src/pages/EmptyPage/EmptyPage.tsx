import React from "react";
// @ts-ignore
import addNoteImg from "../../assets/addnote.svg";

const EmptyPage = () => {
    return (
        <section className="flex flex-col items-center justify-center sm:pt-4">
            <figure>
                <img src={addNoteImg} className="sm:w-80 w-60" alt="" />
            </figure>
            <article className="font-mono text-lg sm:text-2xl mt-6 sm:mt-10 text-slate-500 font-medium text-center">
		Looks like page is empty.
            </article>
        </section>
    );
};

export default EmptyPage;

//     <article>
//         <button
//             onClick={handleCreateNote}
//             className="flex justify-center items-center gap-1 sm:gap-2 bg-purple-500 text-white py-2 pe-4 ps-3 sm:py-2 sm:ps-3 sm:pe-5 rounded-md"
//         >
//             {/* <AiOutlinePlus /> */}
//             <span className="text-sm sm:text-base">Create new</span>
//         </button>
//     </article>
