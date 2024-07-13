import { useState } from "react"
import { Button,Input,TodoItem } from "./components";
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
      <div>
          <div className="top flex items-center justify-center p-12 gap-2">
              <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add Todo item"
              />
              <Button.Primary onClick={onAddClick}>Add</Button.Primary>
          </div>

          <ul className="mx-64 flex flex-col gap-4">
              {todos.items.map((todoItem,index) => (
                <TodoItem item={todoItem} key={todoItem.id} />
              ))}
          </ul>
      </div>
  );
}

export default App
