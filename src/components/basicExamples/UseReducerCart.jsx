import { useReducer, useState } from "react"

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const exists = state.items.find(i => i.name === action.item.name)
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.name === action.item.name ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case "remove":
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case "clear":
      return { ...state, items: [] }
    default:
      return state
  }
}

const UseReducerCart = () => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const addItem = () => {
    if (!name) return
    dispatch({ type: "add", item: { id: Date.now(), name, price: Number(price) || 0 } })
    setName("")
    setPrice("")
  }

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
      <h1>Shopping Cart (useReducer)</h1>
      <p>State transitions are centralized in a reducer instead of multiple setState calls.</p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item name"
          style={{ flex: 1, padding: "8px" }}
        />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          style={{ width: "80px", padding: "8px" }}
        />
        <button onClick={addItem} style={{ padding: "8px 16px" }}>Add</button>
      </div>

      {state.items.map(item => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
          <span>{item.name} x{item.qty}</span>
          <span>${(item.price * item.qty).toFixed(2)}</span>
          <button onClick={() => dispatch({ type: "remove", id: item.id })} style={{ color: "red" }}>Remove</button>
        </div>
      ))}

      {state.items.length > 0 && (
        <button onClick={() => dispatch({ type: "clear" })} style={{ marginTop: "12px" }}>Clear Cart</button>
      )}

      <p style={{ marginTop: "16px", fontWeight: "bold" }}>Total: ${total.toFixed(2)}</p>
    </div>
  )
}

export default UseReducerCart
