import { useState } from "react"
import { Button,Input,TodoItem,Select } from "./components";
import "./index.css"
import { useTodos } from "./contexts/TodoContext";

function App() {
  const todos = useTodos();
  const [inputValue,setInputValue] = useState("");
  const [selectValue,setSelectValue] = useState(0);

  function onPrioritySelect(e) {
    setSelectValue(Number(e.target.value))
  }


  function onAddClick(e) {
    todos.dispatch({
        type: "add",
        value: {
          value: inputValue,
          priority: selectValue
        },
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
              <Select
                  name="Priority"
                  value={selectValue}
                  onChange={onPrioritySelect}
              >
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
              </Select>
              <Button.Primary onClick={onAddClick}>Add</Button.Primary>
          </div>

          <ul className="mx-64 flex flex-col gap-4">
              
              {todos.items.map((todoItem, index) => (
                  <TodoItem item={todoItem} key={todoItem.id} />
              ))}
          </ul>
      </div>
  );
}

export default App
