import { createContext, useContext, useEffect, useReducer } from "react";
import { TodoItem } from "../types";

interface ITodoContext {
    items: TodoItem[];
    dispatch: (action: TodoAction) => void
}

type TodoAction = {
    type: "set" | "add" | "edit" | "remove";
    value: TodoItem;
};

// Brainstorm for multiple todo lists (lack of time to do that)
// To achieve multiple TODO lists we would have to create another "table" with them and link it to 
// todo items table using ID(primary/foreign keys).
// All items from TODO list table would be seen as todo list tabs and they would be handled using 
// reducer same way as with todo items.
// Then we would filter items by tableID/tableName and add them to the corrent tab

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