import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) { // Assuming 768px is breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <Logo />
        <span>Jennifer Nadolski</span>
      </Link>

      <div className="header-right-section">
        {/* Theme Toggle Placeholder */}
        <button className="theme-toggle-button">☀️/🌙</button>
        {/* Resume Button Placeholder */}
        <button className="resume-button">Resume</button>

        <button className="hamburger-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav className={`main-nav ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
        <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
      </nav>
    </header>
  );
};

export default Header;
