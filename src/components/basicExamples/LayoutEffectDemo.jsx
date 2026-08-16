import { useState, useRef, useEffect, useLayoutEffect } from "react"

const Box = () => {
  const ref = useRef(null)
  const [layoutPos, setLayoutPos] = useState(null)
  const [effectPos, setEffectPos] = useState(null)

  useLayoutEffect(() => {
    if (ref.current) {
      setLayoutPos(ref.current.getBoundingClientRect().x.toFixed(1))
    }
  })

  useEffect(() => {
    if (ref.current) {
      setEffectPos(ref.current.getBoundingClientRect().x.toFixed(1))
    }
  })

  return (
    <div
      ref={ref}
      style={{
        width: "6.25rem",
        height: "3.75rem",
        background: "#ffd666",
        border: "2px solid #faad14",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Box
    </div>
  )
}

const LayoutEffectDemo = () => {
  const [items, setItems] = useState(0)

  return (
    <div style={{ maxWidth: "30rem", margin: "0 auto", padding: "1.25rem" }}>
      <h1>useLayoutEffect vs useEffect</h1>
      <p>Both run after render, but <code>useLayoutEffect</code> fires before the browser paints.</p>

      <button
        onClick={() => setItems(n => n + 1)}
        style={{ padding: "0.5rem 1rem", marginBottom: "1.25rem" }}
      >
        Prepend item ({items})
      </button>

      <div style={{ position: "relative", height: "13.75rem", border: "1px dashed #ccc", borderRadius: "0.5rem", overflow: "hidden", padding: "0.5rem" }}>
        {Array.from({ length: items }).map((_, i) => (
          <Box key={i} />
        ))}
      </div>

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "#f8f9fa", borderRadius: "0.5rem" }}>
        <h3>Key difference</h3>
        <ul>
          <li><code>useEffect</code>: runs after paint. User may see a flash of the old position before it updates.</li>
          <li><code>useLayoutEffect</code>: runs synchronously after all DOM mutations but before paint. Use it for DOM measurements and synchronous mutations.</li>
          <li>In this demo, the yellow box squares measure their <code>x</code> position in both effects.</li>
        </ul>
      </div>
    </div>
  )
}

export default LayoutEffectDemo
