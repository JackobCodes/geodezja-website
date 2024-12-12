import React from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EFEFEF] text-black shadow-t">
      <div className="container mx-auto flex flex-col items-center gap-4 p-4 text-sm font-semibold md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jakub-lewicki-b6b143294/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-400 transition"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>

          <a
            href="https://github.com/JackobCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-400 transition"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>

        <nav className="flex gap-3">
          <Link to="/" className="hover:text-gray-400 transition">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-gray-400 transition">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
