import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserData } from "../../redux/actions/noteActions";

function RootLayout() {
    return (
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
            <Outlet />
        </main>
    );
}

export default RootLayout;
