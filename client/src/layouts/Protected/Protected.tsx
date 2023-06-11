import React, { useEffect } from "react";

function Protected({ Component }) {
    return (
        <>
            <Component />
        </>
    );
}

export default Protected;
