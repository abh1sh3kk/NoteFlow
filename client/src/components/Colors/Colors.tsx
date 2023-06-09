import React, { useState } from "react";

function Colors({ selectedColor, handleColorChange }) {
    const colors = ["#FFF6C7", "#DED9FF", "#DDFFE9", "#FFD9EB", "#D9E8FF"];

    colors.includes(selectedColor.toUpperCase()) || colors.push(selectedColor.toUpperCase());

    const activateThisColor = (e: any) => {
        handleColorChange(e.target.getAttribute("data-color"));
        // selectColor("#FFF6C7") ;
    };

    function removeDuplicates(arr: String[]) {
        return [...new Set(arr)];
    }

    const colorList = removeDuplicates(colors);

    const colorJSX = colorList.map((color: any) => {
        const colorStyle =
            selectedColor.toUpperCase() === color
                ? { backgroundColor: color, border: "2px solid #aeaeae" }
                : { backgroundColor: color, border: "2px solid transparent" };

        return (
            <div
                key={color}
                data-color={color}
                onClick={activateThisColor}
                style={colorStyle}
                className="shadow-sm w-5 h-5 rounded-full cursor-pointer hover:shadow-md"
            ></div>
        );
    });

    return <div className="flex gap-2">{colorJSX}</div>;
}

export default Colors;
