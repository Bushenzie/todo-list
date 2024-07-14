import React from "react"
import { useTheme } from "../contexts/ThemeContext"

function Input(props: React.ComponentProps<"input">) {
    const theme = useTheme();
    
    return (
        <input
            type="text"
            className={`px-6 py-2 border-2 rounded-md outline-none focus:outline-none ${
                theme.theme === "dark" ? "text-neutral-50 bg-stone-800 placeholder:text-neutral-50 border-neutral-50" : "text-stone-900 border-stone-900"
            }`}
            {...props}
        />
    );
}

export default Input