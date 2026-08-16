import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from '../features/counterSlice';
import {
  selectCounterValue,
  selectDoubledValue,
  selectParity,
  selectFormattedLastUpdated,
  selectCounterStats,
  selectHistoryByType,
  selectExpensiveValue,
  selectRecentActions
} from '../features/counterSelectors';

const ReselectExample = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(5);
  
  // Using memoized selectors - each will only recalculate when their dependencies change
  const value = useSelector(selectCounterValue);
  const doubledValue = useSelector(selectDoubledValue);
  const parity = useSelector(selectParity);
  const formattedLastUpdated = useSelector(selectFormattedLastUpdated);
  const stats = useSelector(selectCounterStats);
  const expensiveValue = useSelector(selectExpensiveValue);
  const recentActions = useSelector(selectRecentActions);
  
  // Parameterized selector - get increment history
  const incrementHistory = useSelector(state => selectHistoryByType(state, 'increment'));
  const decrementHistory = useSelector(state => selectHistoryByType(state, 'decrement'));

  return (
    <div style={{ padding: '1.25rem', border: '1px solid #ccc', borderRadius: '0.5rem', margin: '1.25rem 0' }}>
      <h2>🎯 Reselect Example</h2>
      <p style={{ color: '#666', marginBottom: '1.25rem' }}>
        This component demonstrates memoized selectors using reselect. 
        Check the console to see when expensive computations run.
      </p>
      
      {/* Counter Controls */}
      <div style={{ marginBottom: '1.875rem', padding: '0.9375rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
        <h3>🎮 Counter Controls</h3>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', marginBottom: '0.9375rem' }}>
          <button 
            onClick={() => dispatch(decrement())}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
          >
            -
          </button>
          <span style={{ fontSize: '1.125rem', fontWeight: 'bold', minWidth: '3.125rem', textAlign: 'center' }}>
            {value}
          </span>
          <button 
            onClick={() => dispatch(increment())}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
          >
            +
          </button>
          <button 
            onClick={() => dispatch(reset())}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem' }}
          >
            Reset
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            style={{ padding: '0.5rem', width: '5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
          />
          <button 
            onClick={() => dispatch(incrementByAmount(amount))}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem' }}
          >
            Add {amount}
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12.5rem, 1fr))', gap: '0.9375rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.625rem', backgroundColor: '#f5f5f5', borderRadius: '0.25rem' }}>
          <strong>Current Value:</strong> {value}
        </div>
        <div style={{ padding: '0.625rem', backgroundColor: '#e3f2fd', borderRadius: '0.25rem' }}>
          <strong>Doubled Value:</strong> {doubledValue}
        </div>
        <div style={{ padding: '0.625rem', backgroundColor: '#f3e5f5', borderRadius: '0.25rem' }}>
          <strong>Parity:</strong> {parity}
        </div>
        <div style={{ padding: '0.625rem', backgroundColor: '#e8f5e8', borderRadius: '0.25rem' }}>
          <strong>Last Updated:</strong> {formattedLastUpdated}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3>📊 Counter Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9.375rem, 1fr))', gap: '0.625rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#fff3cd', borderRadius: '0.25rem' }}>
            <strong>Total Actions:</strong> {stats.totalActions}
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: '#d4edda', borderRadius: '0.25rem' }}>
            <strong>Increments:</strong> {stats.incrementCount}
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: '#f8d7da', borderRadius: '0.25rem' }}>
            <strong>Decrements:</strong> {stats.decrementCount}
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: '#d1ecf1', borderRadius: '0.25rem' }}>
            <strong>Net Change:</strong> {stats.netChange}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3>⚡ Expensive Computation Result</h3>
        <div style={{ padding: '0.625rem', backgroundColor: '#ffeaa7', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
          {expensiveValue.toFixed(2)}
        </div>
        <small style={{ color: '#666' }}>
          This value only recalculates when the doubled value changes (check console).
        </small>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3>📝 Recent Actions (Last 5)</h3>
        {recentActions.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentActions.map((action, index) => (
              <li key={index} style={{ 
                padding: '0.3125rem', 
                backgroundColor: '#f8f9fa', 
                margin: '2px 0', 
                borderRadius: '0.1875rem',
                fontSize: '0.9em'
              }}>
                <strong>{action.type}</strong>: {action.value}
                {action.payload && ` (+${action.payload})`}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No actions yet</p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9375rem' }}>
        <div>
          <h4>Increment History ({incrementHistory.length})</h4>
          <div style={{ maxHeight: '6.25rem', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '0.625rem', borderRadius: '0.25rem' }}>
            {incrementHistory.map((action, i) => (
              <div key={i} style={{ fontSize: '0.8em' }}>
                Value: {action.value} at {new Date(action.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4>Decrement History ({decrementHistory.length})</h4>
          <div style={{ maxHeight: '6.25rem', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '0.625rem', borderRadius: '0.25rem' }}>
            {decrementHistory.map((action, i) => (
              <div key={i} style={{ fontSize: '0.8em' }}>
                Value: {action.value} at {new Date(action.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReselectExample;
