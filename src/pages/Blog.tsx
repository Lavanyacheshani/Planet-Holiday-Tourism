import React, { useState } from 'react';
import { Calendar, User, Clock, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Ultimate Guide to Sigiriya Rock Fortress',
      excerpt: 'Discover the secrets of this ancient citadel and learn the best times to visit, what to expect, and insider tips for an unforgettable experience.',
      image: '/des/1.jpg',
      author: 'Rajesh Fernando',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'cultural',
      tags: ['Sigiriya', 'Culture', 'History', 'Ancient Sites'],
    },
    {
      id: 2,
      title: 'Best Beaches in Sri Lanka: A Complete Guide',
      excerpt: 'From the golden sands of Unawatuna to the surfing paradise of Arugam Bay, explore Sri Lanka\'s most stunning coastal destinations.',
      image: '/blog/2.jpg',
      author: 'Priya Wickramasinghe',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'travel-tips',
      tags: ['Beaches', 'Surfing', 'Coast', 'Travel Tips'],
    },
    {
      id: 3,
      title: 'Wildlife Safari: Your Guide to Yala National Park',
      excerpt: 'Everything you need to know about planning the perfect safari adventure, including the best times for leopard spotting and what to pack.',
      image: '/blog/3.jpg',
      author: 'Chaminda Silva',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'wildlife',
      tags: ['Safari', 'Wildlife', 'Yala', 'National Parks'],
    },
    {
      id: 4,
      title: 'Tea Country Adventures: Ella and Beyond',
      excerpt: 'Journey through the misty hills of Sri Lanka\'s tea country, from the famous Nine Arches Bridge to hidden plantation trails.',
      image: '/blog/4.jpg',
      author: 'Rajesh Fernando',
      date: '2023-12-28',
      readTime: '6 min read',
      category: 'adventure',
      tags: ['Tea Country', 'Ella', 'Hiking', 'Mountains'],
    },
    {
      id: 5,
      title: 'Sri Lankan Cuisine: A Food Lover\'s Paradise',
      excerpt: 'Embark on a culinary journey through Sri Lanka\'s diverse flavors, from street food to fine dining experiences.',
      image: '/blog/5.jpg',
      author: 'Priya Wickramasinghe',
      date: '2023-12-20',
      readTime: '7 min read',
      category: 'food',
      tags: ['Food', 'Cuisine', 'Street Food', 'Restaurants'],
    },
    {
      id: 6,
      title: 'Budget Travel Guide to Sri Lanka',
      excerpt: 'Discover how to explore Sri Lanka without breaking the bank, with insider tips on affordable accommodations, transport, and activities.',
      image: '/blog/6.webp',
      author: 'Chaminda Silva',
      date: '2023-12-15',
      readTime: '15 min read',
      category: 'travel-tips',
      tags: ['Budget Travel', 'Backpacking', 'Tips', 'Affordable'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'travel-tips', label: 'Travel Tips' },
    { id: 'wildlife', label: 'Wildlife' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'food', label: 'Food & Culture' },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-ocean-600 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Travel Blog
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              Stories, tips, and insights from the heart of Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(cat => cat.id === post.category)?.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.id}`}
                      className="w-full bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center text-center"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest travel tips and stories delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;