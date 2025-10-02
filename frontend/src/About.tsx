import React, { useState, useEffect } from 'react';
import './About.css';

interface AboutPageContent {
  title: string;
  bio: string[];
}

const About = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/about`);
        if (response.status === 404) {
          // Page content not found, which is okay. It just hasn't been created yet.
          setContent(null);
        } else if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const data = await response.json();
          setContent(data);
        }
      } catch (err) {
        setError('Failed to fetch about page content.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page-content about-page">
      <h2>{content?.title || 'About Me'}</h2>
      <div className="profile-picture-container">
        <img 
          src="/profile_square.jpeg" 
          alt="Jennifer Nadolski" 
          className="profile-picture" 
        />
      </div>
      <div className="about-content">
        <div className="bio">
          {content?.bio ? (
            content.bio.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))
          ) : (
            <p>Edit this page from the dashboard to add your bio!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
