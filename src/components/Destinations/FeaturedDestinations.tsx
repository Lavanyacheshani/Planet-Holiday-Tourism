import React, { useState } from 'react';
import { MapPin, Star, Clock, Users, Camera, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  duration: string;
  groupSize: string;
  highlights: string[];
  category: string;
  price: number;
}

interface FeaturedDestinationsProps {
  showExploreButton?: boolean;
}

const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({ showExploreButton = true }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const destinations: Destination[] = [
    {
      id: 1,
      name: 'Sigiriya Rock Fortress',
      image: '/des/1.jpg',
      description: 'Ancient citadel built on a massive rock formation, offering breathtaking views and rich history.',
      rating: 4.9,
      duration: '4-5 hours',
      groupSize: '2-15 people',
      highlights: ['Ancient frescoes', 'Lion\'s Gate', 'Summit gardens', 'Historical significance'],
      category: 'Cultural',
      price: 89,
    },
    {
      id: 2,
      name: 'Kandy Temple of Tooth',
      image: '/des/dalada.webp',
      description: 'Sacred Buddhist temple housing the relic of the tooth of Buddha, surrounded by cultural heritage.',
      rating: 4.8,
      duration: '2-3 hours',
      groupSize: '2-20 people',
      highlights: ['Sacred tooth relic', 'Traditional architecture', 'Cultural performances', 'Kandy Lake'],
      category: 'Cultural',
      price: 65,
    },
    {
      id: 3,
      name: 'Yala National Park',
      image: '/des/yala.jpg',
      description: 'Sri Lanka\'s premier wildlife destination with the highest density of leopards in the world.',
      rating: 4.7,
      duration: 'Full day',
      groupSize: '2-6 people',
      highlights: ['Leopard spotting', 'Elephant herds', 'Bird watching', 'Pristine wilderness'],
      category: 'Wildlife',
      price: 125,
    },
    {
      id: 4,
      name: 'Galle Fort',
      image: '/des/galle.jpg',
      description: 'Historic Dutch colonial fort with charming streets, boutique shops, and ocean views.',
      rating: 4.6,
      duration: '3-4 hours',
      groupSize: '2-25 people',
      highlights: ['Colonial architecture', 'Lighthouse', 'Art galleries', 'Sunset views'],
      category: 'Historical',
      price: 75,
    },
    {
      id: 5,
      name: 'Ella Nine Arches Bridge',
      image: '/des/ella2.jpg',
      description: 'Iconic railway bridge surrounded by lush tea plantations and misty mountains.',
      rating: 4.5,
      duration: '2-3 hours',
      groupSize: '2-30 people',
      highlights: ['Train spotting', 'Tea plantations', 'Hiking trails', 'Photography'],
      category: 'Nature',
      price: 55,
    },
    {
      id: 6,
      name: 'Mirissa Beach',
      image: '/des/2.jpg',
      description: 'Paradise beach perfect for whale watching, surfing, and relaxing on golden sands.',
      rating: 4.8,
      duration: 'Half/Full day',
      groupSize: '2-50 people',
      highlights: ['Whale watching', 'Blue whales', 'Surfing', 'Beach relaxation'],
      category: 'Beach',
      price: 95,
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cultural': 'from-ceylon-500 to-cinnamon-500',
      'Wildlife': 'from-jungle-500 to-emerald-500',
      'Historical': 'from-sapphire-500 to-ocean-500',
      'Nature': 'from-emerald-500 to-teal-500',
      'Beach': 'from-ocean-500 to-sapphire-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50">
      <div className="container-custom">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-2 mb-6">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Discover Amazing Places</span>
          </div>
          
          <h2 className="heading-secondary mb-6 animate-fade-in-up">
            <span className="text-gradient">Featured Destinations</span>
          </h2>
          
          <p className="text-body-large text-gray-600 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover the most breathtaking locations Sri Lanka has to offer, each with its unique charm and unforgettable experiences that will create memories to last a lifetime.
          </p>
        </div>

        {/* Enhanced Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group cursor-pointer animate-scale-in-bounce"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => setSelectedDestination(destination)}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                {/* Image Container with Overlay Effects */}
                <div className="relative overflow-hidden h-72">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(destination.category)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {destination.category}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-2 flex items-center gap-1 border border-white/30">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-white">{destination.rating}</span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <span className="text-emerald-600 font-bold">${destination.price}</span>
                    <span className="text-gray-500 text-sm ml-1">per person</span>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className={`absolute bottom-4 left-4 flex gap-2 transition-all duration-500 ${
                    hoveredCard === destination.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button className="glass-effect text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                      <Camera className="w-4 h-4" />
                    </button>
                    <button className="glass-effect text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {destination.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">{destination.description}</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <span>{destination.groupSize}</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-500">
                    Explore Destination
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Destinations Button */}
        {showExploreButton && (
          <div className="flex justify-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sapphire-600 via-ocean-500 to-teal-500 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-sapphire-700 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-sapphire-300 animate-fade-in-up"
              style={{ background: 'linear-gradient(90deg, #0f52ba 0%, #0077be 50%, #20b2aa 100%)' }}
            >
              <MapPin className="w-6 h-6 mr-2" />
              Explore More Destinations
            </Link>
          </div>
        )}

        {/* Enhanced Modal */}
        {selectedDestination && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in-bounce shadow-2xl">
              <div className="relative">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-6 right-6 glass-effect text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div className={`inline-block bg-gradient-to-r ${getCategoryColor(selectedDestination.category)} px-4 py-2 rounded-full text-sm font-semibold mb-3`}>
                    {selectedDestination.category}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{selectedDestination.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedDestination.rating}</span>
                    </div>
                    <span className="text-2xl font-bold">${selectedDestination.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">{selectedDestination.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Duration</div>
                      <div className="text-gray-600">{selectedDestination.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Group Size</div>
                      <div className="text-gray-600">{selectedDestination.groupSize}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedDestination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                    href={`/contact?destination=${encodeURIComponent(selectedDestination.name)}&price=${selectedDestination.price}&duration=${encodeURIComponent(selectedDestination.duration)}`}
                  >
                    Book This Destination
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;