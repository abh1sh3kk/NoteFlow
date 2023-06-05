import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import "./index.css"
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Protected from "./layouts/Protected/Protected";
import Homepage from "./pages/Homepage/Homepage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <SignUp />
            }, 
            {
                path: "users/signin",
                element: <Login />,
            },
            {
                path: "users/signup",
                element: <SignUp />,
            },
            {
                path: "notes",
                element: <Protected Component={Homepage} />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
