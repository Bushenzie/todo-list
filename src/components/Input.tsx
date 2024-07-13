import React from "react"


function Input(props: React.ComponentProps<"input">) {
    return (
        <input type="text" className="px-6 py-2 text-black border-2 rounded-md border-gray-600 outline-none focus:outline-none"  {...props} />
    )
}

export default Input