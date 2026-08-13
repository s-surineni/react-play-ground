import { useState, useEffect, useMemo } from "react"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

const MOCK_ITEMS = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"]

const UseDebounce = () => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 400)

  const matches = useMemo(() => {
    if (!debouncedQuery) return []
    return MOCK_ITEMS.filter(item =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [debouncedQuery])

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>useDebounce Custom Hook</h1>
      <p>Filters a list after the user stops typing for 400ms.</p>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search fruits..."
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
      />

      <p style={{ fontSize: "12px", color: "#666" }}>
        Query: <code>{query}</code> → Debounced: <code>{debouncedQuery}</code>
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {matches.map(item => (
          <li key={item} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item}</li>
        ))}
        {matches.length === 0 && debouncedQuery && (
          <li style={{ padding: "8px", color: "#666" }}>No matches</li>
        )}
      </ul>
    </div>
  )
}

export default UseDebounce
