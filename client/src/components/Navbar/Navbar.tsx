import React, { useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "../../assets/logo.svg";
import { redirect, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const userName = "Abhishek";
    const handleLogout = () => {
        navigate("users/signin");
    };

    return (
        <header className="flex justify-center text-slate-700 bg-transparent">
            <nav className="max-w-[965px] w-full flex items-center justify-between h-[64px] border-b-[1px] px-4 border-b-slate-300 gap-4 ">
                <div className="flex items-center justify-center gap-1 logo-side ">
                    <div>
                        <img src={Logo} alt="" className="w-6" />
                    </div>
                    <h3>NoteFlow</h3>
                </div>

                <div className="flex items-center justify-center gap-4 right-side">
                    <div className="flex items-center justify-center gap-2 font-normal nav-account">
                        <AiOutlineUser />
                        <p>{userName}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="items-center flex gap-2 px-4 py-1 border-[1px] border-white rounded-md nav-logout"
                        type="button"
                    >
                        <p>Log Out</p>

                        <MdOutlineLogout className="" />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
