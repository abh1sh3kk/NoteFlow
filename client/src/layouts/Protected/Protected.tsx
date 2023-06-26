import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../redux/actions/noteActions";
import { fetchUser } from "../../redux/actions/userActions";

function Protected({ Component }) {
    const isLoggedIn = true;
    return isLoggedIn ? <Component /> : <h1>You should be navigated</h1>;
}

export default Protected;
