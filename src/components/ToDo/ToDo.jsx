import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { useState, useRef } from "react";
import "./ToDo.css";

const srOnlyStyle = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
};

function Todo() {
    const [taskList, setTaskList] = useState([
        { id: 1, text: 'hi' },
        { id: 2, text: 'hillo' },
    ]);
    const [statusMessage, setStatusMessage] = useState("");
    const inputRef = useRef(null);

    function handleAddTask(text) {
        // If text is empty or only whitespace (e.g. if invoked outside of TaskInput),
        const trimmed = text?.trim();
        if (!trimmed) return;
        setTaskList((prevTaskList) => [
            { id: crypto.randomUUID(), text: trimmed },
            ...prevTaskList,
        ]);
        setStatusMessage(`Task "${trimmed}" added.`);
    }

    function handleDeleteTask(taskId, taskText) {
        const itemToDelete = taskList.find((item) => item.id === taskId);
        const text = taskText || itemToDelete?.text || "item";
        setTaskList((prevTaskList) => prevTaskList.filter((item) => item.id !== taskId));
        setStatusMessage(`Task "${text}" deleted.`);
        inputRef.current?.focus();
    }

    return (
        <section aria-labelledby="todo-heading" className="todo-container">
            <h2 id="todo-heading">To-Do List</h2>
            <TaskInput onAddTask={handleAddTask} inputRef={inputRef} />
            {taskList.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                <ul aria-label="Tasks">
                    {taskList.map((item) => (
                        <li key={item.id}>
                            <TaskItem task={item} onDeleteTask={handleDeleteTask} />
                        </li>
                    ))}
                </ul>
            )}
            <div role="status" aria-live="polite" style={srOnlyStyle}>
                {statusMessage}
            </div>
        </section>
    );
}
export default Todo;
