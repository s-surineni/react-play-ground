import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Component that logs when it renders
const RenderLogger = ({ children, name }) => {
  useEffect(() => {
    console.log(`🔄 ${name} rendered at ${new Date().toLocaleTimeString()}`);
  });

  return children;
};

// Render prop component for the counter value
const CounterRenderer = ({ count, renderCount, actualRenderCount, children }) => {
  return children({ count, renderCount, actualRenderCount });
};

// Memoized static content that won't re-render
const StaticContent = React.memo(() => (
  <RenderLogger name="CounterWithRenderProps - Static Content">
    <div className="static-content">
      This is static content that does NOT re-render when the count changes.
      This section remains stable and only renders once, demonstrating fine-grained control.
    </div>
  </RenderLogger>
));

// Memoized header that won't re-render
const StaticHeader = React.memo(() => (
  <RenderLogger name="CounterWithRenderProps - Static Header">
    <h3>Counter Component (Render Props Approach)</h3>
  </RenderLogger>
));

// Memoized buttons that won't re-render
const StaticButtons = React.memo(({ onIncrement, onReset }) => (
  <RenderLogger name="CounterWithRenderProps - Buttons">
    <div>
      <button className="button" onClick={onIncrement}>
        Increment Count
      </button>
      <button className="button" onClick={onReset}>
        Reset Count
      </button>
    </div>
  </RenderLogger>
));

function CounterWithRenderProps() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);


  // Track renders only when count changes
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [count]);

  // Track actual component renders using useRef to avoid infinite loops
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Memoize callbacks to prevent unnecessary re-renders
  const incrementCount = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  // Memoize the render function to prevent unnecessary re-renders
  const renderCounterValue = useMemo(() => {
    return ({ count, renderCount }) => (
      <RenderLogger name="CounterWithRenderProps - Counter Value">
        <div className="counter-value">Count: {count}</div>
      </RenderLogger>
    );
  }, []);

  const renderRenderCounter = useMemo(() => {
    return ({ renderCount, actualRenderCount }) => (
      <RenderLogger name="CounterWithRenderProps - Render Counter">
        <div>State Change Count: {renderCount}</div>
        <div>Actual Render Count: {actualRenderCount}</div>
      </RenderLogger>
    );
  }, []);

  return (
    <div>
      <RenderLogger name="CounterWithRenderProps - Main Container">
        <div className="counter-display">
          <RenderLogger name="CounterWithRenderProps - Counter Display">
            <div>
              {/* Static content that doesn't re-render */}
              <StaticHeader />
              
              {/* Dynamic content using render props - only this re-renders */}
              <CounterRenderer count={count} renderCount={renderCount} actualRenderCount={renderCountRef.current}>
                {({ count, renderCount, actualRenderCount }) => (
                  <div>
                    {renderCounterValue({ count, renderCount })}
                    {renderRenderCounter({ renderCount, actualRenderCount })}
                  </div>
                )}
              </CounterRenderer>
              
              {/* More static content that doesn't re-render */}
              <StaticContent />
              
              {/* Static buttons that don't re-render */}
              <StaticButtons onIncrement={incrementCount} onReset={resetCount} />
            </div>
          </RenderLogger>
        </div>
      </RenderLogger>
    </div>
  );
}

export default CounterWithRenderProps;
