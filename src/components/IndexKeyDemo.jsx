import React, { useState } from "react";
import "./IndexKeyDemo.css";

const ItemRow = ({ name }) => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="index-key-demo__item">
      <div>
        <span className="index-key-demo__label">{name}</span>
        <span className="index-key-demo__state">Local click count: {clickCount}</span>
      </div>
      <button
        type="button"
        className="index-key-demo__button"
        onClick={() => setClickCount((count) => count + 1)}
      >
        Click
      </button>
    </div>
  );
};

const IndexKeyDemo = () => {
  const initialItems = [
    { id: "apple", name: "Apple" },
    { id: "banana", name: "Banana" },
    { id: "cherry", name: "Cherry" },
    { id: "date", name: "Date" },
  ];

  const [items, setItems] = useState(initialItems);

  const rotateItems = () => {
    setItems((current) => [...current.slice(1), current[0]]);
  };

  const resetItems = () => {
    setItems(initialItems);
  };

  return (
    <section className="index-key-demo">
      <h1>React key example: array index vs stable id</h1>
      <p>
        Click the buttons for one or more items, then rotate the list. The example
        on the left uses <code>key={"index"}</code>, which can preserve the wrong
        state after the order changes. The example on the right uses a stable
        unique id, which keeps state attached to the correct item.
      </p>
      <div className="index-key-demo__controls">
        <button type="button" onClick={rotateItems} className="index-key-demo__action">
          Rotate items
        </button>
        <button type="button" onClick={resetItems} className="index-key-demo__action">
          Reset list
        </button>
      </div>

      <div className="index-key-demo__grid">
        <div className="index-key-demo__panel">
          <h2>Bad: key = index</h2>
          <div className="index-key-demo__subtitle">
            React uses the list position instead of item identity. Local state can move
            to the wrong item after reordering.
          </div>
          <div className="index-key-demo__list">
            {items.map((item, index) => (
              <ItemRow key={index} name={item.name} />
            ))}
          </div>
        </div>

        <div className="index-key-demo__panel">
          <h2>Good: key = item.id</h2>
          <div className="index-key-demo__subtitle">
            Each item keeps the same key after reordering, so React preserves the
            right component state.
          </div>
          <div className="index-key-demo__list">
            {items.map((item) => (
              <ItemRow key={item.id} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexKeyDemo;
