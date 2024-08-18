import React, { useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
// @ts-ignore
import signupImg from "../../assets/signup2.svg";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { z } from "zod";
import { RxCross1 } from "react-icons/rx";

const SignupSchema = z
  .object({
    email: z.coerce.string().email({ message: "Please enter a valid email address." }),
    password: z.coerce
      .string()
      .min(6, { message: "Minimum 6 characters are required for password." })
      .max(16, { message: "Sorry, you can't enter more than 16 characters." }),
    confirmPassword: z.coerce
      .string()
      .min(6, { message: "Minimum 6 characters are required." })
      .max(16, { message: "Sorry, you can't enter more than 16 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Sorry the passwords do not match.",
    path: ["confirmPassword"],
  });

function SignUp() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  let parsedData: z.SafeParseReturnType<
    {
      email: string;
      password: string;
      confirmPassword: string;
    },
    | {
        email: string;
        password: string;
        confirmPassword: string;
      }
    | undefined
  >;

  useEffect(() => {
    parsedData = SignupSchema.safeParse(formData);
  }, [formData]);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    if (!parsedData?.success) {
      const errorListZod = parsedData?.error?.message;
      const errorMsgZod = errorListZod && JSON.parse(errorListZod)[0].message;
      errorMsgZod && setErrorMsg(errorMsgZod);
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      // @ts-ignore
      const backendLink = import.meta.env.VITE_BACKEND_API;
      const res = await fetch(`${backendLink}/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      if (res.ok) {
        // navigate("/");
        // await fetchUserData();
      } else if (res.status === 409) {
        setErrorMsg("Sorry the email already exists.");
        // setIsLoading(false);
      }
    } catch (error) {
      console.log("Sign up failed and the reason is ", e);
      setErrorMsg("Internal Error.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cover">
      <Navbar />
      <section className="py-4 sm:flex justify-center items-center min-h-[600px]">
        <section className="justify-between items-center sm:flex sm:border-b-2 sm:border-b-slate-400 sm:gap-32">
          <div className="signup-section sm:w-[340px] px-4">
            <h1 className="mb-4 text-xl font-medium">Signup</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-3">
              <label>
                <div>Email</div>
                <input
                  name="email"
                  type="email"
                  className="w-full h-10 bg-slate-200 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <div>Password</div>
                <input
                  name="password"
                  className="w-full h-10 bg-slate-200 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
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
                  className="w-full h-10 bg-slate-200 rounded-md outline-transparent border-none focus:outline-purple-500 focus:outline-[3px] ps-2 text-sm "
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </label>
              {errorMsg !== "" && (
                <p className="flex gap-2 items-center text-red-600">
                  <span>
                    <RxCross1 className="text-sm" />
                  </span>
                  <span className="pb-[2px]">{errorMsg}</span>
                </p>
              )}
              <button
                disabled={isLoading}
                style={isLoading ? { opacity: "40%" } : {}}
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
    </main>
  );
}

export default SignUp;
