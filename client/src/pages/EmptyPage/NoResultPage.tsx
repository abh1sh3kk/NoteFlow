import React from "react";
// import NotesNotFound from "../../assets/emptynotes.svg";
// @ts-ignore
import NotesNotFound from "../../assets/emptynotes.svg";


const NoResultPage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <figure>
        <img src={NotesNotFound} className="mt-14 w-40 sm:w-50" alt="" />
      </figure>
      <article className="mt-2 text-base text-slate-500 sm:text-lg">
        No results found.
      </article>
    </section>
  );
};

export default NoResultPage;
