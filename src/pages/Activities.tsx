import React, { useState } from 'react';
import { Calendar, Users, Clock, Star } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  image: string;
  video?: string;
  description: string;
  duration: string;
  groupSize: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  price: number;
  rating: number;
  category: string;
  location: string;
  highlights: string[];
}

const Activities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activities: Activity[] = [
    {
      id: 1,
      title: 'Whale Watching in Mirissa',
      image: '/ac/1.jpg',
      description: 'Experience the thrill of spotting blue whales and dolphins in their natural habitat.',
      duration: '4-5 hours',
      groupSize: '2-25 people',
      difficulty: 'Easy',
      price: 89,
      rating: 4.8,
      category: 'marine',
      location: 'Mirissa, Southern Province',
      highlights: ['Blue whale sightings', 'Dolphin encounters', 'Professional guides', 'Safety equipment'],
    },
    {
      id: 2,
      title: 'White Water Rafting',
      image: '/ac/2.jpg',
      description: 'Navigate thrilling rapids through lush jungle landscapes on the Kelani River.',
      duration: '3-4 hours',
      groupSize: '4-12 people',
      difficulty: 'Challenging',
      price: 125,
      rating: 4.7,
      category: 'adventure',
      location: 'Kitulgala, Sabaragamuwa Province',
      highlights: ['Grade 2-3 rapids', 'Professional instructors', 'All safety gear', 'Jungle scenery'],
    },
    {
      id: 3,
      title: 'Tea Plantation Tours',
      image: '/ac/3.jpg',
      description: 'Discover the art of tea making in the misty hills of central Sri Lanka.',
      duration: '2-3 hours',
      groupSize: '2-20 people',
      difficulty: 'Easy',
      price: 45,
      rating: 4.6,
      category: 'cultural',
      location: 'Nuwara Eliya, Central Province',
      highlights: ['Tea factory visits', 'Tasting sessions', 'Plantation walks', 'Local guide'],
    },
    {
      id: 4,
      title: 'Surfing Lessons in Arugam Bay',
      image: '/ac/4.jpg',
      description: 'Learn to surf or improve your skills at one of Asia\'s best surf spots.',
      duration: '2-3 hours',
      groupSize: '1-6 people',
      difficulty: 'Moderate',
      price: 75,
      rating: 4.9,
      category: 'marine',
      location: 'Arugam Bay, Eastern Province',
      highlights: ['Professional instruction', 'Board rental', 'Perfect waves', 'Beach vibes'],
    },
    {
      id: 5,
      title: 'Rock Climbing at Ella',
      image: '/ac/5.jpg',
      description: 'Challenge yourself with rock climbing adventures in the scenic hill country.',
      duration: '4-6 hours',
      groupSize: '2-8 people',
      difficulty: 'Challenging',
      price: 95,
      rating: 4.5,
      category: 'adventure',
      location: 'Ella, Uva Province',
      highlights: ['Natural rock formations', 'Safety equipment', 'Scenic views', 'Expert guides'],
    },
    {
      id: 6,
      title: 'Elephant Orphanage Visit',
      image: '/ac/6.jpg',
      description: 'Visit rescued elephants and learn about conservation efforts.',
      duration: '2-3 hours',
      groupSize: '2-30 people',
      difficulty: 'Easy',
      price: 35,
      rating: 4.4,
      category: 'wildlife',
      location: 'Pinnawala, Sabaragamuwa Province',
      highlights: ['Elephant feeding', 'Bath time viewing', 'Conservation education', 'Photography'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'marine', label: 'Marine' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'wildlife', label: 'Wildlife' },
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-jungle-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Adventure Activities
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              From adrenaline-pumping adventures to peaceful cultural experiences
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{activity.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{activity.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">${activity.price}</span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedActivity.title}</h3>
                  <p className="text-gray-600">{selectedActivity.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">${selectedActivity.price}</div>
                  <div className="text-gray-500">per person</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedActivity.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Duration</div>
                    <div className="text-gray-600">{selectedActivity.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Group Size</div>
                    <div className="text-gray-600">{selectedActivity.groupSize}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Rating</div>
                    <div className="text-gray-600">{selectedActivity.rating}/5</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedActivity.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-primary-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-primary-700 transition-colors duration-300">
                  Book This Activity
                </button>
                <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;