import React from 'react';
import "./SimpleRenderPropsExample.css";

// Simple component that demonstrates basic render props usage
const SimpleRenderPropsExample = () => {
  return (
    <div className="simple-render-props">
      <h1>Simple Render Props Example</h1>

      <div className="info-section what-are">
        <h2>What are Render Props?</h2>
        <p>
          Render props are a pattern where you pass a function as a prop to a
          component. This function receives data and returns JSX, giving you
          complete control over how the data is rendered.
        </p>
      </div>

      <div className="info-section basic-example">
        <h2>Basic Example</h2>
        <p>
          Here's a simple example of how to use the CounterWithRenderProps
          component:
        </p>

        <div className="code-example">
          <div className="code-line comment">// 1. Import the component</div>
          <div className="code-line">
            import CounterWithRenderProps from './CounterWithRenderProps';
          </div>
          <br />
          <div className="code-line comment">
            // 2. Use it with a render function
          </div>
          <div className="code-line">&lt;CounterWithRenderProps</div>
          <div className="code-line indent-1">
            render=&#123;(counterState) =&gt; (
          </div>
          <div className="code-line indent-2">&lt;div&gt;</div>
          <div className="code-line indent-3">
            &lt;h3&gt;Count: &#123;counterState.count&#125;&lt;/h3&gt;
          </div>
          <div className="code-line indent-3">
            &lt;button
            onClick=&#123;counterState.increment&#125;&gt;+&lt;/button&gt;
          </div>
          <div className="code-line indent-3">
            &lt;button
            onClick=&#123;counterState.reset&#125;&gt;Reset&lt;/button&gt;
          </div>
          <div className="code-line indent-2">&lt;/div&gt;</div>
          <div className="code-line indent-1">)&#125;</div>
          <div className="code-line">/&gt;</div>
        </div>
      </div>

      <div className="info-section what-you-get">
        <h2>What You Get</h2>
        <p>
          The render function receives a <code>counterState</code> object with:
        </p>
        <ul>
          <li>
            <strong>count</strong> - The current counter value
          </li>
          <li>
            <strong>increment</strong> - Function to increase the count
          </li>
          <li>
            <strong>decrement</strong> - Function to decrease the count
          </li>
          <li>
            <strong>reset</strong> - Function to reset the count to 0
          </li>
          <li>
            <strong>renderCount</strong> - How many times the state has changed
          </li>
          <li>
            <strong>actualRenderCount</strong> - How many times the component
            has rendered
          </li>
        </ul>
      </div>

      <div className="info-section key-benefits">
        <h2>Key Benefits</h2>
        <ul>
          <li>
            <strong>Separation of Concerns:</strong> Logic and presentation are
            separated
          </li>
          <li>
            <strong>Reusability:</strong> The same logic can render different
            UIs
          </li>
          <li>
            <strong>Flexibility:</strong> You have complete control over the
            rendered output
          </li>
          <li>
            <strong>Performance:</strong> Can achieve fine-grained rendering
            control
          </li>
        </ul>
      </div>

      <div className="info-section when-to-use">
        <h2>When to Use Render Props</h2>
        <ul>
          <li>
            <strong>Complex Logic:</strong> When you have reusable business
            logic
          </li>
          <li>
            <strong>Multiple UI Variations:</strong> When the same data needs
            different presentations
          </li>
          <li>
            <strong>Performance Optimization:</strong> When you need
            fine-grained rendering control
          </li>
          <li>
            <strong>Component Composition:</strong> When you want to compose
            components flexibly
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleRenderPropsExample;
