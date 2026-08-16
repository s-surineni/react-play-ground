import { useState } from "react"

const LazyTarget = () => {
  const [tick, setTick] = useState(0)

  useState(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ padding: "1.25rem", background: "#e6f7ff", border: "1px solid #91d5ff", borderRadius: "0.5rem" }}>
      <h3>Lazy Loaded Component</h3>
      <p>This component was loaded on demand. Ticks: {tick}</p>
    </div>
  )
}

export default LazyTarget
