import { createContext, useContext, useReducer } from "react";

interface ITodoContext {
    items: TodoItem[];
    dispatch: (action: TodoAction) => void
}
const TodoContext = createContext<ITodoContext>({items: [], dispatch: () => {}});

interface TodoItem {
    id: string;
    value: string;
    priority: Priority;
    tags?: string[];
    due?: Date;
}

type TodoAction = {
    type: "add" | "edit" | "remove";
    value: string;
};

enum Priority {
    Low = 1,
    Medium,
    High,
}

function reducer(state: object, action: TodoAction) {
    let item: TodoItem;
    switch (action.type) {
        case "add":
            item = {
                id: Date.now().toString(),
                value: action.value,
                priority: Priority.Low,
            };
            if(Array.isArray(state)) {
                return [...state, item];
            }
            return [item]
        case "edit":
            break;
        case "remove":
            break;
        default:
            return state;
    }
}
export function TodoContextProvider(props: {children: React.ReactNode}) {
    const [todoItems, dispatch] = useReducer(reducer, []);

    return (
        <TodoContext.Provider value={{items: todoItems ,dispatch}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export function useTodos() {
    const data = useContext(TodoContext) 
    return data;
}