import React, { JSXElementConstructor } from "react";
import hexToHsl from "hex-to-hsl";

function Colors({ selectedColor, handleColorChange }) {
    const colors = ["#FFF6C7", "#DED9FF", "#DDFFE9", "#FFD9EB", "#D9E8FF"];
    colors.includes(selectedColor.toUpperCase()) || colors.push(selectedColor.toUpperCase());

    const activateThisColor = (e: any) => {
        handleColorChange(e.target.getAttribute("data-color"));
    };

    function removeDuplicates(arr: String[]) {
        return [...new Set(arr)];
    }

    const colorList = removeDuplicates(colors);

    const colorJSX = colorList.map((color: any) => {
        const increaseIntensity = (color: string): string => {
            let hslArray = hexToHsl(color);
            const ADJUSTMENT_FACTOR = 15;
            const brightColor = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${
                hslArray[2] - ADJUSTMENT_FACTOR
            }%)`;

            return brightColor;
        };

        const colorStyle =
            selectedColor.toUpperCase() === color
                ? {
                      backgroundColor: increaseIntensity(color),
                      border: "2px solid rgb(86 86 86)",
                      boxShadow: "-5px 0px 42px -1px rgba(0,0,0,0.46)",
                  }
                : { backgroundColor: increaseIntensity(color), border: "3px solid transparent" };

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
