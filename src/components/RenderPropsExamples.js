import React from 'react';
import CounterWithRenderProps from './CounterWithRenderProps';

const RenderPropsExamples = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Counter with Render Props - Proper Usage</h1>
      <p>
        This demonstrates how to properly use the
        CounterWithRenderProps component by passing a render
        function as a prop.
      </p>

      {/* Example 1: Basic usage with render prop */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Example 1: Basic Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div
              style={{
                backgroundColor: "#d4edda",
                padding: "15px",
                borderRadius: "6px",
                border: "1px solid #c3e6cb",
              }}
            >
              <h4>Count: {counterState.count}</h4>
              <div style={{ margin: "10px 0" }}>
                <button
                  onClick={counterState.decrement}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                >
                  -
                </button>
                <button
                  onClick={counterState.reset}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={counterState.increment}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                State Changes: {counterState.renderCount} | Renders:{" "}
                {counterState.actualRenderCount}
              </div>
            </div>
          )}
        />
      </div>

      {/* Example 2: Different UI style */}
      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Example 2: Card Style Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#007bff",
                  margin: "20px 0",
                }}
              >
                {counterState.count}
              </div>
              <div style={{ margin: "20px 0" }}>
                <button
                  onClick={counterState.decrement}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    margin: "0 10px",
                    fontSize: "18px",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  -
                </button>
                <button
                  onClick={counterState.increment}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    margin: "0 10px",
                    fontSize: "18px",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={counterState.reset}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Reset Counter
              </button>
            </div>
          )}
        />
      </div>

      {/* Example 3: Minimal counter */}
      <div
        style={{
          backgroundColor: "#e7f3ff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Example 3: Minimal Counter</h3>
        <CounterWithRenderProps
          render={(counterState) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={counterState.decrement}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Decrease
              </button>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                {counterState.count}
              </span>
              <button
                onClick={counterState.increment}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
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
