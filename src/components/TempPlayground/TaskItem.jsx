function TaskItem({task, deleteTask}) {
    return <>{task.text} <button onClick={() => deleteTask(task.id)}>delete</button></>
}
export default TaskItem