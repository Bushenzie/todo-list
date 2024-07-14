import { useState } from "react";
import { useTodos } from "../contexts/TodoContext.tsx";
import {TodoItem} from "../types.ts"
import Button from "./Button"
import Input from "./Input.tsx";
import Select from "./Select.tsx";

function TodoItemComponent({ item }: { item: TodoItem }) {

    const todos = useTodos();
    const [editName, setEditName] = useState(false);
    const [editNameInput,setEditNameInput] = useState(item.value);

    const [editPriority, setEditPriority] = useState(false);

    function onClickRemove() {
        todos.dispatch({
            type: "remove",
            value: {
                id: item.id,
                value: "",
                priority: 0
            }
        })
    }

    //Edit name
    function onClickEditTodoName(e) {
        setEditName(true);
    }

    function onChangeEditTodoName(e) {
        setEditNameInput(e.target.value);
    }

    function onClickEditTodoNameBtn(e) {
        todos.dispatch({
            type: "edit",
            value: {
                id: item.id,
                value: editNameInput,
                priority: item.priority
            },
        });

        setEditName(false)
    }   

    //Edit priority
    function onClickEditPriority(e) {
        setEditPriority(true);
    }

    function onChangeEditPriority(e) {
        todos.dispatch({
            type: "edit",
            value: {
                id: item.id,
                value: item.value,
                priority: Number(e.target.value),
            },
        });

        setEditPriority(false);
    }

    return (
        <div className="flex justify-between items-center">
            <div className="text-wrapper">
                {editName ? (
                    <div className="flex">
                        <Input
                            value={editNameInput}
                            onChange={onChangeEditTodoName}
                        />
                        <Button.Secondary onClick={onClickEditTodoNameBtn}>
                            Confirm
                        </Button.Secondary>
                    </div>
                ) : (
                    <h1
                        className="font-bold text-xl capitalize"
                        onClick={onClickEditTodoName}
                    >
                        {item.value}
                    </h1>
                )}
                {editPriority ? (
                    <div className="flex">
                        <Select
                            name="Priority"
                            value={item.priority}
                            onChange={onChangeEditPriority}
                        >
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </Select>
                    </div>
                ) : (
                    <span
                        className="text-lg text-gray-500"
                        onClick={onClickEditPriority}
                    >
                        {item.priority === 3
                            ? "High"
                            : item.priority === 2
                            ? "Medium"
                            : item.priority === 1
                            ? "Low"
                            : "Not defined"}
                    </span>
                )}
            </div>
            <div className="flex gap-4">
                <Button.Danger onClick={onClickRemove}>Smazat</Button.Danger>
            </div>
        </div>
    );
}

export default TodoItemComponent;