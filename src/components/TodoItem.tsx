import { useState } from "react";
import { useTodos } from "../contexts/TodoContext.tsx";
import {
    RiCheckFill,
    RiCloseFill,
    RiDeleteBin6Fill,
    RiEditFill,
} from "react-icons/ri";

import {TodoItem} from "../types.ts"
import Button from "./Button"
import Input from "./Input.tsx";
import Select from "./Select.tsx";

function TodoItemComponent({ item }: { item: TodoItem }) {
    const todos = useTodos();
    const [editName, setEditName] = useState(false);
    const [editNameInput, setEditNameInput] = useState(item.value);

    const [editPriority, setEditPriority] = useState(false);

    async function onClickRemove() {
        const resp = await fetch(
            `https://6693a4cac6be000fa07cc618.mockapi.io/api/todos/${item.id}`,
            {
                method: "DELETE",
            }
        );
        const deletedItem = await resp.json();
        todos.dispatch({
            type: "remove",
            value: deletedItem,
        });
    }

    async function editItem(propsToEdit: object) {
        const resp = await fetch(
            `https://6693a4cac6be000fa07cc618.mockapi.io/api/todos/${item.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ ...item, ...propsToEdit }),
            }
        );
        const json = await resp.json();
        return json;
    }

    //Edit name
    function onClickEditTodoName(e) {
        setEditName(true);
    }

    function onChangeEditTodoName(e) {
        setEditNameInput(e.target.value);
    }

    //Edit priority
    function onClickEditPriority(e) {
        setEditPriority(true);
    }

    async function onClickEdit(e,editKey,editValue) {

        const editedItem = await editItem({
            [editKey]: editValue,
        });

        todos.dispatch({
            type: "edit",
            value: editedItem,
        });
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
                        <Button.Secondary
                            onClick={(e) => {
                                onClickEdit(e, "value", editNameInput)
                                setEditName(false);
                            }}
                        >
                            <RiEditFill />
                        </Button.Secondary>
                    </div>
                ) : (
                    <h1
                        className={`font-bold text-xl capitalize ${
                            item.completed && "line-through"
                        }`}
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
                            onChange={(e) => {
                                onClickEdit(e,"priority",Number(e.target.value))
                                setEditPriority(false);
                            }}
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
                <Button.Danger onClick={onClickRemove}>
                    <RiDeleteBin6Fill />
                </Button.Danger>
                <Button.Secondary
                    onClick={(e) =>
                        onClickEdit(e, "completed", !item.completed)
                    }
                >
                    {item.completed ? <RiCloseFill /> : <RiCheckFill />}
                </Button.Secondary>
            </div>
        </div>
    );
}

export default TodoItemComponent;