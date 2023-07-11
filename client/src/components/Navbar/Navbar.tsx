import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { FaUser } from "react-icons/fa";

// @ts-ignore
import Logo from "../../assets/logo.svg";

import { clearNotes, fetchNotes } from "../../redux/actions/noteActions";
import { IStore } from "../../pages/LogIn/LogIn";
import { fetchUser, removeUser } from "../../redux/actions/userActions";

function Navbar() {
    const navigate = useNavigate();

    const username: string | null = useSelector((state: IStore) => state.userName);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await removeUser();
        clearNotes();
        navigate("/users/signup");
    };

    const populateDB = async () => {
        try {
            if (username === "") return;

            // @ts-ignore
            const backendLink = import.meta.env.VITE_BACKEND_API;
            await fetch(`${backendLink}/notes/populate`, { credentials: "include" });

            fetchNotes();
        } catch (e) {
            console.log("Error in populating because ", e.message);
        }
    };

    return (
        <header className="flex justify-center text-slate-700 bg-transparent">
            <nav className="max-w-[1050px] w-full flex items-center justify-between h-[64px] border-b-[1px] px-4 border-b-slate-300 gap-4 ">
                <div className="flex items-center justify-center gap-1 logo-side ">
                    <div>
                        <img src={Logo} alt="" className="w-7" />
                    </div>
                    <h3 onClick={populateDB} className="">
                        NoteFlow
                    </h3>
                </div>

                {username === "" ? (
                    <div className="flex gap-2 sm:gap-4">
                        <Link
                            to="/users/signin"
                            className=" bg-purple-500 text-white py-1 px-4 rounded-md"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/users/signup"
                            className=" bg-green-500 text-white py-1 px-4 rounded-md"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : username === null ? (
                    <div className="flex gap-4 animate-pulse">
                        <div className="rounded-full bg-slate-500 h-10 w-10"></div>
                        <div className="rounded-full bg-slate-500 h-10 w-10"></div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center right-side gap-2 sm:gap-4">
                        <div className="flex items-center justify-center gap-2 font-normal p-2 rounded-md hover:bg-fuchsia-300">
                            {/* <AiOutlineUser /> */}
                            <FaUser className="text-violet-500" />
                            <p className="font-normal">{username}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-base items-center flex gap-2 px-4 py-2 rounded-md bg-fuchsia-500 text-white"
                            type="button"
                        >
                            <MdOutlineLogout className="sm:block hidden" />
                            <p className="">Logout</p>
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
