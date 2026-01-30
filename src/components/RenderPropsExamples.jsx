import React from 'react';
import CounterWithRenderProps from './CounterWithRenderProps';
import "./RenderPropsExamples.css";

const RenderPropsExamples = () => {
  return (
    <div className="render-props-examples">
      <h1>Counter with Render Props - Proper Usage</h1>
      <p>
        This demonstrates how to properly use the CounterWithRenderProps
        component by passing a render function as a prop.
      </p>

      {/* Example 1: Basic usage with render prop */}
      <div className="example-container basic">
        <h3>Example 1: Basic Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div className="basic-counter">
              <h4>Count: {counterState.count}</h4>
              <div className="button-group">
                <button
                  onClick={counterState.decrement}
                  className="btn btn-decrement"
                >
                  -
                </button>
                <button onClick={counterState.reset} className="btn btn-reset">
                  Reset
                </button>
                <button
                  onClick={counterState.increment}
                  className="btn btn-increment"
                >
                  +
                </button>
              </div>
              <div className="counter-info">
                State Changes: {counterState.renderCount} | Renders:{" "}
                {counterState.actualRenderCount}
              </div>
            </div>
          )}
        />
      </div>

      {/* Example 2: Different UI style */}
      <div className="example-container card-style">
        <h3>Example 2: Card Style Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div className="card-counter">
              <div className="count-display">{counterState.count}</div>
              <div className="button-group">
                <button
                  onClick={counterState.decrement}
                  className="circular-button"
                >
                  -
                </button>
                <button
                  onClick={counterState.increment}
                  className="circular-button increment"
                >
                  +
                </button>
              </div>
              <button onClick={counterState.reset} className="reset-button">
                Reset Counter
              </button>
            </div>
          )}
        />
      </div>

      {/* Example 3: Minimal counter */}
      <div className="example-container minimal">
        <h3>Example 3: Minimal Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div className="minimal-counter">
              <button
                onClick={counterState.decrement}
                className="btn btn-decrease"
              >
                Decrease
              </button>
              <span className="count-display">{counterState.count}</span>
              <button
                onClick={counterState.increment}
                className="btn btn-increase"
              >
                Increase
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default RenderPropsExamples;
