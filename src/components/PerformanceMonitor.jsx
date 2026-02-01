import React, { useState, useEffect } from 'react';
import './PerformanceMonitor.css';

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
      
      <div className="performance-monitor__actions">
        <button 
          className={`button performance-monitor__start-btn ${isMonitoring ? 'performance-monitor__start-btn--active' : 'performance-monitor__start-btn--inactive'}`}
          onClick={toggleMonitoring}
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
          <div className="performance-monitor__logs">
            {renderLogs.length === 0 ? (
              <p className="performance-monitor__empty">
                No render logs yet. Try clicking the counter buttons to see the difference!
              </p>
            ) : (
              renderLogs.map((log, index) => (
                <div key={index} className="performance-monitor__log-row">
                  {log}
                </div>
              ))
            )}
          </div>
          
          <div className="performance-monitor__instructions">
            <p><strong>Instructions:</strong></p>
            <ol>
              <li>Start monitoring above</li>
              <li>Click the increment buttons in both counter components</li>
              <li>Watch the console and this log to see the difference in rendering behavior</li>
              <li>Notice how the hooks approach re-renders everything, while render props only re-render specific parts</li>
            </ol>
          </div>
        </div>
      )}

      {!isMonitoring && (
        <div className="performance-monitor__idle">
          Click "Start Monitoring" to begin tracking render performance
        </div>
      )}
    </div>
  );
}

export default PerformanceMonitor;
