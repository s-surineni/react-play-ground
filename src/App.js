import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CounterWithHooks from "./components/CounterWithHooks";
import CounterWithRenderProps from "./components/CounterWithRenderProps";
import RenderPropsDemo from "./components/RenderPropsDemo";
import PerformanceMonitor from "./components/PerformanceMonitor";
import SubtreeIsolationDemo from "./components/SubtreeIsolationDemo";
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
              element={<CounterWithRenderProps />}
            />
            <Route path="/render-props-demo" element={<RenderPropsDemo />} />
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
