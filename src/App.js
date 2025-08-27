import React, { useState } from 'react';
import CounterWithHooks from './components/CounterWithHooks';
import CounterWithRenderProps from './components/CounterWithRenderProps';
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  const [showPerformanceInfo, setShowPerformanceInfo] = useState(false);

  return (
    <div className="container">
      <h1>Render Props vs Hooks Performance Demo</h1>
      <p>
        This demo shows the performance difference between using hooks and render props 
        for fine-grained rendering control. Open your browser's DevTools and watch the 
        console for render logs.
      </p>

      <button 
        className="button" 
        onClick={() => setShowPerformanceInfo(!showPerformanceInfo)}
      >
        {showPerformanceInfo ? 'Hide' : 'Show'} Performance Explanation
      </button>

      {showPerformanceInfo && (
        <div className="performance-info">
          <h3>Performance Difference Explained</h3>
          <ul>
            <li><strong>Hooks Approach:</strong> When state changes, the entire component re-renders, including static content</li>
            <li><strong>Render Props Approach:</strong> Only the specific rendered content changes, static content doesn't re-render</li>
            <li><strong>Key Benefit:</strong> Fine-grained control over what gets re-rendered in your JSX</li>
            <li><strong>Use Case:</strong> Performance-critical UIs where you need to minimize re-render scope</li>
          </ul>
        </div>
      )}

      <div className="demo-section">
        <h2 className="demo-title">Counter with Hooks (Component-Level Rendering)</h2>
        <CounterWithHooks />
        <p>
          <strong>Note:</strong> When you click the increment button, the entire component re-renders, 
          including the static content. Check the console to see all elements re-rendering.
        </p>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">Counter with Render Props (Fine-Grained Rendering)</h2>
        <CounterWithRenderProps />
        <p>
          <strong>Note:</strong> When you click the increment button, only the counter value re-renders. 
          The static content remains unchanged. Check the console to see selective rendering.
        </p>
      </div>

      <PerformanceMonitor />
    </div>
  );
}

export default App;
