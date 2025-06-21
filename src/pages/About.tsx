import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              About Planet Holiday
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              Your gateway to discovering the pearl of the Indian Ocean
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, Planet Holiday emerged from a passion for sharing Sri Lanka's incredible beauty with the world. What started as a small family business has grown into the island's premier tour operator, but we've never lost sight of our core values: authentic experiences, personal service, and sustainable tourism.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Every journey we craft tells a story – of ancient kingdoms and modern adventures, of pristine beaches and misty mountains, of warm smiles and unforgettable moments. We don't just show you Sri Lanka; we help you feel its heartbeat.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">10,000+</div>
                  <div className="text-sm text-gray-600">Happy Travelers</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">9 Years</div>
                  <div className="text-sm text-gray-600">Of Excellence</div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/3619971/pexels-photo-3619971.jpeg"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another tour company. Here's what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Born and raised in Sri Lanka, we know every hidden gem and secret spot
              </p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Recognized for excellence in sustainable tourism and customer service
              </p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Travel</h3>
              <p className="text-gray-600">
                Committed to preserving Sri Lanka's natural beauty for future generations
              </p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Touch</h3>
              <p className="text-gray-600">
                Every tour is personalized to create memories that last a lifetime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind your perfect Sri Lankan adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Fernando',
                role: 'Founder & CEO',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                bio: 'With 15 years in tourism, Rajesh founded Planet Holiday to share his love for Sri Lanka with the world.',
              },
              {
                name: 'Priya Wickramasinghe',
                role: 'Head of Operations',
                image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
                bio: 'Priya ensures every detail of your journey is perfectly orchestrated, from arrival to departure.',
              },
              {
                name: 'Chaminda Silva',
                role: 'Lead Guide',
                image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
                bio: 'Our master storyteller who brings Sri Lankan history and culture to life with every tour.',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;