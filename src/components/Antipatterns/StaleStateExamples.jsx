import { useState } from "react";

function StaleStateExamples() {
  const [directTasks, setDirectTasks] = useState([]);
  const [functionalTasks, setFunctionalTasks] = useState([]);

  function addDirectTasks() {
    const taskList = directTasks;
    setDirectTasks([{ text: "First" }, ...taskList]);
    setDirectTasks([{ text: "Second" }, ...taskList]);
  }

  function addFunctionalTasks() {
    setFunctionalTasks((currentTasks) => [
      { text: "First" },
      ...currentTasks,
    ]);
    setFunctionalTasks((currentTasks) => [
      { text: "Second" },
      ...currentTasks,
    ]);
  }

  return (
    <section>
      <h2>Stale state update example</h2>
      <p>
        When the next state depends on the previous state, the functional form
        lets React provide the latest pending state to each update.
      </p>

      <article>
        <h3>Direct updates</h3>
        <button type="button" onClick={addDirectTasks}>
          Add two tasks directly
        </button>
        <p>
          Tasks added: {directTasks.map((task) => task.text).join(", ") || "none"}
        </p>
      </article>

      <article>
        <h3>Functional updates</h3>
        <button type="button" onClick={addFunctionalTasks}>
          Add two tasks functionally
        </button>
        <p>
          Tasks added: {functionalTasks.map((task) => task.text).join(", ") || "none"}
        </p>
      </article>
    </section>
  );
}

export default StaleStateExamples;
