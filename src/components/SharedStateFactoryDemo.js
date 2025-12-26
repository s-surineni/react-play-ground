import React, { createContext, useContext, useState, useCallback, useSyncExternalStore, useRef } from 'react';
import './SharedStateFactoryDemo.css';

// =============================================================================
// SHARED STATE FACTORY PATTERN
// =============================================================================
// This pattern creates a store with fine-grained subscriptions.
// Components only re-render when the specific slice of state they subscribe to changes.

function createSharedStateFactory(initialState) {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // Selector-based subscription - the magic for fine-grained updates
  const useStore = (selector) => {
    return useSyncExternalStore(
      subscribe,
      () => selector(getState()),
      () => selector(getState())
    );
  };

  return { getState, setState, subscribe, useStore };
}

// Create our shared state store
const sharedStore = createSharedStateFactory({
  user: { name: 'Alice', email: 'alice@example.com' },
  theme: 'light',
  counter: 0,
  notifications: [],
});

// =============================================================================
// CONTEXT-BASED APPROACH (Traditional)
// =============================================================================
// All consumers re-render whenever ANY part of the context value changes.

const AppContext = createContext(null);

function ContextProvider({ children }) {
  const [state, setStateInternal] = useState({
    user: { name: 'Bob', email: 'bob@example.com' },
    theme: 'light',
    counter: 0,
    notifications: [],
  });

  const setState = useCallback((partial) => {
    setStateInternal((prev) => ({
      ...prev,
      ...(typeof partial === 'function' ? partial(prev) : partial),
    }));
  }, []);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within ContextProvider');
  return context;
}

// =============================================================================
// RENDER COUNTER UTILITY
// =============================================================================

function useRenderCount(label) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
}

// =============================================================================
// CONTEXT-BASED COMPONENTS (Problem: All re-render on any state change)
// =============================================================================

function ContextUserDisplay() {
  const { state } = useAppContext();
  const renderCount = useRenderCount('ContextUserDisplay');
  
  return (
    <div className="component-box context-box">
      <h4>👤 User Display</h4>
      <p>Name: {state.user.name}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function ContextThemeDisplay() {
  const { state } = useAppContext();
  const renderCount = useRenderCount('ContextThemeDisplay');
  
  return (
    <div className="component-box context-box">
      <h4>🎨 Theme Display</h4>
      <p>Theme: {state.theme}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function ContextCounterDisplay() {
  const { state } = useAppContext();
  const renderCount = useRenderCount('ContextCounterDisplay');
  
  return (
    <div className="component-box context-box">
      <h4>🔢 Counter Display</h4>
      <p>Count: {state.counter}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function ContextControls() {
  const { setState } = useAppContext();
  const renderCount = useRenderCount('ContextControls');
  
  return (
    <div className="component-box context-box controls">
      <h4>🎮 Controls</h4>
      <div className="button-group">
        <button onClick={() => setState((s) => ({ counter: s.counter + 1 }))}>
          Increment Counter
        </button>
        <button onClick={() => setState({ theme: 'dark' })}>
          Set Dark Theme
        </button>
        <button onClick={() => setState({ user: { name: 'Charlie', email: 'charlie@example.com' } })}>
          Change User
        </button>
      </div>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

// =============================================================================
// SHARED STATE FACTORY COMPONENTS (Advantage: Fine-grained subscriptions)
// =============================================================================

function FactoryUserDisplay() {
  // Only subscribes to user - won't re-render when counter or theme changes!
  const user = sharedStore.useStore((state) => state.user);
  const renderCount = useRenderCount('FactoryUserDisplay');
  
  return (
    <div className="component-box factory-box">
      <h4>👤 User Display</h4>
      <p>Name: {user.name}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function FactoryThemeDisplay() {
  // Only subscribes to theme - won't re-render when counter or user changes!
  const theme = sharedStore.useStore((state) => state.theme);
  const renderCount = useRenderCount('FactoryThemeDisplay');
  
  return (
    <div className="component-box factory-box">
      <h4>🎨 Theme Display</h4>
      <p>Theme: {theme}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function FactoryCounterDisplay() {
  // Only subscribes to counter - won't re-render when theme or user changes!
  const counter = sharedStore.useStore((state) => state.counter);
  const renderCount = useRenderCount('FactoryCounterDisplay');
  
  return (
    <div className="component-box factory-box">
      <h4>🔢 Counter Display</h4>
      <p>Count: {counter}</p>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

function FactoryControls() {
  const renderCount = useRenderCount('FactoryControls');
  
  // No subscription needed - just dispatch actions
  const incrementCounter = () => {
    sharedStore.setState((s) => ({ counter: s.counter + 1 }));
  };
  
  const setDarkTheme = () => {
    sharedStore.setState({ theme: 'dark' });
  };
  
  const changeUser = () => {
    sharedStore.setState({ user: { name: 'Diana', email: 'diana@example.com' } });
  };
  
  return (
    <div className="component-box factory-box controls">
      <h4>🎮 Controls</h4>
      <div className="button-group">
        <button onClick={incrementCounter}>Increment Counter</button>
        <button onClick={setDarkTheme}>Set Dark Theme</button>
        <button onClick={changeUser}>Change User</button>
      </div>
      <p className="render-count">Renders: <span className="count">{renderCount}</span></p>
    </div>
  );
}

// =============================================================================
// MAIN DEMO COMPONENT
// =============================================================================

export default function SharedStateFactoryDemo() {
  return (
    <div className="shared-state-demo">
      <h1>🏭 Shared State Factory vs Context</h1>
      
      <div className="explanation">
        <h2>The Problem with Context</h2>
        <p>
          When using React Context, <strong>ALL consumers re-render</strong> whenever 
          any part of the context value changes. Click "Increment Counter" on the Context 
          side and watch ALL render counts increase!
        </p>
        
        <h2>The Shared State Factory Advantage</h2>
        <p>
          With the Shared State Factory pattern, components use <strong>selectors</strong> to 
          subscribe to specific slices of state. Only components subscribing to the changed 
          slice will re-render. Click "Increment Counter" on the Factory side - only the 
          Counter Display re-renders!
        </p>
      </div>

      <div className="demo-container">
        {/* Context Side */}
        <div className="demo-section">
          <h2 className="section-title context-title">
            ❌ React Context
            <span className="subtitle">All components re-render on any change</span>
          </h2>
          <ContextProvider>
            <div className="components-grid">
              <ContextUserDisplay />
              <ContextThemeDisplay />
              <ContextCounterDisplay />
              <ContextControls />
            </div>
          </ContextProvider>
        </div>

        {/* Factory Side */}
        <div className="demo-section">
          <h2 className="section-title factory-title">
            ✅ Shared State Factory
            <span className="subtitle">Only subscribed components re-render</span>
          </h2>
          <div className="components-grid">
            <FactoryUserDisplay />
            <FactoryThemeDisplay />
            <FactoryCounterDisplay />
            <FactoryControls />
          </div>
        </div>
      </div>

      <div className="code-explanation">
        <h2>How It Works</h2>
        <div className="code-blocks">
          <div className="code-block">
            <h3>Context Consumer (Re-renders Always)</h3>
            <pre>{`function ContextCounterDisplay() {
  // Gets ENTIRE state object
  const { state } = useAppContext();
  
  // Re-renders when user, theme, 
  // OR counter changes!
  return <p>Count: {state.counter}</p>;
}`}</pre>
          </div>
          <div className="code-block">
            <h3>Factory Consumer (Selective Re-renders)</h3>
            <pre>{`function FactoryCounterDisplay() {
  // Subscribes ONLY to counter
  const counter = sharedStore.useStore(
    (state) => state.counter
  );
  
  // Re-renders ONLY when counter changes!
  return <p>Count: {counter}</p>;
}`}</pre>
          </div>
        </div>
      </div>

      <div className="benefits">
        <h2>Key Benefits of Shared State Factory</h2>
        <ul>
          <li>
            <strong>🎯 Fine-grained Subscriptions:</strong> Components only re-render 
            when their specific state slice changes
          </li>
          <li>
            <strong>⚡ Better Performance:</strong> Fewer unnecessary re-renders means 
            faster UI updates
          </li>
          <li>
            <strong>🧹 No Provider Hell:</strong> No need for nested context providers
          </li>
          <li>
            <strong>📦 Works Outside React:</strong> State can be accessed from anywhere, 
            not just React components
          </li>
          <li>
            <strong>🔧 Simpler API:</strong> No need for useMemo or useCallback to prevent 
            re-renders
          </li>
        </ul>
      </div>
    </div>
  );
}

