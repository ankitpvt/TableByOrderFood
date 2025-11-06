import React from 'react';
import { Link } from 'react-router-dom';

const Setting = () => {
  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    gap: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 25px',
    borderRadius: '8px',
    backgroundColor: '#06d6a0',
    color: '#fff',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#05c08d',
    transform: 'scale(1.05)',
  };

  // For inline hover, we need to handle it via onMouseEnter/onMouseLeave
  const handleHover = (e) => {
    e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
    e.target.style.transform = linkHoverStyle.transform;
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = linkStyle.backgroundColor;
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <Link
        to="/AddTables"
        style={linkStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        Add Tables
      </Link>

      <Link
        to="/add"
        style={linkStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        Add Menu Item
      </Link>

      <Link
        to="/"
        style={linkStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Setting;
