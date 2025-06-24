import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  comment: string;
  tour: string;
  date: string;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      country: 'United States',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
      rating: 5,
      comment: 'Our trip to Sri Lanka exceeded all expectations! The cultural sites were breathtaking, and our guide was incredibly knowledgeable. Planet Holiday made everything seamless.',
      tour: 'Cultural Triangle Explorer',
      date: 'December 2023',
    },
    {
      id: 2,
      name: 'Marcus Weber',
      country: 'Germany',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      rating: 5,
      comment: 'The wildlife safari in Yala was absolutely incredible! We saw leopards, elephants, and so many birds. The accommodation was luxurious and the food was amazing.',
      tour: 'Beach & Wildlife Adventure',
      date: 'November 2023',
    },
    {
      id: 3,
      name: 'Emma Thompson',
      country: 'United Kingdom',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
      rating: 5,
      comment: 'The hill country tour was magical! The train ride through tea plantations, the cool mountain air, and the stunning views made this trip unforgettable.',
      tour: 'Hill Country Escape',
      date: 'October 2023',
    },
    {
      id: 4,
      name: 'David Chen',
      country: 'Australia',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
      comment: 'Planet Holiday delivered a truly luxury experience. From the private villa to the helicopter tour, every detail was perfect. Worth every penny!',
      tour: 'Luxury Ceylon Experience',
      date: 'September 2023',
    },
    {
      id: 5,
      name: 'Isabella Rodriguez',
      country: 'Spain',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      rating: 5,
      comment: 'The adventure activities were thrilling! White water rafting, surfing lessons, and rock climbing - all professionally organized with top-notch safety measures.',
      tour: 'Adventure Seeker Special',
      date: 'August 2023',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-primary-50 to-teal-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Don't just take our word for it - hear from real travelers who have experienced the magic of Sri Lanka with us.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 animate-scale-in">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="relative mb-4">
                  <img
                    src={currentData.avatar}
                    alt={currentData.name}
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mx-auto lg:mx-0 border-4 border-primary-100"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary-600 rounded-full p-2">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{currentData.name}</h4>
                <p className="text-gray-500 mb-2">{currentData.country}</p>
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-primary-600 font-medium">{currentData.tour}</p>
                <p className="text-xs text-gray-400">{currentData.date}</p>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  "{currentData.comment}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 hidden lg:block"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 hidden lg:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`transition-all duration-300 ${
                index === currentTestimonial
                  ? 'w-8 h-3 bg-primary-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center animate-slide-up">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">10,000+</div>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">4.9</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">500+</div>
            <p className="text-gray-600">Tours Completed</p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">50+</div>
            <p className="text-gray-600">Destinations</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;