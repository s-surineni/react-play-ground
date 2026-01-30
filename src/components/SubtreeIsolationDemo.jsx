import React, { useState, useRef } from 'react';

// Component that logs when it renders
const RenderLogger = ({ children, name }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  console.log(`🔄 ${name} rendered (Render #${renderCountRef.current}) at ${new Date().toLocaleTimeString()}`);
  
  return (
    <div style={{ 
      border: '2px solid #007bff', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '6px'
    }}>
      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '5px', 
        marginBottom: '10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
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
    <div style={{ 
      backgroundColor: '#fff3cd', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #ffeaa7'
    }}>
      <h4>{name}</h4>
      <p>This is an expensive component that should NOT re-render unnecessarily.</p>
      <p><strong>Render Count: {renderCountRef.current}</strong></p>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ margin: '2px 0' }}>
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
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
            <h4>Static Content (Re-renders Every Time!)</h4>
            <p>This content should be static but re-renders because hooks cause component-level re-renders.</p>
            <ExpensiveComponent name="Expensive Component in Hooks" />
          </div>
        </RenderLogger>
        
        {/* Dynamic content */}
        <RenderLogger name="Hooks Approach - Dynamic Subtree">
          <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '6px' }}>
            <h4>Dynamic Content</h4>
            <p>Count: <strong>{count}</strong></p>
            <p>State Changes: <strong>{renderCount}</strong></p>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
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
    <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
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
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '6px' }}>
        <h4>Dynamic Content</h4>
        <p>Count: <strong>{count}</strong></p>
        <p>State Changes: <strong>{renderCount}</strong></p>
        <button 
          onClick={onIncrement}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Subtree Isolation Demo
      </h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ color: '#495057', marginTop: 0 }}>
          Performance Difference Explained
        </h2>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', color: '#6c757d' }}>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        <div>
          <h2 style={{ color: '#333', textAlign: 'center' }}>
            Hooks Approach
          </h2>
          <HooksApproach />
        </div>
        
        <div>
          <h2 style={{ color: '#333', textAlign: 'center' }}>
            Render Props Approach
          </h2>
          <RenderPropsApproach />
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ color: '#0056b3', marginTop: 0 }}>
          Key Insight: Subtree Isolation
        </h3>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', color: '#0056b3' }}>
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
