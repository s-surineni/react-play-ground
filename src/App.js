import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CounterWithHooks from "./components/CounterWithHooks";
import RenderPropsExamples from "./components/RenderPropsExamples";
import RenderPropsDemo from "./components/RenderPropsDemo";
import PerformanceMonitor from "./components/PerformanceMonitor";
import SubtreeIsolationDemo from "./components/SubtreeIsolationDemo";
import SimpleRenderPropsExample from "./components/SimpleRenderPropsExample";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter-hooks" element={<CounterWithHooks />} />
            <Route
              path="/counter-render-props"
              element={<RenderPropsExamples />}
            />
            <Route path="/render-props-demo" element={<RenderPropsDemo />} />
            <Route
              path="/simple-render-props"
              element={<SimpleRenderPropsExample />}
            />
            <Route
              path="/performance-monitor"
              element={<PerformanceMonitor />}
            />
            <Route
              path="/subtree-isolation"
              element={<SubtreeIsolationDemo />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
