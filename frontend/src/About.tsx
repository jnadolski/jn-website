import React from 'react';

const About = () => {
  return (
    <div className="page-content about-page">
      <h2>About Me</h2>
      <div className="about-content">
        <img 
          src="/profile.png" 
          alt="Jennifer Nadolski" 
          className="profile-picture" 
        />
        <div className="bio">
          <p>
            I’ve always been a builder. From designing intricate family homes in The Sims to assembling complex LEGO models, my passion has always been in creating organized, functional systems from the ground up. That same passion is what led me to a career in software engineering.
          </p>
          <p>
            For the last three years, I’ve applied that builder's mindset to the digital world, specializing in C++ and Python. I put this philosophy into practice by creating an AI-Powered File Organizer from scratch. I handled the entire lifecycle, from engineering a native C++/Qt frontend for a seamless macOS experience to building a robust Python backend that uses the Gemini API to intelligently sort files.
          </p>
          <p>
            My curiosity doesn't stop when I log off. I'm constantly learning from AI, exploring how it can not only power applications but also accelerate the creative process itself. For me, engineering isn't just a job; it's about fitting all the pieces together—big and small—to build something that is both efficient and enjoyable to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
