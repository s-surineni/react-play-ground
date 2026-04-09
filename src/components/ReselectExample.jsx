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
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <h2>🎯 Reselect Example</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        This component demonstrates memoized selectors using reselect. 
        Check the console to see when expensive computations run.
      </p>
      
      {/* Counter Controls */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>🎮 Counter Controls</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
          <button 
            onClick={() => dispatch(decrement())}
            style={{ padding: '8px 16px', fontSize: '16px' }}
          >
            -
          </button>
          <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '50px', textAlign: 'center' }}>
            {value}
          </span>
          <button 
            onClick={() => dispatch(increment())}
            style={{ padding: '8px 16px', fontSize: '16px' }}
          >
            +
          </button>
          <button 
            onClick={() => dispatch(reset())}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Reset
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            style={{ padding: '8px', width: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button 
            onClick={() => dispatch(incrementByAmount(amount))}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Add {amount}
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Current Value:</strong> {value}
        </div>
        <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <strong>Doubled Value:</strong> {doubledValue}
        </div>
        <div style={{ padding: '10px', backgroundColor: '#f3e5f5', borderRadius: '4px' }}>
          <strong>Parity:</strong> {parity}
        </div>
        <div style={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
          <strong>Last Updated:</strong> {formattedLastUpdated}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Counter Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '8px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
            <strong>Total Actions:</strong> {stats.totalActions}
          </div>
          <div style={{ padding: '8px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
            <strong>Increments:</strong> {stats.incrementCount}
          </div>
          <div style={{ padding: '8px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
            <strong>Decrements:</strong> {stats.decrementCount}
          </div>
          <div style={{ padding: '8px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
            <strong>Net Change:</strong> {stats.netChange}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>⚡ Expensive Computation Result</h3>
        <div style={{ padding: '10px', backgroundColor: '#ffeaa7', borderRadius: '4px', fontFamily: 'monospace' }}>
          {expensiveValue.toFixed(2)}
        </div>
        <small style={{ color: '#666' }}>
          This value only recalculates when the doubled value changes (check console).
        </small>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📝 Recent Actions (Last 5)</h3>
        {recentActions.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentActions.map((action, index) => (
              <li key={index} style={{ 
                padding: '5px', 
                backgroundColor: '#f8f9fa', 
                margin: '2px 0', 
                borderRadius: '3px',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <h4>Increment History ({incrementHistory.length})</h4>
          <div style={{ maxHeight: '100px', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {incrementHistory.map((action, i) => (
              <div key={i} style={{ fontSize: '0.8em' }}>
                Value: {action.value} at {new Date(action.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4>Decrement History ({decrementHistory.length})</h4>
          <div style={{ maxHeight: '100px', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
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
