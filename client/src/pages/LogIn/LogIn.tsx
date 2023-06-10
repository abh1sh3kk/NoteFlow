import React from "react";
import { ImGoogle, ImGoogle3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signinImg from "../../assets/signin.svg";
import { logIn } from "../../redux/actions/loginActions";

function Login() {
    const navigate = useNavigate();
    const handleLogin = () => {
        logIn();
        navigate("/notes");
    };
    return (
        <section className=" sm:min-h-[600px] sm:flex flex-col justify-center items-center">
            <div className="w-full sm:w-auto sm:flex gap-4 items-center">
                <div className="hidden sm:block md:max-w-[600px] sm:max-w-[600px] md:ps-2">
                    <img src={signinImg} alt="" />
                </div>

                <div className="signup-section sm:min-w-[340px] px-4 my-4">
                    <h1 className="text-xl mb-4 font-medium">Sign In</h1>
                    <form
                        className="flex flex-col gap-3"
                        method="POST"
                        action="http://localhost:3000/users/signin"
                    >
                        <label>
                            <div>Email</div>
                            <input
                                name="email"
                                type="email"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <div>Password</div>
                            <input
                                name="password"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                type="password"
                            />
                            <Link to="/users/signup" className="self-end text-[#7059ff]">
                                Forgot Password?
                            </Link>
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-[#7059ff] text-white py-2 mt-2 rounded-md "
                        >
                            Log In
                        </button>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full bg-white text-slate-600 py-2 mt-2 rounded-md "
                            onClick={handleLogin}
                        >
                            {/* <ImGoogle3 /> */}
                            <FcGoogle className="text-xl" />
                            <span>Sign In with Google</span>
                        </button>
                        <div className="text-center">
                            <span className="text-slate-600">Don't have an account?</span>{" "}
                            <Link to="/users/signup" className="text-[#7059ff]">
                                Create One!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
