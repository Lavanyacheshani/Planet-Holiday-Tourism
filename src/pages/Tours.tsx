import React from 'react';
import TourPackages from '../components/Tours/TourPackages';

const Tours: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-jungle-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Tour Packages
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              Carefully crafted experiences that showcase the best of Sri Lanka's culture, nature, and adventure
            </p>
          </div>
        </div>
      </section>

      <TourPackages />
    </div>
  );
};

export default Tours;