import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark"

interface IThemeContext {
    theme: Theme;
    change: () => void
}

const ThemeContext = createContext<IThemeContext>({
    theme: "light",
    change: () => {},
});

export function ThemeContextProvider(props: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark")

    function change() {
        if(theme === "dark") return setTheme("light")
        setTheme("dark")
    }

    return (
        <ThemeContext.Provider value={{ theme, change }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const data = useContext(ThemeContext);
    return data;
}
