import { useState, useCallback, memo, useRef } from 'react';

// Child component that will only re-render when its props change
const ExpensiveChild = memo(({ value, onIncrement, label }) => {
  console.log(`🔴 Rendering ${label} with value: ${value}`);
  
  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px 0',
      backgroundColor: '#ebf5fb'
    }}>
      <h4>{label}</h4>
      <p>Value: {value}</p>
      <button onClick={onIncrement} style={{
        padding: '8px 16px',
        cursor: 'pointer',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Increment {label}
      </button>
    </div>
  );
});

const UseCallbackExample = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [withoutCallbackCount, setWithoutCallbackCount] = useState(0);
  
  // Track parent renders using useRef to avoid infinite loop
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // ❌ WITHOUT useCallback - this function is recreated on EVERY render
  // This causes ExpensiveChild to re-render even when count2 changes
  const incrementWithoutCallback = () => {
    setWithoutCallbackCount(prev => prev + 1);
  };

  // ✅ WITH useCallback - this function is memoized and only recreated when count1 changes
  // This prevents ExpensiveChild from re-rendering when count2 changes
  const incrementWithCallback = useCallback(() => {
    setCount1(prev => prev + 1);
  }, []); // Empty dependency array means this function never changes

  // This one depends on count1, so it will be recreated when count1 changes
  const incrementCount2 = useCallback(() => {
    setCount2(prev => prev + 1);
  }, []); // Empty dependency array

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>useCallback Example</h2>
      
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ffc107'
      }}>
        <strong>💡 Watch the console!</strong>
        <p>Open your browser console to see which components are rendering.</p>
        <p>Parent render count: {renderCountRef.current}</p>
      </div>

      <div style={{
        backgroundColor: '#f8d7da',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #dc3545'
      }}>
        <h3>❌ Without useCallback</h3>
        <p>
          The increment function is recreated on every render, causing the child to re-render unnecessarily.
        </p>
        <p>Current value: {withoutCallbackCount}</p>
        <ExpensiveChild
          value={withoutCallbackCount}
          onIncrement={incrementWithoutCallback}
          label="Without useCallback"
        />
      </div>

      <div style={{
        backgroundColor: '#d4edda',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #28a745'
      }}>
        <h3>✅ With useCallback</h3>
        <p>
          The increment function is memoized, preventing unnecessary re-renders of the child.
        </p>
        
        <div style={{ marginBottom: '15px' }}>
          <p>Count 1: {count1}</p>
          <p>Count 2: {count2}</p>
        </div>

        <ExpensiveChild
          value={count1}
          onIncrement={incrementWithCallback}
          label="With useCallback (Count 1)"
        />
        
        <ExpensiveChild
          value={count2}
          onIncrement={incrementCount2}
          label="With useCallback (Count 2)"
        />
      </div>

      <div style={{
        backgroundColor: '#e2e3e5',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px',
        border: '1px solid #6c757d'
      }}>
        <h3>Key Takeaway:</h3>
        <ul>
          <li><strong>Without useCallback:</strong> Every time you click ANY button, the "Without useCallback" child re-renders</li>
          <li><strong>With useCallback:</strong> Only the child whose count changes will re-render</li>
          <li>This prevents unnecessary re-renders and improves performance, especially with expensive components</li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackExample;

