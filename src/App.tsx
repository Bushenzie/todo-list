import { useEffect, useState } from "react"
import { Button,Input,TodoItem,Select } from "./components";
import "./index.css"
import { useTodos } from "./contexts/TodoContext";

function App() {
  const todos = useTodos();
  const [inputValue,setInputValue] = useState("");
  const [selectValue,setSelectValue] = useState(0);

  useEffect(() => {
    if(!Array.isArray(todos.items)) return;
  },[todos.items])

  function onPrioritySelect(e) {
    setSelectValue(Number(e.target.value))
  }

  function onInputChange(e) {
    setInputValue(e.target.value)
  }

  async function onAddClick(e) {
    const resp = await fetch(
        "https://6693a4cac6be000fa07cc618.mockapi.io/api/todos",
        {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                value: inputValue,
                priority: selectValue,
                completed: false,
            }),
        }
    );
    const newItem = await resp.json();

    todos.dispatch({
        type: "add",
        value: newItem,
    });
    setInputValue("")
    setSelectValue(0)
  }
  return (
      <div className="">
          <div className="top w-full flex-1 grow flex flex-col items justify-center p-4 gap-2 md:flex-row md:p-16">
              <Input
                  value={inputValue}
                  onChange={onInputChange}
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

          <ul className="flex flex-col gap-4 flex-1 mx-8 md:mx-32 lg:mx-64">
              {todos.items.map((todoItem) => (
                  <TodoItem item={todoItem} key={todoItem.id} />
              ))}
          </ul>
      </div>
  );
}

export default App
