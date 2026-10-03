import { useState } from "react";

const initialTasks = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Walk dog" },
];

function IndexKeyExample() {
  const [tasks, setTasks] = useState(initialTasks);

  function removeFirstTask() {
    setTasks((currentTasks) => currentTasks.slice(1));
  }

  return (
    <section>
      <h2>Index key example</h2>
      <p>
        Check the first task, then remove it. With index keys, the checkbox
        state incorrectly moves to the next task.
      </p>
      <button type="button" onClick={removeFirstTask}>
        Remove first task
      </button>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </section>
  );
}

function TaskItem({ task }) {
  const [completed, setCompleted] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted((current) => !current)}
      />
      {task.text}
    </label>
  );
}

export default IndexKeyExample;
