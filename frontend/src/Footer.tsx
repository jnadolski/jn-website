import React from 'react';
import GitHubLogo from './GitHubLogo';
import EmailIcon from './EmailIcon';

const Footer = () => {
  return (
    <footer>
      <div className="footer-contact-row">
        <div className="contact-info">
          <a href="mailto:nadolskj@gmail.com">
            <EmailIcon />
            <span>nadolskj@gmail.com</span>
          </a>
        </div>
        <div className="social-links">
          <a href="https://github.com/jnadolski" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubLogo />
          </a>
          <a href="http://www.linkedin.com/in/jennifer-nadolski" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/linkedin-logo-light.png" alt="LinkedIn" className="social-logo light-mode-logo" />
            <img src="/linkedin-logo-dark.png" alt="LinkedIn" className="social-logo dark-mode-logo" />
          </a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Jennifer Nadolski. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
