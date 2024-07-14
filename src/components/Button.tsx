

function Button(props: React.ComponentProps<"button">) {
    return (
        <button
            className={`cursor-pointer text-black px-6 py-2 rounded-md disabled:cursor-default`}
            {...props}
        >
            {props.children}
        </button>
    );
}

Button.Primary = (props: React.ComponentProps<"button">) => {
    return (
        <Button
            className="cursor-pointer px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:cursor-default"
            {...props}
        >
            {props.children}
        </Button>
    );
};

Button.Danger = (props: React.ComponentProps<"button">) => {
    return (
        <Button
            className="cursor-pointer px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:cursor-default"
            {...props}
        >
            {props.children}
        </Button>
    );
};

Button.Secondary = (props: React.ComponentProps<"button">) => {
    return (
        <Button
            className="cursor-pointer px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700 disabled:cursor-default"
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default Button