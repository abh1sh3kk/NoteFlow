import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
// import background from "../../assets/background.jpg";

function RootLayout() {
    return (
        <main className="bg-mesh-bright bg-cover min-h-screen">
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </main>
    );
}

export default RootLayout;
