import { useState } from "react";
import { useTodos } from "../contexts/TodoContext.tsx";
import {TodoItem} from "../types.ts"
import Button from "./Button"
import Input from "./Input.tsx";

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

    return (
        <div className="flex justify-between items-center">
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
            <div className="flex gap-4">
                <Button.Danger onClick={onClickRemove}>Smazat</Button.Danger>
            </div>
        </div>
    );
}

export default TodoItemComponent;