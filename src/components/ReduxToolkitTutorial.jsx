import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from '../features/counterSlice';
import './ReduxToolkitTutorial.css';

const ReduxToolkitTutorial = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(5);

  return (
    <div className="redux-tutorial">
      <h1>Redux Toolkit Tutorial</h1>
      <p>
        This page demonstrates a minimal setup of Redux Toolkit using a simple counter slice.
      </p>

      <section className="redux-tutorial__section">
        <h2>Counter</h2>
        <div className="redux-tutorial__counter-row">
          <button onClick={() => dispatch(decrement())}>-</button>
          <span className="redux-tutorial__count">{count}</span>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </section>

      <section className="redux-tutorial__section">
        <h3>Increment by amount</h3>
        <div className="redux-tutorial__amount-row">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="redux-tutorial__amount-input"
          />
          <button onClick={() => dispatch(incrementByAmount(amount))}>Add</button>
        </div>
      </section>

      <section className="redux-tutorial__section redux-tutorial__section--large">
        <h2>How it works</h2>
        <ol>
          <li>
            A <code>counterSlice</code> defines state and reducers with Redux Toolkit's <code>createSlice</code>.
          </li>
          <li>
            The <code>store</code> is created with <code>configureStore</code> and includes the <code>counter</code> reducer.
          </li>
          <li>
            The app is wrapped in <code>&lt;Provider store=&#123;store&#125;&gt;</code> so components can access state.
          </li>
          <li>
            Components use <code>useSelector</code> to read state and <code>useDispatch</code> to send actions.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default ReduxToolkitTutorial;


