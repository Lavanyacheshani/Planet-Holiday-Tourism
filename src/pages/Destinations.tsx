import React from 'react';
import FeaturedDestinations from '../components/Destinations/FeaturedDestinations';

const Destinations: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Explore Sri Lanka
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              From ancient temples to pristine beaches, discover the diverse beauty of the Pearl of the Indian Ocean
            </p>
          </div>
        </div>
      </section>

      <FeaturedDestinations />
    </div>
  );
};

export default Destinations;