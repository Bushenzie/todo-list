import { createContext, useContext, useReducer } from "react";
import { TodoItem,Priority } from "../types";

interface ITodoContext {
    items: TodoItem[];
    dispatch: (action: TodoAction) => void
}

type TodoAction = {
    type: "add" | "edit" | "remove";
    value: TodoItem;
};

const TodoContext = createContext<ITodoContext>({items: [], dispatch: () => {}});

function reducer(state: Array<TodoItem>, action: TodoAction) {
    let item: TodoItem;
    switch (action.type) {
        case "add":
            item = {
                id: Date.now().toString(),
                value: action.value.value,
                priority: action.value.priority,
            };
            if(Array.isArray(state)) {
                return [...state, item];
            }
            return [item]
        case "edit":    
            return (state.map((item) => {
                if(item.id === action.value.id) {
                    item.value = action.value.value
                }
                return item;
            }))
            break;
        case "remove":
            return (state.filter((item) => item.id !== action.value.id));
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