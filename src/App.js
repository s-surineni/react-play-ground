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
import ReduxToolkitTutorial from "./components/ReduxToolkitTutorial";
import BasicInputText from "./components/basicExamples/BasicInputText";
import BasicUseEffect from "./components/basicExamples/BasicUseEffect";
import HelloWorld from "./components/basicExamples/HelloWorld";
import SearchInput from "./components/SearchInput/SearchInput";
import UseCallbackExample from "./components/UseCallbackExample";
import SharedStateFactoryDemo from "./components/SharedStateFactoryDemo";
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
            <Route path="/basic-input-text" element={<BasicInputText />} />
            <Route path="/redux-toolkit" element={<ReduxToolkitTutorial />} />
            <Route path="/basic-use-effect" element={<BasicUseEffect />} />
            <Route path="/search-input" element={<SearchInput />} />
            <Route path="/use-callback" element={<UseCallbackExample />} />
            <Route path="/shared-state-factory" element={<SharedStateFactoryDemo />} />
            <Route path="/hello-world" element={<HelloWorld />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
