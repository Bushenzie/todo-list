import { createContext, useContext, useEffect, useReducer } from "react";
import { TodoItem,Priority } from "../types";

interface ITodoContext {
    items: TodoItem[];
    dispatch: (action: TodoAction) => void
}

type TodoAction = {
    type: "set" | "add" | "edit" | "remove";
    value: TodoItem;
};

const TodoContext = createContext<ITodoContext>({items: [], dispatch: () => {}});

function reducer(state: Array<TodoItem>, action: TodoAction) {
    if(action.type === "set") {
        return action.value;
    }
    if(action.type === "add") {
        return [...state, action.value];
    }
    if(action.type === "edit") {
        return (state.map((item) => {
            if(item.id === action.value.id) {
                return action.value;
            }
            return item;
        }));
    }
    if(action.type === "remove") {
        return (state.filter(item => item.id !== action.value.id))
    }

    return state
}
export function TodoContextProvider(props: {children: React.ReactNode}) {
    const [todoItems, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        async function setData() {
            const resp = await fetch(
                "https://6693a4cac6be000fa07cc618.mockapi.io/api/todos"
            );
            const json = await resp.json();
            dispatch({
                type: "set",
                value: json
            })
        }
        setData();
    },[]);


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