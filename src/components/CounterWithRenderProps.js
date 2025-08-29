import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

/**
 * Counter component that uses the render prop pattern
 * This allows the parent component to control exactly how the counter UI is rendered
 * while the counter logic is encapsulated within this component.
 *
 * @param {Object} props - Component props
 * @param {Function} props.render - Function that receives counter state and methods, returns JSX
 * @param {Function} props.children - Alternative to render prop, can be a function that receives counter state and methods
 * @returns {JSX.Element} Rendered content from the render prop or children function
 */
function CounterWithRenderProps({ render, children }) {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Track renders only when count changes
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [count]);

  // Track actual component renders using useRef to avoid infinite loops
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Memoize callbacks to prevent unnecessary re-renders
  const increment = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    []
  );
  const decrement = useCallback(
    () => setCount((prevCount) => prevCount - 1),
    []
  );
  const reset = useCallback(() => setCount(0), []);

  // Create the counter state object to pass to render functions
  const counterState = useMemo(
    () => ({
      count,
      increment,
      decrement,
      reset,
      renderCount,
      actualRenderCount: renderCountRef.current,
    }),
    [count, increment, decrement, reset, renderCount, renderCountRef.current]
  );

  // Render prop pattern: call the render function with counter state
  if (render && typeof render === "function") {
    return render(counterState);
  }

  // Alternative: children as function pattern
  if (children && typeof children === "function") {
    return children(counterState);
  }

  // Fallback: if no render prop or children function provided, show a default UI
  return (
    <div className="counter-default">
      <h3>Counter: {count}</h3>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="render-info">
        <div>State Change Count: {renderCount}</div>
        <div>Actual Render Count: {renderCountRef.current}</div>
      </div>
    </div>
  );
}

export default CounterWithRenderProps;
