import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CounterWithHooks from "./components/CounterWithHooks";
import RenderPropsExamples from "./components/RenderPropsExamples";
import RenderPropsDemo from "./components/RenderPropsDemo";
import PerformanceMonitor from "./components/PerformanceMonitor";
import IndexKeyDemo from "./components/IndexKeyDemo";
import SubtreeIsolationDemo from "./components/SubtreeIsolationDemo";
import SimpleRenderPropsExample from "./components/SimpleRenderPropsExample";
import ReduxToolkitTutorial from "./components/ReduxToolkitTutorial";
import ReselectExample from "./components/ReselectExample";
import BasicInputText from "./components/basicExamples/BasicInputText";
import BasicUseEffect from "./components/basicExamples/BasicUseEffect";
import BasicUseEffectConsole from "./components/basicExamples/BasicUseEffectConsole";
import UseEffectWithIssue from "./components/basicExamples/UseEffectWithIssue";
import HelloWorld from "./components/basicExamples/HelloWorld";
import SearchInput from "./components/SearchInput/SearchInput";
import UseCallbackExample from "./components/UseCallbackExample";
import UseMemoExample from "./components/UseMemoExample";
import SharedStateFactoryDemo from "./components/SharedStateFactoryDemo";
import SelectableTable from "./components/SelectableTable";
import ApiPolling from "./components/ApiPolling";
import ProgressBarDemo from "./components/ProgressBarDemo";
import ProgressBar2 from "./components/ProgressBar2/ProgressBar2";
import CommentSection from "./components/CommentSection/CommentSection";
import HolyGrail from "./components/HolyGrail/HolyGrail";
import TempPlayground from "./components/TempPlayground/TempPlayground";
import Tweet from "./Tweet/Tweet";
import TweetList from "./Tweet/TweetList";
import FileExplorerDemo from "./components/FileExplorer/FileExplorerDemo";
import FileExplorerNormalized from "./components/FileExplorer/FileExplorerNormalized";
import Connect4 from "./components/Connect4/Connect4";
import Connect42 from "./components/Connect42/Connect42";
import CShape from "./components/CShape/CShape";
import "./App.css";
import PollApp from "./components/PollApp/PollApp";
import ChatApp from "./components/ChatApp/ChatApp";

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
              path="/index-key-demo"
              element={<IndexKeyDemo />}
            />
            <Route
              path="/subtree-isolation"
              element={<SubtreeIsolationDemo />}
            />
            <Route path="/basic-input-text" element={<BasicInputText />} />
            <Route path="/redux-toolkit" element={<ReduxToolkitTutorial />} />
            <Route path="/reselect-example" element={<ReselectExample />} />
            <Route path="/basic-use-effect" element={<BasicUseEffect />} />
            <Route path="/basic-use-effect-console" element={<BasicUseEffectConsole />} />
            <Route path="/use-effect-with-issue" element={<UseEffectWithIssue />} />
            <Route path="/search-input" element={<SearchInput />} />
            <Route path="/use-callback" element={<UseCallbackExample />} />
            <Route path="/use-memo" element={<UseMemoExample />} />
            <Route path="/shared-state-factory" element={<SharedStateFactoryDemo />} />
            <Route path="/selectable-table" element={<SelectableTable />} />
            <Route path="/api-polling" element={<ApiPolling />} />
            <Route path="/progress-bar" element={<ProgressBarDemo />} />
            <Route path="/progress-bar-2" element={<ProgressBar2 />} />
            <Route path="/comment-section" element={<CommentSection />} />
            <Route path="/holy-grail" element={<HolyGrail />} />
            <Route path="/tweet" element={<Tweet />} />
            <Route path="/tweets" element={<TweetList />} />
            <Route path="/hello-world" element={<HelloWorld />} />
            <Route path="/temp-playground" element={<TempPlayground />} />
            <Route path="/file-explorer" element={<FileExplorerDemo />} />
            <Route path="/file-explorer-normalized" element={<FileExplorerNormalized />} />
            <Route path="/poll-app" element={<PollApp />} />
            <Route path="/chat-app" element={<ChatApp />} />
            <Route path="/connect42" element={<Connect42 />} />
            <Route path="/connect4" element={<Connect4 />} />
            <Route path="/c-shape" element={<CShape />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
