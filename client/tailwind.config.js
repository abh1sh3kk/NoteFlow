/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "mesh-bright": "url('./assets/background-2.jpg')",
                "texture": "url('./assets/texture-with-stripes.jpg')",
                "stripes": "url('./assets/stripes.jpg')"
            },
        },
    },
    plugins: [],
};
