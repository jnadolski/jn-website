import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Import a dedicated CSS file for Landing

import ScrollReveal from 'scrollreveal';
import SummaryAboutMe from './components/SummaryAboutMe/SummaryAboutMe';
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects';

const Landing = () => {
  useEffect(() => {
    ScrollReveal().reveal('.hero-section', {
      delay: 200,
      distance: '50px',
      origin: 'top',
      easing: 'ease-in-out',
    });
    ScrollReveal().reveal('.summary-about-me', {
      delay: 200,
      distance: '50px',
      origin: 'bottom',
      easing: 'ease-in-out',
    });
    ScrollReveal().reveal('.featured-projects', {
      delay: 200,
      distance: '50px',
      origin: 'bottom',
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1 className="hero-headline">Jennifer Nadolski | Systems-Level Engineer & AI-Driven Problem Solver</h1>
        <p className="hero-tagline">Software Engineer specializing in C++ <b>systems development</b> and efficient <b>full-stack problem-solving</b>. I apply meticulous discipline to architect robust solutions, from writing high-performance code and executing <b>code reviews</b> to directing <b>AI integration</b> and establishing automated <b>CI/CD pipelines</b>.</p>
        <div className="hero-ctas">
          <Link to="/projects" className="button primary">View My Work</Link>
          <Link to="/about" className="button secondary">Learn More About Me</Link>
        </div>
      </section>

      <SummaryAboutMe />
      <FeaturedProjects />
    </div>
  );
};

export default Landing;
