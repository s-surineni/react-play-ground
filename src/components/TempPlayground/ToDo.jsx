import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { useState } from "react";

function Todo() {
    const [taskList, setTaskList] = useState([{ id: 1, text: 'hi' }, { id: 2, text: 'hillo' }])
    function handleSubmit(text) {
        setTaskList((prevTaskList) => {
            return [
                { id: crypto.randomUUID(), text }, ...prevTaskList]
        })
    }

    function deleteTask(taskId) {
        setTaskList(prevTaskList => prevTaskList.filter((item) => item.id != taskId))
    }
    return <>
        <TaskInput handleSubmit={handleSubmit} />
        <ul>
            {taskList.map((item) => <li key={item.id}>
                <TaskItem task={item} deleteTask={deleteTask} />
            </li>)}
        </ul>
    </>
}
export default Todo;
