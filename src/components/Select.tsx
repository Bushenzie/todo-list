import React from "react";

function Select(props: React.ComponentProps<"select">) {
    return (
        <select
            className="px-6 py-2 text-black border-2 rounded-md border-gray-600 outline-none focus:outline-none"
            {...props}
        >
            <option value="">Select {props.name}</option>
            {props.children}
        </select>
    );
}

export default Select;
