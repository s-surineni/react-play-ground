import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { useState } from "react";

function Todo() {
    const [taskList, setTaskList] = useState([{id: 1, text: 'hi'}, {id: 2, text: 'hillo'}])
    function handleSubmit(text) {
        setTaskList([
            {id: crypto.randomUUID(),text}, ...taskList])
    }
    return <>
    <TaskInput handleSubmit={handleSubmit}/>
               {taskList.map((item) => <TaskItem task={item.text} key={item.id}/>)}
    </>
}
export default Todo;
