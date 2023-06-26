import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import "./index.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Protected from "./layouts/Protected/Protected";
import Homepage from "./pages/Homepage/Homepage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Provider } from "react-redux";
import "./redux/store";
import { store } from "./redux/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
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
        errorElement: <ErrorPage />,
    },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
