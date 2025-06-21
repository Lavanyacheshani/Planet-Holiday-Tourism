import React, { useEffect, useState } from 'react';
import { ChevronDown, Play, Sparkles, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/hero/1.jpg',
      title: 'Discover Paradise',
      subtitle: 'Experience the breathtaking beauty of Sri Lanka',
      accent: 'The Pearl of the Indian Ocean awaits',
    },
    {
      image: '/hero/2.jpg',
      title: 'Ancient Wonders',
      subtitle: 'Explore centuries-old temples and cultural heritage',
      accent: 'Where history comes alive',
    },
    {
      image: '/hero/3.jpg',
      title: 'Wild Adventures',
      subtitle: 'Encounter exotic wildlife in pristine national parks',
      accent: 'Nature\'s greatest spectacle',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides with Enhanced Parallax */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-2000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 animate-parallax"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-sapphire-900/20" />
        </div>
      ))}

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <Sparkles 
              className="w-2 h-2 text-white"
              style={{
                filter: `hue-rotate(${Math.random() * 120}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full animate-float-delayed blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-sapphire-400/10 to-ceylon-400/10 rounded-full animate-float blur-2xl" />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-to-br from-lotus-400/10 to-ruby-400/10 rounded-full animate-bounce-gentle blur-lg" />
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          {/* Accent Text */}
          <div className="mb-4 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-sm font-medium text-white/90">
              <MapPin className="w-4 h-4" />
              {slides[currentSlide].accent}
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h1 className="heading-primary mb-6 animate-fade-in-up">
            <span className="block text-gradient-gold animate-text-glow">
              {slides[currentSlide].title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-large mb-12 animate-fade-in-up opacity-90 font-light max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
            {slides[currentSlide].subtitle}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-sapphire-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500 animate-pulse-glow">
              <span className="relative z-10">Explore Tours</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-sapphire-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            
            <button className="group flex items-center gap-3 glass-effect text-white px-10 py-4 rounded-full text-lg font-semibold border border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-500">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Story</span>
            </button>
          </div>

          {/* Stats Bar */}
          
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative overflow-hidden transition-all duration-500 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-glow' 
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            } rounded-full`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 animate-shimmer" />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-gentle cursor-pointer hover:text-emerald-300 transition-colors duration-300 group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium opacity-80 group-hover:opacity-100">Discover More</span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center group-hover:border-emerald-300">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce group-hover:bg-emerald-300" />
          </div>
        </div>
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 animate-rotate-slow opacity-20">
        <div className="w-32 h-32 border border-white/30 rounded-full" />
      </div>
      <div className="absolute bottom-20 left-10 animate-wave opacity-20">
        <div className="w-24 h-24 border-2 border-white/30 rotate-45" />
      </div>
    </section>
  );
};

export default Hero;