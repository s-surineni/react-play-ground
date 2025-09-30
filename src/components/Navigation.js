import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", description: "Main landing page" },
    {
      path: "/redux-toolkit",
      label: "Redux Toolkit Tutorial",
      description: "RTK store, slice, hooks",
    },
    {
      path: "/counter-hooks",
      label: "Counter with Hooks",
      description: "React Hooks example",
    },
    {
      path: "/counter-render-props",
      label: "Render Props Examples",
      description: "Multiple render props examples",
    },
    {
      path: "/simple-render-props",
      label: "Simple Render Props",
      description: "Basic render props explanation",
    },
    {
      path: "/render-props-demo",
      label: "Render Props Demo",
      description: "Advanced render props demonstration",
    },
    {
      path: "/performance-monitor",
      label: "Performance Monitor",
      description: "Performance monitoring example",
    },
    {
      path: "/subtree-isolation",
      label: "Subtree Isolation",
      description: "Subtree isolation demonstration",
    },{
      path: "/basic-input-text",
      label: "Basic Input Text",
      description: "Basic input text example",
    }
  ];

  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderBottom: '1px solid #dee2e6',
      marginBottom: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          margin: '0 0 20px 0', 
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          React Examples Navigation
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{
                padding: '15px',
                backgroundColor: location.pathname === item.path ? '#007bff' : 'white',
                color: location.pathname === item.path ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: location.pathname === item.path ? '0 4px 8px rgba(0,123,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                transform: location.pathname === item.path ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = '#e9ecef';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'none';
                }
              }}
              >
                <h3 style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {item.label}
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: '14px',
                  opacity: location.pathname === item.path ? 0.9 : 0.7
                }}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
