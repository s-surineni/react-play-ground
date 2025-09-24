# React Examples Playground

This React application demonstrates various React patterns including **Redux Toolkit**, **hooks**, and **render props**.

## 🎯 What This Demo Shows

The key concept demonstrated here is **fine-grained control over inline rendering** - one of the specific use cases where render props can outperform hooks for performance.

### Hooks Approach (Component-Level Rendering)
- When state changes, the **entire component re-renders**
- All JSX elements, including static content, get re-rendered
- Less efficient for complex UIs with mostly static content

### Render Props Approach (Fine-Grained Rendering)
- Only the **specific rendered content changes**
- Static content remains stable and doesn't re-render
- More efficient for performance-critical applications

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies (pnpm recommended)
pnpm install

# Start the development server
pnpm start
```

The app will open in your browser at `http://localhost:3000`

## 🔍 How to Use the Demos

1. **Open Browser DevTools**: Press F12 and go to the Console tab
2. **Start Monitoring**: Click "Start Monitoring" in the Performance Monitor section
3. Explore pages via the navigation, including "Redux Toolkit Tutorial", "Counter with Hooks", and Render Props demos
4. Observe console logs (for performance demos) to see what re-renders

**Note**: The demo now shows two counters:
- **State Change Count**: Only increases when you interact with the buttons
- **Actual Render Count**: Shows how many times the component actually re-rendered

## 📊 What You'll See

### Hooks Approach Console Output
```
🔄 CounterWithHooks - Main Container rendered at 10:30:15 AM
🔄 CounterWithHooks - Counter Display rendered at 10:30:15 AM
🔄 CounterWithHooks - Static Header rendered at 10:30:15 AM
🔄 CounterWithHooks - Counter Value rendered at 10:30:15 AM
🔄 CounterWithHooks - Render Counter rendered at 10:30:15 AM
🔄 CounterWithHooks - Static Content rendered at 10:30:15 AM
🔄 CounterWithHooks - Buttons rendered at 10:30:15 AM
```
**Notice**: EVERY element re-renders when the count changes.

### Render Props Approach Console Output
```
🔄 CounterWithRenderProps - Counter Value rendered at 10:30:16 AM
🔄 CounterWithRenderProps - Render Counter rendered at 10:30:16 AM
```
**Notice**: Only the dynamic content re-renders. Static elements remain stable.

## 🏗️ Code Structure

```
src/
├── components/
│   ├── ReduxToolkitTutorial.js      # RTK demo page
│   ├── CounterWithHooks.js          # Hooks approach demo
│   ├── CounterWithRenderProps.js    # Render props approach demo
│   └── PerformanceMonitor.js        # Performance monitoring component
├── features/
│   └── counterSlice.js              # RTK slice example
├── store.js                         # RTK store setup
├── App.js                           # Main application component
├── index.js                         # Application entry point
└── index.css                        # Styling
```

## 💡 Key Technical Concepts

### 1. Redux Toolkit Basics
Minimal, opinionated setup using `configureStore` and `createSlice` with built-in Immer for immutable updates.

### 2. Fine-Grained Rendering Control
Render props allow you to control exactly which parts of your JSX render, rather than re-rendering the entire component.

### 3. Memoization with React.memo
Static components are wrapped in `React.memo()` to prevent unnecessary re-renders.

### 4. useCallback and useMemo
Event handlers and render functions are memoized to maintain referential equality.

### 5. Render Props Pattern
The `CounterRenderer` component uses the render props pattern to provide data to its children function.

## Redux Toolkit Quick Start (What this repo shows)

1) Install dependencies

```
pnpm add @reduxjs/toolkit react-redux
```

2) Create a slice (src/features/counterSlice.js)

```
import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; },
    reset: () => initialState,
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

3) Create a store (src/store.js)

```
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

export default configureStore({ reducer: { counter: counterReducer } });
```

4) Provide the store (src/index.js)

```
import { Provider } from 'react-redux';
import store from './store';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

5) Use in a component (src/components/ReduxToolkitTutorial.js)

```
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
dispatch(incrementByAmount(5));
```

Open "/redux-toolkit" to try it.

## 🎯 When to Use Each Approach

### Use Hooks When:
- Simple components with minimal re-rendering
- You need the simplicity and readability of hooks
- Performance is not a critical concern
- The entire component should update together

### Use Render Props When:
- You need fine-grained control over what re-renders
- Performance is critical
- You have complex UIs with mostly static content
- You want to isolate rendering logic

## 🔧 Performance Benefits

1. **Reduced Re-renders**: Only necessary elements update
2. **Better Memory Usage**: Static content doesn't get recreated
3. **Improved User Experience**: Smoother animations and interactions
4. **Scalability**: Better performance as component complexity increases

## 📚 Further Reading

- [React Render Props Pattern](https://reactjs.org/docs/render-props.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React.memo for Performance](https://reactjs.org/docs/react-api.html#reactmemo)
- [useCallback Hook](https://reactjs.org/docs/hooks-reference.html#usecallback)
- [useMemo Hook](https://reactjs.org/docs/hooks-reference.html#usememo)

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this demo.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
