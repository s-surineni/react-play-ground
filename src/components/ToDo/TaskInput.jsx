import PropTypes from 'prop-types'
import { useId } from 'react'

function TaskInput({ onAddTask, inputRef }) {
    const inputId = useId()

    function onSubmit(event) {
        event.preventDefault()
        const task = new FormData(event.currentTarget).get('task')?.trim()
        if (!task) return
        onAddTask(task)
        event.currentTarget.reset()
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor={inputId}>
                task<span aria-hidden="true">*</span>:
            </label>
            <input
                ref={inputRef}
                id={inputId}
                type="text"
                required
                placeholder="add a task"
                name="task"
            />
            <button type="submit">Add</button>
        </form>
    )
}

TaskInput.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
    ]),
}

export default TaskInput

