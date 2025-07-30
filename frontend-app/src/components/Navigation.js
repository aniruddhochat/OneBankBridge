// src/components/Navigation.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/accounts', icon: '🏦', label: 'Accounts' },
    { path: '/rewards', icon: '🎁', label: 'Rewards' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <div className="bottom-navigation">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Navigation;