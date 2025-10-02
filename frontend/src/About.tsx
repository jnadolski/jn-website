import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-content about-page">
      <h2>About Me</h2>
      <div className="profile-picture-container">
        <img 
          src="/profile.png" 
          alt="Jennifer Nadolski" 
          className="profile-picture" 
        />
      </div>
      <div className="about-content">
        <div className="bio">
          <p>
            My professional discipline is defined by a commitment to building <b>organized, functional systems</b>. As a <b>Software Engineer</b>, I focus on solving <b>full-stack problems</b> efficiently and ensuring the final product maintains a clean, meticulous <b>native look and feel</b>.
          </p>
          <p>
            My expertise is anchored in <b>systems-level development</b>, leveraging over three years with <b>C++</b> and Python. My role primarily involves writing high-performance code, executing meticulous <b>code reviews</b>, and performing the critical <b>debugging</b> necessary to ensure structural integrity across the system.
          </p>
          <p>
            My capability is proven by the <b>AI-Powered File Organizer</b>. I personally handled the full product lifecycle for this high-performance system, <b>architecting the entire process</b> and directing the Python implementation to integrate the <b>Gemini API</b> for intelligent analysis. This showcased my ability to manage complexity, package the product cross-platform, and establish the automated <b>GitHub Actions CI/CD pipeline</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
