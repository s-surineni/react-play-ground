import React, { useState } from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", background: "#ffe6e6", border: "1px solid #ff9999", borderRadius: "8px" }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.message}</pre>
          <button onClick={() => this.setState({ hasError: false, error: null })} style={{ marginTop: "10px" }}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const BuggyCounter = ({ max = 3 }) => {
  const [count, setCount] = useState(0)
  if (count > max) throw new Error(`Count exceeded ${max}!`)

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", margin: "20px 0" }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ marginRight: "8px" }}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p style={{ fontSize: "12px", color: "#666" }}>Try incrementing past {max} to see the fallback.</p>
    </div>
  )
}

const ErrorBoundaryDemo = () => {
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
      <h1>Error Boundary</h1>
      <p>Class-component boundary that catches render errors and shows fallback UI.</p>

      <ErrorBoundary>
        <BuggyCounter max={3} />
      </ErrorBoundary>

      <div style={{ marginTop: "20px", padding: "12px", background: "#f8f9fa", borderRadius: "8px" }}>
        <h3>How it works</h3>
        <ul>
          <li><code>getDerivedStateFromError</code> updates state to trigger fallback.</li>
          <li><code>componentDidCatch</code> logs the error.</li>
          <li>The boundary catches errors in its children tree, not itself.</li>
          <li>Only class components can be error boundaries.</li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorBoundaryDemo
