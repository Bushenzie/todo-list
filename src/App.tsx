import { useReducer, useState } from "react"
import Button from "./components/Button";
import Input from "./components/Input";
import "./index.css"
import { useTodos } from "./contexts/TodoContext";

function App() {
  const todos = useTodos();
  const [inputValue,setInputValue] = useState("");

  function onAddClick(e) {
    todos.dispatch({
        type: "add",
        value: inputValue,
    });
  }

  return (
      <>
          <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add Todo item"
          />
          <Button.Primary onClick={onAddClick}>Add</Button.Primary>

          <ul>
              {todos.items.map((todoItem) => (
                  <li key={todoItem.id}>{todoItem.value}</li>
              ))}
          </ul>
      </>
  );
}

export default App
