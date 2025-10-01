import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Import a dedicated CSS file for Landing

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1 className="hero-headline">Jennifer Nadolski | Full-Stack Developer & AI Enthusiast</h1>
        <p className="hero-tagline">Crafting innovative web experiences with a passion for intelligent solutions.</p>
        <div className="hero-ctas">
          <Link to="/projects" className="button primary">View My Work</Link>
          <Link to="/about" className="button secondary">Learn More About Me</Link>
        </div>
      </section>
      {/* Other sections will go here */}
    </div>
  );
};

export default Landing;
