import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedDestinations from '../components/Destinations/FeaturedDestinations';
import TourPackages from '../components/Tours/TourPackages';
import Testimonials from '../components/Testimonials/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <TourPackages />
      <Testimonials />
    </div>
  );
};

export default Home;