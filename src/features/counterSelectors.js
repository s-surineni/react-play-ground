import { createSelector } from 'reselect';

// Basic selectors
export const selectCounter = (state) => state.counter;
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterHistory = (state) => state.counter.history;
export const selectCounterLastUpdated = (state) => state.counter.lastUpdated;

// Memoized selectors using reselect

// Selector that gets doubled value - will only recalculate when counter.value changes
export const selectDoubledValue = createSelector(
  [selectCounterValue],
  (value) => value * 2
);

// Selector that gets parity (even/odd) - will only recalculate when counter.value changes
export const selectParity = createSelector(
  [selectCounterValue],
  (value) => value % 2 === 0 ? 'even' : 'odd'
);

// Selector that gets formatted last updated time - will only recalculate when lastUpdated changes
export const selectFormattedLastUpdated = createSelector(
  [selectCounterLastUpdated],
  (lastUpdated) => {
    if (!lastUpdated) return 'Never';
    return new Date(lastUpdated).toLocaleTimeString();
  }
);

// Complex selector that combines multiple pieces of state
// Will only recalculate when either value or history changes
export const selectCounterStats = createSelector(
  [selectCounterValue, selectCounterHistory],
  (value, history) => {
    const incrementCount = history.filter(action => action.type === 'increment').length;
    const decrementCount = history.filter(action => action.type === 'decrement').length;
    const totalActions = history.length;
    
    return {
      currentValue: value,
      totalActions,
      incrementCount,
      decrementCount,
      netChange: incrementCount - decrementCount
    };
  }
);

// Selector with parameterized input - creates a memoized function
export const selectHistoryByType = createSelector(
  [selectCounterHistory, (state, actionType) => actionType],
  (history, actionType) => history.filter(action => action.type === actionType)
);

// Selector that demonstrates dependency chain
// selectExpensiveValue depends on selectDoubledValue, so it only recalculates
// when the doubled value changes
export const selectExpensiveValue = createSelector(
  [selectDoubledValue],
  (doubledValue) => {
    // Simulate expensive computation
    console.log('Performing expensive computation...');
    return doubledValue * 100 + Math.random() * 10;
  }
);

// Selector that gets recent actions (last 5)
export const selectRecentActions = createSelector(
  [selectCounterHistory],
  (history) => history.slice(-5).reverse()
);
