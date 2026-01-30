import React from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to React Examples Playground</h1>

      <div className="main-content">
        <h2>What You'll Find Here</h2>

        <p>
          This project demonstrates various React patterns and concepts through
          practical examples. Use the navigation above to explore different
          implementations and learn how they work.
        </p>

        <h3>Available Examples:</h3>

        <ul>
          <li>
            <strong>Redux Toolkit Tutorial:</strong> Minimal RTK setup with
            slice, store, hooks
          </li>
          <li>
            <strong>Counter with Hooks:</strong> Modern React Hooks
            implementation
          </li>
          <li>
            <strong>Counter with Render Props:</strong> Traditional render props
            pattern
          </li>
          <li>
            <strong>Render Props Demo:</strong> Advanced render props with
            multiple UI variations
          </li>
          <li>
            <strong>Performance Monitor:</strong> Performance monitoring and
            optimization
          </li>
          <li>
            <strong>Subtree Isolation:</strong> Component isolation techniques
          </li>
        </ul>

        <div className="render-props-explanation">
          <h4>🎯 Render Props Pattern Explained</h4>
          <p>
            The render props pattern allows you to pass a function as a prop
            that determines what to render. This gives you fine-grained control
            over rendering and enables subtree isolation for better performance.
          </p>
          <div className="code-example">
            <div className="code-line comment">// Example usage:</div>
            <div className="code-line">&lt;CounterWithRenderProps</div>
            <div className="code-line indent-1">
              render=&#123;(counterState) =&gt; (
            </div>
            <div className="code-line indent-2">
              &lt;div&gt;Count: &#123;counterState.count&#125;&lt;/div&gt;
            </div>
            <div className="code-line indent-1">)&#125;</div>
            <div className="code-line">/&gt;</div>
          </div>
        </div>

        <div className="pro-tip">
          <h4>💡 Pro Tip</h4>
          <p>
            Each example is designed to be self-contained and educational. Feel
            free to explore the code, modify it, and experiment with different
            approaches!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
