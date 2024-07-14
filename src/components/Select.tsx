import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function Select(props: React.ComponentProps<"select">) {
    const theme = useTheme();

    return (
        <select
            className={`px-6 py-2 text-black border-2 rounded-md border-gray-600 outline-none ${theme.theme === "dark" ? "text-neutral-50 bg-stone-800 border-neutral-50 " : ""} focus:outline-none`}
            {...props}
        >
            <option value="">Select {props.name}</option>
            {props.children}
        </select>
    );
}

export default Select;
