import { useEffect, useState } from "react"
import { Button,Input,TodoItem,Select } from "./components";
import "./index.css"
import { useTodos } from "./contexts/TodoContext";

function App() {
  const todos = useTodos();
  const [inputValue,setInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(""); // Dates in js haha
  const [selectValue,setSelectValue] = useState(0);

  useEffect(() => {
    resetValues()
  },[])

  useEffect(() => {
    if(!Array.isArray(todos.items)) return;
  },[todos.items])

  function resetValues() {
    setInputValue("");
    setTagsInputValue("");
    setDateInputValue(new Date(Date.now()).toISOString().split("T")[0]);
    setSelectValue(0);
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
                due: dateInputValue,
                tags: tagsInputValue.split(","),
                completed: false,
            }),
        }
    );
    const newItem = await resp.json();

    todos.dispatch({
        type: "add",
        value: newItem,
    });
    resetValues();
  }
  
  return (
      <div>
          <div className="heading flex items-center justify-center mt-4 md:mt-16">
              <h1 className="text-5xl font-extrabold uppercase">Todo list</h1>
          </div>
          <div className="top w-full flex-1 grow flex flex-col items justify-center p-4 gap-2 md:flex-row md:px-16 md:py-10">
              <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add Todo item"
                  
              />
              <Input
                  value={tagsInputValue}
                  onChange={(e) => setTagsInputValue(e.target.value)}
                  placeholder='Tags with "," separated.'
              />
              <Select
                  name="Priority"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
              >
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
              </Select>
              <Input 
                type="date" 
                value={dateInputValue} 
                onChange={(e) => {setDateInputValue(e.target.value)}}
              />
              <Button.Primary onClick={onAddClick} disabled={inputValue.length === 0}>Add</Button.Primary>
          </div>

          <ul className="flex flex-col gap-4 flex-1 mx-8 my-8 md:mx-32 lg:mx-64">
              {todos.items.map((todoItem) => (
                  <TodoItem item={todoItem} key={todoItem.id} />
              ))}
          </ul>
      </div>
  );
}

export default App
