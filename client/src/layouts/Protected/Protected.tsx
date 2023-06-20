import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../redux/actions/noteActions";

function Protected({ Component }) {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.userName);
    useEffect(() => {
        fetchUserData();
        if (username !== "") navigate("/users/signup");
    }, []);
    return (
        <>
            <Component />
        </>
    );
}

export default Protected;
