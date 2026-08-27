import { useState } from "react"
import style from "./UseCounter.module.css"

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initial)
  return { count, increment, decrement, reset }
}

function CounterCard({ label, accent }) {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <div className={style.card} style={{ "--accent": accent }}>
      <div className={style.cardHead}>
        <span className={style.label}>{label}</span>
        <strong className={style.count} data-testid={`${label}-count`}>
          {count}
        </strong>
      </div>

      <div className={style.controls}>
        <button
          type="button"
          className={style.step}
          data-testid={`${label}-dec`}
          aria-label={`Decrease ${label}`}
          onClick={decrement}
        >
          −
        </button>
        <button
          type="button"
          className={style.step}
          data-testid={`${label}-inc`}
          aria-label={`Increase ${label}`}
          onClick={increment}
        >
          +
        </button>
        <button
          type="button"
          className={style.reset}
          data-testid={`${label}-reset`}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

const UseCounter = () => {
  return (
    <div className={style.page}>
      <h1 className={style.title}>useCounter Custom Hook</h1>
      <p className={style.subtitle}>
        Both cards call the same hook. Each call gets its own state — changing
        Likes never touches Followers.
      </p>

      <div className={style.cards}>
        <CounterCard label="Likes" accent="#e11d48" />
        <CounterCard label="Followers" accent="#0284c7" />
      </div>

      <div className={style.note}>
        A custom hook is just a function starting with <code>use</code> that
        calls other hooks.
        <ul>
          <li>It can use <code>useState</code> like any component.</li>
          <li>Calling it twice creates two independent states.</li>
          <li>Components share the logic, not the data.</li>
        </ul>
      </div>
    </div>
  )
}

export default UseCounter
