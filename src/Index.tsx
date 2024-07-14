import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { TodoContextProvider } from "./contexts/TodoContext";

export default function Index() {
    return (
        <TodoContextProvider>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </TodoContextProvider>
    );
}