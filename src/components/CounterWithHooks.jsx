import React, { useState, useEffect, useRef } from 'react';

// Component that logs when it renders
const RenderLogger = ({ children, name }) => {
  useEffect(() => {
    console.log(`🔄 ${name} rendered at ${new Date().toLocaleTimeString()}`);
  });

  return children;
};

function CounterWithHooks() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);


  // Track renders only when count changes
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [count]);

  // Track actual component renders using useRef to avoid infinite loops
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div>
      {/* This entire div re-renders when count changes */}
      <RenderLogger name="CounterWithHooks - Main Container">
        <div className="counter-display">
          <RenderLogger name="CounterWithHooks - Counter Display">
            <div>
              <RenderLogger name="CounterWithHooks - Static Header">
                <h3>Counter Component (Hooks Approach)</h3>
              </RenderLogger>
              
              <RenderLogger name="CounterWithHooks - Counter Value">
                <div className="counter-value">Count: {count}</div>
              </RenderLogger>
              
              <RenderLogger name="CounterWithHooks - Render Counter">
                <div>State Change Count: {renderCount}</div>
                <div>Actual Render Count: {renderCountRef.current}</div>
              </RenderLogger>
              
              <RenderLogger name="CounterWithHooks - Static Content">
                <div className="static-content">
                  This is static content that re-renders every time the component updates.
                  Notice how this entire section gets re-rendered even when only the count changes.
                </div>
              </RenderLogger>
              
              <RenderLogger name="CounterWithHooks - Buttons">
                <div>
                  <button className="button" onClick={incrementCount}>
                    Increment Count
                  </button>
                  <button className="button" onClick={resetCount}>
                    Reset Count
                  </button>
                </div>
              </RenderLogger>
            </div>
          </RenderLogger>
        </div>
      </RenderLogger>
    </div>
  );
}

export default CounterWithHooks;
