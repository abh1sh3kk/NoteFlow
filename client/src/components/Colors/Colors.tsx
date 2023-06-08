import React from "react";

function Colors({ selectedColor, handleColorChange }) {
    const colors = ["#FFF6C7", "#DED9FF", "#DDFFE9", "#FFD9EB", "#D9E8FF"];
    return (
        <div className="flex gap-2">
            <div style={{ backgroundColor: colors[0] }} className="w-4 h-4 rounded-full "></div>
            <div style={{ backgroundColor: colors[1] }} className="w-4 h-4 rounded-full "></div>
            <div style={{ backgroundColor: colors[2] }} className="w-4 h-4 rounded-full "></div>
            <div style={{ backgroundColor: colors[3] }} className="border-2 border-slate-500 w-4 h-4 rounded-full "></div>
            <div style={{ backgroundColor: colors[4] }} className="w-4 h-4 rounded-full "></div>
        </div>
    );
}

export default Colors;
