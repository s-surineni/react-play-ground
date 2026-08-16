import { useState, Suspense } from "react"
import { lazy } from "react"

const LazyTarget = lazy(() => import("./LazyTarget"))

const LazySuspense = () => {
  const [show, setShow] = useState(false)

  return (
    <div style={{ maxWidth: "30rem", margin: "0 auto", padding: "1.25rem" }}>
      <h1>Suspense + React.lazy</h1>
      <p>Code-splits the target component so it only loads on demand.</p>

      <button onClick={() => setShow(true)} disabled={show} style={{ padding: "0.5rem 1rem", marginBottom: "0.75rem" }}>
        Load lazy component
      </button>

      {show && (
        <Suspense
          fallback={
            <div style={{ padding: "1.25rem", border: "1px dashed #999", borderRadius: "0.5rem" }}>
              Loading component...
            </div>
          }
        >
          <LazyTarget />
        </Suspense>
      )}

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "#f8f9fa", borderRadius: "0.5rem" }}>
        <h3>How it works</h3>
        <ul>
          <li><code>React.lazy</code> wraps a dynamic import and returns a component.</li>
          <li><code>Suspense</code> shows fallback UI while the chunk loads.</li>
          <li>Requires a bundler (Vite, webpack) to split code into chunks.</li>
        </ul>
      </div>
    </div>
  )
}

export default LazySuspense
