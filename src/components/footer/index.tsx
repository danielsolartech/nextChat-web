import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Footer: React.FC = () => {
  return (
    <div className="nextChat-footer nextChat-animation fadeInUp">
      <div className="footer-left">
        <div className="nextChat-logo">
          NextChat
        </div>
        <span>
          &copy; 2020 NextChat ~ All rights reserved.
        </span>

        <div className="links">
          <a href="https://www.twitter.com/danielsolartech/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.github.com/danielsolartech/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.facebook.com/danielsolartech/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
        </div>
      </div>

      <div className="footer-right">
        <ul className="footer-top">
          <li>
            <h1>Community</h1>

            <Link to="/explore">
              Explore
            </Link>
            <Link to="/news">
              News
            </Link>
            <Link to="/team">
              Team
            </Link>
            <Link to="/about">
              About us
            </Link>
          </li>
          <li>
            <h1>Interest</h1>

            <Link to="/usage">
              How to use
            </Link>
            <Link to="/contribute">
              How to contribute
            </Link>
          </li>
          <li>
            <h1>Resources</h1>

            <Link to="/developers">
              API for developers
            </Link>
          </li>
          <li>
            <h1>Downloads</h1>
            <Link to="/mobile">
              Android
            </Link>
            <Link to="/desktop">
              Windows/Linux
            </Link>
          </li>
        </ul>
        <ul className="footer-bottom">
          <li>
            <Link to="/terms">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/security">
              Security
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
