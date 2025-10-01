import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <Logo />
        <span>Jennifer Nadolski</span>
      </Link>
      <nav>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
