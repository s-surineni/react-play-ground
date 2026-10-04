function TaskItem({task,  onDeleteTask}) {
    return <>{task.text} <button type="button" onClick={() => onDeleteTask(task.id)} aria-label={`Delete task ${task.text}`}>delete</button></>
}
export default TaskItem
