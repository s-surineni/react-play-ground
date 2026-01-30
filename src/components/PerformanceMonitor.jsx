import React, { useState, useEffect } from 'react';

function PerformanceMonitor() {
  const [renderLogs, setRenderLogs] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (isMonitoring) {
      // Override console.log to capture render logs
      const originalLog = console.log;
      console.log = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('🔄')) {
          setRenderLogs(prev => [...prev.slice(-19), args[0]]); // Keep last 20 logs
        }
        originalLog.apply(console, args);
      };

      return () => {
        console.log = originalLog;
      };
    }
  }, [isMonitoring]);

  const clearLogs = () => {
    setRenderLogs([]);
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <div className="demo-section">
      <h2 className="demo-title">Performance Monitor</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          className="button" 
          onClick={toggleMonitoring}
          style={{ 
            backgroundColor: isMonitoring ? '#dc3545' : '#28a745',
            marginRight: '10px'
          }}
        >
          {isMonitoring ? 'Stop' : 'Start'} Monitoring
        </button>
        
        <button className="button" onClick={clearLogs}>
          Clear Logs
        </button>
      </div>

      {isMonitoring && (
        <div>
          <h3>Render Logs (Last 20)</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '6px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {renderLogs.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No render logs yet. Try clicking the counter buttons to see the difference!
              </p>
            ) : (
              renderLogs.map((log, index) => (
                <div key={index} style={{ 
                  padding: '2px 0',
                  borderBottom: '1px solid #e9ecef'
                }}>
                  {log}
                </div>
              ))
            )}
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            <p><strong>Instructions:</strong></p>
            <ol style={{ marginLeft: '20px' }}>
              <li>Start monitoring above</li>
              <li>Click the increment buttons in both counter components</li>
              <li>Watch the console and this log to see the difference in rendering behavior</li>
              <li>Notice how the hooks approach re-renders everything, while render props only re-render specific parts</li>
            </ol>
          </div>
        </div>
      )}

      {!isMonitoring && (
        <div style={{ 
          backgroundColor: '#e9ecef', 
          padding: '15px', 
          borderRadius: '6px',
          textAlign: 'center',
          color: '#666'
        }}>
          Click "Start Monitoring" to begin tracking render performance
        </div>
      )}
    </div>
  );
}

export default PerformanceMonitor;
