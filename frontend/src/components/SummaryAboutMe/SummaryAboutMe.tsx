import React from 'react';
import { Link } from 'react-router-dom';
import './SummaryAboutMe.css'; // Assuming a CSS file for styling

const SummaryAboutMe = () => {
  return (
    <section className="summary-about-me">
      <h2>About Me</h2>
      <p>
        I’ve always been a builder. From designing intricate family homes in The Sims to assembling complex LEGO models, my passion has always been in creating organized, functional systems from the ground up. That same passion is what led me to a career in software engineering.
      </p>
      <Link to="/about" className="button secondary">Read Full Biography</Link>
    </section>
  );
};

export default SummaryAboutMe;
