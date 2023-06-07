import React from "react";
import { Link } from "react-router-dom";
import signupImg from "../../assets/signup2.svg";

function SignUp() {
    return (
        <section className="py-4 sm:flex justify-center items-center min-h-[600px]">
            <section className="sm:flex sm:border-b-2 sm:border-b-slate-400 sm:gap-32 items-center justify-between">
                <div className="signup-section sm:w-[340px] px-4">
                    <h1 className="text-xl mb-4 font-medium">Signup</h1>
                    <form className="flex flex-col gap-3">
                        <label>
                            <div>Email</div>
                            <input
                                type="email"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                            />
                        </label>
                        <label>
                            <div>Password</div>
                            <input
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                type="password"
                            />
                        </label>
                        <label>
                            <div>Confirm Password</div>
                            <input
                                type="password"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-[#7059ff] text-white py-2 mt-2 rounded-md "
                        >
                            Sign Up
                        </button>
                        <Link to="/users/signin" className="my-2 text-[#7059ff]">
                            Already a member?
                        </Link>
                    </form>
                </div>

                <div className="">
                    <img src={signupImg} alt="" className="sm:block hidden sm:max-w-[720px]" />
                </div>
            </section>
        </section>
    );
}

export default SignUp;
