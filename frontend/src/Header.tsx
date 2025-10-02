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
      </Link>

      <button className="hamburger-menu-button" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <nav className={`main-nav ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
        <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>

        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button primary" onClick={() => setIsMobileMenuOpen(false)}>Résumé</a>
      </nav>
    </header>
  );
};

export default Header;
