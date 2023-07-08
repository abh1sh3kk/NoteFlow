import React from "react";
// @ts-ignore

export const DummyNote = () => {
    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-400 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-400 rounded col-span-3"></div>
                            <div className="h-2 bg-slate-400 rounded col-span-3"></div>
                            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                        </div>
                        <div className="h-2 bg-slate-400 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type Props = {};

const LoadingScreen = (props: Props) => {
    return (
        <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))]">
            <DummyNote />
            <DummyNote />
            <DummyNote />
            <DummyNote />
            <DummyNote />
            <DummyNote />
            <DummyNote />
        </div>
    );
};

export default LoadingScreen;

// <section className="flex flex-col items-center justify-center sm:pt-4">
//     <figure>
//         <img src={addNoteImg} className="sm:w-80 w-60" alt="" />
//     </figure>
//     <article className="font-mono text-lg sm:text-2xl mt-6 sm:mt-10 text-slate-500 font-medium text-center">
//         Loading
//     </article>
// </section>
