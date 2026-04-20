import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    { path: "/", label: "Home", description: "Main landing page" },
    {
      path: "/redux-toolkit",
      label: "Redux Toolkit Tutorial",
      description: "RTK store, slice, hooks",
    },
    {
      path: "/reselect-example",
      label: "Reselect Example",
      description: "Memoized selectors with reselect",
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
      path: "/index-key-demo",
      label: "Index Key Demo",
      description: "Why not to use array index as React key",
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
        {
          path: "/use-effect-with-issue",
          label: "Use Effect With Issue",
          description: "useEffect with issue example",
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
      path: "/use-memo",
      label: "useMemo Example",
      description: "useMemo hook demonstration",
    },
    {
      path: "/shared-state-factory",
      label: "Shared State Factory",
      description: "Factory pattern vs Context comparison",
    },
    {
      path: "/selectable-table",
      label: "Selectable Table",
      description: "Table with selectable rows",
    },
    {
      path: "/api-polling",
      label: "API Polling",
      description: "Calls an API every 5 seconds",
    },
    {
      path: "/progress-bar",
      label: "Progress Bar",
      description: "Reusable progress bar with variants",
    },
    {
      path: "/comment-section",
      label: "Comment Section",
      description: "Blog comments with click-to-edit",
    },
    {
      path: "/holy-grail",
      label: "Holy Grail",
      description: "Holy Grail layout demonstration",
    },
    {
      path: "/tweets",
      label: "Tweet List",
      description: "Multiple tweets with parent component",
    },
    {
      path: "/temp-playground",
      label: "Temp Playground",
      description: "Sandbox for building and testing components",
    },
  ];

  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__header">
          <h1 className="nav__title">React Examples Navigation</h1>
          <button
            className={`nav__hamburger ${isNavOpen ? 'nav__hamburger--open' : ''}`}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {isNavOpen && (<div className="nav__grid">
          {navItems.map((item, index) => {
            const menuKey = `menu-${index}`;
            const isExpanded = expandedMenus[menuKey];
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isActive = item.path && location.pathname === item.path;
            const hasActiveChild = hasSubmenu && item.submenu.some(subItem => location.pathname === subItem.path);

            if (hasSubmenu) {
              return (
                <div key={menuKey} className="nav__item">
                  <div
                    onClick={() => toggleMenu(menuKey)}
                    className={`nav__card ${hasActiveChild ? 'nav__card--active-child' : ''} ${isExpanded ? 'nav__card--expanded' : ''}`}
                  >
                    <div className="nav__card-header">
                      <div className="nav__card-body">
                        <h3 className="nav__card-title">{item.label}</h3>
                        <p className="nav__card-desc">{item.description}</p>
                      </div>
                      <span className={`nav__arrow ${isExpanded ? 'nav__arrow--expanded' : ''}`}>▶</span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="nav__submenu">
                      {item.submenu.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="nav__submenu-link"
                          >
                            <div className={`nav__submenu-item ${isSubActive ? 'nav__submenu-item--active' : ''}`}>
                              <h4 className="nav__submenu-title">{subItem.label}</h4>
                              <p className="nav__submenu-desc">{subItem.description}</p>
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
                className="nav__link"
              >
                <div className={`nav__card ${isActive ? 'nav__card--active' : ''}`}>
                  <h3 className="nav__card-title">{item.label}</h3>
                  <p className="nav__card-desc">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>)}
      </div>
    </nav>
  );
};

export default Navigation;
