import React from 'react';
import { Link } from 'react-router-dom';
import './SummaryAboutMe.css'; // Assuming a CSS file for styling

const SummaryAboutMe = () => {
  return (
    <section className="summary-about-me">
      <h2>About Me</h2>
      <p>
        My professional discipline is defined by a commitment to building <b>organized, functional systems</b>. As a <b>Software Engineer</b>, I focus on solving <b>full-stack problems</b> efficiently and ensuring the final product maintains a clean, meticulous <b>native look and feel</b>.
      </p>
      <Link to="/about" className="button secondary">Read Full Biography</Link>
    </section>
  );
};

export default SummaryAboutMe;
