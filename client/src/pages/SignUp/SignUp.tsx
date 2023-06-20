import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import signupImg from "../../assets/signup2.svg";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = (e: Event) => {
        e.preventDefault();
        console.log("The data I am about to submit is: ", formData);

        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) navigate("/notes");
                else if (response.status === 409) {
                    console.log("Sorry the email already exists.");
                }
            })
            .catch((e) => {
                console.log("Sign up failed and the reason is ", e);
            });

        // fetch("http://localhost:3000/users/signup", {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => {
        //         if (response.ok) navigate("/notes");
        //         else console.log("Response is not OK");
        //     })
        //     .catch((e) => {
        //         console.log("Sign up failed and the reason is ", e);
        //     });
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
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <div>Password</div>
                            <input
                                name="password"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                value={formData.password}
                                type="password"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <div>Confirm Password</div>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
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
