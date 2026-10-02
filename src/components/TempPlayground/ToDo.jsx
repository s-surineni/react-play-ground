import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { useState } from "react";

function Todo() {
    const [taskList, setTaskList] = useState(['hi', 'hillo'])
    return <>
        {taskList.map((item) => <TaskItem task={item}/>)}
    </>
}
export default Todo;