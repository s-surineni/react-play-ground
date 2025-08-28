import React from 'react';

const Home = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#333',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Welcome to React Examples Playground
      </h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '10px',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ color: '#495057', marginTop: 0 }}>
          What You'll Find Here
        </h2>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#6c757d' }}>
          This project demonstrates various React patterns and concepts through practical examples. 
          Use the navigation above to explore different implementations and learn how they work.
        </p>
        
        <h3 style={{ color: '#495057', marginTop: '25px' }}>
          Available Examples:
        </h3>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#6c757d' }}>
          <li><strong>Counter with Hooks:</strong> Modern React Hooks implementation</li>
          <li><strong>Counter with Render Props:</strong> Traditional render props pattern</li>
          <li><strong>Render Props Demo:</strong> Advanced render props with multiple UI variations</li>
          <li><strong>Performance Monitor:</strong> Performance monitoring and optimization</li>
          <li><strong>Subtree Isolation:</strong> Component isolation techniques</li>
        </ul>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d9ff'
        }}>
          <h4 style={{ color: '#0056b3', marginTop: 0 }}>
            💡 Pro Tip
          </h4>
          <p style={{ margin: 0, color: '#0056b3' }}>
            Each example is designed to be self-contained and educational. 
            Feel free to explore the code, modify it, and experiment with different approaches!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
