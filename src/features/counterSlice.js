import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  history: [],
  lastUpdated: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
      state.history.push({ type: 'increment', value: state.value, timestamp: Date.now() });
      state.lastUpdated = Date.now();
    },
    decrement(state) {
      state.value -= 1;
      state.history.push({ type: 'decrement', value: state.value, timestamp: Date.now() });
      state.lastUpdated = Date.now();
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
      state.history.push({ type: 'incrementByAmount', value: state.value, payload: action.payload, timestamp: Date.now() });
      state.lastUpdated = Date.now();
    },
    reset() {
      state.history.push({ type: 'reset', value: 0, timestamp: Date.now() });
      return initialState;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;


