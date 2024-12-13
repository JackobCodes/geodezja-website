import React from 'react';
import Header from '../components/Header/header.tsx';
import Footer from '../components/Footer/footer.tsx';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <div
        className="h-full bg-fixed bg-center bg-cover relative overflow-hidden"
        style={{ backgroundImage: "url('/stadion.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 pointer-events-none"></div>

        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 relative">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center px-4 bg-black/60 py-3 rounded-md shadow-lg">
            Do you want to watch this match?
          </h1>
          <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg mt-6">
            <p className="text-md text-gray-500 text-center mb-4">
              13th December 2024
            </p>

            <div className="flex justify-between items-center mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32">
                <img
                  src="/resovia_logo.png"
                  alt="Resovia Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div className="text-3xl font-bold text-gray-700">VS</div>
              <div className="w-24 h-24 sm:w-32 sm:h-32">
                <img
                  src="/stal_rzeszow_logo.png"
                  alt="Stal Rzeszów Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            </div>

            <Link to="/checkout">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all">
                Buy Tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
