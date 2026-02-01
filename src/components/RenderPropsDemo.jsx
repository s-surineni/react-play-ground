import React, { useState, useRef } from "react";
import CounterWithRenderProps from "./CounterWithRenderProps";
import "./RenderPropsDemo.css";

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
    <div className="render-props-demo__logger">
      <div className="render-props-demo__logger-header">
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
    <div className="render-props-demo__static-box">
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
    <div className="render-props-demo__footer-box">
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
        <p className="render-props-demo__intro">
          This demo shows how to properly use the render props pattern to
          achieve fine-grained rendering control and subtree isolation.
        </p>

        {/* Static header that never re-renders */}
        <StaticHeader />

        {/* Counter using render props - only the render function re-renders */}
        <RenderLogger name="Counter Section">
          <div className="render-props-demo__counter-section">
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
                  <div className="render-props-demo__dynamic-box">
                    <h4>Counter Display (Dynamic)</h4>
                    <div className="render-props-demo__count-display">
                      Count: {counterState.count}
                    </div>

                    <div className="render-props-demo__buttons">
                      <button
                        onClick={counterState.decrement}
                        className="render-props-demo__btn render-props-demo__btn--decrement"
                      >
                        -
                      </button>

                      <button
                        onClick={counterState.reset}
                        className="render-props-demo__btn render-props-demo__btn--reset"
                      >
                        Reset
                      </button>

                      <button
                        onClick={counterState.increment}
                        className="render-props-demo__btn render-props-demo__btn--increment"
                      >
                        +
                      </button>
                    </div>

                    <div className="render-props-demo__state-box">
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
        <div className="render-props-demo__demo-footer">
          <p>
            <strong>Demo Component Render Count:</strong> {demoRenderCount}
          </p>
          <p className="render-props-demo__demo-footer-note">
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
