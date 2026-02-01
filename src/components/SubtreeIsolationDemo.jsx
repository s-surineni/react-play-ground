import React, { useState, useRef } from 'react';
import './SubtreeIsolationDemo.css';

// Component that logs when it renders
const RenderLogger = ({ children, name }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  console.log(`🔄 ${name} rendered (Render #${renderCountRef.current}) at ${new Date().toLocaleTimeString()}`);
  
  return (
    <div className="subtree-demo__logger">
      <div className="subtree-demo__logger-header">
        {name} - Render #{renderCountRef.current}
      </div>
      {children}
    </div>
  );
};

// Expensive component that we want to isolate from re-renders
const ExpensiveComponent = React.memo(({ name }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  console.log(`🔄 ${name} rendered (Render #${renderCountRef.current}) at ${new Date().toLocaleTimeString()}`);
  
  return (
    <div className="subtree-demo__expensive">
      <h4>{name}</h4>
      <p>This is an expensive component that should NOT re-render unnecessarily.</p>
      <p><strong>Render Count: {renderCountRef.current}</strong></p>
      <div className="subtree-demo__expensive-inner">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="subtree-demo__expensive-row">
            Expensive operation #{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
});

// Hooks approach - everything re-renders
function HooksApproach() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  
  // Track renders only when count changes
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [count]);
  
  return (
    <RenderLogger name="Hooks Approach - Main Container">
      <div>
        <h3>Hooks Approach - Everything Re-renders</h3>
        
        {/* This entire subtree re-renders when count changes */}
        <RenderLogger name="Hooks Approach - Static Subtree">
          <div className="subtree-demo__static-content">
            <h4>Static Content (Re-renders Every Time!)</h4>
            <p>This content should be static but re-renders because hooks cause component-level re-renders.</p>
            <ExpensiveComponent name="Expensive Component in Hooks" />
          </div>
        </RenderLogger>
        
        {/* Dynamic content */}
        <RenderLogger name="Hooks Approach - Dynamic Subtree">
          <div className="subtree-demo__dynamic-content">
            <h4>Dynamic Content</h4>
            <p>Count: <strong>{count}</strong></p>
            <p>State Changes: <strong>{renderCount}</strong></p>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              className="subtree-demo__btn"
            >
              Increment Count
            </button>
          </div>
        </RenderLogger>
      </div>
    </RenderLogger>
  );
}

// Render props approach - isolated subtrees
function RenderPropsApproach() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  
  // Track renders only when count changes
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [count]);
  
  return (
    <RenderLogger name="Render Props Approach - Main Container">
      <div>
        <h3>Render Props Approach - Isolated Subtrees</h3>
        
        {/* This subtree is COMPLETELY isolated from re-renders */}
        <StaticSubtree />
        
        {/* Only this subtree re-renders when count changes */}
        <DynamicSubtree count={count} renderCount={renderCount} onIncrement={() => setCount(prev => prev + 1)} />
      </div>
    </RenderLogger>
  );
}

// This subtree NEVER re-renders, even when parent state changes
const StaticSubtree = React.memo(() => (
  <RenderLogger name="Render Props Approach - Static Subtree (Isolated)">
    <div className="subtree-demo__static-content">
      <h4>Static Content (NEVER Re-renders!)</h4>
      <p>This content is isolated using React.memo and won't re-render when the parent's state changes.</p>
      <ExpensiveComponent name="Expensive Component in Render Props" />
    </div>
  </RenderLogger>
));

// This subtree only re-renders when its props change
function DynamicSubtree({ count, renderCount, onIncrement }) {
  return (
    <RenderLogger name="Render Props Approach - Dynamic Subtree">
      <div className="subtree-demo__dynamic-content">
        <h4>Dynamic Content</h4>
        <p>Count: <strong>{count}</strong></p>
        <p>State Changes: <strong>{renderCount}</strong></p>
        <button 
          onClick={onIncrement}
          className="subtree-demo__btn"
        >
          Increment Count
        </button>
      </div>
    </RenderLogger>
  );
}

export { HooksApproach, RenderPropsApproach };

// Default export wrapper for routing
const SubtreeIsolationDemo = () => {
  return (
    <div className="subtree-demo">
      <h1 className="subtree-demo__title">
        Subtree Isolation Demo
      </h1>
      
      <div className="subtree-demo__intro">
        <h2 className="subtree-demo__intro-title">
          Performance Difference Explained
        </h2>
        <ul className="subtree-demo__intro-list">
          <li>
            <strong>Hooks Approach:</strong> When state changes, the entire
            component re-renders, including static content
          </li>
          <li>
            <strong>Render Props Approach:</strong> Only the specific rendered
            content changes, static content doesn't re-render
          </li>
          <li>
            <strong>Key Benefit:</strong> Fine-grained control over what gets
            re-rendered in your JSX
          </li>
          <li>
            <strong>Use Case:</strong> Performance-critical UIs where you need
            to minimize re-render scope
          </li>
        </ul>
      </div>

      <div className="subtree-demo__grid">
        <div>
          <h2 className="subtree-demo__column-title">
            Hooks Approach
          </h2>
          <HooksApproach />
        </div>
        
        <div>
          <h2 className="subtree-demo__column-title">
            Render Props Approach
          </h2>
          <RenderPropsApproach />
        </div>
      </div>

      <div className="subtree-demo__insight">
        <h3 className="subtree-demo__insight-title">
          Key Insight: Subtree Isolation
        </h3>
        <ul className="subtree-demo__insight-list">
          <li>
            <strong>Hooks:</strong> When count changes, the ENTIRE component
            tree re-renders, including expensive static components
          </li>
          <li>
            <strong>Render Props:</strong> Only the dynamic subtree
            re-renders; static subtrees are completely isolated
          </li>
          <li>
            <strong>Performance Impact:</strong> In complex UIs, this can mean
            the difference between smooth 60fps and choppy performance
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubtreeIsolationDemo;
