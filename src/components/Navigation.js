import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

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
    },
    {
      label: "Basic Examples",
      description: "Basic React component examples",
      submenu: [
        {
          path: "/hello-world",
          label: "Hello World",
          description: "Simple hello world component",
        },
        {
          path: "/basic-input-text",
          label: "Basic Input Text",
          description: "Basic input text example",
        },
        {
          path: "/basic-use-effect",
          label: "Basic Use Effect",
          description: "Basic use effect example",
        },
        {
          path: "/basic-use-effect-console",
          label: "Basic Use Effect Console",
          description: "useEffect with console.log example",
        },
      ],
    },
    {
      path: "/search-input",
      label: "Search Input",
      description: "Search input example",
    },
    {
      path: "/use-callback",
      label: "useCallback Example",
      description: "useCallback hook demonstration",
    },
    {
      path: "/shared-state-factory",
      label: "Shared State Factory",
      description: "Factory pattern vs Context comparison",
    },
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
          {navItems.map((item, index) => {
            const menuKey = `menu-${index}`;
            const isExpanded = expandedMenus[menuKey];
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isActive = item.path && location.pathname === item.path;
            const hasActiveChild = hasSubmenu && item.submenu.some(subItem => location.pathname === subItem.path);

            if (hasSubmenu) {
              return (
                <div key={menuKey} style={{ gridColumn: hasSubmenu ? 'span 1' : 'auto' }}>
                  <div
                    onClick={() => toggleMenu(menuKey)}
                    style={{
                      padding: '15px',
                      backgroundColor: hasActiveChild ? '#007bff' : 'white',
                      color: hasActiveChild ? 'white' : '#333',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: hasActiveChild ? '0 4px 8px rgba(0,123,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                      marginBottom: isExpanded ? '10px' : '0'
                    }}
                    onMouseEnter={(e) => {
                      if (!hasActiveChild) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!hasActiveChild) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
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
                          opacity: hasActiveChild ? 0.9 : 0.7
                        }}>
                          {item.description}
                        </p>
                      </div>
                      <span style={{
                        fontSize: '18px',
                        transition: 'transform 0.2s ease',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
                      }}>
                        ▶
                      </span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{
                      marginTop: '10px',
                      paddingLeft: '15px',
                      borderLeft: '3px solid #007bff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      {item.submenu.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <div style={{
                              padding: '12px',
                              backgroundColor: isSubActive ? '#007bff' : '#f8f9fa',
                              color: isSubActive ? 'white' : '#333',
                              border: '1px solid #dee2e6',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: isSubActive ? '0 2px 4px rgba(0,123,255,0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = '#e9ecef';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                              }
                            }}
                            >
                              <h4 style={{ 
                                margin: '0 0 4px 0',
                                fontSize: '14px',
                                fontWeight: '600'
                              }}>
                                {subItem.label}
                              </h4>
                              <p style={{ 
                                margin: 0,
                                fontSize: '12px',
                                opacity: isSubActive ? 0.9 : 0.7
                              }}>
                                {subItem.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path || menuKey}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  padding: '15px',
                  backgroundColor: isActive ? '#007bff' : 'white',
                  color: isActive ? 'white' : '#333',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 8px rgba(0,123,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  transform: isActive ? 'translateY(-2px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'none';
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
                    opacity: isActive ? 0.9 : 0.7
                  }}>
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
