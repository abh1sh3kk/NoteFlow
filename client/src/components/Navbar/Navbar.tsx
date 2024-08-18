import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdOutlineLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";

// @ts-ignore
import Logo from "../../assets/logo.svg";

import { clearNotes, fetchNotes } from "../../redux/actions/noteActions";
import { removeUser } from "../../redux/actions/userActions";

function Navbar() {
  const navigate = useNavigate();

  const username = useSelector((store: any) => store.userName);

  const handleLogout = async () => {
    await removeUser();
    clearNotes();
    return navigate("/users/signup");
  };

  return (
    <header className="flex justify-center bg-transparent text-slate-700">
      <nav className="max-w-[1250px] w-full flex items-center justify-between h-[64px] border-b-[1px] px-4 border-b-slate-300 gap-4 select-none">
        <div className="flex gap-1 justify-center items-center logo-side">
          <div>
            <img src={Logo} alt="" className="w-7" />
          </div>
          {/* <h3 onClick={populateDB} className="">
                        NoteFlow
                    </h3> */}
          <h3 className="">NoteFlow</h3>
        </div>

        {username === "" ? (
          <div className="flex gap-2 sm:gap-4">
            <Link
              to="/users/signin"
              className="px-4 py-1 text-white bg-purple-500 rounded-md"
            >
              Log In
            </Link>
            <Link
              to="/users/signup"
              className="px-4 py-1 text-white bg-green-500 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        ) : username === null ? (
          <div className="flex gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-500"></div>
            <div className="w-10 h-10 rounded-full bg-slate-500"></div>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center right-side sm:gap-4">
            <div className="flex gap-2 justify-center items-center p-2 font-normal rounded-md cursor-pointer hover:bg-white">
              {/* <AiOutlineUser /> */}
              <FaUser className="text-violet-500" />
              <p className="font-normal">{username}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex gap-2 items-center px-4 py-2 text-base text-white bg-fuchsia-500 rounded-md"
              type="button"
            >
              <MdOutlineLogout className="hidden sm:block" />
              <p className="">Logout</p>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
