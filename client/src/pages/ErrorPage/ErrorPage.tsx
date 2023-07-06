import React from "react";
// @ts-ignore
import errorSVG from "../../assets/errorpage.svg";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <section className="h-full flex flex-col items-center justify-center mt-10">
                <img src={errorSVG} className="sm:max-w-[600px]" />
                <article className="sm:text-xl text-slate-500 text-center mt-6">
                    Something is missing. <br />
                    <button
                        className="text-purple-500 font-medium"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <span className="">Go back</span>
                    </button>
                </article>
            </section>
        </>
    );
}

export default ErrorPage;
