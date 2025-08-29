import React from 'react';

// Simple component that demonstrates basic render props usage
const SimpleRenderPropsExample = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Simple Render Props Example</h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>What are Render Props?</h2>
        <p>
          Render props are a pattern where you pass a function as a prop to a component. 
          This function receives data and returns JSX, giving you complete control over how the data is rendered.
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Basic Example</h2>
        <p>
          Here's a simple example of how to use the CounterWithRenderProps component:
        </p>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '14px',
          border: '1px solid #dee2e6',
          margin: '15px 0'
        }}>
          <div style={{ color: '#007bff' }}>// 1. Import the component</div>
          <div>import CounterWithRenderProps from './CounterWithRenderProps';</div>
          <br />
          <div style={{ color: '#007bff' }}>// 2. Use it with a render function</div>
          <div>&lt;CounterWithRenderProps</div>
          <div style={{ marginLeft: '20px' }}>render=&#123;(counterState) =&gt; (</div>
          <div style={{ marginLeft: '40px' }}>&lt;div&gt;</div>
          <div style={{ marginLeft: '60px' }}>&lt;h3&gt;Count: &#123;counterState.count&#125;&lt;/h3&gt;</div>
          <div style={{ marginLeft: '60px' }}>&lt;button onClick=&#123;counterState.increment&#125;&gt;+&lt;/button&gt;</div>
          <div style={{ marginLeft: '60px' }}>&lt;button onClick=&#123;counterState.reset&#125;&gt;Reset&lt;/button&gt;</div>
          <div style={{ marginLeft: '40px' }}>&lt;/div&gt;</div>
          <div style={{ marginLeft: '20px' }}>)&#125;</div>
          <div>/&gt;</div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#d4edda', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>What You Get</h2>
        <p>
          The render function receives a <code>counterState</code> object with:
        </p>
        <ul>
          <li><strong>count</strong> - The current counter value</li>
          <li><strong>increment</strong> - Function to increase the count</li>
          <li><strong>decrement</strong> - Function to decrease the count</li>
          <li><strong>reset</strong> - Function to reset the count to 0</li>
          <li><strong>renderCount</strong> - How many times the state has changed</li>
          <li><strong>actualRenderCount</strong> - How many times the component has rendered</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '20px', 
        borderRadius: '8px'
      }}>
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Separation of Concerns:</strong> Logic and presentation are separated</li>
          <li><strong>Reusability:</strong> The same logic can render different UIs</li>
          <li><strong>Flexibility:</strong> You have complete control over the rendered output</li>
          <li><strong>Performance:</strong> Can achieve fine-grained rendering control</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#f8d7da', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>When to Use Render Props</h2>
        <ul>
          <li><strong>Complex Logic:</strong> When you have reusable business logic</li>
          <li><strong>Multiple UI Variations:</strong> When the same data needs different presentations</li>
          <li><strong>Performance Optimization:</strong> When you need fine-grained rendering control</li>
          <li><strong>Component Composition:</strong> When you want to compose components flexibly</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleRenderPropsExample;
