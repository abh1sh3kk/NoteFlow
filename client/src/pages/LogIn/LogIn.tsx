import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { z } from "zod";
// @ts-ignore
import signinImg from "../../assets/signin.svg";
import Navbar from "../../components/Navbar/Navbar";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { INote } from "../../interfaces/interfaces";
import { fetchUser } from "../../redux/actions/userActions";

export interface ILoginData {
    email: string;
    password: string;
}

export interface IStore {
    userName: string | null;
    noteData: [INote] | null;
}

const LoginSchema = z.object({
    email: z.coerce.string().email({ message: "Sorry the email address is not valid." }),
    password: z.coerce
        .string()
        .min(6, { message: "Sorry, password is too short." })
        .max(22, { message: "Sorry, password is too long." }),
});

function Login() {
    const navigate = useNavigate();

    const username = useSelector((store: IStore) => store.userName);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [guestLogin, setGuestLogin] = useState<boolean>(false);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (username === null) return;
        if (username !== "") navigate("/");
    }, [username]);

    // -----------------------------------------------------------
    const [errorMsg, setErrorMsg] = useState<String>("");
    const showErrorMsg = async (message: string) => {
        setErrorMsg(message);
    };
    // -----------------------------------------------------------

    let parsedData: z.SafeParseReturnType<
        {
            email: string;
            password: string;
        },
        | {
              email: string;
              password: string;
          }
        | undefined
    >;

    // -----------------------------------------------------------
    const [loginData, setLoginData] = useState<ILoginData>({
        email: "",
        password: "",
    });

    useEffect(() => {
        parsedData = LoginSchema.safeParse(loginData);
        if (guestLogin) {
            submitLoginData(loginData);
        }
    }, [loginData]);
    // -----------------------------------------------------------

    const handleLoginDataChange = (e: any) => {
        setLoginData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value,
        }));
    };

    const loginAsAGuest = async (e: any) => {
        e.preventDefault();

        setGuestLogin(true);

        const guestLoginData = {
            email: "guest138@gmail.com",
            password: "hihacker",
        };
        setLoginData(guestLoginData);
    };

    const submitLoginData = async (loginData: ILoginData) => {
        const afterParseData = LoginSchema.safeParse(loginData);

        if (!afterParseData.success) {
            const formattedErrors = afterParseData.error.format();
            const emailError = formattedErrors.email?._errors[0];
            const passwordError = formattedErrors.password?._errors[0];

            if (emailError) setErrorMsg(emailError);
            else if (passwordError) setErrorMsg(passwordError);
            return;
        }

        setErrorMsg("");
        setIsLoading(true);
        try {
            // @ts-ignore
            const backendLink = import.meta.env.VITE_BACKEND_API;
            const res = await fetch(`${backendLink}/users/signin`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (res.ok) {
                navigate("/");
            } else if (res.status === 404) {
                showErrorMsg("Sorry, the email doesn't exist.");
                setLoginData((data) => ({ ...data, email: "" }));
            } else if (res.status === 401) {
                showErrorMsg("Incorrect password.");
                setLoginData((data) => ({ ...data, password: "" }));
            } else {
                showErrorMsg("Seems like an internal error.");
            }
        } catch (e) {
            console.log("Error in signing in.");
        }
        setIsLoading(false);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        submitLoginData(loginData);
    };

    return (
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
            <section className=" sm:min-h-[600px] sm:flex flex-col justify-center items-center">
                {username !== null ? (
                    <div className="w-full sm:w-auto sm:flex gap-4 items-center">
                        <div className="hidden sm:block md:max-w-[600px] sm:max-w-[600px] md:ps-2">
                            <img src={signinImg} alt="" />
                        </div>

                        <div className="signup-section sm:min-w-[340px] px-4 my-4">
                            <h1 className="text-xl mb-4 font-medium">Sign In</h1>
                            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                                <label>
                                    <div>Email</div>
                                    <input
                                        name="email"
                                        // type="email"
                                        onChange={handleLoginDataChange}
                                        value={loginData.email}
                                        className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div>Password</div>
                                    <input
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginDataChange}
                                        className="w-full h-10 bg-slate-300 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                                        type="password"
                                    />
                                    <Link
                                        to="https://www.wikihow.com/Remember-a-Forgotten-Password"
                                        className="self-end text-[#7059ff]"
                                    >
                                        Forgot Password?
                                    </Link>
                                    {errorMsg !== "" && (
                                        <p className="text-red-600 flex items-center gap-2">
                                            <span>
                                                <RxCross1 className="text-sm" />
                                            </span>
                                            <span className="pb-[2px]">{errorMsg}</span>
                                        </p>
                                    )}
                                </label>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={isLoading ? { opacity: "40%" } : {}}
                                    className="w-full bg-[#7059ff] text-white py-2 mt-2 rounded-md "
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={loginAsAGuest}
                                    type="submit"
                                    disabled={isLoading}
                                    style={isLoading ? { opacity: "40%" } : {}}
                                    className="flex items-center justify-center gap-2 w-full bg-white text-slate-600 py-2 mt-2 rounded-md "
                                >
                                    <AiOutlineUser className="text-xl" />
                                    <div>Continue as guest</div>
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
                ) : (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-purple-500"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-purple-500"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-purple-500"></div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Login;
