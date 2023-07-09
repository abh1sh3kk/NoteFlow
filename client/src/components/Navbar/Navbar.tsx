import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { clearNotes, fetchNotes } from "../../redux/actions/noteActions";

function Navbar() {
    const navigate = useNavigate();

    const username: string = useSelector((state: any) => state.userName);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        setUserExists(username !== "");
    }, [username]);

    const handleLogout = () => {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        fetch(`${backendLink}/users/signout`, { credentials: "include" }).then(() => {
            store.dispatch({
                type: "REMOVE_USER",
            });
            clearNotes();
            navigate("/users/signup");
        });
    };

    const populateDB = async () => {
        try {
            if (!userExists) return;

            // @ts-ignore
            const backendLink = import.meta.env.VITE_BACKEND_API;
            await fetch(`${backendLink}/notes/populate`, { credentials: "include" });
            fetchNotes();
        } catch (e) {
            console.log("Error in populating because ", e.message);
        }
    };
    const handleLogIn = async () => {
        // @ts-ignore
        const backendLink = import.meta.env.VITE_BACKEND_API;
        await fetch(`${backendLink}/users/signin`, { credentials: "include" });
    };

    return (
        <header className="flex justify-center text-slate-700 bg-transparent">
            <nav className="max-w-[1100px] w-full flex items-center justify-between h-[64px] border-b-[1px] px-4 border-b-slate-300 gap-4 ">
                <div className="flex items-center justify-center gap-1 logo-side ">
                    <div>
                        <img src={Logo} alt="" className="w-6" />
                    </div>
                    <h3 onClick={populateDB}>NoteFlow</h3>
                </div>
                {userExists ? (
                    <div className="flex items-center justify-center gap-4 right-side">
                        <div className="flex items-center justify-center gap-2 font-normal nav-account">
                            <AiOutlineUser />
                            <p>{username}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-base items-center flex gap-2 px-4 py-1  border-white rounded-md nav-logout"
                            type="button"
                        >
                            <p className="">Log Out</p>

                            <MdOutlineLogout className="sm:block hidden" />
                        </button>
                    </div>
                ) : (
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
                )}
            </nav>
        </header>
    );
}

export default Navbar;
