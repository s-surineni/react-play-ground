# React Examples Index

Complexity tiers from simplest to most involved.

## Beginner

| File | Lines | Topic |
|------|-------|-------|
| `src/components/basicExamples/HelloWorld.jsx` | 5 | Static string return component |
| `src/components/basicExamples/ImportExample.jsx` | 11 | Importing and rendering another component |
| `src/components/basicExamples/BasicInputText.jsx` | 13 | Single `useState` controlled input |
| `src/components/SearchInput/SearchInput.jsx` | 21 | Presentational component, no state |
| `src/components/HolyGrail/HolyGrail.jsx` | 16 | CSS layout exercise |
| `src/components/basicExamples/BasicUseEffectConsole.jsx` | 10 | Single `useEffect` log |
| `src/components/basicExamples/UseEffectWithIssue.jsx` | 14 | `useEffect` + `useState` (intentional issue) |
| `src/components/Tweet/Tweet.jsx` | 63 | Presentational component with props and SVG icons |

## Intermediate

| File | Lines | Topic |
|------|-------|-------|
| `src/components/basicExamples/BasicUseEffect.jsx` | 19 | Data fetching with `useEffect` + axios |
| `src/components/basicExamples/UseReducerCart.jsx` | 51 | `useReducer` for cart actions |
| `src/components/basicExamples/UseDebounce.jsx` | 40 | Custom `useDebounce` hook |
| `src/components/basicExamples/ErrorBoundaryDemo.jsx` | 62 | Class component error boundary with fallback |
| `src/components/basicExamples/UseStateFunctionalUpdate.jsx` | 59 | Functional updater vs direct value in rapid setState calls |
| `src/components/basicExamples/LazySuspense.jsx` | 39 | `React.lazy` + `Suspense` code splitting |
| `src/components/basicExamples/ErrorBoundaryDemo.jsx` | 62 | Class component error boundary with fallback |
| `src/components/ProgressBar/ProgressBar.jsx` | 47 | Reusable component with computed props and variants |
| `src/components/ProgressBar2/ProgressBar2.jsx` | 19 | Dynamic array state + component list |
| `src/components/ProgressBar3/ProgressBar3.jsx` | 20 | Animated progress via `useEffect` |
| `src/components/PollApp/PollApp.jsx` | 71 | Derived state, list rendering, percentage math |
| `src/components/ChatApp/ChatApp.jsx` | 85 | Form handling, `useRef` auto-scroll, `useEffect` dependency |
| `src/components/ApiPolling.jsx` | 97 | Interval with cleanup, loading/error/data states |
| `src/components/IndexKeyDemo.jsx` | 91 | List reordering, comparing `key={index}` vs `key={id}` |
| `src/components/FileExplorer/FileExplorer.jsx` | 73 | Recursive tree rendering |
| `src/components/FileExplorer/FileExplorerDemo.jsx` | 67 | Immutable tree mutation helper + recursive tree |
| `src/components/TempPlayground/TempPlayground.jsx` | 89 | Recursive folder/file tree with static data |
| `src/components/Tweet/TweetList.jsx` | 111 | Fetch + list rendering + loading states |
| `src/components/CShape/CShape.jsx` | 58 | Grid state, interval timer, click handlers |
| `src/components/SelectableTable.jsx` | 113 | `Set` state, `useEffect` for indeterminate checkbox |
| `src/components/CounterWithHooks.jsx` | 79 | Multiple hooks + custom sub-component + render tracking |
| `src/components/CounterWithRenderProps.jsx` | 83 | Render props pattern, `useCallback`, `useMemo` |
| `src/components/RenderPropsExample.jsx` | 94 | Three render props variations |
| `src/components/RenderPropsExamples.jsx` | 103 | Three styled render props usages |
| `src/components/SimpleRenderPropsExample.jsx` | 132 | Tutorial/documentation style with code examples |
| `src/components/ProgressBarDemo.jsx` | 85 | Interactive demo showcasing a reusable component |
| `src/components/CommentSection/CommentSection.jsx` | 125 | Fetch, loading/error states, inline editing |

## Advanced

| File | Lines | Topic |
|------|-------|-------|
| `src/components/Accordion/Accordion.jsx` | 76 | Compound components with React Context |
| `src/components/basicExamples/LayoutEffectDemo.jsx` | 60 | `useLayoutEffect` vs `useEffect` DOM measurement |
| `src/components/UseMemoExample.jsx` | 44 | `useMemo` vs expensive computation |
| `src/components/ReduxToolkitTutorial.jsx` | 64 | Redux Toolkit slices, dispatch, `useSelector` |
| `src/components/Connect42/Connect42.jsx` | 109 | Connect4 game logic + win detection algorithm |
| `src/components/Connect4/Connect4.jsx` | 173 | Connect4 game with `useMemo` for winning cells, complex state |
| `src/components/FileExplorer/FileExplorerNormalized.jsx` | 385 | Normalized state, recursive rename editing |
| `src/components/UseCallbackExample.jsx` | 140 | `useCallback` + `React.memo` performance comparison |
| `src/components/SubtreeIsolationDemo.jsx` | 215 | Advanced render isolation, `React.memo` comparison |
| `src/components/PerformanceMonitor.jsx` | 88 | Imperative console patching for render tracking |
| `src/components/RenderPropsDemo.jsx` | 165 | Advanced subtree isolation with memo |
| `src/components/ReselectExample.jsx` | 173 | Reselect memoized selectors with Redux state |
| `src/components/SharedStateFactoryDemo.jsx` | 347 | Custom selector-based store vs React Context |
