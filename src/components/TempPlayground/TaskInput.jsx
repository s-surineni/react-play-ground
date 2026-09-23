import PropTypes from 'prop-types'

function TaskInput({ handleSubmit }) {
    function onSubmit(event) {
        event.preventDefault()
        const task = new FormData(event.currentTarget).get('task')?.trim()
        if (!task) return
        handleSubmit(task)
        event.currentTarget.reset()
    }
    return <form onSubmit={onSubmit}><label>task<span aria-hidden="true">*</span>:
        <input type='text' required
            placeholder="add a task" name='task' /></label>
        <button type="submit">Add</button>
    </form>
}

TaskInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

export default TaskInput
