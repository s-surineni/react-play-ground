import React, { createContext, useContext, useState } from "react"

const AccordionContext = createContext(null)

function Accordion({ children, defaultOpen = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  )
}

function Item({ children, index }) {
  return <div className="accordion__item">{children}</div>
}

function Button({ children, index }) {
  const { openIndex, toggle } = useContext(AccordionContext)
  const isOpen = openIndex === index

  return (
    <button
      className={`accordion__button ${isOpen ? "accordion__button--open" : ""}`}
      onClick={() => toggle(index)}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "12px",
        border: "1px solid #ddd",
        background: isOpen ? "#f0f0f0" : "white",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

function Panel({ children, index }) {
  const { openIndex } = useContext(AccordionContext)
  if (openIndex !== index) return null

  return (
    <div className="accordion__panel" style={{ padding: "12px", border: "1px solid #ddd", borderTop: "none" }}>
      {children}
    </div>
  )
}

Accordion.Item = Item
Accordion.Button = Button
Accordion.Panel = Panel

export default Accordion
