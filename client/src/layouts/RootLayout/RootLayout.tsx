import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserData } from "../../redux/actions/noteActions";

function RootLayout() {
    let navigate = useNavigate();
    const username = useSelector((state: any) => state.userName);

    useEffect(() => {
        fetchUserData();
        const isLoggedIn = username !== "";

        if (!isLoggedIn) {
            navigate("/users/signin");
        } else {
            navigate("/notes");
        }
    }, []);

    return (
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
            <Outlet />
        </main>
    );
}

export default RootLayout;
