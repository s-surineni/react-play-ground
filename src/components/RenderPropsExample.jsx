import React, { useState } from 'react';
import './RenderPropsExample.css';

// Component that uses render props pattern
const Counter = ({ render }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  // Pass the state and functions to the render prop
  return render({
    count,
    increment,
    decrement,
    reset
  });
};

// Example usage component
const RenderPropsExample = () => {
  return (
    <div className="render-props-example">
      <h2>Render Props Pattern Example</h2>
      
      {/* First usage - Simple display */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div className="render-props-example__simple">
            <h3>Simple Counter</h3>
            <p>Count: {count}</p>
            <button onClick={increment} className="render-props-example__simple-btn">+</button>
            <button onClick={decrement} className="render-props-example__simple-btn">-</button>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      />

      {/* Second usage - Different styling and layout */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div className="render-props-example__styled">
            <h3>Styled Counter</h3>
            <div className={`render-props-example__styled-value ${count > 0 ? 'render-props-example__styled-value--positive' : count < 0 ? 'render-props-example__styled-value--negative' : 'render-props-example__styled-value--zero'}`}>
              {count}
            </div>
            <div className="render-props-example__styled-buttons">
              <button onClick={increment} className="render-props-example__btn render-props-example__btn--increment">
                Increment
              </button>
              <button onClick={decrement} className="render-props-example__btn render-props-example__btn--decrement">
                Decrement
              </button>
              <button onClick={reset} className="render-props-example__btn render-props-example__btn--reset">
                Reset
              </button>
            </div>
          </div>
        )}
      />

      {/* Third usage - With additional features */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div className="render-props-example__advanced">
            <h3>Advanced Counter</h3>
            <p>Current count: <strong>{count}</strong></p>
            <p>Count is: {count === 0 ? 'zero' : count > 0 ? 'positive' : 'negative'}</p>
            <p>Count squared: {count * count}</p>
            <div className="render-props-example__advanced-buttons">
              <button onClick={increment} className="render-props-example__advanced-btn">Add 1</button>
              <button onClick={decrement} className="render-props-example__advanced-btn">Subtract 1</button>
              <button onClick={reset}>Reset to Zero</button>
            </div>
          </div>
        )}
      />

      <div className="render-props-example__how">
        <h3>How Render Props Work:</h3>
        <ul>
          <li>The <code>Counter</code> component manages state internally</li>
          <li>It passes its state and functions to a <code>render</code> prop</li>
          <li>Each usage can customize how the data is displayed</li>
          <li>This pattern allows for maximum flexibility in UI rendering</li>
          <li>Common alternatives include Higher-Order Components (HOCs) and Custom Hooks</li>
        </ul>
      </div>
    </div>
  );
};

export default RenderPropsExample;
