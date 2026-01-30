import React, { useState, useRef } from "react";
import CounterWithRenderProps from "./CounterWithRenderProps";

// Component that logs when it renders
const RenderLogger = ({ children, name }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  console.log(
    `🔄 ${name} rendered (Render #${
      renderCountRef.current
    }) at ${new Date().toLocaleTimeString()}`
  );

  return (
    <div
      style={{
        border: "2px solid #007bff",
        padding: "10px",
        margin: "10px",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          backgroundColor: "#e7f3ff",
          padding: "5px",
          marginBottom: "10px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {name} - Render #{renderCountRef.current}
      </div>
      {children}
    </div>
  );
};

// Memoized static components that won't re-render
const StaticHeader = React.memo(() => (
  <RenderLogger name="Static Header (Memoized)">
    <h3>Counter Component (Render Props Pattern)</h3>
    <p>This header is memoized and won't re-render when counter changes.</p>
  </RenderLogger>
));

const StaticContent = React.memo(() => (
  <RenderLogger name="Static Content (Memoized)">
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "15px",
        borderRadius: "6px",
        margin: "10px 0",
      }}
    >
      <h4>Static Information</h4>
      <p>This content is completely isolated from counter state changes.</p>
      <p>
        It will only render once and never re-render, even when the counter
        updates.
      </p>
      <ul>
        <li>Performance benefit: No unnecessary re-renders</li>
        <li>Memory efficiency: Content stays stable</li>
        <li>User experience: Smooth interactions</li>
      </ul>
    </div>
  </RenderLogger>
));

const StaticFooter = React.memo(() => (
  <RenderLogger name="Static Footer (Memoized)">
    <div
      style={{
        backgroundColor: "#e8f5e8",
        padding: "15px",
        borderRadius: "6px",
        margin: "10px 0",
      }}
    >
      <h4>Footer Section</h4>
      <p>This footer section is also memoized and won't re-render.</p>
      <p>It demonstrates how render props can isolate entire subtrees.</p>
    </div>
  </RenderLogger>
));

// Main demo component that uses render props
function RenderPropsDemo() {
  const [demoRenderCount, setDemoRenderCount] = useState(0);

  // Track demo renders
  React.useEffect(() => {
    setDemoRenderCount((prev) => prev + 1);
  });

  return (
    <RenderLogger name="Render Props Demo - Main Container">
      <div>
        <h2>Render Props Pattern Demo</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          This demo shows how to properly use the render props pattern to
          achieve fine-grained rendering control and subtree isolation.
        </p>

        {/* Static header that never re-renders */}
        <StaticHeader />

        {/* Counter using render props - only the render function re-renders */}
        <RenderLogger name="Counter Section">
          <div
            style={{
              backgroundColor: "#fff3cd",
              padding: "20px",
              borderRadius: "8px",
              margin: "20px 0",
              border: "1px solid #ffeaa7",
            }}
          >
            <h3>Counter with Render Props</h3>
            <p>
              The counter below uses the render props pattern. Notice how only
              the counter display re-renders when the count changes, while
              static components remain stable.
            </p>

            {/* This is the key: passing a render function to CounterWithRenderProps */}
            <CounterWithRenderProps
              render={(counterState) => (
                <RenderLogger name="Counter Render Function">
                  <div
                    style={{
                      backgroundColor: "#d4edda",
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #c3e6cb",
                    }}
                  >
                    <h4>Counter Display (Dynamic)</h4>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#155724",
                        margin: "10px 0",
                      }}
                    >
                      Count: {counterState.count}
                    </div>

                    <div style={{ margin: "15px 0" }}>
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

                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <div>
                        <strong>State Changes:</strong>{" "}
                        {counterState.renderCount}
                      </div>
                      <div>
                        <strong>Component Renders:</strong>{" "}
                        {counterState.actualRenderCount}
                      </div>
                    </div>
                  </div>
                </RenderLogger>
              )}
            />
          </div>
        </RenderLogger>

        {/* Static content that never re-renders */}
        <StaticContent />

        {/* Static footer that never re-renders */}
        <StaticFooter />

        {/* Demo render counter */}
        <div
          style={{
            backgroundColor: "#e9ecef",
            padding: "10px",
            borderRadius: "4px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <p>
            <strong>Demo Component Render Count:</strong> {demoRenderCount}
          </p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            This counter shows how many times the entire demo component has
            rendered. Notice that it increases on every render, but the memoized
            static components don't re-render.
          </p>
        </div>
      </div>
    </RenderLogger>
  );
}

export default RenderPropsDemo;
