import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { useState } from "react";

function Todo() {
    const [taskList, setTaskList] = useState(['hi', 'hillo'])
    return <><TaskItem />
        <TaskItem />
    </>
}
export default Todo;