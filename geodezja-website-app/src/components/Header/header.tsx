import React from 'react';
import { Link } from 'react-router-dom';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#EFEFEF] text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 font-semibold">
        <Link to="/">
          <SportsSoccerIcon sx={{ fontSize: 30 }} />
        </Link>

        <nav className="flex gap-[30px]">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
