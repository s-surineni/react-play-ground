import React, { useState } from 'react';

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Render Props Pattern Example</h2>
      
      {/* First usage - Simple display */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Simple Counter</h3>
            <p>Count: {count}</p>
            <button onClick={increment} style={{ marginRight: '10px' }}>+</button>
            <button onClick={decrement} style={{ marginRight: '10px' }}>-</button>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      />

      {/* Second usage - Different styling and layout */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <h3>Styled Counter</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: count > 0 ? 'green' : count < 0 ? 'red' : 'black' }}>
              {count}
            </div>
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={increment}
                style={{ 
                  marginRight: '10px', 
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Increment
              </button>
              <button 
                onClick={decrement}
                style={{ 
                  marginRight: '10px', 
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Decrement
              </button>
              <button 
                onClick={reset}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      />

      {/* Third usage - With additional features */}
      <Counter
        render={({ count, increment, decrement, reset }) => (
          <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #333', borderRadius: '5px' }}>
            <h3>Advanced Counter</h3>
            <p>Current count: <strong>{count}</strong></p>
            <p>Count is: {count === 0 ? 'zero' : count > 0 ? 'positive' : 'negative'}</p>
            <p>Count squared: {count * count}</p>
            <div style={{ marginTop: '15px' }}>
              <button onClick={increment} style={{ marginRight: '10px' }}>Add 1</button>
              <button onClick={decrement} style={{ marginRight: '10px' }}>Subtract 1</button>
              <button onClick={reset}>Reset to Zero</button>
            </div>
          </div>
        )}
      />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '5px' }}>
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
