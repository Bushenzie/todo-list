import App from "./App";
import { TodoContextProvider } from "./contexts/TodoContext";

export default function Index() {
    return (
        <TodoContextProvider>
            <App />
        </TodoContextProvider>
    )
}