import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/signup2.svg";
import { useSelector } from "react-redux";

function SignUp() {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.userName);

    useEffect(() => {
        if (username !== "") navigate("/notes");
    });

    const handleSignUp = () => {
        const fakeSignUp = () => {
            fetch("http://localhost:3000/users/signup", {
                method: "post",
                credentials: "include",
                body: JSON.stringify({ email: "abhishekacharya@gmail.com", password: "password" }),
            }).then(() => {
                navigate("/notes");
            });
        };
        fakeSignUp();
    };

    return (
        <section className="py-4 sm:flex justify-center items-center min-h-[600px]">
            <section className="sm:flex sm:border-b-2 sm:border-b-slate-400 sm:gap-32 items-center justify-between">
                <div className="signup-section sm:w-[340px] px-4">
                    <h1 className="text-xl mb-4 font-medium">Signup</h1>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                        <label>
                            <div>Email</div>
                            <input
                                name="email"
                                type="email"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                            />
                        </label>
                        <label>
                            <div>Password</div>
                            <input
                                name="password"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                type="password"
                            />
                        </label>
                        <label>
                            <div>Confirm Password</div>
                            <input
                                name="confirmPassword"
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
