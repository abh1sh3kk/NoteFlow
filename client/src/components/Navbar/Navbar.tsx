import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logIn, logOut } from "../../redux/actions/loginActions";

function Navbar() {
    const isLoggedIn = useSelector((state: any) => state.loggedIn);

    const navigate = useNavigate();
    const userName = "Abhishek";
    const handleLogout = () => {
        logOut();
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
                {isLoggedIn ? (
                    <div className="flex items-center justify-center gap-4 right-side">
                        <div className="flex items-center justify-center gap-2 font-normal nav-account">
                            <AiOutlineUser />
                            <p>{userName}</p>
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
