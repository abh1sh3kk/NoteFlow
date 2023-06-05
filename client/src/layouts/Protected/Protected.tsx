import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }) {
    let navigate = useNavigate();
    useEffect(() => {
        let loggedIn = true;
        if (!loggedIn) {
            navigate("users/signin");
        }
    }, []);
    return (
        <>
            <Component />
        </>
    );
}

export default Protected;
