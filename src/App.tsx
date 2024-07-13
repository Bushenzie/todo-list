import { useReducer, useState } from "react"
import "./index.css"

enum Priority {
  Low = 1,
  Medium,
  High
}

interface TodoItem {
  id: string;
  value: string;
  priority: Priority;
  tags?: string[],
  due?: Date
}

type TodoAction = {
  type: "add"|"edit"|"remove",
  value: string
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
          return [...state, item];
        case "edit":
          break;
        case "remove":
          break;
        default:
          return state;
    }
}


function App() {
  const [todoItems, dispatch] = useReducer(reducer, []);

  const [inputValue,setInputValue] = useState("");

  function onAddClick(e) {
    dispatch({
      type: "add",
      value: inputValue
    })
  }

  return (
      <>
          <input type="text" className="px-20" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
          <button onClick={onAddClick}>Add</button>

          <ul>
            {todoItems.map(todoItem => (<li key={todoItem.id}>{todoItem.value}</li>))}
          </ul>
      </>
  );
}

export default App
