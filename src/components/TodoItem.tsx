
import { useTodos } from "../contexts/TodoContext.tsx";
import {TodoItem} from "../types.ts"
import {Button} from "./"

function TodoItemComponent({ item }: { item: TodoItem }) {

    const todos = useTodos();

    function onClickRemove() {
        todos.dispatch({
            type: "remove",
            value: item.id
        })
    }

    function onClickEdit() {
        todos.dispatch({
            type: "edit",
            value: item.id
        })
    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl capitalize">
                {item.value} | Priority: {item.priority === 1 ? "Low" : item.priority === 2 ? "Medium" : "High"}
            </h1>
            <div className="flex gap-4">
                <Button.Danger onClick={onClickRemove}>Smazat</Button.Danger>
                <Button.Secondary onClick={onClickEdit}>Edit</Button.Secondary>
            </div>
        </div>
    );
}

export default TodoItemComponent;